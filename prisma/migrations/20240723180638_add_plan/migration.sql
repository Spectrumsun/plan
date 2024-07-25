/*
  Warnings:

  - You are about to drop the column `title` on the `plans` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `plans` table. All the data in the column will be lost.
  - Added the required column `name` to the `plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prrice` to the `plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validity` to the `plans` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `plans` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "plans" DROP CONSTRAINT "plans_userId_fkey";

-- AlterTable
ALTER TABLE "plans" DROP COLUMN "title",
DROP COLUMN "userId",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "prrice" INTEGER NOT NULL,
ADD COLUMN     "validity" INTEGER NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- CreateTable
CREATE TABLE "subcriptions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prrice" INTEGER NOT NULL,
    "validity" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "subcriptions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subcriptions" ADD CONSTRAINT "subcriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
