CREATE TABLE `accounts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`account_name` text NOT NULL,
	`balance` integer DEFAULT 0 NOT NULL,
	`isImage` integer,
	`icon` text DEFAULT '💶' NOT NULL,
	`color` text DEFAULT '#09C2A0' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category_name` text NOT NULL,
	`icon` text DEFAULT '💵' NOT NULL,
	`color` text DEFAULT '#09C2A0' NOT NULL,
	`type` text DEFAULT 'expense'
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category_id` integer,
	`account_id` integer,
	`amount` integer NOT NULL,
	`description` text,
	`type` text DEFAULT 'expense' NOT NULL,
	`transaction_date` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`category_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE no action
);
