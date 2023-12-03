-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Connection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT,
    "goalId" TEXT,
    "competitionId" TEXT,
    CONSTRAINT "Connection_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Connection_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Connection_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Connection" ("competitionId", "goalId", "id", "sessionId") SELECT "competitionId", "goalId", "id", "sessionId" FROM "Connection";
DROP TABLE "Connection";
ALTER TABLE "new_Connection" RENAME TO "Connection";
CREATE UNIQUE INDEX "Connection_sessionId_key" ON "Connection"("sessionId");
CREATE TABLE "new_Interval" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT,
    "duration" INTEGER,
    "intensity" INTEGER,
    "competitionId" TEXT,
    "templateId" TEXT,
    CONSTRAINT "Interval_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Interval_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Interval_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Interval" ("competitionId", "duration", "id", "intensity", "sessionId", "templateId") SELECT "competitionId", "duration", "id", "intensity", "sessionId", "templateId" FROM "Interval";
DROP TABLE "Interval";
ALTER TABLE "new_Interval" RENAME TO "Interval";
CREATE TABLE "new_Questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT,
    "type" TEXT,
    "questionId" TEXT,
    "templateId" TEXT,
    CONSTRAINT "Questions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Questions_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Questions" ("id", "questionId", "templateId", "text", "type") SELECT "id", "questionId", "templateId", "text", "type" FROM "Questions";
DROP TABLE "Questions";
ALTER TABLE "new_Questions" RENAME TO "Questions";
CREATE TABLE "new_ArchivedMeta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "athleteId" TEXT,
    "heartrate" INTEGER,
    "watt" INTEGER,
    "speed" INTEGER,
    "archivedDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ArchivedMeta_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ArchivedMeta" ("archivedDate", "athleteId", "heartrate", "id", "speed", "watt") SELECT "archivedDate", "athleteId", "heartrate", "id", "speed", "watt" FROM "ArchivedMeta";
DROP TABLE "ArchivedMeta";
ALTER TABLE "new_ArchivedMeta" RENAME TO "ArchivedMeta";
CREATE UNIQUE INDEX "ArchivedMeta_athleteId_key" ON "ArchivedMeta"("athleteId");
CREATE TABLE "new_Goal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "date" DATETIME,
    "goal" INTEGER,
    "comment" TEXT,
    "competitionId" TEXT,
    "athleteId" TEXT,
    CONSTRAINT "Goal_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Goal_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Goal" ("athleteId", "comment", "competitionId", "date", "goal", "id", "title") SELECT "athleteId", "comment", "competitionId", "date", "goal", "id", "title" FROM "Goal";
DROP TABLE "Goal";
ALTER TABLE "new_Goal" RENAME TO "Goal";
CREATE TABLE "new_Report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT,
    "comments" TEXT,
    "sessionId" TEXT,
    CONSTRAINT "Report_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Report" ("comments", "id", "sessionId", "status") SELECT "comments", "id", "sessionId", "status" FROM "Report";
DROP TABLE "Report";
ALTER TABLE "new_Report" RENAME TO "Report";
CREATE UNIQUE INDEX "Report_sessionId_key" ON "Report"("sessionId");
CREATE TABLE "new_Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME,
    "title" TEXT,
    "tags" TEXT,
    "type" TEXT,
    "athleteId" TEXT,
    CONSTRAINT "Session_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("athleteId", "date", "id", "tags", "title", "type") SELECT "athleteId", "date", "id", "tags", "title", "type" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
CREATE TABLE "new_Template" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "tags" TEXT,
    "type" TEXT,
    "parameters" TEXT,
    "athleteId" TEXT,
    CONSTRAINT "Template_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Template" ("athleteId", "id", "parameters", "tags", "title", "type") SELECT "athleteId", "id", "parameters", "tags", "title", "type" FROM "Template";
DROP TABLE "Template";
ALTER TABLE "new_Template" RENAME TO "Template";
CREATE TABLE "new_Competition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "date" DATETIME,
    "location" TEXT,
    "type" TEXT,
    "priority" TEXT,
    "comment" TEXT,
    "athleteId" TEXT,
    CONSTRAINT "Competition_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Competition" ("athleteId", "comment", "date", "id", "location", "priority", "title", "type") SELECT "athleteId", "comment", "date", "id", "location", "priority", "title", "type" FROM "Competition";
DROP TABLE "Competition";
ALTER TABLE "new_Competition" RENAME TO "Competition";
CREATE TABLE "new_IntervalReport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reportId" TEXT NOT NULL,
    "intervalNumber" INTEGER,
    "averageIntesitySone" INTEGER,
    "minHeartRate" INTEGER,
    "maxHeartRate" INTEGER,
    "averageHeartRate" INTEGER,
    "minSpeed" REAL,
    "maxSpeed" REAL,
    "averageSpeed" REAL,
    "minWattage" INTEGER,
    "maxWattage" INTEGER,
    "averageWattage" INTEGER,
    "duration" INTEGER,
    CONSTRAINT "IntervalReport_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_IntervalReport" ("averageHeartRate", "averageIntesitySone", "averageSpeed", "averageWattage", "duration", "id", "intervalNumber", "maxHeartRate", "maxSpeed", "maxWattage", "minHeartRate", "minSpeed", "minWattage", "reportId") SELECT "averageHeartRate", "averageIntesitySone", "averageSpeed", "averageWattage", "duration", "id", "intervalNumber", "maxHeartRate", "maxSpeed", "maxWattage", "minHeartRate", "minSpeed", "minWattage", "reportId" FROM "IntervalReport";
DROP TABLE "IntervalReport";
ALTER TABLE "new_IntervalReport" RENAME TO "IntervalReport";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
