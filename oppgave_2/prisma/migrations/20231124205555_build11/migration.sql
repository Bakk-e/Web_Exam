/*
  Warnings:

  - You are about to drop the column `time` on the `IntervalReport` table. All the data in the column will be lost.
  - Added the required column `duration` to the `IntervalReport` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_IntervalReport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reportId" TEXT NOT NULL,
    "intervalNumber" INTEGER NOT NULL,
    "perceivedIntensityMin" INTEGER NOT NULL,
    "perceivedIntensityMax" INTEGER NOT NULL,
    "perceivedIntensityAvg" INTEGER NOT NULL,
    "pulseMin" INTEGER NOT NULL,
    "pulseMax" INTEGER NOT NULL,
    "pulseAvg" INTEGER NOT NULL,
    "speedMin" REAL NOT NULL,
    "speedMax" REAL NOT NULL,
    "speedAvg" REAL NOT NULL,
    "wattMin" INTEGER NOT NULL,
    "wattMax" INTEGER NOT NULL,
    "wattAvg" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    CONSTRAINT "IntervalReport_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_IntervalReport" ("id", "intervalNumber", "perceivedIntensityAvg", "perceivedIntensityMax", "perceivedIntensityMin", "pulseAvg", "pulseMax", "pulseMin", "reportId", "speedAvg", "speedMax", "speedMin", "wattAvg", "wattMax", "wattMin") SELECT "id", "intervalNumber", "perceivedIntensityAvg", "perceivedIntensityMax", "perceivedIntensityMin", "pulseAvg", "pulseMax", "pulseMin", "reportId", "speedAvg", "speedMax", "speedMin", "wattAvg", "wattMax", "wattMin" FROM "IntervalReport";
DROP TABLE "IntervalReport";
ALTER TABLE "new_IntervalReport" RENAME TO "IntervalReport";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
