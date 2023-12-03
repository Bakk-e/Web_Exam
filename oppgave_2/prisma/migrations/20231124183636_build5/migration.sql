/*
  Warnings:

  - You are about to drop the column `maxHearteRate` on the `Athlete` table. All the data in the column will be lost.
  - Added the required column `maxHeartRate` to the `Athlete` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Athlete" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "sport" TEXT NOT NULL,
    "maxHeartRate" INTEGER NOT NULL,
    "thresholdWattrate" INTEGER NOT NULL,
    "thresholdSpeed" INTEGER NOT NULL
);
INSERT INTO "new_Athlete" ("gender", "id", "sport", "thresholdSpeed", "thresholdWattrate", "userId") SELECT "gender", "id", "sport", "thresholdSpeed", "thresholdWattrate", "userId" FROM "Athlete";
DROP TABLE "Athlete";
ALTER TABLE "new_Athlete" RENAME TO "Athlete";
CREATE UNIQUE INDEX "Athlete_userId_key" ON "Athlete"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
