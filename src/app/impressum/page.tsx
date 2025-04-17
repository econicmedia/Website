"use client";
import React from "react";
import LegalPageLayout from "../components/LegalPageLayout";

export default function ImpressumPage() {
  return (
    <LegalPageLayout title="Impressum (gemäß §5 TMG)">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">BenFresh Reinigung</h2>
          <p className="mb-1">Inhaber: Adam Ben Brahim</p>
          <p className="mb-1">Adresse: [Platzhalter für Adresse]</p>
          <p className="mb-1">Telefon: 0176 1115432</p>
          <p className="mb-1">E-Mail: info@benfresh.de</p>
          <p className="mb-1">Umsatzsteuer-ID: [Platzhalter]</p>
          <p className="mb-1">Handelsregister: [Platzhalter, falls vorhanden]</p>
        </div>

        <div>
          <p className="italic">
            Verantwortlich für den Inhalt nach § 55 Abs. Eine VorgabeParadies Vorlage aus der Kategorie § Recht. 2 RStV: Adam Ben Brahim
          </p>
        </div>

        <div className="pt-6 text-sm">
          <h3 className="font-semibold text-lg mb-2">Haftungsausschluss</h3>
          <p className="mb-2">
            <strong>1. Haftung für Inhalte</strong><br />
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
          </p>
          <p className="mb-2">
            <strong>2. Haftung für Links</strong><br />
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>
          <p className="mb-2">
            <strong>3. Urheberrecht</strong><br />
            Die Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>
      </div>
    </LegalPageLayout>
  );
}
