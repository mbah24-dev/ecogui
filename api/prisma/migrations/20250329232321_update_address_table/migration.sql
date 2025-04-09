/*
  Warnings:

  - You are about to drop the column `street` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `Address` table. All the data in the column will be lost.
  - Added the required column `description` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "street",
DROP COLUMN "zipCode",
ADD COLUMN     "commune" TEXT,
ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "country" SET DEFAULT 'Guinee';
