/*
  Warnings:

  - You are about to drop the column `perceivedIntensityAvg` on the `IntervalReport` table. All the data in the column will be lost.
  - You are about to drop the column `perceivedIntensityMax` on the `IntervalReport` table. All the data in the column will be lost.
  - You are about to drop the column `perceivedIntensityMin` on the `IntervalReport` table. All the data in the column will be lost.
  - You are about to drop the column `pulseAvg` on the `IntervalReport` table. All the data in the column will be lost.
  - You are about to drop the column `pulseMax` on the `IntervalReport` table. All the data in the column will be lost.
  - You are about to drop the column `pulseMin` on the `IntervalReport` table. All the data in the column will be lost.
  - You are about to drop the column `speedAvg` on the `IntervalReport` table. All the data in the column will be lost.
  - You are about to drop the column `speedMax` on the `IntervalReport` table. All the data in the column will be lost.
  - You are about to drop the column `speedMin` on the `IntervalReport` table. All the data in the column will be lost.
  - You are about to drop the column `wattAvg` on the `IntervalReport` table. All the data in the column will be lost.
  - You are about to drop the column `wattMax` on the `IntervalReport` table. All the data in the column will be lost.
  - You are about to drop the column `wattMin` on the `IntervalReport` table. All the data in the column will be lost.
  - Added the required column `averageHeartRate` to the `IntervalReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averageIntesitySone` to the `IntervalReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averageSpeed` to the `IntervalReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averageWattage` to the `IntervalReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxHeartRate` to the `IntervalReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxSpeed` to the `IntervalReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxWattape` to the `IntervalReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minHeartRate` to the `IntervalReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minSpeed` to the `IntervalReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minWattage` to the `IntervalReport` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_IntervalReport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reportId" TEXT NOT NULL,
    "intervalNumber" INTEGER NOT NULL,
    "averageIntesitySone" INTEGER NOT NULL,
    "minHeartRate" INTEGER NOT NULL,
    "maxHeartRate" INTEGER NOT NULL,
    "averageHeartRate" INTEGER NOT NULL,
    "minSpeed" REAL NOT NULL,
    "maxSpeed" REAL NOT NULL,
    "averageSpeed" REAL NOT NULL,
    "minWattage" INTEGER NOT NULL,
    "maxWattape" INTEGER NOT NULL,
    "averageWattage" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    CONSTRAINT "IntervalReport_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_IntervalReport" ("duration", "id", "intervalNumber", "reportId") SELECT "duration", "id", "intervalNumber", "reportId" FROM "IntervalReport";
DROP TABLE "IntervalReport";
ALTER TABLE "new_IntervalReport" RENAME TO "IntervalReport";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
