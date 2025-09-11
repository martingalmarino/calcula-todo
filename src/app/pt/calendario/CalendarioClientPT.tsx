"use client"

import { Container } from '@/components/Container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, User, Clock, Plus, Plane } from 'lucide-react'
import { SITE } from '@/lib/site.config'

export default function CalendarioClientPT() {
  const calendarioCluster = SITE.clusters.calendario

  const calculatorsPT = calendarioCluster.calculators.map(calc => {
    let href = calc.href.replace('/calendario/', '/pt/calendario/')
    
    // Corrigir nomes das pastas para coincidir com as que vamos criar
    if (href.includes('calculadora-edad')) {
      href = href.replace('calculadora-edad', 'calculadora-idade')
    }
    if (href.includes('dias-entre-fechas')) {
      href = href.replace('dias-entre-fechas', 'dias-entre-datas')
    }
    if (href.includes('dias-vacaciones')) {
      href = href.replace('dias-vacaciones', 'dias-ferias')
    }
    if (href.includes('horas-minutos')) {
      href = href.replace('horas-minutos', 'horas-e-minutos')
    }
    if (href.includes('sumar-restar-dias')) {
      href = href.replace('sumar-restar-dias', 'somar-e-subtrair-dias')
    }

    return {
      ...calc,
      href,
      label: calc.label === 'Calculadora de Edad' ? 'Calculadora de Idade' :
             calc.label === 'Días entre Fechas' ? 'Dias entre Datas' :
             calc.label === 'Días de Vacaciones' ? 'Dias de Férias' :
             calc.label === 'Horas y Minutos' ? 'Horas e Minutos' :
             calc.label === 'Sumar / Restar Días' ? 'Somar e Subtrair Dias' : calc.label,
      description: calc.description === 'Calcula la diferencia en días entre dos fechas específicas' ? 'Calcula a diferença em dias entre duas datas específicas' :
                  calc.description === 'Calcula tu edad exacta en años, meses y días' ? 'Calcula sua idade exata em anos, meses e dias' :
                  calc.description === 'Suma o resta días a una fecha específica' ? 'Soma ou subtrai dias a uma data específica' :
                  calc.description === 'Calcula y convierte entre horas y minutos' ? 'Calcula e converte entre horas e minutos' :
                  calc.description === 'Calcula los días de vacaciones entre dos fechas' ? 'Calcula os dias de férias entre duas datas' : calc.description
    }
  })

  return (
    <Container>
      <div className="py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Calculadoras de Calendário</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ferramentas de calendário e datas: calcular dias entre datas, idade exata, somar/subtrair dias, horas e minutos, e dias de férias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculatorsPT.map((calculator, index) => {
            const icons = [User, Calendar, Plus, Clock, Plane]
            const IconComponent = icons[index] || Calendar
            
            return (
              <Card key={calculator.href} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{calculator.label}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{calculator.description}</p>
                  <a
                    href={calculator.href}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Usar Calculadora
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </Container>
  )
}
