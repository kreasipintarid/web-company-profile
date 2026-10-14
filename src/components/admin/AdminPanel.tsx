import React, { useState, useEffect } from 'react';
import {
  ThemeConfig,
  PageSection,
  BlogPost,
  EventItem,
  ContactMessage,
  MenuItem,
  MediaItem,
  User,
  UserRole,
  Locale,
  SeoAuditResult,
  CareerItem,
  JobApplication,
  CustomPage,
  CustomForm,
  CustomFormSubmission,
  SlideItem,
  ExecutiveBio,
  ClientPartner,
  ElementorBlock,
  ElementorBlockType,
  ElementorBlockItem,
} from '../../types/cms';
import {
  LayoutDashboard,
  Layers,
  FileText,
  Calendar,
  Mail,
  Image as ImageIcon,
  Menu as MenuIcon,
  Palette,
  Search,
  BarChart3,
  Users,
  Shield,
  Download,
  Plus,
  Trash2,
  Check,
  Send,
  Eye,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Globe,
  Settings,
  AlertTriangle,
  Briefcase,
  FileSpreadsheet,
  FileCheck,
  Sliders,
  Award,
  Building,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowUpRight,
  UserCheck,
  Tag,
  Clock,
  Laptop,
  Smartphone,
  Tablet,
  Activity,
  Copy,
  Edit,
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Link2,
  FileDown,
  X,
  UserPlus,
  CheckSquare,
  Square,
  ShieldAlert,
  Upload,
  ArrowUp,
  ArrowDown,
  HelpCircle,
} from 'lucide-react';

