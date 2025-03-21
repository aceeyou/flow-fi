PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_accounts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`account_name` text NOT NULL,
	`balance` integer DEFAULT 0 NOT NULL,
	`isImage` integer DEFAULT 0 NOT NULL,
	`icon` text DEFAULT '💶' NOT NULL,
	`color` text DEFAULT '#09C2A0' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_accounts`("id", "account_name", "balance", "isImage", "icon", "color") SELECT "id", "account_name", "balance", "isImage", "icon", "color" FROM `accounts`;--> statement-breakpoint
DROP TABLE `accounts`;--> statement-breakpoint
ALTER TABLE `__new_accounts` RENAME TO `accounts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;