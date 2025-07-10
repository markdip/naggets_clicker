'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Eye, Clock, DollarSign, Calendar, MapPin, User, Filter, Search } from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  description: string;
  advertiser: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  mediaFiles: string[];
  startDate: string;
  endDate: string;
  budget: number;
  showCount: number;
  locations: string[];
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

export default function AdminPanel() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: 'Реклама нового ресторана',
      description: 'Открытие нового ресторана в центре города',
      advertiser: 'Иван Петров',
      email: 'ivan@restaurant.com',
      status: 'pending',
      mediaFiles: ['restaurant-video.mp4'],
      startDate: '2024-01-15',
      endDate: '2024-01-30',
      budget: 50000,
      showCount: 1000,
      locations: ['Центр города', 'Торговые центры'],
      submittedAt: '2024-01-10T10:30:00Z'
    },
    {
      id: '2',
      title: 'Распродажа одежды',
      description: 'Зимняя распродажа со скидками до 70%',
      advertiser: 'Мария Сидорова',
      email: 'maria@fashion.com',
      status: 'pending',
      mediaFiles: ['sale-banner.jpg'],
      startDate: '2024-01-12',
      endDate: '2024-01-25',
      budget: 30000,
      showCount: 500,
      locations: ['Грузовики и транспорт', 'Жилые районы'],
      submittedAt: '2024-01-09T14:20:00Z'
    }
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  const handleApprove = (campaignId: string) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === campaignId 
        ? { 
            ...campaign, 
            status: 'approved' as const,
            reviewedAt: new Date().toISOString(),
            reviewedBy: 'Администратор'
          }
        : campaign
    ));
    setSelectedCampaign(null);
  };

  const handleReject = (campaignId: string, reason: string) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === campaignId 
        ? { 
            ...campaign, 
            status: 'rejected' as const,
            reviewedAt: new Date().toISOString(),
            reviewedBy: 'Администратор',
            rejectionReason: reason
          }
        : campaign
    ));
    setSelectedCampaign(null);
    setShowRejectionModal(false);
    setRejectionReason('');
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesFilter = filter === 'all' || campaign.status === filter;
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.advertiser.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: Campaign['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30';
      case 'approved':
        return 'bg-green-600/20 text-green-400 border-green-500/30';
      case 'rejected':
        return 'bg-red-600/20 text-red-400 border-red-500/30';
    }
  };

  const getStatusText = (status: Campaign['status']) => {
    switch (status) {
      case 'pending':
        return 'На модерации';
      case 'approved':
        return 'Одобрено';
      case 'rejected':
        return 'Отклонено';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 px-4 py-6 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Административная панель
            </h1>
            <p className="text-gray-400 mt-1">Модерация рекламных кампаний</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right text-sm text-gray-400">
              <p>Администратор</p>
              <p>admin@digitalads.com</p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Campaigns List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters and Search */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Поиск по названию или рекламодателю..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-white/5 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-white/5 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none transition-colors"
                  >
                    <option value="all">Все</option>
                    <option value="pending">На модерации</option>
                    <option value="approved">Одобренные</option>
                    <option value="rejected">Отклоненные</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Statistics */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-3 gap-4"
            >
              <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {campaigns.filter(c => c.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-300">На модерации</div>
              </div>
              <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400">
                  {campaigns.filter(c => c.status === 'approved').length}
                </div>
                <div className="text-sm text-gray-300">Одобрено</div>
              </div>
              <div className="bg-red-600/20 border border-red-500/30 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-red-400">
                  {campaigns.filter(c => c.status === 'rejected').length}
                </div>
                <div className="text-sm text-gray-300">Отклонено</div>
              </div>
            </motion.div>

            {/* Campaigns */}
            <div className="space-y-4">
              {filteredCampaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => setSelectedCampaign(campaign)}
                  className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 hover:bg-white/20 ${
                    selectedCampaign?.id === campaign.id ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{campaign.title}</h3>
                      <p className="text-gray-300 text-sm mb-3">{campaign.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{campaign.advertiser}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{campaign.budget.toLocaleString()} руб.</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{campaign.startDate} - {campaign.endDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(campaign.status)}`}>
                      {getStatusText(campaign.status)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>Подано: {new Date(campaign.submittedAt).toLocaleDateString('ru-RU')}</span>
                    </div>
                    {campaign.status === 'pending' && (
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(campaign.id);
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Одобрить</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCampaign(campaign);
                            setShowRejectionModal(true);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Отклонить</span>
                        </motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Campaign Details */}
          <div className="space-y-6">
            {selectedCampaign ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sticky top-4"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Детали кампании</h2>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(selectedCampaign.status)}`}>
                    {getStatusText(selectedCampaign.status)}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">{selectedCampaign.title}</h3>
                    <p className="text-gray-300 text-sm">{selectedCampaign.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Рекламодатель:</span>
                      <p className="text-white font-medium">{selectedCampaign.advertiser}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Email:</span>
                      <p className="text-white font-medium">{selectedCampaign.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Бюджет:</span>
                      <p className="text-white font-medium">{selectedCampaign.budget.toLocaleString()} руб.</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Показы:</span>
                      <p className="text-white font-medium">{selectedCampaign.showCount}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Дата начала:</span>
                      <p className="text-white font-medium">{selectedCampaign.startDate}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Дата окончания:</span>
                      <p className="text-white font-medium">{selectedCampaign.endDate}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-400 text-sm">Локации:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedCampaign.locations.map((location, index) => (
                        <span
                          key={index}
                          className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs"
                        >
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-400 text-sm">Медиа файлы:</span>
                    <div className="mt-2 space-y-2">
                      {selectedCampaign.mediaFiles.map((file, index) => (
                        <div key={index} className="bg-white/5 rounded-lg p-3 flex items-center justify-between">
                          <span className="text-white text-sm">{file}</span>
                          <button className="text-purple-400 hover:text-purple-300">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedCampaign.rejectionReason && (
                    <div className="bg-red-600/20 border border-red-500/30 rounded-lg p-4">
                      <span className="text-red-400 text-sm font-medium">Причина отклонения:</span>
                      <p className="text-red-300 text-sm mt-1">{selectedCampaign.rejectionReason}</p>
                    </div>
                  )}

                  {selectedCampaign.status === 'pending' && (
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleApprove(selectedCampaign.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                          <span>Одобрить</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowRejectionModal(true)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                        >
                          <XCircle className="w-5 h-5" />
                          <span>Отклонить</span>
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
              >
                <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Выберите кампанию</h3>
                <p className="text-gray-400 text-sm">
                  Нажмите на кампанию слева, чтобы увидеть подробную информацию
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Rejection Modal */}
      {showRejectionModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 rounded-xl p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Отклонить кампанию</h3>
            <p className="text-gray-300 text-sm mb-4">
              Укажите причину отклонения кампании. Рекламодатель получит уведомление.
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Введите причину отклонения..."
              rows={4}
              className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors mb-4"
            />
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectionReason('');
                }}
                className="flex-1 border border-gray-600 text-gray-300 py-3 rounded-lg font-medium hover:bg-white/5 transition-colors"
              >
                Отмена
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => selectedCampaign && handleReject(selectedCampaign.id, rejectionReason)}
                disabled={!rejectionReason.trim()}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Отклонить
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}