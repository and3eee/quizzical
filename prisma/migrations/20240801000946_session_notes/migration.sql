-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "sessionId" INTEGER;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;
