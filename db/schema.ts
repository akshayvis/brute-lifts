import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const journals = sqliteTable('journals', { owner: text('owner').primaryKey(), revision: integer('revision').notNull().default(0), data: text('data').notNull() });
