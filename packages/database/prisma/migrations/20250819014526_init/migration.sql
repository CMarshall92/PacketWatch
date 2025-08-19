-- CreateTable
CREATE TABLE "public"."ActiveMonitor" (
    "id" SERIAL NOT NULL,
    "serviceUrl" TEXT NOT NULL,
    "isApi" BOOLEAN NOT NULL DEFAULT true,
    "endpoints" TEXT[],

    CONSTRAINT "ActiveMonitor_pkey" PRIMARY KEY ("id")
);
