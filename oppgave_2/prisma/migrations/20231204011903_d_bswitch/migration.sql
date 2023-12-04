/*
  Warnings:

  - You are about to drop the `IntervalReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `goal` on the `Competition` table. All the data in the column will be lost.
  - You are about to drop the column `maxHeartRate` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `thresholdSpeed` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `thresholdWattage` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `intensity` on the `Interval` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `Interval` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `Connection` table. All the data in the column will be lost.
  - You are about to drop the column `questionId` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `Report` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "IntervalReport";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Session";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Meta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "heartrate" INTEGER,
    "watt" INTEGER,
    "speed" INTEGER,
    "athleteId" TEXT NOT NULL,
    CONSTRAINT "Meta_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME,
    "title" TEXT,
    "type" TEXT,
    "tags" TEXT,
    "goalId" TEXT,
    "athleteId" TEXT,
    CONSTRAINT "Activity_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Activity_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReportInterval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reportId" TEXT NOT NULL,
    "intervalNumber" INTEGER,
    "averageIntesitySone" INTEGER,
    "minHeartRate" INTEGER,
    "maxHeartRate" INTEGER,
    "averageHeartRate" INTEGER,
    "minSpeed" REAL,
    "maxSpeed" REAL,
    "averageSpeed" REAL,
    "minWattage" INTEGER,
    "maxWattage" INTEGER,
    "averageWattage" INTEGER,
    "duration" INTEGER,
    CONSTRAINT "ReportInterval_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Competition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "location" TEXT,
    "date" DATETIME,
    "type" TEXT,
    "comment" TEXT,
    "athleteId" TEXT NOT NULL,
    CONSTRAINT "Competition_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Competition" ("athleteId", "comment", "date", "id", "location", "title", "type") SELECT "athleteId", "comment", "date", "id", "location", "title", "type" FROM "Competition";
DROP TABLE "Competition";
ALTER TABLE "new_Competition" RENAME TO "Competition";
CREATE TABLE "new_Athlete" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "sport" TEXT NOT NULL
);
INSERT INTO "new_Athlete" ("gender", "id", "sport", "userId") SELECT "gender", "id", "sport", "userId" FROM "Athlete";
DROP TABLE "Athlete";
ALTER TABLE "new_Athlete" RENAME TO "Athlete";
CREATE UNIQUE INDEX "Athlete_userId_key" ON "Athlete"("userId");
CREATE TABLE "new_Interval" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "duration" INTEGER,
    "intensityZone" INTEGER,
    "competitionId" TEXT,
    "templateId" TEXT,
    "activityId" TEXT,
    CONSTRAINT "Interval_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Interval_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Interval_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Interval" ("competitionId", "duration", "id", "templateId") SELECT "competitionId", "duration", "id", "templateId" FROM "Interval";
DROP TABLE "Interval";
ALTER TABLE "new_Interval" RENAME TO "Interval";
CREATE TABLE "new_Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT,
    "type" TEXT,
    "answer" TEXT,
    "activityId" TEXT,
    CONSTRAINT "Question_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("answer", "id") SELECT "answer", "id" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE TABLE "new_Connection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "activityId" TEXT,
    "goalId" TEXT,
    "competitionId" TEXT,
    CONSTRAINT "Connection_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Connection_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Connection_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Connection" ("competitionId", "goalId", "id") SELECT "competitionId", "goalId", "id" FROM "Connection";
DROP TABLE "Connection";
ALTER TABLE "new_Connection" RENAME TO "Connection";
CREATE UNIQUE INDEX "Connection_activityId_key" ON "Connection"("activityId");
CREATE TABLE "new_Questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT,
    "type" TEXT,
    "templateId" TEXT,
    CONSTRAINT "Questions_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Questions" ("id", "templateId", "text", "type") SELECT "id", "templateId", "text", "type" FROM "Questions";
DROP TABLE "Questions";
ALTER TABLE "new_Questions" RENAME TO "Questions";
CREATE TABLE "new_Report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT,
    "comments" TEXT,
    "activityId" TEXT,
    CONSTRAINT "Report_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Report" ("comments", "id", "status") SELECT "comments", "id", "status" FROM "Report";
DROP TABLE "Report";
ALTER TABLE "new_Report" RENAME TO "Report";
CREATE UNIQUE INDEX "Report_activityId_key" ON "Report"("activityId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Meta_athleteId_key" ON "Meta"("athleteId");
