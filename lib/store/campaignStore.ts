import { create } from 'zustand';

export type CampaignStatus = 'active' | 'pending' | 'rejected' | 'completed';

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  budget: number;
  spent: number;
  views: number;
  clicks: number;
  locations: string[];
  mediaType: 'image' | 'video';
  mediaUrl?: string;
  showCount: number;
  advertiserName?: string;
  advertiserEmail?: string;
  submittedAt?: string;
}

interface CampaignStore {
  campaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, 'id' | 'spent' | 'views' | 'clicks'>) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  approveCampaign: (id: string) => void;
  rejectCampaign: (id: string) => void;
}

export const useCampaignStore = create<CampaignStore>((set) => ({
  campaigns: [
    {
      id: '1',
      name: 'Летняя распродажа',
      description: 'Скидки до 50% на всю летнюю коллекцию',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-01-30',
      startTime: '09:00',
      endTime: '21:00',
      budget: 50000,
      spent: 23500,
      views: 125000,
      clicks: 3200,
      locations: ['Центр города', 'Торговые центры'],
      mediaType: 'image',
      showCount: 5000,
      advertiserName: 'Иван Петров',
      advertiserEmail: 'ivan@store.ru',
    },
    {
      id: '2',
      name: 'Новый продукт',
      description: 'Представляем новую линейку продуктов',
      status: 'pending',
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      startTime: '10:00',
      endTime: '20:00',
      budget: 30000,
      spent: 0,
      views: 0,
      clicks: 0,
      locations: ['Бизнес-центры'],
      mediaType: 'video',
      showCount: 3000,
      advertiserName: 'Мария Сидорова',
      advertiserEmail: 'maria@company.ru',
      submittedAt: new Date().toISOString(),
    },
  ],

  addCampaign: (campaignData) =>
    set((state) => ({
      campaigns: [
        ...state.campaigns,
        {
          ...campaignData,
          id: Date.now().toString(),
          spent: 0,
          views: 0,
          clicks: 0,
          status: 'pending',
          submittedAt: new Date().toISOString(),
        },
      ],
    })),

  updateCampaign: (id, updates) =>
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, ...updates } : campaign
      ),
    })),

  deleteCampaign: (id) =>
    set((state) => ({
      campaigns: state.campaigns.filter((campaign) => campaign.id !== id),
    })),

  approveCampaign: (id) =>
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, status: 'active' } : campaign
      ),
    })),

  rejectCampaign: (id) =>
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, status: 'rejected' } : campaign
      ),
    })),
}))