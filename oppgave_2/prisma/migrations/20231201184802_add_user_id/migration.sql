/*
  Warnings:

  - Added the required column `userId` to the `Athlete` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Athlete" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "sport" TEXT NOT NULL,
    "maxHeartRate" INTEGER,
    "thresholdWattage" INTEGER,
    "thresholdSpeed" INTEGER
);
INSERT INTO "new_Athlete" ("gender", "id", "maxHeartRate", "sport", "thresholdSpeed", "thresholdWattage") SELECT "gender", "id", "maxHeartRate", "sport", "thresholdSpeed", "thresholdWattage" FROM "Athlete";
DROP TABLE "Athlete";
ALTER TABLE "new_Athlete" RENAME TO "Athlete";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
