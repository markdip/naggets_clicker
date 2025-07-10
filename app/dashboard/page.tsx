'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Plus, 
  Eye, 
  Calendar,
  MapPin,
  DollarSign,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Monitor,
  ArrowUpRight,
  Filter
} from 'lucide-react';

type CampaignStatus = 'active' | 'pending' | 'rejected' | 'completed';

interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  views: number;
  clicks: number;
  locations: string[];
  mediaType: 'image' | 'video';
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Летняя распродажа',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-01-30',
    budget: 50000,
    spent: 23500,
    views: 125000,
    clicks: 3200,
    locations: ['Центр города', 'Торговые центры'],
    mediaType: 'image',
  },
  {
    id: '2',
    name: 'Новый продукт',
    status: 'pending',
    startDate: '2024-02-01',
    endDate: '2024-02-15',
    budget: 30000,
    spent: 0,
    views: 0,
    clicks: 0,
    locations: ['Бизнес-центры'],
    mediaType: 'video',
  },
  {
    id: '3',
    name: 'Черная пятница',
    status: 'completed',
    startDate: '2023-11-24',
    endDate: '2023-11-26',
    budget: 100000,
    spent: 98500,
    views: 450000,
    clicks: 12000,
    locations: ['Центр города', 'Торговые центры', 'Жилые районы'],
    mediaType: 'video',
  },
];

const stats = [
  { 
    icon: Eye, 
    label: 'Всего просмотров', 
    value: '575K', 
    trend: '+12%',
    color: 'from-blue-500 to-cyan-500' 
  },
  { 
    icon: Users, 
    label: 'Уникальные зрители', 
    value: '234K', 
    trend: '+8%',
    color: 'from-purple-500 to-pink-500' 
  },
  { 
    icon: DollarSign, 
    label: 'Потрачено', 
    value: '122K ₽', 
    trend: '+15%',
    color: 'from-green-500 to-emerald-500' 
  },
  { 
    icon: BarChart3, 
    label: 'CTR', 
    value: '2.8%', 
    trend: '+0.3%',
    color: 'from-orange-500 to-red-500' 
  },
];

const statusConfig = {
  active: { 
    label: 'Активна', 
    icon: CheckCircle, 
    color: 'text-green-600', 
    bg: 'bg-green-50' 
  },
  pending: { 
    label: 'На модерации', 
    icon: Clock, 
    color: 'text-yellow-600', 
    bg: 'bg-yellow-50' 
  },
  rejected: { 
    label: 'Отклонена', 
    icon: XCircle, 
    color: 'text-red-600', 
    bg: 'bg-red-50' 
  },
  completed: { 
    label: 'Завершена', 
    icon: CheckCircle, 
    color: 'text-gray-600', 
    bg: 'bg-gray-50' 
  },
};

export default function DashboardPage() {
  const [filterStatus, setFilterStatus] = useState<CampaignStatus | 'all'>('all');
  
  const filteredCampaigns = filterStatus === 'all' 
    ? mockCampaigns 
    : mockCampaigns.filter(c => c.status === filterStatus);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Навигация */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg gradient-bg"></div>
                <span className="font-semibold">AdDisplay</span>
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link href="/dashboard" className="text-gray-900 font-medium">
                  Кампании
                </Link>
                <Link href="/analytics" className="text-gray-600 hover:text-gray-900">
                  Аналитика
                </Link>
                <Link href="/settings" className="text-gray-600 hover:text-gray-900">
                  Настройки
                </Link>
              </div>
            </div>
            <Link
              href="/create-campaign"
              className="button-gradient px-4 py-2 rounded-lg text-sm"
            >
              <Plus className="w-4 h-4 inline mr-1" />
              Новая кампания
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-2"
          >
            Добро пожаловать в личный кабинет
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600"
          >
            Управляйте своими рекламными кампаниями и отслеживайте их эффективность
          </motion.p>
        </div>

        {/* Статистика */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} p-3`}>
                  <stat.icon className="w-full h-full text-white" />
                </div>
                <div className="flex items-center space-x-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.trend}</span>
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Фильтры */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Мои кампании</h2>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as CampaignStatus | 'all')}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">Все кампании</option>
              <option value="active">Активные</option>
              <option value="pending">На модерации</option>
              <option value="completed">Завершенные</option>
              <option value="rejected">Отклоненные</option>
            </select>
          </div>
        </div>

        {/* Список кампаний */}
        <div className="space-y-4">
          {filteredCampaigns.map((campaign, index) => {
            const statusInfo = statusConfig[campaign.status];
            const StatusIcon = statusInfo.icon;
            
            return (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 card-hover"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{campaign.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{campaign.startDate} - {campaign.endDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{campaign.locations.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full flex items-center space-x-1 ${statusInfo.bg}`}>
                    <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                    <span className={`text-sm font-medium ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Бюджет</div>
                    <div className="font-semibold">{campaign.budget.toLocaleString()} ₽</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Потрачено</div>
                    <div className="font-semibold">{campaign.spent.toLocaleString()} ₽</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Просмотры</div>
                    <div className="font-semibold">{campaign.views.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Клики</div>
                    <div className="font-semibold">{campaign.clicks.toLocaleString()}</div>
                  </div>
                </div>

                {/* Прогресс бюджета */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Использовано бюджета</span>
                    <span className="font-medium">
                      {Math.round((campaign.spent / campaign.budget) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      campaign.mediaType === 'image' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      {campaign.mediaType === 'image' ? (
                        <Monitor className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Monitor className="w-4 h-4 text-purple-600" />
                      )}
                    </div>
                    <span className="text-sm text-gray-600">
                      {campaign.mediaType === 'image' ? 'Изображение' : 'Видео'}
                    </span>
                  </div>
                  <Link
                    href={`/campaign/${campaign.id}`}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <span className="text-sm font-medium">Подробнее</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Пустое состояние */}
        {filteredCampaigns.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <AlertCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Кампании не найдены
            </h3>
            <p className="text-gray-600 mb-6">
              У вас пока нет кампаний с выбранным статусом
            </p>
            <Link
              href="/create-campaign"
              className="button-gradient px-6 py-3 rounded-lg inline-flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Создать первую кампанию
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}