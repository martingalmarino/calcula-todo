import Link from "next/link"
import { Calculator, Mail, Globe, Heart } from "lucide-react"
import { Container } from "@/components/Container"

export function FooterPortuguese() {
  return (
    <footer className="bg-blue-900">
      <Container>
        <div className="py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/pt" className="flex items-center space-x-2 mb-4">
                <Calculator className="h-8 w-8 text-white" />
                <span className="text-2xl font-bold text-white">CalculaTodo.online</span>
              </Link>
              <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-md">
                Sua plataforma de confiança para calculadoras matemáticas online gratuitas. 
                Resolvemos seus problemas de cálculo de forma rápida, precisa e fácil de entender.
              </p>
              <div className="flex items-center space-x-2 text-white/80 text-sm">
                <Heart className="h-4 w-4 text-blue-400" />
                <span>Feito com amor para a comunidade educacional</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/pt/matematica/" className="text-white/80 hover:text-white transition-colors">
                    Matemática
                  </Link>
                </li>
                <li>
                  <Link href="/pt/calendario/" className="text-white/80 hover:text-white transition-colors">
                    Calendário
                  </Link>
                </li>
                <li>
                  <Link href="/pt/saude/" className="text-white/80 hover:text-white transition-colors">
                    Saúde
                  </Link>
                </li>
                <li>
                  <Link href="/pt/geometria/" className="text-white/80 hover:text-white transition-colors">
                    Geometria
                  </Link>
                </li>
                <li>
                  <Link href="/pt/outras/" className="text-white/80 hover:text-white transition-colors">
                    Outras Calculadoras
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/pt/sobre/" className="text-white/80 hover:text-white transition-colors">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="/pt/contato/" className="text-white/80 hover:text-white transition-colors">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="/pt/blog/" className="text-white/80 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/pt/privacidade/" className="text-white/80 hover:text-white transition-colors">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/pt/termos/" className="text-white/80 hover:text-white transition-colors">
                    Termos de Uso
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
                <span>Todos os direitos reservados</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-white/80 text-sm">
                  <Globe className="h-4 w-4" />
                  <span>Português</span>
                </div>
                <div className="flex items-center space-x-1 text-white/80 text-sm">
                  <Mail className="h-4 w-4" />
                  <span>contato@calculatodo.online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
