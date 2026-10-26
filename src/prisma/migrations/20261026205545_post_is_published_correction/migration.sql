/*
  Warnings:

  - You are about to drop the column `isPublished` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "isPublished";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false;
