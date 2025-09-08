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
      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
      : "bg-primary/10 text-primary hover:bg-primary/20",
    secondary: active
      ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      : "bg-secondary/50 text-secondary-foreground hover:bg-secondary/70",
    outline: active
      ? "border-2 border-primary bg-primary/10 text-primary"
      : "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    destructive: active
      ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
      : "bg-destructive/10 text-destructive hover:bg-destructive/20"
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
