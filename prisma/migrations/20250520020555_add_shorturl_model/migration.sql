-- CreateTable
CREATE TABLE "short_urls" (
    "id" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortId" TEXT NOT NULL,
    "title" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "short_urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "short_urls_shortId_key" ON "short_urls"("shortId");

-- AddForeignKey
ALTER TABLE "short_urls" ADD CONSTRAINT "short_urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
