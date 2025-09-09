"use client";

import { useState } from 'react';
import { Zap, Calculator } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { jsonLdCalculator } from '@/lib/seo';
import { getBreadcrumbs } from '@/lib/site.config';
import { calculateElectricityConsumption } from '@/lib/math/gastronomy';
import { FAQ } from '@/components/FAQ';

const breadcrumbs = getBreadcrumbs('/gastronomia-hogar/consumo-electrico/');

const jsonLd = jsonLdCalculator({
  name: 'Calculadora de Consumo Eléctrico de Electrodomésticos',
  description: 'Calcula el consumo eléctrico y costo de tus electrodomésticos para optimizar tu factura de luz.',
  url: 'https://www.calculatodo.online/gastronomia-hogar/consumo-electrico/',
  category: 'Gastronomía y Hogar'
});

const commonAppliances = [
  { name: 'Horno Eléctrico', power: 2000, hours: 1, description: 'Cocción de alimentos' },
  { name: 'Microondas', power: 1000, hours: 0.5, description: 'Calentar comida' },
  { name: 'Refrigerador', power: 150, hours: 24, description: 'Funcionamiento continuo' },
  { name: 'Lavadora', power: 2000, hours: 1.5, description: 'Ciclo completo' },
  { name: 'Secadora', power: 3000, hours: 1, description: 'Secado de ropa' },
  { name: 'Aire Acondicionado', power: 2500, hours: 8, description: 'Enfriamiento' },
  { name: 'Calentador de Agua', power: 4000, hours: 2, description: 'Calentar agua' },
  { name: 'Lavavajillas', power: 1800, hours: 1.5, description: 'Lavado de platos' },
  { name: 'Plancha', power: 1200, hours: 0.5, description: 'Planchado de ropa' },
  { name: 'Aspiradora', power: 1500, hours: 0.5, description: 'Limpieza' }
];

const efficiencyTips = [
  {
    category: 'Cocina',
    tips: [
      'Usa el microondas en lugar del horno para calentar pequeñas porciones',
      'Cubre las ollas al cocinar para reducir el tiempo de cocción',
      'Descongela los alimentos en el refrigerador, no en el microondas',
      'Usa ollas del tamaño correcto para la cantidad de comida'
    ]
  },
  {
    category: 'Lavado',
    tips: [
      'Lava con agua fría cuando sea posible',
      'Llena completamente la lavadora y lavavajillas',
      'Usa ciclos de lavado más cortos para ropa poco sucia',
      'Limpia regularmente los filtros de la lavadora'
    ]
  },
  {
    category: 'Refrigeración',
    tips: [
      'Mantén la temperatura del refrigerador entre 3-5°C',
      'Limpia las bobinas del refrigerador regularmente',
      'No pongas alimentos calientes directamente en el refrigerador',
      'Verifica que las puertas cierren herméticamente'
    ]
  },
  {
    category: 'Climatización',
    tips: [
      'Usa ventiladores de techo para distribuir el aire',
      'Mantén las ventanas cerradas cuando uses aire acondicionado',
      'Usa cortinas para bloquear el sol en verano',
      'Programa el termostato para ahorrar energía'
    ]
  }
];

