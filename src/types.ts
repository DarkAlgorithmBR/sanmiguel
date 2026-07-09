export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  timestamp: string;
  device: string;
  status: 'new' | 'contacted' | 'converted';
}

export interface Comment {
  id: string;
  author: string;
  username: string;
  rating: number;
  content: string;
  timestamp: string;
  avatarUrl?: string;
  isVerified?: boolean;
}

export interface LandingPageConfig {
  headline: string;
  subheadline: string;
  urgencyBannerText: string;
  urgencyHours: number; // dynamically calculated expiration
  vslType: 'simulated' | 'embed';
  videoUrl: string; // fallback or real mp4
  embedCode: string; // iframe embed
  buttonText: string;
  requirePhone: boolean;
  theme: 'navy' | 'mystic' | 'emerald' | 'gold' | 'minimal';
  viewerCountStart: number;
  formDelaySeconds: number; // after video starts playing
  formShowOption: 'always' | 'delayed' | 'after_video';
  redirectUrl: string; // where to redirect after form submission
}
