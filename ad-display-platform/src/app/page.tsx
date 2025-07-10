'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Truck, 
  Monitor, 
  MapPin, 
  BarChart3, 
  Upload, 
  CheckCircle,
  Users,
  TrendingUp
} from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: Truck,
      title: 'Реклама на грузовиках',
      description: 'Размещайте рекламу на движущихся транспортных средствах для максимального охвата'
    },
    {
      icon: Monitor,
      title: 'Цифровые экраны',
      description: 'Современные LED-экраны в людных местах с высоким качеством изображения'
    },
    {
      icon: MapPin,
      title: 'Умные локации',
      description: 'Выбирайте оптимальные места размещения на основе аналитики'
    },
    {
      icon: BarChart3,
      title: 'Детальная аналитика',
      description: 'Отслеживайте эффективность кампаний в реальном времени'
    }
  ]

  const stats = [
    { icon: Users, value: '10,000+', label: 'Активных клиентов' },
    { icon: Truck, value: '500+', label: 'Рекламных поверхностей' },
    { icon: TrendingUp, value: '95%', label: 'Удовлетворенность' },
    { icon: CheckCircle, value: '24/7', label: 'Поддержка' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden animated-gradient">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Реклама на
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                цифровых экранах
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
            >
              Размещайте рекламу на грузовиках, экранах у скамеек и других цифровых поверхностях. 
              Достигайте своей аудитории эффективно и современно.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/upload">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  <Upload className="inline-block w-5 h-5 mr-2" />
                  Загрузить рекламу
                </motion.button>
              </Link>
              
              <Link href="/locations">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors duration-300"
                >
                  <MapPin className="inline-block w-5 h-5 mr-2" />
                  Посмотреть локации
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"
        />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Почему выбирают нас?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Мы предлагаем современные решения для размещения рекламы с максимальной эффективностью
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 gradient-bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-6"
          >
            Готовы начать рекламную кампанию?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 mb-8"
          >
            Загрузите свою рекламу и получите одобрение в течение 24 часов
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/upload">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <Upload className="inline-block w-5 h-5 mr-2" />
                Начать сейчас
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
