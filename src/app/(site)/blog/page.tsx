import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Blog - Artículos sobre Matemáticas y Calculadoras',
  description: 'Artículos educativos sobre matemáticas, consejos para usar calculadoras y explicaciones de conceptos matemáticos.',
  keywords: ['blog matemáticas', 'artículos educativos', 'consejos calculadoras', 'conceptos matemáticos']
})

export default function BlogPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Blog de Matemáticas
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Artículos educativos sobre matemáticas, consejos para usar calculadoras y explicaciones de conceptos matemáticos
          </p>
        </div>

        <Card className="text-center">
          <CardHeader>
            <CardTitle>Próximamente</CardTitle>
            <CardDescription>
              Estamos preparando contenido educativo de calidad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Pronto publicaremos artículos sobre matemáticas, tutoriales de calculadoras y consejos educativos.
            </p>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
