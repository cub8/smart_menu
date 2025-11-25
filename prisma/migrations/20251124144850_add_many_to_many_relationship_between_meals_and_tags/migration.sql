/*
  Warnings:

  - You are about to drop the column `tags` on the `Meal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "tags";

-- CreateTable
CREATE TABLE "_MealTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MealTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MealTags_B_index" ON "_MealTags"("B");

-- AddForeignKey
ALTER TABLE "_MealTags" ADD CONSTRAINT "_MealTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealTags" ADD CONSTRAINT "_MealTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
