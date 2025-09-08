import { describe, it, expect } from 'vitest'
import { 
  percentageOf, 
  percentageOfNumber, 
  increase, 
  decrease, 
  variationPercent 
} from '@/lib/math/percentage'

describe('Calculadora de Porcentajes', () => {
  describe('percentageOf', () => {
    it('debería calcular correctamente qué porcentaje es X de Y', () => {
      const result = percentageOf(25, 100)
      expect(result.result).toBe(25)
      expect(result.formula).toBe('(25 ÷ 100) × 100')
      expect(result.steps).toHaveLength(2)
    })

    it('debería manejar valores decimales', () => {
      const result = percentageOf(33.33, 100)
      expect(result.result).toBeCloseTo(33.33, 2)
    })

    it('debería lanzar error cuando Y es cero', () => {
      expect(() => percentageOf(25, 0)).toThrow('El denominador no puede ser cero')
    })
  })

  describe('percentageOfNumber', () => {
    it('debería calcular correctamente el X% de un número', () => {
      const result = percentageOfNumber(25, 200)
      expect(result.result).toBe(50)
      expect(result.formula).toBe('(25 ÷ 100) × 200')
    })

    it('debería manejar porcentajes decimales', () => {
      const result = percentageOfNumber(12.5, 80)
      expect(result.result).toBe(10)
    })
  })

  describe('increase', () => {
    it('debería calcular correctamente un aumento', () => {
      const result = increase(100, 20)
      expect(result.result).toBe(120)
      expect(result.formula).toBe('100 + (20% de 100)')
    })

    it('debería manejar aumentos decimales', () => {
      const result = increase(200, 15.5)
      expect(result.result).toBe(231)
    })
  })

  describe('decrease', () => {
    it('debería calcular correctamente un descuento', () => {
      const result = decrease(100, 20)
      expect(result.result).toBe(80)
      expect(result.formula).toBe('100 - (20% de 100)')
    })

    it('debería manejar descuentos decimales', () => {
      const result = decrease(200, 12.5)
      expect(result.result).toBe(175)
    })
  })

  describe('variationPercent', () => {
    it('debería calcular correctamente la variación porcentual', () => {
      const result = variationPercent(100, 120)
      expect(result.result).toBe(20)
      expect(result.formula).toBe('((120 - 100) ÷ 100) × 100')
    })

    it('debería manejar variaciones negativas', () => {
      const result = variationPercent(100, 80)
      expect(result.result).toBe(-20)
    })

    it('debería lanzar error cuando el valor anterior es cero', () => {
      expect(() => variationPercent(0, 100)).toThrow('El valor anterior no puede ser cero')
    })
  })
})
