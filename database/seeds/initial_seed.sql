-- ============================================================================
-- INITIAL SEED DATA FOR DYNAMIC COMPANY PROFILE CMS
-- Import this after database/schema.sql
-- ============================================================================

-- 1. ROLES
INSERT INTO `roles` (`id`, `name`, `slug`, `description`, `is_system`) VALUES
(1, 'Super Admin', 'super-admin', 'Akses penuh ke seluruh sistem, konfigurasi, dan database', 1),
(2, 'Administrator', 'admin', 'Pengelolaan konten, pengguna, media, dan konfigurasi umum', 1),
(3, 'Editor', 'editor', 'Dapat membuat, menyunting, dan mempublikasikan seluruh konten', 0),
(4, 'Author', 'author', 'Dapat membuat artikel blog sendiri dalam status draft', 0),
(5, 'SEO Specialist', 'seo-specialist', 'Pengelolaan metadata SEO, sitemap, redirect, dan audit konten', 0),
(6, 'Analyst', 'analyst', 'Akses laporan analitik, metrik konversi, dan event tracking', 0),
(7, 'Contact Manager', 'contact-manager', 'Pengelolaan kontak masuk, balasan email Zoho, dan ekspor pesan', 0);

-- 2. PERMISSIONS
INSERT INTO `permissions` (`id`, `module`, `action`, `slug`, `description`) VALUES
(1, 'dashboard', 'view', 'dashboard.view', 'Melihat ringkasan dashboard analitik'),
(2, 'pages', 'view', 'pages.view', 'Melihat daftar halaman'),
(3, 'pages', 'create', 'pages.create', 'Membuat halaman baru'),
(4, 'pages', 'edit', 'pages.edit', 'Menyunting halaman dan section builder'),
(5, 'pages', 'delete', 'pages.delete', 'Menghapus halaman'),
(6, 'pages', 'publish', 'pages.publish', 'Mempublikasikan halaman ke publik'),
(7, 'blog', 'view', 'blog.view', 'Melihat daftar artikel blog'),
(8, 'blog', 'create', 'blog.create', 'Menulis artikel blog baru'),
(9, 'blog', 'edit', 'blog.edit', 'Menyunting artikel blog'),
(10, 'blog', 'delete', 'blog.delete', 'Menghapus artikel blog'),
(11, 'blog', 'publish', 'blog.publish', 'Mempublikasikan artikel blog'),
(12, 'events', 'manage', 'events.manage', 'Mengelola agenda dan acara'),
(13, 'media', 'upload', 'media.upload', 'Mengunggah aset media ke library'),
(14, 'media', 'delete', 'media.delete', 'Menghapus aset media'),
(15, 'menu', 'manage', 'menu.manage', 'Mengatur struktur navigasi dan menu'),
(16, 'themes', 'manage', 'themes.manage', 'Mengatur kustomisasi warna dan tema'),
(17, 'seo', 'manage', 'seo.manage', 'Mengelola metadata SEO global dan per halaman'),
(18, 'seo', 'audit', 'seo.audit', 'Menjalankan audit SEO dan rekomendasi'),
(19, 'contacts', 'view', 'contacts.view', 'Melihat pesan kontak masuk'),
(20, 'contacts', 'reply', 'contacts.reply', 'Membalas pesan kontak via Zoho SMTP'),
(21, 'contacts', 'export', 'contacts.export', 'Mengekspor data kontak ke CSV'),
(22, 'analytics', 'view', 'analytics.view', 'Melihat data analitik dan tracking'),
(23, 'users', 'manage', 'users.manage', 'Mengelola akun pengguna dan peran'),
(24, 'settings', 'manage', 'settings.manage', 'Mengubah konfigurasi sistem dan email');

-- Hubungkan Super Admin ke semua permission
INSERT INTO `role_permissions` (`role_id`, `permission_id`)
SELECT 1, id FROM `permissions`;

