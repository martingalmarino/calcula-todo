import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { buildMeta } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'
import Link from 'next/link'

export const metadata: Metadata = buildMeta({
  title: 'Simplificar Fracciones - Calculadora Online',
  description: 'Simplifica fracciones a su forma irreducible con explicaciones paso a paso.',
  keywords: ['simplificar fracciones', 'fracción irreducible', 'máximo común divisor', 'MCD']
})

export default function SimplificarFraccionesPage() {
  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs 
          items={getBreadcrumbs('/matematicas/fracciones/simplificar/')} 
          className="mb-8"
        />

        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Simplificar Fracciones
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Simplifica fracciones a su forma irreducible usando el máximo común divisor (MCD)
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
              Mientras tanto, puedes usar nuestra calculadora general de fracciones que incluye la funcionalidad de simplificación.
            </p>
            <Button asChild>
              <Link href="/matematicas/fracciones/">
                Ir a Calculadora de Fracciones
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
