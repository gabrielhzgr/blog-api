/*
  Warnings:

  - You are about to drop the column `parentCommentId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_id_fkey";

-- DropIndex
DROP INDEX "Comment_parentCommentId_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "parentCommentId";
