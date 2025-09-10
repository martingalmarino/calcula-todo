import Link from "next/link"
import { Calculator, Mail, Globe, Heart } from "lucide-react"
import { Container } from "@/components/Container"

export function FooterItalian() {
  return (
    <footer className="bg-blue-900">
      <Container>
        <div className="py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/it" className="flex items-center space-x-2 mb-4">
                <Calculator className="h-8 w-8 text-white" />
                <span className="text-2xl font-bold text-white">CalculaTutto.online</span>
              </Link>
              <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-md">
                La tua piattaforma di fiducia per calcolatrici matematiche online gratuite. 
                Risolviamo i tuoi problemi di calcolo in modo rapido, preciso e facile da capire.
              </p>
              <div className="flex items-center space-x-2 text-white/80 text-sm">
                <Heart className="h-4 w-4 text-blue-400" />
                <span>Fatto con amore per la comunit&agrave; educativa</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Link Rapidi</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/it/matematicas/" className="text-white/80 hover:text-white transition-colors">
                    Matematica
                  </Link>
                </li>
                <li>
                  <Link href="/it/calendario/" className="text-white/80 hover:text-white transition-colors">
                    Calendario
                  </Link>
                </li>
                <li>
                  <Link href="/it/salute/" className="text-white/80 hover:text-white transition-colors">
                    Salute
                  </Link>
                </li>
                <li>
                  <Link href="/it/geometria/" className="text-white/80 hover:text-white transition-colors">
                    Geometria
                  </Link>
                </li>
                <li>
                  <Link href="/it/otras/" className="text-white/80 hover:text-white transition-colors">
                    Altre Calcolatrici
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold mb-4">Supporto</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/it/chi-siamo/" className="text-white/80 hover:text-white transition-colors">
                    Chi Siamo
                  </Link>
                </li>
                <li>
                  <Link href="/it/contatto/" className="text-white/80 hover:text-white transition-colors">
                    Contatto
                  </Link>
                </li>
                <li>
                  <Link href="/it/blog/" className="text-white/80 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/it/privacy/" className="text-white/80 hover:text-white transition-colors">
                    Politica di Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/it/termini/" className="text-white/80 hover:text-white transition-colors">
                    Termini di Utilizzo
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-white/80 text-sm">
                © 2024 CalculaTutto.online - Tutti i diritti riservati
              </div>
              <div className="flex items-center space-x-6 text-white/80 text-sm">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>Italiano</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>contatto@calculatutto.online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
