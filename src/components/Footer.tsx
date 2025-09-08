import Link from "next/link"
import { Calculator, Mail, Globe, Heart } from "lucide-react"
import { Container } from "@/components/Container"

export function Footer() {
  return (
    <footer className="footer-bg">
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
              <p className="text-gray-300 text-sm leading-relaxed mb-4 max-w-md">
                Tu plataforma de confianza para calculadoras matemáticas online gratuitas. 
                Resolvemos tus problemas de cálculo de forma rápida, precisa y fácil de entender.
              </p>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Heart className="h-4 w-4 text-red-400" />
                <span>Hecho con amor para la comunidad educativa</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/matematicas/" className="footer-link">
                    Matemáticas
                  </Link>
                </li>
                <li>
                  <Link href="/calendario/" className="footer-link">
                    Calendario
                  </Link>
                </li>
                <li>
                  <Link href="/salud/" className="footer-link">
                    Salud
                  </Link>
                </li>
                <li>
                  <Link href="/geometria/" className="footer-link">
                    Geometría
                  </Link>
                </li>
                <li>
                  <Link href="/otras/" className="footer-link">
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
                  <Link href="/acerca/" className="footer-link">
                    Acerca de Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/contacto/" className="footer-link">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/blog/" className="footer-link">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/privacidad/" className="footer-link">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/terminos/" className="footer-link">
                    Términos de Uso
                  </Link>
                </li>
              </ul>
            </div>
          </div>


          {/* Bottom Section */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 text-gray-300 text-sm">
                <span>© 2024 CalculaTodo.online</span>
                <span>•</span>
                <span>Todos los derechos reservados</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-gray-300 text-sm">
                  <Globe className="h-4 w-4" />
                  <span>Español</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-300 text-sm">
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