import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator } from "lucide-react"

interface RelatedLink {
  label: string
  href: string
  description?: string
}

interface RelatedLinksProps {
  links: RelatedLink[]
  title?: string
  className?: string
}

export function RelatedLinks({ 
  links, 
  title = "Calculadoras Relacionadas",
  className 
}: RelatedLinksProps) {
  if (links.length === 0) return null

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>
          Otras calculadoras que podrían interesarte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="block p-3 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <div className="font-medium">{link.label}</div>
              {link.description && (
                <div className="text-sm text-muted-foreground mt-1">
                  {link.description}
                </div>
              )}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
