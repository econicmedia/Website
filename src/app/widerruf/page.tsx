"use client";
import React from "react";
import LegalPageLayout from "../components/LegalPageLayout";

export default function WiderrufsrechtPage() {
  return (
    <LegalPageLayout title="Widerrufsrecht">
      <div className="space-y-6 text-[#2F2F2F]">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Widerrufsbelehrung</h2>
          <p className="mb-4">
            Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
          </p>
          <p className="mb-4">
            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (BenFresh Reinigung, Inhaber: Adam Ben Brahim, Adresse: [Platzhalter für Adresse], Telefon: 0176 1115432, E-Mail: info@benfresh.de) mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
          </p>
          <p className="mb-4">
            Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Folgen des Widerrufs</h2>
          <p className="mb-4">
            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
          </p>
          <p className="mb-4">
            Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen sollen, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Muster-Widerrufsformular</h2>
          <p className="italic mb-2">
            (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)
          </p>
          <div className="border p-4 rounded-lg bg-gray-50">
            <p className="mb-2">An:<br />
            BenFresh Reinigung<br />
            Adam Ben Brahim<br />
            [Platzhalter für Adresse]<br />
            E-Mail: info@benfresh.de</p>
            <p className="mb-2">
              Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung (*):
            </p>
            <p className="mb-2">Bestellt am (*)/erhalten am (*):</p>
            <p className="mb-2">Name des/der Verbraucher(s):</p>
            <p className="mb-2">Anschrift des/der Verbraucher(s):</p>
            <p className="mb-2">Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):</p>
            <p className="mb-2">Datum:</p>
            <p className="italic text-sm">(*) Unzutreffendes streichen.</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Ausnahmen vom Widerrufsrecht</h2>
          <p className="mb-4">
            Das Widerrufsrecht erlischt vorzeitig, wenn wir mit der Ausführung der Dienstleistung mit Ihrer ausdrücklichen Zustimmung vor Ende der Widerrufsfrist begonnen haben oder Sie diese selbst veranlasst haben.
          </p>
          <p>
            Das Widerrufsrecht gilt nicht für Verträge zur Erbringung von Dienstleistungen in den Bereichen Beherbergung zu anderen Zwecken als zu Wohnzwecken, Beförderung von Waren, Kraftfahrzeugvermietung, Lieferung von Speisen und Getränken sowie zur Erbringung weiterer Dienstleistungen im Zusammenhang mit Freizeitbetätigungen, wenn der Vertrag für die Erbringung einen spezifischen Termin oder Zeitraum vorsieht.
          </p>
        </div>

        <div className="text-sm italic mt-8">
          Stand: April 2025
        </div>
      </div>
    </LegalPageLayout>
  );
}
