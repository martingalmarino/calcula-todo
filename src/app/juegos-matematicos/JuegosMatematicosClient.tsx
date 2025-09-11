"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Calculator, Gamepad2, Brain, Trophy, Clock, Target } from 'lucide-react'

const juegosMatematicosCluster = {
  title: 'Juegos de Inteligencia Matemática',
  label: 'Juegos de Inteligencia Matemática',
  description: 'Diviértete aprendiendo matemáticas con nuestros juegos educativos. Mejora tu agilidad mental, velocidad de cálculo y comprensión matemática de forma entretenida.',
  href: '/juegos-matematicos',
  calculators: [
    {
      title: 'Sumas y Restas contra Reloj',
      label: 'Sumas y Restas contra Reloj',
      description: 'Resuelve operaciones de suma y resta en 30 segundos. ¡Demuestra tu velocidad mental!',
      href: '/juegos-matematicos/sumas-restas',
      category: 'Juegos Matemáticos',
      keywords: ['sumas', 'restas', 'velocidad', 'cálculo mental', 'agilidad']
    },
    {
      title: 'Encuentra el Número Faltante',
      label: 'Encuentra el Número Faltante',
      description: 'Completa las ecuaciones encontrando el número que falta. ¡Pon a prueba tu lógica!',
      href: '/juegos-matematicos/numero-faltante',
      category: 'Juegos Matemáticos',
      keywords: ['ecuaciones', 'números faltantes', 'lógica', 'álgebra básica']
    },
    {
      title: 'Rompecabezas de Fracciones',
      label: 'Rompecabezas de Fracciones',
      description: 'Identifica fracciones visuales con pizzas divididas. ¡Aprende fracciones de forma visual!',
      href: '/juegos-matematicos/fracciones',
      category: 'Juegos Matemáticos',
      keywords: ['fracciones', 'visual', 'pizzas', 'matemáticas visuales']
    }
  ]
}

export default function JuegosMatematicosClient() {
  const customIcons = {
    'Sumas y Restas contra Reloj': Calculator,
    'Encuentra el Número Faltante': Target,
    'Rompecabezas de Fracciones': Gamepad2
  }

  const customStats = [
    {
      icon: Gamepad2,
      value: '3',
      label: 'Juegos Disponibles',
      color: 'blue' as const
    },
    {
      icon: Clock,
      value: '30s',
      label: 'Por Partida',
      color: 'green' as const
    },
    {
      icon: Trophy,
      value: '100%',
      label: 'Gratuito',
      color: 'purple' as const
    }
  ]

  const faqItems = [
    {
      question: "¿Cómo funcionan los juegos de matemáticas?",
      answer: "Cada juego tiene una duración de 30 segundos donde debes resolver la mayor cantidad de problemas matemáticos posibles. Cada acierto suma puntos y al final obtienes un ranking según tu rendimiento."
    },
    {
      question: "¿Qué niveles de dificultad hay?",
      answer: "Actualmente tenemos juegos de nivel fácil, perfectos para practicar y mejorar la agilidad mental. Los problemas van desde sumas y restas básicas hasta fracciones visuales."
    },
    {
      question: "¿Los juegos son apropiados para niños?",
      answer: "Sí, todos nuestros juegos están diseñados para ser educativos y apropiados para niños, pero también son divertidos para adultos que quieren mantener su mente ágil."
    },
    {
      question: "¿Puedo jugar en mi móvil?",
      answer: "¡Por supuesto! Todos los juegos están optimizados para funcionar perfectamente en computadora, tablet y móvil."
    },
    {
      question: "¿Hay algún sistema de puntuación?",
      answer: "Sí, cada juego tiene su propio sistema de puntuación y ranking. Puedes obtener desde 'Principiante' hasta 'Genio' según tu rendimiento."
    }
  ]

  return (
    <CategoryPageLayout
      category={juegosMatematicosCluster}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
