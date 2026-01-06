/**
 * TypeScript Type Definitions for Nature Frontend
 * Centralized type definitions for the entire application
 */

// ============================================================================
// User & Authentication Types
// ============================================================================

export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

// ============================================================================
// Project Types
// ============================================================================

export interface Project {
  id: string;
  _id?: string;
  name: string;
  description: string;
  fullDescription?: string;
  category: string;
  image?: string;
  images?: ProjectImage[];
  videoUrl?: string;
  videoThumbnailUrl?: string;
  raisedAmount?: number;
  raised?: number;
  targetAmount?: number;
  target?: number;
  endDate?: string;
  activePeriod?: {
    start: string;
    end: string;
  };
  investorsCount?: number;
  backersCount?: number;
  backersAvatars?: string[];
  rewards?: Reward[];
  subheadings?: ProjectSection[];
  companyName?: string;
  companyDescription?: string;
  companyWebsite?: string;
  updates?: ProjectUpdate[];
  updatesCount?: number;
  documents?: ProjectDocument[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectImage {
  url: string;
  alt?: string;
}

export interface ProjectSection {
  title: string;
  content: string;
}

export interface ProjectUpdate {
  id?: string;
  title: string;
  date: string;
  content: string;
}

export interface ProjectDocument {
  id?: string;
  name: string;
  url: string;
  type?: string;
  size?: number;
}

export interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  fetchProject: (id: string) => Promise<void>;
  createProject: (project: Partial<Project>) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

// ============================================================================
// Reward Types
// ============================================================================

export interface Reward {
  id: string;
  title: string;
  description: string;
  pledgeAmount: number;
  backersCount?: number;
  itemsLeft?: number | null;
  isOutOfStock?: boolean;
}

// ============================================================================
// Investment Types
// ============================================================================

export interface Investment {
  id: string;
  projectId: string;
  projectName?: string;
  amount: number;
  rewardId?: string;
  status: 'draft' | 'pending' | 'signed' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
}

export interface InvestmentFormData {
  projectId: string;
  amount: number;
  rewardId?: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  agreedToTerms: boolean;
}

// ============================================================================
// Component Props Types
// ============================================================================

export interface HeaderProps {
  logoUrl?: string;
  logoAlt?: string;
  navigationLinks?: NavigationLink[];
  activeLinkPath?: string;
  onCreateProjectClick?: () => void;
  onUserIconClick?: () => void;
  user?: User | null;
  isAuthenticated?: boolean;
  className?: string;
}

export interface NavigationLink {
  path: string;
  label: string;
}

export interface FooterProps {
  logoUrl?: string;
  logoAlt?: string;
  companyInfo?: CompanyInfo;
  resourcesLinks?: NavigationLink[];
  legalLinks?: NavigationLink[];
  partners?: string[];
  className?: string;
}

export interface CompanyInfo {
  companyName?: string;
  registrationNumber?: string;
  address?: string;
  city?: string;
  country?: string;
}

export interface ProjectCardProps {
  project: Project;
  onCardClick?: (projectId: string) => void;
  className?: string;
}

export interface ExploreProjectsCardProps {
  project: TransformedProject;
  onCardClick?: (projectId: string) => void;
  className?: string;
}

export interface TransformedProject {
  id: string;
  image?: string;
  name: string;
  description: string;
  category: string;
  raisedAmount: number;
  targetAmount: number;
  progressPercentage: number;
  daysLeft: number;
}

export interface RewardCardProps {
  reward: Reward;
  onPledgeClick?: (rewardId: string, pledgeAmount: number) => void;
  className?: string;
}

export interface VideoLightboxProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  thumbnailAlt?: string;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  className?: string;
}

export interface FilterDropdownProps {
  label?: string;
  value: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
  icon?: React.ReactNode;
  className?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface OverviewStats {
  backersCount: number;
  backersAvatars: string[];
  goalAmount: number;
  raisedAmount: number;
  progressPercentage: number;
  daysLeft: number;
}

export interface OverviewTab {
  id: string;
  label: string;
  badge?: number;
}

export interface ProjectNavbarItem {
  id: string;
  label: string;
  active: boolean;
  onClick?: (id: string) => void;
}

export interface ProjectDetailsData {
  description?: string;
  images?: ProjectImage[];
  subheadings?: ProjectSection[];
}

// ============================================================================
// Page Props Types
// ============================================================================

export interface ExploreProjectsPageProps {
  headerProps?: HeaderProps;
  heroBackgroundImage?: string;
  heroTitle?: string;
  sortOptions?: SelectOption[];
  categoryOptions?: SelectOption[];
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSortChange?: (value: string) => void;
  onCategoryChange?: (value: string) => void;
  projects?: TransformedProject[];
  onProjectClick?: (projectId: string) => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
  footerProps?: FooterProps;
  className?: string;
}

export interface ProjectDetailPageProps {
  headerProps?: HeaderProps;
  heroBackgroundImage?: string;
  heroCategory?: string;
  heroTitle?: string;
  videoUrl?: string;
  videoThumbnailUrl?: string;
  onVideoOpen?: () => void;
  onVideoClose?: () => void;
  overviewStats?: OverviewStats;
  overviewTabs?: OverviewTab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  projectDetails?: ProjectDetailsData;
  rewards?: Reward[];
  onRewardPledgeClick?: (rewardId: string, pledgeAmount: number) => void;
  similarProjects?: TransformedProject[];
  onSimilarProjectClick?: (projectId: string) => void;
  onViewAllProjectsClick?: () => void;
  isLoggedIn?: boolean;
  projectNavbarItems?: ProjectNavbarItem[];
  companyDetails?: Partial<CompanyInfo & { name?: string; description?: string; website?: string }>;
  projectUpdates?: ProjectUpdate[];
  projectDocuments?: ProjectDocument[];
  footerProps?: FooterProps;
  className?: string;
}

// ============================================================================
// Common Component Props Types
// ============================================================================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
  className?: string;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
}

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

// ============================================================================
// Route Constants
// ============================================================================

export const ROUTES = {
  HOME: '/',
  PROJECTS: '/projects',
  PROJECT_DETAIL: (id: string) => `/projects/${id}`,
  PROJECT_ABOUT: (id: string) => `/projects/${id}/about`,
  PROJECT_UPDATES: (id: string) => `/projects/${id}/updates`,
  PROJECT_DOCUMENTS: (id: string) => `/projects/${id}/documents`,
  PROJECT_BACKERS: (id: string) => `/projects/${id}/backers`,
  CREATE_PROJECT: '/project/create',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  PROFILE: '/profile',
  PROFILE_INVESTMENTS: '/profile/investments',
  PROFILE_CAMPAIGNS: '/profile/campaigns',
  INVEST_STEP: (step: number) => `/invest/${step}`,
} as const;
