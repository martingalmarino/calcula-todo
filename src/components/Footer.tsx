import Link from "next/link"
import { Calculator, Mail, ExternalLink } from "lucide-react"
import { Container } from "@/components/Container"
import { SITE } from "@/lib/site.config"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <Calculator className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Calculadoras Online</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Calculadoras matemáticas online gratuitas con resultados explicados paso a paso.
              </p>
            </div>

            {/* Calculadoras Populares */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Calculadoras Populares</h3>
              <ul className="space-y-2 text-sm">
                {SITE.clusters.matematicas.calculators.slice(0, 6).map((calc) => (
                  <li key={calc.href}>
                    <Link
                      href={calc.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {calc.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enlaces Rápidos */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-sm">
                {SITE.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Contacto</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <a
                    href={`mailto:${SITE.contact.email}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {SITE.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground">
                © {currentYear} Calculadoras Online. Todos los derechos reservados.
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <Link
                  href="/privacidad"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacidad
                </Link>
                <Link
                  href="/terminos"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Términos
                </Link>
                <Link
                  href="/sitemap.xml"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-1"
                >
                  <span>Sitemap</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
