import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Termos de Uso - Calculadoras Online',
  description: 'Termos de uso da Calculadoras Online. Condições para o uso de nossas calculadoras gratuitas.',
  noIndex: true
})

export default function TermosPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Termos de Uso
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <Card>
            <CardHeader>
              <CardTitle>Aceitação dos Termos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Ao acessar e usar a Calculadoras Online, você concorda em estar sujeito a estes 
                termos de uso. Se você não concorda com algum destes termos, 
                não deve usar nossos serviços.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Uso das Calculadoras</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Nossas calculadoras estão disponíveis para uso educacional e pessoal. Você pode:</p>
              <ul>
                <li>Usar as calculadoras para resolver problemas matemáticos</li>
                <li>Compartilhar os resultados para fins educacionais</li>
                <li>Usar as explicações passo a passo para aprender</li>
              </ul>
              <p>Você não pode:</p>
              <ul>
                <li>Usar as calculadoras para atividades comerciais sem autorização</li>
                <li>Tentar acessar sistemas ou dados não autorizados</li>
                <li>Usar as calculadoras de forma que possa danificar o serviço</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Precisão dos Resultados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Embora nos esforcemos para fornecer resultados precisos, não podemos 
                garantir a exatidão absoluta de todos os cálculos. Recomendamos 
                verificar os resultados para cálculos críticos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Propriedade Intelectual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Todo o conteúdo da Calculadoras Online, incluindo algoritmos, 
                interface do usuário e documentação, está protegido por direitos 
                autorais e outras leis de propriedade intelectual.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitação de Responsabilidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p>
                  A Calculadoras Online é fornecida &quot;como está&quot; sem garantias 
                  de qualquer tipo. Não seremos responsáveis por danos diretos, 
                  indiretos, incidentais ou consequenciais que possam resultar 
                  do uso de nossos serviços.
                </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modificações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Reservamo-nos o direito de modificar estes termos a qualquer 
                momento. As alterações entrarão em vigor imediatamente após 
                sua publicação no site.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Se você tem perguntas sobre estes termos de uso, pode 
                entrar em contato conosco em: contato@calculatodo.online
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
