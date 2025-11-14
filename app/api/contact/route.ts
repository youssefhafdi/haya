import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/utils/sendgrid';
import { verifyRecaptchaToken } from '@/utils/recaptcha';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validation des données
    if (!data.name || !data.email || !data.message || !data.recaptchaToken) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Vérification du token reCAPTCHA
    const isValidToken = await verifyRecaptchaToken(data.recaptchaToken);
    if (!isValidToken) {
      return NextResponse.json(
        { error: 'Vérification de sécurité échouée. Veuillez réessayer.' },
        { status: 400 }
      );
    }

    // Validation simple de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    // Envoi de l'email via SendGrid
    await sendContactEmail(data);

    return NextResponse.json(
      { message: 'Message envoyé avec succès' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi du message' },
      { status: 500 }
    );
  }
} 