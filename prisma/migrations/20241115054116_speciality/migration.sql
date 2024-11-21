/*
  Warnings:

  - Changed the type of `specialty` on the `Doctor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Specialty" AS ENUM ('Cardiologist', 'Dermatologist', 'Neurologist', 'Pediatrician', 'Psychiatrist', 'Oncologist', 'Gynecologist', 'Ophthalmologist');

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "specialty",
ADD COLUMN     "specialty" "Specialty" NOT NULL;
