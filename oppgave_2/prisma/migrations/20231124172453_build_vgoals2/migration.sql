/*
  Warnings:

  - You are about to drop the column `goalName` on the `Goal` table. All the data in the column will be lost.
  - Added the required column `title` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Goal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "place" TEXT NOT NULL,
    "goal" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "competitionId" TEXT,
    "athleteId" TEXT,
    CONSTRAINT "Goal_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Goal_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Goal" ("athleteId", "comment", "competitionId", "date", "goal", "id", "place") SELECT "athleteId", "comment", "competitionId", "date", "goal", "id", "place" FROM "Goal";
DROP TABLE "Goal";
ALTER TABLE "new_Goal" RENAME TO "Goal";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
