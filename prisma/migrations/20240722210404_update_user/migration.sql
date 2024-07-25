/*
  Warnings:

  - You are about to drop the column `lastname` on the `users` table. All the data in the column will be lost.
  - Added the required column `lastName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "lastname",
ADD COLUMN     "lastName" TEXT NOT NULL;