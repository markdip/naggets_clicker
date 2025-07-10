'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  Image, 
  Video,
  X,
  Check,
  AlertCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface CampaignData {
  name: string;
  description: string;
  media: File | null;
  mediaType: 'image' | 'video' | null;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  showCount: number;
  locations: string[];
  budget: number;
}

const locations = [
  'Центр города',
  'Торговые центры',
  'Жилые районы',
  'Бизнес-центры',
  'Транспортные узлы',
  'Парки и скверы',
];

export default function CreateCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [campaignData, setCampaignData] = useState<CampaignData>({
    name: '',
    description: '',
    media: null,
    mediaType: null,
    startDate: '',
    endDate: '',
    startTime: '09:00',
    endTime: '21:00',
    showCount: 1000,
    locations: [],
    budget: 5000,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const fileType = file.type.startsWith('image/') ? 'image' : 'video';
      setCampaignData(prev => ({
        ...prev,
        media: file,
        mediaType: fileType as 'image' | 'video',
      }));
      toast.success('Файл загружен успешно');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'video/*': ['.mp4', '.avi', '.mov', '.wmv'],
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  const toggleLocation = (location: string) => {
    setCampaignData(prev => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter(l => l !== location)
        : [...prev.locations, location],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Симуляция отправки данных
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Кампания отправлена на модерацию!');
    router.push('/dashboard');
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return campaignData.name && campaignData.description;
      case 2:
        return campaignData.media !== null;
      case 3:
        return campaignData.startDate && campaignData.endDate;
      case 4:
        return campaignData.locations.length > 0;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Навигация */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Назад</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg gradient-bg"></div>
              <span className="font-semibold">AdDisplay</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Прогресс */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  s <= step
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                } transition-all duration-300`}
              >
                {s < step ? <Check className="w-5 h-5" /> : s}
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute inset-0 h-2 bg-gray-200 rounded-full"></div>
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${((step - 1) / 4) * 100}%` }}
              className="absolute inset-0 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
            />
          </div>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Шаг 1: Основная информация */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold gradient-text">Основная информация</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название кампании
                </label>
                <input
                  type="text"
                  value={campaignData.name}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 input-glow"
                  placeholder="Например: Летняя распродажа"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание
                </label>
                <textarea
                  value={campaignData.description}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 input-glow resize-none"
                  placeholder="Опишите вашу рекламную кампанию..."
                />
              </div>
            </div>
          )}

          {/* Шаг 2: Загрузка медиа */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold gradient-text">Загрузите медиа</h2>
              
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                  isDragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input {...getInputProps()} />
                
                {campaignData.media ? (
                  <div className="space-y-4">
                    <div className="mx-auto w-20 h-20 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                      {campaignData.mediaType === 'image' ? (
                        <Image className="w-10 h-10 text-white" />
                      ) : (
                        <Video className="w-10 h-10 text-white" />
                      )}
                    </div>
                    <p className="text-lg font-medium">{campaignData.media.name}</p>
                    <p className="text-sm text-gray-500">
                      {(campaignData.media.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCampaignData(prev => ({ ...prev, media: null, mediaType: null }));
                      }}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      Удалить файл
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 mx-auto text-gray-400" />
                    <p className="text-lg">
                      {isDragActive
                        ? 'Отпустите файл здесь'
                        : 'Перетащите файл сюда или нажмите для выбора'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Поддерживаются изображения и видео до 100MB
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Шаг 3: Время показа */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold gradient-text">Время показа</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Дата начала
                  </label>
                  <input
                    type="date"
                    value={campaignData.startDate}
                    onChange={(e) => setCampaignData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 input-glow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Дата окончания
                  </label>
                  <input
                    type="date"
                    value={campaignData.endDate}
                    onChange={(e) => setCampaignData(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 input-glow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline w-4 h-4 mr-1" />
                    Время начала показов
                  </label>
                  <input
                    type="time"
                    value={campaignData.startTime}
                    onChange={(e) => setCampaignData(prev => ({ ...prev, startTime: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 input-glow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline w-4 h-4 mr-1" />
                    Время окончания показов
                  </label>
                  <input
                    type="time"
                    value={campaignData.endTime}
                    onChange={(e) => setCampaignData(prev => ({ ...prev, endTime: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 input-glow"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Количество показов в день
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={campaignData.showCount}
                    onChange={(e) => setCampaignData(prev => ({ ...prev, showCount: parseInt(e.target.value) }))}
                    className="flex-1"
                  />
                  <span className="font-semibold text-lg w-20 text-right">{campaignData.showCount}</span>
                </div>
              </div>
            </div>
          )}

          {/* Шаг 4: Локации */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold gradient-text">Выберите локации</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {locations.map((location) => (
                  <div
                    key={location}
                    onClick={() => toggleLocation(location)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      campaignData.locations.includes(location)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="font-medium">{location}</span>
                      </div>
                      {campaignData.locations.includes(location) && (
                        <Check className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Шаг 5: Бюджет и подтверждение */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold gradient-text">Бюджет и подтверждение</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="inline w-4 h-4 mr-1" />
                  Бюджет кампании (руб.)
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={campaignData.budget}
                    onChange={(e) => setCampaignData(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                    className="flex-1"
                  />
                  <span className="font-semibold text-lg w-24 text-right">
                    {campaignData.budget.toLocaleString()} ₽
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-lg">Сводка кампании</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Название:</span>
                    <span className="font-medium">{campaignData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Период:</span>
                    <span className="font-medium">
                      {campaignData.startDate} - {campaignData.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Время показа:</span>
                    <span className="font-medium">
                      {campaignData.startTime} - {campaignData.endTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Показов в день:</span>
                    <span className="font-medium">{campaignData.showCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Локаций:</span>
                    <span className="font-medium">{campaignData.locations.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Бюджет:</span>
                    <span className="font-medium">{campaignData.budget.toLocaleString()} ₽</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  После отправки ваша кампания будет проверена модератором в течение 24 часов.
                  Вы получите уведомление о результате проверки.
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Кнопки навигации */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            disabled={step === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              step === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
            }`}
          >
            Назад
          </button>

          {step < 5 ? (
            <button
              onClick={() => setStep(prev => prev + 1)}
              disabled={!canProceed()}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                canProceed()
                  ? 'button-gradient shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Далее
              <ArrowRight className="inline w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="button-gradient px-8 py-3 rounded-lg font-medium shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Отправка...
                </div>
              ) : (
                'Отправить на модерацию'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}