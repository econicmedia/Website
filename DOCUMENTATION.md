# BenFresh Website Documentation

Diese Dokumentation bietet einen umfassenden Überblick über die BenFresh Website und wie man Änderungen vornehmen kann.

## Inhaltsverzeichnis

1. [Projektübersicht](#projektübersicht)
2. [Tech Stack](#tech-stack)
3. [Projektstruktur](#projektstruktur)
4. [Inhaltsänderungen vornehmen](#inhaltsänderungen-vornehmen)
5. [Deployment](#deployment)
6. [Monitoring & Analytics](#monitoring--analytics)
7. [Wartung & Aktualisierungen](#wartung--aktualisierungen)

## Projektübersicht

Die BenFresh Website ist eine moderne, responsive Next.js-Anwendung, die als Landingpage für das BenFresh Reinigungsunternehmen dient. Die Website bietet Informationen über die Dienstleistungen, Vorteile, und Kontaktmöglichkeiten von BenFresh.

### Schlüsselfunktionen

- Responsive Design für alle Geräte (Mobil, Tablet, Desktop)
- Optimiert für Zugänglichkeit (WCAG-Standards)
- DSGVO-konformes Kontaktformular
- Cookie-Banner mit detaillierten Einstellungen
- WhatsApp-Integration für direkten Kontakt
- Rechtlich abgesicherte Seiten (Impressum, AGB, Datenschutz)
- Optimiert für SEO und Performance

## Tech Stack

Die Website wurde mit folgenden Technologien entwickelt:

- **Frontend Framework**: [Next.js](https://nextjs.org/) (React-basiert)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) für modulare, responsive Styles
- **Komponenten**: React-Komponenten für Wiederverwendbarkeit und Wartbarkeit
- **Performance**: Optimierte Bilder, Lazy Loading, Code Splitting
- **Serverseitige Funktionen**: Formular-Backend, API-Routen
- **Monitoring**: Integriertes Monitoring und Fehlerverfolgung

## Projektstruktur

Die Codebasis ist wie folgt strukturiert:

```
benfresh-landingpage/
├── .github/            # GitHub Workflows (CI/CD)
├── public/             # Statische Assets (Bilder, Fonts, etc.)
├── src/
│   ├── app/            # Next.js App Router Pages
│   │   ├── api/        # API-Routen für Serveranfragen
│   │   ├── components/ # Seitenspezifische Komponenten
│   │   ├── globals.css # Globale Stile
│   │   ├── layout.tsx  # Haupt-Layout der Anwendung
│   │   └── page.tsx    # Hauptseite (Home)
│   ├── components/     # Wiederverwendbare Komponenten
│   └── utils/          # Hilfsfunktionen und Dienstprogramme
├── .env.local          # Umgebungsvariablen (lokal)
├── next.config.ts      # Next.js Konfiguration
├── package.json        # Abhängigkeiten und Skripte
└── tailwind.config.js  # Tailwind CSS Konfiguration
```

## Inhaltsänderungen vornehmen

### Texte ändern

Haupttexte und Inhalte befinden sich in den jeweiligen Komponenten im `src/app/components/` Verzeichnis:

1. **Hero-Sektion**: `src/app/components/HeroSection.tsx`
2. **Services-Sektion**: `src/app/components/ServicesSection.tsx`
3. **Warum BenFresh-Sektion**: `src/app/components/WhyBenfreshSection.tsx`
4. **Kontakt-Sektion**: `src/app/components/ContactSection.tsx`
5. **Footer-Sektion**: `src/app/components/FooterSection.tsx`

Um Texte zu ändern:

1. Öffnen Sie die entsprechende Komponentendatei
2. Suchen Sie den zu ändernden Text (achten Sie auf die JSX-Struktur)
3. Nehmen Sie die gewünschten Änderungen vor
4. Speichern Sie die Datei und testen Sie die Änderungen lokal

**Beispiel**: Um den Haupttitel auf der Startseite zu ändern:

```jsx
// In src/app/components/HeroSection.tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-benfresh-grayDark dark:text-white mb-4 font-poppins leading-tight">
  Professionelle Reinigung <br className="hidden md:block" />
  für Ihren <span className="text-benfresh-teal dark:text-benfresh-dark-teal">perfekten Eindruck</span>
</h1>
```

### Bilder ändern

Bilder werden über die `OptimizedImage`-Komponente eingebunden, die auf Next.js Image basiert:

1. Platzieren Sie neue Bilder im `public/`-Verzeichnis
2. Ändern Sie den Pfad in der entsprechenden Komponente

```jsx
<OptimizedImage
  src="/path/to/new-image.jpg"
  alt="Beschreibender Alternativtext"
  width={600}
  height={400}
  className="..."
/>
```

### Rechtliche Texte ändern

Rechtliche Texte (Impressum, Datenschutz, AGB) befinden sich in separaten Seiten:

- `src/app/impressum/page.tsx`
- `src/app/datenschutz/page.tsx`
- `src/app/agb/page.tsx`
- `src/app/widerruf/page.tsx`

### Design-Tokens

Design-Tokens wie Farben und Schriftgrößen sind in der Tailwind-Konfiguration definiert:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'benfresh-teal': '#0097A7',
        'benfresh-tealDark': '#00838F',
        'benfresh-tealLight': '#B2EBF2',
        // ...weitere Farben
      },
      // ...weitere Einstellungen
    }
  }
}
```

## Deployment

Die Website wird automatisch über GitHub Actions deployed:

1. Änderungen werden zum `main`-Branch gepusht
2. GitHub Action wird ausgelöst (`.github/workflows/deploy.yml`)
3. Tests und Build werden ausgeführt
4. Bei Erfolg wird die neue Version automatisch deployed

Für manuelle Deployments kann folgender Befehl verwendet werden:

```bash
npm run build && npm run start
```

## Monitoring & Analytics

Die Website verfügt über ein integriertes Monitoring-System, das folgende Aspekte überwacht:

- **Performance-Metriken**: Ladezeiten, Core Web Vitals
- **Fehler-Tracking**: JavaScript-Fehler werden automatisch erfasst
- **Nutzerinteraktionen**: Seitenaufrufe und wichtige Interaktionen

Die Daten werden über die API-Route `/api/monitoring` erfasst und können im Dashboard eingesehen werden.

### Analytics

Google Analytics wird nur geladen, wenn der Benutzer dem Cookie-Banner zugestimmt hat. Die Integration erfolgt über das konditionale Script in `src/app/layout.tsx`.

## Wartung & Aktualisierungen

### Abhängigkeiten aktualisieren

Regelmäßige Updates der Abhängigkeiten sind wichtig für die Sicherheit und Funktionalität:

```bash
npm outdated       # Zeigt veraltete Pakete an
npm update         # Führt Updates gemäß package.json durch
npm audit fix      # Behebt Sicherheitsprobleme
```

### Backup-Strategie

Es wird empfohlen, regelmäßige Backups der Website durchzuführen:

1. **Code-Backup**: Der gesamte Quellcode ist in Git versioniert
2. **Datenbank-Backup**: Formular-Einreichungen werden in der Datenbank gespeichert (falls konfiguriert)
3. **Asset-Backup**: Statische Assets sollten separat gesichert werden

## Weitere Ressourcen

- [Next.js Dokumentation](https://nextjs.org/docs)
- [Tailwind CSS Dokumentation](https://tailwindcss.com/docs)
- [React Dokumentation](https://react.dev/)
