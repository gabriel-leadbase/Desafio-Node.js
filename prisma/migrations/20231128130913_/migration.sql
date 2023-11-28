/*
  Warnings:

  - You are about to drop the column `user_id` on the `permissions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_user_id_fkey";

-- AlterTable
ALTER TABLE "permissions" DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "PermissionsOnUsers" (
    "user_id" TEXT NOT NULL,
    "permissions_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PermissionsOnUsers_pkey" PRIMARY KEY ("user_id","permissions_id")
);

-- AddForeignKey
ALTER TABLE "PermissionsOnUsers" ADD CONSTRAINT "PermissionsOnUsers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionsOnUsers" ADD CONSTRAINT "PermissionsOnUsers_permissions_id_fkey" FOREIGN KEY ("permissions_id") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
