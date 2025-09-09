import Link from "next/link"
import { Calculator, Mail, Globe, Heart } from "lucide-react"
import { Container } from "@/components/Container"

export function Footer() {
  return (
    <footer className="bg-footer-new">
      <Container>
        <div className="py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Calculator className="h-8 w-8 text-footer-new" />
                <span className="text-2xl font-bold text-footer-new">CalculaTodo.online</span>
              </Link>
              <p className="text-footer-new/80 text-sm leading-relaxed mb-4 max-w-md">
                Tu plataforma de confianza para calculadoras matemáticas online gratuitas. 
                Resolvemos tus problemas de cálculo de forma rápida, precisa y fácil de entender.
              </p>
              <div className="flex items-center space-x-2 text-footer-new/80 text-sm">
                <Heart className="h-4 w-4 text-accent-new" />
                <span>Hecho con amor para la comunidad educativa</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-footer-new font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/matematicas/" className="text-footer-new/80 hover:text-footer-new transition-colors">
                    Matemáticas
                  </Link>
                </li>
                <li>
                  <Link href="/calendario/" className="text-footer-new/80 hover:text-footer-new transition-colors">
                    Calendario
                  </Link>
                </li>
                <li>
                  <Link href="/salud/" className="text-footer-new/80 hover:text-footer-new transition-colors">
                    Salud
                  </Link>
                </li>
                <li>
                  <Link href="/geometria/" className="text-footer-new/80 hover:text-footer-new transition-colors">
                    Geometría
                  </Link>
                </li>
                <li>
                  <Link href="/otras/" className="text-footer-new/80 hover:text-footer-new transition-colors">
                    Otras Calculadoras
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-footer-new font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/acerca/" className="text-footer-new/80 hover:text-footer-new transition-colors">
                    Acerca de Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/contacto/" className="text-footer-new/80 hover:text-footer-new transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/blog/" className="text-footer-new/80 hover:text-footer-new transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/privacidad/" className="text-footer-new/80 hover:text-footer-new transition-colors">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/terminos/" className="text-footer-new/80 hover:text-footer-new transition-colors">
                    Términos de Uso
                  </Link>
                </li>
              </ul>
            </div>
          </div>


          {/* Bottom Section */}
          <div className="border-t border-footer-new/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 text-footer-new/80 text-sm">
                <span>© 2024 CalculaTodo.online</span>
                <span>•</span>
                <span>Todos los derechos reservados</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-footer-new/80 text-sm">
                  <Globe className="h-4 w-4" />
                  <span>Español</span>
                </div>
                <div className="flex items-center space-x-1 text-footer-new/80 text-sm">
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