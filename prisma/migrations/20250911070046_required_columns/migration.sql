/*
  Warnings:

  - Made the column `companyOwner` on table `ApiKey` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `ApiKey` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ApiKey" ALTER COLUMN "companyOwner" SET NOT NULL,
ALTER COLUMN "role" SET NOT NULL;
