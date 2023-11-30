/*
  Warnings:

  - You are about to drop the column `priority` on the `Competition` table. All the data in the column will be lost.
  - You are about to drop the column `thresholdWattrate` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Athlete` table. All the data in the column will be lost.
  - Made the column `athleteId` on table `Competition` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Competition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "location" TEXT,
    "date" DATETIME,
    "goal" TEXT,
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
    "gender" TEXT NOT NULL,
    "sport" TEXT NOT NULL,
    "maxHeartRate" INTEGER,
    "thresholdWattage" INTEGER,
    "thresholdSpeed" INTEGER
);
INSERT INTO "new_Athlete" ("gender", "id", "maxHeartRate", "sport", "thresholdSpeed") SELECT "gender", "id", "maxHeartRate", "sport", "thresholdSpeed" FROM "Athlete";
DROP TABLE "Athlete";
ALTER TABLE "new_Athlete" RENAME TO "Athlete";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
