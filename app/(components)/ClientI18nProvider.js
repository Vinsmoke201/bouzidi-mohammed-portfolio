'use client';
import { useEffect } from 'react';
import '../lib/i18n'; // This initializes i18next

export default function ClientI18nProvider({ children }) {
  useEffect(() => {
    // i18next is initialized when the lib is imported
    console.log('i18next initialized');
  }, []);

  return <>{children}</>;
}