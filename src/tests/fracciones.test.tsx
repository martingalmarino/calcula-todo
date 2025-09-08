import { describe, it, expect } from 'vitest'
import { 
  simplify, 
  toDecimal, 
  fromDecimal,
  add,
  subtract,
  multiply,
  divide,
  gcd
} from '@/lib/math/fractions'

describe('Calculadora de Fracciones', () => {
  describe('gcd', () => {
    it('debería calcular correctamente el máximo común divisor', () => {
      expect(gcd(12, 18)).toBe(6)
      expect(gcd(15, 25)).toBe(5)
      expect(gcd(7, 13)).toBe(1)
    })

    it('debería manejar números negativos', () => {
      expect(gcd(-12, 18)).toBe(6)
      expect(gcd(12, -18)).toBe(6)
      expect(gcd(-12, -18)).toBe(6)
    })
  })

  describe('simplify', () => {
    it('debería simplificar fracciones correctamente', () => {
      const result = simplify(12, 18)
      expect(result.result.numerator).toBe(2)
      expect(result.result.denominator).toBe(3)
      expect(result.decimal).toBeCloseTo(0.6667, 4)
    })

    it('debería manejar fracciones ya simplificadas', () => {
      const result = simplify(3, 4)
      expect(result.result.numerator).toBe(3)
      expect(result.result.denominator).toBe(4)
    })

    it('debería lanzar error cuando el denominador es cero', () => {
      expect(() => simplify(5, 0)).toThrow('El denominador no puede ser cero')
    })
  })

  describe('toDecimal', () => {
    it('debería convertir fracciones a decimales correctamente', () => {
      expect(toDecimal(1, 2)).toBe(0.5)
      expect(toDecimal(3, 4)).toBe(0.75)
      expect(toDecimal(22, 7)).toBeCloseTo(3.1429, 4)
    })

    it('debería lanzar error cuando el denominador es cero', () => {
      expect(() => toDecimal(5, 0)).toThrow('El denominador no puede ser cero')
    })
  })

  describe('fromDecimal', () => {
    it('debería convertir decimales a fracciones correctamente', () => {
      const result = fromDecimal(0.5)
      expect(result.result.numerator).toBe(1)
      expect(result.result.denominator).toBe(2)
    })

    it('debería manejar decimales con más decimales', () => {
      const result = fromDecimal(0.75)
      expect(result.result.numerator).toBe(3)
      expect(result.result.denominator).toBe(4)
    })
  })

  describe('add', () => {
    it('debería sumar fracciones correctamente', () => {
      const result = add({ numerator: 1, denominator: 2 }, { numerator: 1, denominator: 3 })
      expect(result.result.numerator).toBe(5)
      expect(result.result.denominator).toBe(6)
    })

    it('debería simplificar el resultado', () => {
      const result = add({ numerator: 1, denominator: 4 }, { numerator: 1, denominator: 4 })
      expect(result.result.numerator).toBe(1)
      expect(result.result.denominator).toBe(2)
    })
  })

  describe('subtract', () => {
    it('debería restar fracciones correctamente', () => {
      const result = subtract({ numerator: 1, denominator: 2 }, { numerator: 1, denominator: 3 })
      expect(result.result.numerator).toBe(1)
      expect(result.result.denominator).toBe(6)
    })
  })

  describe('multiply', () => {
    it('debería multiplicar fracciones correctamente', () => {
      const result = multiply({ numerator: 2, denominator: 3 }, { numerator: 3, denominator: 4 })
      expect(result.result.numerator).toBe(1)
      expect(result.result.denominator).toBe(2)
    })
  })

  describe('divide', () => {
    it('debería dividir fracciones correctamente', () => {
      const result = divide({ numerator: 1, denominator: 2 }, { numerator: 1, denominator: 3 })
      expect(result.result.numerator).toBe(3)
      expect(result.result.denominator).toBe(2)
    })

    it('debería lanzar error al dividir por cero', () => {
      expect(() => divide({ numerator: 1, denominator: 2 }, { numerator: 0, denominator: 1 }))
        .toThrow('No se puede dividir por cero')
    })
  })
})
