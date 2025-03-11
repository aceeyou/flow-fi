PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`icon` text DEFAULT '💵' NOT NULL,
	`color` text DEFAULT '#09C2A0' NOT NULL,
	`type` text DEFAULT 'expense' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_categories`("id", "name", "icon", "color", "type") SELECT "id", "name", "icon", "color", "type" FROM `categories`;--> statement-breakpoint
DROP TABLE `categories`;--> statement-breakpoint
ALTER TABLE `__new_categories` RENAME TO `categories`;--> statement-breakpoint
PRAGMA foreign_keys=ON;