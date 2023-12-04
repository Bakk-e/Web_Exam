/*
  Warnings:

  - You are about to drop the column `heartrate` on the `Meta` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "heartRate" INTEGER,
    "watt" INTEGER,
    "speed" INTEGER,
    "athleteId" TEXT,
    CONSTRAINT "Meta_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Meta" ("athleteId", "id", "speed", "watt") SELECT "athleteId", "id", "speed", "watt" FROM "Meta";
DROP TABLE "Meta";
ALTER TABLE "new_Meta" RENAME TO "Meta";
CREATE UNIQUE INDEX "Meta_athleteId_key" ON "Meta"("athleteId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
