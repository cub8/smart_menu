/*
  Warnings:

  - The primary key for the `UserPreference` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserPreference` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserPreference_userId_tagId_key";

-- AlterTable
ALTER TABLE "UserPreference" DROP CONSTRAINT "UserPreference_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("userId", "tagId");
