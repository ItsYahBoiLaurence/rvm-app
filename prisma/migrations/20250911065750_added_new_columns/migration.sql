-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Viewer', 'Editor');

-- AlterTable
ALTER TABLE "ApiKey" ADD COLUMN     "companyOwner" TEXT,
ADD COLUMN     "role" "Role";
