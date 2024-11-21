/*
  Warnings:

  - The primary key for the `Appointment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Doctor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Invoice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MedicalRecord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Patient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_userId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_patientId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalRecord" DROP CONSTRAINT "MedicalRecord_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_userId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "doctorId" SET DATA TYPE TEXT,
ALTER COLUMN "patientId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Appointment_id_seq";

-- AlterTable
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Doctor_id_seq";

-- AlterTable
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "patientId" SET DATA TYPE TEXT,
ALTER COLUMN "doctorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Invoice_id_seq";

-- AlterTable
ALTER TABLE "MedicalRecord" DROP CONSTRAINT "MedicalRecord_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "patientId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MedicalRecord_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MedicalRecord_id_seq";

-- AlterTable
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Patient_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Patient_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
