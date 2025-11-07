'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analytics } from '@/lib/features/analytics';
import Script from 'next/script';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page view on route change
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    analytics.pageView({
      url,
      title: document.title,
      referrer: document.referrer,
    });
  }, [pathname, searchParams]);

  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <>
      {/* Plausible Analytics */}
      {analyticsId && (
        <Script
          defer
          data-domain={process.env.NEXT_PUBLIC_SITE_URL?.replace('https://', '')}
          src={`https://plausible.io/js/script.js`}
          strategy="afterInteractive"
        />
      )}

      {/* Google Analytics */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {children}
    </>
  );
}
