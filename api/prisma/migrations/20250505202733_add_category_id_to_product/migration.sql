/*
  Warnings:

  - You are about to drop the column `color` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "color",
DROP COLUMN "size",
ADD COLUMN     "colors" TEXT[],
ADD COLUMN     "sizes" TEXT[];

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "countryCode" SET DEFAULT '+224';
