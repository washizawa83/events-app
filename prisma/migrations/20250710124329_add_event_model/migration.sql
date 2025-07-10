-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('OFFLINE', 'ONLINE', 'HYBRID');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Prefecture" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Prefecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Area" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "prefectureId" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "areaId" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventMedia" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "EventMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventTag" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "EventTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "startDateTime" TIMESTAMP(3) NOT NULL,
    "endDateTime" TIMESTAMP(3) NOT NULL,
    "locationDetail" VARCHAR(255) NOT NULL,
    "conditions" VARCHAR(255),
    "maxCapacity" TEXT,
    "overview" TEXT,
    "contact" VARCHAR(255),
    "eventType" "EventType" NOT NULL DEFAULT 'OFFLINE',
    "eventStatus" "EventStatus" NOT NULL DEFAULT 'SCHEDULED',
    "ownerId" TEXT NOT NULL,
    "prefectureId" TEXT NOT NULL,
    "areaId" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventAttendees" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EventAttendees_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EventToEventTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EventToEventTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EventAttendees_B_index" ON "_EventAttendees"("B");

-- CreateIndex
CREATE INDEX "_EventToEventTag_B_index" ON "_EventToEventTag"("B");

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_prefectureId_fkey" FOREIGN KEY ("prefectureId") REFERENCES "Prefecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventMedia" ADD CONSTRAINT "EventMedia_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_prefectureId_fkey" FOREIGN KEY ("prefectureId") REFERENCES "Prefecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventAttendees" ADD CONSTRAINT "_EventAttendees_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventAttendees" ADD CONSTRAINT "_EventAttendees_B_fkey" FOREIGN KEY ("B") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventTag" ADD CONSTRAINT "_EventToEventTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventTag" ADD CONSTRAINT "_EventToEventTag_B_fkey" FOREIGN KEY ("B") REFERENCES "EventTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
