"use client";
import React from "react";
import LegalPageLayout from "../components/LegalPageLayout";

export default function AGBPage() {
  return (
    <LegalPageLayout title="Allgemeine Geschäftsbedingungen (AGB)">
      <div className="space-y-6 text-[#2F2F2F]">
        <p className="font-semibold text-center mb-4">
          AGB für Reinigungsunternehmen BenFresh Reinigung
        </p>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">1. Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen (nachfolgend &quot;AGB&quot;) gelten für alle Verträge, die zwischen dem Kunden und BenFresh Reinigung (nachfolgend &quot;Anbieter&quot;) geschlossen werden. Abweichende AGB des Kunden werden nicht anerkannt, es sei denn, der Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">2. Vertragsschluss</h2>
          <p>
            Die Darstellung der Reinigungsdienstleistungen auf der Website stellt kein rechtlich bindendes Angebot dar, sondern eine unverbindliche Aufforderung an den Kunden, Reinigungsdienstleistungen zu buchen. Der Vertrag kommt erst durch die Auftragsbestätigung des Anbieters oder durch die Ausführung der Reinigungsarbeiten zustande.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">3. Leistungen</h2>
          <p className="mb-2">
            Der Umfang der Leistungen ergibt sich aus der Leistungsbeschreibung der Auftragsbestätigung oder des Angebots.
          </p>
          <p className="mb-2">
            Der Anbieter verpflichtet sich, die vereinbarten Reinigungsarbeiten sorgfältig und fachgerecht durchzuführen. Die Reinigungsarbeiten werden zu den vereinbarten Terminen durchgeführt.
          </p>
          <p>
            Sofern nicht ausdrücklich anders vereinbart, schuldet der Anbieter nur die Reinigungsleistung, nicht jedoch einen bestimmten Erfolg.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">4. Preise und Zahlungsbedingungen</h2>
          <p className="mb-2">
            Es gelten die zum Zeitpunkt der Beauftragung vereinbarten Preise. Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer.
          </p>
          <p className="mb-2">
            Die Zahlung erfolgt nach Erbringung der Reinigungsleistung durch Überweisung auf das in der Rechnung angegebene Konto innerhalb von 7 Tagen ohne Abzug.
          </p>
          <p>
            Bei Zahlungsverzug ist der Anbieter berechtigt, Verzugszinsen in Höhe von 5 Prozentpunkten über dem Basiszinssatz zu berechnen.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">5. Haftung</h2>
          <p className="mb-2">
            Der Anbieter haftet unbeschränkt für Schäden, die durch vorsätzliches oder grob fahrlässiges Verhalten verursacht wurden sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
          </p>
          <p className="mb-2">
            Bei leicht fahrlässiger Verletzung einer Pflicht, die wesentlich für die Erreichung des Vertragszwecks ist (Kardinalpflicht), ist die Haftung des Anbieters der Höhe nach begrenzt auf den Schaden, der nach der Art des fraglichen Geschäfts vorhersehbar und typisch ist.
          </p>
          <p>
            Eine weitergehende Haftung des Anbieters besteht nicht.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">6. Datenschutz</h2>
          <p>
            Der Anbieter verarbeitet personenbezogene Daten des Kunden zweckgebunden und gemäß den gesetzlichen Bestimmungen. Die zum Zwecke der Bestellung von Dienstleistungen angegebenen persönlichen Daten werden zur Erfüllung und Abwicklung der Verträge verwendet. Nähere Informationen sind in der Datenschutzerklärung enthalten.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">7. Schlussbestimmungen</h2>
          <p className="mb-2">
            Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
          </p>
          <p className="mb-2">
            Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, so wird hierdurch die Wirksamkeit der übrigen Bestimmungen nicht berührt.
          </p>
          <p>
            Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz des Anbieters.
          </p>
        </div>

        <div className="text-sm italic mt-8">
          Stand: April 2025
        </div>
      </div>
    </LegalPageLayout>
  );
}
