-- CreateTable
CREATE TABLE "Athlete" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "sport" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Meta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "heartrate" INTEGER NOT NULL,
    "watt" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Meta_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Athlete" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Activities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "goalId" TEXT NOT NULL,
    CONSTRAINT "Activities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Athlete" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Intervals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "duration" INTEGER NOT NULL,
    "intensity" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ActivitiesToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ActivitiesToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Activities" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ActivitiesToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ActivitiesToQuestions" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ActivitiesToQuestions_A_fkey" FOREIGN KEY ("A") REFERENCES "Activities" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ActivitiesToQuestions_B_fkey" FOREIGN KEY ("B") REFERENCES "Questions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ActivitiesToIntervals" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ActivitiesToIntervals_A_fkey" FOREIGN KEY ("A") REFERENCES "Activities" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ActivitiesToIntervals_B_fkey" FOREIGN KEY ("B") REFERENCES "Intervals" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Athlete_userId_key" ON "Athlete"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Meta_userId_key" ON "Meta"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivitiesToTag_AB_unique" ON "_ActivitiesToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivitiesToTag_B_index" ON "_ActivitiesToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivitiesToQuestions_AB_unique" ON "_ActivitiesToQuestions"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivitiesToQuestions_B_index" ON "_ActivitiesToQuestions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivitiesToIntervals_AB_unique" ON "_ActivitiesToIntervals"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivitiesToIntervals_B_index" ON "_ActivitiesToIntervals"("B");
