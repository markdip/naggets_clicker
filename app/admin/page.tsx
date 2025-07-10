'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  MessageSquare,
  AlertTriangle,
  Search,
  Filter,
  Calendar,
  User,
  FileImage,
  FileVideo,
  ArrowLeft
} from 'lucide-react';
import toast from 'react-hot-toast';

interface PendingCampaign {
  id: string;
  name: string;
  advertiserName: string;
  advertiserEmail: string;
  submittedAt: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  locations: string[];
  showCount: number;
}

const mockPendingCampaigns: PendingCampaign[] = [
  {
    id: '1',
    name: 'Новогодняя распродажа техники',
    advertiserName: 'Иван Петров',
    advertiserEmail: 'ivan@techstore.ru',
    submittedAt: '2024-01-14T10:30:00',
    mediaType: 'video',
    mediaUrl: '/sample-video.mp4',
    description: 'Рекламная кампания для продвижения новогодней распродажи электроники. Скидки до 50% на все товары.',
    startDate: '2024-01-20',
    endDate: '2024-01-31',
    budget: 75000,
    locations: ['Центр города', 'Торговые центры'],
    showCount: 5000,
  },
  {
    id: '2',
    name: 'Открытие нового ресторана',
    advertiserName: 'Мария Сидорова',
    advertiserEmail: 'maria@restaurant.ru',
    submittedAt: '2024-01-14T14:45:00',
    mediaType: 'image',
    mediaUrl: '/sample-image.jpg',
    description: 'Приглашаем на открытие нового ресторана итальянской кухни. Специальные предложения для первых посетителей.',
    startDate: '2024-01-25',
    endDate: '2024-02-10',
    budget: 50000,
    locations: ['Бизнес-центры', 'Центр города'],
    showCount: 3000,
  },
];

export default function AdminPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<PendingCampaign | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [campaigns, setCampaigns] = useState(mockPendingCampaigns);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.advertiserName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = (campaignId: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== campaignId));
    toast.success('Кампания одобрена и запущена');
    setSelectedCampaign(null);
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      toast.error('Укажите причину отклонения');
      return;
    }
    
    if (selectedCampaign) {
      setCampaigns(prev => prev.filter(c => c.id !== selectedCampaign.id));
      toast.success('Кампания отклонена');
      setShowRejectModal(false);
      setRejectReason('');
      setSelectedCampaign(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Навигация */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="w-5 h-5" />
                <span>На главную</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-blue-600" />
                <span className="font-semibold text-lg">Панель модератора</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>На модерации: {campaigns.length}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Список кампаний */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Ожидают проверки</h2>
              
              {/* Поиск */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Поиск кампаний..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="space-y-3">
                {filteredCampaigns.map((campaign) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setSelectedCampaign(campaign)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedCampaign?.id === campaign.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm">{campaign.name}</h3>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        campaign.mediaType === 'image' ? 'bg-blue-100' : 'bg-purple-100'
                      }`}>
                        {campaign.mediaType === 'image' ? (
                          <FileImage className="w-4 h-4 text-blue-600" />
                        ) : (
                          <FileVideo className="w-4 h-4 text-purple-600" />
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{campaign.advertiserName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(campaign.submittedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredCampaigns.length === 0 && (
                <div className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">Нет кампаний для проверки</p>
                </div>
              )}
            </div>
          </div>

          {/* Детали кампании */}
          <div className="lg:col-span-2">
            {selectedCampaign ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">{selectedCampaign.name}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{selectedCampaign.advertiserName}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Отправлено {new Date(selectedCampaign.submittedAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Медиа превью */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Медиа материал</h3>
                  <div className="bg-gray-100 rounded-lg p-8 text-center">
                    {selectedCampaign.mediaType === 'image' ? (
                      <div className="space-y-2">
                        <FileImage className="w-16 h-16 mx-auto text-gray-400" />
                        <p className="text-gray-600">Изображение загружено</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <FileVideo className="w-16 h-16 mx-auto text-gray-400" />
                        <p className="text-gray-600">Видео загружено</p>
                      </div>
                    )}
                    <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
                      <Eye className="w-4 h-4 inline mr-1" />
                      Просмотреть
                    </button>
                  </div>
                </div>

                {/* Детали кампании */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="font-semibold mb-2">Описание</h3>
                    <p className="text-gray-600">{selectedCampaign.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-1">Период показа</h4>
                      <p className="font-medium">
                        {selectedCampaign.startDate} - {selectedCampaign.endDate}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-1">Бюджет</h4>
                      <p className="font-medium">{selectedCampaign.budget.toLocaleString()} ₽</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-1">Показов в день</h4>
                      <p className="font-medium">{selectedCampaign.showCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-1">Локации</h4>
                      <p className="font-medium">{selectedCampaign.locations.join(', ')}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">Контакты рекламодателя</h4>
                    <p className="font-medium">{selectedCampaign.advertiserEmail}</p>
                  </div>
                </div>

                {/* Действия */}
                <div className="flex items-center space-x-4 pt-6 border-t">
                  <button
                    onClick={() => handleApprove(selectedCampaign.id)}
                    className="flex-1 button-gradient py-3 rounded-lg font-medium flex items-center justify-center"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Одобрить
                  </button>
                  <button
                    onClick={() => setShowRejectModal(true)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <XCircle className="w-5 h-5 mr-2" />
                    Отклонить
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <MessageSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Выберите кампанию для проверки
                </h3>
                <p className="text-gray-600">
                  Нажмите на кампанию слева, чтобы увидеть детали
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Модальное окно отклонения */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-semibold mb-4">Причина отклонения</h3>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none"
              placeholder="Опишите причину отклонения кампании..."
            />
            <div className="flex items-center space-x-4 mt-6">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleReject}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Отклонить
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}