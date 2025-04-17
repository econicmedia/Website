"use client";
import React, { useState, FormEvent } from "react";
import Link from "next/link";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  privacy: false,
};

const ContactSection: React.FC = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
    privacy: "",
  });
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "", message: "", privacy: "" };

    if (!form.name || form.name.trim().length < 2) {
      newErrors.name = "Bitte geben Sie Ihren Namen ein (mind. 2 Zeichen).";
      valid = false;
    }
    if (
      !form.email ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(form.email)
    ) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
      valid = false;
    }
    if (!form.message || form.message.trim().length < 10) {
      newErrors.message = "Bitte geben Sie eine Nachricht ein (mind. 10 Zeichen).";
      valid = false;
    }
    if (!form.privacy) {
      newErrors.privacy = "Bitte stimmen Sie der Datenschutzerklärung zu.";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" && e.target instanceof HTMLInputElement
          ? e.target.checked
          : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setSubmitError(false);
    setResponseMessage("");
    
    if (validate()) {
      try {
        setIsLoading(true);
        
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
          setSuccess(true);
          setResponseMessage(data.message || "Vielen Dank für Ihre Nachricht. Wir melden uns in Kürze bei Ihnen.");
          setForm(initialState);
        } else {
          setSubmitError(true);
          setResponseMessage(data.message || "Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut.");
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitError(true);
        setResponseMessage("Es konnte keine Verbindung zum Server hergestellt werden. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setSubmitError(true);
    }
  };

  return (
  <section id="kontakt" className="w-full bg-white dark:bg-benfresh-dark-bg py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Enhanced background decorative elements with ambient lighting */}
      <div className="absolute inset-0 bg-wave-bottom opacity-20 pointer-events-none dark:opacity-10"></div>
      <div className="absolute -right-32 top-1/4 w-96 h-96 bg-gradient-radial from-benfresh-tealLight/30 to-transparent rounded-full blur-3xl opacity-40 dark:from-benfresh-dark-teal/20 dark:opacity-30"></div>
      <div className="absolute -left-32 bottom-1/4 w-96 h-96 bg-gradient-radial from-benfresh-tealLight/30 to-transparent rounded-full blur-3xl opacity-40 dark:from-benfresh-dark-teal/20 dark:opacity-30"></div>
      
      {/* Contact-related decorative elements */}
      <div className="absolute -top-10 -right-20 w-96 h-96 text-benfresh-tealLight dark:text-benfresh-dark-teal opacity-30 transform rotate-12">
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
        </svg>
      </div>
      
      <div className="absolute -bottom-10 -left-10 w-80 h-80 text-benfresh-tealLight dark:text-benfresh-dark-teal opacity-30 transform -rotate-12">
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 bg-benfresh-tealLight dark:bg-benfresh-dark-teal dark:bg-opacity-20 rounded-full mb-4">
            <span className="text-sm font-medium text-benfresh-teal dark:text-benfresh-dark-teal">Kontakt aufnehmen</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-benfresh-grayDark dark:text-white mb-4 font-poppins tracking-tight">
            Sprechen Sie mit uns
          </h2>
          <div className="w-20 h-1.5 bg-benfresh-teal dark:bg-benfresh-dark-teal mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-benfresh-grayDark dark:text-benfresh-dark-text">
            Haben Sie Fragen zu unseren Dienstleistungen oder möchten Sie ein individuelles Angebot erhalten? 
            Wir freuen uns auf Ihre Nachricht.
          </p>
        </div>
        
        {/* Contact Container */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Contact Form Column */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white dark:bg-benfresh-dark-card rounded-xl shadow-lg p-8 border border-[#F0F0F0] dark:border-benfresh-dark-surface relative overflow-hidden">
              {/* Ambient light effect */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-radial from-benfresh-tealLight/40 to-transparent blur-3xl opacity-40 dark:from-benfresh-dark-teal/20 rounded-full"></div>
              <div className="relative z-10">
              <h3 className="text-2xl font-bold text-benfresh-grayDark dark:text-white mb-6 relative before:content-[''] before:absolute before:-bottom-2 before:left-0 before:w-12 before:h-1 before:bg-benfresh-teal dark:before:bg-benfresh-dark-teal before:rounded-full">Kontaktformular</h3>
              
              <form className="space-y-6" autoComplete="off" noValidate onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-[#555555] dark:text-benfresh-dark-textSecondary mb-1">
                      Name <span className="text-[#F44336]">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      minLength={2} 
                      className="w-full border border-[#E5E7EB] dark:border-benfresh-dark-surface dark:bg-benfresh-dark-card dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-benfresh-teal dark:focus:ring-benfresh-dark-teal focus:border-benfresh-teal dark:focus:border-benfresh-dark-teal outline-none transition-all" 
                      placeholder="Ihr vollständiger Name"
                      value={form.name}
                      onChange={handleChange}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <span id="name-error" className="text-sm text-[#F44336] mt-1 block">{errors.name}</span>
                    )}
                  </div>
                  
                  {/* Email Field */}
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-[#555555] dark:text-benfresh-dark-textSecondary mb-1">
                      E-Mail <span className="text-[#F44336]">*</span>
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      className="w-full border border-[#E5E7EB] dark:border-benfresh-dark-surface dark:bg-benfresh-dark-card dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-benfresh-teal dark:focus:ring-benfresh-dark-teal focus:border-benfresh-teal dark:focus:border-benfresh-dark-teal outline-none transition-all" 
                      placeholder="Ihre E-Mail-Adresse"
                      value={form.email}
                      onChange={handleChange}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <span id="email-error" className="text-sm text-[#F44336] mt-1 block">{errors.email}</span>
                    )}
                  </div>
                </div>
                
                {/* Subject Field */}
                <div className="relative">
                  <label htmlFor="subject" className="block text-sm font-medium text-[#555555] dark:text-benfresh-dark-textSecondary mb-1">
                    Betreff
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    className="w-full border border-[#E5E7EB] dark:border-benfresh-dark-surface dark:bg-benfresh-dark-card dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-benfresh-teal dark:focus:ring-benfresh-dark-teal focus:border-benfresh-teal dark:focus:border-benfresh-dark-teal outline-none transition-all" 
                    placeholder="Worum geht es?"
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>
                
                {/* Message Field */}
                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-medium text-[#555555] dark:text-benfresh-dark-textSecondary mb-1">
                    Nachricht <span className="text-[#F44336]">*</span>
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required 
                    minLength={10} 
                    rows={4} 
                    className="w-full border border-[#E5E7EB] dark:border-benfresh-dark-surface dark:bg-benfresh-dark-card dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-benfresh-teal dark:focus:ring-benfresh-dark-teal focus:border-benfresh-teal dark:focus:border-benfresh-dark-teal outline-none transition-all resize-y" 
                    placeholder="Wie können wir Ihnen helfen?"
                    value={form.message}
                    onChange={handleChange}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  ></textarea>
                  {errors.message && (
                    <span id="message-error" className="text-sm text-[#F44336] mt-1 block">{errors.message}</span>
                  )}
                </div>
                
                {/* Privacy Checkbox */}
                <div className="flex items-start mt-4">
                  <div className="flex items-center h-5">
                    <input 
                      type="checkbox" 
                      id="privacy" 
                      name="privacy" 
                      required 
                      className="h-4 w-4 text-benfresh-teal dark:text-benfresh-dark-teal border-gray-300 dark:border-benfresh-dark-surface rounded focus:ring-benfresh-teal dark:focus:ring-benfresh-dark-teal"
                      checked={form.privacy}
                      onChange={handleChange}
                      aria-describedby={errors.privacy ? "privacy-error" : undefined}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="privacy" className="text-[#555555] dark:text-benfresh-dark-textSecondary">
                      Ich stimme der Verarbeitung meiner Daten gemäß <Link
                        href="/datenschutz"
                        className="text-benfresh-teal dark:text-benfresh-dark-teal hover:underline"
                        target="_blank" 
                        rel="noopener"
                      >
                        Datenschutzerklärung
                      </Link> zu. <span className="text-[#F44336]">*</span>
                    </label>
                    {errors.privacy && (
                      <span id="privacy-error" className="text-sm text-[#F44336] block mt-1">{errors.privacy}</span>
                    )}
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className={`w-full bg-benfresh-teal dark:bg-benfresh-dark-teal text-white rounded-lg px-6 py-3.5 font-semibold shadow hover:bg-benfresh-tealDark dark:hover:bg-benfresh-dark-tealDark hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-benfresh-teal dark:focus:ring-benfresh-dark-teal dark:focus:ring-offset-benfresh-dark-bg ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                    aria-label="Nachricht senden"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Wird gesendet...
                      </span>
                    ) : "Nachricht senden"}
                  </button>
                </div>
                
                {/* Form Feedback Messages */}
                {success && (
                  <div className="bg-[#E8F5E9] text-[#4CAF50] p-4 rounded-lg mt-4 font-medium" role="alert">
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-medium">Nachricht gesendet!</span>
                    </div>
                    <p className="text-sm">{responseMessage || "Wir melden uns schnellstmöglich bei Ihnen."}</p>
                  </div>
                )}
                
                {submitError && !success && (
                  <div className="bg-[#FFEBEE] text-[#F44336] p-4 rounded-lg mt-4 font-medium" role="alert">
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">Es ist ein Fehler aufgetreten</span>
                    </div>
                    <p className="text-sm">{responseMessage || "Bitte überprüfen Sie Ihre Eingaben und versuchen Sie es erneut."}</p>
                  </div>
                )}
              </form>
              
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-benfresh-dark-surface">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  <span className="text-[#0097A7] dark:text-benfresh-dark-teal font-medium">Hinweis:</span> Wir verwenden Ihre Daten ausschließlich zur Bearbeitung Ihrer Anfrage und speichern diese nicht auf unseren Servern. Es erfolgt keine Weitergabe an Dritte.
                </p>
              </div>
              </div>
            </div>
          </div>
          
          {/* Contact Info & WhatsApp Column */}
          <div className="w-full lg:w-1/3">
            {/* Enhanced WhatsApp Card with ambient lighting */}
            <div className="bg-[#F9F9F9] dark:bg-benfresh-dark-card rounded-xl shadow-md p-6 border border-[#F0F0F0] dark:border-benfresh-dark-surface mb-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              {/* Ambient light effect */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#25D366]/20 dark:bg-[#25D366]/10 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
              <h3 className="text-xl font-bold text-benfresh-grayDark dark:text-white mb-4 relative">Direkter Kontakt</h3>
              <p className="text-base text-[#555555] dark:text-benfresh-dark-text mb-5">
                Sie erreichen uns auch direkt per WhatsApp für eine schnelle und unkomplizierte Beratung oder Terminvereinbarung.
              </p>
              <a 
                href="https://wa.me/491791117165?text=Hallo%20BenFresh,%20ich%20interessiere%20mich%20für%20Ihre%20Reinigungsdienste." 
                target="_blank" 
                rel="noopener" 
                className="group inline-flex items-center justify-center w-full bg-[#25D366] text-white rounded-lg px-5 py-3 font-semibold shadow hover:bg-[#128C7E] hover:shadow-lg transition-all relative overflow-hidden"
                aria-label="Per WhatsApp kontaktieren"
              >
                {/* Button inner glow */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center">
                  <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.22-1.44l-.37-.22-3.69.97.99-3.59-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.97 2.43.03 1.43 1.04 2.81 1.19 3 .15.19 2.05 3.13 5.01 4.27.7.3 1.25.48 1.68.61.71.23 1.36.2 1.87.12.57-.09 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/>
                  </svg>
                  <span>Per WhatsApp anfragen</span>
                </div>
              </a>
              <p className="text-xs text-[#555555] dark:text-gray-400 mt-3 text-center">
                <small>Kommunikation unterliegt den <a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank" rel="noopener" className="text-[#0097A7] dark:text-benfresh-dark-teal hover:underline">Datenschutzbestimmungen von WhatsApp</a></small>
              </p>
              </div>
            </div>
            
            {/* Enhanced Contact Info Card with ambient lighting */}
            <div className="bg-white dark:bg-benfresh-dark-card rounded-xl shadow-md p-6 border border-[#F0F0F0] dark:border-benfresh-dark-surface hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              {/* Ambient light effect */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-benfresh-tealLight/30 dark:bg-benfresh-dark-teal/20 rounded-full blur-2xl opacity-60"></div>
              <div className="relative z-10">
              <h3 className="text-xl font-bold text-benfresh-grayDark dark:text-white mb-4 relative before:content-[''] before:absolute before:-bottom-2 before:left-0 before:w-10 before:h-1 before:bg-benfresh-teal dark:before:bg-benfresh-dark-teal before:rounded-full">Kontaktdaten</h3>
              
              <div className="space-y-4 mt-6">
                {/* Phone with hover effect */}
                <div className="flex items-start gap-3 group">
                  <div className="bg-benfresh-tealLight dark:bg-benfresh-dark-teal dark:bg-opacity-20 rounded-full p-2 flex-shrink-0 mt-0.5 shadow-sm group-hover:shadow-md transition-all duration-300 relative overflow-hidden">
                    {/* Inner glow on hover */}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-benfresh-teal dark:text-benfresh-dark-teal relative z-10 transform group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#555555] dark:text-benfresh-dark-textSecondary font-medium">Telefon</p>
                    <a href="tel:+491791117165" className="text-benfresh-grayDark dark:text-white hover:text-benfresh-teal dark:hover:text-benfresh-dark-teal transition-colors group-hover:text-benfresh-teal dark:group-hover:text-benfresh-dark-teal">+49 179 1117 165</a>
                  </div>
                </div>
                
                {/* Email with hover effect */}
                <div className="flex items-start gap-3 group">
                  <div className="bg-benfresh-tealLight dark:bg-benfresh-dark-teal dark:bg-opacity-20 rounded-full p-2 flex-shrink-0 mt-0.5 shadow-sm group-hover:shadow-md transition-all duration-300 relative overflow-hidden">
                    {/* Inner glow on hover */}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-benfresh-teal dark:text-benfresh-dark-teal relative z-10 transform group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#555555] dark:text-benfresh-dark-textSecondary font-medium">E-Mail</p>
                    <a href="mailto:info@benfresh.de" className="text-benfresh-grayDark dark:text-white hover:text-benfresh-teal dark:hover:text-benfresh-dark-teal transition-colors group-hover:text-benfresh-teal dark:group-hover:text-benfresh-dark-teal">info@benfresh.de</a>
                  </div>
                </div>
                
                {/* Address with hover effect */}
                <div className="flex items-start gap-3 group">
                  <div className="bg-benfresh-tealLight dark:bg-benfresh-dark-teal dark:bg-opacity-20 rounded-full p-2 flex-shrink-0 mt-0.5 shadow-sm group-hover:shadow-md transition-all duration-300 relative overflow-hidden">
                    {/* Inner glow on hover */}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-benfresh-teal dark:text-benfresh-dark-teal relative z-10 transform group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#555555] dark:text-benfresh-dark-textSecondary font-medium">Adresse</p>
                    <address className="text-benfresh-grayDark dark:text-white not-italic group-hover:text-benfresh-teal dark:group-hover:text-benfresh-dark-teal transition-colors">
                      Montanusstrasse 28<br />
                      51065 Köln
                    </address>
                  </div>
                </div>
                
                {/* Hours with hover effect */}
                <div className="flex items-start gap-3 group">
                  <div className="bg-benfresh-tealLight dark:bg-benfresh-dark-teal dark:bg-opacity-20 rounded-full p-2 flex-shrink-0 mt-0.5 shadow-sm group-hover:shadow-md transition-all duration-300 relative overflow-hidden">
                    {/* Inner glow on hover */}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-benfresh-teal dark:text-benfresh-dark-teal relative z-10 transform group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#555555] dark:text-benfresh-dark-textSecondary font-medium">Öffnungszeiten</p>
                    <p className="text-benfresh-grayDark dark:text-white group-hover:text-benfresh-teal dark:group-hover:text-benfresh-dark-teal transition-colors">Mo-Fr: 8:00 - 18:00 Uhr</p>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
