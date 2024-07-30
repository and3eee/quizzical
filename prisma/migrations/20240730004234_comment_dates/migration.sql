/*
  Warnings:

  - Added the required column `postedOn` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "postedOn" TIMESTAMP(3) NOT NULL;
