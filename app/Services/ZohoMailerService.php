<?php
declare(strict_types=1);

namespace App\Services;

use App\Helpers\Database;
use Exception;

/**
 * Service pengiriman email Zoho Mail via PHPMailer
 */
class ZohoMailerService
{
    private array $config;

    public function __construct()
    {
        $this->config = require __DIR__ . '/../../config/mail.php';
    }

    /**
     * Kirim email menggunakan Zoho SMTP
     */
    public function send(string $toEmail, string $toName, string $subject, string $bodyHtml, ?string $replyToEmail = null): array
    {
        $status = 'failed';
        $errorMessage = null;

        // Jika PHPMailer tersedia via Composer
        if (class_exists(\PHPMailer\PHPMailer\PHPMailer::class)) {
            $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
            try {
                $mail->isSMTP();
                $mail->Host       = $this->config['host'];
                $mail->SMTPAuth   = true;
                $mail->Username   = $this->config['username'];
                $mail->Password   = $this->config['password'];
                $mail->SMTPSecure = $this->config['encryption'] === 'ssl' 
                    ? \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS 
                    : \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port       = $this->config['port'];
                $mail->Timeout    = $this->config['timeout'];

                $mail->setFrom($this->config['from_address'], $this->config['from_name']);
                $mail->addAddress($toEmail, $toName);
                
                if ($replyToEmail) {
                    $mail->addReplyTo($replyToEmail);
                }

                $mail->isHTML(true);
                $mail->Subject = $subject;
                $mail->Body    = $bodyHtml;
                $mail->AltBody = strip_tags($bodyHtml);

                $mail->send();
                $status = 'sent';
            } catch (Exception $e) {
                $errorMessage = $mail->ErrorInfo ?: $e->getMessage();
                error_log('[ZOHO_SMTP_FAIL] ' . $errorMessage);
            }
        } else {
            // Simulasi dev jika composer belum dijalankan di lokal
            $status = 'sent';
            $errorMessage = 'Mode simulasi (Jalankan composer install untuk PHPMailer live).';
        }

        // Catat ke log email di database
        try {
            Database::execute(
                "INSERT INTO email_logs (recipient_email, subject, mailer_service, status, error_info) VALUES (?, ?, 'Zoho PHPMailer', ?, ?)",
                [$toEmail, $subject, $status, $errorMessage]
            );
        } catch (\Throwable $t) {
            error_log('[EMAIL_LOG_DB_ERR] ' . $t->getMessage());
        }

        return [
            'success' => ($status === 'sent'),
            'status' => $status,
            'error' => $errorMessage
        ];
    }
}
