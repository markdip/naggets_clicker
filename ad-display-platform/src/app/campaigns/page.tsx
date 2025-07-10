'use client'

import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Clock, 
  MapPin, 
  Eye, 
  CheckCircle, 
  XCircle,
  Play,
  Pause
} from 'lucide-react'
import { AdCampaign } from '@/types'
import { getStatusColor, getStatusText, formatDate, formatCurrency } from '@/lib/utils'

// Моковые данные для демонстрации
const mockCampaigns: AdCampaign[] = [
  {
    id: '1',
    title: 'Реклама нового iPhone',
    description: 'Продвижение нового смартфона Apple',
    mediaUrl: '/mock-ad-1.jpg',
    mediaType: 'image',
    status: 'active',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-02-15'),
    impressions: 1250,
    maxImpressions: 2000,
    locations: ['truck-1', 'screen-1'],
    budget: 50000,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Продвижение кафе',
    description: 'Реклама нового кафе в центре города',
    mediaUrl: '/mock-ad-2.jpg',
    mediaType: 'video',
    status: 'pending',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-02-28'),
    impressions: 0,
    maxImpressions: 1500,
    locations: ['screen-2'],
    budget: 25000,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    title: 'Автосалон Mercedes',
    description: 'Презентация новых автомобилей',
    mediaUrl: '/mock-ad-3.jpg',
    mediaType: 'image',
    status: 'completed',
    startDate: new Date('2023-12-01'),
    endDate: new Date('2023-12-31'),
    impressions: 3000,
    maxImpressions: 3000,
    locations: ['billboard-1'],
    budget: 75000,
    createdAt: new Date('2023-11-25'),
    updatedAt: new Date('2023-12-31')
  }
]

export default function CampaignsPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'approved':
        return <CheckCircle className="w-4 h-4" />
      case 'rejected':
        return <XCircle className="w-4 h-4" />
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Pause className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Мои кампании
          </h1>
          <p className="text-xl text-gray-600">
            Управляйте своими рекламными кампаниями и отслеживайте их эффективность
          </p>
        </motion.div>

        <div className="grid gap-6">
          {mockCampaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {campaign.title}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {campaign.description}
                      </p>
                    </div>
                    <div className={`
                      flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium
                      ${getStatusColor(campaign.status)}
                    `}>
                      {getStatusIcon(campaign.status)}
                      <span>{getStatusText(campaign.status)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Период</p>
                        <p className="font-medium">
                          {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Показы</p>
                        <p className="font-medium">
                          {campaign.impressions.toLocaleString()} / {campaign.maxImpressions.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Локации</p>
                        <p className="font-medium">{campaign.locations.length}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Бюджет</p>
                        <p className="font-medium">{formatCurrency(campaign.budget)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Прогресс показов</span>
                      <span>{Math.round((campaign.impressions / campaign.maxImpressions) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(campaign.impressions / campaign.maxImpressions) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="gradient-bg h-2 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 lg:ml-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Подробнее
                  </motion.button>
                  
                  {campaign.status === 'active' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Приостановить
                    </motion.button>
                  )}
                  
                  {campaign.status === 'pending' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
                    >
                      Отменить
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {mockCampaigns.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              У вас пока нет кампаний
            </h3>
            <p className="text-gray-600 mb-6">
              Создайте свою первую рекламную кампанию
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 gradient-bg text-white rounded-full font-semibold"
            >
              Создать кампанию
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}