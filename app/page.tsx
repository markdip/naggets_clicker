'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Monitor, Truck, Users, BarChart3, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: Monitor,
    title: 'Цифровые экраны',
    description: 'Размещайте рекламу на современных LED-экранах в городах',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Truck,
    title: 'Мобильная реклама',
    description: 'Реклама на экранах грузовиков и транспорта',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Users,
    title: 'Целевая аудитория',
    description: 'Настройте показы для вашей целевой аудитории',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: BarChart3,
    title: 'Аналитика',
    description: 'Отслеживайте эффективность рекламных кампаний',
    color: 'from-green-500 to-emerald-500',
  },
];

const stats = [
  { value: '500+', label: 'Экранов' },
  { value: '10М+', label: 'Просмотров' },
  { value: '1000+', label: 'Клиентов' },
  { value: '95%', label: 'Довольных' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Навигация */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 rounded-xl gradient-bg animate-pulse-slow"></div>
              <span className="text-xl font-bold gradient-text">AdDisplay</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-6"
            >
              <Link href="/dashboard" className="text-gray-700 hover:text-gray-900 transition-colors">
                Личный кабинет
              </Link>
              <Link href="/admin" className="text-gray-700 hover:text-gray-900 transition-colors">
                Админ панель
              </Link>
              <Link
                href="/create-campaign"
                className="button-gradient px-6 py-2 rounded-lg"
              >
                Создать кампанию
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero секция */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Цифровая реклама</span>
              <br />
              нового поколения
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Размещайте свою рекламу на сотнях цифровых экранов по всему городу.
              От экранов на грузовиках до уличных дисплеев - ваша реклама везде!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/create-campaign"
                className="button-gradient px-8 py-4 rounded-xl text-lg inline-flex items-center justify-center group"
              >
                Начать рекламную кампанию
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 rounded-xl text-lg border-2 border-gray-300 hover:border-gray-400 transition-colors inline-flex items-center justify-center"
              >
                Узнать больше
              </Link>
            </div>
          </motion.div>

          {/* Анимированный фон */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full gradient-bg opacity-20 blur-3xl animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full gradient-bg opacity-20 blur-3xl animate-float animation-delay-400"></div>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Особенности */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Почему выбирают нас</h2>
            <p className="text-xl text-gray-600">Современные технологии для вашего бизнеса</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 card-hover group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto gradient-bg rounded-3xl p-12 text-center text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Готовы начать?</h2>
            <p className="text-xl mb-8 opacity-90">
              Создайте свою первую рекламную кампанию за несколько минут
            </p>
            <Link
              href="/create-campaign"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105"
            >
              Создать кампанию
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          
          <div className="absolute inset-0 bg-white/10 transform rotate-12 translate-x-full animate-shimmer"></div>
        </motion.div>
      </section>

      {/* Футер */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg gradient-bg"></div>
              <span className="text-lg font-semibold">AdDisplay</span>
            </div>
            <div className="text-gray-400">
              © 2024 AdDisplay. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}