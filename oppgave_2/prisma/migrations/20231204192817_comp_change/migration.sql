/*
  Warnings:

  - You are about to drop the column `goals` on the `Competition` table. All the data in the column will be lost.

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
    "priority" TEXT,
    "comment" TEXT,
    "athleteId" TEXT NOT NULL,
    CONSTRAINT "Competition_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Competition" ("athleteId", "comment", "date", "id", "location", "title", "type") SELECT "athleteId", "comment", "date", "id", "location", "title", "type" FROM "Competition";
DROP TABLE "Competition";
ALTER TABLE "new_Competition" RENAME TO "Competition";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
