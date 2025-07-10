'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Eye, Clock, DollarSign, Users, PlayCircle, PauseCircle, Edit3, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';

interface Campaign {
  id: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  startDate: string;
  endDate: string;
  locations: string[];
  mediaFiles: string[];
}

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: 'Летняя распродажа',
      status: 'active',
      budget: 50000,
      spent: 23500,
      impressions: 15420,
      clicks: 892,
      startDate: '2024-01-10',
      endDate: '2024-01-31',
      locations: ['Центр города', 'Торговые центры'],
      mediaFiles: ['summer-sale.mp4']
    },
    {
      id: '2',
      title: 'Новый продукт',
      status: 'pending',
      budget: 30000,
      spent: 0,
      impressions: 0,
      clicks: 0,
      startDate: '2024-01-15',
      endDate: '2024-01-28',
      locations: ['Грузовики и транспорт'],
      mediaFiles: ['product-ad.jpg']
    },
    {
      id: '3',
      title: 'Брендинговая кампания',
      status: 'completed',
      budget: 75000,
      spent: 75000,
      impressions: 45230,
      clicks: 2108,
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      locations: ['Центр города', 'Вокзалы и аэропорты'],
      mediaFiles: ['brand-video.mp4', 'brand-image.jpg']
    }
  ]);

  const [timeRange, setTimeRange] = useState('30d');

  const getStatusBadge = (status: Campaign['status']) => {
    switch (status) {
      case 'pending':
        return { className: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30', text: 'На модерации' };
      case 'approved':
        return { className: 'bg-blue-600/20 text-blue-400 border-blue-500/30', text: 'Одобрено' };
      case 'rejected':
        return { className: 'bg-red-600/20 text-red-400 border-red-500/30', text: 'Отклонено' };
      case 'active':
        return { className: 'bg-green-600/20 text-green-400 border-green-500/30', text: 'Активна' };
      case 'completed':
        return { className: 'bg-gray-600/20 text-gray-400 border-gray-500/30', text: 'Завершена' };
    }
  };

  const totalStats = {
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
    totalImpressions: campaigns.reduce((sum, c) => sum + c.impressions, 0),
    totalClicks: campaigns.reduce((sum, c) => sum + c.clicks, 0),
    activeCampaigns: campaigns.filter(c => c.status === 'active').length,
    ctr: campaigns.reduce((sum, c) => sum + c.impressions, 0) > 0 
      ? (campaigns.reduce((sum, c) => sum + c.clicks, 0) / campaigns.reduce((sum, c) => sum + c.impressions, 0) * 100)
      : 0
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
              Личный кабинет
            </h1>
            <p className="text-gray-400 mt-1">Управление рекламными кампаниями</p>
          </div>
          <Link href="/create-campaign">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              <span>Новая кампания</span>
            </motion.button>
          </Link>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-600/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-xs text-gray-400">Всего потрачено</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {totalStats.totalSpent.toLocaleString()} ₽
            </div>
            <div className="text-sm text-gray-400">
              из {totalStats.totalBudget.toLocaleString()} ₽
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                style={{ width: `${(totalStats.totalSpent / totalStats.totalBudget) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-600/20 rounded-lg">
                <Eye className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-xs text-gray-400">Показы</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {totalStats.totalImpressions.toLocaleString()}
            </div>
            <div className="text-sm text-green-400 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12.5% за неделю
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-xs text-gray-400">Клики</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {totalStats.totalClicks.toLocaleString()}
            </div>
            <div className="text-sm text-purple-400 flex items-center">
              CTR: {totalStats.ctr.toFixed(2)}%
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-600/20 rounded-lg">
                <BarChart3 className="w-6 h-6 text-orange-400" />
              </div>
              <span className="text-xs text-gray-400">Активные</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {totalStats.activeCampaigns}
            </div>
            <div className="text-sm text-gray-400">
              кампаний запущено
            </div>
          </div>
        </motion.div>

        {/* Chart Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Аналитика показов</h2>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white/5 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-400 focus:outline-none transition-colors"
            >
              <option value="7d">Последние 7 дней</option>
              <option value="30d">Последние 30 дней</option>
              <option value="90d">Последние 90 дней</option>
            </select>
          </div>
          
          {/* Simplified chart representation */}
          <div className="h-64 flex items-end justify-between space-x-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-t opacity-80"
                  style={{ height: `${Math.random() * 80 + 20}%` }}
                ></div>
                <span className="text-xs text-gray-400 mt-2">
                  {new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU', { weekday: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Campaigns Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">Мои кампании</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left px-6 py-4 text-gray-300 font-medium">Название</th>
                  <th className="text-left px-6 py-4 text-gray-300 font-medium">Статус</th>
                  <th className="text-left px-6 py-4 text-gray-300 font-medium">Бюджет</th>
                  <th className="text-left px-6 py-4 text-gray-300 font-medium">Показы</th>
                  <th className="text-left px-6 py-4 text-gray-300 font-medium">Клики</th>
                  <th className="text-left px-6 py-4 text-gray-300 font-medium">Период</th>
                  <th className="text-left px-6 py-4 text-gray-300 font-medium">Действия</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign, index) => {
                  const statusBadge = getStatusBadge(campaign.status);
                  return (
                    <motion.tr
                      key={campaign.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-white font-medium">{campaign.title}</div>
                          <div className="text-sm text-gray-400">{campaign.mediaFiles.length} файлов</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.className}`}>
                          {statusBadge.text}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white">{campaign.budget.toLocaleString()} ₽</div>
                        <div className="text-sm text-gray-400">Потрачено: {campaign.spent.toLocaleString()} ₽</div>
                      </td>
                      <td className="px-6 py-4 text-white">{campaign.impressions.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className="text-white">{campaign.clicks.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">
                          CTR: {campaign.impressions > 0 ? ((campaign.clicks / campaign.impressions) * 100).toFixed(2) : 0}%
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white text-sm">{campaign.startDate}</div>
                        <div className="text-gray-400 text-sm">{campaign.endDate}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {campaign.status === 'active' && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-colors"
                              title="Приостановить"
                            >
                              <PauseCircle className="w-4 h-4" />
                            </motion.button>
                          )}
                          {(campaign.status === 'approved' || campaign.status === 'completed') && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg transition-colors"
                              title="Запустить"
                            >
                              <PlayCircle className="w-4 h-4" />
                            </motion.button>
                          )}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                            title="Редактировать"
                          >
                            <Edit3 className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                            title="Удалить"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid md:grid-cols-3 gap-6"
        >
          <Link href="/create-campaign">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:from-purple-600/30 hover:to-pink-600/30"
            >
              <Plus className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Создать кампанию</h3>
              <p className="text-gray-300 text-sm">Запустите новую рекламную кампанию за несколько кликов</p>
            </motion.div>
          </Link>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:from-blue-600/30 hover:to-cyan-600/30"
          >
            <BarChart3 className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Детальная аналитика</h3>
            <p className="text-gray-300 text-sm">Просмотрите подробную статистику по всем кампаниям</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:from-green-600/30 hover:to-emerald-600/30"
          >
            <DollarSign className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Пополнить баланс</h3>
            <p className="text-gray-300 text-sm">Добавьте средства для запуска новых кампаний</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}