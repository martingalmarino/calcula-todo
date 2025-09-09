import Link from "next/link"
import { Calculator, Mail, Globe, Heart } from "lucide-react"
import { Container } from "@/components/Container"

export function Footer() {
  return (
    <footer className="bg-blue-900">
      <Container>
        <div className="py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Calculator className="h-8 w-8 text-white" />
                <span className="text-2xl font-bold text-white">CalculaTodo.online</span>
              </Link>
              <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-md">
                Tu plataforma de confianza para calculadoras matemáticas online gratuitas. 
                Resolvemos tus problemas de cálculo de forma rápida, precisa y fácil de entender.
              </p>
              <div className="flex items-center space-x-2 text-white/80 text-sm">
                <Heart className="h-4 w-4 text-blue-400" />
                <span>Hecho con amor para la comunidad educativa</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/matematicas/" className="text-white/80 hover:text-white transition-colors">
                    Matemáticas
                  </Link>
                </li>
                <li>
                  <Link href="/calendario/" className="text-white/80 hover:text-white transition-colors">
                    Calendario
                  </Link>
                </li>
                <li>
                  <Link href="/salud/" className="text-white/80 hover:text-white transition-colors">
                    Salud
                  </Link>
                </li>
                <li>
                  <Link href="/geometria/" className="text-white/80 hover:text-white transition-colors">
                    Geometría
                  </Link>
                </li>
                <li>
                  <Link href="/otras/" className="text-white/80 hover:text-white transition-colors">
                    Otras Calculadoras
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/acerca/" className="text-white/80 hover:text-white transition-colors">
                    Acerca de Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/contacto/" className="text-white/80 hover:text-white transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/blog/" className="text-white/80 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/privacidad/" className="text-white/80 hover:text-white transition-colors">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/terminos/" className="text-white/80 hover:text-white transition-colors">
                    Términos de Uso
                  </Link>
                </li>
              </ul>
            </div>
          </div>


          {/* Bottom Section */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 text-white/80 text-sm">
                <span>© 2024 CalculaTodo.online</span>
                <span>•</span>
                <span>Todos los derechos reservados</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-white/80 text-sm">
                  <Globe className="h-4 w-4" />
                  <span>Español</span>
                </div>
                <div className="flex items-center space-x-1 text-white/80 text-sm">
                  <Mail className="h-4 w-4" />
                  <span>contacto@calculatodo.online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}