interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  error_codes?: string[];
}

export async function verifyRecaptchaToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      { method: 'POST' }
    );

    const data: RecaptchaResponse = await response.json();

    // Vérifie si le score est suffisamment élevé (0.5 est un bon seuil)
    return data.success && data.score >= 0.5;
  } catch (error) {
    console.error('Erreur lors de la vérification reCAPTCHA:', error);
    return false;
  }
} 