"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Calculator, HardDrive, Download, Clock, Palette, Shield, Zap, Users } from 'lucide-react'

export default function TecnologiaClientIT() {
  const tecnologiaClusterIT = {
    title: 'Tecnologia',
    label: 'Tecnologia',
    description: 'Calcolatrici specializzate in tecnologia: conversione di unità, velocità internet, uptime, colori, sicurezza e latenza. Strumenti per sviluppatori e tecnici.',
    href: '/it/tecnologia',
    calculators: [
      {
        title: 'Conversione di Archiviazione',
        label: 'Conversione di Archiviazione',
        description: 'Converte tra diverse unità di archiviazione (KB, MB, GB, TB) usando sistemi decimali e binari',
        href: '/it/tecnologia/conversione-archiviazione',
        category: 'Tecnologia',
        keywords: ['conversione archiviazione', 'KB MB GB TB', 'unità digitali', 'storage']
      },
      {
        title: 'Velocità di Download',
        label: 'Velocità di Download',
        description: 'Calcola il tempo di download e converte tra Mbps e MB/s per la tua connessione internet',
        href: '/it/tecnologia/velocita-download',
        category: 'Tecnologia',
        keywords: ['velocità download', 'Mbps MB/s', 'tempo download', 'internet']
      },
      {
        title: 'Uptime/Downtime',
        label: 'Uptime/Downtime',
        description: 'Calcola uptime e downtime di servizi web, server e applicazioni',
        href: '/it/tecnologia/uptime-downtime',
        category: 'Tecnologia',
        keywords: ['uptime', 'downtime', 'disponibilità', 'server']
      },
      {
        title: 'Conversione di Colori',
        label: 'Conversione di Colori',
        description: 'Converte tra formati di colore HEX, RGB, CMYK e HSL per design e stampa',
        href: '/it/tecnologia/conversione-colori',
        category: 'Tecnologia',
        keywords: ['conversione colori', 'HEX RGB CMYK', 'design', 'colori']
      },
      {
        title: 'Analisi delle Password',
        label: 'Analisi delle Password',
        description: 'Analizza la sicurezza e la forza delle tue password',
        href: '/it/tecnologia/analisi-password',
        category: 'Tecnologia',
        keywords: ['analisi password', 'sicurezza', 'password sicure', 'cybersecurity']
      },
      {
        title: 'Analisi della Latenza',
        label: 'Analisi della Latenza',
        description: 'Calcola e analizza la latenza di rete per ottimizzare le prestazioni',
        href: '/it/tecnologia/analisi-latenza',
        category: 'Tecnologia',
        keywords: ['latenza', 'ping', 'rete', 'prestazioni']
      }
    ]
  }

  const customIcons = {
    'Conversione di Archiviazione': HardDrive,
    'Velocità di Download': Download,
    'Uptime/Downtime': Clock,
    'Conversione di Colori': Palette,
    'Analisi delle Password': Shield,
    'Analisi della Latenza': Zap
  }

  const customStats = [
    {
      icon: Calculator,
      value: tecnologiaClusterIT.calculators.length.toString(),
      label: 'Calcolatrici Disponibili',
      color: 'blue' as const
    },
    {
      icon: HardDrive,
      value: '6',
      label: 'Strumenti Tecnologici',
      color: 'green' as const
    },
    {
      icon: Users,
      value: '100%',
      label: 'Gratuito',
      color: 'purple' as const
    }
  ]

  const faqItems = [
    {
      question: "Come funziona la conversione di archiviazione?",
      answer: "Converte tra diverse unità di archiviazione (KB, MB, GB, TB) usando sia il sistema decimale (1000) che binario (1024) a seconda del contesto."
    },
    {
      question: "Cos'è la velocità di download in Mbps vs MB/s?",
      answer: "Mbps (megabit per secondo) è la velocità della tua connessione, mentre MB/s (megabyte per secondo) è la velocità reale di download. 1 byte = 8 bit."
    },
    {
      question: "Come calcolo uptime e downtime?",
      answer: "L'uptime è il tempo in cui un servizio è funzionante, mentre il downtime è il tempo in cui è fuori servizio. Si calcola come percentuale del tempo totale."
    },
    {
      question: "Quali formati di colore supporta la calcolatrice?",
      answer: "Supporta conversione tra HEX (esadecimale), RGB (Red, Green, Blue), e CMYK (Cyan, Magenta, Yellow, Black) per diversi usi in design e stampa."
    },
    {
      question: "Come analizzo la sicurezza delle mie password?",
      answer: "La calcolatrice valuta la forza della tua password basandosi su lunghezza, complessità, caratteri speciali e pattern comuni per determinare il suo livello di sicurezza."
    }
  ]

  return (
    <CategoryPageLayout
      category={tecnologiaClusterIT}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}
