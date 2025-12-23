import { NextResponse } from 'next/server';

// Limite simple : 5 requêtes par minute et par IP sur certaines routes
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

// Mémoire en RAM (suffisant pour un petit projet / hébergement simple)
const ipRequestMap = new Map<string, { count: number; startTime: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = ipRequestMap.get(ip);

  if (!entry) {
    ipRequestMap.set(ip, { count: 1, startTime: now });
    return false;
  }

  // Fenêtre expirée → on réinitialise
  if (now - entry.startTime > RATE_LIMIT_WINDOW_MS) {
    ipRequestMap.set(ip, { count: 1, startTime: now });
    return false;
  }

  entry.count += 1;
  ipRequestMap.set(ip, entry);

  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

export function middleware(request: Request) {
  const url = new URL(request.url);

  const isContactApiRoute =
    url.pathname.startsWith('/api/contact') && request.method === 'POST';

  // Récupération IP (simple) : selon ton hébergeur tu pourras adapter
  // @ts-ignore - request ip n'est pas typé sur l'objet Request standard
  const ip = (request as any).ip || '127.0.0.1';

  // Rate limiting uniquement sur l'API de contact
  if (isContactApiRoute && isRateLimited(ip)) {
    return new NextResponse(
      JSON.stringify({
        error:
          "Trop de requêtes depuis cette adresse IP. Veuillez réessayer dans une minute.",
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy':
            'camera=(), microphone=(), geolocation=(), payment=()',
          'Strict-Transport-Security':
            'max-age=31536000; includeSubDomains; preload',
        },
      }
    );
  }

  // Réponse "normale" : on laisse Next gérer, mais on ajoute des en-têtes de sécurité
  const response = NextResponse.next();

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()'
  );
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  return response;
}

export const config = {
  // Appliquer le middleware partout (pages + API)
  matcher: ['/:path*'],
};



