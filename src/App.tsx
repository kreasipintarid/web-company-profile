import React, { useState, useEffect } from 'react';
import {
  Locale,
  UserRole,
  ThemeConfig,
  PageSection,
  BlogPost,
  EventItem,
  ContactMessage,
  MenuItem,
  MediaItem,
  CareerItem,
  JobApplication,
  CustomPage,
  CustomForm,
  CustomFormSubmission,
  SlideItem,
  ExecutiveBio,
  ClientPartner,
  User,
} from './types/cms';
import {
  INITIAL_THEMES,
  INITIAL_USERS,
  INITIAL_SECTIONS,
  INITIAL_POSTS,
  INITIAL_EVENTS,
  INITIAL_CONTACTS,
  INITIAL_MENUS,
  INITIAL_MEDIA,
  INITIAL_CAREERS,
  INITIAL_APPLICATIONS,
  INITIAL_CUSTOM_PAGES,
  INITIAL_CUSTOM_FORMS,
  INITIAL_CUSTOM_FORM_SUBMISSIONS,
  INITIAL_SLIDES,
  INITIAL_EXECUTIVES,
  INITIAL_CLIENTS,
} from './data/initialData';
import { PublicWebsite } from './components/public/PublicWebsite';
import { AdminPanel } from './components/admin/AdminPanel';
import { SourceCodeExporter } from './components/exporter/SourceCodeExporter';
import { ArchitectureBlueprint } from './components/architecture/ArchitectureBlueprint';
import { Globe, Shield, Download, FileText, Monitor, Check } from 'lucide-react';

