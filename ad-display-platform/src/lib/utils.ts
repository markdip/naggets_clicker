import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  }).format(amount)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function calculateCampaignCost(
  pricePerHour: number,
  startDate: Date,
  endDate: Date
): number {
  const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)
  return pricePerHour * hours
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'pending':
      return 'text-yellow-600 bg-yellow-100'
    case 'approved':
      return 'text-green-600 bg-green-100'
    case 'rejected':
      return 'text-red-600 bg-red-100'
    case 'active':
      return 'text-blue-600 bg-blue-100'
    case 'completed':
      return 'text-gray-600 bg-gray-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

export function getStatusText(status: string): string {
  switch (status) {
    case 'pending':
      return 'На рассмотрении'
    case 'approved':
      return 'Одобрено'
    case 'rejected':
      return 'Отклонено'
    case 'active':
      return 'Активно'
    case 'completed':
      return 'Завершено'
    default:
      return 'Неизвестно'
  }
}