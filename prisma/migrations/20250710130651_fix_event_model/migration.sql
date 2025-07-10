/*
  Warnings:

  - Added the required column `prefectureId` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "City" ADD COLUMN     "prefectureId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_prefectureId_fkey" FOREIGN KEY ("prefectureId") REFERENCES "Prefecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
