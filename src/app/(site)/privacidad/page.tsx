import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Política de Privacidad - Calculadoras Online',
  description: 'Política de privacidad de Calculadoras Online. Información sobre cómo recopilamos y usamos tus datos.',
  canonical: '/privacidad/',
  noIndex: true
})

export default function PrivacidadPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Política de Privacidad
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Última actualización: {new Date().toLocaleDateString('es-AR')}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <Card>
            <CardHeader>
              <CardTitle>Información que Recopilamos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Calculadoras Online está comprometido con la protección de tu privacidad. 
                Recopilamos la mínima información necesaria para proporcionar nuestros servicios.
              </p>
              <h3>Información de Uso</h3>
              <p>
                Recopilamos información sobre cómo usas nuestras calculadoras, incluyendo:
              </p>
              <ul>
                <li>Páginas visitadas y tiempo de permanencia</li>
                <li>Tipo de calculadoras utilizadas</li>
                <li>Información técnica del navegador y dispositivo</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cómo Usamos tu Información</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Utilizamos la información recopilada para:</p>
              <ul>
                <li>Mejorar nuestras calculadoras y servicios</li>
                <li>Analizar el uso del sitio web</li>
                <li>Proporcionar soporte técnico</li>
                <li>Desarrollar nuevas funcionalidades</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies y Tecnologías Similares</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia 
                y analizar el uso del sitio web. Puedes controlar el uso de cookies 
                a través de la configuración de tu navegador.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compartir Información</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                No vendemos, alquilamos ni compartimos tu información personal con 
                terceros, excepto cuando sea necesario para proporcionar nuestros 
                servicios o cuando la ley lo requiera.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Implementamos medidas de seguridad apropiadas para proteger tu 
                información contra acceso no autorizado, alteración, divulgación 
                o destrucción.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Si tienes preguntas sobre esta política de privacidad, puedes 
                contactarnos en: contacto@calculadoras-online.com
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
