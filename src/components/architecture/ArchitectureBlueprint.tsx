import React from 'react';
import { Layers, Database, FolderTree, Cpu, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';

interface ArchitectureBlueprintProps {
  onGoToPublic: () => void;
  onGoToAdmin: () => void;
  onGoToExporter: () => void;
}

export const ArchitectureBlueprint: React.FC<ArchitectureBlueprintProps> = ({
  onGoToPublic,
  onGoToAdmin,
  onGoToExporter,
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
              Master Specification & Blueprint
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Dynamic Company Profile CMS · PHP Native 8.2+ & MySQL
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
              Arsitektur aplikasi enterprise mandiri, berjalan langsung di lingkungan Apache & MySQL lokal (XAMPP / MacBook `htdocs`), tanpa dependensi backend cloud.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onGoToPublic}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-semibold transition-colors"
            >
              Lihat Website Publik &rarr;
            </button>
            <button
              onClick={onGoToAdmin}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md text-xs font-semibold transition-colors"
            >
              Buka Admin Panel
            </button>
            <button
              onClick={onGoToExporter}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-xs font-semibold transition-colors"
            >
              Unduh Paket XAMPP (.ZIP)
            </button>
          </div>
        </div>

        {/* 1. ARSITEKTUR */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>1. Arsitektur Sistem (Layered MVC Native)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
              <div className="font-bold text-white text-sm">Presentation Layer (Frontend)</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Template HTML5 semantik, CSS3 berbasis CSS Variables dinamis (--color-primary, --color-surface), Vanilla JavaScript untuk AJAX form submission dan Google Fonts (Plus Jakarta Sans).
              </p>
            </div>
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
              <div className="font-bold text-white text-sm">Application Layer (PHP 8.2 Native)</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Front Controller <code className="text-emerald-400">public/index.php</code>, PSR-4 Autoloader mandiri, Router URL bersih via Apache <code className="text-emerald-400">.htaccess</code>, Middleware RBAC, CSRF token, dan PHPMailer Zoho SMTP.
              </p>
            </div>
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
              <div className="font-bold text-white text-sm">Data Layer (MySQL / MariaDB)</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Engine InnoDB dengan relasi Foreign Key ketat, index performa, charset utf8mb4_unicode_ci, dan koneksi PDO aman berorientasi prepared statements tanpa SQL injection.
              </p>
            </div>
          </div>
        </section>

        {/* 2. STRUKTUR DATABASE */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Database className="w-4 h-4" />
            <span>2. Struktur Database (24 Tabel Relasional)</span>
          </div>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <span className="text-emerald-400 font-bold">users</span>
                <div className="text-[10px] text-slate-500">RBAC, bcrypt, session</div>
              </div>
              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <span className="text-emerald-400 font-bold">roles & permissions</span>
                <div className="text-[10px] text-slate-500">7 Hierarki peran pengguna</div>
              </div>
              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <span className="text-emerald-400 font-bold">page_sections</span>
                <div className="text-[10px] text-slate-500">JSON config visual builder</div>
              </div>
              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <span className="text-emerald-400 font-bold">page_translations</span>
                <div className="text-[10px] text-slate-500">Bilingual ID & EN content</div>
              </div>
              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <span className="text-emerald-400 font-bold">blog_posts</span>
                <div className="text-[10px] text-slate-500">Artikel, views, author FK</div>
              </div>
              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <span className="text-emerald-400 font-bold">events</span>
                <div className="text-[10px] text-slate-500">Agenda, lokasi, status</div>
              </div>
              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <span className="text-emerald-400 font-bold">contacts & replies</span>
                <div className="text-[10px] text-slate-500">Inbox, Zoho SMTP status</div>
              </div>
              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <span className="text-emerald-400 font-bold">seo_metadata</span>
                <div className="text-[10px] text-slate-500">Canonical, OG, audit JSON</div>
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-400">
              Semua tabel tercakup dalam file siap impor phpMyAdmin: <code className="text-white">database/schema.sql</code> & <code className="text-white">database/seeds/initial_seed.sql</code>.
            </div>
          </div>
        </section>

        {/* 3. STRUKTUR FOLDER */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <FolderTree className="w-4 h-4" />
            <span>3. Struktur Folder Modular (XAMPP Standard)</span>
          </div>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs text-slate-300">
            <pre className="overflow-x-auto leading-relaxed">
{`company-profile-cms/
├── app/
│   ├── Controllers/     # Handler request publik & admin panel
│   ├── Models/          # Abstraksi data MySQL
│   ├── Services/        # ZohoMailerService, SeoAuditService, PageBuilderRenderer
│   ├── Middleware/      # AuthMiddleware, RoleMiddleware, CsrfMiddleware
│   └── Helpers/         # Database (PDO), Security, I18n, View
├── config/              # app.php, database.php, mail.php, security.php
├── database/            # schema.sql & initial_seed.sql
├── public/              # DocumentRoot Apache (index.php, .htaccess, uploads/)
├── storage/             # logs/ & backups/
├── .env.example         # Template konfigurasi environment
├── .htaccess            # Shield direktori privat & Apache rewrite
└── composer.json        # phpmailer/phpmailer`}
            </pre>
          </div>
        </section>

        {/* 4. DAFTAR MODUL & FITUR UTAMA */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>4. Daftar 14 Modul Lengkap</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
              <span className="font-bold text-white block mb-1">1. Frontend Dinamis Bilingual</span>
              <span className="text-slate-400">Beranda, Tentang Kami, Layanan, Portofolio, Blog, Agenda, dan Kontak dengan URL slug `/id/` dan `/en/`.</span>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
              <span className="font-bold text-white block mb-1">2. Visual Page Builder CMS</span>
              <span className="text-slate-400">Reorder section, hide/show, pengaturan background, padding, alignment, dan konfigurasi tanpa koding.</span>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
              <span className="font-bold text-white block mb-1">3. Kontak Masuk & Zoho SMTP</span>
              <span className="text-slate-400">Penyimpanan MySQL, anti-spam honeypot, balasan email Zoho langsung dari dashboard, dan ekspor CSV.</span>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
              <span className="font-bold text-white block mb-1">4. Theme Customizer CSS Variables</span>
              <span className="text-slate-400">Preset tema (Corporate Navy, Emerald, Luxury Slate) dan custom color picker yang tersimpan di MySQL.</span>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
              <span className="font-bold text-white block mb-1">5. SEO Manager & Transparent Audit</span>
              <span className="text-slate-400">Sitemap XML dinamis, robots.txt, JSON-LD schema, dan skor audit on-page 0-100 transparan.</span>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
              <span className="font-bold text-white block mb-1">6. RBAC 7 Roles</span>
              <span className="text-slate-400">Super Admin, Administrator, Editor, Author, SEO Specialist, Analyst, Contact Manager dengan granular permissions.</span>
            </div>
          </div>
        </section>

        {/* 5. KONFIGURASI EKSTERNAL & DEPENDENSI */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>5. Dependensi & Konfigurasi Eksternal</span>
          </div>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3 text-xs text-slate-300">
            <div><strong>PHP:</strong> 8.2+ dengan ekstensi <code className="text-emerald-400">pdo_mysql, mbstring, openssl, gd, curl</code>.</div>
            <div><strong>Database:</strong> MySQL 8.0+ atau MariaDB 10.4+ (Default XAMPP).</div>
            <div><strong>Email SMTP:</strong> Zoho Mail (<code className="text-blue-400">smtp.zoho.com</code>, Port 587 TLS).</div>
            <div><strong>Anti-Bot & CAPTCHA:</strong> Cloudflare Turnstile atau Google reCAPTCHA v3 (opsional diuji lokal dengan bypass honeypot).</div>
            <div><strong>Penyimpanan:</strong> Disk lokal tanpa S3 / cloud storage eksternal.</div>
          </div>
        </section>
      </div>
    </div>
  );
};
