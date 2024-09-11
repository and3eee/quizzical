-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "markedForReview" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "QuestionInstance" ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT -1;
