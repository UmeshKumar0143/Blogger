/*
  Warnings:

  - Added the required column `img` to the `blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blog" ADD COLUMN     "img" TEXT NOT NULL;
