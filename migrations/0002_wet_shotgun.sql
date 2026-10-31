CREATE TABLE `ObjectiveBoard` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`value` text NOT NULL,
	`isActive` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
DROP INDEX `Objective__title__unique`;--> statement-breakpoint
ALTER TABLE `Objective` ADD `boardId` integer REFERENCES ObjectiveBoard(id);--> statement-breakpoint
CREATE INDEX `Objective__boardId__index` ON `Objective` (`boardId`);--> statement-breakpoint
CREATE UNIQUE INDEX `Objective__boardId__title__unique` ON `Objective` (`boardId`,`title`);--> statement-breakpoint
CREATE INDEX `ObjectiveActivity__createdAt__index` ON `ObjectiveActivity` (`createdAt`);