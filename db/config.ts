import { NOW, column, defineDb, defineTable } from 'astro:db';

const Link = defineTable({
  columns: {
    link: column.text(),
    visits: column.number(),
    shortLink: column.text({ unique: true }),
    createdAt: column.date({ default: NOW }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    Link,
  },
});
