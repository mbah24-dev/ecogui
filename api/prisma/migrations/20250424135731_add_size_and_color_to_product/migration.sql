-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "color" TEXT[] DEFAULT ARRAY['Standard']::TEXT[],
ADD COLUMN     "size" TEXT[] DEFAULT ARRAY['Taille unique']::TEXT[];
