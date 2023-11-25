-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_permissions_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "permissions_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_permissions_id_fkey" FOREIGN KEY ("permissions_id") REFERENCES "permissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
