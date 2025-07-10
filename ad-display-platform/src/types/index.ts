export interface AdCampaign {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed';
  startDate: Date;
  endDate: Date;
  impressions: number;
  maxImpressions: number;
  locations: string[];
  budget: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DisplayLocation {
  id: string;
  name: string;
  type: 'truck' | 'bench' | 'billboard' | 'indoor';
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  pricePerHour: number;
  isAvailable: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  phone: string;
  balance: number;
  campaigns: AdCampaign[];
}

export interface ApprovalRequest {
  id: string;
  campaignId: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  submittedAt: Date;
  reviewedAt?: Date;
}

export interface CampaignFormData {
  title: string;
  description: string;
  mediaFile: File | null;
  startDate: string;
  endDate: string;
  maxImpressions: number;
  locations: string[];
  budget: number;
}