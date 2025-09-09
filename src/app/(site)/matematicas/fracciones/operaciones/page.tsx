import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { buildMeta } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'
import Link from 'next/link'

export const metadata: Metadata = buildMeta({
  title: 'Operaciones con Fracciones - Calculadora Online',
  description: 'Suma, resta, multiplica y divide fracciones con explicaciones paso a paso.',
  keywords: ['operaciones fracciones', 'sumar fracciones', 'restar fracciones', 'multiplicar fracciones', 'dividir fracciones']
})

export default function OperacionesFraccionesPage() {
  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs 
          items={getBreadcrumbs('/matematicas/fracciones/operaciones/')} 
          className="mb-8"
        />

        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Operaciones con Fracciones
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Suma, resta, multiplica y divide fracciones con explicaciones detalladas
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
              Mientras tanto, puedes usar nuestra calculadora general de fracciones que incluye todas las operaciones.
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
