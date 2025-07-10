'use client'

import { motion } from 'framer-motion'
import { 
  Settings, 
  Bell, 
  Shield, 
  Palette,
  Globe,
  CreditCard,
  Download,
  Trash2
} from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true
  })

  const [theme, setTheme] = useState('light')

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Настройки
          </h1>
          <p className="text-xl text-gray-600">
            Настройте приложение под свои предпочтения
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center mb-6">
              <Bell className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Уведомления</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email уведомления</p>
                  <p className="text-sm text-gray-600">Получать уведомления на почту</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNotificationChange('email')}
                  className={`
                    w-12 h-6 rounded-full transition-colors duration-200
                    ${notifications.email ? 'gradient-bg' : 'bg-gray-300'}
                  `}
                >
                  <motion.div
                    animate={{ x: notifications.email ? 24 : 2 }}
                    className="w-4 h-4 bg-white rounded-full"
                  />
                </motion.button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Push уведомления</p>
                  <p className="text-sm text-gray-600">Уведомления в браузере</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNotificationChange('push')}
                  className={`
                    w-12 h-6 rounded-full transition-colors duration-200
                    ${notifications.push ? 'gradient-bg' : 'bg-gray-300'}
                  `}
                >
                  <motion.div
                    animate={{ x: notifications.push ? 24 : 2 }}
                    className="w-4 h-4 bg-white rounded-full"
                  />
                </motion.button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">SMS уведомления</p>
                  <p className="text-sm text-gray-600">Уведомления по SMS</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNotificationChange('sms')}
                  className={`
                    w-12 h-6 rounded-full transition-colors duration-200
                    ${notifications.sms ? 'gradient-bg' : 'bg-gray-300'}
                  `}
                >
                  <motion.div
                    animate={{ x: notifications.sms ? 24 : 2 }}
                    className="w-4 h-4 bg-white rounded-full"
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center mb-6">
              <Palette className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Внешний вид</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тема оформления
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="light">Светлая</option>
                  <option value="dark">Темная</option>
                  <option value="auto">Авто</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition-colors"
                >
                  <div className="w-full h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded mb-2"></div>
                  <p className="text-xs text-gray-600">Классическая</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition-colors"
                >
                  <div className="w-full h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded mb-2"></div>
                  <p className="text-xs text-gray-600">Природная</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition-colors"
                >
                  <div className="w-full h-8 bg-gradient-to-r from-pink-400 to-red-500 rounded mb-2"></div>
                  <p className="text-xs text-gray-600">Яркая</p>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Безопасность</h2>
            </div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Изменить пароль</p>
                    <p className="text-sm text-gray-600">Обновите пароль для безопасности</p>
                  </div>
                  <Globe className="w-5 h-5 text-gray-400" />
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Двухфакторная аутентификация</p>
                    <p className="text-sm text-gray-600">Дополнительная защита аккаунта</p>
                  </div>
                  <Shield className="w-5 h-5 text-gray-400" />
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">История входов</p>
                    <p className="text-sm text-gray-600">Просмотр последних входов</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400" />
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Account */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center mb-6">
              <CreditCard className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Аккаунт</h2>
            </div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Экспорт данных</p>
                    <p className="text-sm text-gray-600">Скачать все ваши данные</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400" />
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 border border-red-300 rounded-lg hover:bg-red-50 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-600">Удалить аккаунт</p>
                    <p className="text-sm text-red-500">Безвозвратное удаление</p>
                  </div>
                  <Trash2 className="w-5 h-5 text-red-400" />
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}