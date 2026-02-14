-- ==========================================
-- HOSTINGER MYSQL INITIAL MIGRATION
-- ==========================================

-- Users tablosu
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `password` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(191) NOT NULL,
  `avatar` VARCHAR(191) NULL,
  `type` VARCHAR(191) NOT NULL DEFAULT 'INDIVIDUAL',
  `city` VARCHAR(191) NOT NULL,
  `district` VARCHAR(191) NOT NULL,
  `isVerified` BOOLEAN NOT NULL DEFAULT false,
  `isActive` BOOLEAN NOT NULL DEFAULT true,
  `isAdmin` BOOLEAN NOT NULL DEFAULT false,
  `rating` DOUBLE NOT NULL DEFAULT 0,
  `reviewCount` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  `lastLoginAt` DATETIME(3) NULL,
  
  PRIMARY KEY (`id`),
  UNIQUE INDEX `users_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Categories tablosu
CREATE TABLE IF NOT EXISTS `categories` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `description` VARCHAR(191) NULL,
  `icon` VARCHAR(191) NOT NULL DEFAULT 'Cow',
  `image` VARCHAR(191) NULL,
  `order` INT NOT NULL DEFAULT 0,
  `isActive` BOOLEAN NOT NULL DEFAULT true,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  
  PRIMARY KEY (`id`),
  UNIQUE INDEX `categories_name_key`(`name`),
  UNIQUE INDEX `categories_slug_key`(`slug`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Subcategories tablosu
CREATE TABLE IF NOT EXISTS `subcategories` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `categoryId` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  
  PRIMARY KEY (`id`),
  UNIQUE INDEX `subcategories_categoryId_slug_key`(`categoryId`, `slug`),
  INDEX `subcategories_categoryId_idx`(`categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Listings tablosu
CREATE TABLE IF NOT EXISTS `listings` (
  `id` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  `price` INT NOT NULL,
  `currency` VARCHAR(191) NOT NULL DEFAULT 'TRY',
  `categoryId` VARCHAR(191) NOT NULL,
  `subcategoryId` VARCHAR(191) NULL,
  `city` VARCHAR(191) NOT NULL,
  `district` VARCHAR(191) NOT NULL,
  `fullAddress` VARCHAR(191) NULL,
  `images` TEXT NOT NULL,
  `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
  `isFeatured` BOOLEAN NOT NULL DEFAULT false,
  `isApproved` BOOLEAN NOT NULL DEFAULT false,
  `viewCount` INT NOT NULL DEFAULT 0,
  `favoriteCount` INT NOT NULL DEFAULT 0,
  `userId` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  `expiresAt` DATETIME(3) NULL,
  
  PRIMARY KEY (`id`),
  INDEX `listings_status_isApproved_idx`(`status`, `isApproved`),
  INDEX `listings_categoryId_idx`(`categoryId`),
  INDEX `listings_city_idx`(`city`),
  INDEX `listings_userId_idx`(`userId`),
  INDEX `listings_createdAt_idx`(`createdAt`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Favorites tablosu
CREATE TABLE IF NOT EXISTS `favorites` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `listingId` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  
  PRIMARY KEY (`id`),
  UNIQUE INDEX `favorites_userId_listingId_key`(`userId`, `listingId`),
  INDEX `favorites_userId_idx`(`userId`),
  INDEX `favorites_listingId_idx`(`listingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Messages tablosu
CREATE TABLE IF NOT EXISTS `messages` (
  `id` VARCHAR(191) NOT NULL,
  `content` TEXT NOT NULL,
  `senderId` VARCHAR(191) NOT NULL,
  `receiverId` VARCHAR(191) NOT NULL,
  `listingId` VARCHAR(191) NULL,
  `isRead` BOOLEAN NOT NULL DEFAULT false,
  `readAt` DATETIME(3) NULL,
  `parentId` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  
  PRIMARY KEY (`id`),
  INDEX `messages_senderId_receiverId_idx`(`senderId`, `receiverId`),
  INDEX `messages_listingId_idx`(`listingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Reviews tablosu
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` VARCHAR(191) NOT NULL,
  `rating` INT NOT NULL DEFAULT 5,
  `comment` TEXT NULL,
  `reviewerId` VARCHAR(191) NOT NULL,
  `targetId` VARCHAR(191) NOT NULL,
  `listingId` VARCHAR(191) NULL,
  `isApproved` BOOLEAN NOT NULL DEFAULT false,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  
  PRIMARY KEY (`id`),
  INDEX `reviews_reviewerId_idx`(`reviewerId`),
  INDEX `reviews_targetId_idx`(`targetId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Settings tablosu
CREATE TABLE IF NOT EXISTS `settings` (
  `id` VARCHAR(191) NOT NULL,
  `key` VARCHAR(191) NOT NULL,
  `value` TEXT NOT NULL,
  `description` VARCHAR(191) NULL,
  `updatedAt` DATETIME(3) NOT NULL,
  
  PRIMARY KEY (`id`),
  UNIQUE INDEX `settings_key_key`(`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
