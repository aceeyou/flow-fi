import { sql } from "drizzle-orm";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { AnySQLiteColumn } from "drizzle-orm/sqlite-core";
export const categories = sqliteTable("categories", {
  id: t.int("id").primaryKey({ autoIncrement: true }),
  category_name: t.text("category_name").notNull(),
  icon: t.text("icon").notNull().default("💵"),
  color: t.text("color").notNull().default("#09C2A0"),
  type: t.text("type").notNull().default("expense"),
});

export const accounts = sqliteTable("accounts", {
  id: t.int("id").primaryKey({ autoIncrement: true }),
  account_name: t.text("account_name").notNull(),
  balance: t.int("balance").notNull().default(0),
  isImage: t.int("isImage").notNull().default(0),
  icon: t.text("icon").notNull().default("💶"),
  color: t.text("color").notNull().default("#09C2A0"),
});

export const transactions = sqliteTable("transactions", {
  id: t.int("id").primaryKey({ autoIncrement: true }),
  category_id: t
    .int("category_id")
    .notNull()
    .default(0)
    .references((): AnySQLiteColumn => categories.id),
  account_id: t
    .int("account_id")
    .notNull()
    .default(0)
    .references((): AnySQLiteColumn => accounts.id),
  amount: t.text("amount").notNull().default("0"),
  description: t.text("description").notNull(),
  type: t.text("type").notNull(),
  transaction_date: t
    .text("transaction_date")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  created_at: t
    .text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const repeating_transactions = sqliteTable("repeatingTransactions", {
  id: t.int("id").primaryKey({ autoIncrement: true }),
  transaction_id: t
    .int("transaction_id")
    .notNull()
    .default(0)
    .references((): AnySQLiteColumn => transactions.id),
  active: t.int("active").notNull().default(1),
  day_to_repeat: t.text("day_to_repeat").notNull(),
  latest_recursion_date: t
    .text("latest_recursion_date")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
