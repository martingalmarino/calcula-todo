import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calculator, Users, Target, Heart } from 'lucide-react'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Sobre Nós - Calculadoras Online',
  description: 'Conheça nossa missão de tornar a matemática mais acessível com calculadoras online gratuitas e educativas.',
  keywords: ['sobre nós', 'missão', 'matemática acessível', 'educação gratuita']
})

export default function SobrePage() {
  return (
    <Container>
      <div className="py-8">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Sobre Nós
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tornando a matemática mais acessível para todos
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
                Ferramentas matemáticas completamente gratuitas e sem limites de uso
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
                Estudantes, professores, profissionais e qualquer pessoa que precise resolver problemas matemáticos
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Precisão Garantida</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Algoritmos matemáticos precisos e testados para resultados confiáveis
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Educação</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Explicações passo a passo para aprender enquanto resolve problemas
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none">
          <Card>
            <CardHeader>
              <CardTitle>Nossa Missão</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Na Calculadoras Online, acreditamos que a matemática não deve ser uma barreira para o aprendizado. 
                Nossa missão é fornecer ferramentas matemáticas gratuitas, precisas e educativas que ajudem 
                estudantes, professores e profissionais a resolver problemas matemáticos de forma eficiente.
              </p>
              <p>
                Cada calculadora inclui explicações passo a passo, exemplos práticos e resultados precisos. 
                Não queremos apenas que você obtenha a resposta correta, mas que entenda como chegar a essa resposta.
              </p>
              <p>
                Nossa equipe de matemáticos e desenvolvedores trabalha constantemente para melhorar a precisão 
                dos cálculos, adicionar novas funcionalidades e tornar a matemática mais acessível para todos.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
