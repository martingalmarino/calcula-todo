"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { SITE } from '@/lib/site.config'
import { Calculator, HardDrive, Download, Clock, Palette, Shield, Zap, Users } from 'lucide-react'

const tecnologiaCluster = SITE.clusters.tecnologia

export default function TecnologiaClientPT() {
  const customIcons = {
    '/pt/tecnologia/conversao-armazenamento/': HardDrive,
    '/pt/tecnologia/velocidade-download/': Download,
    '/pt/tecnologia/uptime-downtime/': Clock,
    '/pt/tecnologia/conversao-cores/': Palette,
    '/pt/tecnologia/analise-senhas/': Shield,
    '/pt/tecnologia/analise-latencia/': Zap
  }

  const customStats = [
    {
      icon: Calculator,
      value: tecnologiaCluster.calculators.length.toString(),
      label: 'Calculadoras Disponíveis',
      color: 'blue' as const
    },
    {
      icon: HardDrive,
      value: '6',
      label: 'Ferramentas Tecnológicas',
      color: 'green' as const
    },
    {
      icon: Users,
      value: '100%',
      label: 'Gratuito',
      color: 'purple' as const
    }
  ]

  const faqItems = [
    {
      question: "Como funciona a conversão de armazenamento?",
      answer: "Converte entre diferentes unidades de armazenamento (KB, MB, GB, TB) usando tanto o sistema decimal (1000) quanto binário (1024) de acordo com o contexto."
    },
    {
      question: "O que é velocidade de download em Mbps vs MB/s?",
      answer: "Mbps (megabits por segundo) é a velocidade da sua conexão, enquanto MB/s (megabytes por segundo) é a velocidade real de download. 1 byte = 8 bits."
    },
    {
      question: "Como calcular uptime e downtime?",
      answer: "O uptime é o tempo que um serviço está funcionando, enquanto o downtime é o tempo que está fora de serviço. É calculado como porcentagem do tempo total."
    },
    {
      question: "Que formatos de cor a calculadora suporta?",
      answer: "Suporta conversão entre HEX (hexadecimal), RGB (Red, Green, Blue) e CMYK (Cyan, Magenta, Yellow, Black) para diferentes usos em design e impressão."
    },
    {
      question: "Como analisar a segurança das minhas senhas?",
      answer: "A calculadora avalia a força da sua senha baseada em comprimento, complexidade, caracteres especiais e padrões comuns para determinar seu nível de segurança."
    },
    {
      question: "O que é análise de latência?",
      answer: "A latência é o tempo que leva para um pacote de dados viajar de um ponto a outro. É crucial para aplicações em tempo real e jogos online."
    }
  ]

  // Mapear as calculadoras para português
  const calculatorsPT = tecnologiaCluster.calculators.map(calc => {
    let href = calc.href.replace('/tecnologia/', '/pt/tecnologia/')
    
    // Corrigir nomes das pastas para coincidir com as que vamos criar
    if (href.includes('conversion-almacenamiento')) {
      href = href.replace('conversion-almacenamiento', 'conversao-armazenamento')
    }
    if (href.includes('velocidad-descarga')) {
      href = href.replace('velocidad-descarga', 'velocidade-download')
    }
    if (href.includes('conversion-colores')) {
      href = href.replace('conversion-colores', 'conversao-cores')
    }
    if (href.includes('analisis-contraseñas')) {
      href = href.replace('analisis-contraseñas', 'analise-senhas')
    }
    if (href.includes('analisis-latencia')) {
      href = href.replace('analisis-latencia', 'analise-latencia')
    }
    
    return {
      ...calc,
      href,
      label: calc.label === 'Conversión de Almacenamiento' ? 'Conversão de Armazenamento' :
             calc.label === 'Velocidad de Descarga' ? 'Velocidade de Download' :
             calc.label === 'Conversión de Colores' ? 'Conversão de Cores' :
             calc.label === 'Análisis de Contraseñas' ? 'Análise de Senhas' :
             calc.label === 'Análisis de Latencia' ? 'Análise de Latência' :
             calc.label,
      description: calc.description === 'Convierte entre KB, MB, GB, TB con base decimal y binaria'
        ? 'Converte entre KB, MB, GB, TB com base decimal e binária'
        : calc.description === 'Convierte Mbps a MB/s y calcula tiempo de descarga'
        ? 'Converte Mbps para MB/s e calcula tempo de download'
        : calc.description === 'Calcula uptime y downtime de servicios web'
        ? 'Calcula uptime e downtime de serviços web'
        : calc.description === 'Convierte entre formatos HEX, RGB y CMYK'
        ? 'Converte entre formatos HEX, RGB e CMYK'
        : calc.description === 'Analiza la fortaleza y seguridad de contraseñas'
        ? 'Analisa a força e segurança de senhas'
        : calc.description === 'Calcula latencia y tiempo de respuesta de red'
        ? 'Calcula latência e tempo de resposta de rede'
        : calc.description
    }
  })

  // Criar objeto category para português
  const categoryPT = {
    ...tecnologiaCluster,
    label: 'Tecnologia',
    description: 'Ferramentas especializadas em tecnologia para desenvolvedores, designers e técnicos. Converte unidades, analisa performance, gerencia cores e muito mais.',
    calculators: calculatorsPT
  }

  return (
    <CategoryPageLayout
      category={categoryPT}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
