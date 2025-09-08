-- CreateTable
CREATE TABLE "User" (
    "messageID" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "sign" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("messageID")
);

-- CreateTable
CREATE TABLE "TransactionData" (
    "id" TEXT NOT NULL,
    "rvmID" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "totalCount" TEXT NOT NULL,
    "totalValue" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "messageID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "sign" TEXT NOT NULL,

    CONSTRAINT "TransactionData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransactionData_rvmID_sign_userID_key" ON "TransactionData"("rvmID", "sign", "userID");
