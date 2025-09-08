import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calculator, Users, Target, Heart } from 'lucide-react'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Acerca de Nosotros - Calculadoras Online',
  description: 'Conoce nuestra misión de hacer las matemáticas más accesibles con calculadoras online gratuitas y educativas.',
  canonical: '/acerca/',
  keywords: ['acerca de', 'misión', 'matemáticas accesibles', 'educación gratuita']
})

export default function AcercaPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Acerca de Nosotros
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Haciendo las matemáticas más accesibles para todos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Calculadoras Gratuitas</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Herramientas matemáticas completamente gratuitas y sin límites de uso
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Para Todos</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Estudiantes, profesores, profesionales y cualquier persona que necesite resolver problemas matemáticos
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Precisión Garantizada</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Algoritmos matemáticos precisos y probados para resultados confiables
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Educación</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Explicaciones paso a paso para aprender mientras resuelves problemas
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none">
          <Card>
            <CardHeader>
              <CardTitle>Nuestra Misión</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                En Calculadoras Online, creemos que las matemáticas no deberían ser una barrera para el aprendizaje. 
                Nuestra misión es proporcionar herramientas matemáticas gratuitas, precisas y educativas que ayuden 
                a estudiantes, profesores y profesionales a resolver problemas matemáticos de manera eficiente.
              </p>
              <p>
                Cada calculadora incluye explicaciones paso a paso, ejemplos prácticos y resultados precisos. 
                No solo queremos que obtengas la respuesta correcta, sino que entiendas cómo se llega a esa respuesta.
              </p>
              <p>
                Nuestro equipo de matemáticos y desarrolladores trabaja constantemente para mejorar la precisión 
                de los cálculos, agregar nuevas funcionalidades y hacer que las matemáticas sean más accesibles 
                para todos.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
