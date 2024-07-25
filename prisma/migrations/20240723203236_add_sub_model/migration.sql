/*
  Warnings:

  - You are about to drop the column `description` on the `subcriptions` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `subcriptions` table. All the data in the column will be lost.
  - You are about to drop the column `prrice` on the `subcriptions` table. All the data in the column will be lost.
  - You are about to drop the column `validity` on the `subcriptions` table. All the data in the column will be lost.
  - Added the required column `amountPaid` to the `subcriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentGateway` to the `subcriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `subcriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `subcriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planEndDate` to the `subcriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planId` to the `subcriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planStartDate` to the `subcriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subcriptions" DROP COLUMN "description",
DROP COLUMN "name",
DROP COLUMN "prrice",
DROP COLUMN "validity",
ADD COLUMN     "amountPaid" INTEGER NOT NULL,
ADD COLUMN     "paymentGateway" TEXT NOT NULL,
ADD COLUMN     "paymentId" TEXT NOT NULL,
ADD COLUMN     "paymentMethod" TEXT NOT NULL,
ADD COLUMN     "planEndDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "planId" INTEGER NOT NULL,
ADD COLUMN     "planStartDate" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "subcriptions" ADD CONSTRAINT "subcriptions_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
