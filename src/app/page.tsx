import { Metadata } from 'next'
import { Search, Zap, Shield, BookOpen } from 'lucide-react'
import { Container } from '@/components/Container'
import { CardCalculator } from '@/components/CardCalculator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { buildMeta, jsonLdWebSite } from '@/lib/seo'
import { SITE } from '@/lib/site.config'
import Link from 'next/link'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras Online – Matemáticas Gratis y Paso a Paso',
  description: 'Calculadoras matemáticas online: fracciones, porcentajes, álgebra, trigonometría y más. Resultados rápidos y explicados, 100% gratis.',
  canonical: '/',
  keywords: [
    'calculadoras online',
    'matemáticas',
    'fracciones',
    'porcentajes',
    'álgebra',
    'trigonometría',
    'derivadas',
    'integrales',
    'matrices',
    'combinatoria',
    'progresiones',
    'logaritmos',
    'gratis',
    'educación'
  ]
})

export default function HomePage() {
  const topCalculators = SITE.clusters.matematicas.calculators.slice(0, 8)
  const allCalculators = SITE.clusters.matematicas.calculators

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdWebSite()),
        }}
      />
      
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="hero-gradient py-20 md:py-32">
          <Container>
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Calculadoras Online
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                  Resuelve problemas matemáticos con nuestras calculadoras gratuitas. 
                  Resultados instantáneos con explicaciones paso a paso.
                </p>
              </div>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar calculadora..."
                    className="pl-10 pr-4 py-3 text-base"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/matematicas/">
                    Explorar Calculadoras
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/acerca/">
                    ¿Cómo funciona?
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <Container>
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                ¿Por qué elegir nuestras calculadoras?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Herramientas matemáticas diseñadas para estudiantes, profesores y profesionales
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Rápido y Preciso</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Obtén resultados instantáneos con cálculos precisos y confiables
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Explicaciones Paso a Paso</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Aprende cómo se resuelve cada problema con explicaciones detalladas
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>100% Gratuito</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Sin registros, sin pagos, sin límites. Completamente gratuito para todos
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* Top Calculators Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <Container>
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Calculadoras Más Populares
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Las herramientas matemáticas más utilizadas por nuestros usuarios
              </p>
            </div>
            
            <div className="calculator-grid">
              {topCalculators.map((calculator) => (
                <CardCalculator
                  key={calculator.href}
                  title={calculator.label}
                  description={calculator.description}
                  href={calculator.href}
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href="/matematicas/">
                  Ver Todas las Calculadoras
                </Link>
              </Button>
            </div>
          </Container>
        </section>

        {/* Categories Section */}
        <section className="py-16 md:py-24">
          <Container>
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Categorías de Matemáticas
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explora nuestras calculadoras organizadas por temas matemáticos
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(SITE.clusters).map((cluster) => (
                <Card key={cluster.href} className="group hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {cluster.label}
                    </CardTitle>
                    <CardDescription>
                      {cluster.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        {cluster.calculators.length} calculadoras disponibles
                      </p>
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <Link href={cluster.href}>
                          Explorar {cluster.label}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* All Calculators Index */}
        <section className="py-16 md:py-24 bg-muted/30">
          <Container>
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Todas las Calculadoras
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Lista completa de todas nuestras calculadoras matemáticas
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allCalculators.map((calculator) => (
                <Link
                  key={calculator.href}
                  href={calculator.href}
                  className="block p-4 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <div className="font-medium">{calculator.label}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {calculator.description}
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <Container>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl">
                  ¿Falta alguna calculadora?
                </CardTitle>
                <CardDescription className="text-lg">
                  Sugiérenos nuevas calculadoras o mejoras para las existentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="lg" asChild>
                  <Link href="/contacto/">
                    Enviar Sugerencia
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </Container>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <Container>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Sobre Calculadoras Online
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  Calculadoras Online es una plataforma educativa gratuita que ofrece 
                  herramientas matemáticas avanzadas para estudiantes, profesores y profesionales. 
                  Nuestro objetivo es hacer las matemáticas más accesibles y comprensibles 
                  para todos.
                </p>
                <p>
                  Cada calculadora incluye explicaciones paso a paso, ejemplos prácticos 
                  y resultados precisos. Todas nuestras herramientas son completamente 
                  gratuitas, no requieren registro y funcionan directamente en tu navegador.
                </p>
                <p>
                  Nuestro equipo de matemáticos y desarrolladores trabaja constantemente 
                  para mejorar la precisión de los cálculos y agregar nuevas funcionalidades. 
                  Si tienes sugerencias o encuentras algún error, no dudes en contactarnos.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}