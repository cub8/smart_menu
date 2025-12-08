/*
  Warnings:

  - Changed the type of `ingredients` on the `Meal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "recipe" JSONB,
DROP COLUMN "ingredients",
ADD COLUMN     "ingredients" JSONB NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
