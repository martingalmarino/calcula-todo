import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import UrlaubstageClientDE from './UrlaubstageClientDE'

export const metadata: Metadata = buildMeta({
  title: 'Urlaubstage-Rechner - Berechnen Sie Ihre Urlaubstage und Arbeitstage',
  description: 'Berechnen Sie Ihre Urlaubstage und Arbeitstage. Kostenloser Online-Rechner für Urlaubsplanung.',
  keywords: ['urlaubstage', 'arbeitstage', 'wochenenden', 'ferien', 'urlaub berechnen', 'kalender']
})

export default function UrlaubstagePage() {
  return <UrlaubstageClientDE />
}
