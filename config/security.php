<?php
declare(strict_types=1);

/**
 * Security & Protection Configuration
 */
return [
    'session_lifetime'      => (int)(getenv('SESSION_LIFETIME') ?: 7200),
    'login_rate_limit_max'  => (int)(getenv('RATE_LIMIT_LOGIN_MAX') ?: 5),
    'login_rate_window_sec' => (int)(getenv('RATE_LIMIT_LOGIN_WINDOW') ?: 900),
    'contact_rate_max'      => (int)(getenv('RATE_LIMIT_CONTACT_MAX') ?: 3),
    'contact_rate_window'   => (int)(getenv('RATE_LIMIT_CONTACT_WINDOW') ?: 300),
    'captcha_enabled'       => filter_var(getenv('CAPTCHA_ENABLED') ?: true, FILTER_VALIDATE_BOOLEAN),
    'captcha_driver'        => getenv('CAPTCHA_DRIVER') ?: 'turnstile',
    'captcha_site_key'      => getenv('CAPTCHA_SITE_KEY') ?: '',
    'captcha_secret_key'    => getenv('CAPTCHA_SECRET_KEY') ?: '',
    'allowed_upload_mimes'  => [
        'image/jpeg' => 'jpg',
        'image/png'  => 'png',
        'image/webp' => 'webp',
        'image/svg+xml' => 'svg',
    ],
    'max_upload_size_bytes' => 5 * 1024 * 1024, // 5MB
];
