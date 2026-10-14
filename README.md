# Dynamic Company Profile CMS + Admin Panel (PHP Native 8.2+ & MySQL)

Sistem CMS Company Profile Enterprise yang dibangun dengan arsitektur **PHP Native 8.2+** dan **MySQL/MariaDB**, tanpa ketergantungan pada runtime cloud. Dirancang siap pakai untuk dipindahkan ke folder `htdocs` XAMPP di MacBook atau Windows.

---

## 🚀 Panduan Instalasi di MacBook (XAMPP & phpMyAdmin)

### 1. Pindahkan Source Code ke `htdocs`
Buka Terminal atau Finder, lalu salin folder proyek ini ke direktori XAMPP:
```bash
# Path standar XAMPP di macOS:
/Applications/XAMPP/xamppfiles/htdocs/company-profile-cms/
```

### 2. Jalankan Apache & MySQL di XAMPP
1. Buka aplikasi **XAMPP Manager OS X**.
2. Pada tab **Manage Servers**, aktifkan:
   - **Apache Web Server** -> Running
   - **MySQL Database** -> Running

### 3. Buat Database di phpMyAdmin
1. Buka browser dan akses: `http://localhost/phpmyadmin`
2. Klik tombol **New** / **Baru**, masukkan nama database: `db_company_profile`, pilih collation `utf8mb4_unicode_ci`, lalu klik **Create**.
3. Pilih database `db_company_profile`, masuk ke tab **Import**:
   - Pilih file `database/schema.sql`, lalu klik **Import**.
   - Setelah selesai, impor juga file `database/seeds/initial_seed.sql`.

### 4. Konfigurasi Environment (`.env`)
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Sesuaikan konfigurasi jika diperlukan (default XAMPP tanpa password):
```ini
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_DATABASE="db_company_profile"
DB_USERNAME="root"
DB_PASSWORD=""
```

### 5. Install Dependensi Composer (Opsional untuk PHPMailer Live)
Jika ingin menggunakan PHPMailer Zoho SMTP secara langsung:
```bash
cd /Applications/XAMPP/xamppfiles/htdocs/company-profile-cms
composer install
```

### 6. Akses Aplikasi
- **Website Publik**: `http://localhost/company-profile-cms/public/id/`
- **Admin Panel**: `http://localhost/company-profile-cms/public/admin/`
- **Kredensial Default**:
  - Email: `admin@company.com`
  - Password: `Password123!`

---

## 🛡️ Fitur Keamanan
- **Prepared Statements (PDO)**: Mencegah SQL Injection di semua layer.
- **CSRF Token Protection**: Validasi session pada setiap form POST.
- **Role-Based Access Control (RBAC)**: 7 Role hierarkis (Super Admin, Administrator, Editor, Author, SEO Specialist, Analyst, Contact Manager).
- **Perlindungan Uploads**: File `.htaccess` khusus di direktori `uploads/` yang memblokir eksekusi ekstensi `.php` dan script lainnya.
- **Audit Logs**: Pencatatan aktivitas sensitif pengguna, IP address, dan timestamp.
