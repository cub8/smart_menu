/*
  Warnings:

  - The primary key for the `UserPreference` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterTable
ALTER TABLE "UserPreference" DROP CONSTRAINT "UserPreference_pkey",
ADD COLUMN     "dayOfWeek" "DayOfWeek" NOT NULL DEFAULT 'MONDAY',
ADD CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("userId", "dayOfWeek", "tagId");
