/*
  Warnings:

  - You are about to drop the `Activities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Intervals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Questions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ActivitiesToIntervals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ActivitiesToQuestions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ActivitiesToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_ActivitiesToIntervals_B_index";

-- DropIndex
DROP INDEX "_ActivitiesToIntervals_AB_unique";

-- DropIndex
DROP INDEX "_ActivitiesToQuestions_B_index";

-- DropIndex
DROP INDEX "_ActivitiesToQuestions_AB_unique";

-- DropIndex
DROP INDEX "_ActivitiesToTag_B_index";

-- DropIndex
DROP INDEX "_ActivitiesToTag_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Activities";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Intervals";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Questions";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ActivitiesToIntervals";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ActivitiesToQuestions";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ActivitiesToTag";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Activity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Athlete" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Interval" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "duration" INTEGER NOT NULL,
    "intensity" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "goalName" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "place" TEXT NOT NULL,
    "goal" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "athleteId" TEXT,
    CONSTRAINT "Goal_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Competition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "competitionName" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "goal" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "athleteId" TEXT,
    CONSTRAINT "Competition_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ArchivedMeta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "athleteId" TEXT NOT NULL,
    "heartrate" INTEGER NOT NULL,
    "watt" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    CONSTRAINT "ArchivedMeta_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ActivityToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ActivityToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Activity" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ActivityToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ActivityToQuestion" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ActivityToQuestion_A_fkey" FOREIGN KEY ("A") REFERENCES "Activity" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ActivityToQuestion_B_fkey" FOREIGN KEY ("B") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ActivityToInterval" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ActivityToInterval_A_fkey" FOREIGN KEY ("A") REFERENCES "Activity" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ActivityToInterval_B_fkey" FOREIGN KEY ("B") REFERENCES "Interval" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "heartrate" INTEGER NOT NULL,
    "watt" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Meta_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Athlete" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Meta" ("heartrate", "id", "speed", "userId", "watt") SELECT "heartrate", "id", "speed", "userId", "watt" FROM "Meta";
DROP TABLE "Meta";
ALTER TABLE "new_Meta" RENAME TO "Meta";
CREATE UNIQUE INDEX "Meta_userId_key" ON "Meta"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Activity_slug_key" ON "Activity"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_userId_key" ON "Activity"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ArchivedMeta_athleteId_key" ON "ArchivedMeta"("athleteId");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityToTag_AB_unique" ON "_ActivityToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityToTag_B_index" ON "_ActivityToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityToQuestion_AB_unique" ON "_ActivityToQuestion"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityToQuestion_B_index" ON "_ActivityToQuestion"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityToInterval_AB_unique" ON "_ActivityToInterval"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityToInterval_B_index" ON "_ActivityToInterval"("B");
