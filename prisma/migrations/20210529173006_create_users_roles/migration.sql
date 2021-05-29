-- CreateTable
CREATE TABLE "users_roles" (
    "roleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("roleId","userId")
);

-- AddForeignKey
ALTER TABLE "users_roles" ADD FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
