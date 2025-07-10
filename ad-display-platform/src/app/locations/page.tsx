'use client'

import { motion } from 'framer-motion'
import { 
  MapPin, 
  Truck, 
  Monitor, 
  Building, 
  DollarSign,
  Clock,
  Users,
  TrendingUp
} from 'lucide-react'
import { DisplayLocation } from '@/types'

// Моковые данные локаций
const mockLocations: DisplayLocation[] = [
  {
    id: 'truck-1',
    name: 'Грузовик №1 - Центральный район',
    type: 'truck',
    location: 'Центральный район, Москва',
    coordinates: { lat: 55.7558, lng: 37.6176 },
    pricePerHour: 500,
    isAvailable: true
  },
  {
    id: 'truck-2',
    name: 'Грузовик №2 - Северный район',
    type: 'truck',
    location: 'Северный район, Москва',
    coordinates: { lat: 55.8355, lng: 37.5676 },
    pricePerHour: 450,
    isAvailable: true
  },
  {
    id: 'screen-1',
    name: 'Экран у скамейки - Парк Горького',
    type: 'bench',
    location: 'Парк Горького, Москва',
    coordinates: { lat: 55.7298, lng: 37.6008 },
    pricePerHour: 300,
    isAvailable: true
  },
  {
    id: 'screen-2',
    name: 'Экран у скамейки - Тверская',
    type: 'bench',
    location: 'Тверская улица, Москва',
    coordinates: { lat: 55.7558, lng: 37.6176 },
    pricePerHour: 350,
    isAvailable: false
  },
  {
    id: 'billboard-1',
    name: 'Билборд - МКАД',
    type: 'billboard',
    location: 'МКАД, 50 км',
    coordinates: { lat: 55.7558, lng: 37.6176 },
    pricePerHour: 800,
    isAvailable: true
  },
  {
    id: 'indoor-1',
    name: 'Внутренний экран - ТЦ Афимолл',
    type: 'indoor',
    location: 'ТЦ Афимолл, Москва',
    coordinates: { lat: 55.7494, lng: 37.5371 },
    pricePerHour: 200,
    isAvailable: true
  }
]

const locationTypes = {
  truck: { icon: Truck, label: 'Грузовик', color: 'bg-blue-500' },
  bench: { icon: Monitor, label: 'Экран у скамейки', color: 'bg-green-500' },
  billboard: { icon: Building, label: 'Билборд', color: 'bg-purple-500' },
  indoor: { icon: Building, label: 'Внутренний экран', color: 'bg-orange-500' }
}

export default function LocationsPage() {
  const stats = [
    { icon: MapPin, value: mockLocations.length, label: 'Всего локаций' },
    { icon: Users, value: '15,000+', label: 'Ежедневная аудитория' },
    { icon: TrendingUp, value: '95%', label: 'Доступность' },
    { icon: Clock, value: '24/7', label: 'Время работы' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Доступные локации
          </h1>
          <p className="text-xl text-gray-600">
            Выбирайте оптимальные места для размещения вашей рекламы
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-lg"
            >
              <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Locations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockLocations.map((location, index) => {
            const typeInfo = locationTypes[location.type]
            const TypeIcon = typeInfo.icon

            return (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`
                  bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300
                  ${!location.isAvailable ? 'opacity-60' : ''}
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 ${typeInfo.color} rounded-lg flex items-center justify-center`}>
                    <TypeIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${location.isAvailable 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                    }
                  `}>
                    {location.isAvailable ? 'Доступно' : 'Занято'}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {location.name}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{location.location}</span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Тип:</span>
                    <span className="text-sm font-medium">{typeInfo.label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Стоимость:</span>
                    <span className="text-sm font-medium text-green-600">
                      {location.pricePerHour.toLocaleString()} ₽/час
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!location.isAvailable}
                  className={`
                    w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200
                    ${location.isAvailable
                      ? 'gradient-bg text-white hover:opacity-90'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  {location.isAvailable ? 'Выбрать локацию' : 'Недоступно'}
                </motion.button>
              </motion.div>
            )
          })}
        </div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Карта локаций
          </h2>
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Интерактивная карта с локациями</p>
              <p className="text-sm text-gray-500">Здесь будет отображаться карта с точками размещения</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}