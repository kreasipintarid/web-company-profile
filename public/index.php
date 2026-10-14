<?php
declare(strict_types=1);

/**
 * ----------------------------------------------------------------------------
 * FRONT CONTROLLER - DYNAMIC COMPANY PROFILE CMS
 * Entry Point Apache / XAMPP
 * ----------------------------------------------------------------------------
 */

session_start();

// Autoloader sederhana PSR-4
spl_autoload_register(function ($class) {
    $prefix = 'App\\';
    $baseDir = __DIR__ . '/../app/';

    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relativeClass = substr($class, $len);
    $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';

    if (file_exists($file)) {
        require_once $file;
    }
});

// Helper imports
use App\Helpers\Database;
use App\Helpers\I18n;
use App\Helpers\Security;
use App\Services\PageBuilderRenderer;
use App\Services\ZohoMailerService;

// Ambil path request
$requestUri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$scriptName = dirname($_SERVER['SCRIPT_NAME'] ?? '');
$path = substr($requestUri, strlen($scriptName));
$path = '/' . trim($path, '/');

// Deteksi locale dari URL
$segments = explode('/', trim($path, '/'));
$localeCandidate = $segments[0] ?? '';

if (in_array($localeCandidate, ['id', 'en'], true)) {
    I18n::setLocale($localeCandidate);
    array_shift($segments);
    $subPath = '/' . implode('/', $segments);
} else {
    // Redirect root '/' ke locale default '/id'
    if ($path === '/' || $path === '') {
        header('Location: ' . I18n::detectLocale() . '/');
        exit;
    }
    $subPath = $path;
}

$locale = I18n::getLocale();

// Router Sederhana
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');

// Contoh response dinamis jika dijalankan pada XAMPP Apache
if (str_starts_with($subPath, '/admin')) {
    // Admin route handler
    require_once __DIR__ . '/../app/Views/admin/dashboard.php';
    exit;
}

if ($subPath === '/kontak-kami' || $subPath === '/contact-us') {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Validasi CSRF & simpan pesan
        $csrf = $_POST['csrf_token'] ?? '';
        if (!Security::verifyCsrfToken($csrf)) {
            http_response_code(403);
            die('Invalid CSRF token.');
        }

        $name = Security::sanitizeString($_POST['name'] ?? '');
        $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
        $subject = Security::sanitizeString($_POST['subject'] ?? '');
        $message = Security::sanitizeString($_POST['message'] ?? '');

        if ($name && $email && $message) {
            Database::execute(
                "INSERT INTO contacts (name, email, subject, message, locale, ip_address) VALUES (?, ?, ?, ?, ?, ?)",
                [$name, $email, $subject, $message, $locale, $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1']
            );

            // Opsional kirim notifikasi ke admin via Zoho SMTP
            $mailer = new ZohoMailerService();
            $mailer->send(
                'info@nusantaraprima.co.id',
                'Admin Support',
                "Kontak Masuk Baru dari {$name}: {$subject}",
                "<p><strong>Nama:</strong> {$name}</p><p><strong>Email:</strong> {$email}</p><p><strong>Pesan:</strong><br>{$message}</p>",
                $email
            );

            header('Location: ?success=1');
            exit;
        }
    }
}

// Render frontend dinamis default
?>
<!DOCTYPE html>
<html lang="<?= Security::e($locale) ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $locale === 'id' ? 'PT Nusantara Solusi Prima | Solusi Enterprise & Digital' : 'Nusantara Solusi Prima | Enterprise & Digital Solutions' ?></title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/style.css">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-slate-900 font-sans antialiased">
    <!-- Header Navigasi -->
    <header class="border-b border-slate-200 sticky top-0 bg-white/95 backdrop-blur z-50">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
            <a href="/<?= $locale ?>" class="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap">
                PT Nusantara Solusi Prima
            </a>
            <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                <a href="/<?= $locale ?>" class="hover:text-slate-900 transition-colors whitespace-nowrap"><?= $locale === 'id' ? 'Beranda' : 'Home' ?></a>
                <a href="/<?= $locale ?>/tentang-kami" class="hover:text-slate-900 transition-colors whitespace-nowrap"><?= $locale === 'id' ? 'Tentang Kami' : 'About Us' ?></a>
                <a href="/<?= $locale ?>/layanan" class="hover:text-slate-900 transition-colors whitespace-nowrap"><?= $locale === 'id' ? 'Layanan' : 'Services' ?></a>
                <a href="/<?= $locale ?>/blog" class="hover:text-slate-900 transition-colors whitespace-nowrap"><?= $locale === 'id' ? 'Blog & Riset' : 'Insights' ?></a>
                <a href="/<?= $locale ?>/agenda" class="hover:text-slate-900 transition-colors whitespace-nowrap"><?= $locale === 'id' ? 'Agenda' : 'Events' ?></a>
            </nav>
            <div class="flex items-center gap-4">
                <a href="/<?= I18n::getOppositeLocale() ?>" class="text-xs font-semibold px-2 py-1 rounded border border-slate-200 hover:bg-slate-50 uppercase">
                    <?= I18n::getOppositeLocale() ?>
                </a>
                <a href="/<?= $locale ?>/kontak-kami" class="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap">
                    <?= $locale === 'id' ? 'Hubungi Kami' : 'Get in Touch' ?>
                </a>
            </div>
        </div>
    </header>

    <main>
        <!-- Hero Section -->
        <section class="py-20 border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div class="lg:col-span-7">
                    <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4 block">Enterprise Architecture & Systems</span>
                    <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
                        <?= $locale === 'id' ? 'Transformasi Rekayasa Sistem Digital Skala Enterprise' : 'Mission-Critical Digital Engineering for Modern Enterprises' ?>
                    </h1>
                    <p class="text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed">
                        <?= $locale === 'id' ? 'Membantu organisasi perbankan, manufaktur, dan institusi publik mengoptimalkan infrastruktur cloud, keamanan siber, dan skalabilitas data.' : 'Empowering financial institutions and industrial leaders with high-availability cloud architecture, zero-trust security, and real-time data pipelines.' ?>
                    </p>
                    <div class="flex items-center gap-4">
                        <a href="/<?= $locale ?>/kontak-kami" class="px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors">
                            <?= $locale === 'id' ? 'Konsultasi Proyek' : 'Schedule Advisory' ?>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="py-12 bg-slate-900 text-slate-400 text-sm">
        <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>&copy; <?= date('Y') ?> PT Nusantara Solusi Prima. All rights reserved.</div>
            <div class="flex items-center gap-6 text-xs">
                <span>SCBD District 8, Jakarta Selatan</span>
                <span>contact@nusantaraprima.co.id</span>
            </div>
        </div>
    </footer>
</body>
</html>
