-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('AVAILABLE', 'SOLD_OUT', 'PENDING');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "discountPrice" DOUBLE PRECISION,
ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'AVAILABLE',
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;
