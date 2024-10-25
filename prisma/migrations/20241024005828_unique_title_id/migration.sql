/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `Form` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Form_userId_title_key" ON "Form"("userId", "title");
