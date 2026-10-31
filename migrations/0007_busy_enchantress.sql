PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_Objective` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`boardId` integer NOT NULL,
	`columnId` integer NOT NULL,
	`createdBy` integer NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`order` real NOT NULL,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`boardId`) REFERENCES `ObjectiveBoard`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`columnId`) REFERENCES `ObjectiveColumn`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`createdBy`) REFERENCES `Person`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_Objective`("id", "boardId", "columnId", "createdBy", "title", "description", "order", "createdAt") SELECT "id", "boardId", "columnId", "createdBy", "title", "description", "order", "createdAt" FROM `Objective`;--> statement-breakpoint
DROP TABLE `Objective`;--> statement-breakpoint
ALTER TABLE `__new_Objective` RENAME TO `Objective`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `Objective__columnId__index` ON `Objective` (`columnId`);--> statement-breakpoint
CREATE INDEX `Objective__order__index` ON `Objective` (`order`);--> statement-breakpoint
CREATE UNIQUE INDEX `Objective__boardId__title__unique` ON `Objective` (`boardId`,`title`);