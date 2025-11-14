import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('La clé API SendGrid est manquante');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export interface EmailData {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail(data: EmailData) {
  const { name, email, message } = data;

  const msg = {
    to: process.env.CONTACT_TO_EMAIL,
    from: process.env.CONTACT_FROM_EMAIL!,
    replyTo: email,
    subject: `Nouveau message de contact de ${name}`,
    text: `
Nom: ${name}
Email: ${email}

Message:
${message}
    `,
    html: `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <br/>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Erreur SendGrid:', error);
    throw new Error('Erreur lors de l\'envoi de l\'email');
  }
} 