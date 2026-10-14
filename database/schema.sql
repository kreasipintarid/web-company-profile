-- ============================================================================
-- DYNAMIC COMPANY PROFILE CMS + ADMIN PANEL DATABASE SCHEMA
-- Compatible with MySQL 8.0+ & MariaDB 10.4+ (phpMyAdmin / XAMPP)
-- Engine: InnoDB | Charset: utf8mb4 | Collation: utf8mb4_unicode_ci
-- ============================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- ----------------------------------------------------------------------------
-- 1. USERS & ROLES (RBAC)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `audit_logs`;
DROP TABLE IF EXISTS `email_logs`;
DROP TABLE IF EXISTS `contact_notes`;
DROP TABLE IF EXISTS `contact_replies`;
DROP TABLE IF EXISTS `contacts`;
DROP TABLE IF EXISTS `tracking_integrations`;
DROP TABLE IF EXISTS `analytics_daily_summaries`;
DROP TABLE IF EXISTS `analytics_events`;
DROP TABLE IF EXISTS `redirects`;
DROP TABLE IF EXISTS `seo_metadata`;
DROP TABLE IF EXISTS `event_translations`;
DROP TABLE IF EXISTS `events`;
DROP TABLE IF EXISTS `blog_post_tags`;
DROP TABLE IF EXISTS `blog_post_categories`;
DROP TABLE IF EXISTS `blog_tags`;
DROP TABLE IF EXISTS `blog_categories`;
DROP TABLE IF EXISTS `blog_translations`;
DROP TABLE IF EXISTS `blog_posts`;
DROP TABLE IF EXISTS `navigation_items`;
DROP TABLE IF EXISTS `navigation_menus`;
DROP TABLE IF EXISTS `page_sections`;
DROP TABLE IF EXISTS `page_translations`;
DROP TABLE IF EXISTS `pages`;
DROP TABLE IF EXISTS `media`;
DROP TABLE IF EXISTS `themes`;
DROP TABLE IF EXISTS `site_settings`;
DROP TABLE IF EXISTS `user_roles`;
DROP TABLE IF EXISTS `role_permissions`;
DROP TABLE IF EXISTS `permissions`;
DROP TABLE IF EXISTS `roles`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `avatar` VARCHAR(255) DEFAULT NULL,
  `phone` VARCHAR(30) DEFAULT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `two_factor_secret` VARCHAR(255) DEFAULT NULL,
  `last_login_at` DATETIME DEFAULT NULL,
  `last_login_ip` VARCHAR(45) DEFAULT NULL,
  `remember_token` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_users_email` (`email`),
  INDEX `idx_users_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `roles` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `slug` VARCHAR(50) NOT NULL UNIQUE,
  `description` VARCHAR(255) DEFAULT NULL,
  `is_system` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `permissions` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `module` VARCHAR(50) NOT NULL,
  `action` VARCHAR(50) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `description` VARCHAR(255) DEFAULT NULL,
  INDEX `idx_perm_module` (`module`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `role_permissions` (
  `role_id` INT UNSIGNED NOT NULL,
  `permission_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`role_id`, `permission_id`),
  FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user_roles` (
  `user_id` INT UNSIGNED NOT NULL,
  `role_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 2. SITE SETTINGS & THEMES (CSS VARIABLES)
-- ----------------------------------------------------------------------------
CREATE TABLE `site_settings` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `setting_group` VARCHAR(50) NOT NULL DEFAULT 'general',
  `key_name` VARCHAR(100) NOT NULL UNIQUE,
  `value` LONGTEXT DEFAULT NULL,
  `is_autoload` TINYINT(1) DEFAULT 1,
  INDEX `idx_settings_group` (`setting_group`),
  INDEX `idx_settings_autoload` (`is_autoload`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `themes` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `is_active` TINYINT(1) DEFAULT 0,
  `color_primary` VARCHAR(20) NOT NULL DEFAULT '#1E3A8A',
  `color_primary_hover` VARCHAR(20) NOT NULL DEFAULT '#1E40AF',
  `color_secondary` VARCHAR(20) NOT NULL DEFAULT '#0D9488',
  `color_background` VARCHAR(20) NOT NULL DEFAULT '#FFFFFF',
  `color_surface` VARCHAR(20) NOT NULL DEFAULT '#F8FAFC',
  `color_text` VARCHAR(20) NOT NULL DEFAULT '#1E293B',
  `color_heading` VARCHAR(20) NOT NULL DEFAULT '#0F172A',
  `color_border` VARCHAR(20) NOT NULL DEFAULT '#E2E8F0',
  `color_card` VARCHAR(20) NOT NULL DEFAULT '#FFFFFF',
  `color_header` VARCHAR(20) NOT NULL DEFAULT '#FFFFFF',
  `color_footer` VARCHAR(20) NOT NULL DEFAULT '#0F172A',
  `color_sidebar` VARCHAR(20) NOT NULL DEFAULT '#0F172A',
  `font_heading` VARCHAR(100) NOT NULL DEFAULT 'Plus Jakarta Sans',
  `font_body` VARCHAR(100) NOT NULL DEFAULT 'Plus Jakarta Sans',
  `border_radius_base` VARCHAR(20) NOT NULL DEFAULT '8px',
  `custom_css` MEDIUMTEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 3. MEDIA LIBRARY
-- ----------------------------------------------------------------------------
CREATE TABLE `media` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED DEFAULT NULL,
  `filename` VARCHAR(255) NOT NULL,
  `original_name` VARCHAR(255) NOT NULL,
  `file_path` VARCHAR(255) NOT NULL,
  `file_url` VARCHAR(255) NOT NULL,
  `mime_type` VARCHAR(100) NOT NULL,
  `file_size_bytes` INT UNSIGNED NOT NULL,
  `width` INT UNSIGNED DEFAULT NULL,
  `height` INT UNSIGNED DEFAULT NULL,
  `alt_id` VARCHAR(255) DEFAULT NULL,
  `alt_en` VARCHAR(255) DEFAULT NULL,
  `caption_id` TEXT DEFAULT NULL,
  `caption_en` TEXT DEFAULT NULL,
  `usage_count` INT UNSIGNED DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  INDEX `idx_media_mime` (`mime_type`),
  INDEX `idx_media_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 4. PAGES, TRANSLATIONS, & VISUAL PAGE BUILDER SECTIONS
-- ----------------------------------------------------------------------------
CREATE TABLE `pages` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `type` ENUM('home', 'about', 'services', 'contact', 'custom') NOT NULL DEFAULT 'custom',
  `status` ENUM('draft', 'published', 'scheduled') NOT NULL DEFAULT 'draft',
  `is_index` TINYINT(1) DEFAULT 0,
  `template` VARCHAR(50) DEFAULT 'default',
  `created_by` INT UNSIGNED DEFAULT NULL,
  `published_at` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  INDEX `idx_pages_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `page_translations` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `page_id` INT UNSIGNED NOT NULL,
  `locale` VARCHAR(5) NOT NULL DEFAULT 'id',
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `excerpt` TEXT DEFAULT NULL,
  `content_html` LONGTEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uniq_page_locale_slug` (`locale`, `slug`),
  FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `page_sections` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `page_id` INT UNSIGNED NOT NULL,
  `section_type` VARCHAR(50) NOT NULL,
  `section_title` VARCHAR(100) DEFAULT NULL,
  `order_index` INT NOT NULL DEFAULT 0,
  `is_visible` TINYINT(1) DEFAULT 1,
  `config_json` JSON NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE,
  INDEX `idx_sections_page_order` (`page_id`, `order_index`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 5. NAVIGATION & MENUS
-- ----------------------------------------------------------------------------
CREATE TABLE `navigation_menus` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL,
  `location` ENUM('header', 'footer_col1', 'footer_col2', 'footer_col3', 'mobile') NOT NULL,
  `is_active` TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `navigation_items` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `menu_id` INT UNSIGNED NOT NULL,
  `parent_id` INT UNSIGNED DEFAULT NULL,
  `label_id` VARCHAR(100) NOT NULL,
  `label_en` VARCHAR(100) NOT NULL,
  `url_type` ENUM('internal', 'external', 'anchor') NOT NULL DEFAULT 'internal',
  `url_id` VARCHAR(255) NOT NULL,
  `url_en` VARCHAR(255) NOT NULL,
  `target` VARCHAR(10) DEFAULT '_self',
  `order_index` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  FOREIGN KEY (`menu_id`) REFERENCES `navigation_menus` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`parent_id`) REFERENCES `navigation_items` (`id`) ON DELETE CASCADE,
  INDEX `idx_nav_order` (`menu_id`, `parent_id`, `order_index`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 6. BLOG POSTS, CATEGORIES & TAGS
-- ----------------------------------------------------------------------------
CREATE TABLE `blog_categories` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name_id` VARCHAR(100) NOT NULL,
  `name_en` VARCHAR(100) NOT NULL,
  `slug_id` VARCHAR(100) NOT NULL UNIQUE,
  `slug_en` VARCHAR(100) NOT NULL UNIQUE,
  `description_id` TEXT DEFAULT NULL,
  `description_en` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `blog_tags` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name_id` VARCHAR(50) NOT NULL,
  `name_en` VARCHAR(50) NOT NULL,
  `slug_id` VARCHAR(50) NOT NULL UNIQUE,
  `slug_en` VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `blog_posts` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `author_id` INT UNSIGNED DEFAULT NULL,
  `featured_image_id` INT UNSIGNED DEFAULT NULL,
  `status` ENUM('draft', 'published', 'scheduled', 'archived') NOT NULL DEFAULT 'draft',
  `reading_time_mins` TINYINT UNSIGNED DEFAULT 4,
  `views_count` INT UNSIGNED DEFAULT 0,
  `published_at` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  FOREIGN KEY (`featured_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  INDEX `idx_blog_status` (`status`, `published_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `blog_translations` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `post_id` INT UNSIGNED NOT NULL,
  `locale` VARCHAR(5) NOT NULL DEFAULT 'id',
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `excerpt` TEXT DEFAULT NULL,
  `content_html` LONGTEXT NOT NULL,
  UNIQUE KEY `uniq_blog_locale_slug` (`locale`, `slug`),
  FOREIGN KEY (`post_id`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `blog_post_categories` (
  `post_id` INT UNSIGNED NOT NULL,
  `category_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`post_id`, `category_id`),
  FOREIGN KEY (`post_id`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`category_id`) REFERENCES `blog_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `blog_post_tags` (
  `post_id` INT UNSIGNED NOT NULL,
  `tag_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`post_id`, `tag_id`),
  FOREIGN KEY (`post_id`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`tag_id`) REFERENCES `blog_tags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 7. EVENTS / AGENDA
-- ----------------------------------------------------------------------------
CREATE TABLE `events` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `featured_image_id` INT UNSIGNED DEFAULT NULL,
  `start_datetime` DATETIME NOT NULL,
  `end_datetime` DATETIME DEFAULT NULL,
  `registration_url` VARCHAR(255) DEFAULT NULL,
  `status` ENUM('draft', 'published', 'cancelled', 'completed') NOT NULL DEFAULT 'published',
  `is_featured` TINYINT(1) DEFAULT 0,
  `views_count` INT UNSIGNED DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`featured_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  INDEX `idx_events_date` (`start_datetime`, `status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `event_translations` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `event_id` INT UNSIGNED NOT NULL,
  `locale` VARCHAR(5) NOT NULL DEFAULT 'id',
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `location_name` VARCHAR(255) DEFAULT NULL,
  `description_html` LONGTEXT NOT NULL,
  UNIQUE KEY `uniq_event_locale_slug` (`locale`, `slug`),
  FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 8. CONTACTS, REPLIES, & INTERNAL NOTES
-- ----------------------------------------------------------------------------
CREATE TABLE `contacts` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(30) DEFAULT NULL,
  `subject` VARCHAR(200) NOT NULL,
  `message` TEXT NOT NULL,
  `locale` VARCHAR(5) DEFAULT 'id',
  `ip_address` VARCHAR(45) NOT NULL,
  `user_agent` TEXT DEFAULT NULL,
  `status` ENUM('unread', 'read', 'replied', 'archived', 'spam') NOT NULL DEFAULT 'unread',
  `assigned_user_id` INT UNSIGNED DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`assigned_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  INDEX `idx_contact_status` (`status`),
  INDEX `idx_contact_email` (`email`),
  INDEX `idx_contact_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `contact_replies` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `contact_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `reply_subject` VARCHAR(255) NOT NULL,
  `reply_message` LONGTEXT NOT NULL,
  `smtp_status` ENUM('sent', 'failed') NOT NULL DEFAULT 'sent',
  `smtp_error_message` TEXT DEFAULT NULL,
  `sent_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `contact_notes` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `contact_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `note_text` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 9. SEO METADATA, AUDIT & REDIRECTS
-- ----------------------------------------------------------------------------
CREATE TABLE `seo_metadata` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `entity_type` ENUM('page', 'blog', 'event', 'global') NOT NULL,
  `entity_id` INT UNSIGNED NOT NULL,
  `locale` VARCHAR(5) NOT NULL DEFAULT 'id',
  `meta_title` VARCHAR(100) DEFAULT NULL,
  `meta_description` VARCHAR(255) DEFAULT NULL,
  `focus_keyword` VARCHAR(100) DEFAULT NULL,
  `secondary_keywords` VARCHAR(255) DEFAULT NULL,
  `search_intent` VARCHAR(50) DEFAULT 'informational',
  `canonical_url` VARCHAR(255) DEFAULT NULL,
  `is_index` TINYINT(1) DEFAULT 1,
  `is_follow` TINYINT(1) DEFAULT 1,
  `og_title` VARCHAR(100) DEFAULT NULL,
  `og_description` VARCHAR(255) DEFAULT NULL,
  `og_image_url` VARCHAR(255) DEFAULT NULL,
  `schema_type` VARCHAR(50) DEFAULT 'WebPage',
  `seo_score` TINYINT UNSIGNED DEFAULT 0,
  `audit_data_json` JSON DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uniq_seo_entity` (`entity_type`, `entity_id`, `locale`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `redirects` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `source_path` VARCHAR(255) NOT NULL UNIQUE,
  `target_url` VARCHAR(255) NOT NULL,
  `http_code` SMALLINT UNSIGNED NOT NULL DEFAULT 301,
  `is_active` TINYINT(1) DEFAULT 1,
  `hits_count` INT UNSIGNED DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 10. ANALYTICS & CONVERSION TRACKING
-- ----------------------------------------------------------------------------
CREATE TABLE `analytics_events` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `session_id` VARCHAR(64) NOT NULL,
  `visitor_hash` VARCHAR(64) NOT NULL,
  `event_name` VARCHAR(50) NOT NULL,
  `page_url` VARCHAR(255) NOT NULL,
  `referrer` VARCHAR(255) DEFAULT NULL,
  `utm_source` VARCHAR(50) DEFAULT NULL,
  `utm_medium` VARCHAR(50) DEFAULT NULL,
  `utm_campaign` VARCHAR(50) DEFAULT NULL,
  `device_type` VARCHAR(20) DEFAULT 'desktop',
  `browser` VARCHAR(50) DEFAULT NULL,
  `os` VARCHAR(50) DEFAULT NULL,
  `country_code` VARCHAR(5) DEFAULT 'ID',
  `locale` VARCHAR(5) DEFAULT 'id',
  `event_meta_json` JSON DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_event_name_date` (`event_name`, `created_at`),
  INDEX `idx_visitor_hash` (`visitor_hash`),
  INDEX `idx_session_id` (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `analytics_daily_summaries` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `summary_date` DATE NOT NULL UNIQUE,
  `total_pageviews` INT UNSIGNED DEFAULT 0,
  `unique_visitors` INT UNSIGNED DEFAULT 0,
  `total_sessions` INT UNSIGNED DEFAULT 0,
  `cta_clicks` INT UNSIGNED DEFAULT 0,
  `contact_submissions` INT UNSIGNED DEFAULT 0,
  `avg_duration_seconds` INT UNSIGNED DEFAULT 0,
  `top_pages_json` JSON DEFAULT NULL,
  `sources_json` JSON DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `tracking_integrations` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `platform` VARCHAR(50) NOT NULL UNIQUE,
  `tracking_id` VARCHAR(100) DEFAULT NULL,
  `is_enabled` TINYINT(1) DEFAULT 0,
  `event_mappings_json` JSON DEFAULT NULL,
  `last_tested_at` DATETIME DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 11. LOGS & AUDIT TRAIL
-- ----------------------------------------------------------------------------
CREATE TABLE `email_logs` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `recipient_email` VARCHAR(150) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `mailer_service` VARCHAR(50) DEFAULT 'Zoho PHPMailer',
  `status` ENUM('sent', 'failed') NOT NULL,
  `error_info` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_email_recipient` (`recipient_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `audit_logs` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED DEFAULT NULL,
  `action` VARCHAR(50) NOT NULL,
  `entity_type` VARCHAR(50) NOT NULL,
  `entity_id` INT UNSIGNED DEFAULT NULL,
  `description` VARCHAR(255) NOT NULL,
  `old_values_json` JSON DEFAULT NULL,
  `new_values_json` JSON DEFAULT NULL,
  `ip_address` VARCHAR(45) NOT NULL,
  `user_agent` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  INDEX `idx_audit_action` (`action`),
  INDEX `idx_audit_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 12. CAREERS & JOB APPLICATIONS (WITH CV UPLOAD)
-- ----------------------------------------------------------------------------
CREATE TABLE `careers` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `title_id` VARCHAR(150) NOT NULL,
  `title_en` VARCHAR(150) NOT NULL,
  `slug_id` VARCHAR(150) NOT NULL UNIQUE,
  `slug_en` VARCHAR(150) NOT NULL UNIQUE,
  `department` VARCHAR(100) NOT NULL,
  `location` VARCHAR(100) NOT NULL DEFAULT 'Jakarta, Indonesia (Hybrid)',
  `employment_type` ENUM('Full-time', 'Contract', 'Part-time', 'Internship') NOT NULL DEFAULT 'Full-time',
  `experience_level` VARCHAR(50) DEFAULT 'Mid-Senior',
  `description_id` LONGTEXT NOT NULL,
  `description_en` LONGTEXT NOT NULL,
  `requirements_id` LONGTEXT NOT NULL,
  `requirements_en` LONGTEXT NOT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_career_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `job_applications` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `career_id` INT UNSIGNED NOT NULL,
  `full_name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `linkedin_url` VARCHAR(255) DEFAULT NULL,
  `portfolio_url` VARCHAR(255) DEFAULT NULL,
  `resume_filename` VARCHAR(255) NOT NULL,
  `resume_path` VARCHAR(255) NOT NULL,
  `cover_letter` TEXT DEFAULT NULL,
  `status` ENUM('pending', 'reviewed', 'interview', 'accepted', 'rejected') NOT NULL DEFAULT 'pending',
  `ip_address` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`career_id`) REFERENCES `careers` (`id`) ON DELETE CASCADE,
  INDEX `idx_application_status` (`status`),
  INDEX `idx_application_career` (`career_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 13. CUSTOM FORMS & DYNAMIC FORM SUBMISSIONS (SEO FRIENDLY)
-- ----------------------------------------------------------------------------
CREATE TABLE `custom_forms` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `form_key` VARCHAR(80) NOT NULL UNIQUE,
  `title_id` VARCHAR(150) NOT NULL,
  `title_en` VARCHAR(150) NOT NULL,
  `description_id` TEXT DEFAULT NULL,
  `description_en` TEXT DEFAULT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `custom_form_fields` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `form_id` INT UNSIGNED NOT NULL,
  `field_name` VARCHAR(80) NOT NULL,
  `label_id` VARCHAR(120) NOT NULL,
  `label_en` VARCHAR(120) NOT NULL,
  `field_type` ENUM('text', 'email', 'phone', 'number', 'textarea', 'select', 'file') NOT NULL DEFAULT 'text',
  `placeholder_id` VARCHAR(150) DEFAULT NULL,
  `placeholder_en` VARCHAR(150) DEFAULT NULL,
  `is_required` TINYINT(1) DEFAULT 1,
  `order_index` INT NOT NULL DEFAULT 0,
  `options_json` JSON DEFAULT NULL,
  FOREIGN KEY (`form_id`) REFERENCES `custom_forms` (`id`) ON DELETE CASCADE,
  INDEX `idx_form_fields_order` (`form_id`, `order_index`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `custom_form_submissions` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `form_id` INT UNSIGNED NOT NULL,
  `page_slug` VARCHAR(150) NOT NULL,
  `submission_data_json` JSON NOT NULL,
  `ip_address` VARCHAR(45) NOT NULL,
  `user_agent` TEXT DEFAULT NULL,
  `status` ENUM('new', 'processed', 'archived') NOT NULL DEFAULT 'new',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`form_id`) REFERENCES `custom_forms` (`id`) ON DELETE CASCADE,
  INDEX `idx_custom_submission_form` (`form_id`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
