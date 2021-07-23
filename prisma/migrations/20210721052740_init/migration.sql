-- CreateTable
CREATE TABLE "pswd_recovery_log" (
    "id" SERIAL NOT NULL,
    "recovery_date" TIMESTAMP(3) NOT NULL,
    "recovery_active" BOOLEAN NOT NULL,
    "token_id" TEXT NOT NULL,
    "password_old" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pswd_recovery_log" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
