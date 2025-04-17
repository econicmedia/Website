"use client";
import React from "react";
import LegalPageLayout from "../components/LegalPageLayout";

export default function DatenschutzPage() {
  return (
    <LegalPageLayout title="Datenschutzerklärung (gemäß DSGVO)">
      <div className="space-y-6 text-[#2F2F2F]">
        <p className="italic mb-4">
          Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und Zweck der Verarbeitung personenbezogener Daten auf dieser Website.
        </p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Verantwortlicher</h2>
          <p>BenFresh Reinigung</p>
          <p>Inhaber: Adam Ben Brahim</p>
          <p>E-Mail: info@benfresh.de</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Erhobene Daten</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Kontaktformular:</strong> Name, E-Mail, Nachricht (nur zur Bearbeitung der Anfrage)
            </li>
            <li>
              <strong>Keine automatische Speicherung:</strong> Ihre Daten werden nicht auf unserem Server gespeichert, sondern lediglich zur Bearbeitung Ihrer Anfrage per E-Mail übermittelt.
            </li>
            <li>
              <strong>Keine Weitergabe an Dritte:</strong> Ihre Daten werden nicht an Dritte weitergegeben.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Rechte der Nutzer</h2>
          <p className="mb-2">
            Als betroffene Person haben Sie folgende Rechte:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Auskunftsrecht (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
            <li>Recht auf Löschung (Art. 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
          </ul>
          <p className="mt-2">
            Zur Ausübung dieser Rechte können Sie sich jederzeit an uns wenden.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Cookies und Tracking</h2>
          <p>
            Diese Website verwendet keine Tracking-Cookies und führt kein Nutzertracking durch. Es werden keine Daten zu Marketingzwecken gesammelt oder an Dritte weitergegeben.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">WhatsApp-Kommunikation</h2>
          <p>
            Wenn Sie den bereitgestellten WhatsApp-Button nutzen, werden Sie zu WhatsApp weitergeleitet. Bitte beachten Sie, dass die Kommunikation über WhatsApp den Datenschutzbestimmungen von WhatsApp/Meta unterliegt, auf die wir keinen Einfluss haben.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Kontakt Datenschutz</h2>
          <p>
            Bei Fragen zum Datenschutz können Sie uns jederzeit unter info@benfresh.de kontaktieren.
          </p>
        </div>

        <div className="text-sm italic mt-8">
          Stand: April 2025
        </div>
      </div>
    </LegalPageLayout>
  );
}
