/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Athlete` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Athlete_userId_key" ON "Athlete"("userId");
