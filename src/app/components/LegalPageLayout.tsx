"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import FooterSection from "./FooterSection";

interface LegalPageLayoutProps {
  children: ReactNode;
  title: string;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#0097A7] p-2 shadow-md flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <span className="font-bold text-xl text-[#0097A7]">BenFresh</span>
          </Link>
          <Link href="/" className="text-[#0097A7] hover:underline">
            Zurück zur Startseite
          </Link>
        </div>
      </header>
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 bg-white shadow-sm rounded-lg p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2F2F2F] mb-6 pb-4 border-b">{title}</h1>
          {children}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default LegalPageLayout;
