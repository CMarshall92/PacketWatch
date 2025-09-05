-- CreateTable
CREATE TABLE "ActiveMonitor" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT,
    "userId" TEXT NOT NULL,
    "icon" TEXT,
    "serviceUrl" TEXT NOT NULL,
    "isApi" BOOLEAN NOT NULL,
    "endpoints" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSelectedAt" TIMESTAMP(3),

    CONSTRAINT "ActiveMonitor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActiveMonitor_slug_key" ON "ActiveMonitor"("slug");
