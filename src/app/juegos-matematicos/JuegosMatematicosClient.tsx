"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Calculator, Gamepad2, Trophy, Clock, Target, TrendingUp, Grid3X3 } from 'lucide-react'

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
    },
    {
      title: 'Desafío de Múltiplos y Divisores',
      label: 'Desafío de Múltiplos y Divisores',
      description: 'Identifica múltiplos y divisores rápidamente. ¡Filtra números por sus propiedades!',
      href: '/juegos-matematicos/multiplos-divisores',
      category: 'Juegos Matemáticos',
      keywords: ['múltiplos', 'divisores', 'números', 'propiedades', 'filtrado']
    },
    {
      title: 'Rompecabezas de Porcentajes',
      label: 'Rompecabezas de Porcentajes',
      description: 'Calcula descuentos y aumentos con porcentajes. ¡Domina los cálculos comerciales!',
      href: '/juegos-matematicos/porcentajes',
      category: 'Juegos Matemáticos',
      keywords: ['porcentajes', 'descuentos', 'aumentos', 'cálculos comerciales']
    },
    {
      title: 'Secuencias Numéricas',
      label: 'Secuencias Numéricas',
      description: 'Descubre el patrón y completa la secuencia. ¡Desarrolla tu pensamiento lógico!',
      href: '/juegos-matematicos/secuencias',
      category: 'Juegos Matemáticos',
      keywords: ['secuencias', 'patrones', 'lógica', 'progresiones', 'series']
    },
    {
      title: 'Sudoku de Operaciones Matemáticas',
      label: 'Sudoku de Operaciones Matemáticas',
      description: 'Resuelve grillas donde cada fila y columna debe sumar el mismo resultado. ¡Desafía tu lógica matemática!',
      href: '/juegos-matematicos/sudoku-operaciones',
      category: 'Juegos Matemáticos',
      keywords: ['sudoku', 'operaciones', 'grilla', 'lógica matemática', 'sumas']
    }
  ]
}

export default function JuegosMatematicosClient() {
  const customIcons = {
    'Sumas y Restas contra Reloj': Calculator,
    'Encuentra el Número Faltante': Target,
    'Rompecabezas de Fracciones': Gamepad2,
    'Desafío de Múltiplos y Divisores': Target,
    'Rompecabezas de Porcentajes': Calculator,
    'Secuencias Numéricas': TrendingUp,
    'Sudoku de Operaciones Matemáticas': Grid3X3
  }

  const customStats = [
    {
      icon: Gamepad2,
      value: '7',
      label: 'Juegos Disponibles',
      color: 'blue' as const
    },
    {
      icon: Clock,
      value: '30-45s',
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
      answer: "Cada juego tiene una duración de 30-45 segundos donde debes resolver la mayor cantidad de problemas matemáticos posibles. Cada acierto suma puntos y al final obtienes un ranking según tu rendimiento."
    },
    {
      question: "¿Qué tipos de juegos hay disponibles?",
      answer: "Tenemos 7 juegos diferentes: operaciones básicas, ecuaciones, fracciones visuales, múltiplos y divisores, porcentajes, secuencias numéricas y sudoku matemático. Cada uno desarrolla habilidades específicas."
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
