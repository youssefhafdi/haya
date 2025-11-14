"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type GoogleRecaptchaContextValue = {
  executeRecaptcha?: (action?: string) => Promise<string>;
};

const GoogleRecaptchaContext = createContext<GoogleRecaptchaContextValue>({});

export function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  const [grecaptchaReady, setGrecaptchaReady] = useState(false);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) return;

    const id = 'haya-recaptcha-script';
    if (document.getElementById(id)) {
      // already injected
      // wait for grecaptcha
      if ((window as any).grecaptcha) {
        (window as any).grecaptcha.ready(() => setGrecaptchaReady(true));
      }
      return;
    }

    const script = document.createElement('script');
    script.id = id;
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      try {
        (window as any).grecaptcha.ready(() => setGrecaptchaReady(true));
      } catch (e) {
        // ignore
      }
    };
    script.onerror = () => {
      // failed to load
    };
    document.head.appendChild(script);

    return () => {
      // do not remove script to avoid reload loops; keep it simple
    };
  }, []);

  const executeRecaptcha = useCallback(async (action = 'submit') => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) throw new Error('reCAPTCHA site key not configured');
    const grecaptcha = (window as any).grecaptcha;
    if (!grecaptcha || !grecaptcha.execute) throw new Error('grecaptcha not loaded');
    return grecaptcha.execute(siteKey, { action });
  }, []);

  const value = useMemo(() => ({ executeRecaptcha: grecaptchaReady ? executeRecaptcha : undefined }), [grecaptchaReady, executeRecaptcha]);

  return <GoogleRecaptchaContext.Provider value={value}>{children}</GoogleRecaptchaContext.Provider>;
}

export function useGoogleReCaptcha() {
  return useContext(GoogleRecaptchaContext);
}