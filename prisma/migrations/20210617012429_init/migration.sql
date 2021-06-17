/*
  Warnings:

  - You are about to drop the column `user_id` on the `ads` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ads` DROP FOREIGN KEY `ads_ibfk_1`;

-- AlterTable
ALTER TABLE `ads` DROP COLUMN `user_id`;
