/*
  Warnings:

  - You are about to drop the column `heartrate` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `speed` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `watt` on the `Athlete` table. All the data in the column will be lost.
  - Added the required column `maxHearteRate` to the `Athlete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thresholdSpeed` to the `Athlete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thresholdWattrate` to the `Athlete` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Athlete" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "sport" TEXT NOT NULL,
    "maxHearteRate" INTEGER NOT NULL,
    "thresholdWattrate" INTEGER NOT NULL,
    "thresholdSpeed" INTEGER NOT NULL
);
INSERT INTO "new_Athlete" ("gender", "id", "sport", "userId") SELECT "gender", "id", "sport", "userId" FROM "Athlete";
DROP TABLE "Athlete";
ALTER TABLE "new_Athlete" RENAME TO "Athlete";
CREATE UNIQUE INDEX "Athlete_userId_key" ON "Athlete"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
