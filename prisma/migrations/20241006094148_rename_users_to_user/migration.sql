-- AlterTable
ALTER TABLE "User" RENAME CONSTRAINT "Users_pkey" TO "User_pkey";

-- RenameIndex
ALTER INDEX "Users_email_key" RENAME TO "User_email_key";
