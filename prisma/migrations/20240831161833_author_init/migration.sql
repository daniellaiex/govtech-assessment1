-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "authorFirstName" TEXT,
    "authorLastName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_authorFirstName_authorLastName_key" ON "Author"("authorFirstName", "authorLastName");
