/*
  Warnings:

  - You are about to drop the column `authorName` on the `Author` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authorFirstName]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authorFirstName,authorLastName]` on the table `Author` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Author_authorName_key";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "authorName",
ADD COLUMN     "authorFirstName" TEXT,
ADD COLUMN     "authorLastName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Author_authorFirstName_key" ON "Author"("authorFirstName");

-- CreateIndex
CREATE UNIQUE INDEX "Author_authorFirstName_authorLastName_key" ON "Author"("authorFirstName", "authorLastName");
