import { cn } from '@/lib/utils'

interface NewLabelProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'gradient' | 'outline'
}

export function NewLabelES({ 
  className, 
  size = 'md', 
  variant = 'gradient' 
}: NewLabelProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  const variantClasses = {
    default: 'bg-red-500 text-white',
    gradient: 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg',
    outline: 'border-2 border-red-500 text-red-500 bg-white'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-bold rounded-full uppercase tracking-wide',
        'animate-pulse hover:animate-none transition-all duration-300',
        'transform hover:scale-105',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      ✨ NUEVO
    </span>
  )
}
