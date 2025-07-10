'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, FileImage, FileVideo, CheckCircle } from 'lucide-react'

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  acceptedTypes?: string[]
  maxSize?: number
}

const FileUpload = ({ 
  onFileSelect, 
  acceptedTypes = ['image/*', 'video/*'],
  maxSize = 50 * 1024 * 1024 // 50MB
}: FileUploadProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      setUploadedFile(file)
      onFileSelect(file)
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      'video/*': ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm']
    },
    maxSize,
    multiple: false
  })

  const removeFile = () => {
    setUploadedFile(null)
    onFileSelect(null)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <FileImage className="w-8 h-8 text-blue-500" />
    } else if (file.type.startsWith('video/')) {
      return <FileVideo className="w-8 h-8 text-purple-500" />
    }
    return <Upload className="w-8 h-8 text-gray-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!uploadedFile ? (
          <motion.div
            key="upload-area"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div
              {...getRootProps()}
              className={`
                relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
                transition-all duration-300 hover:scale-105
                ${isDragActive 
                  ? 'border-blue-500 bg-blue-50/50' 
                  : isDragReject 
                    ? 'border-red-500 bg-red-50/50' 
                    : 'border-gray-300 hover:border-blue-400'
                }
              `}
              onDragEnter={() => setIsDragActive(true)}
              onDragLeave={() => setIsDragActive(false)}
            >
              <input {...getInputProps()} />
              
              <motion.div
                animate={{ 
                  scale: isDragActive ? 1.1 : 1,
                  rotate: isDragActive ? 5 : 0
                }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center space-y-4"
              >
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center
                  ${isDragActive 
                    ? 'gradient-bg' 
                    : 'bg-gray-100 hover:bg-gray-200'
                  }
                  transition-all duration-300
                `}>
                  <Upload className={`w-8 h-8 ${isDragActive ? 'text-white' : 'text-gray-600'}`} />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {isDragActive ? 'Отпустите файл здесь' : 'Перетащите файл сюда'}
                  </h3>
                  <p className="text-gray-500">
                    или <span className="text-blue-600 font-medium">выберите файл</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Поддерживаются изображения и видео до {formatFileSize(maxSize)}
                  </p>
                </div>
              </motion.div>

              {isDragReject && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 bg-red-50/80 rounded-xl flex items-center justify-center"
                >
                  <div className="text-red-600 font-medium">
                    Неподдерживаемый тип файла
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="file-preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative border-2 border-green-200 rounded-xl p-6 bg-green-50/50"
          >
            <div className="flex items-center space-x-4">
              {getFileIcon(uploadedFile)}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {uploadedFile.name}
                  </h4>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-sm text-gray-500">
                  {formatFileSize(uploadedFile.size)}
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={removeFile}
                className="p-2 rounded-full hover:bg-red-100 transition-colors duration-200"
              >
                <X className="w-4 h-4 text-red-500" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FileUpload