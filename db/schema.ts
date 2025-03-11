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
  isImage: t.int("isImage", { mode: "boolean" }),
  icon: t.text("icon").notNull().default("💶"),
  color: t.text("color").notNull().default("#09C2A0"),
});

export const transactions = sqliteTable("transactions", {
  id: t.int("id").primaryKey({ autoIncrement: true }),
  category_id: t
    .int("category_id")
    .references((): AnySQLiteColumn => categories.id),
  account_id: t
    .int("account_id")
    .references((): AnySQLiteColumn => accounts.id),
  amount: t.int("amount").notNull(),
  description: t.text("description"),
  type: t
    .text("type")
    .notNull()
    .$type<
      "expense" | "income" | "lend" | "borrow" | "invest" | "subscription"
    >()
    .notNull()
    .default("expense"),
  transaction_date: t
    .text("transaction_date")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  created_at: t.text("created_at").default(sql`CURRENT_TIMESTAMP`),
});
