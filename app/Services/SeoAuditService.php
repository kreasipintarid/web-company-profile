<?php
declare(strict_types=1);

namespace App\Services;

/**
 * Algoritma Audit SEO Transparan (Skor 0 - 100)
 */
class SeoAuditService
{
    public static function audit(
        string $title,
        string $metaDescription,
        string $focusKeyword,
        string $contentHtml,
        string $slug
    ): array {
        $score = 0;
        $maxScore = 100;
        $issues = [];
        $recommendations = [];
        $passedChecks = [];

        $plainText = strip_tags($contentHtml);
        $wordCount = str_word_count($plainText);
        $keyword = mb_strtolower(trim($focusKeyword));

        // 1. Title Checks (Bobot 20)
        $titleLen = mb_strlen($title);
        if ($titleLen >= 30 && $titleLen <= 65) {
            $score += 15;
            $passedChecks[] = "Panjang judul optimal ({$titleLen} karakter).";
        } else {
            $issues[] = "Panjang judul ({$titleLen} karakter) kurang ideal (rekomendasi: 40-60 karakter).";
            $recommendations[] = "Sesuaikan judul agar berada di antara 40 hingga 60 karakter agar tidak terpotong di Google SERP.";
        }

        if (!empty($keyword) && mb_stripos($title, $keyword) !== false) {
            $score += 5;
            $passedChecks[] = "Keyword fokus ditemukan di dalam judul.";
        } elseif (!empty($keyword)) {
            $issues[] = "Keyword fokus tidak ditemukan dalam judul.";
            $recommendations[] = "Sertakan kata kunci utama '{$keyword}' di awal atau tengah judul.";
        }

        // 2. Meta Description Checks (Bobot 20)
        $descLen = mb_strlen($metaDescription);
        if ($descLen >= 120 && $descLen <= 160) {
            $score += 15;
            $passedChecks[] = "Panjang meta deskripsi optimal ({$descLen} karakter).";
        } else {
            $issues[] = "Panjang meta deskripsi ({$descLen} karakter) tidak optimal (target: 120-160 karakter).";
            $recommendations[] = "Tulis meta deskripsi antara 130-155 karakter dengan ringkasan padat dan kalimat ajakan.";
        }

        if (!empty($keyword) && mb_stripos($metaDescription, $keyword) !== false) {
            $score += 5;
            $passedChecks[] = "Keyword fokus ada di meta deskripsi.";
        } elseif (!empty($keyword)) {
            $issues[] = "Keyword fokus belum ada di meta deskripsi.";
            $recommendations[] = "Sisipkan kata kunci '{$keyword}' secara alami dalam meta deskripsi.";
        }

        // 3. Konten & Distribusi Keyword (Bobot 30)
        if ($wordCount >= 300) {
            $score += 15;
            $passedChecks[] = "Panjang artikel memadai ({$wordCount} kata).";
        } else {
            $issues[] = "Panjang konten terlalu ringkas ({$wordCount} kata).";
            $recommendations[] = "Tambahkan penjelasan mendalam minimal 300 - 600 kata agar memberikan nilai tuntas bagi pembaca.";
        }

        if (!empty($keyword)) {
            $keywordOccurrences = substr_count(mb_strtolower($plainText), $keyword);
            $density = $wordCount > 0 ? round(($keywordOccurrences / $wordCount) * 100, 2) : 0;

            if ($density >= 0.8 && $density <= 2.5) {
                $score += 15;
                $passedChecks[] = "Densitas kata kunci sangat sehat ({$density}% - {$keywordOccurrences}x).";
            } elseif ($density > 2.5) {
                $issues[] = "Potensi keyword stuffing ({$density}%). Terlalu banyak pengulangan.";
                $recommendations[] = "Kurangi pengulangan kata kunci langsung, gunakan sinonim dan variasi kontekstual.";
                $score += 5;
            } else {
                $issues[] = "Densitas kata kunci rendah ({$density}%).";
                $recommendations[] = "Sebutkan kata kunci fokus '{$keyword}' sebanyak 2-4 kali di paragraf utama.";
                $score += 5;
            }
        }

        // 4. Struktur Heading (Bobot 15)
        $hasH2 = (bool)preg_match('/<h2[^>]*>/i', $contentHtml);
        $hasH3 = (bool)preg_match('/<h3[^>]*>/i', $contentHtml);
        if ($hasH2) {
            $score += 10;
            $passedChecks[] = "Memiliki sub-judul H2 untuk hierarki konten.";
        } else {
            $issues[] = "Tidak ditemukan sub-heading H2.";
            $recommendations[] = "Gunakan tag Heading 2 (H2) untuk membagi bagian topik konten secara terstruktur.";
        }
        if ($hasH3) {
            $score += 5;
            $passedChecks[] = "Struktur H3 tersedia.";
        }

        // 5. URL Slug & Image Alt (Bobot 15)
        if (!empty($keyword) && mb_stripos($slug, str_replace(' ', '-', $keyword)) !== false) {
            $score += 10;
            $passedChecks[] = "Slug URL mengandung kata kunci ramah SEO.";
        } else {
            $score += 5;
        }

        // Cek gambar tanpa alt text
        if (preg_match_all('/<img[^>]+>/i', $contentHtml, $matches)) {
            $missingAlt = 0;
            foreach ($matches[0] as $imgTag) {
                if (!preg_match('/alt=[\'"][^\'"]+[\'"]/i', $imgTag)) {
                    $missingAlt++;
                }
            }
            if ($missingAlt > 0) {
                $issues[] = "Ditemukan {$missingAlt} gambar tanpa atribut alt text.";
                $recommendations[] = "Tambahkan atribut alt deskriptif pada semua gambar untuk aksesibilitas dan Google Image SEO.";
            } else {
                $score += 5;
                $passedChecks[] = "Semua gambar dilengkapi atribut alt text.";
            }
        } else {
            $score += 5;
        }

        $score = min(100, max(0, $score));

        return [
            'total_score' => $score,
            'word_count' => $wordCount,
            'focus_keyword' => $focusKeyword,
            'passed_checks' => $passedChecks,
            'issues' => $issues,
            'recommendations' => $recommendations,
            'preview_snippet' => [
                'title' => $title,
                'slug' => $slug,
                'description' => $metaDescription
            ],
            'disclaimer' => 'Skor ini adalah audit heuristik internal CMS untuk optimasi teknis & relevansi on-page, bukan jaminan ranking mesin pencari.'
        ];
    }
}