export default function App() {
  // Navigation View Modes
  type ViewMode = 'public' | 'admin' | 'exporter' | 'blueprint';
  const [viewMode, setViewMode] = useState<ViewMode>('public');

  // Application State
  const [locale, setLocale] = useState<Locale>('id');
  const [currentRole, setCurrentRole] = useState<UserRole>('super-admin');
  const [themes, setThemes] = useState<ThemeConfig[]>(INITIAL_THEMES);
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(INITIAL_THEMES[0]);
  const [slides, setSlides] = useState<SlideItem[]>(INITIAL_SLIDES);
  const [executives, setExecutives] = useState<ExecutiveBio[]>(INITIAL_EXECUTIVES);
  const [clients, setClients] = useState<ClientPartner[]>(INITIAL_CLIENTS);
  const [sections, setSections] = useState<PageSection[]>(INITIAL_SECTIONS);
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [contacts, setContacts] = useState<ContactMessage[]>(INITIAL_CONTACTS);
  const [careers, setCareers] = useState<CareerItem[]>(INITIAL_CAREERS);
  const [applications, setApplications] = useState<JobApplication[]>(INITIAL_APPLICATIONS);
  const [customPages, setCustomPages] = useState<CustomPage[]>(INITIAL_CUSTOM_PAGES);
  const [customForms, setCustomForms] = useState<CustomForm[]>(INITIAL_CUSTOM_FORMS);
  const [customSubmissions, setCustomSubmissions] = useState<CustomFormSubmission[]>(INITIAL_CUSTOM_FORM_SUBMISSIONS);
  const [menus, setMenus] = useState<MenuItem[]>(INITIAL_MENUS);
  const [media, setMedia] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);

  // Apply CSS Variables to Document Root dynamically when theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', currentTheme.colorPrimary);
    root.style.setProperty('--color-primary-hover', currentTheme.colorPrimaryHover);
    root.style.setProperty('--color-secondary', currentTheme.colorSecondary);
    root.style.setProperty('--color-background', currentTheme.colorBackground);
    root.style.setProperty('--color-surface', currentTheme.colorSurface);
    root.style.setProperty('--color-text', currentTheme.colorText);
    root.style.setProperty('--color-heading', currentTheme.colorHeading);
    root.style.setProperty('--color-border', currentTheme.colorBorder);
    root.style.setProperty('--color-card', currentTheme.colorCard);
  }, [currentTheme]);

  const handleAddContact = (newContact: Omit<ContactMessage, 'id' | 'createdAt' | 'ticketNumber'>) => {
    const created: ContactMessage = {
      ...newContact,
      id: Date.now(),
      ticketNumber: `TKT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
    };
    setContacts(prev => [created, ...prev]);
  };

  const handleAddApplication = (newApp: Omit<JobApplication, 'id' | 'submittedAt'>) => {
    const created: JobApplication = {
      ...newApp,
      id: Date.now(),
      submittedAt: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
    };
    setApplications(prev => [created, ...prev]);
  };

  const handleAddCustomSubmission = (newSub: Omit<CustomFormSubmission, 'id' | 'submittedAt'>) => {
    const created: CustomFormSubmission = {
      ...newSub,
      id: Date.now(),
      submittedAt: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
    };
    setCustomSubmissions(prev => [created, ...prev]);
  };

  const handleThemeChange = (theme: ThemeConfig) => {
    setCurrentTheme(theme);
    setThemes(prev => prev.map(t => ({ ...t, isActive: t.id === theme.id })));
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans">
      {/* Top Application Mode Bar */}
      <div className="bg-slate-950 text-slate-300 border-b border-slate-800 text-xs px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 shrink-0 z-50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-white tracking-tight">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>CMS Studio Engine</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline text-[11px]">
            Native PHP 8.2 & MySQL · XAMPP Compatible
          </span>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('public')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors ${viewMode === 'public' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Website Publik</span>
          </button>

          <button
            onClick={() => setViewMode('admin')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors ${viewMode === 'admin' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Panel</span>
            {contacts.filter(c => c.status === 'unread').length > 0 && (
              <span className="w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {contacts.filter(c => c.status === 'unread').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setViewMode('exporter')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors ${viewMode === 'exporter' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>File PHP & XAMPP (.ZIP)</span>
          </button>

          <button
            onClick={() => setViewMode('blueprint')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors ${viewMode === 'blueprint' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Rancangan Arsitektur</span>
          </button>
        </div>
      </div>

      {/* Main View Display */}
      <div className="flex-1">
        {viewMode === 'public' && (
          <PublicWebsite
            locale={locale}
            onLocaleChange={setLocale}
            theme={currentTheme}
            slides={slides}
            executives={executives}
            clients={clients}
            sections={sections}
            posts={posts}
            events={events}
            careers={careers}
            applications={applications}
            onAddApplication={handleAddApplication}
            customPages={customPages}
            customForms={customForms}
            onAddCustomSubmission={handleAddCustomSubmission}
            menus={menus}
            onAddContact={handleAddContact}
            onOpenAdmin={() => setViewMode('admin')}
          />
        )}

        {viewMode === 'admin' && (
          <AdminPanel
            currentRole={currentRole}
            onRoleChange={setCurrentRole}
            themes={themes}
            currentTheme={currentTheme}
            onThemeChange={handleThemeChange}
            slides={slides}
            onUpdateSlides={setSlides}
            executives={executives}
            onUpdateExecutives={setExecutives}
            clients={clients}
            onUpdateClients={setClients}
            sections={sections}
            onUpdateSections={setSections}
            posts={posts}
            onUpdatePosts={setPosts}
            events={events}
            onUpdateEvents={setEvents}
            contacts={contacts}
            onUpdateContacts={setContacts}
            careers={careers}
            onUpdateCareers={setCareers}
            applications={applications}
            onUpdateApplications={setApplications}
            customPages={customPages}
            onUpdateCustomPages={setCustomPages}
            customForms={customForms}
            onUpdateCustomForms={setCustomForms}
            customSubmissions={customSubmissions}
            onUpdateCustomSubmissions={setCustomSubmissions}
            menus={menus}
            onUpdateMenus={setMenus}
            media={media}
            onUpdateMedia={setMedia}
            users={users}
            onUpdateUsers={setUsers}
            onBackToPublic={() => setViewMode('public')}
            onOpenExporter={() => setViewMode('exporter')}
          />
        )}

        {viewMode === 'exporter' && (
          <SourceCodeExporter
            onBackToAdmin={() => setViewMode('admin')}
            onBackToPublic={() => setViewMode('public')}
          />
        )}

        {viewMode === 'blueprint' && (
          <ArchitectureBlueprint
            onGoToPublic={() => setViewMode('public')}
            onGoToAdmin={() => setViewMode('admin')}
            onGoToExporter={() => setViewMode('exporter')}
          />
        )}
      </div>
    </div>
  );
}
