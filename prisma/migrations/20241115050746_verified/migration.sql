/*
  Warnings:

  - Added the required column `isVerified` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isVerified` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "isVerified" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "isVerified" BOOLEAN NOT NULL;
