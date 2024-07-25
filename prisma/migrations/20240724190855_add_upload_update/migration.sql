/*
  Warnings:

  - Made the column `publicId` on table `uploads` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "uploads" ALTER COLUMN "publicId" SET NOT NULL;
