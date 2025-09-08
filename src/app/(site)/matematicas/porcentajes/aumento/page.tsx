import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { buildMeta } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'
import Link from 'next/link'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Aumentos - Calcular Aumentos Online',
  description: 'Calcula aumentos porcentuales y precios finales con explicaciones paso a paso.',
  canonical: '/matematicas/porcentajes/aumento/',
  keywords: ['calculadora aumentos', 'calcular aumento', 'precio final', 'incremento', 'subida']
})

export default function AumentosPage() {
  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs 
          items={getBreadcrumbs('/matematicas/porcentajes/aumento/')} 
          className="mb-8"
        />

        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Calculadora de Aumentos
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calcula aumentos porcentuales y precios finales con explicaciones paso a paso
          </p>
        </div>

        <Card className="text-center">
          <CardHeader>
            <CardTitle>Próximamente</CardTitle>
            <CardDescription>
              Esta calculadora especializada estará disponible pronto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Mientras tanto, puedes usar nuestra calculadora general de porcentajes que incluye la funcionalidad de aumentos.
            </p>
            <Button asChild>
              <Link href="/matematicas/porcentajes/">
                Ir a Calculadora de Porcentajes
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
