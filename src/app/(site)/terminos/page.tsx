import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Términos de Uso - Calculadoras Online',
  description: 'Términos de uso de Calculadoras Online. Condiciones para el uso de nuestras calculadoras gratuitas.',
  noIndex: true
})

export default function TerminosPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Términos de Uso
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Última actualización: {new Date().toLocaleDateString('es-AR')}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <Card>
            <CardHeader>
              <CardTitle>Aceptación de los Términos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Al acceder y usar Calculadoras Online, aceptas estar sujeto a estos 
                términos de uso. Si no estás de acuerdo con alguno de estos términos, 
                no debes usar nuestros servicios.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Uso de las Calculadoras</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Nuestras calculadoras están disponibles para uso educativo y personal. Puedes:</p>
              <ul>
                <li>Usar las calculadoras para resolver problemas matemáticos</li>
                <li>Compartir los resultados con fines educativos</li>
                <li>Usar las explicaciones paso a paso para aprender</li>
              </ul>
              <p>No puedes:</p>
              <ul>
                <li>Usar las calculadoras para actividades comerciales sin autorización</li>
                <li>Intentar acceder a sistemas o datos no autorizados</li>
                <li>Usar las calculadoras de manera que pueda dañar el servicio</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Precisión de los Resultados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Aunque nos esforzamos por proporcionar resultados precisos, no podemos 
                garantizar la exactitud absoluta de todos los cálculos. Te recomendamos 
                verificar los resultados para cálculos críticos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Propiedad Intelectual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Todo el contenido de Calculadoras Online, incluyendo algoritmos, 
                interfaz de usuario y documentación, está protegido por derechos 
                de autor y otras leyes de propiedad intelectual.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitación de Responsabilidad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p>
                  Calculadoras Online se proporciona &quot;tal como está&quot; sin garantías 
                  de ningún tipo. No seremos responsables por daños directos, 
                  indirectos, incidentales o consecuenciales que puedan resultar 
                  del uso de nuestros servicios.
                </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modificaciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier 
                momento. Los cambios entrarán en vigor inmediatamente después de 
                su publicación en el sitio web.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Si tienes preguntas sobre estos términos de uso, puedes 
                contactarnos en: contacto@calculadoras-online.com
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
