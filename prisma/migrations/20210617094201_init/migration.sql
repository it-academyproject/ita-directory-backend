/*
  Warnings:

  - Added the required column `user_id` to the `ads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ads` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ads` ADD FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
