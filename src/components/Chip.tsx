import { cn } from '@/lib/utils'

interface ChipProps {
  href: string
  icon: string
  children: React.ReactNode
  className?: string
  ariaLabel?: string
}

export function Chip({ href, icon, children, className, ariaLabel }: ChipProps) {
  return (
    <a 
      href={href}
      className={cn("chip", className)}
      aria-label={ariaLabel}
    >
      <i data-lucide={icon} aria-hidden="true"></i>
      <span>{children}</span>
    </a>
  )
}

interface ChipsContainerProps {
  children: React.ReactNode
  className?: string
}

export function ChipsContainer({ children, className }: ChipsContainerProps) {
  return (
    <div className={cn("chips", className)}>
      {children}
    </div>
  )
}
