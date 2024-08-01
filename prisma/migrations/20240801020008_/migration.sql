/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,questionId]` on the table `QuestionInstance` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "QuestionInstance" DROP CONSTRAINT "QuestionInstance_userId_fkey";

-- AlterTable
ALTER TABLE "QuestionInstance" ALTER COLUMN "passed" SET DEFAULT false,
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "QuestionInstance_sessionId_questionId_key" ON "QuestionInstance"("sessionId", "questionId");

-- AddForeignKey
ALTER TABLE "QuestionInstance" ADD CONSTRAINT "QuestionInstance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
