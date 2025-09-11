import Link from "next/link"
import { Container } from "@/components/Container"

export function FooterGerman() {
  return (
    <footer className="bg-gray-900 text-white">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold mb-4">CalculaAlles.online</h3>
              <p className="text-gray-300 mb-4">
                Kostenlose Online-Rechner für Mathematik, Finanzen, Gesundheit und mehr. 
                Schnelle und erklärte Ergebnisse, 100% kostenlos.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Kategorien</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/de/mathematik" className="text-gray-300 hover:text-white transition-colors">
                    Mathematik
                  </Link>
                </li>
                <li>
                  <Link href="/de/finanzen" className="text-gray-300 hover:text-white transition-colors">
                    Finanzen
                  </Link>
                </li>
                <li>
                  <Link href="/de/gesundheit" className="text-gray-300 hover:text-white transition-colors">
                    Gesundheit
                  </Link>
                </li>
                <li>
                  <Link href="/de/geometrie" className="text-gray-300 hover:text-white transition-colors">
                    Geometrie
                  </Link>
                </li>
                <li>
                  <Link href="/de/kalender" className="text-gray-300 hover:text-white transition-colors">
                    Kalender
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Rechtliches</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/de/privacidad" className="text-gray-300 hover:text-white transition-colors">
                    Datenschutz
                  </Link>
                </li>
                <li>
                  <Link href="/de/terminos" className="text-gray-300 hover:text-white transition-colors">
                    Nutzungsbedingungen
                  </Link>
                </li>
                <li>
                  <Link href="/de/contacto" className="text-gray-300 hover:text-white transition-colors">
                    Kontakt
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 CalculaAlles.online. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
