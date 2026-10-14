<?php
declare(strict_types=1);

namespace App\Services;

use App\Helpers\Security;

class PageBuilderRenderer
{
    /**
     * Render daftar section dari database menjadi HTML terstruktur
     */
    public static function renderSections(array $sections, string $locale = 'id'): string
    {
        $html = '';

        foreach ($sections as $section) {
            if (empty($section['is_visible'])) {
                continue;
            }

            $type = $section['section_type'] ?? '';
            $config = is_string($section['config_json']) 
                ? json_decode($section['config_json'], true) 
                : ($section['config_json'] ?? []);

            $html .= self::renderSection($type, $config, $locale);
        }

        return $html;
    }

    public static function renderSection(string $type, array $config, string $locale = 'id'): string
    {
        $bg = Security::e($config['background'] ?? 'surface');
        $padding = Security::e($config['padding'] ?? 'py-20');

        switch ($type) {
            case 'hero':
                $title = Security::e($config['title_' . $locale] ?? $config['title'] ?? 'Inovasi Rekayasa Solusi Enterprise');
                $desc = Security::e($config['desc_' . $locale] ?? $config['desc'] ?? 'Membangun infrastruktur digital tangguh.');
                $ctaText = Security::e($config['cta_text_' . $locale] ?? $config['cta_text'] ?? 'Hubungi Konsultan Kami');
                $ctaUrl = Security::e($config['cta_url'] ?? '/id/kontak-kami');
                $imgUrl = Security::e($config['image_url'] ?? '/assets/images/hero_corporate_hq.jpg');

                return "
                <section class='relative overflow-hidden {$padding} border-b border-slate-200'>
                  <div class='max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
                    <div class='lg:col-span-7'>
                      <div class='text-xs font-semibold tracking-wider text-slate-500 uppercase mb-4'>PT Nusantara Solusi Prima</div>
                      <h1 class='text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight mb-6' style='text-wrap: balance;'>
                        {$title}
                      </h1>
                      <p class='text-lg text-slate-600 max-w-2xl leading-relaxed mb-8'>
                        {$desc}
                      </p>
                      <div class='flex flex-wrap items-center gap-4'>
                        <a href='{$ctaUrl}' class='inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-sm'>
                          {$ctaText}
                        </a>
                        <a href='#services' class='inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors'>
                          " . ($locale === 'id' ? 'Pelajari Layanan' : 'Explore Capabilities') . "
                        </a>
                      </div>
                    </div>
                    <div class='lg:col-span-5'>
                      <div class='relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3] bg-slate-100'>
                        <img src='{$imgUrl}' alt='Corporate Headquarters' class='w-full h-full object-cover' loading='lazy'>
                      </div>
                    </div>
                  </div>
                </section>";

            case 'stats':
                $items = $config['items'] ?? [];
                $statHtml = '';
                foreach ($items as $item) {
                    $val = Security::e($item['value'] ?? '0');
                    $label = Security::e($item['label_' . $locale] ?? $item['label'] ?? '');
                    $desc = Security::e($item['subtext_' . $locale] ?? $item['subtext'] ?? '');
                    $statHtml .= "
                    <div class='p-6 bg-white rounded-xl border border-slate-200'>
                      <div class='text-3xl lg:text-4xl font-bold text-slate-900 tabular-nums tracking-tight mb-2'>{$val}</div>
                      <div class='text-sm font-semibold text-slate-800 mb-1'>{$label}</div>
                      <div class='text-xs text-slate-500'>{$desc}</div>
                    </div>";
                }
                return "
                <section class='py-12 bg-slate-50 border-b border-slate-200'>
                  <div class='max-w-7xl mx-auto px-6 lg:px-8'>
                    <div class='grid grid-cols-2 md:grid-cols-4 gap-6'>
                      {$statHtml}
                    </div>
                  </div>
                </section>";

            case 'services':
                $title = Security::e($config['title_' . $locale] ?? ($locale === 'id' ? 'Layanan Unggulan' : 'Core Capabilities'));
                $sub = Security::e($config['sub_' . $locale] ?? ($locale === 'id' ? 'Solusi komprehensif untuk skalabilitas korporasi Anda' : 'Enterprise architecture tailored for resilience'));
                $cards = $config['cards'] ?? [];
                $cardsHtml = '';
                $num = 1;
                foreach ($cards as $c) {
                    $cTitle = Security::e($c['title_' . $locale] ?? $c['title'] ?? '');
                    $cDesc = Security::e($c['desc_' . $locale] ?? $c['desc'] ?? '');
                    $numStr = sprintf('%02d', $num++);
                    $cardsHtml .= "
                    <div class='p-8 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between'>
                      <div>
                        <div class='text-xs font-mono font-semibold text-slate-400 mb-4'>{$numStr}.</div>
                        <h3 class='text-xl font-bold text-slate-900 mb-3'>{$cTitle}</h3>
                        <p class='text-sm text-slate-600 leading-relaxed mb-6'>{$cDesc}</p>
                      </div>
                      <div class='pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900'>
                        <span>" . ($locale === 'id' ? 'Konsultasi Teknis' : 'Technical Advisory') . "</span>
                        <span aria-hidden='true'>&rarr;</span>
                      </div>
                    </div>";
                }
                return "
                <section id='services' class='{$padding} bg-white border-b border-slate-200'>
                  <div class='max-w-7xl mx-auto px-6 lg:px-8'>
                    <div class='max-w-2xl mb-12'>
                      <h2 class='text-3xl font-bold tracking-tight text-slate-900 mb-4'>{$title}</h2>
                      <p class='text-slate-600 text-base'>{$sub}</p>
                    </div>
                    <div class='grid grid-cols-1 md:grid-cols-3 gap-8'>
                      {$cardsHtml}
                    </div>
                  </div>
                </section>";

            case 'cta':
                $headline = Security::e($config['headline_' . $locale] ?? ($locale === 'id' ? 'Siap Mentransformasi Skala Bisnis Anda?' : 'Ready to Elevate Your Enterprise Architecture?'));
                $btn = Security::e($config['btn_text_' . $locale] ?? ($locale === 'id' ? 'Jadwalkan Diskusi' : 'Schedule Consultation'));
                return "
                <section class='py-20 bg-slate-900 text-white'>
                  <div class='max-w-7xl mx-auto px-6 lg:px-8 text-center'>
                    <h2 class='text-3xl sm:text-4xl font-bold tracking-tight mb-6 max-w-3xl mx-auto'>{$headline}</h2>
                    <p class='text-slate-400 max-w-xl mx-auto mb-8 text-base'>
                      " . ($locale === 'id' ? 'Diskusikan kebutuhan arsitektur dan kepatuhan sistem dengan tim spesialis kami.' : 'Consult your systems security and scaling roadmap directly with our engineers.') . "
                    </p>
                    <a href='/id/kontak-kami' class='inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors'>
                      {$btn}
                    </a>
                  </div>
                </section>";

            default:
                return "<!-- Section type {$type} -->";
        }
    }
}
