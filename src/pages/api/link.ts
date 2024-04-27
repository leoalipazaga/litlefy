export const prerender = false;

import type { APIRoute } from 'astro';
import { db, Link } from 'astro:db';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.formData();
  const res = await db.insert(Link).values({
    link: body.get('link'),
    shortLink: body.get('shortLink'),
    visits: 0,
  } as any);
  return Response.json({ version: '1.2.3' }, { status: 200 });
};
