/*
  Warnings:

  - Made the column `id` on table `ApiKey` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ApiKey" ALTER COLUMN "id" SET NOT NULL;
