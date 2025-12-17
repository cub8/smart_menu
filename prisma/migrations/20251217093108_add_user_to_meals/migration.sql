-- AlterTable
ALTER TABLE "smartmenu"."Meal" ADD COLUMN "userId" TEXT;

-- AddForeignKey
ALTER TABLE "smartmenu"."Meal" ADD CONSTRAINT "Meal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "smartmenu"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
