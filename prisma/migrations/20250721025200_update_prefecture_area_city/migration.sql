-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_areaId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_cityId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_prefectureId_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "prefectureId" DROP NOT NULL,
ALTER COLUMN "areaId" DROP NOT NULL,
ALTER COLUMN "cityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_prefectureId_fkey" FOREIGN KEY ("prefectureId") REFERENCES "Prefecture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;
