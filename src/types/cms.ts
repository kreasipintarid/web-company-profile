export type Locale = 'id' | 'en';

export type UserRole =
  | 'super-admin'
  | 'admin'
  | 'editor'
  | 'author'
  | 'seo-specialist'
  | 'analyst'
  | 'contact-manager';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  avatar?: string;
  department?: string;
  lastLogin?: string;
}

export interface ThemeConfig {
  id: number;
  name: string;
  isActive: boolean;
  colorPrimary: string;
  colorPrimaryHover: string;
  colorSecondary: string;
  colorSecondaryHover: string;
  colorBackground: string;
  colorSurface: string;
  colorText: string;
  colorHeading: string;
  colorBorder: string;
  colorCard: string;
  fontHeading: string;
  fontBody: string;
  accentVibe?: string;
}

export interface SlideItem {
  id: number;
  tagId: string;
  tagEn: string;
  titleId: string;
  titleEn: string;
  descId: string;
  descEn: string;
  ctaTextId: string;
  ctaTextEn: string;
  ctaUrl: string;
  imageUrl: string;
  badgeText?: string;
  order: number;
  isActive: boolean;
}

export interface ExecutiveBio {
  id: number;
  name: string;
  titleId: string;
  titleEn: string;
  credentials: string;
  bioId: string;
  bioEn: string;
  avatarInitials: string;
  linkedin: string;
  quoteId?: string;
  quoteEn?: string;
}

export interface ClientPartner {
  id: number;
  name: string;
  sector: string;
  tier: 'tier-1' | 'national' | 'enterprise';
  symbol: string;
}

export interface CommentItem {
  id: number;
  postId: number;
  name: string;
  email: string;
  comment: string;
  createdAt: string;
  status: 'approved' | 'pending';
}

export interface DelegateTicket {
  id: number;
  eventId: number;
  eventTitle: string;
  fullName: string;
  corporateEmail: string;
  companyName: string;
  jobTitle: string;
  phone: string;
  ticketCode: string;
  registeredAt: string;
  status: 'confirmed' | 'checked-in' | 'waitlist';
}

export interface PageSection {
  id: string;
  type: 'hero' | 'stats' | 'services' | 'bento' | 'testimonials' | 'faq' | 'cta' | 'contact';
  titleId: string;
  titleEn: string;
  isVisible: boolean;
  order: number;
  config: Record<string, any>;
}

export interface BlogPost {
  id: number;
  titleId: string;
  titleEn: string;
  slugId: string;
  slugEn: string;
  category: string;
  tags: string[];
  excerptId: string;
  excerptEn: string;
  contentId: string;
  contentEn: string;
  author: string;
  publishedAt: string;
  readingTimeMins: number;
  viewsCount: number;
  status: 'published' | 'draft';
  focusKeyword: string;
  metaDescId: string;
  metaDescEn: string;
  commentsCount?: number;
  imageUrl?: string;
}

export interface EventItem {
  id: number;
  titleId: string;
  titleEn: string;
  slugId: string;
  slugEn: string;
  locationId: string;
  locationEn: string;
  startDatetime: string;
  status: 'upcoming' | 'completed';
  registrationUrl: string;
  descriptionId: string;
  descriptionEn: string;
  viewsCount: number;
  capacity?: number;
  registeredCount?: number;
  speakers?: Array<{ name: string; role: string }>;
  imageUrl?: string;
}

export interface ContactMessage {
  id: number;
  ticketNumber: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'spam';
  createdAt: string;
  locale: Locale;
  replies?: Array<{
    id: number;
    subject: string;
    message: string;
    sentAt: string;
    user: string;
  }>;
  internalNotes?: string[];
}

export interface MenuItem {
  id: number;
  labelId: string;
  labelEn: string;
  urlId: string;
  urlEn: string;
  order: number;
  target?: string;
  submenu?: MenuItem[];
}

export interface MediaItem {
  id: number;
  filename: string;
  url: string;
  fileSizeBytes: number;
  mimeType: string;
  altId: string;
  altEn: string;
  uploadedAt: string;
  usageCount: number;
  category?: 'hero' | 'blog' | 'careers' | 'documents';
}

export interface SeoAuditResult {
  score: number;
  wordCount: number;
  keyword: string;
  density: number;
  issues: string[];
  recommendations: string[];
  passed: string[];
}

export type PageRoute =
  | 'home'
  | 'about'
  | 'services'
  | 'blog'
  | 'blog-detail'
  | 'events'
  | 'event-detail'
  | 'careers'
  | 'career-detail'
  | 'contact'
  | 'custom-page'
  | 'sitemap';

export interface CareerItem {
  id: number;
  titleId: string;
  titleEn: string;
  slugId: string;
  slugEn: string;
  department: string;
  location: string;
  employmentType: 'Full-time' | 'Contract' | 'Part-time';
  experienceLevel: string;
  descriptionId: string;
  descriptionEn: string;
  requirementsId: string[];
  requirementsEn: string[];
  benefitsId: string[];
  benefitsEn: string[];
  salaryRange?: string;
  isActive: boolean;
  postedAt: string;
}

export interface JobApplication {
  id: number;
  applicationCode: string;
  careerId: number;
  careerTitle: string;
  fullName: string;
  email: string;
  phone: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  resumeFileName: string;
  resumeFileSize?: string;
  coverLetter?: string;
  status: 'pending' | 'reviewed' | 'interview' | 'accepted' | 'rejected';
  submittedAt: string;
  internalNotes?: string;
}

export interface CustomFormField {
  id: string;
  name: string;
  labelId: string;
  labelEn: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'file';
  required: boolean;
  placeholderId?: string;
  placeholderEn?: string;
  options?: string[];
}

export interface CustomForm {
  id: number;
  formKey: string;
  titleId: string;
  titleEn: string;
  descriptionId?: string;
  descriptionEn?: string;
  fields: CustomFormField[];
  isActive: boolean;
}

export interface CustomFormSubmission {
  id: number;
  submissionCode: string;
  formId: number;
  formTitle: string;
  pageSlug: string;
  data: Record<string, string>;
  submittedAt: string;
  ipAddress: string;
  status: 'new' | 'processed' | 'archived';
}

export type ElementorBlockType =
  | 'hero'
  | 'rich-text'
  | 'features'
  | 'media'
  | 'stats'
  | 'cta'
  | 'faq'
  | 'custom-form'
  | 'map';

export interface ElementorBlockItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  value?: string;
  label?: string;
}

export interface ElementorBlock {
  id: string;
  type: ElementorBlockType;
  title?: string;
  subtitle?: string;
  content?: string;
  badge?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
  bgColor?: 'white' | 'slate-50' | 'slate-900' | 'navy';
  items?: ElementorBlockItem[];
  formId?: number;
  mapQuery?: string;
}

export interface CustomPage {
  id: number;
  titleId: string;
  titleEn: string;
  slugId: string;
  slugEn: string;
  contentId: string;
  contentEn: string;
  formId?: number; // Optional embedded custom form
  status: 'published' | 'draft';
  focusKeyword: string;
  metaDescId: string;
  metaDescEn: string;
  publishedAt: string;
  template?: 'standard' | 'fullwidth' | 'split';
  blocks?: ElementorBlock[]; // Elementor-like modular visual blocks
}

