// User Types
export interface User {
  id: string;
  email: string;
  role: 'sponsor' | 'filmmaker' | 'admin';
  createdAt: Date;
}

export interface Sponsor extends User {
  companyName: string;
  businessRegNo?: string;
  phone: string;
  industryCategory: string;
  verified: boolean;
  profileImage?: string;
  website?: string;
  bio?: string;
}

export interface Filmmaker extends User {
  fullName: string;
  nicNumber?: string;
  studentId?: string;
  filmmakerRole: 'director' | 'producer' | 'student' | 'independent';
  pastWorks: string[]; // URLs to portfolio (YouTube, Vimeo, etc)
  verified: boolean;
  profileImage?: string;
  bio?: string;
}

// Project Types
export interface FilmProject {
  id: string;
  filmmakerIds: string[]; // Can have multiple filmmakers
  title: string;
  synopsis: string;
  genre: string;
  budget: number;
  sponsorshipNeeded: number;
  currentFunding: number;
  status: 'draft' | 'active' | 'funded' | 'in_production' | 'completed';
  scriptSummary: string;
  pitchDeckUrl?: string;
  teaserUrl?: string;
  moodBoardUrl?: string;
  expectedAudience: string;
  releasePlatforms: string[]; // Cinema, YouTube, OTT, etc
  expectedReleaseDate: Date;
  sponsorshipPackages: SponsorshipPackage[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SponsorshipPackage {
  id: string;
  name: 'gold' | 'silver' | 'bronze' | 'custom';
  amount: number;
  benefits: string[];
  logoPlacement: boolean;
  productPlacement: boolean;
  socialMediaMentions: number;
  creditSize: string; // Small, Medium, Large
}

export interface SponsorshipApplication {
  id: string;
  projectId: string;
  sponsorId: string;
  sponsorshipPackageId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  amount: number;
  applicationDate: Date;
  responseDate?: Date;
  agreementUrl?: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
}

// Message Types
export interface Message {
  id: string;
  fromUserId: string;
  toUserId: string;
  projectId?: string;
  subject: string;
  content: string;
  attachments?: string[];
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Rating/Review Types
export interface Review {
  id: string;
  fromUserId: string;
  toUserId: string;
  projectId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
}

// Analytics Types
export interface ProjectAnalytics {
  projectId: string;
  views: number;
  applicationCount: number;
  fundingRaised: number;
  fundingPercentage: number;
  sponsorExposureMetrics: {
    socialMediaReach: number;
    projectPageViews: number;
    expectedCinemaExposure: number;
  };
}
