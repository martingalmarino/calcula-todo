"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter, Grid, List, Calculator } from 'lucide-react'
import Link from 'next/link'
import { Calculator as CalculatorType } from '@/lib/site.config'

interface GeometriaClientProps {
  calculators: CalculatorType[]
}

export function GeometriaClient({ calculators }: GeometriaClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Obtener categorías únicas
  const categories = ['all', ...Array.from(new Set(calculators.map(calc => calc.category)))]

  // Filtrar calculadoras
  const filteredCalculators = calculators.filter(calc => {
    const matchesSearch = calc.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         calc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         calc.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || calc.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      {/* Filtros y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Búsqueda */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar calculadoras..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtro por categoría */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Filtrar por categoría"
            >
              <option value="all">Todas las categorías</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Toggle de vista */}
        <div className="flex border border-gray-300 rounded-md">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="rounded-r-none"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="rounded-l-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Resultados */}
      <div className="text-sm text-gray-600 mb-6">
        {filteredCalculators.length} calculadora{filteredCalculators.length !== 1 ? 's' : ''} encontrada{filteredCalculators.length !== 1 ? 's' : ''}
        {searchTerm && ` para "${searchTerm}"`}
        {selectedCategory !== 'all' && ` en ${selectedCategory}`}
      </div>

      {/* Grid de calculadoras */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCalculators.map((calculator) => (
            <Card key={calculator.href} className="calculator-card shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
                    <Calculator className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {calculator.label}
                    </CardTitle>
                    <div className="text-xs text-blue-600 font-medium">
                      {calculator.category}
                    </div>
                  </div>
                </div>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {calculator.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200">
                  <Link href={calculator.href}>
                    Usar Calculadora
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCalculators.map((calculator) => (
            <Card key={calculator.href} className="calculator-card shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
                      <Calculator className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-1">
                        {calculator.label}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {calculator.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                          {calculator.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200">
                    <Link href={calculator.href}>
                      Usar Calculadora
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Mensaje si no hay resultados */}
      {filteredCalculators.length === 0 && (
        <div className="text-center py-12">
          <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No se encontraron calculadoras</h3>
          <p className="text-gray-500">
            Intenta con otros términos de búsqueda o selecciona una categoría diferente.
          </p>
        </div>
      )}
    </div>
  )
}
