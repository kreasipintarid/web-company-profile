<?php
declare(strict_types=1);

namespace App\Helpers;

class I18n
{
    private static string $currentLocale = 'id';
    private static array $supportedLocales = ['id', 'en'];

    public static function setLocale(string $locale): void
    {
        if (in_array($locale, self::$supportedLocales, true)) {
            self::$currentLocale = $locale;
            if (session_status() === PHP_SESSION_ACTIVE) {
                $_SESSION['locale'] = $locale;
            }
        }
    }

    public static function getLocale(): string
    {
        return self::$currentLocale;
    }

    public static function getOppositeLocale(): string
    {
        return self::$currentLocale === 'id' ? 'en' : 'id';
    }

    /**
     * Deteksi bahasa dari URL, session, atau browser Accept-Language
     */
    public static function detectLocale(): string
    {
        if (session_status() === PHP_SESSION_ACTIVE && !empty($_SESSION['locale'])) {
            return $_SESSION['locale'];
        }

        $acceptLang = $_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? '';
        if (!empty($acceptLang)) {
            if (stripos($acceptLang, 'id') !== false) {
                return 'id';
            }
        }

        return 'id'; // Default untuk company profile lokal
    }

    /**
     * URL helper berawalan bahasa aktif
     */
    public static function url(string $path = ''): string
    {
        $config = require __DIR__ . '/../../config/app.php';
        $baseUrl = $config['url'];
        $cleanPath = ltrim($path, '/');
        
        // Halaman root
        if ($cleanPath === '') {
            return $baseUrl . '/' . self::$currentLocale;
        }

        // Jika path sudah memiliki prefix id/en
        if (preg_match('/^(id|en)(\/|$)/', $cleanPath)) {
            return $baseUrl . '/' . $cleanPath;
        }

        return $baseUrl . '/' . self::$currentLocale . '/' . $cleanPath;
    }
}
