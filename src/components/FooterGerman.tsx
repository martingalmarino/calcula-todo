import Link from "next/link"
import { Calculator, Mail, Globe, Heart } from "lucide-react"
import { Container } from "@/components/Container"

export function FooterGerman() {
  return (
    <footer className="bg-blue-900">
      <Container>
        <div className="py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/de" className="flex items-center space-x-2 mb-4">
                <Calculator className="h-8 w-8 text-white" />
                <span className="text-2xl font-bold text-white">CalculaAlles.online</span>
              </Link>
              <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-md">
                Ihre vertrauenswürdige Plattform für kostenlose Online-Mathematikrechner. 
                Wir lösen Ihre Berechnungsprobleme schnell, präzise und verständlich.
              </p>
              <div className="flex items-center space-x-2 text-white/80 text-sm">
                <Heart className="h-4 w-4 text-blue-400" />
                <span>Mit Liebe für die Bildungsgemeinschaft gemacht</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Schnelllinks</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/de/mathematik/" className="text-white/80 hover:text-white transition-colors">
                    Mathematik
                  </Link>
                </li>
                <li>
                  <Link href="/de/kalender/" className="text-white/80 hover:text-white transition-colors">
                    Kalender
                  </Link>
                </li>
                <li>
                  <Link href="/de/gesundheit/" className="text-white/80 hover:text-white transition-colors">
                    Gesundheit
                  </Link>
                </li>
                <li>
                  <Link href="/de/geometrie/" className="text-white/80 hover:text-white transition-colors">
                    Geometrie
                  </Link>
                </li>
                <li>
                  <Link href="/de/andere/" className="text-white/80 hover:text-white transition-colors">
                    Andere Rechner
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/de/uber-uns/" className="text-white/80 hover:text-white transition-colors">
                    Über Uns
                  </Link>
                </li>
                <li>
                  <Link href="/de/kontakt/" className="text-white/80 hover:text-white transition-colors">
                    Kontakt
                  </Link>
                </li>
                <li>
                  <Link href="/de/blog/" className="text-white/80 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/de/datenschutz/" className="text-white/80 hover:text-white transition-colors">
                    Datenschutzrichtlinie
                  </Link>
                </li>
                <li>
                  <Link href="/de/nutzungsbedingungen/" className="text-white/80 hover:text-white transition-colors">
                    Nutzungsbedingungen
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 text-white/80 text-sm">
                <span>© 2024 CalculaAlles.online</span>
                <span>•</span>
                <span>Alle Rechte vorbehalten</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-white/80 text-sm">
                  <Globe className="h-4 w-4" />
                  <span>Deutsch</span>
                </div>
                <div className="flex items-center space-x-1 text-white/80 text-sm">
                  <Mail className="h-4 w-4" />
                  <span>kontakt@calculaalles.online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
