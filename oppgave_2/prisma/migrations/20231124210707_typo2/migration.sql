/*
  Warnings:

  - You are about to drop the column `maxWattape` on the `IntervalReport` table. All the data in the column will be lost.
  - Added the required column `maxWattage` to the `IntervalReport` table without a default value. This is not possible if the table is not empty.

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
    "maxWattage" INTEGER NOT NULL,
    "averageWattage" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    CONSTRAINT "IntervalReport_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_IntervalReport" ("averageHeartRate", "averageIntesitySone", "averageSpeed", "averageWattage", "duration", "id", "intervalNumber", "maxHeartRate", "maxSpeed", "minHeartRate", "minSpeed", "minWattage", "reportId") SELECT "averageHeartRate", "averageIntesitySone", "averageSpeed", "averageWattage", "duration", "id", "intervalNumber", "maxHeartRate", "maxSpeed", "minHeartRate", "minSpeed", "minWattage", "reportId" FROM "IntervalReport";
DROP TABLE "IntervalReport";
ALTER TABLE "new_IntervalReport" RENAME TO "IntervalReport";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
