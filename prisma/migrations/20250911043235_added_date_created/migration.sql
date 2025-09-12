/*
  Warnings:

  - Added the required column `dateCreated` to the `ApiKey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApiKey" ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL;
