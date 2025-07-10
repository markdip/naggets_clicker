import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AdDisplay - Платформа цифровой рекламы',
  description: 'Размещайте рекламу на цифровых экранах грузовиков, уличных дисплеях и других поверхностях',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          {children}
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            className: '',
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '8px',
              padding: '16px',
            },
          }}
        />
      </body>
    </html>
  )
}