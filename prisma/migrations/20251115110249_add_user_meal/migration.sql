-- CreateTable
CREATE TABLE "_MealToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MealToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MealToUser_B_index" ON "_MealToUser"("B");

-- AddForeignKey
ALTER TABLE "_MealToUser" ADD CONSTRAINT "_MealToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealToUser" ADD CONSTRAINT "_MealToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
