import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email configuration
// In production, use environment variables for these values
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER || 'smtp.example.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'user@example.com',
    pass: process.env.EMAIL_PASS || 'password',
  },
});

export async function POST(request: Request) {
  try {
    // Get form data from request body
    const formData = await request.json();
    const { name, email, subject, message } = formData;

    // Validate form data
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Bitte füllen Sie alle Pflichtfelder aus.' },
        { status: 400 }
      );
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@benfresh.de',
      to: process.env.EMAIL_TO || 'info@benfresh.de',
      replyTo: email,
      subject: `Kontaktformular: ${subject || 'Neue Anfrage'}`,
      text: `Name: ${name}\nEmail: ${email}\nBetreff: ${subject || 'Keine Angabe'}\n\nNachricht:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #0097A7; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">Neue Kontaktanfrage</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>E-Mail:</strong> ${email}</p>
          <p><strong>Betreff:</strong> ${subject || 'Keine Angabe'}</p>
          <div style="margin-top: 20px;">
            <p><strong>Nachricht:</strong></p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin-top: 5px;">
              ${message.replace(/\n/g, '<br/>')}
            </div>
          </div>
          <p style="font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 10px;">
            Diese E-Mail wurde über das Kontaktformular auf benfresh.de gesendet.
          </p>
        </div>
      `,
    };

    // When not in production, log instead of sending
    if (process.env.NODE_ENV !== 'production') {
      console.log('Email would be sent in production:');
      console.log(mailOptions);
      
      // Simulate a delay for development testing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return NextResponse.json({ 
        success: true, 
        message: 'Nachricht wurde erfolgreich gesendet. (Entwicklungsmodus)' 
      });
    }

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'Vielen Dank für Ihre Nachricht. Wir melden uns in Kürze bei Ihnen.' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut.' 
      },
      { status: 500 }
    );
  }
}
