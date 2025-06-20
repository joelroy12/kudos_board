/*
  Warnings:

  - Added the required column `pinnedAt` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "pinnedAt" TIMESTAMP(3) NOT NULL;