-- Hubungkan Administrator ke permission operasional
INSERT INTO `role_permissions` (`role_id`, `permission_id`)
SELECT 2, id FROM `permissions` WHERE id NOT IN (23, 24);

-- Hubungkan Contact Manager
INSERT INTO `role_permissions` (`role_id`, `permission_id`) VALUES
(7, 1), (7, 19), (7, 20), (7, 21);

-- 3. USERS (Password default: 'Password123!' -> hashed with BCRYPT)
INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `is_active`) VALUES
(1, 'Super Administrator', 'admin@company.com', '$2y$12$N9qo8uLOickgx2ZMRZoMye.p0b9j9/3pW8nB7yRkM6l4lM3eQ8l3W', 1),
(2, 'Dimas Prasetyo (Contact Mgr)', 'support@company.com', '$2y$12$N9qo8uLOickgx2ZMRZoMye.p0b9j9/3pW8nB7yRkM6l4lM3eQ8l3W', 1);

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 1),
(2, 7);

-- 4. SITE SETTINGS
INSERT INTO `site_settings` (`setting_group`, `key_name`, `value`, `is_autoload`) VALUES
('general', 'company_name', 'PT Nusantara Solusi Prima', 1),
('general', 'tagline_id', 'Mitra Transformasi Digital & Inovasi Rekayasa Terdepan', 1),
('general', 'tagline_en', 'Pioneering Digital Transformation & Engineering Solutions', 1),
('general', 'phone', '+62 21 5088 9200', 1),
('general', 'whatsapp', '+62 811 9876 5432', 1),
('general', 'email', 'contact@nusantaraprima.co.id', 1),
('general', 'address_id', 'Treasury Tower Lt. 32, District 8 SCBD, Jakarta Selatan 12190, Indonesia', 1),
('general', 'address_en', 'Treasury Tower 32nd Fl, District 8 SCBD, South Jakarta 12190, Indonesia', 1),
('general', 'office_hours_id', 'Senin - Jumat: 08:30 - 17:30 WIB', 1),
('general', 'office_hours_en', 'Monday - Friday: 08:30 AM - 05:30 PM (GMT+7)', 1),
('social', 'linkedin', 'https://linkedin.com/company/nusantaraprima', 1),
('social', 'instagram', 'https://instagram.com/nusantaraprima.id', 1),
('social', 'youtube', 'https://youtube.com/@nusantaraprima', 1),
('seo', 'site_title_id', 'PT Nusantara Solusi Prima | Solusi Enterprise & Digital', 1),
('seo', 'site_title_en', 'Nusantara Solusi Prima | Enterprise & Digital Solutions', 1),
('seo', 'site_description_id', 'Perusahaan rekayasa sistem enterprise terpercaya di Indonesia dengan layanan arsitektur cloud, otomatisasi proses bisnis, dan keamanan siber.', 1),
('seo', 'site_description_en', 'Indonesia trusted enterprise engineering firm delivering modern cloud infrastructure, intelligent workflow automation, and cybersecurity.', 1);

-- 5. THEMES
INSERT INTO `themes` (`id`, `name`, `is_active`, `color_primary`, `color_primary_hover`, `color_secondary`, `color_background`, `color_surface`, `color_text`, `color_heading`, `color_border`, `color_card`, `color_header`, `color_footer`, `color_sidebar`, `font_heading`, `font_body`) VALUES
(1, 'Corporate Navy (Default)', 1, '#1E3A8A', '#1E40AF', '#0D9488', '#FFFFFF', '#F8FAFC', '#1E293B', '#0F172A', '#E2E8F0', '#FFFFFF', '#FFFFFF', '#0F172A', '#0F172A', 'Plus Jakarta Sans', 'Plus Jakarta Sans'),
(2, 'Emerald Enterprise', 0, '#047857', '#065F46', '#2563EB', '#FFFFFF', '#F0FDF4', '#1E293B', '#064E3B', '#E5E7EB', '#FFFFFF', '#FFFFFF', '#064E3B', '#064E3B', 'Plus Jakarta Sans', 'Plus Jakarta Sans'),
(3, 'Obsidian Slate Luxury', 0, '#0F172A', '#1E293B', '#D97706', '#0B0F17', '#111827', '#E2E8F0', '#F8FAFC', '#1F2937', '#111827', '#0F172A', '#030712', '#030712', 'Plus Jakarta Sans', 'Plus Jakarta Sans');

