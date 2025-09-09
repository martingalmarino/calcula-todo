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
        "h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.03] border-2 border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/30",
        className
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
              {icon}
            </div>
            <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
              {title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm leading-relaxed text-gray-600 group-hover:text-gray-700 transition-colors">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}
