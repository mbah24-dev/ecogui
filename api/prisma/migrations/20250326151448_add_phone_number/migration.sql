-- CreateEnum
CREATE TYPE "OrderItemStatus" AS ENUM ('CONFIRMED', 'PENDING', 'REFUSED');

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "status" "OrderItemStatus" NOT NULL DEFAULT 'PENDING';
