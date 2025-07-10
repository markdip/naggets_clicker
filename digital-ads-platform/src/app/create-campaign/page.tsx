'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, Calendar, Clock, Target, MapPin, DollarSign, Play, Pause, RotateCcw, ChevronLeft, Check } from 'lucide-react';
import Link from 'next/link';

interface CampaignData {
  title: string;
  description: string;
  mediaFiles: File[];
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  showCount: number;
  budget: number;
  locations: string[];
  targetAudience: string;
}

export default function CreateCampaign() {
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState<CampaignData>({
    title: '',
    description: '',
    mediaFiles: [],
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    showCount: 100,
    budget: 5000,
    locations: [],
    targetAudience: ''
  });

  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setCampaignData(prev => ({
      ...prev,
      mediaFiles: [...prev.mediaFiles, ...acceptedFiles]
    }));

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const url = URL.createObjectURL(file);
      setPreviewFile(url);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi', '.webm']
    },
    maxFiles: 5
  });

  const handleSubmit = async () => {
    // Здесь будет отправка данных на сервер
    console.log('Campaign data:', campaignData);
    // Перенаправление на страницу с подтверждением
  };

  const locations = [
    'Центр города',
    'Торговые центры', 
    'Автобусные остановки',
    'Грузовики и транспорт',
    'Вокзалы и аэропорты',
    'Университеты',
    'Жилые районы'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 px-4 py-6"
      >
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            <span className="text-gray-400 group-hover:text-white transition-colors">Назад</span>
          </Link>
          <div className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Создание кампании
          </div>
          <div className="w-20"></div>
        </nav>
      </motion.header>

      {/* Progress Bar */}
      <div className="px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= stepNumber
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {step > stepNumber ? <Check className="w-5 h-5" /> : stepNumber}
                </motion.div>
                {stepNumber < 3 && (
                  <div className={`w-20 h-1 mx-4 ${
                    step > stepNumber ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Медиа файлы</span>
            <span>Настройки</span>
            <span>Подтверждение</span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Загрузите ваши медиа файлы
                </h1>
                <p className="text-gray-300">
                  Поддерживаются изображения (JPG, PNG, GIF) и видео (MP4, MOV, AVI, WebM)
                </p>
              </div>

                             {/* File Upload */}
               <div
                 {...getRootProps()}
                 className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
                   isDragActive
                     ? 'border-purple-400 bg-purple-900/20'
                     : 'border-gray-600 hover:border-purple-400 hover:bg-purple-900/10'
                 }`}
               >
                <input {...getInputProps()} />
                <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {isDragActive ? 'Отпустите файлы здесь' : 'Перетащите файлы или нажмите для выбора'}
                </h3>
                                 <p className="text-gray-400">
                   Максимум 5 файлов, до 100MB каждый
                 </p>
               </div>

              {/* File List */}
              {campaignData.mediaFiles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">Загруженные файлы:</h3>
                  <div className="space-y-3">
                    {campaignData.mediaFiles.map((file, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between bg-white/5 rounded-lg p-3"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                            {file.type.startsWith('video/') ? (
                              <Play className="w-5 h-5 text-white" />
                            ) : (
                              <Upload className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium">{file.name}</p>
                            <p className="text-gray-400 text-sm">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Preview */}
              {previewFile && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">Предварительный просмотр:</h3>
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    {campaignData.mediaFiles[0]?.type.startsWith('video/') ? (
                      <video
                        src={previewFile}
                        controls
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <img
                        src={previewFile}
                        alt="Preview"
                        className="w-full h-64 object-cover"
                      />
                    )}
                  </div>
                </motion.div>
              )}

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(2)}
                  disabled={campaignData.mediaFiles.length === 0}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Далее
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Настройки кампании
                </h1>
                <p className="text-gray-300">
                  Настройте параметры показа вашей рекламы
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Basic Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-400" />
                    Основная информация
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Название кампании
                      </label>
                      <input
                        type="text"
                        value={campaignData.title}
                        onChange={(e) => setCampaignData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                        placeholder="Введите название"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Описание
                      </label>
                      <textarea
                        value={campaignData.description}
                        onChange={(e) => setCampaignData(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                        placeholder="Опишите вашу рекламу"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Schedule */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-purple-400" />
                    Расписание
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Дата начала
                        </label>
                        <input
                          type="date"
                          value={campaignData.startDate}
                          onChange={(e) => setCampaignData(prev => ({ ...prev, startDate: e.target.value }))}
                          className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Дата окончания
                        </label>
                        <input
                          type="date"
                          value={campaignData.endDate}
                          onChange={(e) => setCampaignData(prev => ({ ...prev, endDate: e.target.value }))}
                          className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Время начала
                        </label>
                        <input
                          type="time"
                          value={campaignData.startTime}
                          onChange={(e) => setCampaignData(prev => ({ ...prev, startTime: e.target.value }))}
                          className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Время окончания
                        </label>
                        <input
                          type="time"
                          value={campaignData.endTime}
                          onChange={(e) => setCampaignData(prev => ({ ...prev, endTime: e.target.value }))}
                          className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Budget & Shows */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-purple-400" />
                    Бюджет и показы
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Количество показов
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={campaignData.showCount}
                        onChange={(e) => setCampaignData(prev => ({ ...prev, showCount: parseInt(e.target.value) }))}
                        className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Бюджет (руб.)
                      </label>
                      <input
                        type="number"
                        min="1000"
                        step="500"
                        value={campaignData.budget}
                        onChange={(e) => setCampaignData(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                        className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Locations */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-purple-400" />
                    Локации
                  </h3>
                  <div className="space-y-3">
                    {locations.map((location) => (
                      <label key={location} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={campaignData.locations.includes(location)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCampaignData(prev => ({
                                ...prev,
                                locations: [...prev.locations, location]
                              }));
                            } else {
                              setCampaignData(prev => ({
                                ...prev,
                                locations: prev.locations.filter(l => l !== location)
                              }));
                            }
                          }}
                          className="w-4 h-4 text-purple-600 bg-white/5 border-gray-600 rounded focus:ring-purple-500"
                        />
                        <span className="text-gray-300">{location}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(1)}
                  className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-white/5 transition-all duration-300"
                >
                  Назад
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(3)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
                >
                  Далее
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Подтверждение кампании
                </h1>
                <p className="text-gray-300">
                  Проверьте данные перед отправкой на модерацию
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Основная информация</h3>
                    <div className="space-y-3 text-gray-300">
                      <p><span className="font-medium">Название:</span> {campaignData.title}</p>
                      <p><span className="font-medium">Описание:</span> {campaignData.description}</p>
                      <p><span className="font-medium">Файлов:</span> {campaignData.mediaFiles.length}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Настройки</h3>
                    <div className="space-y-3 text-gray-300">
                      <p><span className="font-medium">Период:</span> {campaignData.startDate} - {campaignData.endDate}</p>
                      <p><span className="font-medium">Время:</span> {campaignData.startTime} - {campaignData.endTime}</p>
                      <p><span className="font-medium">Показов:</span> {campaignData.showCount}</p>
                      <p><span className="font-medium">Бюджет:</span> {campaignData.budget.toLocaleString()} руб.</p>
                      <p><span className="font-medium">Локации:</span> {campaignData.locations.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">Что происходит дальше?</h3>
                <div className="space-y-2 text-gray-300">
                  <p>✓ Ваша кампания будет отправлена на модерацию</p>
                  <p>✓ Модерация занимает до 24 часов</p>
                  <p>✓ После одобрения реклама начнет показываться согласно расписанию</p>
                  <p>✓ Вы получите уведомление о статусе на email</p>
                </div>
              </motion.div>

              <div className="flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(2)}
                  className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-white/5 transition-all duration-300"
                >
                  Назад
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
                >
                  Отправить на модерацию
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}