<?php
declare(strict_types=1);

/**
 * Application Configuration
 */
return [
    'name' => getenv('APP_NAME') ?: 'PT Nusantara Solusi Prima',
    'env' => getenv('APP_ENV') ?: 'local',
    'debug' => filter_var(getenv('APP_DEBUG') ?: true, FILTER_VALIDATE_BOOLEAN),
    'url' => rtrim(getenv('APP_URL') ?: 'http://localhost/company-profile-cms/public', '/'),
    'default_locale' => getenv('DEFAULT_LOCALE') ?: 'id',
    'supported_locales' => explode(',', getenv('SUPPORTED_LOCALES') ?: 'id,en'),
    'timezone' => 'Asia/Jakarta',
];
