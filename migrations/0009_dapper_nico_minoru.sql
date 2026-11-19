DROP INDEX "Contact__personId__unique";--> statement-breakpoint
DROP INDEX "Contact__email__unique";--> statement-breakpoint
DROP INDEX "Job__statusId__index";--> statement-breakpoint
DROP INDEX "JobLead__statusId__index";--> statement-breakpoint
DROP INDEX "JobLead__jobId__unique";--> statement-breakpoint
DROP INDEX "Job__Client__clientId__index";--> statement-breakpoint
DROP INDEX "Job__Client__jobId__clientId__unique";--> statement-breakpoint
DROP INDEX "Job__Trade__tradeId__index";--> statement-breakpoint
DROP INDEX "Job__Trade__jobId__tradeId__unique";--> statement-breakpoint
DROP INDEX "MagicToken__personId__index";--> statement-breakpoint
DROP INDEX "MagicToken__tokenHash__index";--> statement-breakpoint
DROP INDEX "Objective__columnId__index";--> statement-breakpoint
DROP INDEX "Objective__order__index";--> statement-breakpoint
DROP INDEX "Objective__boardId__title__unique";--> statement-breakpoint
DROP INDEX "ObjectiveActivity__objectiveId__createdAt__index";--> statement-breakpoint
DROP INDEX "ObjectiveActivity__typeId__index";--> statement-breakpoint
DROP INDEX "ObjectiveActivity__actorId__index";--> statement-breakpoint
DROP INDEX "ObjectiveActivity__assigneeId__index";--> statement-breakpoint
DROP INDEX "ObjectiveActivity__tagId__index";--> statement-breakpoint
DROP INDEX "ObjectiveActivity__commentId__index";--> statement-breakpoint
DROP INDEX "ObjectiveActivity__createdAt__index";--> statement-breakpoint
DROP INDEX "ObjectiveActivityType_value_unique";--> statement-breakpoint
DROP INDEX "ObjectiveBoard__slug__unique";--> statement-breakpoint
DROP INDEX "ObjectiveBoard__isCurrent__unique";--> statement-breakpoint
DROP INDEX "ObjectiveComment__objectiveId__index";--> statement-breakpoint
DROP INDEX "ObjectiveComment__Assignee__personId__index";--> statement-breakpoint
DROP INDEX "ObjectiveComment__Assignee__commentId__personId__unique";--> statement-breakpoint
DROP INDEX "Objective__Assignee__personId__index";--> statement-breakpoint
DROP INDEX "Objective__Assignee__objectiveId__personId__unique";--> statement-breakpoint
DROP INDEX "Objective__Tag__tagId__index";--> statement-breakpoint
DROP INDEX "Objective__Tag__objectiveId__tagId__unique";--> statement-breakpoint
DROP INDEX "Person__StaffPosition__positionId__index";--> statement-breakpoint
DROP INDEX "Person__StaffPosition__personId__positionId__unique";--> statement-breakpoint
DROP INDEX "Session__personId__index";--> statement-breakpoint
DROP INDEX "Trade__JobLead__jobLeadId__index";--> statement-breakpoint
DROP INDEX "Trade__JobLead__tradeId__jobLeadId__unique";--> statement-breakpoint
ALTER TABLE `ObjectiveColumn` ALTER COLUMN "slug" TO "slug" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `Contact__personId__unique` ON `Contact` (`personId`);--> statement-breakpoint
CREATE UNIQUE INDEX `Contact__email__unique` ON `Contact` (`email`);--> statement-breakpoint
CREATE INDEX `Job__statusId__index` ON `Job` (`statusId`);--> statement-breakpoint
CREATE INDEX `JobLead__statusId__index` ON `JobLead` (`statusId`);--> statement-breakpoint
CREATE UNIQUE INDEX `JobLead__jobId__unique` ON `JobLead` (`jobId`);--> statement-breakpoint
CREATE INDEX `Job__Client__clientId__index` ON `Job__Client` (`clientId`);--> statement-breakpoint
CREATE UNIQUE INDEX `Job__Client__jobId__clientId__unique` ON `Job__Client` (`jobId`,`clientId`);--> statement-breakpoint
CREATE INDEX `Job__Trade__tradeId__index` ON `Job__Trade` (`tradeId`);--> statement-breakpoint
CREATE UNIQUE INDEX `Job__Trade__jobId__tradeId__unique` ON `Job__Trade` (`jobId`,`tradeId`);--> statement-breakpoint
CREATE INDEX `MagicToken__personId__index` ON `MagicToken` (`personId`);--> statement-breakpoint
CREATE INDEX `MagicToken__tokenHash__index` ON `MagicToken` (`tokenHash`);--> statement-breakpoint
CREATE INDEX `Objective__columnId__index` ON `Objective` (`columnId`);--> statement-breakpoint
CREATE INDEX `Objective__order__index` ON `Objective` (`order`);--> statement-breakpoint
CREATE UNIQUE INDEX `Objective__boardId__title__unique` ON `Objective` (`boardId`,`title`);--> statement-breakpoint
CREATE INDEX `ObjectiveActivity__objectiveId__createdAt__index` ON `ObjectiveActivity` (`objectiveId`,`createdAt`);--> statement-breakpoint
CREATE INDEX `ObjectiveActivity__typeId__index` ON `ObjectiveActivity` (`typeId`);--> statement-breakpoint
CREATE INDEX `ObjectiveActivity__actorId__index` ON `ObjectiveActivity` (`actorId`);--> statement-breakpoint
CREATE INDEX `ObjectiveActivity__assigneeId__index` ON `ObjectiveActivity` (`assigneeId`);--> statement-breakpoint
CREATE INDEX `ObjectiveActivity__tagId__index` ON `ObjectiveActivity` (`tagId`);--> statement-breakpoint
CREATE INDEX `ObjectiveActivity__commentId__index` ON `ObjectiveActivity` (`commentId`);--> statement-breakpoint
CREATE INDEX `ObjectiveActivity__createdAt__index` ON `ObjectiveActivity` (`createdAt`);--> statement-breakpoint
CREATE UNIQUE INDEX `ObjectiveActivityType_value_unique` ON `ObjectiveActivityType` (`value`);--> statement-breakpoint
CREATE UNIQUE INDEX `ObjectiveBoard__slug__unique` ON `ObjectiveBoard` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `ObjectiveBoard__isCurrent__unique` ON `ObjectiveBoard` (`isCurrent`) WHERE "ObjectiveBoard"."isCurrent" = 1;--> statement-breakpoint
CREATE INDEX `ObjectiveComment__objectiveId__index` ON `ObjectiveComment` (`objectiveId`);--> statement-breakpoint
CREATE INDEX `ObjectiveComment__Assignee__personId__index` ON `ObjectiveComment__Assignee` (`personId`);--> statement-breakpoint
CREATE UNIQUE INDEX `ObjectiveComment__Assignee__commentId__personId__unique` ON `ObjectiveComment__Assignee` (`commentId`,`personId`);--> statement-breakpoint
CREATE INDEX `Objective__Assignee__personId__index` ON `Objective__Assignee` (`personId`);--> statement-breakpoint
CREATE UNIQUE INDEX `Objective__Assignee__objectiveId__personId__unique` ON `Objective__Assignee` (`objectiveId`,`personId`);--> statement-breakpoint
CREATE INDEX `Objective__Tag__tagId__index` ON `Objective__Tag` (`tagId`);--> statement-breakpoint
CREATE UNIQUE INDEX `Objective__Tag__objectiveId__tagId__unique` ON `Objective__Tag` (`objectiveId`,`tagId`);--> statement-breakpoint
CREATE INDEX `Person__StaffPosition__positionId__index` ON `Person__StaffPosition` (`positionId`);--> statement-breakpoint
CREATE UNIQUE INDEX `Person__StaffPosition__personId__positionId__unique` ON `Person__StaffPosition` (`personId`,`positionId`);--> statement-breakpoint
CREATE INDEX `Session__personId__index` ON `Session` (`personId`);--> statement-breakpoint
CREATE INDEX `Trade__JobLead__jobLeadId__index` ON `Trade__JobLead` (`jobLeadId`);--> statement-breakpoint
CREATE UNIQUE INDEX `Trade__JobLead__tradeId__jobLeadId__unique` ON `Trade__JobLead` (`tradeId`,`jobLeadId`);