-- 6. NAVIGATION MENUS & ITEMS
INSERT INTO `navigation_menus` (`id`, `name`, `location`, `is_active`) VALUES
(1, 'Main Header Menu', 'header', 1),
(2, 'Footer Company Links', 'footer_col1', 1),
(3, 'Footer Services Links', 'footer_col2', 1);

INSERT INTO `navigation_items` (`id`, `menu_id`, `parent_id`, `label_id`, `label_en`, `url_type`, `url_id`, `url_en`, `order_index`, `is_active`) VALUES
(1, 1, NULL, 'Beranda', 'Home', 'internal', '/', '/', 1, 1),
(2, 1, NULL, 'Tentang Kami', 'About Us', 'internal', '/id/tentang-kami', '/en/about-us', 2, 1),
(3, 1, NULL, 'Layanan', 'Services', 'internal', '/id/layanan', '/en/services', 3, 1),
(4, 1, NULL, 'Blog & Riset', 'Insights', 'internal', '/id/blog', '/en/blog', 4, 1),
(5, 1, NULL, 'Agenda', 'Events', 'internal', '/id/agenda', '/en/events', 5, 1),
(6, 1, NULL, 'Kontak', 'Contact', 'internal', '/id/kontak-kami', '/en/contact-us', 6, 1);

-- 7. BLOG CATEGORIES
INSERT INTO `blog_categories` (`id`, `name_id`, `name_en`, `slug_id`, `slug_en`, `description_id`, `description_en`) VALUES
(1, 'Transformasi Enterprise', 'Enterprise Transformation', 'transformasi-enterprise', 'enterprise-transformation', 'Wawasan strategi arsitektur sistem dan efisiensi korporat', 'Strategic insights for modern enterprise systems architecture'),
(2, 'Keamanan Siber', 'Cybersecurity', 'keamanan-siber', 'cybersecurity', 'Panduan perlindungan data dan kepatuhan regulasi', 'Data governance, compliance, and enterprise threat defense'),
(3, 'Inovasi Cloud', 'Cloud Innovation', 'inovasi-cloud', 'cloud-innovation', 'Infrastruktur skalabel dan optimasi biaya komputasi', 'Scalable infrastructure and modern cloud workload efficiency');

-- 8. BLOG POSTS & TRANSLATIONS
INSERT INTO `blog_posts` (`id`, `author_id`, `status`, `reading_time_mins`, `views_count`, `published_at`) VALUES
(1, 1, 'published', 5, 1420, NOW() - INTERVAL 5 DAY),
(2, 1, 'published', 6, 890, NOW() - INTERVAL 12 DAY);

