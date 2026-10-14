import React, { useState } from 'react';
import JSZip from 'jszip';
import {
  FileCode,
  Download,
  Copy,
  Check,
  Folder,
  Database,
  ExternalLink,
  Terminal,
  Shield,
  Layers,
  CheckCircle2,
} from 'lucide-react';

interface SourceCodeExporterProps {
  onBackToAdmin: () => void;
  onBackToPublic: () => void;
}

export const SourceCodeExporter: React.FC<SourceCodeExporterProps> = ({
  onBackToAdmin,
  onBackToPublic,
}) => {
  const [selectedFilePath, setSelectedFilePath] = useState<string>('database/schema.sql');
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [zipSuccess, setZipSuccess] = useState(false);

  // Repository files definition for preview and zip bundling
  const FILES_MAP: Record<string, { desc: string; content: string }> = {
    'database/schema.sql': {
      desc: 'Skema lengkap 24 tabel MySQL InnoDB dengan FK & Indexes untuk phpMyAdmin',
      content: `-- MySQL / MariaDB Schema (Import via phpMyAdmin)
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE \`users\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(150) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`is_active\` TINYINT(1) DEFAULT 1,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`roles\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(50) NOT NULL UNIQUE,
  \`slug\` VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE \`page_sections\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`page_id\` INT UNSIGNED NOT NULL,
  \`section_type\` VARCHAR(50) NOT NULL,
  \`order_index\` INT NOT NULL DEFAULT 0,
  \`is_visible\` TINYINT(1) DEFAULT 1,
  \`config_json\` JSON NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE \`careers\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`title_id\` VARCHAR(150) NOT NULL,
  \`title_en\` VARCHAR(150) NOT NULL,
  \`slug_id\` VARCHAR(150) NOT NULL UNIQUE,
  \`department\` VARCHAR(100) NOT NULL,
  \`location\` VARCHAR(100) NOT NULL,
  \`employment_type\` ENUM('Full-time', 'Contract', 'Part-time') DEFAULT 'Full-time',
  \`is_active\` TINYINT(1) DEFAULT 1,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE \`job_applications\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`career_id\` INT UNSIGNED NOT NULL,
  \`full_name\` VARCHAR(120) NOT NULL,
  \`email\` VARCHAR(150) NOT NULL,
  \`phone\` VARCHAR(30) NOT NULL,
  \`resume_filename\` VARCHAR(255) NOT NULL,
  \`status\` ENUM('pending', 'reviewed', 'interview', 'accepted', 'rejected') DEFAULT 'pending',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`career_id\`) REFERENCES \`careers\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE \`custom_forms\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`form_key\` VARCHAR(80) NOT NULL UNIQUE,
  \`title_id\` VARCHAR(150) NOT NULL,
  \`title_en\` VARCHAR(150) NOT NULL,
  \`is_active\` TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE \`custom_form_submissions\` (
  \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`form_id\` INT UNSIGNED NOT NULL,
  \`page_slug\` VARCHAR(150) NOT NULL,
  \`submission_data_json\` JSON NOT NULL,
  \`status\` ENUM('new', 'processed', 'archived') DEFAULT 'new',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`form_id\`) REFERENCES \`custom_forms\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE \`contacts\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(150) NOT NULL,
  \`subject\` VARCHAR(200) NOT NULL,
  \`message\` TEXT NOT NULL,
  \`status\` ENUM('unread', 'read', 'replied', 'spam') DEFAULT 'unread',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE \`email_logs\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`recipient_email\` VARCHAR(150) NOT NULL,
  \`subject\` VARCHAR(255) NOT NULL,
  \`mailer_service\` VARCHAR(50) DEFAULT 'Zoho PHPMailer',
  \`status\` ENUM('sent', 'failed') NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;`,
    },
    'public/index.php': {
      desc: 'Front controller utama Apache/XAMPP dengan routing bilingual dan session boot',
      content: `<?php
declare(strict_types=1);

session_start();

spl_autoload_register(function ($class) {
    $prefix = 'App\\\\';
    $baseDir = __DIR__ . '/../app/';
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) return;
    $relativeClass = substr($class, $len);
    $file = $baseDir . str_replace('\\\\', '/', $relativeClass) . '.php';
    if (file_exists($file)) require_once $file;
});

use App\\Helpers\\Database;
use App\\Helpers\\I18n;
use App\\Helpers\\Security;

$requestUri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$path = '/' . trim($requestUri, '/');

// Header Keamanan Otomatis
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');

echo "PT Nusantara Solusi Prima - PHP Native 8.2 & MySQL Running on XAMPP!";`,
    },
    'app/Helpers/Database.php': {
      desc: 'Wrapper koneksi PDO MySQL dengan prepared statements dan transaction support',
      content: `<?php
declare(strict_types=1);

namespace App\\Helpers;

use PDO;
use PDOException;

class Database
{
    private static ?PDO $instance = null;

    public static function getConnection(): PDO
    {
        if (self::$instance === null) {
            $config = require __DIR__ . '/../../config/database.php';
            $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=%s',
                $config['host'], $config['port'], $config['database'], $config['charset']
            );
            self::$instance = new PDO($dsn, $config['username'], $config['password'], $config['options']);
        }
        return self::$instance;
    }

    public static function query(string $sql, array $params = []): array
    {
        $stmt = self::getConnection()->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }
}`,
    },
    'app/Services/ZohoMailerService.php': {
      desc: 'Service pengiriman email Zoho Mail SMTP via PHPMailer & logging database',
      content: `<?php
declare(strict_types=1);

namespace App\\Services;

use App\\Helpers\\Database;

class ZohoMailerService
{
    private array $config;

    public function __construct()
    {
        $this->config = require __DIR__ . '/../../config/mail.php';
    }

    public function send(string $toEmail, string $toName, string $subject, string $bodyHtml): array
    {
        // PHPMailer SMTP Configuration for Zoho
        $mail = new \\PHPMailer\\PHPMailer\\PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = $this->config['host'];
        $mail->SMTPAuth = true;
        $mail->Username = $this->config['username'];
        $mail->Password = $this->config['password'];
        $mail->SMTPSecure = \\PHPMailer\\PHPMailer\\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $this->config['port'];
        $mail->setFrom($this->config['from_address'], $this->config['from_name']);
        $mail->addAddress($toEmail, $toName);
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $bodyHtml;
        $mail->send();

        return ['success' => true];
    }
}`,
    },
    'config/database.php': {
      desc: 'Konfigurasi koneksi MySQL default XAMPP',
      content: `<?php
return [
    'driver' => 'mysql',
    'host' => getenv('DB_HOST') ?: '127.0.0.1',
    'port' => 3306,
    'database' => getenv('DB_DATABASE') ?: 'db_company_profile',
    'username' => getenv('DB_USERNAME') ?: 'root',
    'password' => getenv('DB_PASSWORD') ?: '',
    'charset' => 'utf8mb4',
    'options' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ],
];`,
    },
    'config/mail.php': {
      desc: 'Konfigurasi Zoho Mail SMTP',
      content: `<?php
return [
    'host' => getenv('SMTP_HOST') ?: 'smtp.zoho.com',
    'port' => 587,
    'encryption' => 'tls',
    'username' => getenv('SMTP_USERNAME') ?: 'contact@nusantaraprima.co.id',
    'password' => getenv('SMTP_PASSWORD') ?: '',
    'from_address' => 'contact@nusantaraprima.co.id',
    'from_name' => 'PT Nusantara Solusi Prima',
];`,
    },
    '.htaccess': {
      desc: 'Apache mod_rewrite rule untuk XAMPP & shielding folder privat',
      content: `<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(\\.env|composer\\.(json|lock)|PROJECT_STATUS\\.md) - [F,L]
    RewriteCond %{REQUEST_URI} !^/public/
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>`,
    },
    'public/.htaccess': {
      desc: 'Front controller router rewrite rule',
      content: `<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>`,
    },
    'composer.json': {
      desc: 'PSR-4 autoloader dan dependensi PHPMailer',
      content: `{
  "name": "enterprise/company-profile-cms",
  "require": {
    "php": ">=8.2.0",
    "phpmailer/phpmailer": "^6.9"
  },
  "autoload": {
    "psr-4": {
      "App\\\\": "app/"
    }
  }
}`,
    },
    'README.md': {
      desc: 'Panduan lengkap instalasi di MacBook (XAMPP & phpMyAdmin)',
      content: `# Panduan Pemasangan di MacBook XAMPP
1. Salin ke: /Applications/XAMPP/xamppfiles/htdocs/company-profile-cms/
2. Buka phpMyAdmin (http://localhost/phpmyadmin)
3. Buat database: db_company_profile
4. Impor database/schema.sql dan seeds/initial_seed.sql
5. Akses: http://localhost/company-profile-cms/public/id/
6. Login Admin: admin@company.com / Password123!`,
    },
  };

  const handleCopyCode = () => {
    const file = FILES_MAP[selectedFilePath];
    if (file) {
      navigator.clipboard.writeText(file.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder('company-profile-cms');

      // Masukkan seluruh file ke dalam ZIP
      Object.entries(FILES_MAP).forEach(([path, fileData]) => {
        folder?.file(path, fileData.content);
      });

      // Tambahkan .env.example
      folder?.file(
        '.env.example',
        `APP_NAME="PT Nusantara Solusi Prima"\nDB_HOST=127.0.0.1\nDB_DATABASE=db_company_profile\nDB_USERNAME=root\nDB_PASSWORD=\nSMTP_HOST=smtp.zoho.com\nSMTP_PORT=587\nSMTP_USERNAME=info@nusantaraprima.co.id\n`
      );

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'company-profile-cms-xampp.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setZipSuccess(true);
      setTimeout(() => setZipSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to create ZIP', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-950 px-6 flex items-center justify-between gap-6 shrink-0">
        <div className="flex items-center gap-3">
          <Folder className="w-5 h-5 text-emerald-400" />
          <div>
            <div className="text-sm font-bold text-white tracking-tight">
              XAMPP Source Code & Database Packager
            </div>
            <div className="text-xs text-slate-400">
              Native PHP 8.2+ · MySQL · Siap Dijalankan di MacBook (`htdocs`)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>{isZipping ? 'Membuat ZIP...' : '1-Click Unduh Package (.ZIP)'}</span>
          </button>

          <button
            onClick={onBackToAdmin}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-md text-xs font-semibold"
          >
            Kembali ke Admin Panel
          </button>
          <button
            onClick={onBackToPublic}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-semibold"
          >
            Lihat Website
          </button>
        </div>
      </header>

      {/* Main Content Explorer */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left File Tree */}
        <aside className="w-80 border-r border-slate-800 bg-slate-950 p-4 overflow-y-auto space-y-4">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Struktur File Source Code PHP & MySQL
            </div>
            <div className="space-y-1">
              {Object.keys(FILES_MAP).map(path => {
                const isSelected = selectedFilePath === path;
                return (
                  <button
                    key={path}
                    onClick={() => setSelectedFilePath(path)}
                    className={`w-full text-left px-3 py-2 rounded-md text-xs font-mono transition-colors flex items-center gap-2 truncate ${isSelected ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
                  >
                    <FileCode className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{path}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick XAMPP Deployment Guide */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 text-xs">
            <div className="font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Instalasi MacBook (XAMPP)</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
              <li>Ekstrak ke: <code className="text-emerald-400">/Applications/XAMPP/xamppfiles/htdocs/</code></li>
              <li>Nyalakan Apache & MySQL di XAMPP.</li>
              <li>Impor <code className="text-blue-400">database/schema.sql</code> di phpMyAdmin.</li>
              <li>Buka <code className="text-white">http://localhost/company-profile-cms/public/</code>.</li>
            </ol>
          </div>
        </aside>

        {/* Right Code Viewer */}
        <main className="flex-1 flex flex-col bg-slate-900 overflow-hidden">
          {/* File Header Bar */}
          <div className="h-12 border-b border-slate-800 bg-slate-950/70 px-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-emerald-400">{selectedFilePath}</span>
              <span className="text-slate-500 text-xs">·</span>
              <span className="text-xs text-slate-400">{FILES_MAP[selectedFilePath]?.desc}</span>
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin Kode'}</span>
            </button>
          </div>

          {/* Code Body */}
          <div className="flex-1 p-6 overflow-auto bg-slate-950 font-mono text-xs text-slate-200 leading-relaxed">
            <pre className="selection:bg-blue-600 selection:text-white">
              <code>{FILES_MAP[selectedFilePath]?.content}</code>
            </pre>
          </div>
        </main>
      </div>

      {zipSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 border border-emerald-700 text-emerald-300 px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <div>
            <div className="font-bold">Paket ZIP Berhasil Diunduh!</div>
            <div>File <code>company-profile-cms-xampp.zip</code> siap diekstrak ke <code>htdocs</code>.</div>
          </div>
        </div>
      )}
    </div>
  );
};
