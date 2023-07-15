/*
  Warnings:

  - A unique constraint covering the columns `[whatsapp]` on the table `ORGs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password_hash` to the `ORGs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ORGs" ADD COLUMN     "password_hash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ORGs_whatsapp_key" ON "ORGs"("whatsapp");