INSERT INTO `blog_translations` (`id`, `post_id`, `locale`, `title`, `slug`, `excerpt`, `content_html`) VALUES
(1, 1, 'id', 'Strategi Modernisasi Arsitektur Perbankan Menuju Zero Downtime', 'strategi-modernisasi-arsitektur-perbankan', 'Bagaimana bank nasional mereduksi latensi transaksi hingga 62% dengan arsitektur microservices terdistribusi.', '<p>Di era ekonomi digital yang berjalan tanpa henti, keandalan sistem perbankan bukan sekadar fitur teknis, melainkan fondasi integritas operasional...</p>'),
(2, 1, 'en', 'Modernizing Core Banking Architecture Toward Zero Downtime', 'modernizing-core-banking-architecture', 'How leading financial institutions reduce transaction latency by 62% using resilient distributed microservices.', '<p>In an always-on digital economy, core banking resilience is no longer an afterthought but the foundation of institutional trust...</p>'),
(3, 2, 'id', 'Kepatuhan Regulasi Perlindungan Data Pribadi (UU PDP) untuk Sektor Finansial', 'kepatuhan-regulasi-perlindungan-data-uu-pdp', 'Langkah mitigasi risiko hukum dan implementasi tata kelola enkripsi end-to-end bagi korporasi.', '<p>Pemberlakuan UU Perlindungan Data Pribadi mengharuskan seluruh pengendali data korporasi memperketat standar pengolahan data...</p>'),
(4, 2, 'en', 'Navigating Enterprise Data Governance and Privacy Compliance in ASEAN', 'navigating-enterprise-data-governance-asean', 'Actionable risk mitigation frameworks and end-to-end cryptographic policies for regional corporations.', '<p>Regulatory compliance frameworks across ASEAN have shifted decisively toward strict data sovereign accountability...</p>');

INSERT INTO `blog_post_categories` (`post_id`, `category_id`) VALUES
(1, 1),
(2, 2);

-- 9. EVENTS / AGENDA
INSERT INTO `events` (`id`, `start_datetime`, `end_datetime`, `registration_url`, `status`, `is_featured`, `views_count`) VALUES
(1, NOW() + INTERVAL 14 DAY, NOW() + INTERVAL 14 DAY + INTERVAL 4 HOUR, 'https://nusantaraprima.co.id/register/summit2026', 'published', 1, 640),
(2, NOW() - INTERVAL 20 DAY, NOW() - INTERVAL 20 DAY + INTERVAL 3 HOUR, NULL, 'completed', 0, 1150);

INSERT INTO `event_translations` (`id`, `event_id`, `locale`, `title`, `slug`, `location_name`, `description_html`) VALUES
(1, 1, 'id', 'Indonesia Enterprise Architecture Summit 2026', 'indonesia-enterprise-architecture-summit-2026', 'Grand Ballroom Hotel Mulia Senayan, Jakarta', '<p>Konferensi tahunan para Chief Technology Officer, arsitek sistem, dan pimpinan inovasi terkemuka dari 150+ korporasi di Indonesia.</p>'),
(2, 1, 'en', 'Indonesia Enterprise Architecture Summit 2026', 'indonesia-enterprise-architecture-summit-2026-en', 'Grand Ballroom Mulia Hotel Senayan, Jakarta', '<p>Annual assembly of Chief Technology Officers and enterprise architects representing over 150 leading national enterprises.</p>'),
(3, 2, 'id', 'Executive Roundtable: Tata Kelola Keamanan Siber 2026', 'executive-roundtable-cybersecurity-2026', 'The Ritz-Carlton Pacific Place, SCBD Jakarta', '<p>Diskusi tertutup tingkat direksi membahas strategi ketahanan siber terkoordinasi menghadapi ancaman ransomware modern.</p>'),
(4, 2, 'en', 'Executive Roundtable: Enterprise Cyber Resilience 2026', 'executive-roundtable-cybersecurity-2026-en', 'The Ritz-Carlton Pacific Place, SCBD Jakarta', '<p>Closed-door executive session examining unified incident response strategies against advanced persistent threats.</p>');

-- 10. TRACKING INTEGRATIONS
INSERT INTO `tracking_integrations` (`platform`, `tracking_id`, `is_enabled`, `event_mappings_json`, `last_tested_at`) VALUES
('Google Analytics 4', 'G-N7B9K2M8P1', 1, '{"page_view": true, "cta_click": true, "contact_submit": true}', NOW()),
('Google Tag Manager', 'GTM-WM88KL5', 1, '{"all_events": true}', NOW()),
('Meta Pixel', '984512304812', 0, '{"Lead": true, "PageView": true}', NULL),
('TikTok Pixel', 'C9812903KLM', 0, '{"SubmitForm": true}', NULL);
