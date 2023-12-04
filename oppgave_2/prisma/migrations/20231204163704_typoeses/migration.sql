/*
  Warnings:

  - You are about to drop the column `heartRate` on the `Meta` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Activity` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "heartrate" INTEGER,
    "watt" INTEGER,
    "speed" INTEGER,
    "athleteId" TEXT,
    CONSTRAINT "Meta_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Meta" ("athleteId", "id", "speed", "watt") SELECT "athleteId", "id", "speed", "watt" FROM "Meta";
DROP TABLE "Meta";
ALTER TABLE "new_Meta" RENAME TO "Meta";
CREATE UNIQUE INDEX "Meta_athleteId_key" ON "Meta"("athleteId");
CREATE TABLE "new_Activity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME,
    "name" TEXT,
    "type" TEXT,
    "tags" TEXT,
    "goalId" TEXT,
    "athleteId" TEXT,
    CONSTRAINT "Activity_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Activity_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Activity" ("athleteId", "date", "goalId", "id", "tags", "type") SELECT "athleteId", "date", "goalId", "id", "tags", "type" FROM "Activity";
DROP TABLE "Activity";
ALTER TABLE "new_Activity" RENAME TO "Activity";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
