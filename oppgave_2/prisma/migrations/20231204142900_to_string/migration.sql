/*
  Warnings:

  - You are about to drop the column `competitionId` on the `Goal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Competition" ADD COLUMN "goals" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Goal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "date" DATETIME,
    "goal" INTEGER,
    "comment" TEXT,
    "athleteId" TEXT,
    CONSTRAINT "Goal_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Goal" ("athleteId", "comment", "date", "goal", "id", "title") SELECT "athleteId", "comment", "date", "goal", "id", "title" FROM "Goal";
DROP TABLE "Goal";
ALTER TABLE "new_Goal" RENAME TO "Goal";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
