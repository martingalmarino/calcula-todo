import { cn } from "@/lib/utils"

interface PillProps {
  children: React.ReactNode
  variant?: "default" | "secondary" | "outline" | "destructive"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  active?: boolean
}

export function Pill({ 
  children, 
  variant = "default", 
  size = "md",
  className,
  onClick,
  active = false
}: PillProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  
  const variantClasses = {
    default: active 
      ? "bg-blue-600 text-white hover:bg-blue-700 border border-blue-600" 
      : "bg-gray-50 text-blue-900 border border-gray-100 hover:bg-blue-100 hover:border-blue-600",
    secondary: active
      ? "bg-blue-600 text-white hover:bg-blue-700 border border-blue-600"
      : "bg-gray-50 text-blue-900 border border-gray-100 hover:bg-blue-100 hover:border-blue-600",
    outline: active
      ? "bg-blue-600 text-white hover:bg-blue-700 border border-blue-600"
      : "bg-gray-50 text-blue-900 border border-gray-100 hover:bg-blue-100 hover:border-blue-600",
    destructive: active
      ? "bg-blue-600 text-white hover:bg-blue-700 border border-blue-600"
      : "bg-gray-50 text-blue-900 border border-gray-100 hover:bg-blue-100 hover:border-blue-600"
  }
  
  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  }
  
  const Component = onClick ? "button" : "span"
  
  return (
    <Component
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  )
}
