import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Política de Privacidade - Calculadoras Online',
  description: 'Política de privacidade da Calculadoras Online. Informações sobre como coletamos e usamos seus dados.',
  noIndex: true
})

export default function PrivacidadePage() {
  return (
    <Container>
      <div className="py-8">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Política de Privacidade
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <Card>
            <CardHeader>
              <CardTitle>Informações que Coletamos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                A Calculadoras Online está comprometida com a proteção de sua privacidade. 
                Coletamos o mínimo de informações necessárias para fornecer nossos serviços.
              </p>
              <h3>Informações de Uso</h3>
              <p>
                Coletamos informações sobre como você usa nossas calculadoras, incluindo:
              </p>
              <ul>
                <li>Páginas visitadas e tempo de permanência</li>
                <li>Tipo de calculadoras utilizadas</li>
                <li>Informações técnicas do navegador e dispositivo</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Como Usamos suas Informações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Utilizamos as informações coletadas para:</p>
              <ul>
                <li>Melhorar nossas calculadoras e serviços</li>
                <li>Analisar o uso do site</li>
                <li>Fornecer suporte técnico</li>
                <li>Desenvolver novas funcionalidades</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies e Tecnologias Similares</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência 
                e analisar o uso do site. Você pode controlar o uso de cookies 
                através das configurações do seu navegador.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compartilhar Informações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Não vendemos, alugamos nem compartilhamos suas informações pessoais com 
                terceiros, exceto quando necessário para fornecer nossos 
                serviços ou quando a lei exigir.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Implementamos medidas de segurança apropriadas para proteger suas 
                informações contra acesso não autorizado, alteração, divulgação 
                ou destruição.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Se você tem perguntas sobre esta política de privacidade, pode 
                entrar em contato conosco em: contato@calculatodo.online
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
