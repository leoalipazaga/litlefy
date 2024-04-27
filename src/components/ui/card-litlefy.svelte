<script>
  import { fade } from 'svelte/transition';
  import { Badge, Tooltip } from 'flowbite-svelte';
  import { QrCode, BarChart, Check, Copy, Timer } from 'lucide-svelte';
  export let shortLink;
  export let url;

  let status = '';

  const onCopyAlias = async () => {
    status = 'copying';
    await navigator.clipboard.writeText(shortLink);
    setTimeout(() => {
      status = '';
    }, 2000);
  };
</script>

<article
  transition:fade
  class="flex flex-col gap-x-2 p-3 rounded shadow-md border hover:border-gray-700 transition ease-in-out"
>
  <header class="flex items-center gap-x-2">
    <a href={shortLink} target="_blank" class="text-sm w-56 font-bold truncate"
      >{shortLink}</a
    >
    <button
      class="p-[6px] bg-gray-200 rounded-full group hover:bg-teal-400 transition-[background] ease-in-out duration-200"
      on:click={onCopyAlias}
    >
      {#if status}
        <Check class="size-3 group-hover:scale-110 group-hover:text-white" />
      {:else}
        <Copy class="size-3 group-hover:scale-110 group-hover:text-white" />
      {/if}
    </button>
    <button
      class="p-[6px] bg-gray-200 rounded-full group hover:bg-teal-400 transition-[background] ease-in-out duration-200"
    >
      <QrCode class="size-3 group-hover:scale-110 group-hover:text-white" />
    </button>
    <Badge class="bg-gray-200 text-black"
      ><BarChart class="mr-2 size-3 font-normal" />980 clicks</Badge
    >
    <Badge><Timer class="mr-2 size-3" />Expires in 30min</Badge>
    <Tooltip class="w-72">
      To prevent abuse, we automatically delete unclaimed links after 30
      minutes. To claim this link, simply sign up for a free account.
    </Tooltip>
  </header>
  <a
    class="text-sm w-fit text-gray-400 hover:underline truncate max-w-[80%]"
    href={url}>{url}</a
  >
</article>
