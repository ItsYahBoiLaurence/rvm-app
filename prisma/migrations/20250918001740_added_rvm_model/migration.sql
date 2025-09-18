-- CreateTable
CREATE TABLE "RVM" (
    "id" TEXT NOT NULL,
    "rvmId" TEXT NOT NULL,
    "apiKeyId" TEXT NOT NULL,

    CONSTRAINT "RVM_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RVM_rvmId_key" ON "RVM"("rvmId");

-- AddForeignKey
ALTER TABLE "RVM" ADD CONSTRAINT "RVM_apiKeyId_fkey" FOREIGN KEY ("apiKeyId") REFERENCES "ApiKey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
