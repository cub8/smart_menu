-- CreateEnum
CREATE TYPE "TagSection" AS ENUM ('UNIVERSAL', 'SPECIFIC');

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "section" "TagSection" NOT NULL DEFAULT 'UNIVERSAL';
