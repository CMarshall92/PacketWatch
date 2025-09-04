/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `ActiveMonitor` will be added. If there are existing duplicate values, this will fail.
  - The required column `slug` was added to the `ActiveMonitor` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "ActiveMonitor" ADD COLUMN     "icon" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ActiveMonitor_slug_key" ON "ActiveMonitor"("slug");
