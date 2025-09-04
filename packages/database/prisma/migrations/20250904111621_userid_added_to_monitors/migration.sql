/*
  Warnings:

  - Added the required column `userId` to the `ActiveMonitor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActiveMonitor" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "isApi" DROP DEFAULT;
