-- DropIndex
DROP INDEX "invoices_orderId_key";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "description" DROP NOT NULL;
