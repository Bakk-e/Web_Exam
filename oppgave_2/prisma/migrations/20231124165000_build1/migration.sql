/*
  Warnings:

  - You are about to drop the `Activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Meta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ActivityToInterval` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ActivityToQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ActivityToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `competitionName` on the `Competition` table. All the data in the column will be lost.
  - You are about to drop the column `goal` on the `Competition` table. All the data in the column will be lost.
  - You are about to drop the column `athleteId` on the `Goal` table. All the data in the column will be lost.
  - Added the required column `location` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Interval` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heartrate` to the `Athlete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speed` to the `Athlete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `watt` to the `Athlete` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Activity_userId_key";

-- DropIndex
DROP INDEX "Activity_slug_key";

-- DropIndex
DROP INDEX "Meta_userId_key";

-- DropIndex
DROP INDEX "_ActivityToInterval_B_index";

-- DropIndex
DROP INDEX "_ActivityToInterval_AB_unique";

-- DropIndex
DROP INDEX "_ActivityToQuestion_B_index";

-- DropIndex
DROP INDEX "_ActivityToQuestion_AB_unique";

-- DropIndex
DROP INDEX "_ActivityToTag_B_index";

-- DropIndex
DROP INDEX "_ActivityToTag_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Activity";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Meta";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ActivityToInterval";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ActivityToQuestion";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ActivityToTag";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "athleteId" TEXT,
    CONSTRAINT "Session_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    CONSTRAINT "Report_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IntervalReport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reportId" TEXT NOT NULL,
    "intervalNumber" INTEGER NOT NULL,
    "perceivedIntensityMin" INTEGER NOT NULL,
    "perceivedIntensityMax" INTEGER NOT NULL,
    "perceivedIntensityAvg" INTEGER NOT NULL,
    "pulseMin" INTEGER NOT NULL,
    "pulseMax" INTEGER NOT NULL,
    "pulseAvg" INTEGER NOT NULL,
    "speedMin" REAL NOT NULL,
    "speedMax" REAL NOT NULL,
    "speedAvg" REAL NOT NULL,
    "wattMin" INTEGER NOT NULL,
    "wattMax" INTEGER NOT NULL,
    "wattAvg" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    CONSTRAINT "IntervalReport_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Connection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "goalId" TEXT,
    "competitionId" TEXT,
    CONSTRAINT "Connection_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Connection_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Connection_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Competition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "athleteId" TEXT,
    "intervalId" TEXT,
    CONSTRAINT "Competition_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Competition_intervalId_fkey" FOREIGN KEY ("intervalId") REFERENCES "Interval" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Competition" ("athleteId", "comment", "date", "id") SELECT "athleteId", "comment", "date", "id" FROM "Competition";
DROP TABLE "Competition";
ALTER TABLE "new_Competition" RENAME TO "Competition";
CREATE UNIQUE INDEX "Competition_slug_key" ON "Competition"("slug");
CREATE TABLE "new_Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "anwser" TEXT,
    "sessionId" TEXT,
    "reportId" TEXT,
    CONSTRAINT "Question_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Question_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("id", "question", "type") SELECT "id", "question", "type" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE TABLE "new_Interval" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "intensity" INTEGER NOT NULL,
    CONSTRAINT "Interval_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Interval" ("duration", "id", "intensity") SELECT "duration", "id", "intensity" FROM "Interval";
DROP TABLE "Interval";
ALTER TABLE "new_Interval" RENAME TO "Interval";
CREATE TABLE "new_Goal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "goalName" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "place" TEXT NOT NULL,
    "goal" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "competitionId" TEXT,
    CONSTRAINT "Goal_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Goal" ("comment", "date", "goal", "goalName", "id", "place") SELECT "comment", "date", "goal", "goalName", "id", "place" FROM "Goal";
DROP TABLE "Goal";
ALTER TABLE "new_Goal" RENAME TO "Goal";
CREATE TABLE "new_Athlete" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "sport" TEXT NOT NULL,
    "heartrate" INTEGER NOT NULL,
    "watt" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL
);
INSERT INTO "new_Athlete" ("gender", "id", "sport", "userId") SELECT "gender", "id", "sport", "userId" FROM "Athlete";
DROP TABLE "Athlete";
ALTER TABLE "new_Athlete" RENAME TO "Athlete";
CREATE UNIQUE INDEX "Athlete_userId_key" ON "Athlete"("userId");
CREATE TABLE "new_Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "sessionId" TEXT,
    CONSTRAINT "Tag_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Tag" ("id", "name") SELECT "id", "name" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
CREATE TABLE "new_ArchivedMeta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "athleteId" TEXT NOT NULL,
    "heartrate" INTEGER NOT NULL,
    "watt" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "archivedDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ArchivedMeta_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ArchivedMeta" ("athleteId", "heartrate", "id", "speed", "watt") SELECT "athleteId", "heartrate", "id", "speed", "watt" FROM "ArchivedMeta";
DROP TABLE "ArchivedMeta";
ALTER TABLE "new_ArchivedMeta" RENAME TO "ArchivedMeta";
CREATE UNIQUE INDEX "ArchivedMeta_athleteId_key" ON "ArchivedMeta"("athleteId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Report_sessionId_key" ON "Report"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Connection_sessionId_key" ON "Connection"("sessionId");