export default function ConsumoElectricoClient() {
  const [power, setPower] = useState<number>(1000);
  const [hoursPerDay, setHoursPerDay] = useState<number>(2);
  const [daysPerMonth, setDaysPerMonth] = useState<number>(30);
  const [costPerKWh, setCostPerKWh] = useState<number>(0.15);
  const [result, setResult] = useState<{
    monthlyKWh: number;
    monthlyCost: number;
    yearlyCost: number;
    dailyKWh: number;
    dailyCost: number;
  } | null>(null);

  const calculate = () => {
    try {
      if (power <= 0 || hoursPerDay <= 0 || daysPerMonth <= 0 || costPerKWh <= 0) {
        alert('Por favor, ingresa valores válidos mayores a 0');
        return;
      }

      const calculation = calculateElectricityConsumption(power, hoursPerDay * daysPerMonth, costPerKWh);
      
      // Convertir el resultado al formato esperado
      setResult({
        monthlyKWh: calculation.consumption,
        monthlyCost: calculation.cost,
        yearlyCost: calculation.cost * 12,
        dailyKWh: calculation.consumption / daysPerMonth,
        dailyCost: calculation.cost / daysPerMonth
      });
    } catch (error) {
      alert('Error en el cálculo: ' + (error as Error).message);
    }
  };

  const handleApplianceClick = (appliance: typeof commonAppliances[0]) => {
    setPower(appliance.power);
    setHoursPerDay(appliance.hours);
    setDaysPerMonth(30);
    setResult(null);
  };

  const getEfficiencyRating = (kWh: number) => {
    if (kWh < 50) return { rating: 'Muy Eficiente', color: 'text-green-600', bg: 'bg-green-50' };
    if (kWh < 100) return { rating: 'Eficiente', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (kWh < 200) return { rating: 'Moderado', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { rating: 'Alto Consumo', color: 'text-red-600', bg: 'bg-red-50' };
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <div className="py-8">
          <Breadcrumbs 
            items={breadcrumbs} 
            className="mb-8"
          />

          <CalculatorLayout
            title="Calculadora de Consumo Eléctrico de Electrodomésticos"
            description="Calcula el consumo eléctrico y costo de tus electrodomésticos para optimizar tu factura de luz."
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <div className="max-w-4xl mx-auto">

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Zap className="text-blue-600" />
                    Parámetros del Electrodoméstico
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Potencia (Watts)
                      </label>
                      <Input
                        type="number"
                        value={power}
                        onChange={(e) => setPower(parseFloat(e.target.value) || 0)}
                        placeholder="1000"
                        min="0"
                        step="1"
                      />
                      <p className="text-sm text-gray-600 mt-1">
                        Encuentra la potencia en la etiqueta del electrodoméstico
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Horas de Uso por Día
                      </label>
                      <Input
                        type="number"
                        value={hoursPerDay}
                        onChange={(e) => setHoursPerDay(parseFloat(e.target.value) || 0)}
                        placeholder="2"
                        min="0"
                        step="0.1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Días de Uso por Mes
                      </label>
                      <Input
                        type="number"
                        value={daysPerMonth}
                        onChange={(e) => setDaysPerMonth(parseInt(e.target.value) || 0)}
                        placeholder="30"
                        min="0"
                        step="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Costo por kWh ($)
                      </label>
                      <Input
                        type="number"
                        value={costPerKWh}
                        onChange={(e) => setCostPerKWh(parseFloat(e.target.value) || 0)}
                        placeholder="0.15"
                        min="0"
                        step="0.01"
                      />
                      <p className="text-sm text-gray-600 mt-1">
                        Consulta tu factura de luz para el costo exacto
                      </p>
                    </div>

                    <div className="mt-4">
                      <Button onClick={calculate} className="w-full">
                        <Calculator className="w-4 h-4 mr-2" />
                        Calcular Consumo
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="space-y-6">
                {result && (
                  <Card>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Resultados del Consumo
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">Consumo Mensual</h4>
                          <p className="text-2xl font-bold text-blue-600">
                            {result.monthlyKWh} kWh
                          </p>
                        </div>
                        
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">Costo Mensual</h4>
                          <p className="text-2xl font-bold text-green-600">
                            ${result.monthlyCost}
                          </p>
                        </div>
                        
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-800 mb-2">Costo Anual</h4>
                          <p className="text-xl font-bold text-purple-600">
                            ${result.yearlyCost}
                          </p>
                        </div>
                        
                        <div className={`p-4 rounded-lg ${getEfficiencyRating(result.monthlyKWh).bg}`}>
                          <h4 className={`font-semibold mb-2 ${getEfficiencyRating(result.monthlyKWh).color}`}>
                            Eficiencia Energética
                          </h4>
                          <p className={`text-lg font-bold ${getEfficiencyRating(result.monthlyKWh).color}`}>
                            {getEfficiencyRating(result.monthlyKWh).rating}
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">Desglose Diario</h4>
                          <div className="text-sm text-gray-700">
                            <p>• Consumo diario: {result.dailyKWh} kWh</p>
                            <p>• Costo diario: ${result.dailyCost}</p>
                            <p>• Potencia promedio: {power}W</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                <Card>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Electrodomésticos Comunes
                    </h3>
                    
                    <div className="space-y-2">
                      {commonAppliances.map((appliance, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={() => handleApplianceClick(appliance)}
                          className="w-full justify-start text-left h-auto p-3"
                        >
                          <div className="flex justify-between items-center w-full">
                            <div>
                              <p className="font-medium">{appliance.name}</p>
                              <p className="text-sm text-gray-600">
                                {appliance.power}W • {appliance.hours}h/día • {appliance.description}
                              </p>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Consejos de Ahorro Energético
                    </h3>
                    
                    <div className="space-y-4">
                      {efficiencyTips.map((category, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h4 className="font-semibold text-gray-800 mb-2">{category.category}</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {category.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <FAQ
              title="Preguntas Frecuentes sobre Consumo Eléctrico"
              items={[
                {
                  question: "¿Cómo encuentro la potencia de mi electrodoméstico?",
                  answer: "La potencia se encuentra en la etiqueta del electrodoméstico, generalmente expresada en Watts (W) o kilowatts (kW). También puedes consultar el manual del usuario o buscar el modelo en internet."
                },
                {
                  question: "¿Qué es un kWh?",
                  answer: "Un kilowatt-hora (kWh) es la unidad de medida de energía eléctrica. Representa la cantidad de energía consumida por un electrodoméstico de 1000W funcionando durante 1 hora."
                },
                {
                  question: "¿Cómo puedo reducir mi consumo eléctrico?",
                  answer: "Usa electrodomésticos eficientes (clase A+++), optimiza los horarios de uso, mantén los equipos en buen estado, y considera el uso de temporizadores y termostatos programables."
                },
                {
                  question: "¿Los electrodomésticos consumen energía cuando están apagados?",
                  answer: "Sí, muchos electrodomésticos consumen energía en modo standby. Usa regletas con interruptor para desconectar completamente los equipos que no uses."
                }
              ]}
            />
            </div>
          </CalculatorLayout>
        </div>
      </Container>
    </>
  );
}
