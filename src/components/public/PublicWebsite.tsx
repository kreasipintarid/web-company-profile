import React, { useState, useEffect } from 'react';
import {
  Locale,
  ThemeConfig,
  PageSection,
  BlogPost,
  EventItem,
  MenuItem,
  ContactMessage,
  CareerItem,
  JobApplication,
  CustomPage,
  CustomForm,
  CustomFormSubmission,
  PageRoute,
  SlideItem,
  ExecutiveBio,
  ClientPartner,
  DelegateTicket,
  CommentItem,
} from '../../types/cms';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Globe,
  Mail,
  MapPin,
  Phone,
  Search,
  Send,
  ShieldCheck,
  Calendar,
  Clock,
  UserCheck,
  Upload,
  Briefcase,
  Award,
  Users,
  Compass,
  FileCheck,
  Share2,
  Bookmark,
  ExternalLink,
  Sliders,
  Calculator,
  Ticket,
  FileText,
  Building,
  CheckCircle2,
  Lock,
  Sparkles,
  MessageSquare,
  Shield,
  Layers,
  HelpCircle,
  Eye,
  Copy,
} from 'lucide-react';

interface PublicWebsiteProps {
  locale: Locale;
  onLocaleChange: (loc: Locale) => void;
  theme: ThemeConfig;
  sections: PageSection[];
  posts: BlogPost[];
  events: EventItem[];
  careers: CareerItem[];
  applications: JobApplication[];
  onAddApplication: (app: Omit<JobApplication, 'id' | 'submittedAt'>) => void;
  customPages: CustomPage[];
  customForms: CustomForm[];
  onAddCustomSubmission: (sub: Omit<CustomFormSubmission, 'id' | 'submittedAt'>) => void;
  menus: MenuItem[];
  slides: SlideItem[];
  executives: ExecutiveBio[];
  clients: ClientPartner[];
  onAddContact: (contact: Omit<ContactMessage, 'id' | 'createdAt' | 'ticketNumber'>) => void;
  onOpenAdmin: () => void;
  initialRoute?: PageRoute;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({
  locale,
  onLocaleChange,
  theme,
  sections,
  posts,
  events,
  careers,
  applications,
  onAddApplication,
  customPages,
  customForms,
  onAddCustomSubmission,
  menus,
  slides = [],
  executives = [],
  clients = [],
  onAddContact,
  onOpenAdmin,
  initialRoute = 'home',
}) => {
  // Navigation Routing State
  const [currentPage, setCurrentPage] = useState<PageRoute>(initialRoute);
  const [selectedPostId, setSelectedPostId] = useState<number>(posts[0]?.id || 1);
  const [selectedEventId, setSelectedEventId] = useState<number>(events[0]?.id || 1);
  const [selectedCareerId, setSelectedCareerId] = useState<number>(careers[0]?.id || 1);
  const [selectedCustomPageId, setSelectedCustomPageId] = useState<number>(customPages[0]?.id || 1);
  const [selectedExec, setSelectedExec] = useState<ExecutiveBio | null>(null);

  // Home Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);

  // Auto slide interval with smooth progress tracker
  useEffect(() => {
    if (currentPage !== 'home' || slides.length === 0) return;
    setSlideProgress(0);
    const progressInterval = setInterval(() => {
      setSlideProgress(prev => {
        if (prev >= 100) {
          setCurrentSlide(s => (s + 1) % slides.length);
          return 0;
        }
        return prev + 1.6; // ~6.2s total per slide
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [currentPage, currentSlide, slides.length]);

  // States
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [eventTab, setEventTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [blogFilter, setBlogFilter] = useState<string>('all');
  const [blogSearch, setBlogSearch] = useState<string>('');
  const [careerDeptFilter, setCareerDeptFilter] = useState<string>('all');

  // Contact Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formHoneypot, setFormHoneypot] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [lastTicketCode, setLastTicketCode] = useState('');

  // Career Application Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantLinkedin, setApplicantLinkedin] = useState('');
  const [applicantPortfolio, setApplicantPortfolio] = useState('');
  const [applicantCvName, setApplicantCvName] = useState('CV_Raditya_Pratama_CloudArchitect.pdf');
  const [applicantCvSize, setApplicantCvSize] = useState('2.4 MB');
  const [applicantCover, setApplicantCover] = useState('');
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [lastAppCode, setLastAppCode] = useState('');

  // Custom Form Submission State
  const [customFormData, setCustomFormData] = useState<Record<string, string>>({});
  const [customFormSubmitted, setCustomFormSubmitted] = useState(false);
  const [lastCustomSubmissionCode, setLastCustomSubmissionCode] = useState('');

  // Delegate Registration Modal State for Events
  const [isRegisteringEvent, setIsRegisteringEvent] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCompany, setRegCompany] = useState('');
  const [regJobTitle, setRegJobTitle] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [registeredTicket, setRegisteredTicket] = useState<DelegateTicket | null>(null);

  // Article Comments State (Live interactivity)
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 1,
      postId: 1,
      name: 'Ir. Ferry Salim (VP Infrastructure)',
      email: 'ferry@bankswasta.co.id',
      comment: 'Pembahasan mengenai Kafka Raft consensus sangat aplikatif untuk kebutuhan audit transaksi kami. Terima kasih atas ulasan mendalamnya.',
      createdAt: '13 Oktober 2026, 14:10 WIB',
      status: 'approved',
    },
    {
      id: 2,
      postId: 1,
      name: 'Dian Permana (Lead Architect)',
      email: 'dian.permana@cloudcorp.id',
      comment: 'Apakah pendekatan ini sudah diuji pada multiregion cloud yang terpisah jarak lebih dari 1000 km antar-data center?',
      createdAt: '14 Oktober 2026, 09:20 WIB',
      status: 'approved',
    },
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentEmail, setNewCommentEmail] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSent, setCommentSent] = useState(false);

  // Interactive Solution Scope Calculator (Services Page)
  const [calcScope, setCalcScope] = useState<'cloud' | 'security' | 'data' | 'full'>('cloud');
  const [calcScale, setCalcScale] = useState<'regional' | 'national' | 'global'>('national');
  const [calcSpeed, setCalcSpeed] = useState<'standard' | 'accelerated'>('standard');

  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formHoneypot) return;
    const ticket = `TKT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    onAddContact({
      name: formName,
      email: formEmail,
      phone: formPhone,
      subject: formSubject,
      message: formMessage,
      status: 'unread',
      locale,
    });
    setLastTicketCode(ticket);
    setContactSubmitted(true);
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormSubject('');
    setFormMessage('');
  };

  const handleCareerApply = (e: React.FormEvent, career: CareerItem) => {
    e.preventDefault();
    const appCode = `APP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    onAddApplication({
      applicationCode: appCode,
      careerId: career.id,
      careerTitle: career.titleId,
      fullName: applicantName,
      email: applicantEmail,
      phone: applicantPhone,
      linkedinUrl: applicantLinkedin,
      portfolioUrl: applicantPortfolio,
      resumeFileName: applicantCvName || 'Curriculum_Vitae_Terbaru.pdf',
      resumeFileSize: applicantCvSize,
      coverLetter: applicantCover,
      status: 'pending',
    });
    setLastAppCode(appCode);
    setApplicationSubmitted(true);
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
    setApplicantLinkedin('');
    setApplicantPortfolio('');
    setApplicantCover('');
  };

  const handleCustomFormSubmit = (e: React.FormEvent, form: CustomForm, pageSlug: string) => {
    e.preventDefault();
    const subCode = `SUB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    onAddCustomSubmission({
      submissionCode: subCode,
      formId: form.id,
      formTitle: form.titleId,
      pageSlug,
      data: customFormData,
      ipAddress: '127.0.0.1 (Verified)',
      status: 'new',
    });
    setLastCustomSubmissionCode(subCode);
    setCustomFormSubmitted(true);
    setCustomFormData({});
  };

  const handleDelegateSubmit = (e: React.FormEvent, event: EventItem) => {
    e.preventDefault();
    const ticketCode = `PASS-${Math.floor(100000 + Math.random() * 900000)}`;
    const ticket: DelegateTicket = {
      id: Date.now(),
      eventId: event.id,
      eventTitle: event.titleId,
      fullName: regName,
      corporateEmail: regEmail,
      companyName: regCompany,
      jobTitle: regJobTitle,
      phone: regPhone,
      ticketCode,
      registeredAt: new Date().toLocaleDateString('id-ID', { dateStyle: 'long' }),
      status: 'confirmed',
    };
    setRegisteredTicket(ticket);
    setIsRegisteringEvent(false);
  };

  const handleAddComment = (e: React.FormEvent, postId: number) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;
    const newComm: CommentItem = {
      id: Date.now(),
      postId,
      name: newCommentName,
      email: newCommentEmail,
      comment: newCommentText,
      createdAt: 'Baru saja',
      status: 'approved',
    };
    setComments(prev => [newComm, ...prev]);
    setCommentSent(true);
    setNewCommentName('');
    setNewCommentEmail('');
    setNewCommentText('');
    setTimeout(() => setCommentSent(false), 4000);
  };

  const currentPost = posts.find(p => p.id === selectedPostId) || posts[0];
  const currentEvent = events.find(e => e.id === selectedEventId) || events[0];
  const currentCareer = careers.find(c => c.id === selectedCareerId) || careers[0];
  const currentCustomPage = customPages.find(cp => cp.id === selectedCustomPageId) || customPages[0];
  const embeddedCustomForm = currentCustomPage?.formId
    ? customForms.find(f => f.id === currentCustomPage.formId)
    : null;

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-900 selection:text-white flex flex-col font-sans">
      {/* TOP ANNOUNCEMENT TICKER (DISCREET & LUXURIOUS) */}
      <div className="bg-slate-950 text-slate-300 text-[11px] px-6 py-2 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            SOC Status: Nominal
          </span>
          <span className="text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400">
            Pusat Rekayasa Sistem SCBD District 8, Jakarta Selatan &bull; ISO 27001 Certified
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="hidden md:inline font-mono">Direct Line: +62 21 5088 9200</span>
          <button
            onClick={onOpenAdmin}
            className="text-white hover:text-blue-300 transition-colors font-medium flex items-center gap-1 cursor-pointer"
          >
            <UserCheck className="w-3 h-3 text-blue-400" />
            <span>Admin Portal</span>
          </button>
        </div>
      </div>

      {/* TOP BAR NAVIGATION (3-ZONE STRICT CONTRACT) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Wordmark */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 text-left cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-950 text-white flex items-center justify-center font-bold text-sm tracking-tight border border-slate-800 shadow-sm group-hover:border-slate-600 transition-colors">
              NP
            </div>
            <div>
              <div className="text-base font-bold tracking-tight text-slate-900 leading-tight">
                PT Nusantara Solusi Prima
              </div>
              <div className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">
                Enterprise Systems Architecture
              </div>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Multi-page router) */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wide uppercase text-slate-600">
            <button
              onClick={() => navigateTo('home')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer py-1 ${currentPage === 'home' ? 'text-slate-950 font-bold border-b-2 border-slate-950' : ''}`}
            >
              {locale === 'id' ? 'Beranda' : 'Home'}
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer py-1 ${currentPage === 'about' ? 'text-slate-950 font-bold border-b-2 border-slate-950' : ''}`}
            >
              {locale === 'id' ? 'Tentang Kami' : 'About Us'}
            </button>
            <button
              onClick={() => navigateTo('services')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer py-1 ${currentPage === 'services' ? 'text-slate-950 font-bold border-b-2 border-slate-950' : ''}`}
            >
              {locale === 'id' ? 'Layanan' : 'Services'}
            </button>
            <button
              onClick={() => navigateTo('blog')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer py-1 ${currentPage === 'blog' || currentPage === 'blog-detail' ? 'text-slate-950 font-bold border-b-2 border-slate-950' : ''}`}
            >
              {locale === 'id' ? 'Blog & Riset' : 'Insights'}
            </button>
            <button
              onClick={() => navigateTo('events')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer py-1 ${currentPage === 'events' || currentPage === 'event-detail' ? 'text-slate-950 font-bold border-b-2 border-slate-950' : ''}`}
            >
              {locale === 'id' ? 'Agenda' : 'Events'}
            </button>
            <button
              onClick={() => navigateTo('careers')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer py-1 ${currentPage === 'careers' || currentPage === 'career-detail' ? 'text-slate-950 font-bold border-b-2 border-slate-950' : ''}`}
            >
              {locale === 'id' ? 'Karir' : 'Careers'}
            </button>
            <button
              onClick={() => navigateTo('custom-page')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer py-1 ${currentPage === 'custom-page' ? 'text-slate-950 font-bold border-b-2 border-slate-950' : ''}`}
            >
              {locale === 'id' ? 'Halaman Kustom' : 'Custom Pages'}
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer py-1 ${currentPage === 'contact' ? 'text-slate-950 font-bold border-b-2 border-slate-950' : ''}`}
            >
              {locale === 'id' ? 'Kontak' : 'Contact'}
            </button>
          </nav>

          {/* Zone 3: Language Switcher & Action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Bilingual Switcher */}
            <div className="flex items-center border border-slate-200 rounded-lg p-0.5 text-xs font-semibold bg-slate-50">
              <button
                onClick={() => onLocaleChange('id')}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${locale === 'id' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'}`}
              >
                ID
              </button>
              <button
                onClick={() => onLocaleChange('en')}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${locale === 'en' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'}`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => navigateTo('contact')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm"
              style={{ backgroundColor: theme.colorPrimary }}
            >
              {locale === 'id' ? 'Konsultasi Teknis' : 'Schedule Advisory'}
            </button>
          </div>
        </div>
      </header>

      {/* MULTI-PAGE RENDERER */}
      <main className="flex-1">
        {/* ============================================================ */}
        {/* 1. HALAMAN HOME / BERANDA DENGAN DYNAMIC SLIDER CAROUSEL     */}
        {/* ============================================================ */}
        {currentPage === 'home' && (
          <div>
            {/* HERO SLIDER CAROUSEL (LUXURY EXECUTIVE) */}
            <section className="relative overflow-hidden bg-slate-950 text-white min-h-[640px] lg:min-h-[720px] flex items-center">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                >
                  <img
                    src={slide.imageUrl}
                    alt={locale === 'id' ? slide.titleId : slide.titleEn}
                    className="absolute inset-0 w-full h-full object-cover opacity-45 scale-105 transition-transform duration-10000 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                  <div className="relative z-20 max-w-7xl mx-auto px-6 h-full min-h-[640px] lg:min-h-[720px] flex flex-col justify-center py-24">
                    <div className="max-w-3xl">
                      {slide.badgeText && (
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-emerald-400 mb-6 backdrop-blur shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{slide.badgeText}</span>
                        </div>
                      )}

                      <div className="text-xs font-mono font-semibold tracking-wider text-amber-400 uppercase mb-3">
                        {locale === 'id' ? slide.tagId : slide.tagEn}
                      </div>

                      <h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6"
                        style={{ textWrap: 'balance' }}
                      >
                        {locale === 'id' ? slide.titleId : slide.titleEn}
                      </h1>

                      <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
                        {locale === 'id' ? slide.descId : slide.descEn}
                      </p>

                      <div className="flex flex-wrap items-center gap-4">
                        <button
                          onClick={() => navigateTo(slide.ctaUrl as PageRoute)}
                          className="px-6 py-3.5 text-xs font-bold tracking-wider uppercase text-white rounded-lg transition-colors cursor-pointer shadow-lg hover:brightness-110"
                          style={{ backgroundColor: theme.colorPrimary }}
                        >
                          {locale === 'id' ? slide.ctaTextId : slide.ctaTextEn} &rarr;
                        </button>
                        <button
                          onClick={() => navigateTo('services')}
                          className="px-6 py-3.5 text-xs font-bold tracking-wider uppercase text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer backdrop-blur"
                        >
                          {locale === 'id' ? 'Portofolio Layanan' : 'Architecture Services'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Slider Progress Bar & Controls */}
              <div className="absolute z-30 bottom-10 left-6 lg:left-12 right-6 lg:right-12 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <div className="font-mono text-white text-sm font-bold">
                    0{currentSlide + 1} <span className="text-slate-600">/</span> 0{slides.length}
                  </div>
                  <div className="w-32 sm:w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 transition-all duration-100 ease-linear"
                      style={{ width: `${slideProgress}%` }}
                    />
                  </div>
                  {/* Thumbnail / Dot Navigation */}
                  <div className="hidden sm:flex items-center gap-2 ml-2">
                    {slides.map((_, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => {
                          setCurrentSlide(sIdx);
                          setSlideProgress(0);
                        }}
                        className={`h-2 transition-all rounded-full cursor-pointer ${sIdx === currentSlide ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'}`}
                        title={`Slide ${sIdx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
                      setSlideProgress(0);
                    }}
                    className="w-10 h-10 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 cursor-pointer transition-colors backdrop-blur"
                    title="Slide Sebelumnya"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setCurrentSlide(prev => (prev + 1) % slides.length);
                      setSlideProgress(0);
                    }}
                    className="w-10 h-10 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 cursor-pointer transition-colors backdrop-blur"
                    title="Slide Berikutnya"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </section>

            {/* TRUST BAR / CLIENT LOGO STRIP (INSTITUTIONAL TIER-1) */}
            <section className="py-8 bg-slate-900 border-b border-slate-800">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="text-xs font-mono tracking-wider text-slate-400 uppercase">
                    {locale === 'id' ? 'Dipercaya Institusi & Regulator Nasional:' : 'Trusted by Tier-1 Institutions & Regulators:'}
                  </div>
                  <div className="flex flex-wrap items-center gap-8 text-slate-300 font-semibold text-xs">
                    {clients.map(c => (
                      <div key={c.id} className="flex items-center gap-2 hover:text-white transition-colors">
                        <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                        <span>{c.name}</span>
                        <span className="text-[10px] font-mono text-slate-500">({c.sector})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* STATS STRIP */}
            <section className="py-16 bg-slate-50 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs">
                    <div className="text-4xl font-bold text-slate-900 tabular-nums tracking-tight mb-2">99.99%</div>
                    <div className="text-sm font-semibold text-slate-800 mb-1">{locale === 'id' ? 'Ketersediaan SLA' : 'SLA Availability'}</div>
                    <div className="text-xs text-slate-500">Core Banking & Payment Gateway</div>
                  </div>
                  <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs">
                    <div className="text-4xl font-bold text-slate-900 tabular-nums tracking-tight mb-2">140+</div>
                    <div className="text-sm font-semibold text-slate-800 mb-1">{locale === 'id' ? 'Implementasi Enterprise' : 'Enterprise Engagements'}</div>
                    <div className="text-xs text-slate-500">Sektor Finansial & Industri</div>
                  </div>
                  <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs">
                    <div className="text-4xl font-bold text-slate-900 tabular-nums tracking-tight mb-2">&lt; 18ms</div>
                    <div className="text-sm font-semibold text-slate-800 mb-1">{locale === 'id' ? 'Rerata Latensi P99' : 'P99 Latency SLA'}</div>
                    <div className="text-xs text-slate-500">Kafka Streaming Clusters</div>
                  </div>
                  <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs">
                    <div className="text-4xl font-bold text-slate-900 tabular-nums tracking-tight mb-2">ISO 27001</div>
                    <div className="text-sm font-semibold text-slate-800 mb-1">{locale === 'id' ? 'Sertifikasi Kepatuhan' : 'Certified Standard'}</div>
                    <div className="text-xs text-slate-500">Amanat UU PDP & BSSN</div>
                  </div>
                </div>
              </div>
            </section>

            {/* SERVICES PREVIEW BENTO GRID */}
            <section className="py-24 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                      {locale === 'id' ? 'Pilar Kapabilitas Inti' : 'Core Disciplines'}
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                      {locale === 'id' ? 'Arsitektur Rekayasa Skala Misi Kritis' : 'Mission-Critical Engineering Disciplines'}
                    </h2>
                  </div>
                  <button
                    onClick={() => navigateTo('services')}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900 hover:text-blue-700 cursor-pointer"
                  >
                    <span>{locale === 'id' ? 'Semua Kapabilitas Layanan' : 'Full Architecture Catalog'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono font-semibold text-slate-400 mb-4">01.</div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        {locale === 'id' ? 'Modernisasi Cloud & Kubernetes' : 'Cloud Modernization & Kubernetes'}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {locale === 'id'
                          ? 'Dekomposisi sistem legacy monolitik perbankan menuju cluster Kubernetes multi-region yang berdaya tahan bencana.'
                          : 'Decoupling monolithic legacy core systems into resilient, auto-scaling Kubernetes clusters with disaster recovery.'}
                      </p>
                    </div>
                    <button
                      onClick={() => navigateTo('services')}
                      className="text-xs font-semibold text-slate-900 hover:text-blue-900 flex items-center gap-1 cursor-pointer pt-4 border-t border-slate-200"
                    >
                      {locale === 'id' ? 'Spesifikasi & Blueprint' : 'Technical Specifications'} &rarr;
                    </button>
                  </div>

                  <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono font-semibold text-slate-400 mb-4">02.</div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        {locale === 'id' ? 'Ketahanan Siber & Kepatuhan UU PDP' : 'Cyber Resilience & PDP Compliance'}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {locale === 'id'
                          ? 'Enkripsi zero-trust end-to-end, audit penetration testing mandiri, dan penegakan tata kelola data nasabah.'
                          : 'Zero-trust cryptographic policies, continuous vulnerability assessment, and statutory privacy compliance.'}
                      </p>
                    </div>
                    <button
                      onClick={() => navigateTo('services')}
                      className="text-xs font-semibold text-slate-900 hover:text-blue-900 flex items-center gap-1 cursor-pointer pt-4 border-t border-slate-200"
                    >
                      {locale === 'id' ? 'Spesifikasi & Blueprint' : 'Technical Specifications'} &rarr;
                    </button>
                  </div>

                  <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono font-semibold text-slate-400 mb-4">03.</div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        {locale === 'id' ? 'Pipeline Data & Otomasi Cerdas' : 'High-Throughput Data Streaming'}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {locale === 'id'
                          ? 'Pemrosesan streaming transaksi finansial miliaran event per hari berbasis Apache Kafka dan ClickHouse.'
                          : 'Real-time event streaming architectures processing billions of transactions per day.'}
                      </p>
                    </div>
                    <button
                      onClick={() => navigateTo('services')}
                      className="text-xs font-semibold text-slate-900 hover:text-blue-900 flex items-center gap-1 cursor-pointer pt-4 border-t border-slate-200"
                    >
                      {locale === 'id' ? 'Spesifikasi & Blueprint' : 'Technical Specifications'} &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* CASE STUDIES BENTO */}
            <section className="py-24 bg-slate-900 text-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-2xl mb-16">
                  <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3">
                    {locale === 'id' ? 'Studi Kasus Pembuktian' : 'Verified Case Studies'}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                    {locale === 'id' ? 'Hasil Terukur Pada Skala Transaksi Nasional' : 'Measurable Impact on National Systems'}
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="p-8 lg:p-10 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono text-slate-400 mb-3">SEKTOR PERBANKAN NASIONAL</div>
                      <h3 className="text-2xl font-bold mb-4">
                        Migrasi Core Banking 12 Juta Nasabah Tanpa Interupsi Transaksi
                      </h3>
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-6">
                        <div className="text-xs text-slate-400 mb-1">Hasil Terverifikasi</div>
                        <div className="text-2xl font-bold text-emerald-400 tabular-nums">
                          62% Reduksi Latensi Transaksi
                        </div>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Konsolidasi database multiregion dan implementasi Kafka event sourcing dengan tingkat failover di bawah 3 detik tanpa kehilangan konsistensi ACID.
                      </p>
                    </div>
                  </div>

                  <div className="p-8 lg:p-10 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono text-slate-400 mb-3">KONGLOMERASI LOGISTIK & RANTAI PASOK</div>
                      <h3 className="text-2xl font-bold mb-4">
                        Otomatisasi Logistik 40 Titik Pergudangan Terintegrasi
                      </h3>
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-6">
                        <div className="text-xs text-slate-400 mb-1">Hasil Terverifikasi</div>
                        <div className="text-2xl font-bold text-emerald-400 tabular-nums">
                          34% Efisiensi Biaya Operasional Cloud
                        </div>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Visibilitas inventaris real-time menggunakan edge IoT telemetry dan cluster database terdistribusi ClickHouse berlatensi rendah.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-24 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-2xl mb-16">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                    {locale === 'id' ? 'Pernyataan Kemitraan' : 'Executive Testimonials'}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                    {locale === 'id' ? 'Diakui Oleh Pimpinan Teknologi Indonesia' : 'Endorsed by Enterprise Leaders'}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
                    <p className="text-slate-700 text-base leading-relaxed italic mb-8">
                      &ldquo;PT Nusantara Solusi Prima merevolusi ketahanan sistem transaksi kami. Saat lonjakan beban akhir tahun, arsitektur yang dibangun beroperasi tanpa kendala dengan latensi di bawah 20ms.&rdquo;
                    </p>
                    <div className="pt-4 border-t border-slate-200">
                      <div className="font-bold text-slate-900 text-sm">Ir. Hendra Gunawan</div>
                      <div className="text-xs text-slate-500">Chief Technology Officer, Bank Mega Ventura</div>
                    </div>
                  </div>

                  <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
                    <p className="text-slate-700 text-base leading-relaxed italic mb-8">
                      &ldquo;Kepatuhan terhadap standar keamanan siber dan pemahaman regulasi perbankan Indonesia yang mereka miliki berada di level tertinggi. Kolaborasi profesional dengan transparansi penuh.&rdquo;
                    </p>
                    <div className="pt-4 border-t border-slate-200">
                      <div className="font-bold text-slate-900 text-sm">Maya Kartika, M.Sc.</div>
                      <div className="text-xs text-slate-500">Head of Information Security, Logistik Nusantara Raya</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-24 bg-slate-50 border-b border-slate-200">
              <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">
                    {locale === 'id' ? 'Pertanyaan Mengenai Rekayasa Sistem' : 'Enterprise Architecture FAQ'}
                  </h2>
                  <p className="text-slate-600 text-sm">
                    {locale === 'id' ? 'Transparansi standar keamanan, metodologi integrasi, dan pemenuhan regulasi.' : 'In-depth answers regarding systems confidentiality, SLAs, and data sovereignty.'}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <button
                      onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span className="text-base">Bagaimana jaminan keamanan dan kerahasiaan data nasabah?</span>
                      {activeFaq === 0 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                    </button>
                    {activeFaq === 0 && (
                      <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        Kami menerapkan standar sertifikasi ISO 27001 dan enkripsi end-to-end AES-256 baik in-transit maupun at-rest. Seluruh proses diaudit secara independen dan tunduk pada NDA ketat serta regulasi UU PDP.
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <button
                      onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span className="text-base">Apakah solusi arsitektur dapat diintegrasikan dengan database on-premises legacy?</span>
                      {activeFaq === 1 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                    </button>
                    {activeFaq === 1 && (
                      <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        Ya, keahlian utama kami meliputi konektivitas hybrid-cloud, menjembatani cluster cloud modern dengan basis data mainframe on-premises melalui tunnel IPsec dedicated dan proxy terenkripsi.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ============================================================ */}
        {/* 2. HALAMAN TENTANG KAMI / ABOUT US SEPARATE PAGE             */}
        {/* ============================================================ */}
        {currentPage === 'about' && (
          <div className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
                <button onClick={() => navigateTo('home')} className="hover:text-slate-900 cursor-pointer">
                  {locale === 'id' ? 'Beranda' : 'Home'}
                </button>
                <span>/</span>
                <span className="text-slate-900 font-semibold">{locale === 'id' ? 'Tentang Kami' : 'About Us'}</span>
              </div>

              {/* Header Title */}
              <div className="max-w-3xl mb-16">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  {locale === 'id' ? 'Profil & Integritas Perusahaan' : 'Corporate Profile & Governance'}
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                  {locale === 'id'
                    ? 'Dedikasi Rekayasa untuk Ketahanan Infrastruktur Nasional'
                    : 'Engineering Excellence for National Infrastructure Resilience'}
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {locale === 'id'
                    ? 'Didirikan di Jakarta, PT Nusantara Solusi Prima berkembang menjadi firma rekayasa sistem enterprise terpercaya yang mendampingi perbankan, konglomerasi manufaktur, dan institusi publik dalam mengatasi tantangan arsitektur digital paling kompleks.'
                    : 'Established in Jakarta, PT Nusantara Solusi Prima has emerged as Indonesia’s foremost enterprise systems engineering consultancy, empowering critical institutions with resilient infrastructure.'}
                </p>
              </div>

              {/* Sejarah 10 Tahun Timeline */}
              <div className="mb-20 p-8 md:p-12 bg-slate-50 rounded-2xl border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">
                  {locale === 'id' ? 'Tonggak Sejarah & Jejak Prestasi (2014 - 2026)' : 'Key Historical Milestones (2014 - 2026)'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <div className="font-mono text-lg font-bold text-blue-900 mb-1">2014</div>
                    <div className="font-bold text-slate-900 mb-2">Pendirian Firma di SCBD</div>
                    <p className="text-slate-600 leading-relaxed">Dimulai oleh 4 mantan VP arsitektur perbankan untuk memenuhi kebutuhan sistem finansial lokal.</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <div className="font-mono text-lg font-bold text-blue-900 mb-1">2018</div>
                    <div className="font-bold text-slate-900 mb-2">Sertifikasi ISO 27001</div>
                    <p className="text-slate-600 leading-relaxed">Menjadi konsultan arsitektur cloud pertama di Indonesia yang lolos audit keamanan komprehensif.</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <div className="font-mono text-lg font-bold text-blue-900 mb-1">2022</div>
                    <div className="font-bold text-slate-900 mb-2">Ekspansi 100+ Proyek</div>
                    <p className="text-slate-600 leading-relaxed">Dipercaya menangani core banking multiregion untuk 3 bank BUMN terbesar.</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <div className="font-mono text-lg font-bold text-blue-900 mb-1">2026</div>
                    <div className="font-bold text-slate-900 mb-2">Pusat SOC & Zero-Trust</div>
                    <p className="text-slate-600 leading-relaxed">Meluncurkan lab kepatuhan UU PDP dan automated microservices monitoring nasional.</p>
                  </div>
                </div>
              </div>

              {/* Jajaran Pimpinan & Eksekutif */}
              <div className="mb-20">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                      {locale === 'id' ? 'Dewan Pimpinan' : 'Leadership'}
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">
                      {locale === 'id' ? 'Dewan Pimpinan Rekayasa & Konsultan Utama' : 'Executive Engineering Leadership'}
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {executives.map(exec => (
                    <div
                      key={exec.id}
                      onClick={() => setSelectedExec(exec)}
                      className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg mb-4">
                          {exec.avatarInitials}
                        </div>
                        <h3 className="font-bold text-slate-900 text-base">{exec.name}</h3>
                        <div className="text-xs text-blue-900 font-semibold mb-2">{locale === 'id' ? exec.titleId : exec.titleEn}</div>
                        <div className="text-[11px] text-slate-500 font-mono mb-3">{exec.credentials}</div>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {locale === 'id' ? exec.bioId : exec.bioEn}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-200 mt-4 flex items-center justify-between text-xs text-blue-900 font-semibold">
                        <span>Lihat Profil Lengkap</span>
                        <span>&rarr;</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legalitas & Kepatuhan */}
              <div className="p-8 bg-slate-900 text-white rounded-2xl">
                <h3 className="text-xl font-bold mb-6">Legalitas & Kepatuhan Tata Kelola Korporat</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300 font-mono">
                  <div>
                    <div className="text-slate-400 mb-1">Nomor Induk Berusaha (NIB)</div>
                    <div className="font-bold text-white text-sm">9120008819201</div>
                  </div>
                  <div>
                    <div className="text-slate-400 mb-1">Akreditasi Keamanan Siber</div>
                    <div className="font-bold text-white text-sm">ISO/IEC 27001:2022 Certified</div>
                  </div>
                  <div>
                    <div className="text-slate-400 mb-1">Audit Kepatuhan Perlindungan Data</div>
                    <div className="font-bold text-white text-sm">UU No. 27/2022 (UU PDP) Compliant</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Bio Modal */}
            {selectedExec && (
              <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-lg w-full p-8 border border-slate-200">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
                        {selectedExec.avatarInitials}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{selectedExec.name}</h3>
                        <div className="text-xs text-blue-900 font-semibold">{locale === 'id' ? selectedExec.titleId : selectedExec.titleEn}</div>
                      </div>
                    </div>
                    <button onClick={() => setSelectedExec(null)} className="text-slate-400 hover:text-slate-900 text-xs font-bold px-2 py-1 cursor-pointer">
                      ✕
                    </button>
                  </div>
                  <div className="text-xs text-slate-500 font-mono mb-4">{selectedExec.credentials}</div>
                  <p className="text-sm text-slate-700 leading-relaxed mb-6">{locale === 'id' ? selectedExec.bioId : selectedExec.bioEn}</p>
                  {selectedExec.quoteId && (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 italic mb-6">
                      &ldquo;{locale === 'id' ? selectedExec.quoteId : selectedExec.quoteEn}&rdquo;
                    </div>
                  )}
                  <button onClick={() => setSelectedExec(null)} className="w-full py-2.5 bg-slate-900 text-white rounded text-xs font-semibold cursor-pointer">
                    Tutup Profil
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* 3. HALAMAN LAYANAN + SOLUTION ESTIMATOR CALCULATOR           */}
        {/* ============================================================ */}
        {currentPage === 'services' && (
          <div className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
                <button onClick={() => navigateTo('home')} className="hover:text-slate-900 cursor-pointer">
                  {locale === 'id' ? 'Beranda' : 'Home'}
                </button>
                <span>/</span>
                <span className="text-slate-900 font-semibold">{locale === 'id' ? 'Layanan Rekayasa' : 'Services'}</span>
              </div>

              <div className="max-w-3xl mb-16">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  {locale === 'id' ? 'Solusi Komprehensif' : 'Engineering Capabilities'}
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                  {locale === 'id' ? 'Layanan Rekayasa Arsitektur Enterprise' : 'Enterprise Systems Architecture & Security'}
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Dari perancangan blueprint cluster Kubernetes, pengujian penetrasi siber, hingga integrasi data streaming berlatensi rendah.
                </p>
              </div>

              {/* INTERACTIVE SOLUTION SCOPE ESTIMATOR TOOL */}
              <div className="mb-20 p-8 md:p-12 bg-slate-900 text-white rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
                  <Calculator className="w-4 h-4" />
                  <span>Kalkulator Estimasi Lingkup Arsitektur</span>
                </div>
                <h2 className="text-2xl font-bold mb-8">
                  Konfigurasikan Kebutuhan Infrastruktur Korporasi Anda
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-xs">
                  {/* Scope Selector */}
                  <div>
                    <label className="block text-slate-400 uppercase font-mono mb-3">1. Lingkup Solusi</label>
                    <div className="space-y-2">
                      {[
                        { id: 'cloud', label: 'Modernisasi Cloud & K8s' },
                        { id: 'security', label: 'Zero-Trust & Audit UU PDP' },
                        { id: 'data', label: 'Kafka Data Pipelines' },
                        { id: 'full', label: 'Full Enterprise Suite' },
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => setCalcScope(item.id as any)}
                          className={`w-full p-3 rounded-lg text-left transition-colors cursor-pointer border ${calcScope === item.id ? 'bg-blue-900 border-blue-500 text-white font-bold' : 'bg-slate-950 border-slate-800 text-slate-300'}`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scale Selector */}
                  <div>
                    <label className="block text-slate-400 uppercase font-mono mb-3">2. Skala Beban Transaksi</label>
                    <div className="space-y-2">
                      {[
                        { id: 'regional', label: 'Regional Hub (< 10 Juta Transaksi/Hari)' },
                        { id: 'national', label: 'Skala Nasional (10 - 50 Juta TPS/Hari)' },
                        { id: 'global', label: 'Multi-Region Global Tier (> 50 Juta TPS)' },
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => setCalcScale(item.id as any)}
                          className={`w-full p-3 rounded-lg text-left transition-colors cursor-pointer border ${calcScale === item.id ? 'bg-blue-900 border-blue-500 text-white font-bold' : 'bg-slate-950 border-slate-800 text-slate-300'}`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Estimated Recommendation Output */}
                  <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="text-slate-400 uppercase font-mono text-[10px] mb-1">Rekomendasi Arsitektur</div>
                      <div className="text-xl font-bold text-emerald-400 mb-3">
                        {calcScale === 'global' ? 'Multi-Region Active-Active Topologi' : 'Geo-Distributed Kubernetes Cluster'}
                      </div>
                      <div className="space-y-2 text-slate-300 text-[11px] mb-6">
                        <div>&bull; Target SLA Uptime: <strong>99.99% Guaranteed</strong></div>
                        <div>&bull; Benchmark P99 Latency: <strong>&lt; 15ms Interconnect</strong></div>
                        <div>&bull; Estimasi Waktu Delivery: <strong>{calcSpeed === 'accelerated' ? '60 Hari Kerja' : '90-120 Hari'}</strong></div>
                      </div>
                    </div>

                    <button
                      onClick={() => navigateTo('contact')}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-colors cursor-pointer text-xs uppercase tracking-wider"
                    >
                      Minta Penawaran Resmi & Blueprint &rarr;
                    </button>
                  </div>
                </div>
              </div>

              {/* Service Cards */}
              <div className="space-y-8">
                <div className="p-8 md:p-12 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8">
                    <div className="text-xs font-mono font-semibold text-slate-400 mb-2">01. CAPABILITY</div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                      {locale === 'id' ? 'Modernisasi Cloud & Kubernetes Cluster' : 'Cloud & Kubernetes Cluster Modernization'}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      Membongkar dependensi monolitik kaku menjadi arsitektur microservices yang terisolasi aman. Kami mendesain topologi Kubernetes auto-scaling dengan service mesh (Istio), automated deployment Canary, dan failover multi-data center di Indonesia.
                    </p>
                  </div>
                  <div className="lg:col-span-4 p-6 bg-white rounded-xl border border-slate-200">
                    <div className="text-xs text-slate-500 mb-1">Target SLA</div>
                    <div className="text-3xl font-bold text-slate-900 tabular-nums mb-4">99.99%</div>
                    <button
                      onClick={() => navigateTo('contact')}
                      className="w-full py-2.5 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 cursor-pointer"
                    >
                      {locale === 'id' ? 'Ajukan Asesmen' : 'Request Assessment'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 4. HALAMAN LIST BLOG & ARTIKEL                               */}
        {/* ============================================================ */}
        {currentPage === 'blog' && (
          <div className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
                <button onClick={() => navigateTo('home')} className="hover:text-slate-900 cursor-pointer">
                  {locale === 'id' ? 'Beranda' : 'Home'}
                </button>
                <span>/</span>
                <span className="text-slate-900 font-semibold">{locale === 'id' ? 'Blog & Riset' : 'Insights'}</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-3">
                    {locale === 'id' ? 'Publikasi & Riset Arsitektur Terkini' : 'Engineering Publications & Research'}
                  </h1>
                  <p className="text-slate-600 text-sm max-w-xl">
                    Analisis mendalam mengenai strategi modernisasi sistem enterprise, keamanan data perbankan, dan studi kasus kinerja.
                  </p>
                </div>

                {/* Filter & Search */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder={locale === 'id' ? 'Cari artikel...' : 'Search insights...'}
                      value={blogSearch}
                      onChange={e => setBlogSearch(e.target.value)}
                      className="pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-slate-500 w-48"
                    />
                  </div>
                  <select
                    value={blogFilter}
                    onChange={e => setBlogFilter(e.target.value)}
                    className="px-3 py-2 text-xs border border-slate-200 rounded-md bg-white focus:outline-none cursor-pointer"
                  >
                    <option value="all">{locale === 'id' ? 'Semua Kategori' : 'All Topics'}</option>
                    <option value="Enterprise">Transformasi Enterprise</option>
                    <option value="Keamanan">Keamanan Siber</option>
                    <option value="Pipeline">Pipeline Data</option>
                  </select>
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts
                  .filter(p => blogFilter === 'all' || p.category.includes(blogFilter))
                  .filter(p => !blogSearch || p.titleId.toLowerCase().includes(blogSearch.toLowerCase()))
                  .map(post => (
                    <article
                      key={post.id}
                      onClick={() => {
                        setSelectedPostId(post.id);
                        navigateTo('blog-detail');
                      }}
                      className="group bg-slate-50 rounded-2xl border border-slate-200 hover:border-slate-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
                    >
                      <div>
                        {/* Featured Post Image */}
                        <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                          <img
                            src={post.imageUrl || '/src/assets/images/hero_corporate_hq_1791790377198.jpg'}
                            alt={locale === 'id' ? post.titleId : post.titleEn}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-amber-400 border border-slate-700">
                            {post.category}
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                            <span>{post.publishedAt}</span>
                            <span>·</span>
                            <span>{post.readingTimeMins} min read</span>
                          </div>
                          <h2 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-900 leading-snug line-clamp-2">
                            {locale === 'id' ? post.titleId : post.titleEn}
                          </h2>
                          <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                            {locale === 'id' ? post.excerptId : post.excerptEn}
                          </p>
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-slate-900">
                        <span className="text-slate-500 truncate max-w-[150px]">Oleh: {post.author.split(',')[0]}</span>
                        <span className="text-blue-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          {locale === 'id' ? 'Baca Lengkap' : 'Read Article'} &rarr;
                        </span>
                      </div>
                    </article>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 5. HALAMAN DETAIL BLOG DENGAN INTERACTIVE COMMENTS           */}
        {/* ============================================================ */}
        {currentPage === 'blog-detail' && currentPost && (
          <div className="py-16 md:py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-8">
                <button onClick={() => navigateTo('home')} className="hover:text-slate-900 cursor-pointer">
                  {locale === 'id' ? 'Beranda' : 'Home'}
                </button>
                <span>/</span>
                <button onClick={() => navigateTo('blog')} className="hover:text-slate-900 cursor-pointer">
                  {locale === 'id' ? 'Blog & Riset' : 'Insights'}
                </button>
                <span>/</span>
                <span className="text-slate-900 font-semibold truncate max-w-xs">
                  {locale === 'id' ? currentPost.titleId : currentPost.titleEn}
                </span>
              </div>

              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-blue-900">{currentPost.category}</span>
                  <span>·</span>
                  <span>Dipublikasikan: {currentPost.publishedAt}</span>
                  <span>·</span>
                  <span>{currentPost.readingTimeMins} Menit Baca</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
                  {locale === 'id' ? currentPost.titleId : currentPost.titleEn}
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed font-medium pb-6 border-b border-slate-200">
                  {locale === 'id' ? currentPost.excerptId : currentPost.excerptEn}
                </p>
              </div>

              {/* Featured Image Hero Banner */}
              {currentPost.imageUrl && (
                <div className="mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                  <img
                    src={currentPost.imageUrl}
                    alt={locale === 'id' ? currentPost.titleId : currentPost.titleEn}
                    className="w-full h-72 sm:h-96 object-cover"
                  />
                  <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>Dokumentasi Riset Arsitektur Sistem Enterprise</span>
                    <span className="font-mono text-slate-400">Status: Verified Research</span>
                  </div>
                </div>
              )}

              {/* Author & Share */}
              <div className="flex items-center justify-between py-4 border-b border-slate-200 mb-8 text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
                    {currentPost.author[0]}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{currentPost.author}</div>
                    <div className="text-[11px]">Principal Systems Architect</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Tautan artikel telah disalin ke clipboard Anda.');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Bagikan Artikel</span>
                </button>
              </div>

              {/* Table of Contents */}
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 mb-8 text-xs">
                <div className="font-bold text-slate-900 uppercase tracking-wider mb-3">Daftar Isi Publikasi</div>
                <ul className="space-y-2 text-slate-600">
                  <li>1. Konteks Bisnis & Integritas Operasional Perbankan</li>
                  <li>2. Arsitektur Replikasi Database Multi-Region Terdistribusi</li>
                  <li>3. Analisis Benchmark Failover & Mitigasi Risiko Latensi</li>
                  <li>4. Kepatuhan Regulasi Kedaulatan Data & Rekomendasi Teknis</li>
                </ul>
              </div>

              {/* Content Body */}
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-base">
                <p>{locale === 'id' ? currentPost.contentId : currentPost.contentEn}</p>
                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                  Analisis Arsitektur Berkinerja Tinggi
                </h2>
                <p>
                  Dalam pengujian beban puncak transaksi, sistem microservices yang diisolasi menggunakan cluster Kubernetes mandiri mampu menekan waktu latensi rata-rata dari 48ms menjadi di bawah 18ms. Hasil ini membuktikan bahwa decoupled architectures memberikan perlindungan maksimal terhadap potensi cascading failures pada level basis data utama.
                </p>
              </div>

              {/* COMMENTS SECTION */}
              <div className="mt-16 pt-8 border-t border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Diskusi Teknis ({comments.filter(c => c.postId === currentPost.id).length})
                </h3>

                <div className="space-y-4 mb-8">
                  {comments.filter(c => c.postId === currentPost.id).map(com => (
                    <div key={com.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-900">{com.name}</span>
                        <span className="text-slate-500">{com.createdAt}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{com.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Post New Comment */}
                <form onSubmit={e => handleAddComment(e, currentPost.id)} className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                  <div className="text-xs font-bold text-slate-900">Tambahkan Tanggapan / Pertanyaan Teknis</div>
                  {commentSent && (
                    <div className="p-2 bg-emerald-100 text-emerald-800 rounded text-xs">
                      Tanggapan Anda berhasil ditambahkan!
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <input
                      type="text"
                      required
                      placeholder="Nama Lengkap & Jabatan"
                      value={newCommentName}
                      onChange={e => setNewCommentName(e.target.value)}
                      className="px-3 py-2 bg-white border border-slate-200 rounded"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Perusahaan"
                      value={newCommentEmail}
                      onChange={e => setNewCommentEmail(e.target.value)}
                      className="px-3 py-2 bg-white border border-slate-200 rounded"
                    />
                  </div>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tuliskan komentar atau pertanyaan teknis terkait topik artikel ini..."
                    value={newCommentText}
                    onChange={e => setNewCommentText(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded"
                  />
                  <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-semibold cursor-pointer">
                    Kirimkan Tanggapan
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 6. HALAMAN LIST AGENDA ACARA / EVENTS SEPARATE PAGE          */}
        {/* ============================================================ */}
        {currentPage === 'events' && (
          <div className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
                <button onClick={() => navigateTo('home')} className="hover:text-slate-900 cursor-pointer">
                  {locale === 'id' ? 'Beranda' : 'Home'}
                </button>
                <span>/</span>
                <span className="text-slate-900 font-semibold">{locale === 'id' ? 'Agenda & Acara' : 'Events'}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-3">
                    {locale === 'id' ? 'Agenda & Pertemuan Eksekutif' : 'Executive Summits & Roundtables'}
                  </h1>
                  <p className="text-slate-600 text-sm">
                    Jadwal konferensi arsitektur sistem, forum keamanan siber, dan diskusi tertutup C-level.
                  </p>
                </div>

                <div className="flex items-center bg-slate-100 p-1 rounded-md border border-slate-200">
                  <button
                    onClick={() => setEventTab('upcoming')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${eventTab === 'upcoming' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    {locale === 'id' ? 'Mendatang' : 'Upcoming'}
                  </button>
                  <button
                    onClick={() => setEventTab('completed')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${eventTab === 'completed' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    {locale === 'id' ? 'Telah Selesai' : 'Completed'}
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {events
                  .filter(e => e.status === eventTab)
                  .map(evt => (
                    <div
                      key={evt.id}
                      onClick={() => {
                        setSelectedEventId(evt.id);
                        navigateTo('event-detail');
                      }}
                      className="group bg-slate-50 rounded-2xl border border-slate-200 hover:border-slate-400 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col md:flex-row gap-6 p-6 md:p-8"
                    >
                      {/* Event Banner Image */}
                      <div className="relative md:w-72 h-48 md:h-auto shrink-0 rounded-xl overflow-hidden bg-slate-900">
                        <img
                          src={evt.imageUrl || '/src/assets/images/executive_soc_boardroom_1792003166100.jpg'}
                          alt={locale === 'id' ? evt.titleId : evt.titleEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-emerald-400 border border-slate-700">
                          {evt.status === 'upcoming' ? 'Mendatang' : 'Selesai'}
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
                            <span className="flex items-center gap-1 font-semibold text-blue-900">
                              <Calendar className="w-3.5 h-3.5" />
                              {evt.startDatetime}
                            </span>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {locale === 'id' ? evt.locationId : evt.locationEn}
                            </span>
                          </div>
                          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-900 leading-snug">
                            {locale === 'id' ? evt.titleId : evt.titleEn}
                          </h2>
                          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                            {locale === 'id' ? evt.descriptionId : evt.descriptionEn}
                          </p>
                        </div>

                        <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between">
                          <span className="text-xs text-slate-500 font-mono">
                            Kapasitas: {evt.capacity || 200} Delegasi
                          </span>
                          <span className="text-xs font-semibold text-blue-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            {locale === 'id' ? 'Lihat Detail & Rundown' : 'View Rundown & Register'} &rarr;
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 7. HALAMAN DETAIL AGENDA & VIP PASS RESERVATION              */}
        {/* ============================================================ */}
        {currentPage === 'event-detail' && currentEvent && (
          <div className="py-16 md:py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-8">
                <button onClick={() => navigateTo('home')} className="hover:text-slate-900 cursor-pointer">
                  {locale === 'id' ? 'Beranda' : 'Home'}
                </button>
                <span>/</span>
                <button onClick={() => navigateTo('events')} className="hover:text-slate-900 cursor-pointer">
                  {locale === 'id' ? 'Agenda' : 'Events'}
                </button>
                <span>/</span>
                <span className="text-slate-900 font-semibold truncate max-w-xs">
                  {locale === 'id' ? currentEvent.titleId : currentEvent.titleEn}
                </span>
              </div>

              {/* Event Banner Image */}
              {currentEvent.imageUrl && (
                <div className="mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                  <img
                    src={currentEvent.imageUrl}
                    alt={locale === 'id' ? currentEvent.titleId : currentEvent.titleEn}
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </div>
              )}

              <div className="mb-8">
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-900 mb-2">
                  {currentEvent.status === 'upcoming' ? 'Agenda Mendatang · Pendaftaran Delegasi Terbuka' : 'Arsip Acara'}
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight mb-4">
                  {locale === 'id' ? currentEvent.titleId : currentEvent.titleEn}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-2 border-t border-slate-200">
                  <span className="flex items-center gap-1 font-semibold text-slate-900">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    {currentEvent.startDatetime}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    {locale === 'id' ? currentEvent.locationId : currentEvent.locationEn}
                  </span>
                </div>
              </div>

              {/* Event Description & Rundown */}
              <div className="space-y-8 py-8 border-y border-slate-200 text-slate-700 text-sm leading-relaxed mb-8">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 mb-3">Gambaran Acara & Tujuan</h2>
                  <p>{locale === 'id' ? currentEvent.descriptionId : currentEvent.descriptionEn}</p>
                </div>

                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 text-xs uppercase tracking-wider">
                    Struktur Rundown Diskusi
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-4">
                      <span className="font-mono font-bold text-slate-500 shrink-0">09:00 - 10:30</span>
                      <div>Keynote: Menavigasi Ketahanan Transaksi Perbankan Skala Nasional Menuju Zero Downtime</div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="font-mono font-bold text-slate-500 shrink-0">10:45 - 12:30</span>
                      <div>Panel Ahli: Mitigasi Ransomware & Kepatuhan Tata Kelola UU Perlindungan Data Pribadi</div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="font-mono font-bold text-slate-500 shrink-0">13:30 - 15:30</span>
                      <div>Studi Kasus Teknis: Arsitektur Kafka Streaming dan Failover Database Multiregion</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delegate Registration Modal Trigger & Confirmation */}
              {registeredTicket ? (
                <div className="p-8 bg-slate-950 text-white rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                    <div className="text-xs font-mono text-emerald-400 font-bold uppercase">
                      VIP Delegate Pass Confirmed
                    </div>
                    <div className="font-mono text-xs text-slate-400">Code: {registeredTicket.ticketCode}</div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{registeredTicket.fullName}</h3>
                  <div className="text-xs text-slate-300 mb-4">
                    {registeredTicket.jobTitle} &bull; {registeredTicket.companyName}
                  </div>
                  <p className="text-xs text-slate-400">
                    Konfirmasi undangan dan ID pass telah diteruskan ke email resmi: {registeredTicket.corporateEmail}. Mohon tunjukkan kode pass ini di meja registrasi.
                  </p>
                </div>
              ) : currentEvent.status === 'upcoming' ? (
                <div className="p-8 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-lg font-bold">Daftarkan Delegasi Perusahaan Anda</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Kuota terbatas untuk Chief Technology Officer, Head of IT, dan Lead Enterprise Architect.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsRegisteringEvent(true)}
                    className="px-6 py-3 bg-white text-slate-950 font-semibold text-xs rounded-md hover:bg-slate-100 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Daftar Sebagai Delegasi
                  </button>
                </div>
              ) : null}

              {/* Registration Modal */}
              {isRegisteringEvent && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl max-w-md w-full p-8 border border-slate-200">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                      <h3 className="text-lg font-bold text-slate-900">Registrasi Delegasi</h3>
                      <button onClick={() => setIsRegisteringEvent(false)} className="text-slate-400 hover:text-slate-900 text-xs font-bold cursor-pointer">
                        ✕
                      </button>
                    </div>
                    <form onSubmit={e => handleDelegateSubmit(e, currentEvent)} className="space-y-4 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap & Gelar *</label>
                        <input
                          type="text"
                          required
                          value={regName}
                          onChange={e => setRegName(e.target.value)}
                          placeholder="Nama Anda"
                          className="w-full px-3 py-2 border border-slate-200 rounded"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Email Perusahaan Resmi *</label>
                        <input
                          type="email"
                          required
                          value={regEmail}
                          onChange={e => setRegEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full px-3 py-2 border border-slate-200 rounded"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Nama Institusi / Perusahaan *</label>
                        <input
                          type="text"
                          required
                          value={regCompany}
                          onChange={e => setRegCompany(e.target.value)}
                          placeholder="PT..."
                          className="w-full px-3 py-2 border border-slate-200 rounded"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Jabatan / Posisi *</label>
                        <input
                          type="text"
                          required
                          value={regJobTitle}
                          onChange={e => setRegJobTitle(e.target.value)}
                          placeholder="CTO / Head of IT / Lead Architect"
                          className="w-full px-3 py-2 border border-slate-200 rounded"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Nomor Kontak WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          value={regPhone}
                          onChange={e => setRegPhone(e.target.value)}
                          placeholder="+62 8..."
                          className="w-full px-3 py-2 border border-slate-200 rounded"
                        />
                      </div>
                      <button type="submit" className="w-full py-2.5 bg-slate-900 text-white rounded font-bold cursor-pointer mt-4">
                        Konfirmasi & Terbitkan Pass VIP
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 8. HALAMAN KARIR & LOWONGAN KERJA                            */}
        {/* ============================================================ */}
        {currentPage === 'careers' && (
          <div className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
                <button onClick={() => navigateTo('home')} className="hover:text-slate-900 cursor-pointer">
                  {locale === 'id' ? 'Beranda' : 'Home'}
                </button>
                <span>/</span>
                <span className="text-slate-900 font-semibold">{locale === 'id' ? 'Peluang Karir' : 'Careers'}</span>
              </div>

              {/* Header */}
              <div className="max-w-3xl mb-16">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  {locale === 'id' ? 'Budaya Rekayasa & Karir' : 'Engineering Culture & Careers'}
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                  {locale === 'id'
                    ? 'Bangun Arsitektur Masa Depan Bersama Kami'
                    : 'Shape the Future of Mission-Critical Engineering'}
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {locale === 'id'
                    ? 'Kami mengundang arsitek sistem terdistribusi, spesialis keamanan siber, dan insinyur infrastruktur yang berorientasi pada ketelitian teknis, kepatuhan ketat, dan inovasi berdampak nyata.'
                    : 'Join a world-class team of distributed systems architects, cybersecurity practitioners, and data infrastructure engineers in Jakarta.'}
                </p>
              </div>

              {/* Department Filter Tabs */}
              <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
                {['all', 'Cloud Platform Engineering', 'Cyber Resilience & Threat Defense', 'Data Platforms & Intelligence'].map(dept => (
                  <button
                    key={dept}
                    onClick={() => setCareerDeptFilter(dept)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${careerDeptFilter === dept ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'}`}
                  >
                    {dept === 'all' ? 'Semua Departemen' : dept}
                  </button>
                ))}
              </div>

              {/* Open Positions List */}
              <div className="space-y-6">
                {careers
                  .filter(c => careerDeptFilter === 'all' || c.department === careerDeptFilter)
                  .map(job => (
                    <div
                      key={job.id}
                      onClick={() => {
                        setSelectedCareerId(job.id);
                        navigateTo('career-detail');
                      }}
                      className="p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                          <span className="font-semibold text-blue-900">{job.department}</span>
                          <span>·</span>
                          <span>{job.location}</span>
                          <span>·</span>
                          <span className="font-mono text-emerald-700 font-medium">{job.experienceLevel}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2 hover:text-blue-900">
                          {locale === 'id' ? job.titleId : job.titleEn}
                        </h2>
                        {job.salaryRange && (
                          <div className="text-xs font-mono font-semibold text-slate-700 mb-2">
                            Remunerasi: {job.salaryRange}
                          </div>
                        )}
                        <p className="text-sm text-slate-600 max-w-2xl line-clamp-2">
                          {locale === 'id' ? job.descriptionId : job.descriptionEn}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-3">
                        <span className="text-xs font-semibold text-blue-900 flex items-center gap-1">
                          {locale === 'id' ? 'Lihat Kualifikasi & Lamar' : 'View Scope & Apply'} &rarr;
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 9. HALAMAN DETAIL KARIR & FORMULIR UPLOAD CV LENGKAP        */}
        {/* ============================================================ */}
        {currentPage === 'career-detail' && currentCareer && (
          <div className="py-16 md:py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-8">
                <button onClick={() => navigateTo('home')} className="hover:text-slate-900 cursor-pointer">
                  {locale === 'id' ? 'Beranda' : 'Home'}
                </button>
                <span>/</span>
                <button onClick={() => navigateTo('careers')} className="hover:text-slate-900 cursor-pointer">
                  {locale === 'id' ? 'Karir' : 'Careers'}
                </button>
                <span>/</span>
                <span className="text-slate-900 font-semibold truncate max-w-xs">
                  {locale === 'id' ? currentCareer.titleId : currentCareer.titleEn}
                </span>
              </div>

              {/* Job Header */}
              <div className="mb-8">
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-900 mb-2">
                  {currentCareer.department} · {currentCareer.location}
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight mb-4">
                  {locale === 'id' ? currentCareer.titleId : currentCareer.titleEn}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pb-4 border-b border-slate-200">
                  <span>Tipe: <strong>{currentCareer.employmentType}</strong></span>
                  <span>·</span>
                  <span>Pengalaman: <strong>{currentCareer.experienceLevel}</strong></span>
                  <span>·</span>
                  <span>Remunerasi: <strong>{currentCareer.salaryRange || 'Kompetitif'}</strong></span>
                </div>
              </div>

              {/* Job Scope & Requirements */}
              <div className="space-y-8 text-sm text-slate-700 leading-relaxed mb-12">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 mb-3">Deskripsi Tanggung Jawab</h2>
                  <p>{locale === 'id' ? currentCareer.descriptionId : currentCareer.descriptionEn}</p>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900 mb-3">Kualifikasi Teknis</h2>
                  <ul className="space-y-2 list-disc list-inside">
                    {(locale === 'id' ? currentCareer.requirementsId : currentCareer.requirementsEn).map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900 mb-3">Benefit & Fasilitas</h2>
                  <ul className="space-y-2 list-disc list-inside">
                    {(locale === 'id' ? currentCareer.benefitsId : currentCareer.benefitsEn).map((ben, i) => (
                      <li key={i}>{ben}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FORMULIR LAMAR PEKERJAAN & UPLOAD CV */}
              <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    {locale === 'id' ? 'Kirimkan Lamaran & CV Anda' : 'Submit Application & Resume'}
                  </h2>
                  <p className="text-xs text-slate-600">
                    {locale === 'id'
                      ? 'Seluruh data pelamar disimpan aman di MySQL server lokal kami dan hanya ditinjau oleh tim talent acquisition kami.'
                      : 'All applicant records are safely encrypted in our internal MySQL database for confidential evaluation.'}
                  </p>
                </div>

                {applicationSubmitted ? (
                  <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      Lamaran Berhasil Diterima!
                    </h3>
                    <div className="font-mono text-xs text-blue-900 font-bold mb-3">
                      Nomor Pelacak Lamaran: {lastAppCode}
                    </div>
                    <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
                      CV dan berkas Anda telah tercatat pada database rekrutmen kami (Status: Pending Review). Tim talent acquisition kami akan menghubungi via email/telepon.
                    </p>
                    <button
                      onClick={() => setApplicationSubmitted(false)}
                      className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-semibold cursor-pointer"
                    >
                      Kirim Lamaran Posisi Lainnya
                    </button>
                  </div>
                ) : (
                  <form onSubmit={e => handleCareerApply(e, currentCareer)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-2">
                          Nama Lengkap *
                        </label>
                        <input
                          type="text"
                          required
                          value={applicantName}
                          onChange={e => setApplicantName(e.target.value)}
                          placeholder="Nama Lengkap Beserta Gelar"
                          className="w-full px-4 py-2.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:border-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-2">
                          Email Aktif *
                        </label>
                        <input
                          type="email"
                          required
                          value={applicantEmail}
                          onChange={e => setApplicantEmail(e.target.value)}
                          placeholder="email@domain.com"
                          className="w-full px-4 py-2.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:border-slate-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-2">
                          Nomor Telepon / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={applicantPhone}
                          onChange={e => setApplicantPhone(e.target.value)}
                          placeholder="+62 812..."
                          className="w-full px-4 py-2.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:border-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-2">
                          Profil LinkedIn (Opsional)
                        </label>
                        <input
                          type="url"
                          value={applicantLinkedin}
                          onChange={e => setApplicantLinkedin(e.target.value)}
                          placeholder="https://linkedin.com/in/..."
                          className="w-full px-4 py-2.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:border-slate-500"
                        />
                      </div>
                    </div>

                    {/* CV UPLOAD SIMULATION & VALIDATION */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        Unggah Berkas CV / Resume (PDF / DOCX) *
                      </label>
                      <div className="p-4 bg-white border border-dashed border-slate-300 rounded-xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <Upload className="w-5 h-5 text-slate-400 shrink-0" />
                          <div>
                            <div className="text-xs font-semibold text-slate-800">
                              {applicantCvName || 'Pilih file CV...'}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              Format: PDF atau DOCX (Maks. 5MB) &bull; Ukuran: {applicantCvSize}
                            </div>
                          </div>
                        </div>
                        <label className="px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold cursor-pointer hover:bg-slate-800">
                          Pilih Berkas
                          <input
                            type="file"
                            accept=".pdf,.docx,.doc"
                            className="hidden"
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setApplicantCvName(file.name);
                                setApplicantCvSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        Surat Pengantar / Cover Letter Singkat
                      </label>
                      <textarea
                        rows={4}
                        value={applicantCover}
                        onChange={e => setApplicantCover(e.target.value)}
                        placeholder="Ceritakan ringkasan pengalaman arsitektur sistem dan alasan ketertarikan Anda pada posisi ini..."
                        className="w-full px-4 py-2.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:border-slate-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      Kirimkan Berkas Lamaran Pekerjaan
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 10. HALAMAN KUSTOM (ELEMENTOR WORDPRESS STYLE BUILDER BODY)  */}
        {/* ============================================================ */}
        {currentPage === 'custom-page' && currentCustomPage && (
          <div className="py-12 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              {/* Custom Pages Switcher / Selector */}
              <div className="flex items-center gap-2 mb-8 p-1.5 bg-slate-100 rounded-lg border border-slate-200 overflow-x-auto">
                <span className="text-[11px] font-bold text-slate-500 uppercase px-2 shrink-0">Halaman Kustom:</span>
                {customPages.map(cp => (
                  <button
                    key={cp.id}
                    onClick={() => setSelectedCustomPageId(cp.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded whitespace-nowrap cursor-pointer transition-colors ${cp.id === selectedCustomPageId ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    {locale === 'id' ? cp.titleId : cp.titleEn}
                  </button>
                ))}
              </div>

              {/* Breadcrumb & Meta Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-200 text-xs">
                <div className="flex items-center gap-2 text-slate-500">
                  <button onClick={() => navigateTo('home')} className="hover:text-slate-900 cursor-pointer">
                    {locale === 'id' ? 'Beranda' : 'Home'}
                  </button>
                  <span>/</span>
                  <span className="text-slate-900 font-semibold font-mono">
                    /{locale === 'id' ? currentCustomPage.slugId : currentCustomPage.slugEn}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span><strong>SEO Focus:</strong> {currentCustomPage.focusKeyword}</span>
                  <span>&bull;</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold font-mono">
                    {currentCustomPage.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* ELEMENTOR-STYLE MODULAR BODY BLOCKS */}
              {currentCustomPage.blocks && currentCustomPage.blocks.length > 0 ? (
                <div className="space-y-16">
                  {currentCustomPage.blocks.map(block => {
                    // 1. HERO BLOCK
                    if (block.type === 'hero') {
                      return (
                        <div
                          key={block.id}
                          className="relative overflow-hidden rounded-3xl bg-slate-950 text-white min-h-[420px] flex items-center p-8 sm:p-14 shadow-2xl border border-slate-800"
                        >
                          {block.imageUrl && (
                            <img
                              src={block.imageUrl}
                              alt={block.title || ''}
                              className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none scale-105"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent pointer-events-none" />
                          <div className="relative z-10 max-w-3xl">
                            {block.badge && (
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-mono text-emerald-400 mb-4 backdrop-blur">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>{block.badge}</span>
                              </div>
                            )}
                            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight">
                              {block.title}
                            </h1>
                            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
                              {block.subtitle}
                            </p>
                            {block.buttonText && (
                              <button
                                onClick={() => navigateTo((block.buttonUrl as PageRoute) || 'contact')}
                                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-lg"
                              >
                                {block.buttonText} &rarr;
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    }

                    // 2. FEATURES 3-COLUMN BLOCK
                    if (block.type === 'features') {
                      return (
                        <div key={block.id} className="py-6">
                          <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{block.title}</h2>
                            <p className="text-sm text-slate-600">{block.subtitle}</p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {block.items?.map(it => (
                              <div
                                key={it.id}
                                className="p-8 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                              >
                                <div>
                                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center mb-6 shadow-md">
                                    <ShieldCheck className="w-6 h-6" />
                                  </div>
                                  <h3 className="font-bold text-slate-900 text-lg mb-3 leading-snug">{it.title}</h3>
                                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{it.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    // 3. STATS METRICS COUNTER BLOCK
                    if (block.type === 'stats') {
                      return (
                        <div key={block.id} className="p-8 sm:p-12 bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-xl">
                          <div className="text-center max-w-2xl mx-auto mb-10">
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">{block.title}</h2>
                            <p className="text-xs sm:text-sm text-slate-400">{block.subtitle}</p>
                          </div>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {block.items?.map(it => (
                              <div key={it.id} className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 text-center">
                                <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono mb-1">
                                  {it.value}
                                </div>
                                <div className="text-xs text-slate-300 font-medium">{it.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    // 4. MEDIA IMAGE SHOWCASE BLOCK
                    if (block.type === 'media') {
                      return (
                        <div key={block.id} className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900">
                          {block.imageUrl && (
                            <img src={block.imageUrl} alt={block.title || ''} className="w-full h-80 sm:h-96 object-cover" />
                          )}
                          {(block.title || block.subtitle) && (
                            <div className="p-6 sm:p-8 bg-white border-t border-slate-100">
                              <h3 className="font-bold text-slate-900 text-xl mb-1">{block.title}</h3>
                              <p className="text-xs sm:text-sm text-slate-600">{block.subtitle}</p>
                            </div>
                          )}
                        </div>
                      );
                    }

                    // 5. FAQ ACCORDION BLOCK
                    if (block.type === 'faq') {
                      return (
                        <div key={block.id} className="py-8 px-6 sm:px-12 bg-slate-50 rounded-3xl border border-slate-200">
                          <div className="text-center max-w-2xl mx-auto mb-10">
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{block.title}</h2>
                            <p className="text-xs sm:text-sm text-slate-600">{block.subtitle}</p>
                          </div>
                          <div className="max-w-3xl mx-auto space-y-4">
                            {block.items?.map((it, idx) => (
                              <div key={it.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
                                <div className="font-bold text-sm text-slate-900 mb-2 flex items-start gap-2.5">
                                  <HelpCircle className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                                  <span>{it.title}</span>
                                </div>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6.5">
                                  {it.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    // 6. CUSTOM FORM BLOCK (EMBEDDED)
                    if (block.type === 'custom-form') {
                      const activeForm = customForms.find(f => f.id === (block.formId || currentCustomPage.formId)) || embeddedCustomForm;
                      if (!activeForm) return null;
                      return (
                        <div key={block.id} className="p-8 sm:p-12 bg-slate-50 rounded-3xl border border-slate-200 shadow-sm max-w-3xl mx-auto">
                          <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">
                              {block.title || (locale === 'id' ? activeForm.titleId : activeForm.titleEn)}
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-600">
                              {block.subtitle || (locale === 'id' ? activeForm.descriptionId : activeForm.descriptionEn)}
                            </p>
                          </div>

                          {customFormSubmitted ? (
                            <div className="text-center py-8 bg-white rounded-2xl border border-slate-200">
                              <Check className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                              <div className="font-bold text-slate-900 text-base">Formulir Kustom Berhasil Disubmit!</div>
                              <div className="text-xs text-blue-900 font-mono font-bold mt-1">Kode: {lastCustomSubmissionCode}</div>
                              <div className="text-xs text-slate-500 mt-2">Data Anda telah masuk ke dashboard admin untuk diverifikasi.</div>
                              <button
                                onClick={() => setCustomFormSubmitted(false)}
                                className="mt-5 px-4 py-2 bg-slate-900 text-white rounded text-xs cursor-pointer font-semibold"
                              >
                                Kirim Form Baru
                              </button>
                            </div>
                          ) : (
                            <form
                              onSubmit={e => handleCustomFormSubmit(e, activeForm, currentCustomPage.slugId)}
                              className="space-y-4"
                            >
                              {activeForm.fields.map(field => (
                                <div key={field.id}>
                                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                    {locale === 'id' ? field.labelId : field.labelEn} {field.required && '*'}
                                  </label>

                                  {field.type === 'textarea' ? (
                                    <textarea
                                      required={field.required}
                                      rows={3}
                                      placeholder={locale === 'id' ? field.placeholderId : field.placeholderEn}
                                      value={customFormData[field.name] || ''}
                                      onChange={e => setCustomFormData({ ...customFormData, [field.name]: e.target.value })}
                                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:border-slate-500"
                                    />
                                  ) : field.type === 'select' ? (
                                    <select
                                      required={field.required}
                                      value={customFormData[field.name] || ''}
                                      onChange={e => setCustomFormData({ ...customFormData, [field.name]: e.target.value })}
                                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:border-slate-500"
                                    >
                                      <option value="">-- Pilih Opsi --</option>
                                      {field.options?.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                      ))}
                                    </select>
                                  ) : (
                                    <input
                                      type={field.type}
                                      required={field.required}
                                      placeholder={locale === 'id' ? field.placeholderId : field.placeholderEn}
                                      value={customFormData[field.name] || ''}
                                      onChange={e => setCustomFormData({ ...customFormData, [field.name]: e.target.value })}
                                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:border-slate-500"
                                    />
                                  )}
                                </div>
                              ))}

                              <button
                                type="submit"
                                className="w-full py-3.5 bg-slate-900 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors cursor-pointer"
                              >
                                Submit Formulir Kustom
                              </button>
                            </form>
                          )}
                        </div>
                      );
                    }

                    // 7. CTA BANNER BLOCK
                    if (block.type === 'cta') {
                      return (
                        <div
                          key={block.id}
                          className="py-14 px-8 sm:px-14 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl text-center shadow-xl border border-slate-800"
                        >
                          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-3">{block.title}</h2>
                          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
                            {block.subtitle}
                          </p>
                          <button
                            onClick={() => navigateTo((block.buttonUrl as PageRoute) || 'contact')}
                            className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-lg"
                          >
                            {block.buttonText || 'Hubungi Kami'} &rarr;
                          </button>
                        </div>
                      );
                    }

                    // 8. RICH TEXT BLOCK
                    if (block.type === 'rich-text') {
                      return (
                        <div key={block.id} className="max-w-4xl mx-auto prose prose-slate py-6">
                          {block.title && <h2 className="text-2xl font-bold text-slate-900 mb-4">{block.title}</h2>}
                          <p className="text-slate-700 text-base leading-relaxed">{block.content}</p>
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>
              ) : (
                /* Fallback standard view if no Elementor blocks configured */
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                    {locale === 'id' ? currentCustomPage.titleId : currentCustomPage.titleEn}
                  </h1>

                  <div className="prose prose-slate max-w-none text-slate-700 text-base leading-relaxed space-y-4 mb-12">
                    <p>{locale === 'id' ? currentCustomPage.contentId : currentCustomPage.contentEn}</p>
                  </div>

                  {/* EMBEDDED CUSTOM FORM RUNNER */}
                  {embeddedCustomForm && (
                    <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="mb-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-1">
                          {locale === 'id' ? embeddedCustomForm.titleId : embeddedCustomForm.titleEn}
                        </h2>
                        <p className="text-xs text-slate-600">
                          {locale === 'id' ? embeddedCustomForm.descriptionId : embeddedCustomForm.descriptionEn}
                        </p>
                      </div>

                      {customFormSubmitted ? (
                        <div className="text-center py-8 bg-white rounded-xl border border-slate-200">
                          <Check className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                          <div className="font-bold text-slate-900 text-sm">Formulir Kustom Berhasil Disubmit!</div>
                          <div className="text-xs text-blue-900 font-mono font-bold mt-1">Kode: {lastCustomSubmissionCode}</div>
                          <div className="text-xs text-slate-500 mt-1">Data Anda telah masuk ke dashboard admin untuk diverifikasi.</div>
                          <button
                            onClick={() => setCustomFormSubmitted(false)}
                            className="mt-4 px-3 py-1.5 bg-slate-900 text-white rounded text-xs cursor-pointer font-semibold"
                          >
                            Kirim Form Baru
                          </button>
                        </div>
                      ) : (
                        <form
                          onSubmit={e => handleCustomFormSubmit(e, embeddedCustomForm, currentCustomPage.slugId)}
                          className="space-y-4"
                        >
                          {embeddedCustomForm.fields.map(field => (
                            <div key={field.id}>
                              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                {locale === 'id' ? field.labelId : field.labelEn} {field.required && '*'}
                              </label>

                              {field.type === 'textarea' ? (
                                <textarea
                                  required={field.required}
                                  rows={3}
                                  placeholder={locale === 'id' ? field.placeholderId : field.placeholderEn}
                                  value={customFormData[field.name] || ''}
                                  onChange={e => setCustomFormData({ ...customFormData, [field.name]: e.target.value })}
                                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:border-slate-500"
                                />
                              ) : field.type === 'select' ? (
                                <select
                                  required={field.required}
                                  value={customFormData[field.name] || ''}
                                  onChange={e => setCustomFormData({ ...customFormData, [field.name]: e.target.value })}
                                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:border-slate-500"
                                >
                                  <option value="">-- Pilih Opsi --</option>
                                  {field.options?.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type={field.type}
                                  required={field.required}
                                  placeholder={locale === 'id' ? field.placeholderId : field.placeholderEn}
                                  value={customFormData[field.name] || ''}
                                  onChange={e => setCustomFormData({ ...customFormData, [field.name]: e.target.value })}
                                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:border-slate-500"
                                />
                              )}
                            </div>
                          ))}

                          <button
                            type="submit"
                            className="w-full py-3 bg-slate-900 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors cursor-pointer"
                          >
                            Submit Formulir Kustom
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 11. HALAMAN KONTAK KAMI & REGIONAL OFFICES                   */}
        {/* ============================================================ */}
        {currentPage === 'contact' && (
          <div className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
                <button onClick={() => navigateTo('home')} className="hover:text-slate-900 cursor-pointer">
                  {locale === 'id' ? 'Beranda' : 'Home'}
                </button>
                <span>/</span>
                <span className="text-slate-900 font-semibold">{locale === 'id' ? 'Kontak Kami' : 'Contact Us'}</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Office Directory */}
                <div className="lg:col-span-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                    {locale === 'id' ? 'Saluran Komunikasi Resmi' : 'Official Communications'}
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-6">
                    {locale === 'id' ? 'Hubungi Kantor Pusat SCBD' : 'Direct Institutional Contact'}
                  </h1>
                  <p className="text-slate-600 text-sm leading-relaxed mb-8">
                    Konsultasikan kebutuhan arsitektur sistem korporasi Anda langsung dengan Principal Architect kami. Seluruh komunikasi dilindungi NDA dan enkripsi keamanan.
                  </p>

                  <div className="space-y-6 text-sm text-slate-600">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <MapPin className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900">Kantor Pusat Jakarta (HQ & SOC)</div>
                        <div className="text-xs text-slate-500 mt-1 leading-relaxed">
                          Treasury Tower Lt. 32, SCBD District 8, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan 12190
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <Building className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900">Regional Tech Hub Surabaya & Singapore</div>
                        <div className="text-xs text-slate-500 mt-1 leading-relaxed">
                          Pakuwon Tower Lt. 18, Surabaya &bull; Marina Bay Financial Centre Tower 2, Singapore
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <Phone className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900">Telepon & WhatsApp Korporat</div>
                        <div className="text-xs text-slate-500 mt-1">
                          +62 21 5088 9200 (Hotline) &bull; +62 811 9876 5432 (WhatsApp)
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <Mail className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900">Email Resmi Zoho SMTP</div>
                        <div className="text-xs text-slate-500 mt-1">
                          contact@nusantaraprima.co.id
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Input */}
                <div className="lg:col-span-7">
                  <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
                    {contactSubmitted ? (
                      <div className="text-center py-12">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Check className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-1">
                          Pesan Anda Berhasil Terkirim!
                        </h2>
                        <div className="text-xs font-mono font-bold text-blue-900 mb-3">
                          Nomor Tiket: {lastTicketCode}
                        </div>
                        <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
                          Pesan telah tersimpan di database MySQL dan diteruskan ke Zoho Mail resmi. Tim konsultan kami akan menindaklanjuti dalam waktu 1x24 jam kerja.
                        </p>
                        <button
                          onClick={() => setContactSubmitted(false)}
                          className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-semibold cursor-pointer"
                        >
                          Kirim Pesan Lainnya
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-6">
                        <input
                          type="text"
                          name="website_url_check"
                          value={formHoneypot}
                          onChange={e => setFormHoneypot(e.target.value)}
                          className="hidden"
                          tabIndex={-1}
                          autoComplete="off"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-2">
                              Nama Lengkap *
                            </label>
                            <input
                              type="text"
                              required
                              value={formName}
                              onChange={e => setFormName(e.target.value)}
                              placeholder="Nama Anda"
                              className="w-full px-4 py-2.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:border-slate-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-2">
                              Email Perusahaan *
                            </label>
                            <input
                              type="email"
                              required
                              value={formEmail}
                              onChange={e => setFormEmail(e.target.value)}
                              placeholder="email@company.com"
                              className="w-full px-4 py-2.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:border-slate-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-2">
                              Nomor Telepon
                            </label>
                            <input
                              type="tel"
                              value={formPhone}
                              onChange={e => setFormPhone(e.target.value)}
                              placeholder="+62 8..."
                              className="w-full px-4 py-2.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:border-slate-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-2">
                              Subjek Kebutuhan *
                            </label>
                            <input
                              type="text"
                              required
                              value={formSubject}
                              onChange={e => setFormSubject(e.target.value)}
                              placeholder="Misal: Audit Kepatuhan UU PDP"
                              className="w-full px-4 py-2.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:border-slate-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-2">
                            Pesan Rincian Kebutuhan *
                          </label>
                          <textarea
                            required
                            rows={4}
                            value={formMessage}
                            onChange={e => setFormMessage(e.target.value)}
                            placeholder="Deskripsikan gambaran ruang lingkup proyek..."
                            className="w-full px-4 py-2.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:border-slate-500"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Kirim Pesan Resmi (Zoho SMTP)
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>

              {/* GOOGLE MAPS EMBED & SCBD TRANSIT HUB */}
              <div className="mt-16 pt-12 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                      {locale === 'id' ? 'Peta Kantor & Navigasi Presisi' : 'Geographic Map & Navigation'}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                      {locale === 'id' ? 'Lokasi Kantor Pusat SCBD Jakarta' : 'SCBD Jakarta Headquarters Map'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Treasury Tower Lt. 32, SCBD District 8, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan (Koordinat: -6.225588, 106.809712)
                    </p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Treasury+Tower+District+8+SCBD+Jakarta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{locale === 'id' ? 'Buka di Google Maps Langsung' : 'Open in Google Maps'}</span>
                  </a>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-xl bg-slate-900">
                  <iframe
                    title="Google Maps Treasury Tower SCBD"
                    src="https://maps.google.com/maps?q=Treasury%20Tower%2C%20District%208%20SCBD%20Jakarta&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="460"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-[400px] sm:h-[480px]"
                  />

                  {/* SCBD Location Detail Card */}
                  <div className="sm:absolute bottom-6 left-6 max-w-sm bg-slate-950/95 backdrop-blur-md text-white p-5 rounded-2xl border border-slate-700 shadow-2xl m-4 sm:m-0">
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold mb-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>SCBD FINANCIAL DISTRICT · LOT 28</span>
                    </div>
                    <div className="font-bold text-sm text-white">Treasury Tower, District 8</div>
                    <div className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Lantai 32, Jl. Jend. Sudirman Kav. 52-53, Senayan, Kebayoran Baru, Jakarta Selatan 12190
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-[11px] text-slate-400">
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-400 font-semibold">&bull; MRT Jakarta:</span>
                        <span>Stasiun Istora Mandiri (350m)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-400 font-semibold">&bull; TransJakarta:</span>
                        <span>Halte Senayan / Polda Metro</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-amber-400 font-semibold">&bull; Akses Parkir:</span>
                        <span>Valet & Basement B1-B4 District 8</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 12. HALAMAN PETA SITUS / SITEMAP XML (GOOGLE READY)         */}
        {/* ============================================================ */}
        {currentPage === 'sitemap' && (
          <div className="py-16 md:py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-8">
                <button onClick={() => navigateTo('home')} className="hover:text-slate-900 cursor-pointer">
                  {locale === 'id' ? 'Beranda' : 'Home'}
                </button>
                <span>/</span>
                <span className="text-slate-900 font-semibold">Peta Situs (Sitemap XML Google)</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-200">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold mb-3">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Google Search Console Sitemaps.org 0.9 Compliant</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-2">
                    Peta Situs & Indeks URL Google
                  </h1>
                  <p className="text-sm text-slate-600">
                    Struktur indeks hierarkis lengkap seluruh halaman website, artikel blog dinamis, agenda eksekutif, dan custom pages.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Buka File sitemap.xml</span>
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.origin + '/sitemap.xml');
                      alert('URL Google Sitemap telah disalin ke clipboard:\n' + window.location.origin + '/sitemap.xml');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin URL Sitemap</span>
                  </button>
                </div>
              </div>

              {/* Sitemap URL Directory Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Core Pages */}
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                    <h2 className="font-bold text-slate-900 text-base">Halaman Utama (Core Routes)</h2>
                    <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">Priority 0.80 - 1.00</span>
                  </div>
                  <ul className="space-y-3 text-xs">
                    {[
                      { name: 'Beranda Utama (Home)', url: '/', prio: '1.00', freq: 'daily', action: () => navigateTo('home') },
                      { name: 'Tentang Kami (About Us)', url: '/about', prio: '0.85', freq: 'weekly', action: () => navigateTo('about') },
                      { name: 'Layanan Arsitektur (Services)', url: '/services', prio: '0.90', freq: 'weekly', action: () => navigateTo('services') },
                      { name: 'Peluang Karir & Lowongan', url: '/careers', prio: '0.85', freq: 'weekly', action: () => navigateTo('careers') },
                      { name: 'Kontak Kantor Pusat & Maps', url: '/contact', prio: '0.80', freq: 'monthly', action: () => navigateTo('contact') },
                    ].map((pg, i) => (
                      <li key={i} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 hover:border-blue-400 transition-colors">
                        <div>
                          <div className="font-bold text-slate-900 cursor-pointer hover:text-blue-900" onClick={pg.action}>
                            {pg.name}
                          </div>
                          <div className="text-[11px] font-mono text-slate-500 mt-0.5">{pg.url}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] font-mono font-bold text-blue-900">P: {pg.prio}</div>
                          <div className="text-[10px] text-slate-400">{pg.freq}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dynamic Blog Posts */}
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                    <h2 className="font-bold text-slate-900 text-base">Publikasi Riset & Blog ({posts.length})</h2>
                    <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">Priority 0.80</span>
                  </div>
                  <ul className="space-y-3 text-xs">
                    {posts.map(post => (
                      <li
                        key={post.id}
                        onClick={() => {
                          setSelectedPostId(post.id);
                          navigateTo('blog-detail');
                        }}
                        className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 hover:border-blue-400 transition-colors cursor-pointer"
                      >
                        <div className="max-w-[280px]">
                          <div className="font-bold text-slate-900 truncate hover:text-blue-900">{post.titleId}</div>
                          <div className="text-[11px] font-mono text-blue-700 mt-0.5">/blog/{post.slugId}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-[10px] font-mono font-bold text-blue-900">P: 0.80</div>
                          <div className="text-[10px] text-slate-400">{post.publishedAt}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Agenda & Summits */}
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                    <h2 className="font-bold text-slate-900 text-base">Agenda & Pertemuan Eksekutif ({events.length})</h2>
                    <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">Priority 0.80</span>
                  </div>
                  <ul className="space-y-3 text-xs">
                    {events.map(evt => (
                      <li
                        key={evt.id}
                        onClick={() => {
                          setSelectedEventId(evt.id);
                          navigateTo('event-detail');
                        }}
                        className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 hover:border-blue-400 transition-colors cursor-pointer"
                      >
                        <div className="max-w-[280px]">
                          <div className="font-bold text-slate-900 truncate hover:text-blue-900">{evt.titleId}</div>
                          <div className="text-[11px] font-mono text-blue-700 mt-0.5">/events/{evt.slugId}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-[10px] font-mono font-bold text-blue-900">P: 0.80</div>
                          <div className="text-[10px] text-slate-400 font-semibold text-emerald-700">{evt.status}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Custom Pages */}
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                    <h2 className="font-bold text-slate-900 text-base">Halaman Kustom Elementor ({customPages.length})</h2>
                    <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">Priority 0.85</span>
                  </div>
                  <ul className="space-y-3 text-xs">
                    {customPages.map(cp => (
                      <li
                        key={cp.id}
                        onClick={() => {
                          setSelectedCustomPageId(cp.id);
                          navigateTo('custom-page');
                        }}
                        className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 hover:border-blue-400 transition-colors cursor-pointer"
                      >
                        <div className="max-w-[280px]">
                          <div className="font-bold text-slate-900 truncate hover:text-blue-900">{cp.titleId}</div>
                          <div className="text-[11px] font-mono text-blue-700 mt-0.5">/p/{cp.slugId}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-[10px] font-mono font-bold text-blue-900">P: 0.85</div>
                          <div className="text-[10px] text-slate-400">{cp.publishedAt}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Raw XML Preview */}
              <div className="p-6 bg-slate-950 text-slate-200 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div className="flex items-center gap-2 font-mono text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Format XML Resmi Sitemaps Schema 0.9 (Google Search Console Valid)</span>
                  </div>
                  <button
                    onClick={() => {
                      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${window.location.origin}/</loc><priority>1.00</priority></url>\n</urlset>`;
                      navigator.clipboard?.writeText(xml);
                      alert('XML sitemap telah disalin ke clipboard.');
                    }}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-[11px] cursor-pointer"
                  >
                    Salin XML
                  </button>
                </div>
                <pre className="p-4 bg-slate-900 rounded-xl text-[11px] font-mono overflow-x-auto text-cyan-300 leading-relaxed border border-slate-800">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Routes -->
  <url>
    <loc>${window.location.origin}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>${window.location.origin}/about</loc>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>${window.location.origin}/services</loc>
    <changefreq>weekly</changefreq>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>${window.location.origin}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>${window.location.origin}/careers</loc>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>${window.location.origin}/sitemap</loc>
    <changefreq>monthly</changefreq>
    <priority>0.50</priority>
  </url>
</urlset>`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* QUIET LUXURY FOOTER */}
      <footer className="py-16 bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
            <div className="md:col-span-5">
              <div className="text-lg font-bold text-white mb-2">PT Nusantara Solusi Prima</div>
              <div className="text-xs text-amber-400 font-mono mb-4">Enterprise Systems Architecture · Indonesia</div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-6">
                Firma rekayasa arsitektur sistem enterprise, ketahanan siber, dan infrastruktur cloud terdistribusi bersertifikasi ISO 27001 dan berkepatuhan UU PDP.
              </p>
              <div className="text-xs text-slate-500">
                SCBD District 8, Treasury Tower Lt. 32, Jakarta Selatan 12190
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">
                Halaman Website
              </div>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => navigateTo('home')} className="hover:text-white cursor-pointer">Beranda</button></li>
                <li><button onClick={() => navigateTo('about')} className="hover:text-white cursor-pointer">Tentang Kami</button></li>
                <li><button onClick={() => navigateTo('services')} className="hover:text-white cursor-pointer">Layanan Rekayasa</button></li>
                <li><button onClick={() => navigateTo('blog')} className="hover:text-white cursor-pointer">Blog & Riset</button></li>
                <li><button onClick={() => navigateTo('events')} className="hover:text-white cursor-pointer">Agenda Acara</button></li>
                <li><button onClick={() => navigateTo('careers')} className="hover:text-white cursor-pointer">Peluang Karir</button></li>
                <li><button onClick={() => navigateTo('custom-page')} className="hover:text-white cursor-pointer">Halaman Kustom</button></li>
                <li><button onClick={() => navigateTo('contact')} className="hover:text-white cursor-pointer">Kontak Kami</button></li>
                <li><button onClick={() => navigateTo('sitemap')} className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer">Peta Situs (Sitemap XML)</button></li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">
                Pusat Kendali CMS
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Kelola slide hero beranda, halaman kustom, lamaran karir & unduh CV, custom form submissions, balasan email Zoho SMTP, serta audit SEO on-page.
              </p>
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-white rounded hover:bg-slate-100 transition-colors cursor-pointer font-sans"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Masuk ke Admin Panel</span>
              </button>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>&copy; {new Date().getFullYear()} PT Nusantara Solusi Prima. Seluruh Hak Cipta Dilindungi Undang-Undang.</div>
            <div className="flex items-center gap-4">
              <span>ISO/IEC 27001 Certified</span>
              <span>·</span>
              <span>UU Perlindungan Data Pribadi (UU PDP)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
