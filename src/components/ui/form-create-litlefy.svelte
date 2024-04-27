<script>
  import { onMount } from 'svelte';
  import { Alert } from 'flowbite-svelte';
  import { createRandomString } from '@/helpers';
  import CardLitlefy from './card-litlefy.svelte';

  let url;
  let form;
  let list = [];

  const addAliasToStorage = (links) => {
    localStorage.setItem('links', JSON.stringify(links));
  };

  const getAliasFromStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

  onMount(() => {
    list = getAliasFromStorage('links') ?? [];
  });

  const onCreateShortlink = async (e) => {
    const domain = window.location.href;
    const body = new FormData(e.currentTarget);
    const shortLink = `${domain}${createRandomString(7)}`;
    body.append('shortLink', shortLink);
    await fetch('/api/link', {
      body,
      method: 'POST',
    });
    list = list.concat({
      shortLink,
      url,
    });
    addAliasToStorage(list);
    form.reset();
  };
</script>

<form
  autocomplete="off"
  class="flex flex-col sm:flex-row justify-between bg-purple-950 py-8 px-10 gap-5 rounded"
  bind:this={form}
  on:submit|preventDefault={onCreateShortlink}
>
  <input
    required
    id="link"
    name="link"
    class="block w-full h-10"
    type="url"
    placeholder="http://www.litlefy.com"
    bind:value={url}
  />
  <button
    type="submit"
    disabled={list.length === 5}
    class="h-10 px-6 text-center text-white bg-teal-400 rounded sm:w-36 hover:bg-teal-300 transition duration-100"
  >
    Litlefy it!
  </button>
</form>
<div class="flex flex-col gap-y-5 mt-5">
  {#each list as item}
    <CardLitlefy shortLink={item.shortLink} url={item.url} />
  {/each}
</div>
{#if list.length === 5}
  <Alert class="mt-5" color="dark">
    Want to claim your links, edit them, or view their analytics? <a
      class="underline hover:opacity-75"
      href="/signup">Create a free account</a
    >
    on <span class="font-bold">Litlefy </span> to get started.
  </Alert>
{/if}
