<?php
declare(strict_types=1);

/**
 * Zoho Mail & PHPMailer Configuration
 */
return [
    'driver'       => 'smtp',
    'host'         => getenv('SMTP_HOST') ?: 'smtp.zoho.com',
    'port'         => (int)(getenv('SMTP_PORT') ?: 587),
    'encryption'   => getenv('SMTP_ENCRYPTION') ?: 'tls', // 'tls' or 'ssl'
    'username'     => getenv('SMTP_USERNAME') ?: 'info@nusantaraprima.co.id',
    'password'     => getenv('SMTP_PASSWORD') ?: '',
    'from_address' => getenv('MAIL_FROM') ?: 'info@nusantaraprima.co.id',
    'from_name'    => getenv('MAIL_FROM_NAME') ?: 'PT Nusantara Solusi Prima',
    'timeout'      => 15,
];
