/*
  Warnings:

  - You are about to drop the column `slug` on the `Competition` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Competition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
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
INSERT INTO "new_Competition" ("athleteId", "comment", "date", "id", "intervalId", "location", "priority", "title", "type") SELECT "athleteId", "comment", "date", "id", "intervalId", "location", "priority", "title", "type" FROM "Competition";
DROP TABLE "Competition";
ALTER TABLE "new_Competition" RENAME TO "Competition";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
