'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  Upload, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Eye,
  Send,
  CheckCircle
} from 'lucide-react'
import FileUpload from '@/components/FileUpload'
import { CampaignFormData } from '@/types'

const campaignSchema = z.object({
  title: z.string().min(3, 'Название должно содержать минимум 3 символа'),
  description: z.string().min(10, 'Описание должно содержать минимум 10 символов'),
  startDate: z.string().min(1, 'Выберите дату начала'),
  endDate: z.string().min(1, 'Выберите дату окончания'),
  maxImpressions: z.number().min(100, 'Минимум 100 показов'),
  budget: z.number().min(1000, 'Минимум 1000 рублей'),
  mediaFile: z.any().optional(),
  locations: z.array(z.string()).optional()
})

const locations = [
  { id: 'truck-1', name: 'Грузовик №1 - Центральный район', type: 'truck', price: 500 },
  { id: 'truck-2', name: 'Грузовик №2 - Северный район', type: 'truck', price: 450 },
  { id: 'screen-1', name: 'Экран у скамейки - Парк Горького', type: 'bench', price: 300 },
  { id: 'screen-2', name: 'Экран у скамейки - Тверская', type: 'bench', price: 350 },
  { id: 'billboard-1', name: 'Билборд - МКАД', type: 'billboard', price: 800 },
  { id: 'indoor-1', name: 'Внутренний экран - ТЦ Афимолл', type: 'indoor', price: 200 }
]

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema)
  })

  const watchedStartDate = watch('startDate')
  const watchedEndDate = watch('endDate')
  const watchedMaxImpressions = watch('maxImpressions')

  const toggleLocation = (locationId: string) => {
    setSelectedLocations(prev => 
      prev.includes(locationId) 
        ? prev.filter(id => id !== locationId)
        : [...prev, locationId]
    )
  }

  const calculateTotalCost = () => {
    if (!watchedStartDate || !watchedEndDate) return 0
    
    const startDate = new Date(watchedStartDate)
    const endDate = new Date(watchedEndDate)
    const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)
    
    return selectedLocations.reduce((total, locationId) => {
      const location = locations.find(loc => loc.id === locationId)
      return total + (location ? location.price * hours : 0)
    }, 0)
  }

  const onSubmit = async (data: CampaignFormData) => {
    if (!selectedFile) {
      alert('Пожалуйста, загрузите файл')
      return
    }
    if (selectedLocations.length === 0) {
      alert('Пожалуйста, выберите хотя бы одну локацию')
      return
    }

    setIsSubmitting(true)
    
    // Имитация отправки данных
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 gradient-bg-success rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Реклама отправлена на рассмотрение!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Мы рассмотрим вашу рекламу в течение 24 часов и уведомим вас о решении.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-3 gradient-bg text-white rounded-full font-semibold"
          >
            Загрузить еще одну рекламу
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Загрузить рекламу
          </h1>
          <p className="text-xl text-gray-600">
            Создайте новую рекламную кампанию для размещения на наших экранах
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* File Upload */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Upload className="w-6 h-6 mr-2 text-purple-600" />
                Медиафайл
              </h2>
              <FileUpload onFileSelect={setSelectedFile} />
            </div>

            {/* Campaign Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название кампании
                </label>
                <input
                  {...register('title')}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Введите название кампании"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Максимальное количество показов
                </label>
                <input
                  {...register('maxImpressions', { valueAsNumber: true })}
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="1000"
                />
                {errors.maxImpressions && (
                  <p className="text-red-500 text-sm mt-1">{errors.maxImpressions.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание кампании
              </label>
              <textarea
                {...register('description')}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Опишите вашу рекламную кампанию"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Date Range */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Дата начала
                </label>
                <input
                  {...register('startDate')}
                  type="datetime-local"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Дата окончания
                </label>
                <input
                  {...register('endDate')}
                  type="datetime-local"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>
                )}
              </div>
            </div>

            {/* Locations */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-purple-600" />
                Выберите локации
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {locations.map((location) => (
                  <motion.div
                    key={location.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleLocation(location.id)}
                    className={`
                      p-4 border-2 rounded-lg cursor-pointer transition-all duration-300
                      ${selectedLocations.includes(location.id)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{location.name}</h3>
                        <p className="text-sm text-gray-500">{location.price} ₽/час</p>
                      </div>
                      <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center
                        ${selectedLocations.includes(location.id)
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-gray-300'
                        }
                      `}>
                        {selectedLocations.includes(location.id) && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cost Summary */}
            {selectedLocations.length > 0 && watchedStartDate && watchedEndDate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Стоимость кампании
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Выбранные локации:</span>
                    <span>{selectedLocations.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Продолжительность:</span>
                    <span>
                      {watchedStartDate && watchedEndDate ? 
                        `${Math.round((new Date(watchedEndDate).getTime() - new Date(watchedStartDate).getTime()) / (1000 * 60 * 60))} часов`
                        : 'Не выбрано'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Максимум показов:</span>
                    <span>{watchedMaxImpressions || 0}</span>
                  </div>
                  <div className="border-t pt-2 mt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Общая стоимость:</span>
                      <span className="text-purple-600">{calculateTotalCost().toLocaleString()} ₽</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 gradient-bg text-white rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Отправка...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Отправить на рассмотрение
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}