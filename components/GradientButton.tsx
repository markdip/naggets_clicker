import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function GradientButton({
  children,
  onClick,
  disabled = false,
  size = 'md',
  className = '',
  type = 'button',
}: GradientButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden
        bg-gradient-to-r from-blue-600 to-purple-600 
        hover:from-blue-700 hover:to-purple-700 
        text-white font-semibold 
        rounded-lg
        transition-all duration-300 
        transform hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:scale-100
        ${sizeClasses[size]}
        ${className}
      `}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ x: '-100%', skewX: '-12deg' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.7 }}
      />
    </motion.button>
  );
}