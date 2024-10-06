/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Users_username_key";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