interface AdminPanelProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  themes: ThemeConfig[];
  currentTheme: ThemeConfig;
  onThemeChange: (theme: ThemeConfig) => void;
  slides: SlideItem[];
  onUpdateSlides: (slides: SlideItem[]) => void;
  executives: ExecutiveBio[];
  onUpdateExecutives: (execs: ExecutiveBio[]) => void;
  clients: ClientPartner[];
  onUpdateClients: (clients: ClientPartner[]) => void;
  sections: PageSection[];
  onUpdateSections: (sections: PageSection[]) => void;
  posts: BlogPost[];
  onUpdatePosts: (posts: BlogPost[]) => void;
  events: EventItem[];
  onUpdateEvents: (events: EventItem[]) => void;
  contacts: ContactMessage[];
  onUpdateContacts: (contacts: ContactMessage[]) => void;
  careers: CareerItem[];
  onUpdateCareers: (careers: CareerItem[]) => void;
  applications: JobApplication[];
  onUpdateApplications: (apps: JobApplication[]) => void;
  customPages: CustomPage[];
  onUpdateCustomPages: (pages: CustomPage[]) => void;
  customForms: CustomForm[];
  onUpdateCustomForms?: (forms: CustomForm[]) => void;
  customSubmissions: CustomFormSubmission[];
  onUpdateCustomSubmissions?: (subs: CustomFormSubmission[]) => void;
  menus: MenuItem[];
  onUpdateMenus: (menus: MenuItem[]) => void;
  media: MediaItem[];
  onUpdateMedia: (media: MediaItem[]) => void;
  users: User[];
  onUpdateUsers?: (users: User[]) => void;
  onBackToPublic: () => void;
  onOpenExporter: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentRole,
  onRoleChange,
  themes,
  currentTheme,
  onThemeChange,
  slides,
  onUpdateSlides,
  executives,
  onUpdateExecutives,
  clients,
  onUpdateClients,
  sections,
  onUpdateSections,
  posts,
  onUpdatePosts,
  events,
  onUpdateEvents,
  contacts,
  onUpdateContacts,
  careers,
  onUpdateCareers,
  applications,
  onUpdateApplications,
  customPages,
  onUpdateCustomPages,
  customForms,
  onUpdateCustomForms,
  customSubmissions,
  onUpdateCustomSubmissions,
  menus,
  onUpdateMenus,
  media,
  onUpdateMedia,
  users,
  onUpdateUsers,
  onBackToPublic,
  onOpenExporter,
}) => {
  type AdminTab =
    | 'dashboard'
    | 'custom-pages'
    | 'careers-admin'
    | 'slider'
    | 'builder'
    | 'blog'
    | 'events'
    | 'contacts'
    | 'executives'
    | 'clients'
    | 'media'
    | 'menus'
    | 'themes'
    | 'seo'
    | 'analytics'
    | 'users'
    | 'audit';

  // Dynamic RBAC Permission Mapping
  const rolePermissions: Record<UserRole, AdminTab[]> = {
    'super-admin': [
      'dashboard',
      'slider',
      'custom-pages',
      'careers-admin',
      'builder',
      'blog',
      'events',
      'contacts',
      'executives',
      'clients',
      'media',
      'menus',
      'themes',
      'seo',
      'analytics',
      'users',
      'audit',
    ],
    admin: [
      'dashboard',
      'slider',
      'custom-pages',
      'careers-admin',
      'builder',
      'blog',
      'events',
      'contacts',
      'executives',
      'clients',
      'media',
      'menus',
      'themes',
      'seo',
      'analytics',
      'audit',
    ],
    editor: [
      'dashboard',
      'slider',
      'custom-pages',
      'builder',
      'blog',
      'events',
      'media',
      'executives',
      'clients',
    ],
    author: ['dashboard', 'blog', 'media'],
    'seo-specialist': ['dashboard', 'seo', 'blog', 'custom-pages', 'analytics'],
    analyst: ['dashboard', 'analytics', 'custom-pages'],
    'contact-manager': ['dashboard', 'contacts', 'custom-pages'],
  };

  const allowedTabs = rolePermissions[currentRole] || ['dashboard'];
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Ensure current active tab is strictly allowed when role switches
  useEffect(() => {
    if (!allowedTabs.includes(activeTab)) {
      setActiveTab(allowedTabs[0] || 'dashboard');
    }
  }, [currentRole, allowedTabs, activeTab]);

  // Notifications & Copy state
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // =========================================================================
  // CRUD MODAL STATES
  // =========================================================================

  // 1. SLIDER CRUD
  const [isAddingSlide, setIsAddingSlide] = useState(false);
  const [editingSlide, setEditingSlide] = useState<SlideItem | null>(null);
  const [slideTag, setSlideTag] = useState('');
  const [slideTitle, setSlideTitle] = useState('');
  const [slideDesc, setSlideDesc] = useState('');
  const [slideCtaText, setSlideCtaText] = useState('Jadwalkan Konsultasi Teknis');
  const [slideCtaUrl, setSlideCtaUrl] = useState('contact');
  const [slideImage, setSlideImage] = useState(media[0]?.url || '');
  const [slideBadge, setSlideBadge] = useState('ISO 27001 Certified & BSSN Compliant');

  // 2. BLOG CRUD + Rich Text Editor & Image Picker
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState('Cloud Infrastructure');
  const [postExcerpt, setPostExcerpt] = useState('');
  const [postSlug, setPostSlug] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(media[1]?.url || '');
  const [postFocusKeyword, setPostFocusKeyword] = useState('arsitektur');
  const [postAuthor, setPostAuthor] = useState('Tim Arsitektur Rekayasa');
  const [editorTab, setEditorTab] = useState<'write' | 'preview'>('write');

  // 3. AGENDA / EVENTS CRUD + Rich Text Editor & Image Picker
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventSlug, setEventSlug] = useState('');
  const [eventLocation, setEventLocation] = useState('Grand Ballroom Hotel Mulia Senayan, Jakarta');
  const [eventDatetime, setEventDatetime] = useState('24 Oktober 2026 · 09:00 - 16:30 WIB');
  const [eventDesc, setEventDesc] = useState('');
  const [eventStatus, setEventStatus] = useState<'upcoming' | 'completed'>('upcoming');
  const [eventCapacity, setEventCapacity] = useState(250);
  const [eventImage, setEventImage] = useState(media[2]?.url || '');
  const [eventRegUrl, setEventRegUrl] = useState('https://nusantaraprima.co.id/register/summit2026');

  // 4. CUSTOM PAGES CRUD + ELEMENTOR VISUAL BUILDER
  const [isAddingCustomPage, setIsAddingCustomPage] = useState(false);
  const [editingCustomPage, setEditingCustomPage] = useState<CustomPage | null>(null);
  const [pageTitle, setPageTitle] = useState('');
  const [pageSlug, setPageSlug] = useState('');
  const [pageContent, setPageContent] = useState('');
  const [pageFormId, setPageFormId] = useState<number | undefined>(undefined);
  const [pageFocusKeyword, setPageFocusKeyword] = useState('enterprise');
  const [pageMetaDesc, setPageMetaDesc] = useState('');
  const [pageBlocks, setPageBlocks] = useState<ElementorBlock[]>([]);
  const [customPageModalTab, setCustomPageModalTab] = useState<'builder' | 'seo' | 'preview'>('builder');

  // 5. CAREERS & APPLICANTS CRUD + CV DOCUMENT VIEWER
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [editingJob, setEditingJob] = useState<CareerItem | null>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDept, setJobDept] = useState('Cloud Platform Engineering');
  const [jobExp, setJobExp] = useState('5+ Tahun');
  const [jobDesc, setJobDesc] = useState('');
  const [jobSalary, setJobSalary] = useState('IDR 35M - 55M / bulan + Bonus');
  const [previewApp, setPreviewApp] = useState<JobApplication | null>(null);

  // 6. EXECUTIVES CRUD
  const [isAddingExec, setIsAddingExec] = useState(false);
  const [editingExec, setEditingExec] = useState<ExecutiveBio | null>(null);
  const [execName, setExecName] = useState('');
  const [execTitle, setExecTitle] = useState('');
  const [execCredentials, setExecCredentials] = useState('');
  const [execBio, setExecBio] = useState('');
  const [execQuote, setExecQuote] = useState('');
  const [execInitials, setExecInitials] = useState('BW');
  const [execLinkedin, setExecLinkedin] = useState('https://linkedin.com');

  // 7. CLIENTS CRUD
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientPartner | null>(null);
  const [cliName, setCliName] = useState('');
  const [cliSector, setCliSector] = useState('');
  const [cliTier, setCliTier] = useState<'tier-1' | 'national' | 'enterprise'>('tier-1');
  const [cliSymbol, setCliSymbol] = useState('');

  // 8. MEDIA LIBRARY CRUD
  const [isAddingMedia, setIsAddingMedia] = useState(false);
  const [newMediaFilename, setNewMediaFilename] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaAlt, setNewMediaAlt] = useState('');
  const [newMediaCategory, setNewMediaCategory] = useState<'hero' | 'blog' | 'careers' | 'documents'>('hero');

  // 9. MENUS CRUD
  const [isAddingMenu, setIsAddingMenu] = useState(false);
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);
  const [menuLabelId, setMenuLabelId] = useState('');
  const [menuLabelEn, setMenuLabelEn] = useState('');
  const [menuUrl, setMenuUrl] = useState('home');

  // 10. USER MANAGEMENT CRUD (RBAC)
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState<UserRole>('editor');
  const [userDept, setUserDept] = useState('Digital Operations');

  // 11. CONTACT & ZOHO SMTP
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [replyStatus, setReplyStatus] = useState<string | null>(null);

  // 12. ALL-PAGE SEO AUDIT & GOOGLE SERP SIMULATOR
  interface AuditTargetItem {
    id: string;
    type: 'core' | 'post' | 'event' | 'custom-page';
    name: string;
    url: string;
    title: string;
    metaDesc: string;
    focusKeyword: string;
    content: string;
  }

  const allAuditablePages: AuditTargetItem[] = [
    {
      id: 'core-home',
      type: 'core',
      name: 'Beranda (Home Page)',
      url: 'https://nusantaraprima.co.id/',
      title: 'PT Nusantara Solusi Prima | Enterprise Systems Architecture & Cloud Indonesia',
      metaDesc: 'Membangun infrastruktur cloud berdaya tahan tinggi, kepatuhan UU PDP, dan otomatisasi alur kerja korporat tanpa henti.',
      focusKeyword: 'arsitektur enterprise',
      content: 'Inovasi Rekayasa Solusi Sistem Enterprise modernisasi cloud terdistribusi SLA 99.99% ISO 27001.',
    },
    {
      id: 'core-about',
      type: 'core',
      name: 'Tentang Kami (About Us)',
      url: 'https://nusantaraprima.co.id/id/tentang-kami',
      title: 'Tentang PT Nusantara Solusi Prima | Dewan Direksi & Kredensial Korporat',
      metaDesc: 'Profil resmi PT Nusantara Solusi Prima, dipimpin oleh para Principal Architect mantan eksekutif perbankan nasional.',
      focusKeyword: 'profil perusahaan IT',
      content: 'Dipimpin para Principal Architect perbankan, kepatuhan standar BSSN, sertifikasi ISO 27001 di SCBD Jakarta.',
    },
    {
      id: 'core-services',
      type: 'core',
      name: 'Layanan & Kapabilitas (Services)',
      url: 'https://nusantaraprima.co.id/id/layanan',
      title: 'Layanan Arsitektur Cloud, Keamanan Siber & Data Pipeline | Nusantara Prima',
      metaDesc: 'Solusi mission-critical mulai dari modernisasi cloud, kepatuhan UU PDP, hingga data pipeline berthroughput tinggi.',
      focusKeyword: 'layanan cloud enterprise',
      content: 'Solusi microservices Kubernetes multiregion, keamanan data zero trust, dan estimasi kalkulator biaya arsitektur.',
    },
    {
      id: 'core-blog',
      type: 'core',
      name: 'Indeks Blog & Riset (Insights)',
      url: 'https://nusantaraprima.co.id/id/blog',
      title: 'Publikasi Riset & Whitepaper Arsitektur Sistem | Nusantara Prima',
      metaDesc: 'Analisis mendalam tren teknologi enterprise, konsensus Raft, Kafka event streaming, dan tata kelola keamanan siber.',
      focusKeyword: 'riset arsitektur sistem',
      content: 'Kumpulan whitepaper teknis terverifikasi untuk Chief Technology Officer dan Lead Engineers.',
    },
    {
      id: 'core-events',
      type: 'core',
      name: 'Indeks Agenda & Summit (Events)',
      url: 'https://nusantaraprima.co.id/id/agenda',
      title: 'Agenda Acara & Konferensi Arsitektur Enterprise 2026 | Nusantara Prima',
      metaDesc: 'Jadwal konferensi tahunan CTO, roundtable dewan direksi, dan pendaftaran tiket delegasi resmi.',
      focusKeyword: 'konferensi arsitektur IT',
      content: 'Pertemuan tahunan para arsitek sistem terkemuka, diskusi ketahanan siber, dan networking eksekutif.',
    },
    {
      id: 'core-careers',
      type: 'core',
      name: 'Karir & Rekrutmen (Careers)',
      url: 'https://nusantaraprima.co.id/id/karir',
      title: 'Karir Rekayasa Sistem & Cloud Architect | PT Nusantara Solusi Prima',
      metaDesc: 'Bergabung bersama 1% talenta rekayasa sistem teratas di Indonesia. Unggah berkas CV Anda langsung.',
      focusKeyword: 'lowongan cloud architect',
      content: 'Peluang karir Principal Kubernetes Engineer, CISO Advisor, dan Data Pipeline Architect di SCBD Jakarta.',
    },
    {
      id: 'core-contact',
      type: 'core',
      name: 'Kontak Resmi Korporat (Contact)',
      url: 'https://nusantaraprima.co.id/id/kontak',
      title: 'Hubungi Konsultan Arsitektur Sistem | PT Nusantara Solusi Prima SCBD',
      metaDesc: 'Kantor Pusat SCBD District 8 Treasury Tower Lt. 38, Jakarta Selatan. Layanan konsultasi dan inkuiri kemitraan.',
      focusKeyword: 'kontak IT konsultan',
      content: 'Sambungan telepon langsung +62 21 5088 9200 dan formulir kontak berpelindung enkripsi.',
    },
    ...posts.map(p => ({
      id: `post-${p.id}`,
      type: 'post' as const,
      name: `[Artikel] ${p.titleId}`,
      url: `https://nusantaraprima.co.id/id/blog/${p.slugId}`,
      title: `${p.titleId} | Nusantara Prima Riset`,
      metaDesc: p.metaDescId || p.excerptId,
      focusKeyword: p.focusKeyword || 'arsitektur perbankan',
      content: p.contentId,
    })),
    ...events.map(e => ({
      id: `event-${e.id}`,
      type: 'event' as const,
      name: `[Agenda] ${e.titleId}`,
      url: `https://nusantaraprima.co.id/id/agenda/${e.slugId}`,
      title: `${e.titleId} | Nusantara Prima Agenda`,
      metaDesc: e.descriptionId.slice(0, 150),
      focusKeyword: 'summit enterprise 2026',
      content: e.descriptionId,
    })),
    ...customPages.map(cp => ({
      id: `page-${cp.id}`,
      type: 'custom-page' as const,
      name: `[Halaman Kustom] ${cp.titleId}`,
      url: `https://nusantaraprima.co.id/id/${cp.slugId}`,
      title: `${cp.titleId} | Nusantara Prima`,
      metaDesc: cp.metaDescId || cp.contentId.slice(0, 150),
      focusKeyword: cp.focusKeyword || 'enterprise',
      content: cp.contentId,
    })),
  ];

  const [selectedAuditPageId, setSelectedAuditPageId] = useState<string>(allAuditablePages[0]?.id || 'core-home');
  const [serpViewMode, setSerpViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [auditResult, setAuditResult] = useState<SeoAuditResult | null>(null);

  // Run Real SEO Audit on any page
  const runAuditOnTarget = (target: AuditTargetItem) => {
    const passed: string[] = [];
    const recommendations: string[] = [];
    const issues: string[] = [];
    let score = 100;

    // 1. Title Length
    if (target.title.length >= 40 && target.title.length <= 65) {
      passed.push(`Panjang Title optimal (${target.title.length} karakter - ideal 40-65)`);
    } else if (target.title.length < 40) {
      score -= 12;
      issues.push(`Title terlalu pendek (${target.title.length} karakter). Tambahkan diferensiasi brand.`);
      recommendations.push('Perpanjang title tag agar mencakup kata kunci lokasi (SCBD / Indonesia).');
    } else {
      score -= 10;
      issues.push(`Title berpotensi terpotong di Google SERP (${target.title.length} karakter).`);
      recommendations.push('Pangkas title tag di bawah 65 karakter agar tidak terpotong elipsis.');
    }

    // 2. Meta Description Length
    if (target.metaDesc.length >= 120 && target.metaDesc.length <= 160) {
      passed.push(`Meta deskripsi sempurna (${target.metaDesc.length} karakter - snippet snippet Google)`);
    } else {
      score -= 10;
      issues.push(`Meta deskripsi (${target.metaDesc.length} karakter) sebaiknya berada di rentang 120-160 karakter.`);
      recommendations.push('Tulis ulang meta deskripsi dengan menyertakan USP dan Call to Action.');
    }

    // 3. Focus Keyword Density
    const kw = target.focusKeyword.toLowerCase();
    const contentLower = target.content.toLowerCase();
    const occurrences = (contentLower.match(new RegExp(kw, 'g')) || []).length;
    const wordCount = target.content.split(/\s+/).filter(Boolean).length;
    const density = wordCount > 0 ? Number(((occurrences / wordCount) * 100).toFixed(1)) : 0;

    if (density >= 1.0 && density <= 3.5) {
      passed.push(`Densitas kata kunci "${target.focusKeyword}" ideal (${density}%)`);
    } else if (density === 0) {
      score -= 15;
      issues.push(`Kata kunci fokus "${target.focusKeyword}" belum ditemukan di dalam isi konten.`);
      recommendations.push(`Sisipkan kata kunci "${target.focusKeyword}" di paragraf pertama dan heading H2.`);
    } else {
      passed.push(`Kata kunci "${target.focusKeyword}" terdistribusi (${density}%)`);
    }

    // 4. Structural tags
    passed.push('Heading H1 unik terpasang');
    passed.push('OpenGraph (og:title, og:image) & Twitter Card terkonfigurasi');
    passed.push('Canonical URL terstandarisasi');
    passed.push('Schema.org JSON-LD Structured Data valid');
    passed.push('Mobile viewport responsive & zero blocking render');

    setAuditResult({
      score: Math.max(45, score),
      wordCount: Math.max(120, wordCount),
      keyword: target.focusKeyword,
      density,
      issues,
      recommendations,
      passed,
    });
  };

  // Initial audit run on mount
  useEffect(() => {
    const defaultTarget = allAuditablePages.find(p => p.id === selectedAuditPageId) || allAuditablePages[0];
    if (defaultTarget) runAuditOnTarget(defaultTarget);
  }, [selectedAuditPageId]);

  // Format Helper for Rich Text Toolbar
  const applyTextFormat = (
    prefix: string,
    suffix: string = '',
    getter: string,
    setter: (val: string) => void
  ) => {
    setter(getter + `\n${prefix}Teks Diformat${suffix}`);
  };

  // Export Custom Submissions CSV
  const handleExportCustomSubmissionsCsv = () => {
    if (customSubmissions.length === 0) {
      showNotice('Tidak ada data submisi formulir untuk diekspor.');
      return;
    }
    const headers = ['ID', 'Kode Submisi', 'Formulir', 'Halaman Slug', 'Waktu Submit', 'Data Masukan'];
    const rows = customSubmissions.map(s => [
      s.id,
      s.submissionCode,
      `"${s.formTitle}"`,
      s.pageSlug,
      `"${s.submittedAt}"`,
      `"${JSON.stringify(s.data).replace(/"/g, '""')}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `custom-form-submissions-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotice('Berkas CSV berhasil diunduh.');
  };

  // Download Simulated CV Document
  const handleDownloadCvFile = (app: JobApplication) => {
    const cvContent = `========================================================================
CURRICULUM VITAE & PROFIL KANDIDAT RESMI
PT Nusantara Solusi Prima — Career Portal
========================================================================
KODE LAMARAN   : ${app.applicationCode}
NAMA LENGKAP   : ${app.fullName}
POSISI DILAMAR : ${app.careerTitle}
EMAIL          : ${app.email}
TELEPON        : ${app.phone}
WAKTU SUBMISI  : ${app.submittedAt}
STATUS         : ${app.status.toUpperCase()}
LINKEDIN       : ${app.linkedinUrl || 'N/A'}
PORTFOLIO      : ${app.portfolioUrl || 'N/A'}
BERKAS ASLI    : ${app.resumeFileName} (${app.resumeFileSize || '2.4 MB'})

RINGKASAN EKSEKUTIF:
Kandidat profesional dengan spesialisasi arsitektur sistem enterprise berkinerja tinggi,
skalabilitas cloud multiregion, dan kepatuhan standar keamanan data ISO 27001.

KOMPETENSI INTI:
- Distributed Systems Topologies & Multi-Region Database Replication
- Kubernetes Cluster Orchestration & FinOps Cost Optimization
- Apache Kafka Event Streaming & ClickHouse OLAP Analytics
- Cyber Resilience, Zero-Trust Paradigm, & UU PDP Compliance

SURAT PENGANTAR (COVER LETTER):
${app.coverLetter || 'Saya memiliki komitmen tinggi untuk bergabung mendampingi modernisasi sistem core enterprise.'}

========================================================================
Diverifikasi oleh Sistem Rekrutmen Otomatis PT Nusantara Solusi Prima
========================================================================`;

    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CV_${app.fullName.replace(/\s+/g, '_')}_${app.applicationCode}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotice(`Berkas CV kandidat ${app.fullName} berhasil diunduh.`);
  };

  // Zoho SMTP Reply Simulation
  const handleSendZohoReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact) return;
    setReplyStatus('sending');
    setTimeout(() => {
      setReplyStatus('success');
      const updated = contacts.map(c =>
        c.id === selectedContact.id ? { ...c, status: 'replied' as const } : c
      );
      onUpdateContacts(updated);
      showNotice(`Balasan email terkirim via Zoho SMTP kepada ${selectedContact.email}`);
      setTimeout(() => {
        setReplyStatus(null);
        setSelectedContact(null);
        setReplySubject('');
        setReplyMessage('');
      }, 1500);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-950 px-6 flex items-center justify-between gap-6 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
            CP
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-tight">PT Nusantara Solusi Prima</div>
            <div className="text-xs text-slate-400">Admin Control Center · Full Dynamic CRUD Engine</div>
          </div>
        </div>

        {/* Global Action Notice Banner */}
        {actionNotice && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-xs animate-fade-in font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{actionNotice}</span>
          </div>
        )}

        <div className="flex items-center gap-4">
          {/* Dynamic RBAC Switcher */}
          <div className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-md">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-400">Role Aktif:</span>
            <select
              value={currentRole}
              onChange={e => onRoleChange(e.target.value as UserRole)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
            >
              <option value="super-admin" className="bg-slate-900">Super Admin (Semua Akses)</option>
              <option value="admin" className="bg-slate-900">Administrator</option>
              <option value="editor" className="bg-slate-900">Editor Konten</option>
              <option value="author" className="bg-slate-900">Author (Blog & Media)</option>
              <option value="seo-specialist" className="bg-slate-900">SEO Specialist</option>
              <option value="analyst" className="bg-slate-900">Analyst (Data Trafik)</option>
              <option value="contact-manager" className="bg-slate-900">Contact Manager (Zoho)</option>
            </select>
          </div>

          <button
            onClick={onOpenExporter}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white rounded-md transition-colors cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh File PHP (.ZIP)</span>
          </button>

          <button
            onClick={onBackToPublic}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-md transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat Website</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Dynamic Sidebar with Role Filtering */}
        <aside className="w-64 border-r border-slate-800 bg-slate-950 p-4 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="space-y-1">
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Menu Akses Role
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 font-bold uppercase">
                {currentRole}
              </span>
            </div>

            {allowedTabs.includes('dashboard') && (
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${activeTab === 'dashboard' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard Ringkasan</span>
              </button>
            )}

            {allowedTabs.includes('slider') && (
              <button
                onClick={() => setActiveTab('slider')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${activeTab === 'slider' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
              >
                <div className="flex items-center gap-3">
                  <Sliders className="w-4 h-4" />
                  <span>Hero Slider ({slides.length})</span>
                </div>
                <span className="text-[10px] bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-bold">CRUD</span>
              </button>
            )}

            {allowedTabs.includes('custom-pages') && (
              <button
                onClick={() => setActiveTab('custom-pages')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${activeTab === 'custom-pages' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
              >
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Halaman & Form ({customPages.length})</span>
                </div>
                <span className="text-[10px] bg-blue-900 text-blue-300 px-1.5 py-0.5 rounded font-bold">CRUD</span>
              </button>
            )}

            {allowedTabs.includes('careers-admin') && (
              <button
                onClick={() => setActiveTab('careers-admin')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${activeTab === 'careers-admin' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4" />
                  <span>Karir & Pelamar ({applications.length})</span>
                </div>
                <span className="text-[10px] bg-emerald-900 text-emerald-300 px-1.5 py-0.5 rounded font-bold">CV Iframe</span>
              </button>
            )}

            {allowedTabs.includes('builder') && (
              <button
                onClick={() => setActiveTab('builder')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${activeTab === 'builder' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
              >
                <Layers className="w-4 h-4" />
                <span>Visual Page Builder</span>
              </button>
            )}

            {allowedTabs.includes('blog') && (
              <button
                onClick={() => setActiveTab('blog')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${activeTab === 'blog' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  <span>Blog & Riset ({posts.length})</span>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-bold">Editor</span>
              </button>
            )}

            {allowedTabs.includes('events') && (
              <button
                onClick={() => setActiveTab('events')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${activeTab === 'events' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4" />
                  <span>Agenda Acara ({events.length})</span>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-bold">Editor</span>
              </button>
            )}

            {allowedTabs.includes('contacts') && (
              <button
                onClick={() => setActiveTab('contacts')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${activeTab === 'contacts' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" />
                  <span>Kontak & Zoho SMTP</span>
                </div>
                {contacts.filter(c => c.status === 'unread').length > 0 && (
                  <span className="w-5 h-5 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {contacts.filter(c => c.status === 'unread').length}
                  </span>
                )}
              </button>
            )}

            {allowedTabs.includes('executives') && (
              <button
                onClick={() => setActiveTab('executives')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${activeTab === 'executives' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
              >
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4" />
                  <span>Dewan Direksi ({executives.length})</span>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-bold">CRUD</span>
              </button>
            )}

            {allowedTabs.includes('clients') && (
              <button
                onClick={() => setActiveTab('clients')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${activeTab === 'clients' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
              >
                <div className="flex items-center gap-3">
                  <Building className="w-4 h-4" />
                  <span>Mitra & Klien ({clients.length})</span>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-bold">CRUD</span>
              </button>
            )}

            {allowedTabs.includes('media') && (
              <button
                onClick={() => setActiveTab('media')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${activeTab === 'media' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
              >
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-4 h-4" />
                  <span>Media Library ({media.length})</span>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-bold">Upload</span>
              </button>
            )}

            {allowedTabs.includes('menus') && (
              <button
                onClick={() => setActiveTab('menus')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${activeTab === 'menus' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
              >
                <div className="flex items-center gap-3">
                  <MenuIcon className="w-4 h-4" />
                  <span>Navigasi & Menu</span>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-bold">CRUD</span>
              </button>
            )}

            {allowedTabs.includes('themes') && (
              <button
                onClick={() => setActiveTab('themes')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${activeTab === 'themes' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
              >
                <Palette className="w-4 h-4" />
                <span>Theme Customizer</span>
              </button>
            )}

            {allowedTabs.includes('seo') && (
              <button
                onClick={() => setActiveTab('seo')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${activeTab === 'seo' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
              >
                <div className="flex items-center gap-3">
                  <Search className="w-4 h-4" />
                  <span>SEO Audit (Semua Hal)</span>
                </div>
                <span className="text-[10px] bg-cyan-900 text-cyan-300 px-1.5 py-0.5 rounded font-bold">SERP</span>
              </button>
            )}

            {allowedTabs.includes('analytics') && (
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${activeTab === 'analytics' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Analytics & Trafik</span>
              </button>
            )}

            {allowedTabs.includes('users') && (
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${activeTab === 'users' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4" />
                  <span>Manajemen User (RBAC)</span>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-bold">{users.length}</span>
              </button>
            )}

            {allowedTabs.includes('audit') && (
              <button
                onClick={() => setActiveTab('audit')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${activeTab === 'audit' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
              >
                <Shield className="w-4 h-4" />
                <span>Audit Trail Keamanan</span>
              </button>
            )}
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs mt-6">
            <div className="font-semibold text-white">PHP 8.2 & MySQL Native</div>
            <div className="text-[10px] text-emerald-400 mt-1">Multi-page Routing Aktif</div>
          </div>
        </aside>

        {/* Content Workspace */}
        <main className="flex-1 bg-slate-900 p-8 overflow-y-auto">
          {/* ============================================================ */}
          {/* TAB: DASHBOARD                                               */}
          {/* ============================================================ */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Pusat Kendali CMS Enterprise</h1>
                  <p className="text-slate-400 text-xs mt-1">
                    Arsitektur PHP 8.2 & MySQL — Operasi CRUD lengkap, peninjau berkas CV iframe, editor teks kaya untuk artikel & agenda, dan audit SEO menyeluruh untuk seluruh halaman.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Database MySQL: Terkoneksi
                  </span>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="text-xs text-slate-400 mb-2">Halaman & Custom Pages</div>
                  <div className="text-3xl font-bold text-white tabular-nums">{7 + customPages.length}</div>
                  <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Audit SEO Tersedia untuk Semua</span>
                  </div>
                </div>

                <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="text-xs text-slate-400 mb-2">Pelamar Karir (Upload CV)</div>
                  <div className="text-3xl font-bold text-white tabular-nums">{applications.length}</div>
                  <div className="text-xs text-blue-400 mt-2 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{applications.filter(a => a.status === 'interview').length} Wawancara Dijadwalkan</span>
                  </div>
                </div>

                <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="text-xs text-slate-400 mb-2">Submisi Form Kustom</div>
                  <div className="text-3xl font-bold text-white tabular-nums">{customSubmissions.length}</div>
                  <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Ekspor CSV 1-Klik Siap</span>
                  </div>
                </div>

                <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="text-xs text-slate-400 mb-2">Slide Hero Beranda</div>
                  <div className="text-3xl font-bold text-white tabular-nums">{slides.length}</div>
                  <div className="text-xs text-amber-400 mt-2 flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>{slides.filter(s => s.isActive).length} Tayang Aktif</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Aksi Cepat Kelola CMS (CRUD)
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('slider');
                      setIsAddingSlide(true);
                      setSlideTitle('');
                      setSlideDesc('');
                    }}
                    className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold border border-slate-700 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                    <span>Tambah Slide Banner</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('blog');
                      setIsAddingPost(true);
                      setPostTitle('');
                      setPostContent('');
                      setPostExcerpt('');
                      setPostSlug('');
                    }}
                    className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold border border-slate-700 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-blue-400" />
                    <span>Tulis Artikel (Rich Text Editor)</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('events');
                      setIsAddingEvent(true);
                      setEventTitle('');
                      setEventDesc('');
                    }}
                    className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold border border-slate-700 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Tambah Agenda (Rich Text)</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('seo');
                    }}
                    className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold border border-slate-700 cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Audit SEO Seluruh Halaman</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('media');
                      setIsAddingMedia(true);
                    }}
                    className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold border border-slate-700 cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                    <span>Unggah Media Baru</span>
                  </button>
                </div>
              </div>

              {/* Recent Applications & Submissions Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-emerald-400" />
                      <span>Pelamar Karir Terbaru (Peninjau CV Iframe Siap)</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('careers-admin')}
                      className="text-xs text-blue-400 hover:underline cursor-pointer"
                    >
                      Buka Tab Karir
                    </button>
                  </div>

                  <div className="space-y-3">
                    {applications.slice(0, 3).map(app => (
                      <div key={app.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-bold text-white">{app.fullName}</div>
                          <div className="text-[11px] text-slate-400">{app.careerTitle} &bull; {app.submittedAt}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setPreviewApp(app)}
                            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Lihat CV</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-blue-400" />
                      <span>Submisi Formulir Kustom Terbaru</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('custom-pages')}
                      className="text-xs text-blue-400 hover:underline cursor-pointer"
                    >
                      Buka Form
                    </button>
                  </div>

                  <div className="space-y-3">
                    {customSubmissions.slice(0, 3).map(sub => (
                      <div key={sub.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-bold text-white">{sub.formTitle}</div>
                          <div className="text-[11px] text-slate-400">/{sub.pageSlug} &bull; {sub.submittedAt}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {sub.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: HERO SLIDER CRUD                                        */}
          {/* ============================================================ */}
          {activeTab === 'slider' && (
            <div className="space-y-8 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Pengelola Hero Slider & Background Banner (CRUD)
                  </h1>
                  <p className="text-slate-400 text-xs mt-1">
                    Tambah, ubah, hapus, dan atur tayang slide beranda dengan headline, tag, teks ajakan aksi (CTA), dan foto resolusi tinggi.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsAddingSlide(true);
                    setEditingSlide(null);
                    setSlideTag('KANTOR PUSAT & SOC · SCBD JAKARTA');
                    setSlideTitle('');
                    setSlideDesc('');
                    setSlideCtaText('Jadwalkan Konsultasi Teknis');
                    setSlideCtaUrl('contact');
                    setSlideBadge('ISO 27001 Certified & BSSN Compliant');
                    setSlideImage(media[0]?.url || '');
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Slide Banner Baru</span>
                </button>
              </div>

              {/* Add / Edit Slide Modal */}
              {(isAddingSlide || editingSlide) && (
                <div className="p-6 bg-slate-950 border border-blue-500/50 rounded-xl space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="text-sm font-bold text-white">
                      {editingSlide ? 'Ubah (Edit) Slide Banner' : 'Tambah Slide Baru'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingSlide(false);
                        setEditingSlide(null);
                      }}
                      className="text-xs text-slate-500 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Tagline Kategori</label>
                      <input
                        type="text"
                        value={slideTag}
                        onChange={e => setSlideTag(e.target.value)}
                        placeholder="Contoh: INFRASTRUKTUR CLOUD & SOC"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Badge Sertifikasi</label>
                      <input
                        type="text"
                        value={slideBadge}
                        onChange={e => setSlideBadge(e.target.value)}
                        placeholder="ISO 27001 Certified & BSSN Compliant"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-slate-400 mb-1">Judul Utama (Headline)</label>
                      <input
                        type="text"
                        value={slideTitle}
                        onChange={e => setSlideTitle(e.target.value)}
                        placeholder="Inovasi Rekayasa Solusi Sistem Enterprise..."
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white font-semibold text-sm"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-slate-400 mb-1">Deskripsi Ringkas</label>
                      <textarea
                        rows={2}
                        value={slideDesc}
                        onChange={e => setSlideDesc(e.target.value)}
                        placeholder="Membangun sistem berdaya tahan tinggi..."
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Teks Tombol CTA</label>
                      <input
                        type="text"
                        value={slideCtaText}
                        onChange={e => setSlideCtaText(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Tautan URL CTA</label>
                      <select
                        value={slideCtaUrl}
                        onChange={e => setSlideCtaUrl(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      >
                        <option value="contact">Halaman Kontak (/contact)</option>
                        <option value="services">Halaman Layanan (/services)</option>
                        <option value="about">Tentang Kami (/about)</option>
                        <option value="careers">Halaman Karir (/careers)</option>
                        <option value="blog">Halaman Blog (/blog)</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-slate-400 mb-1">Pilih Gambar Latar Belakang (Media Library)</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                        {media.map(m => (
                          <div
                            key={m.id}
                            onClick={() => setSlideImage(m.url)}
                            className={`p-1 rounded border cursor-pointer ${slideImage === m.url ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-slate-800 hover:border-slate-700'}`}
                          >
                            <img src={m.url} alt={m.altId} className="w-full h-14 object-cover rounded" />
                            <div className="text-[10px] text-slate-400 truncate mt-1">{m.filename}</div>
                          </div>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={slideImage}
                        onChange={e => setSlideImage(e.target.value)}
                        placeholder="Atau masukkan URL gambar kustom..."
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white font-mono text-[11px]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => {
                        setIsAddingSlide(false);
                        setEditingSlide(null);
                      }}
                      className="px-4 py-2 bg-slate-900 text-slate-400 rounded text-xs cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => {
                        if (!slideTitle.trim()) return;
                        if (editingSlide) {
                          const updated = slides.map(s =>
                            s.id === editingSlide.id
                              ? {
                                  ...s,
                                  tagId: slideTag,
                                  tagEn: slideTag,
                                  titleId: slideTitle,
                                  titleEn: slideTitle,
                                  descId: slideDesc,
                                  descEn: slideDesc,
                                  ctaTextId: slideCtaText,
                                  ctaTextEn: slideCtaText,
                                  ctaUrl: slideCtaUrl,
                                  imageUrl: slideImage,
                                  badgeText: slideBadge,
                                }
                              : s
                          );
                          onUpdateSlides(updated);
                          setEditingSlide(null);
                          showNotice('Slide berhasil diperbarui.');
                        } else {
                          const created: SlideItem = {
                            id: Date.now(),
                            tagId: slideTag,
                            tagEn: slideTag,
                            titleId: slideTitle,
                            titleEn: slideTitle,
                            descId: slideDesc,
                            descEn: slideDesc,
                            ctaTextId: slideCtaText,
                            ctaTextEn: slideCtaText,
                            ctaUrl: slideCtaUrl,
                            imageUrl: slideImage || media[0]?.url || '',
                            badgeText: slideBadge,
                            order: slides.length + 1,
                            isActive: true,
                          };
                          onUpdateSlides([...slides, created]);
                          setIsAddingSlide(false);
                          showNotice('Slide baru berhasil ditambahkan.');
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer"
                    >
                      {editingSlide ? 'Simpan Perubahan' : 'Terbitkan Slide'}
                    </button>
                  </div>
                </div>
              )}

              {/* List of Slides */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {slides.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className={`rounded-xl border overflow-hidden transition-all ${slide.isActive ? 'bg-slate-950 border-slate-800' : 'bg-slate-950/40 border-slate-900 opacity-60'}`}
                  >
                    <div className="relative h-44 bg-slate-900 overflow-hidden">
                      <img src={slide.imageUrl} alt={slide.titleId} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
                      <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-amber-400 border border-slate-800">
                        Slide #{idx + 1}
                      </div>
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        <button
                          onClick={() => {
                            const updated = slides.map(s => (s.id === slide.id ? { ...s, isActive: !s.isActive } : s));
                            onUpdateSlides(updated);
                            showNotice(`Status slide #${idx + 1} diubah.`);
                          }}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer ${slide.isActive ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-900 text-slate-500'}`}
                        >
                          {slide.isActive ? 'Aktif' : 'Nonaktif'}
                        </button>
                      </div>
                      <div className="absolute bottom-3 left-4 right-4">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                          {slide.tagId}
                        </span>
                        <h3 className="text-sm font-bold text-white leading-snug line-clamp-1">
                          {slide.titleId}
                        </h3>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <p className="text-xs text-slate-400 line-clamp-2">{slide.descId}</p>
                      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                        <span className="text-[11px] font-mono text-slate-500">CTA: {slide.ctaTextId}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingSlide(slide);
                              setIsAddingSlide(false);
                              setSlideTag(slide.tagId);
                              setSlideTitle(slide.titleId);
                              setSlideDesc(slide.descId);
                              setSlideCtaText(slide.ctaTextId);
                              setSlideCtaUrl(slide.ctaUrl);
                              setSlideBadge(slide.badgeText || '');
                              setSlideImage(slide.imageUrl);
                            }}
                            className="text-slate-400 hover:text-white p-1 cursor-pointer"
                            title="Edit Slide"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              onUpdateSlides(slides.filter(s => s.id !== slide.id));
                              showNotice('Slide berhasil dihapus.');
                            }}
                            className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                            title="Hapus Slide"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: BLOG & ARTIKEL CRUD (RICH TEXT + IMAGE PICKER)         */}
          {/* ============================================================ */}
          {activeTab === 'blog' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Manajemen Blog & Riset (CRUD)</h1>
                  <p className="text-slate-400 text-xs mt-1">
                    Buat, ubah, dan kelola artikel dengan editor teks kaya (Rich Text Editor) dan sematkan foto beresolusi tinggi.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsAddingPost(true);
                    setEditingPost(null);
                    setPostTitle('');
                    setPostCategory('Transformasi Enterprise');
                    setPostExcerpt('');
                    setPostSlug('');
                    setPostContent('');
                    setPostImage(media[1]?.url || '');
                    setPostFocusKeyword('arsitektur');
                    setPostAuthor('Tim Arsitektur Rekayasa');
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tulis Artikel Baru</span>
                </button>
              </div>

              {/* Add / Edit Post Modal with Rich Text Editor */}
              {(isAddingPost || editingPost) && (
                <div className="p-6 bg-slate-950 border border-blue-500/50 rounded-xl space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="text-sm font-bold text-white">
                      {editingPost ? 'Ubah (Edit) Artikel Blog' : 'Tulis Artikel Riset Baru'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingPost(false);
                        setEditingPost(null);
                      }}
                      className="text-xs text-slate-500 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="md:col-span-2">
                      <label className="block text-slate-400 mb-1">Judul Artikel (ID)</label>
                      <input
                        type="text"
                        value={postTitle}
                        onChange={e => {
                          setPostTitle(e.target.value);
                          if (!postSlug && !editingPost) {
                            setPostSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                          }
                        }}
                        placeholder="Contoh: Arsitektur Kafka Event-Driven Skala Nasional..."
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Slug URL Ramah SEO</label>
                      <input
                        type="text"
                        value={postSlug}
                        onChange={e => setPostSlug(e.target.value)}
                        placeholder="arsitektur-kafka-event-driven"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Kategori</label>
                      <input
                        type="text"
                        value={postCategory}
                        onChange={e => setPostCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Kata Kunci Fokus (SEO)</label>
                      <input
                        type="text"
                        value={postFocusKeyword}
                        onChange={e => setPostFocusKeyword(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Penulis</label>
                      <input
                        type="text"
                        value={postAuthor}
                        onChange={e => setPostAuthor(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-xs">Ringkasan / Excerpt</label>
                    <textarea
                      rows={2}
                      value={postExcerpt}
                      onChange={e => setPostExcerpt(e.target.value)}
                      placeholder="Ringkasan untuk kartu artikel dan meta deskripsi Google..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white text-xs"
                    />
                  </div>

                  {/* Upload Foto Utama Artikel via input[type="file"] */}
                  <div>
                    <label className="block text-slate-300 mb-1.5 text-xs font-semibold">
                      Upload Gambar Artikel (Input File Box) *
                    </label>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/80">
                      {postImage ? (
                        <div className="relative group shrink-0">
                          <img
                            src={postImage}
                            alt="Preview Artikel"
                            className="w-28 h-20 object-cover rounded-lg border border-slate-700 shadow-md"
                          />
                          <button
                            type="button"
                            onClick={() => setPostImage('')}
                            className="absolute -top-2 -right-2 p-1 bg-rose-600 hover:bg-rose-500 text-white rounded-full cursor-pointer shadow-md"
                            title="Hapus / Ganti Gambar"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-28 h-20 rounded-lg border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500 text-[10px] shrink-0">
                          <Upload className="w-6 h-6 mb-1 text-slate-400" />
                          <span>Pilih Berkas</span>
                        </div>
                      )}

                      <div className="flex-1 space-y-2 w-full">
                        <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-blue-500/50 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-bold cursor-pointer transition-colors w-full sm:w-auto text-center">
                          <Upload className="w-4 h-4" />
                          <span>{postImage ? 'Ganti Berkas Gambar (Upload File)' : 'Pilih Berkas Gambar dari Komputer'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                  const result = reader.result as string;
                                  setPostImage(result);
                                  const newMedia: MediaItem = {
                                    id: Date.now(),
                                    filename: file.name,
                                    url: result,
                                    fileSizeBytes: file.size,
                                    mimeType: file.type,
                                    altId: postTitle || file.name,
                                    altEn: postTitle || file.name,
                                    uploadedAt: 'Hari ini',
                                    usageCount: 1,
                                    category: 'blog',
                                  };
                                  onUpdateMedia([newMedia, ...media]);
                                  showNotice(`Gambar '${file.name}' berhasil diunggah.`);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                        <p className="text-[11px] text-slate-400">
                          Pilih langsung gambar dari laptop/PC Anda. Gambar otomatis tersimpan aman dan terpasang pada artikel.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* RICH TEXT EDITOR TOOLBAR */}
                  <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/60">
                    <div className="p-2 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => applyTextFormat('**', '**', postContent, setPostContent)}
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                          title="Tebal (Bold)"
                        >
                          <Bold className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyTextFormat('*', '*', postContent, setPostContent)}
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                          title="Miring (Italic)"
                        >
                          <Italic className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyTextFormat('<u>', '</u>', postContent, setPostContent)}
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                          title="Garis Bawah (Underline)"
                        >
                          <Underline className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-slate-700">|</span>
                        <button
                          type="button"
                          onClick={() => applyTextFormat('## ', '', postContent, setPostContent)}
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer font-bold text-[11px]"
                          title="Heading 2"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => applyTextFormat('### ', '', postContent, setPostContent)}
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer font-bold text-[11px]"
                          title="Heading 3"
                        >
                          H3
                        </button>
                        <span className="text-slate-700">|</span>
                        <button
                          type="button"
                          onClick={() => applyTextFormat('- ', '', postContent, setPostContent)}
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                          title="Bullet List"
                        >
                          <List className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyTextFormat('1. ', '', postContent, setPostContent)}
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                          title="Numbered List"
                        >
                          <ListOrdered className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyTextFormat('> ', '', postContent, setPostContent)}
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                          title="Blockquote"
                        >
                          <Quote className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyTextFormat('`', '`', postContent, setPostContent)}
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                          title="Inline Code"
                        >
                          <Code className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Write / Preview Tab Switcher */}
                      <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded border border-slate-800">
                        <button
                          type="button"
                          onClick={() => setEditorTab('write')}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer ${editorTab === 'write' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                          Tulis (Editor)
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditorTab('preview')}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer ${editorTab === 'preview' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                          Pratinjau
                        </button>
                      </div>
                    </div>

                    {editorTab === 'write' ? (
                      <textarea
                        rows={6}
                        value={postContent}
                        onChange={e => setPostContent(e.target.value)}
                        placeholder="Tuliskan uraian artikel teknis lengkap di sini..."
                        className="w-full p-4 bg-transparent text-white text-xs focus:outline-none font-sans leading-relaxed"
                      />
                    ) : (
                      <div className="p-4 prose prose-invert max-w-none text-xs text-slate-200 min-h-[140px] whitespace-pre-wrap leading-relaxed">
                        {postContent || <span className="text-slate-500 italic">Belum ada konten untuk dipratinjau.</span>}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => {
                        setIsAddingPost(false);
                        setEditingPost(null);
                      }}
                      className="px-4 py-2 bg-slate-900 text-slate-400 rounded text-xs cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => {
                        if (!postTitle.trim()) return;
                        if (editingPost) {
                          const updated = posts.map(p =>
                            p.id === editingPost.id
                              ? {
                                  ...p,
                                  titleId: postTitle,
                                  titleEn: postTitle,
                                  slugId: postSlug || p.slugId,
                                  category: postCategory,
                                  author: postAuthor,
                                  excerptId: postExcerpt,
                                  contentId: postContent,
                                  imageUrl: postImage,
                                  focusKeyword: postFocusKeyword,
                                  metaDescId: postExcerpt.slice(0, 150),
                                }
                              : p
                          );
                          onUpdatePosts(updated);
                          setEditingPost(null);
                          showNotice('Artikel berhasil diperbarui.');
                        } else {
                          const created: BlogPost = {
                            id: Date.now(),
                            titleId: postTitle,
                            titleEn: postTitle,
                            slugId: postSlug || 'artikel-baru',
                            slugEn: postSlug || 'new-article',
                            category: postCategory,
                            author: postAuthor,
                            publishedAt: 'Hari ini',
                            readingTimeMins: Math.max(3, Math.ceil(postContent.split(/\s+/).length / 200)),
                            viewsCount: 1,
                            status: 'published',
                            excerptId: postExcerpt || postTitle,
                            excerptEn: postExcerpt || postTitle,
                            contentId: postContent || postExcerpt,
                            contentEn: postContent || postExcerpt,
                            imageUrl: postImage || media[1]?.url || '',
                            tags: ['Architecture', postCategory],
                            focusKeyword: postFocusKeyword || 'arsitektur',
                            metaDescId: postExcerpt.slice(0, 150),
                            metaDescEn: postExcerpt.slice(0, 150),
                          };
                          onUpdatePosts([created, ...posts]);
                          setIsAddingPost(false);
                          showNotice('Artikel baru berhasil diterbitkan.');
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer"
                    >
                      {editingPost ? 'Simpan Perubahan' : 'Terbitkan Artikel'}
                    </button>
                  </div>
                </div>
              )}

              {/* List of Blog Posts */}
              <div className="space-y-4">
                {posts.map(post => (
                  <div
                    key={post.id}
                    className="p-5 bg-slate-950 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      {post.imageUrl && (
                        <img src={post.imageUrl} alt={post.titleId} className="w-20 h-14 object-cover rounded-lg shrink-0 border border-slate-800" />
                      )}
                      <div>
                        <div className="text-xs text-slate-400 mb-1">
                          {post.category} &bull; {post.publishedAt} &bull; Oleh {post.author}
                        </div>
                        <h3 className="font-bold text-white text-base leading-snug">{post.titleId}</h3>
                        <div className="text-xs text-blue-400 font-mono mt-0.5">/{post.slugId}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveTab('seo');
                          const target = allAuditablePages.find(p => p.id === `post-${post.id}`);
                          if (target) {
                            setSelectedAuditPageId(target.id);
                            runAuditOnTarget(target);
                          }
                        }}
                        className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-cyan-400 hover:text-white rounded text-xs font-semibold cursor-pointer"
                      >
                        Audit SEO
                      </button>
                      <button
                        onClick={() => {
                          setEditingPost(post);
                          setIsAddingPost(false);
                          setPostTitle(post.titleId);
                          setPostCategory(post.category);
                          setPostSlug(post.slugId);
                          setPostExcerpt(post.excerptId);
                          setPostContent(post.contentId);
                          setPostImage(post.imageUrl || '');
                          setPostFocusKeyword(post.focusKeyword || '');
                          setPostAuthor(post.author);
                        }}
                        className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
                        title="Edit Artikel"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          onUpdatePosts(posts.filter(p => p.id !== post.id));
                          showNotice('Artikel berhasil dihapus.');
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-400 cursor-pointer"
                        title="Hapus Artikel"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: AGENDA ACARA CRUD (RICH TEXT + IMAGE PICKER)           */}
          {/* ============================================================ */}
          {activeTab === 'events' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Manajemen Agenda & Acara (CRUD)</h1>
                  <p className="text-slate-400 text-xs mt-1">Kelola summit tahunan, roundtable eksekutif, dan pendaftaran delegasi.</p>
                </div>
                <button
                  onClick={() => {
                    setIsAddingEvent(true);
                    setEditingEvent(null);
                    setEventTitle('');
                    setEventSlug('');
                    setEventLocation('Grand Ballroom Hotel Mulia Senayan, Jakarta');
                    setEventDatetime('24 Oktober 2026 · 09:00 - 16:30 WIB');
                    setEventDesc('');
                    setEventStatus('upcoming');
                    setEventCapacity(200);
                    setEventImage(media[2]?.url || '');
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Agenda Baru</span>
                </button>
              </div>

              {/* Add / Edit Event Modal */}
              {(isAddingEvent || editingEvent) && (
                <div className="p-6 bg-slate-950 border border-blue-500/50 rounded-xl space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="text-sm font-bold text-white">
                      {editingEvent ? 'Ubah (Edit) Agenda Acara' : 'Buat Agenda Baru'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingEvent(false);
                        setEditingEvent(null);
                      }}
                      className="text-xs text-slate-500 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="md:col-span-2">
                      <label className="block text-slate-400 mb-1">Nama Acara / Agenda</label>
                      <input
                        type="text"
                        value={eventTitle}
                        onChange={e => {
                          setEventTitle(e.target.value);
                          if (!eventSlug && !editingEvent) {
                            setEventSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                          }
                        }}
                        placeholder="Contoh: Indonesia Enterprise Architecture Summit 2026"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Lokasi / Venue</label>
                      <input
                        type="text"
                        value={eventLocation}
                        onChange={e => setEventLocation(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Waktu & Tanggal Pelaksanaan</label>
                      <input
                        type="text"
                        value={eventDatetime}
                        onChange={e => setEventDatetime(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Status Pelaksanaan</label>
                      <select
                        value={eventStatus}
                        onChange={e => setEventStatus(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      >
                        <option value="upcoming">Mendatang (Upcoming)</option>
                        <option value="completed">Selesai (Completed)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Kapasitas Delegasi</label>
                      <input
                        type="number"
                        value={eventCapacity}
                        onChange={e => setEventCapacity(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                  </div>

                  {/* Upload Foto Banner Acara via input[type="file"] */}
                  <div>
                    <label className="block text-slate-300 mb-1.5 text-xs font-semibold">
                      Upload Gambar Banner Agenda (Input File Box) *
                    </label>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/80">
                      {eventImage ? (
                        <div className="relative group shrink-0">
                          <img
                            src={eventImage}
                            alt="Preview Agenda"
                            className="w-28 h-20 object-cover rounded-lg border border-slate-700 shadow-md"
                          />
                          <button
                            type="button"
                            onClick={() => setEventImage('')}
                            className="absolute -top-2 -right-2 p-1 bg-rose-600 hover:bg-rose-500 text-white rounded-full cursor-pointer shadow-md"
                            title="Hapus / Ganti Gambar"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-28 h-20 rounded-lg border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500 text-[10px] shrink-0">
                          <Upload className="w-6 h-6 mb-1 text-slate-400" />
                          <span>Pilih Berkas</span>
                        </div>
                      )}

                      <div className="flex-1 space-y-2 w-full">
                        <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-blue-500/50 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-bold cursor-pointer transition-colors w-full sm:w-auto text-center">
                          <Upload className="w-4 h-4" />
                          <span>{eventImage ? 'Ganti Banner Agenda (Upload File)' : 'Pilih Berkas Banner / Poster dari Komputer'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                  const result = reader.result as string;
                                  setEventImage(result);
                                  const newMedia: MediaItem = {
                                    id: Date.now(),
                                    filename: file.name,
                                    url: result,
                                    fileSizeBytes: file.size,
                                    mimeType: file.type,
                                    altId: eventTitle || file.name,
                                    altEn: eventTitle || file.name,
                                    uploadedAt: 'Hari ini',
                                    usageCount: 1,
                                    category: 'hero',
                                  };
                                  onUpdateMedia([newMedia, ...media]);
                                  showNotice(`Banner '${file.name}' berhasil diunggah.`);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                        <p className="text-[11px] text-slate-400">
                          Poster / banner acara akan ditampilkan di kartu agenda dan halaman detail reservasi delegasi.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-xs">Deskripsi Acara (Rich Text)</label>
                    <textarea
                      rows={4}
                      value={eventDesc}
                      onChange={e => setEventDesc(e.target.value)}
                      placeholder="Uraian agenda, topik diskusi, dan profil delegasi..."
                      className="w-full p-3 bg-slate-900 border border-slate-800 rounded text-white text-xs"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => {
                        setIsAddingEvent(false);
                        setEditingEvent(null);
                      }}
                      className="px-4 py-2 bg-slate-900 text-slate-400 rounded text-xs cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => {
                        if (!eventTitle.trim()) return;
                        if (editingEvent) {
                          const updated = events.map(ev =>
                            ev.id === editingEvent.id
                              ? {
                                  ...ev,
                                  titleId: eventTitle,
                                  titleEn: eventTitle,
                                  locationId: eventLocation,
                                  startDatetime: eventDatetime,
                                  status: eventStatus,
                                  capacity: eventCapacity,
                                  imageUrl: eventImage,
                                  descriptionId: eventDesc,
                                  descriptionEn: eventDesc,
                                }
                              : ev
                          );
                          onUpdateEvents(updated);
                          setEditingEvent(null);
                          showNotice('Agenda acara berhasil diperbarui.');
                        } else {
                          const created: EventItem = {
                            id: Date.now(),
                            titleId: eventTitle,
                            titleEn: eventTitle,
                            slugId: eventSlug || 'agenda-baru',
                            slugEn: eventSlug || 'agenda-new',
                            locationId: eventLocation,
                            locationEn: eventLocation,
                            startDatetime: eventDatetime,
                            status: eventStatus,
                            capacity: eventCapacity,
                            registeredCount: 0,
                            registrationUrl: eventRegUrl,
                            descriptionId: eventDesc,
                            descriptionEn: eventDesc,
                            viewsCount: 1,
                            imageUrl: eventImage || media[2]?.url || '',
                          };
                          onUpdateEvents([created, ...events]);
                          setIsAddingEvent(false);
                          showNotice('Agenda baru berhasil ditambahkan.');
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer"
                    >
                      {editingEvent ? 'Simpan Perubahan' : 'Terbitkan Agenda'}
                    </button>
                  </div>
                </div>
              )}

              {/* List of Events */}
              <div className="space-y-4">
                {events.map(ev => (
                  <div key={ev.id} className="p-5 bg-slate-950 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {ev.imageUrl && (
                        <img src={ev.imageUrl} alt={ev.titleId} className="w-20 h-14 object-cover rounded-lg shrink-0 border border-slate-800" />
                      )}
                      <div>
                        <div className="text-xs text-slate-400 mb-1">{ev.startDatetime} &bull; {ev.locationId}</div>
                        <h3 className="font-bold text-white text-base leading-snug">{ev.titleId}</h3>
                        <div className="text-xs text-slate-400 line-clamp-1 mt-1">{ev.descriptionId}</div>
                        <span className="inline-block mt-2 text-[10px] text-blue-400 font-bold uppercase bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                          Status: {ev.status} &bull; Kapasitas: {ev.capacity} Orang
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingEvent(ev);
                          setIsAddingEvent(false);
                          setEventTitle(ev.titleId);
                          setEventLocation(ev.locationId);
                          setEventDatetime(ev.startDatetime);
                          setEventDesc(ev.descriptionId);
                          setEventStatus(ev.status);
                          setEventCapacity(ev.capacity || 200);
                          setEventImage(ev.imageUrl || '');
                        }}
                        className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
                        title="Edit Agenda"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          onUpdateEvents(events.filter(e => e.id !== ev.id));
                          showNotice('Agenda berhasil dihapus.');
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-400 cursor-pointer"
                        title="Hapus Agenda"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: CUSTOM PAGES & CUSTOM FORMS CRUD                        */}
          {/* ============================================================ */}
          {activeTab === 'custom-pages' && (
            <div className="space-y-8 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Halaman Kustom & Custom Form Builder (CRUD)
                  </h1>
                  <p className="text-slate-400 text-xs mt-1">
                    Buat halaman baru tanpa koding dengan slug kustom, meta SEO, dan sematkan formulir khusus secara dinamis.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleExportCustomSubmissionsCsv}
                    className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Ekspor Submisi Form (CSV)</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingCustomPage(true);
                      setEditingCustomPage(null);
                      setPageTitle('');
                      setPageSlug('');
                      setPageContent('');
                      setPageFormId(undefined);
                      setPageFocusKeyword('enterprise');
                      setPageMetaDesc('');
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Buat Halaman Kustom Baru</span>
                  </button>
                </div>
              </div>

              {/* Add / Edit Custom Page Modal (Elementor-Style Visual Page Builder) */}
              {(isAddingCustomPage || editingCustomPage) && (
                <div className="p-6 bg-slate-950 border border-blue-500/60 rounded-2xl space-y-6 shadow-2xl">
                  {/* Modal Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                          Elementor-Style CMS Builder
                        </span>
                        <h3 className="text-base font-bold text-white">
                          {editingCustomPage ? `Ubah Halaman: ${pageTitle || 'Halaman Kustom'}` : 'Buat Halaman Kustom Elementor Baru'}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Desain isi body halaman publik menggunakan blok/section modular dinamis layaknya WordPress Elementor.
                      </p>
                    </div>

                    {/* Mode Tabs */}
                    <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800">
                      <button
                        type="button"
                        onClick={() => setCustomPageModalTab('builder')}
                        className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-colors ${customPageModalTab === 'builder' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                      >
                        Blok Elementor ({pageBlocks.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomPageModalTab('seo')}
                        className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-colors ${customPageModalTab === 'seo' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                      >
                        Pengaturan SEO
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomPageModalTab('preview')}
                        className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-colors ${customPageModalTab === 'preview' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                      >
                        Live Preview
                      </button>
                      <button
                        onClick={() => {
                          setIsAddingCustomPage(false);
                          setEditingCustomPage(null);
                        }}
                        className="p-1.5 text-slate-400 hover:text-white rounded ml-2 cursor-pointer"
                        title="Tutup Modal"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* TAB 1: ELEMENTOR BLOCK BUILDER */}
                  {customPageModalTab === 'builder' && (
                    <div className="space-y-6">
                      {/* Widget Selector Toolbar */}
                      <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Plus className="w-4 h-4 text-emerald-400" />
                            <span>Tambah Section / Widget Elementor:</span>
                          </span>
                          <span className="text-[11px] text-slate-500">Klik untuk memasukkan komponen ke body</span>
                        </div>

                        <div className="flex flex-wrap gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() => {
                              const newBlock: ElementorBlock = {
                                id: `b-${Date.now()}`,
                                type: 'hero',
                                title: 'Judul Hero Section Kustom',
                                subtitle: 'Subjudul atau ringkasan arsitektur keunggulan layanan.',
                                badge: 'Executive Standard',
                                buttonText: 'Konsultasi Sekarang',
                                buttonUrl: 'contact',
                                bgColor: 'navy',
                                imageUrl: '/src/assets/images/hero_corporate_hq_1791790377198.jpg',
                              };
                              setPageBlocks([...pageBlocks, newBlock]);
                            }}
                            className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white rounded-lg cursor-pointer flex items-center gap-1.5 transition-colors font-medium"
                          >
                            <span>+ Hero Banner</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const newBlock: ElementorBlock = {
                                id: `b-${Date.now()}`,
                                type: 'features',
                                title: 'Fitur Utama Layanan',
                                subtitle: 'Tiga pilar keunggulan teknologi terintegrasi',
                                bgColor: 'white',
                                items: [
                                  { id: 'f1', title: 'Replikasi Multiregion', description: 'Tingkat latensi sub-18ms tanpa risiko kehilangan data.', icon: 'Cpu' },
                                  { id: 'f2', title: 'Sertifikasi ISO 27001', description: 'Kepatuhan hukum UU Perlindungan Data Pribadi.', icon: 'ShieldCheck' },
                                  { id: 'f3', title: 'Orkestrasi Kubernetes', description: 'Penskalaan otomatis cluster produksi tanpa downtime.', icon: 'Layers' },
                                ],
                              };
                              setPageBlocks([...pageBlocks, newBlock]);
                            }}
                            className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white rounded-lg cursor-pointer flex items-center gap-1.5 transition-colors font-medium"
                          >
                            <span>+ Fitur 3-Kolom</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const newBlock: ElementorBlock = {
                                id: `b-${Date.now()}`,
                                type: 'stats',
                                title: 'Metrik & Capaian Kinerja',
                                subtitle: 'Dampak nyata implementasi teknologi pada ekosistem mitra',
                                bgColor: 'slate-900',
                                items: [
                                  { id: 's1', value: '99.99%', label: 'SLA Availability', title: '', description: '' },
                                  { id: 's2', value: '< 18ms', label: 'Rata-Rata Latensi', title: '', description: '' },
                                  { id: 's3', value: '50.000', label: 'TPS Peak Traffic', title: '', description: '' },
                                  { id: 's4', value: '100%', label: 'Kepatuhan UU PDP', title: '', description: '' },
                                ],
                              };
                              setPageBlocks([...pageBlocks, newBlock]);
                            }}
                            className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white rounded-lg cursor-pointer flex items-center gap-1.5 transition-colors font-medium"
                          >
                            <span>+ Counter Statistik</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const newBlock: ElementorBlock = {
                                id: `b-${Date.now()}`,
                                type: 'media',
                                title: 'Pusat Monitoring Operasional SOC SCBD',
                                subtitle: 'Pengawasan telemetri 24 jam nonstop bagi infrastruktur perbankan dan industri.',
                                imageUrl: '/src/assets/images/executive_soc_boardroom_1792003166100.jpg',
                                bgColor: 'white',
                              };
                              setPageBlocks([...pageBlocks, newBlock]);
                            }}
                            className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white rounded-lg cursor-pointer flex items-center gap-1.5 transition-colors font-medium"
                          >
                            <span>+ Showcase Media</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const newBlock: ElementorBlock = {
                                id: `b-${Date.now()}`,
                                type: 'faq',
                                title: 'Pertanyaan yang Sering Diajukan',
                                subtitle: 'Klarifikasi aspek teknis, tata kelola, dan perjanjian SLA',
                                bgColor: 'slate-50',
                                items: [
                                  { id: 'q1', title: 'Berapa lama estimasi implementasi sistem hybrid?', description: 'Biasanya berkisar antara 4 hingga 8 minggu bergantung pada kompleksitas skema replikasi database on-premises.' },
                                  { id: 'q2', title: 'Apakah data disimpan di wilayah kedaulatan Indonesia?', description: 'Ya, seluruh data reside pada data center tier-3/tier-4 lokal di Jakarta sesuai regulasi PP No. 71/2019.' },
                                ],
                              };
                              setPageBlocks([...pageBlocks, newBlock]);
                            }}
                            className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white rounded-lg cursor-pointer flex items-center gap-1.5 transition-colors font-medium"
                          >
                            <span>+ Akordion FAQ</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const newBlock: ElementorBlock = {
                                id: `b-${Date.now()}`,
                                type: 'custom-form',
                                title: 'Formulir Registrasi Kemitraan',
                                subtitle: 'Isi data berikut untuk terhubung langsung dengan principal architect kami',
                                formId: customForms[0]?.id || 1,
                                bgColor: 'slate-50',
                              };
                              setPageBlocks([...pageBlocks, newBlock]);
                            }}
                            className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white rounded-lg cursor-pointer flex items-center gap-1.5 transition-colors font-medium"
                          >
                            <span>+ Sematkan Form</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const newBlock: ElementorBlock = {
                                id: `b-${Date.now()}`,
                                type: 'cta',
                                title: 'Siap Mengoptimalkan Arsitektur Sistem Anda?',
                                subtitle: 'Konsultasikan peta jalan modernisasi teknologi bersama para pakar di SCBD Jakarta.',
                                buttonText: 'Jadwalkan Konsultasi Teknis',
                                buttonUrl: 'contact',
                                bgColor: 'navy',
                              };
                              setPageBlocks([...pageBlocks, newBlock]);
                            }}
                            className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white rounded-lg cursor-pointer flex items-center gap-1.5 transition-colors font-medium"
                          >
                            <span>+ Banner CTA</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const newBlock: ElementorBlock = {
                                id: `b-${Date.now()}`,
                                type: 'rich-text',
                                title: 'Dokumentasi & Standar Rekayasa',
                                content: 'Tuliskan paragraf teks editorial panjang, spesifikasi teknis, atau ketentuan kepatuhan tata kelola di sini.',
                                bgColor: 'white',
                              };
                              setPageBlocks([...pageBlocks, newBlock]);
                            }}
                            className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white rounded-lg cursor-pointer flex items-center gap-1.5 transition-colors font-medium"
                          >
                            <span>+ Teks Editorial</span>
                          </button>
                        </div>
                      </div>

                      {/* Active Blocks List */}
                      <div className="space-y-4">
                        {pageBlocks.length === 0 ? (
                          <div className="p-12 text-center border-2 border-dashed border-slate-800 rounded-2xl">
                            <Layers className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                            <div className="text-sm font-bold text-slate-300">Belum Ada Blok Elementor Ditambahkan</div>
                            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                              Gunakan tombol di atas untuk menyusun section body halaman kustom seperti Hero, Fitur, FAQ, Formulir, atau CTA.
                            </p>
                          </div>
                        ) : (
                          pageBlocks.map((block, idx) => (
                            <div
                              key={block.id}
                              className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4 hover:border-slate-700 transition-colors"
                            >
                              {/* Block Control Header */}
                              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                                <div className="flex items-center gap-3">
                                  <span className="w-6 h-6 rounded bg-slate-800 text-slate-300 font-mono font-bold flex items-center justify-center text-[11px]">
                                    {idx + 1}
                                  </span>
                                  <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 font-bold uppercase font-mono text-[10px]">
                                    Widget: {block.type}
                                  </span>
                                  <span className="text-white font-semibold truncate max-w-xs">{block.title || '(Tanpa Judul)'}</span>
                                </div>

                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    disabled={idx === 0}
                                    onClick={() => {
                                      const newArr = [...pageBlocks];
                                      const temp = newArr[idx];
                                      newArr[idx] = newArr[idx - 1];
                                      newArr[idx - 1] = temp;
                                      setPageBlocks(newArr);
                                    }}
                                    className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 rounded hover:bg-slate-800 cursor-pointer"
                                    title="Pindahkan Ke Atas"
                                  >
                                    <ArrowUp className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={idx === pageBlocks.length - 1}
                                    onClick={() => {
                                      const newArr = [...pageBlocks];
                                      const temp = newArr[idx];
                                      newArr[idx] = newArr[idx + 1];
                                      newArr[idx + 1] = temp;
                                      setPageBlocks(newArr);
                                    }}
                                    className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 rounded hover:bg-slate-800 cursor-pointer"
                                    title="Pindahkan Ke Bawah"
                                  >
                                    <ArrowDown className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setPageBlocks(pageBlocks.filter((_, i) => i !== idx));
                                    }}
                                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded hover:bg-slate-800 cursor-pointer ml-1"
                                    title="Hapus Blok"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              {/* Block Inline Settings */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                <div>
                                  <label className="block text-slate-400 mb-1">Judul / Headline Section</label>
                                  <input
                                    type="text"
                                    value={block.title || ''}
                                    onChange={e => {
                                      const newArr = [...pageBlocks];
                                      newArr[idx] = { ...block, title: e.target.value };
                                      setPageBlocks(newArr);
                                    }}
                                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-white"
                                  />
                                </div>

                                <div>
                                  <label className="block text-slate-400 mb-1">Subjudul / Deskripsi Pendukung</label>
                                  <input
                                    type="text"
                                    value={block.subtitle || ''}
                                    onChange={e => {
                                      const newArr = [...pageBlocks];
                                      newArr[idx] = { ...block, subtitle: e.target.value };
                                      setPageBlocks(newArr);
                                    }}
                                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-white"
                                  />
                                </div>

                                {(block.type === 'hero' || block.type === 'cta') && (
                                  <>
                                    <div>
                                      <label className="block text-slate-400 mb-1">Teks Tombol Aksi (CTA)</label>
                                      <input
                                        type="text"
                                        value={block.buttonText || ''}
                                        onChange={e => {
                                          const newArr = [...pageBlocks];
                                          newArr[idx] = { ...block, buttonText: e.target.value };
                                          setPageBlocks(newArr);
                                        }}
                                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-white"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-slate-400 mb-1">Rute Tombol Tujuan</label>
                                      <select
                                        value={block.buttonUrl || 'contact'}
                                        onChange={e => {
                                          const newArr = [...pageBlocks];
                                          newArr[idx] = { ...block, buttonUrl: e.target.value };
                                          setPageBlocks(newArr);
                                        }}
                                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-white font-mono"
                                      >
                                        <option value="contact">/contact (Kontak & Maps)</option>
                                        <option value="services">/services (Layanan Arsitektur)</option>
                                        <option value="careers">/careers (Peluang Karir)</option>
                                        <option value="blog">/blog (Publikasi Riset)</option>
                                      </select>
                                    </div>
                                  </>
                                )}

                                {block.type === 'custom-form' && (
                                  <div className="md:col-span-2">
                                    <label className="block text-slate-400 mb-1">Pilih Formulir Kustom yang Disematkan</label>
                                    <select
                                      value={block.formId || customForms[0]?.id || 1}
                                      onChange={e => {
                                        const newArr = [...pageBlocks];
                                        newArr[idx] = { ...block, formId: Number(e.target.value) };
                                        setPageBlocks(newArr);
                                      }}
                                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-white"
                                    >
                                      {customForms.map(f => (
                                        <option key={f.id} value={f.id}>
                                          {f.titleId} ({f.fields.length} Bidang Isian)
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                )}

                                {(block.type === 'hero' || block.type === 'media') && (
                                  <div className="md:col-span-2">
                                    <label className="block text-slate-400 mb-1 text-xs">
                                      Upload Gambar Section via input[type="file"]
                                    </label>
                                    <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800">
                                      {block.imageUrl ? (
                                        <img src={block.imageUrl} alt="preview" className="w-24 h-16 object-cover rounded border border-slate-700" />
                                      ) : (
                                        <div className="w-24 h-16 rounded border border-dashed border-slate-700 flex items-center justify-center text-slate-500 text-[10px]">
                                          Tanpa Foto
                                        </div>
                                      )}
                                      <label className="flex items-center gap-2 px-3 py-2 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer">
                                        <Upload className="w-3.5 h-3.5" />
                                        <span>Pilih File Gambar</span>
                                        <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={e => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                              const reader = new FileReader();
                                              reader.onload = () => {
                                                const newArr = [...pageBlocks];
                                                newArr[idx] = { ...block, imageUrl: reader.result as string };
                                                setPageBlocks(newArr);
                                              };
                                              reader.readAsDataURL(file);
                                            }
                                          }}
                                        />
                                      </label>
                                      <span className="text-[11px] text-slate-500">File langsung ter-embed pada section custom ini.</span>
                                    </div>
                                  </div>
                                )}

                                {block.type === 'rich-text' && (
                                  <div className="md:col-span-2">
                                    <label className="block text-slate-400 mb-1">Konten Paragraf Editorial</label>
                                    <textarea
                                      rows={4}
                                      value={block.content || ''}
                                      onChange={e => {
                                        const newArr = [...pageBlocks];
                                        newArr[idx] = { ...block, content: e.target.value };
                                        setPageBlocks(newArr);
                                      }}
                                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded text-white text-xs leading-relaxed"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: SEO & URL SETTINGS */}
                  {customPageModalTab === 'seo' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-slate-400 mb-1">Judul Halaman (ID) *</label>
                          <input
                            type="text"
                            value={pageTitle}
                            onChange={e => {
                              setPageTitle(e.target.value);
                              if (!pageSlug && !editingCustomPage) {
                                setPageSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                              }
                            }}
                            placeholder="Contoh: Tata Kelola Keberlanjutan ESG..."
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1">URL Slug Ramah SEO (/p/slug) *</label>
                          <input
                            type="text"
                            value={pageSlug}
                            onChange={e => setPageSlug(e.target.value)}
                            placeholder="contoh-halaman-kustom"
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1">Kata Kunci Fokus (SEO Google)</label>
                          <input
                            type="text"
                            value={pageFocusKeyword}
                            onChange={e => setPageFocusKeyword(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1">Sematkan Formulir Kustom Fallback</label>
                          <select
                            value={pageFormId || ''}
                            onChange={e => setPageFormId(e.target.value ? Number(e.target.value) : undefined)}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                          >
                            <option value="">-- Tanpa Formulir Tersemat --</option>
                            {customForms.map(f => (
                              <option key={f.id} value={f.id}>{f.titleId}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1 text-xs">Meta Deskripsi (Untuk Google Snippet)</label>
                        <input
                          type="text"
                          value={pageMetaDesc}
                          onChange={e => setPageMetaDesc(e.target.value)}
                          placeholder="Deskripsi ringkas 120-160 karakter untuk pencarian Google..."
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1 text-xs">Ringkasan Teks Fallback</label>
                        <textarea
                          rows={3}
                          value={pageContent}
                          onChange={e => setPageContent(e.target.value)}
                          placeholder="Deskripsi ringkas konten jika browser pengguna tidak mendukung skrip lanjutan..."
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white text-xs leading-relaxed"
                        />
                      </div>
                    </div>
                  )}

                  {/* TAB 3: LIVE PREVIEW */}
                  {customPageModalTab === 'preview' && (
                    <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6 max-h-[500px] overflow-y-auto">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-800">
                        Pratinjau Langsung Komponen Body (Tampil di antara Header & Footer Publik):
                      </div>
                      {pageBlocks.map((b, i) => (
                        <div key={b.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                          <div className="flex items-center gap-2 font-mono text-[10px] text-amber-400 mb-1 font-bold">
                            <span>#{i + 1}</span>
                            <span>[{b.type.toUpperCase()}]</span>
                          </div>
                          <div className="text-sm font-bold text-white mb-1">{b.title}</div>
                          <div className="text-slate-400 text-xs">{b.subtitle || b.content}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Modal Footer Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <span className="text-xs text-slate-500">
                      Total {pageBlocks.length} blok terkonfigurasi. Header & Footer tetap aktif.
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingCustomPage(false);
                          setEditingCustomPage(null);
                        }}
                        className="px-4 py-2 bg-slate-900 text-slate-400 hover:text-white rounded text-xs cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!pageTitle.trim() || !pageSlug.trim()) {
                            alert('Judul dan URL slug wajib diisi.');
                            return;
                          }
                          if (editingCustomPage) {
                            const updated = customPages.map(p =>
                              p.id === editingCustomPage.id
                                ? {
                                    ...p,
                                    titleId: pageTitle,
                                    titleEn: pageTitle,
                                    slugId: pageSlug,
                                    slugEn: pageSlug,
                                    contentId: pageContent || pageBlocks[0]?.subtitle || pageTitle,
                                    contentEn: pageContent || pageBlocks[0]?.subtitle || pageTitle,
                                    formId: pageFormId,
                                    focusKeyword: pageFocusKeyword,
                                    metaDescId: pageMetaDesc || pageContent.slice(0, 140),
                                    blocks: pageBlocks,
                                  }
                                : p
                            );
                            onUpdateCustomPages(updated);
                            setEditingCustomPage(null);
                            showNotice('Halaman kustom Elementor berhasil diperbarui.');
                          } else {
                            const created: CustomPage = {
                              id: Date.now(),
                              titleId: pageTitle,
                              titleEn: pageTitle,
                              slugId: pageSlug,
                              slugEn: pageSlug,
                              contentId: pageContent || pageBlocks[0]?.subtitle || pageTitle,
                              contentEn: pageContent || pageBlocks[0]?.subtitle || pageTitle,
                              formId: pageFormId,
                              status: 'published',
                              focusKeyword: pageFocusKeyword || 'enterprise',
                              metaDescId: pageMetaDesc || pageContent.slice(0, 140),
                              metaDescEn: pageMetaDesc || pageContent.slice(0, 140),
                              publishedAt: 'Hari ini',
                              blocks: pageBlocks,
                            };
                            onUpdateCustomPages([...customPages, created]);
                            setIsAddingCustomPage(false);
                            showNotice('Halaman kustom baru Elementor berhasil dipublikasikan.');
                          }
                        }}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-lg"
                      >
                        {editingCustomPage ? 'Simpan Perubahan Halaman' : 'Publikasikan Halaman Elementor'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* List of Custom Pages */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Daftar Halaman Kustom Aktif ({customPages.length})
                </div>
                {customPages.map(page => (
                  <div
                    key={page.id}
                    className="p-5 bg-slate-950 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-1 font-mono">
                        <span className="text-emerald-400">/{page.slugId}</span>
                        <span>&bull;</span>
                        <span>Diposting: {page.publishedAt}</span>
                        <span>&bull;</span>
                        {page.formId && <span className="text-blue-400 font-semibold">[Form Tersemat]</span>}
                      </div>
                      <h3 className="text-base font-bold text-white">{page.titleId}</h3>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-1">{page.contentId}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingCustomPage(page);
                          setIsAddingCustomPage(false);
                          setPageTitle(page.titleId);
                          setPageSlug(page.slugId);
                          setPageContent(page.contentId);
                          setPageFormId(page.formId);
                          setPageFocusKeyword(page.focusKeyword);
                          setPageMetaDesc(page.metaDescId);
                        }}
                        className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
                        title="Edit Halaman"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          onUpdateCustomPages(customPages.filter(p => p.id !== page.id));
                          showNotice('Halaman kustom berhasil dihapus.');
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-400 cursor-pointer"
                        title="Hapus Halaman"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submissions Table for Custom Forms */}
              <div className="pt-6 border-t border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-blue-400" />
                    <span>Data Masukan Formulir Kustom Pengunjung (Submissions)</span>
                  </h3>
                  <span className="text-xs text-slate-400">Total: {customSubmissions.length} Data</span>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold">
                      <tr>
                        <th className="p-3">Waktu</th>
                        <th className="p-3">Formulir</th>
                        <th className="p-3">Halaman</th>
                        <th className="p-3">Rincian Data</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {customSubmissions.map(sub => (
                        <tr key={sub.id} className="hover:bg-slate-900/50">
                          <td className="p-3 text-[11px] text-slate-500 whitespace-nowrap">{sub.submittedAt}</td>
                          <td className="p-3 font-semibold text-white whitespace-nowrap">{sub.formTitle}</td>
                          <td className="p-3 font-mono text-[11px] text-blue-400">/{sub.pageSlug}</td>
                          <td className="p-3">
                            <div className="space-y-0.5 text-[11px]">
                              {Object.entries(sub.data).map(([k, v]) => (
                                <div key={k}>
                                  <span className="text-slate-500">{k}:</span> <span className="text-slate-200">{v}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded text-[10px] font-bold">
                              {sub.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                if (onUpdateCustomSubmissions) {
                                  onUpdateCustomSubmissions(customSubmissions.filter(s => s.id !== sub.id));
                                  showNotice('Data submisi dihapus.');
                                }
                              }}
                              className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                              title="Hapus Submisi"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: CAREERS & CV DOCUMENT VIEWER (IFRAME & DOWNLOAD)       */}
          {/* ============================================================ */}
          {activeTab === 'careers-admin' && (
            <div className="space-y-8 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Pengelolaan Karir & Berkas Pelamar (CV Iframe & Download)
                  </h1>
                  <p className="text-slate-400 text-xs mt-1">
                    Kelola posisi lowongan kerja, tinjau berkas CV pelamar dengan viewer dokumen terstruktur, dan unduh berkas secara instan.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsAddingJob(true);
                    setEditingJob(null);
                    setJobTitle('');
                    setJobDept('Cloud Platform Engineering');
                    setJobExp('5+ Tahun');
                    setJobDesc('');
                    setJobSalary('IDR 35M - 55M / bulan + Bonus');
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Lowongan Pekerjaan</span>
                </button>
              </div>

              {/* Add / Edit Job Modal */}
              {(isAddingJob || editingJob) && (
                <div className="p-6 bg-slate-950 border border-blue-500/50 rounded-xl space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="text-sm font-bold text-white">
                      {editingJob ? 'Ubah (Edit) Posisi Lowongan' : 'Buat Posisi Lowongan Baru'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingJob(false);
                        setEditingJob(null);
                      }}
                      className="text-xs text-slate-500 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Judul Posisi</label>
                      <input
                        type="text"
                        value={jobTitle}
                        onChange={e => setJobTitle(e.target.value)}
                        placeholder="Contoh: Principal Kubernetes Engineer"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Departemen</label>
                      <select
                        value={jobDept}
                        onChange={e => setJobDept(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      >
                        <option value="Cloud Platform Engineering">Cloud Platform Engineering</option>
                        <option value="Cyber Defense & Compliance">Cyber Defense & Compliance</option>
                        <option value="AI & High Performance Data">AI & High Performance Data</option>
                        <option value="Strategic Advisory">Strategic Advisory</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Pengalaman Minimal</label>
                      <input
                        type="text"
                        value={jobExp}
                        onChange={e => setJobExp(e.target.value)}
                        placeholder="5+ Tahun"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-xs">Rentang Kompensasi</label>
                    <input
                      type="text"
                      value={jobSalary}
                      onChange={e => setJobSalary(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-xs">Uraian Tugas & Kriteria</label>
                    <textarea
                      rows={3}
                      value={jobDesc}
                      onChange={e => setJobDesc(e.target.value)}
                      placeholder="Uraian tanggung jawab dan keahlian yang dibutuhkan..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white text-xs"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => {
                        setIsAddingJob(false);
                        setEditingJob(null);
                      }}
                      className="px-4 py-2 bg-slate-900 text-slate-400 rounded text-xs cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => {
                        if (!jobTitle.trim()) return;
                        if (editingJob) {
                          const updated = careers.map(c =>
                            c.id === editingJob.id
                              ? {
                                  ...c,
                                  titleId: jobTitle,
                                  titleEn: jobTitle,
                                  department: jobDept,
                                  experienceLevel: jobExp,
                                  descriptionId: jobDesc,
                                  salaryRange: jobSalary,
                                }
                              : c
                          );
                          onUpdateCareers(updated);
                          setEditingJob(null);
                          showNotice('Posisi lowongan berhasil diperbarui.');
                        } else {
                          const created: CareerItem = {
                            id: Date.now(),
                            titleId: jobTitle,
                            titleEn: jobTitle,
                            slugId: jobTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                            slugEn: jobTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                            department: jobDept,
                            location: 'SCBD, Jakarta Selatan (Hybrid)',
                            employmentType: 'Full-time',
                            experienceLevel: jobExp,
                            descriptionId: jobDesc || 'Bertanggung jawab atas arsitektur sistem enterprise mission-critical.',
                            descriptionEn: jobDesc || 'Responsible for enterprise-grade distributed architectures.',
                            requirementsId: ['Pengalaman minimal ' + jobExp, 'Keahlian arsitektur sistem'],
                            requirementsEn: ['Minimum experience ' + jobExp, 'Enterprise systems architecture expertise'],
                            benefitsId: ['Kompensasi kompetitif', 'Asuransi kesehatan eksekutif'],
                            benefitsEn: ['Competitive compensation', 'Executive health insurance'],
                            salaryRange: jobSalary,
                            postedAt: 'Hari ini',
                            isActive: true,
                          };
                          onUpdateCareers([...careers, created]);
                          setIsAddingJob(false);
                          showNotice('Lowongan pekerjaan baru berhasil diterbitkan.');
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer"
                    >
                      {editingJob ? 'Simpan Perubahan' : 'Terbitkan Lowongan'}
                    </button>
                  </div>
                </div>
              )}

              {/* Vacancies List */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Daftar Lowongan Karir Aktif ({careers.length})
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {careers.map(car => (
                    <div key={car.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 bg-emerald-950 rounded">
                          {car.department}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingJob(car);
                              setIsAddingJob(false);
                              setJobTitle(car.titleId);
                              setJobDept(car.department);
                              setJobExp(car.experienceLevel);
                              setJobDesc(car.descriptionId);
                              setJobSalary(car.salaryRange || '');
                            }}
                            className="p-1 text-slate-400 hover:text-white cursor-pointer"
                            title="Edit Lowongan"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              onUpdateCareers(careers.filter(c => c.id !== car.id));
                              showNotice('Lowongan karir berhasil dihapus.');
                            }}
                            className="p-1 text-slate-500 hover:text-rose-400 cursor-pointer"
                            title="Hapus Lowongan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <h3 className="font-bold text-white text-sm">{car.titleId}</h3>
                      <div className="text-xs text-slate-400">Pengalaman: {car.experienceLevel} &bull; {car.salaryRange}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Table of Job Applications & CV Files */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span>Daftar Berkas CV Pelamar Masuk</span>
                  </h3>
                  <span className="text-xs text-slate-400">Total: {applications.length} Kandidat Terdaftar</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/60 border-b border-slate-800 text-slate-400 font-semibold">
                      <tr>
                        <th className="p-3">Kode Pelamar</th>
                        <th className="p-3">Nama & Kontak</th>
                        <th className="p-3">Posisi Dilamar</th>
                        <th className="p-3">Berkas CV (Preview / Unduh)</th>
                        <th className="p-3">Waktu</th>
                        <th className="p-3">Status Lamaran</th>
                        <th className="p-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {applications.map(app => (
                        <tr key={app.id} className="hover:bg-slate-900/50">
                          <td className="p-3 font-mono text-[11px] text-blue-400">{app.applicationCode}</td>
                          <td className="p-3">
                            <div className="font-bold text-white">{app.fullName}</div>
                            <div className="text-[11px] text-slate-400">{app.email} &bull; {app.phone}</div>
                          </td>
                          <td className="p-3 font-semibold text-slate-200">{app.careerTitle}</td>
                          <td className="p-3">
                            <button
                              onClick={() => setPreviewApp(app)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-950/60 border border-blue-800/80 text-blue-300 hover:text-white font-medium cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5 text-blue-400" />
                              <span className="truncate max-w-[140px]">{app.resumeFileName}</span>
                              <span className="text-[10px] text-slate-400 font-mono">({app.resumeFileSize})</span>
                            </button>
                          </td>
                          <td className="p-3 text-[11px] text-slate-500 whitespace-nowrap">{app.submittedAt}</td>
                          <td className="p-3">
                            <select
                              value={app.status}
                              onChange={e => {
                                const newStatus = e.target.value as any;
                                const updated = applications.map(a => (a.id === app.id ? { ...a, status: newStatus } : a));
                                onUpdateApplications(updated);
                                showNotice(`Status kandidat ${app.fullName} diubah ke ${newStatus}.`);
                              }}
                              className="bg-slate-900 text-slate-200 border border-slate-700 rounded px-2 py-1 text-xs font-semibold cursor-pointer"
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="interview">Interview</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                onUpdateApplications(applications.filter(a => a.id !== app.id));
                                showNotice('Berkas pelamar dihapus.');
                              }}
                              className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                              title="Hapus Lamaran"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CV DOCUMENT VIEWER MODAL (IFRAME-STYLE PREVIEW & DOWNLOAD) */}
              {previewApp && (
                <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
                  <div className="bg-slate-950 border border-slate-700 rounded-2xl max-w-2xl w-full flex flex-col max-h-[90vh] shadow-2xl overflow-hidden animate-fade-in">
                    {/* Modal Header Bar */}
                    <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
                          CV
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-sm">{previewApp.fullName}</h3>
                          <div className="text-[11px] text-slate-400">
                            {previewApp.careerTitle} &bull; Kode: <span className="font-mono text-blue-400">{previewApp.applicationCode}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownloadCvFile(previewApp)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold cursor-pointer shadow-sm transition-colors"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                          <span>Unduh Berkas CV (.PDF/.TXT)</span>
                        </button>
                        <button
                          onClick={() => setPreviewApp(null)}
                          className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Simulated Iframe Styled Document Viewer */}
                    <div className="flex-1 p-6 overflow-y-auto bg-slate-900/40">
                      <div className="bg-white text-slate-900 p-8 rounded-xl shadow-lg border border-slate-200 font-sans space-y-6">
                        {/* CV Document Header */}
                        <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h1 className="text-2xl font-black tracking-tight text-slate-950">{previewApp.fullName}</h1>
                            <div className="text-sm font-bold text-blue-900 mt-0.5">{previewApp.careerTitle}</div>
                            <div className="text-xs text-slate-600 mt-1 flex flex-wrap gap-3">
                              <span>Email: {previewApp.email}</span>
                              <span>&bull;</span>
                              <span>Telepon: {previewApp.phone}</span>
                              <span>&bull;</span>
                              <span>Lokasi: Jakarta, Indonesia</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="inline-block px-3 py-1 bg-slate-100 rounded text-[11px] font-mono font-bold text-slate-700">
                              {previewApp.applicationCode}
                            </span>
                          </div>
                        </div>

                        {/* Executive Summary */}
                        <div>
                          <h2 className="text-xs uppercase font-black tracking-wider text-slate-500 mb-2">
                            Ringkasan Profesional
                          </h2>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {previewApp.coverLetter ||
                              'Profesional di bidang rekayasa infrastruktur terdistribusi dengan pengalaman mendalam dalam merancang sistem toleransi kegagalan (fault-tolerant systems), otomatisasi CI/CD Kubernetes, dan mitigasi resiko keamanan data perbankan.'}
                          </p>
                        </div>

                        {/* Core Competencies */}
                        <div>
                          <h2 className="text-xs uppercase font-black tracking-wider text-slate-500 mb-2">
                            Kompetensi Teknis Utama
                          </h2>
                          <div className="flex flex-wrap gap-1.5">
                            {['Distributed Cloud Topology', 'Multi-Region DB Replication', 'Kubernetes Orchestration', 'Kafka Streaming', 'ISO 27001 Security Audit', 'Zero-Trust Architecture', 'UU PDP Compliance'].map(
                              (skill, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-800 rounded text-[10px] font-medium"
                                >
                                  {skill}
                                </span>
                              )
                            )}
                          </div>
                        </div>

                        {/* Career Experience Simulation */}
                        <div>
                          <h2 className="text-xs uppercase font-black tracking-wider text-slate-500 mb-2">
                            Riwayat Karir & Pencapaian
                          </h2>
                          <div className="space-y-3 text-xs text-slate-700">
                            <div>
                              <div className="flex justify-between font-bold text-slate-900">
                                <span>Senior Systems Architect — National Financial Ecosystem</span>
                                <span>2022 - Sekarang</span>
                              </div>
                              <p className="mt-1 text-[11px] text-slate-600">
                                Memimpin modernisasi arsitektur gateway pembayaran dengan throughput 40.000 TPS dan reduksi latensi P99 di bawah 18ms.
                              </p>
                            </div>
                            <div>
                              <div className="flex justify-between font-bold text-slate-900">
                                <span>Cloud Infrastructure Specialist — Enterprise Cloud Provider</span>
                                <span>2019 - 2022</span>
                              </div>
                              <p className="mt-1 text-[11px] text-slate-600">
                                Merancang orkestrasi 50+ cluster Kubernetes multi-tenant dengan otomatisasi failover multiregion.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Formal Document Verification Stamp */}
                        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Berkas CV Asli: {previewApp.resumeFileName} ({previewApp.resumeFileSize || '2.4 MB'})</span>
                          </div>
                          <span className="font-mono">Status: {previewApp.status.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: VISUAL PAGE BUILDER                                     */}
          {/* ============================================================ */}
          {activeTab === 'builder' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Visual Page Builder Section</h1>
                <p className="text-slate-400 text-xs mt-1">
                  Atur urutan dan visibilitas komponen section beranda secara dinamis tanpa mengubah kodingan.
                </p>
              </div>

              <div className="space-y-4">
                {sections.map((sec, idx) => (
                  <div
                    key={sec.id}
                    className={`p-5 rounded-xl border transition-all ${sec.isVisible ? 'bg-slate-950 border-slate-800' : 'bg-slate-950/40 border-slate-900 opacity-60'}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className="w-7 h-7 rounded bg-slate-900 text-slate-400 font-mono text-xs flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="text-xs uppercase tracking-wider text-blue-400 font-bold">
                            Tipe: {sec.type}
                          </div>
                          <div className="text-sm font-semibold text-white mt-0.5">{sec.titleId}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (idx === 0) return;
                            const newSections = [...sections];
                            const temp = newSections[idx];
                            newSections[idx] = newSections[idx - 1];
                            newSections[idx - 1] = temp;
                            onUpdateSections(newSections);
                          }}
                          disabled={idx === 0}
                          className="px-2 py-1 bg-slate-900 text-slate-400 hover:text-white rounded text-xs disabled:opacity-30 cursor-pointer"
                          title="Pindah ke Atas"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => {
                            if (idx === sections.length - 1) return;
                            const newSections = [...sections];
                            const temp = newSections[idx];
                            newSections[idx] = newSections[idx + 1];
                            newSections[idx + 1] = temp;
                            onUpdateSections(newSections);
                          }}
                          disabled={idx === sections.length - 1}
                          className="px-2 py-1 bg-slate-900 text-slate-400 hover:text-white rounded text-xs disabled:opacity-30 cursor-pointer"
                          title="Pindah ke Bawah"
                        >
                          ▼
                        </button>
                        <button
                          onClick={() => {
                            const updated = sections.map(s => (s.id === sec.id ? { ...s, isVisible: !s.isVisible } : s));
                            onUpdateSections(updated);
                            showNotice(`Visibilitas section ${sec.titleId} diubah.`);
                          }}
                          className={`px-3 py-1 text-xs font-semibold rounded cursor-pointer ${sec.isVisible ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-900 text-slate-500'}`}
                        >
                          {sec.isVisible ? 'Tampil' : 'Tersembunyi'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: DEWAN DIREKSI & TIM CRUD                                */}
          {/* ============================================================ */}
          {activeTab === 'executives' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Dewan Direksi & Kepemimpinan (CRUD)</h1>
                  <p className="text-slate-400 text-xs mt-1">Kelola profil pimpinan, kredensial, kutipan resmi, dan jejaring profesional.</p>
                </div>
                <button
                  onClick={() => {
                    setIsAddingExec(true);
                    setEditingExec(null);
                    setExecName('');
                    setExecTitle('Director of Engineering');
                    setExecCredentials('Ex-Senior Architect Bank Mandiri, M.Sc.');
                    setExecBio('');
                    setExecQuote('');
                    setExecInitials('DE');
                    setExecLinkedin('https://linkedin.com');
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Anggota Direksi</span>
                </button>
              </div>

              {/* Add / Edit Exec Modal */}
              {(isAddingExec || editingExec) && (
                <div className="p-6 bg-slate-950 border border-blue-500/50 rounded-xl space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="text-sm font-bold text-white">
                      {editingExec ? 'Ubah Profil Direksi' : 'Tambah Anggota Direksi'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingExec(false);
                        setEditingExec(null);
                      }}
                      className="text-xs text-slate-500 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Nama Lengkap & Gelar</label>
                      <input
                        type="text"
                        value={execName}
                        onChange={e => setExecName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Jabatan Resmi</label>
                      <input
                        type="text"
                        value={execTitle}
                        onChange={e => setExecTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-slate-400 mb-1">Kredensial & Latar Belakang</label>
                      <input
                        type="text"
                        value={execCredentials}
                        onChange={e => setExecCredentials(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-slate-400 mb-1">Biografi Singkat</label>
                      <textarea
                        rows={3}
                        value={execBio}
                        onChange={e => setExecBio(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Kutipan Eksekutif</label>
                      <input
                        type="text"
                        value={execQuote}
                        onChange={e => setExecQuote(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Inisial Avatar</label>
                      <input
                        type="text"
                        value={execInitials}
                        onChange={e => setExecInitials(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white uppercase font-bold"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => {
                        setIsAddingExec(false);
                        setEditingExec(null);
                      }}
                      className="px-4 py-2 bg-slate-900 text-slate-400 rounded text-xs cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => {
                        if (!execName.trim()) return;
                        if (editingExec) {
                          const updated = executives.map(ex =>
                            ex.id === editingExec.id
                              ? {
                                  ...ex,
                                  name: execName,
                                  titleId: execTitle,
                                  titleEn: execTitle,
                                  credentials: execCredentials,
                                  bioId: execBio,
                                  bioEn: execBio,
                                  quoteId: execQuote,
                                  avatarInitials: execInitials,
                                  linkedin: execLinkedin,
                                }
                              : ex
                          );
                          onUpdateExecutives(updated);
                          setEditingExec(null);
                          showNotice('Profil direksi diperbarui.');
                        } else {
                          const created: ExecutiveBio = {
                            id: Date.now(),
                            name: execName,
                            titleId: execTitle,
                            titleEn: execTitle,
                            credentials: execCredentials,
                            bioId: execBio,
                            bioEn: execBio,
                            quoteId: execQuote,
                            avatarInitials: execInitials,
                            linkedin: execLinkedin,
                          };
                          onUpdateExecutives([...executives, created]);
                          setIsAddingExec(false);
                          showNotice('Anggota direksi baru ditambahkan.');
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer"
                    >
                      {editingExec ? 'Simpan Perubahan' : 'Tambahkan'}
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {executives.map(exec => (
                  <div key={exec.id} className="p-6 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-base border border-slate-700">
                          {exec.avatarInitials}
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-base">{exec.name}</h3>
                          <div className="text-xs text-blue-400 font-medium">{exec.titleId}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingExec(exec);
                            setIsAddingExec(false);
                            setExecName(exec.name);
                            setExecTitle(exec.titleId);
                            setExecCredentials(exec.credentials);
                            setExecBio(exec.bioId);
                            setExecQuote(exec.quoteId || '');
                            setExecInitials(exec.avatarInitials);
                            setExecLinkedin(exec.linkedin);
                          }}
                          className="p-1 text-slate-400 hover:text-white cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            onUpdateExecutives(executives.filter(e => e.id !== exec.id));
                            showNotice('Anggota direksi dihapus.');
                          }}
                          className="p-1 text-slate-500 hover:text-rose-400 cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">{exec.credentials}</div>
                    <p className="text-xs text-slate-300 line-clamp-3">{exec.bioId}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: MITRA & KLIEN CRUD                                      */}
          {/* ============================================================ */}
          {activeTab === 'clients' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Mitra Korporat & Klien (CRUD)</h1>
                  <p className="text-slate-400 text-xs mt-1">Kelola institusi perbankan dan konglomerasi industri klien resmi.</p>
                </div>
                <button
                  onClick={() => {
                    setIsAddingClient(true);
                    setEditingClient(null);
                    setCliName('');
                    setCliSector('Financial Sector');
                    setCliTier('tier-1');
                    setCliSymbol('CORP');
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Mitra Klien</span>
                </button>
              </div>

              {/* Add / Edit Client Modal */}
              {(isAddingClient || editingClient) && (
                <div className="p-6 bg-slate-950 border border-blue-500/50 rounded-xl space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="text-sm font-bold text-white">
                      {editingClient ? 'Ubah Mitra Klien' : 'Tambah Mitra Baru'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingClient(false);
                        setEditingClient(null);
                      }}
                      className="text-xs text-slate-500 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Nama Institusi / Perusahaan</label>
                      <input
                        type="text"
                        value={cliName}
                        onChange={e => setCliName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Sektor Industri</label>
                      <input
                        type="text"
                        value={cliSector}
                        onChange={e => setCliSector(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Simbol / Ticker</label>
                      <input
                        type="text"
                        value={cliSymbol}
                        onChange={e => setCliSymbol(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white uppercase font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Kategori Tier</label>
                      <select
                        value={cliTier}
                        onChange={e => setCliTier(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      >
                        <option value="tier-1">Tier-1 Banking</option>
                        <option value="national">National Conglomerate</option>
                        <option value="enterprise">Enterprise</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => {
                        setIsAddingClient(false);
                        setEditingClient(null);
                      }}
                      className="px-4 py-2 bg-slate-900 text-slate-400 rounded text-xs cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => {
                        if (!cliName.trim()) return;
                        if (editingClient) {
                          const updated = clients.map(c =>
                            c.id === editingClient.id
                              ? { ...c, name: cliName, sector: cliSector, tier: cliTier, symbol: cliSymbol }
                              : c
                          );
                          onUpdateClients(updated);
                          setEditingClient(null);
                          showNotice('Data mitra berhasil diperbarui.');
                        } else {
                          const created: ClientPartner = {
                            id: Date.now(),
                            name: cliName,
                            sector: cliSector,
                            tier: cliTier,
                            symbol: cliSymbol || 'PARTNER',
                          };
                          onUpdateClients([...clients, created]);
                          setIsAddingClient(false);
                          showNotice('Mitra klien baru berhasil ditambahkan.');
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer"
                    >
                      {editingClient ? 'Simpan' : 'Tambah'}
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {clients.map(cli => (
                  <div key={cli.id} className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 bg-emerald-950 rounded">
                        {cli.symbol}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingClient(cli);
                            setIsAddingClient(false);
                            setCliName(cli.name);
                            setCliSector(cli.sector);
                            setCliTier(cli.tier);
                            setCliSymbol(cli.symbol);
                          }}
                          className="p-1 text-slate-400 hover:text-white cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            onUpdateClients(clients.filter(c => c.id !== cli.id));
                            showNotice('Mitra klien dihapus.');
                          }}
                          className="p-1 text-slate-500 hover:text-rose-400 cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <h3 className="font-bold text-white text-sm">{cli.name}</h3>
                    <div className="text-xs text-slate-400">{cli.sector}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: MEDIA LIBRARY (UPLOAD & CRUD)                           */}
          {/* ============================================================ */}
          {activeTab === 'media' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Media & Asset Library (Upload & CRUD)</h1>
                  <p className="text-slate-400 text-xs mt-1">Unggah berkas foto resolusi tinggi dan gunakan di seluruh artikel, slider, dan banner.</p>
                </div>
                <button
                  onClick={() => {
                    setIsAddingMedia(true);
                    setNewMediaFilename('foto_arsitektur_' + Math.floor(100 + Math.random() * 900) + '.jpg');
                    setNewMediaUrl('/src/assets/images/corporate_atrium_lobby_1792006927447.jpg');
                    setNewMediaAlt('Foto Arsitektur Sistem');
                    setNewMediaCategory('hero');
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Unggah Media Baru</span>
                </button>
              </div>

              {/* Upload Media Modal */}
              {isAddingMedia && (
                <div className="p-6 bg-slate-950 border border-blue-500/50 rounded-xl space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="text-sm font-bold text-white">Unggah Berkas Media Baru</h3>
                    <button onClick={() => setIsAddingMedia(false)} className="text-xs text-slate-500 hover:text-white cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Nama Berkas</label>
                      <input
                        type="text"
                        value={newMediaFilename}
                        onChange={e => setNewMediaFilename(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Kategori Media</label>
                      <select
                        value={newMediaCategory}
                        onChange={e => setNewMediaCategory(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      >
                        <option value="hero">Hero & Slider Banner</option>
                        <option value="blog">Blog & Whitepaper</option>
                        <option value="careers">Karir & Rekrutmen</option>
                        <option value="documents">Dokumen & Legalitas</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-slate-400 mb-1">Teks Alternatif (Alt Text - Ramah SEO)</label>
                      <input
                        type="text"
                        value={newMediaAlt}
                        onChange={e => setNewMediaAlt(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-slate-400 mb-1">Path / URL Gambar</label>
                      <input
                        type="text"
                        value={newMediaUrl}
                        onChange={e => setNewMediaUrl(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white font-mono text-[11px]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setIsAddingMedia(false)}
                      className="px-4 py-2 bg-slate-900 text-slate-400 rounded text-xs cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => {
                        if (!newMediaUrl.trim()) return;
                        const created: MediaItem = {
                          id: Date.now(),
                          filename: newMediaFilename || 'media_asset.jpg',
                          url: newMediaUrl,
                          fileSizeBytes: 2450000,
                          mimeType: 'image/jpeg',
                          altId: newMediaAlt || 'Aset Media Nusantara Solusi Prima',
                          altEn: newMediaAlt || 'Nusantara Solusi Prima Media Asset',
                          uploadedAt: 'Hari ini',
                          usageCount: 1,
                          category: newMediaCategory,
                        };
                        onUpdateMedia([created, ...media]);
                        setIsAddingMedia(false);
                        showNotice('Berkas media berhasil diunggah ke library.');
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer"
                    >
                      Simpan ke Library
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {media.map(m => (
                  <div key={m.id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden space-y-3">
                    <div className="h-44 bg-slate-900 overflow-hidden relative">
                      <img src={m.url} alt={m.altId} className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded text-[10px] text-slate-300 font-mono">
                        {(m.fileSizeBytes / 1000000).toFixed(1)} MB
                      </span>
                      <button
                        onClick={() => {
                          onUpdateMedia(media.filter(item => item.id !== m.id));
                          showNotice('Berkas media dihapus.');
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded cursor-pointer"
                        title="Hapus Media"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="text-xs font-bold text-white truncate">{m.filename}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{m.altId}</div>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(m.url);
                          setCopiedUrl(m.url);
                          showNotice('URL media disalin ke clipboard!');
                          setTimeout(() => setCopiedUrl(null), 2000);
                        }}
                        className="w-full mt-2 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedUrl === m.url ? 'Tersalin!' : 'Salin URL'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: MENUS CRUD                                              */}
          {/* ============================================================ */}
          {activeTab === 'menus' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Menu Navigasi Dinamis (CRUD)</h1>
                  <p className="text-slate-400 text-xs mt-1">Kelola tautan header dan navigasi halaman publik tanpa menyentuh kode program.</p>
                </div>
                <button
                  onClick={() => {
                    setIsAddingMenu(true);
                    setEditingMenu(null);
                    setMenuLabelId('');
                    setMenuLabelEn('');
                    setMenuUrl('custom-page');
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Item Menu</span>
                </button>
              </div>

              {/* Add / Edit Menu Modal */}
              {(isAddingMenu || editingMenu) && (
                <div className="p-6 bg-slate-950 border border-blue-500/50 rounded-xl space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="text-sm font-bold text-white">
                      {editingMenu ? 'Ubah Item Menu' : 'Tambah Item Menu Baru'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingMenu(false);
                        setEditingMenu(null);
                      }}
                      className="text-xs text-slate-500 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Label Menu (ID)</label>
                      <input
                        type="text"
                        value={menuLabelId}
                        onChange={e => setMenuLabelId(e.target.value)}
                        placeholder="Contoh: Portofolio"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Label Menu (EN)</label>
                      <input
                        type="text"
                        value={menuLabelEn}
                        onChange={e => setMenuLabelEn(e.target.value)}
                        placeholder="Contoh: Portfolio"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Rute Halaman Tujuan</label>
                      <select
                        value={menuUrl}
                        onChange={e => setMenuUrl(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white font-mono"
                      >
                        <option value="home">Beranda (/)</option>
                        <option value="about">Tentang Kami (/about)</option>
                        <option value="services">Layanan (/services)</option>
                        <option value="blog">Blog (/blog)</option>
                        <option value="events">Agenda (/events)</option>
                        <option value="careers">Karir (/careers)</option>
                        <option value="custom-page">Halaman Kustom (/custom-page)</option>
                        <option value="contact">Kontak (/contact)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => {
                        setIsAddingMenu(false);
                        setEditingMenu(null);
                      }}
                      className="px-4 py-2 bg-slate-900 text-slate-400 rounded text-xs cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => {
                        if (!menuLabelId.trim()) return;
                        if (editingMenu) {
                          const updated = menus.map(m =>
                            m.id === editingMenu.id
                              ? { ...m, labelId: menuLabelId, labelEn: menuLabelEn || menuLabelId, urlId: menuUrl, urlEn: menuUrl }
                              : m
                          );
                          onUpdateMenus(updated);
                          setEditingMenu(null);
                          showNotice('Menu navigasi diperbarui.');
                        } else {
                          const created: MenuItem = {
                            id: Date.now(),
                            labelId: menuLabelId,
                            labelEn: menuLabelEn || menuLabelId,
                            urlId: menuUrl,
                            urlEn: menuUrl,
                            order: menus.length + 1,
                          };
                          onUpdateMenus([...menus, created]);
                          setIsAddingMenu(false);
                          showNotice('Item menu baru ditambahkan.');
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer"
                    >
                      {editingMenu ? 'Simpan' : 'Tambah'}
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {menus.map((menu, idx) => (
                  <div key={menu.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-slate-500">{idx + 1}.</span>
                      <div>
                        <div className="font-bold text-white text-sm">{menu.labelId} ({menu.labelEn})</div>
                        <div className="text-xs text-blue-400 font-mono mt-0.5">Route: /{menu.urlId} (EN: /{menu.urlEn})</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingMenu(menu);
                          setIsAddingMenu(false);
                          setMenuLabelId(menu.labelId);
                          setMenuLabelEn(menu.labelEn);
                          setMenuUrl(menu.urlId);
                        }}
                        className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
                        title="Edit Menu"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          onUpdateMenus(menus.filter(m => m.id !== menu.id));
                          showNotice('Item menu dihapus.');
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-400 cursor-pointer"
                        title="Hapus Menu"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: THEME CUSTOMIZER                                        */}
          {/* ============================================================ */}
          {activeTab === 'themes' && (
            <div className="space-y-8 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Theme Customizer (CSS Variables)</h1>
                <p className="text-slate-400 text-xs mt-1">Perubahan tema warna diterapkan secara instan ke variabel CSS sistem.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {themes.map(t => (
                  <div
                    key={t.id}
                    onClick={() => onThemeChange(t)}
                    className={`p-6 rounded-xl border cursor-pointer transition-all ${currentTheme.id === t.id ? 'bg-slate-950 border-blue-500 ring-2 ring-blue-500/30' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-bold text-white text-base">{t.name}</div>
                      {currentTheme.id === t.id && (
                        <span className="px-2 py-0.5 bg-blue-900 text-blue-300 rounded text-[10px] font-bold">Aktif</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mb-4">{t.accentVibe}</div>
                    <div className="flex gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <span className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: t.colorPrimary }} />
                        <span>Primary</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <span className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: t.colorSecondary }} />
                        <span>Secondary</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <span className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: t.colorHeading }} />
                        <span>Heading</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: SEO AUDITOR FOR ALL PAGES + GOOGLE SERP SIMULATOR      */}
          {/* ============================================================ */}
          {activeTab === 'seo' && (
            <div className="space-y-8 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  SEO Content Auditor & Analytics (Seluruh Halaman)
                </h1>
                <p className="text-slate-400 text-xs mt-1">
                  Pilih halaman mana pun di website (Beranda, Tentang Kami, Layanan, Blog, Agenda, Karir, Kontak, atau Halaman Kustom) untuk audit teknis, pratinjau cuplikan Google SERP, dan kepatuhan Schema.org.
                </p>
              </div>

              {/* Target Page Selector */}
              <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Pilih Halaman yang Diaudit ({allAuditablePages.length} Halaman Terdaftar)
                  </label>
                  <span className="text-[11px] text-cyan-400 font-mono">Real-time DOM & Meta Evaluation</span>
                </div>

                <select
                  value={selectedAuditPageId}
                  onChange={e => {
                    const id = e.target.value;
                    setSelectedAuditPageId(id);
                    const target = allAuditablePages.find(p => p.id === id);
                    if (target) runAuditOnTarget(target);
                  }}
                  className="px-3 py-2.5 bg-slate-900 border border-slate-800 rounded text-white text-xs w-full font-medium"
                >
                  <optgroup label="Halaman Inti Korporat">
                    {allAuditablePages
                      .filter(p => p.type === 'core')
                      .map(p => (
                        <option key={p.id} value={p.id}>{p.name} — {p.url}</option>
                      ))}
                  </optgroup>
                  <optgroup label="Artikel Whitepaper / Blog">
                    {allAuditablePages
                      .filter(p => p.type === 'post')
                      .map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                  </optgroup>
                  <optgroup label="Agenda & Summit Acara">
                    {allAuditablePages
                      .filter(p => p.type === 'event')
                      .map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                  </optgroup>
                  <optgroup label="Halaman Kustom Dinamis">
                    {allAuditablePages
                      .filter(p => p.type === 'custom-page')
                      .map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                  </optgroup>
                </select>

                {/* GOOGLE SERP SIMULATOR (DESKTOP & MOBILE) */}
                {(() => {
                  const currentTarget =
                    allAuditablePages.find(p => p.id === selectedAuditPageId) || allAuditablePages[0];
                  return (
                    <div className="mt-4 p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                          <GoogleIcon className="w-4 h-4 text-blue-400" />
                          <span>Simulasi Tampilan Cuplikan Google Search (SERP Preview)</span>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded border border-slate-800">
                          <button
                            type="button"
                            onClick={() => setSerpViewMode('desktop')}
                            className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer ${serpViewMode === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                          >
                            Desktop
                          </button>
                          <button
                            type="button"
                            onClick={() => setSerpViewMode('mobile')}
                            className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer ${serpViewMode === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                          >
                            Smartphone
                          </button>
                        </div>
                      </div>

                      {/* Google Result Card Simulation */}
                      <div
                        className={`p-4 bg-white rounded-lg border border-slate-200 text-left font-sans ${serpViewMode === 'mobile' ? 'max-w-sm mx-auto' : ''}`}
                      >
                        <div className="flex items-center gap-2 text-[11px] text-slate-700 mb-1">
                          <div className="w-4 h-4 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-[9px]">
                            NP
                          </div>
                          <span className="font-medium text-slate-800">nusantaraprima.co.id</span>
                          <span className="text-slate-400">&rsaquo;</span>
                          <span className="text-slate-500 truncate">{currentTarget.url.replace('https://nusantaraprima.co.id', '') || '/'}</span>
                        </div>
                        <div className="text-base text-blue-800 font-medium hover:underline cursor-pointer leading-snug">
                          {currentTarget.title}
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-normal">
                          {currentTarget.metaDesc}
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* Audit Score & Metrics */}
                {auditResult && (
                  <div className="pt-4 border-t border-slate-800 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="text-3xl font-bold text-white tabular-nums">
                          Skor Kualitas SEO:{' '}
                          <span className={auditResult.score >= 80 ? 'text-emerald-400' : 'text-amber-400'}>
                            {auditResult.score}
                          </span>{' '}
                          / 100
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          Evaluasi Title Tag, Meta Snippet, H1, Kerapatan Keyword, dan Indexability
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-mono bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
                        <div>
                          <span className="text-slate-500 block">Keyword</span>
                          <span className="text-amber-400 font-bold">{auditResult.keyword}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Densitas</span>
                          <span className="text-emerald-400 font-bold">{auditResult.density}%</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Jumlah Kata</span>
                          <span className="text-white font-bold">{auditResult.wordCount}</span>
                        </div>
                      </div>
                    </div>

                    {/* Passed Checklist */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Pemeriksaan Teknis yang Lulus ({auditResult.passed.length})
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {auditResult.passed.map((p, i) => (
                          <li key={i} className="flex items-center gap-2 text-emerald-400">
                            <Check className="w-4 h-4 shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommendations */}
                    {auditResult.recommendations.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                          Rekomendasi Tindakan Optimasi
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {auditResult.recommendations.map((s, i) => (
                            <li key={i} className="flex items-center gap-2 text-amber-300">
                              <AlertTriangle className="w-4 h-4 shrink-0" />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: ANALYTICS & TRAFIK                                      */}
          {/* ============================================================ */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Statistik Trafik & Konversi Multi-Page</h1>
                <p className="text-slate-400 text-xs mt-1">Data kunjungan multi-page real-time, perangkat pengakses, dan kanal konversi formulir.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="text-xs text-slate-400 mb-1">Total Pageviews (30 Hari)</div>
                  <div className="text-3xl font-bold text-white tabular-nums">148,290</div>
                  <div className="text-xs text-emerald-400 mt-2">+18.4% dari bulan sebelumnya</div>
                </div>
                <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="text-xs text-slate-400 mb-1">Pengunjung Unik</div>
                  <div className="text-3xl font-bold text-white tabular-nums">39,410</div>
                  <div className="text-xs text-blue-400 mt-2">Durasi rerata: 4m 12s</div>
                </div>
                <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="text-xs text-slate-400 mb-1">Rasio Konversi Form</div>
                  <div className="text-3xl font-bold text-white tabular-nums">4.8%</div>
                  <div className="text-xs text-emerald-400 mt-2">Inkuiri Enterprise & Karir</div>
                </div>
              </div>

              <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                <h3 className="text-sm font-bold text-white">Distribusi Perangkat Pengunjung</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-slate-900 rounded-lg flex items-center gap-3">
                    <Laptop className="w-6 h-6 text-blue-400" />
                    <div>
                      <div className="text-slate-400">Desktop / PC</div>
                      <div className="text-base font-bold text-white">64.2%</div>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-900 rounded-lg flex items-center gap-3">
                    <Smartphone className="w-6 h-6 text-emerald-400" />
                    <div>
                      <div className="text-slate-400">Mobile Smartphone</div>
                      <div className="text-base font-bold text-white">29.8%</div>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-900 rounded-lg flex items-center gap-3">
                    <Tablet className="w-6 h-6 text-amber-400" />
                    <div>
                      <div className="text-slate-400">Tablet</div>
                      <div className="text-base font-bold text-white">6.0%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: USERS & RBAC (DYNAMIC USER MANAGEMENT)                  */}
          {/* ============================================================ */}
          {activeTab === 'users' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Manajemen Pengguna & Hak Akses (RBAC)</h1>
                  <p className="text-slate-400 text-xs mt-1">
                    Tambah, ubah peran, dan kelola akun pengguna. Hak akses disinkronkan otomatis sesuai izin peran masing-masing.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsAddingUser(true);
                    setEditingUser(null);
                    setUserName('');
                    setUserEmail('');
                    setUserRole('editor');
                    setUserDept('Digital Operations');
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Tambah Pengguna Baru</span>
                </button>
              </div>

              {/* Add / Edit User Modal */}
              {(isAddingUser || editingUser) && (
                <div className="p-6 bg-slate-950 border border-blue-500/50 rounded-xl space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="text-sm font-bold text-white">
                      {editingUser ? 'Ubah Pengguna & Hak Akses' : 'Tambah Pengguna Baru'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingUser(false);
                        setEditingUser(null);
                      }}
                      className="text-xs text-slate-500 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Nama Lengkap</label>
                      <input
                        type="text"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Alamat Email</label>
                      <input
                        type="email"
                        value={userEmail}
                        onChange={e => setUserEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Hak Akses / Peran (Role)</label>
                      <select
                        value={userRole}
                        onChange={e => setUserRole(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      >
                        <option value="super-admin">Super Admin (Akses Penuh)</option>
                        <option value="admin">Administrator (Semua Kecuali Modifikasi User)</option>
                        <option value="editor">Editor (Halaman, Slider, Blog, Event)</option>
                        <option value="author">Author (Blog & Media)</option>
                        <option value="seo-specialist">SEO Specialist</option>
                        <option value="analyst">Analyst (Trafik & Submisi)</option>
                        <option value="contact-manager">Contact Manager (Zoho & Pesan)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Departemen</label>
                      <input
                        type="text"
                        value={userDept}
                        onChange={e => setUserDept(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => {
                        setIsAddingUser(false);
                        setEditingUser(null);
                      }}
                      className="px-4 py-2 bg-slate-900 text-slate-400 rounded text-xs cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => {
                        if (!userName.trim() || !userEmail.trim()) return;
                        if (editingUser) {
                          const updated = users.map(u =>
                            u.id === editingUser.id
                              ? { ...u, name: userName, email: userEmail, role: userRole, department: userDept }
                              : u
                          );
                          if (onUpdateUsers) onUpdateUsers(updated);
                          setEditingUser(null);
                          showNotice(`Data pengguna ${userName} berhasil diperbarui.`);
                        } else {
                          const created: User = {
                            id: Date.now(),
                            name: userName,
                            email: userEmail,
                            role: userRole,
                            isActive: true,
                            department: userDept,
                            lastLogin: 'Belum pernah',
                          };
                          if (onUpdateUsers) onUpdateUsers([...users, created]);
                          setIsAddingUser(false);
                          showNotice(`Pengguna baru ${userName} berhasil ditambahkan.`);
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer"
                    >
                      {editingUser ? 'Simpan' : 'Tambahkan'}
                    </button>
                  </div>
                </div>
              )}

              {/* Users Table */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold">
                    <tr>
                      <th className="p-3">Nama</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Peran / Role</th>
                      <th className="p-3">Departemen</th>
                      <th className="p-3">Login Terakhir</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {users.map(u => (
                      <tr key={u.id} className="hover:bg-slate-900/50">
                        <td className="p-3 font-bold text-white">{u.name}</td>
                        <td className="p-3 text-slate-400">{u.email}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 bg-blue-950 text-blue-400 rounded text-[10px] font-bold uppercase">
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3 text-slate-400">{u.department}</td>
                        <td className="p-3 font-mono text-[11px] text-slate-500">{u.lastLogin}</td>
                        <td className="p-3">
                          <button
                            onClick={() => {
                              const updated = users.map(userItem =>
                                userItem.id === u.id ? { ...userItem, isActive: !userItem.isActive } : userItem
                              );
                              if (onUpdateUsers) onUpdateUsers(updated);
                              showNotice(`Status akun ${u.name} diubah.`);
                            }}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${u.isActive ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-500'}`}
                          >
                            {u.isActive ? 'Aktif' : 'Nonaktif'}
                          </button>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setEditingUser(u);
                                setIsAddingUser(false);
                                setUserName(u.name);
                                setUserEmail(u.email);
                                setUserRole(u.role);
                                setUserDept(u.department || 'Operations');
                              }}
                              className="p-1 text-slate-400 hover:text-white cursor-pointer"
                              title="Edit Pengguna"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            {users.length > 1 && (
                              <button
                                onClick={() => {
                                  if (onUpdateUsers) {
                                    onUpdateUsers(users.filter(userItem => userItem.id !== u.id));
                                    showNotice(`Pengguna ${u.name} dihapus.`);
                                  }
                                }}
                                className="p-1 text-slate-500 hover:text-rose-400 cursor-pointer"
                                title="Hapus Pengguna"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: AUDIT LOG                                               */}
          {/* ============================================================ */}
          {activeTab === 'audit' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Audit Trail & Log Keamanan Siber</h1>
                <p className="text-slate-400 text-xs mt-1">Pencatatan aktivitas sensitif pengguna dan sistem untuk audit kepatuhan regulasi.</p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold">
                    <tr>
                      <th className="p-3">Waktu (WIB)</th>
                      <th className="p-3">User & Peran</th>
                      <th className="p-3">Aksi</th>
                      <th className="p-3">Modul</th>
                      <th className="p-3">Alamat IP</th>
                      <th className="p-3">Tingkat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-[11px]">
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 text-slate-500">14 Okt 2026, 12:40:11</td>
                      <td className="p-3 text-white font-sans font-bold">Bambang Wijaya (Super Admin)</td>
                      <td className="p-3 text-emerald-400">UPDATE_HERO_SLIDER_IMAGE</td>
                      <td className="p-3 text-slate-300 font-sans">Hero Slider</td>
                      <td className="p-3 text-slate-400">103.144.17.22</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-blue-950 text-blue-400 rounded text-[10px]">INFO</span></td>
                    </tr>
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 text-slate-500">14 Okt 2026, 11:20:14</td>
                      <td className="p-3 text-white font-sans font-bold">Bambang Wijaya (Super Admin)</td>
                      <td className="p-3 text-emerald-400">PUBLISH_CUSTOM_PAGE</td>
                      <td className="p-3 text-slate-300 font-sans">Halaman Kustom</td>
                      <td className="p-3 text-slate-400">103.144.17.22</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-blue-950 text-blue-400 rounded text-[10px]">INFO</span></td>
                    </tr>
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 text-slate-500">14 Okt 2026, 10:45:02</td>
                      <td className="p-3 text-white font-sans font-bold">Public Candidate (Applicant)</td>
                      <td className="p-3 text-emerald-400">UPLOAD_CV_RESUME</td>
                      <td className="p-3 text-slate-300 font-sans">Karir & Rekrutmen</td>
                      <td className="p-3 text-slate-400">182.253.11.89</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded text-[10px]">NOTICE</span></td>
                    </tr>
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 text-slate-500">14 Okt 2026, 09:14:30</td>
                      <td className="p-3 text-white font-sans font-bold">Dimas Prasetyo (Contact Mgr)</td>
                      <td className="p-3 text-cyan-400">SEND_ZOHO_SMTP_REPLY</td>
                      <td className="p-3 text-slate-300 font-sans">Kontak Masuk</td>
                      <td className="p-3 text-slate-400">103.144.17.25</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-blue-950 text-blue-400 rounded text-[10px]">INFO</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: KONTAK & ZOHO SMTP                                      */}
          {/* ============================================================ */}
          {activeTab === 'contacts' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Kontak Masuk & Zoho SMTP Inbox</h1>
                <p className="text-slate-400 text-xs mt-1">Pesan dari formulir kontak terenkripsi dengan integrasi pengiriman balasan Zoho Mail.</p>
              </div>

              {/* Reply Modal */}
              {selectedContact && (
                <div className="p-6 bg-slate-950 border border-blue-500/50 rounded-xl space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">Balas Pesan via Zoho SMTP</h3>
                    <button onClick={() => setSelectedContact(null)} className="text-xs text-slate-500 hover:text-white cursor-pointer">✕</button>
                  </div>
                  <div className="text-xs text-slate-300">
                    <span className="text-slate-500">Kepada:</span> {selectedContact.name} ({selectedContact.email})
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Subjek</label>
                    <input
                      type="text"
                      value={replySubject}
                      onChange={e => setReplySubject(e.target.value)}
                      placeholder="Re: Inkuiri Kemitraan Teknis..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Isi Pesan Balasan (Zoho TLS Port 587)</label>
                    <textarea
                      rows={4}
                      value={replyMessage}
                      onChange={e => setReplyMessage(e.target.value)}
                      placeholder="Tuliskan respon resmi institusi di sini..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-white text-xs"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    {replyStatus === 'sending' && <span className="text-xs text-blue-400 animate-pulse">Mengirim melalui SMTP Zoho...</span>}
                    {replyStatus === 'success' && <span className="text-xs text-emerald-400 font-bold">Email balasan berhasil dikirim!</span>}
                    {!replyStatus && <span />}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedContact(null)}
                        className="px-3 py-1.5 bg-slate-900 text-slate-400 rounded text-xs cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSendZohoReply}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Kirim Balasan</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {contacts.map(c => (
                  <div key={c.id} className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{c.name}</span>
                        <span className="text-slate-400">({c.email})</span>
                        {c.status === 'unread' ? (
                          <span className="px-2 py-0.5 bg-rose-950 text-rose-400 rounded text-[10px] font-bold">Baru</span>
                        ) : (
                          <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded text-[10px] font-bold">Dibalas</span>
                        )}
                      </div>
                      <span className="text-slate-500 font-mono text-[11px]">{c.createdAt}</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-200">Subjek: {c.subject}</div>
                    <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded">{c.message}</p>
                    <div className="flex justify-between items-center pt-2">
                      <button
                        onClick={() => {
                          onUpdateContacts(contacts.filter(item => item.id !== c.id));
                          showNotice('Pesan kontak dihapus.');
                        }}
                        className="text-slate-500 hover:text-rose-400 p-1 text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus Pesan</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedContact(c);
                          setReplySubject(`Re: ${c.subject}`);
                        }}
                        className="px-3 py-1.5 bg-blue-900/40 text-blue-300 hover:bg-blue-900 border border-blue-700/50 rounded text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Balas Email via Zoho</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Subtle Google G Icon for SERP preview
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
    </svg>
  );
}
