/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_sessionId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "sessionId";

-- CreateTable
CREATE TABLE "_QuestionToSession" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionToSession_AB_unique" ON "_QuestionToSession"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionToSession_B_index" ON "_QuestionToSession"("B");

-- AddForeignKey
ALTER TABLE "_QuestionToSession" ADD CONSTRAINT "_QuestionToSession_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToSession" ADD CONSTRAINT "_QuestionToSession_B_fkey" FOREIGN KEY ("B") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
