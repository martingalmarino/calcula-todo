import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Calculator } from "lucide-react"

interface CardCalculatorProps {
  title: string
  description: string
  href: string
  icon?: React.ReactNode
  className?: string
}

export function CardCalculator({ 
  title, 
  description, 
  href, 
  icon = <Calculator className="h-6 w-6" />,
  className 
}: CardCalculatorProps) {
  return (
    <Link href={href} className="group">
      <Card className={cn(
        "h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-primary/20",
        className
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              {icon}
            </div>
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm leading-relaxed">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}
