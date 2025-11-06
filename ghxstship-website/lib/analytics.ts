/**
 * Analytics Service
 * Privacy-focused analytics tracking using Plausible or Google Analytics
 */

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
}

interface PageViewData {
  url: string;
  title?: string;
  referrer?: string;
}

class Analytics {
  private enabled: boolean;
  private provider: 'plausible' | 'google' | 'none';

  constructor() {
    this.enabled = typeof window !== 'undefined' && process.env.NODE_ENV === 'production';
    this.provider = this.detectProvider();
  }

  private detectProvider(): 'plausible' | 'google' | 'none' {
    if (typeof window === 'undefined') return 'none';
    
    // Check for Plausible
    if (window.plausible) return 'plausible';
    
    // Check for Google Analytics
    if (window.gtag) return 'google';
    
    return 'none';
  }

  /**
   * Track page view
   */
  pageView(data: PageViewData): void {
    if (!this.enabled) {
      console.log('[Analytics] Page view:', data);
      return;
    }

    switch (this.provider) {
      case 'plausible':
        window.plausible?.('pageview', {
          props: {
            url: data.url,
            title: data.title,
          },
        });
        break;
      
      case 'google':
        window.gtag?.('event', 'page_view', {
          page_path: data.url,
          page_title: data.title,
        });
        break;
      
      default:
        console.log('[Analytics] Page view:', data);
    }
  }

  /**
   * Track custom event
   */
  event(event: AnalyticsEvent): void {
    if (!this.enabled) {
      console.log('[Analytics] Event:', event);
      return;
    }

    switch (this.provider) {
      case 'plausible':
        window.plausible?.(event.name, {
          props: event.properties,
        });
        break;
      
      case 'google':
        window.gtag?.('event', event.name, event.properties);
        break;
      
      default:
        console.log('[Analytics] Event:', event);
    }
  }

  /**
   * Track contact form submission
   */
  trackContactForm(formType: string): void {
    this.event({
      name: 'contact_form_submit',
      properties: {
        form_type: formType,
      },
    });
  }

  /**
   * Track newsletter signup
   */
  trackNewsletterSignup(): void {
    this.event({
      name: 'newsletter_signup',
    });
  }

  /**
   * Track project view
   */
  trackProjectView(projectSlug: string, projectTitle: string): void {
    this.event({
      name: 'project_view',
      properties: {
        project_slug: projectSlug,
        project_title: projectTitle,
      },
    });
  }

  /**
   * Track button click
   */
  trackButtonClick(buttonName: string, location: string): void {
    this.event({
      name: 'button_click',
      properties: {
        button_name: buttonName,
        location,
      },
    });
  }

  /**
   * Track external link click
   */
  trackExternalLink(url: string, linkText: string): void {
    this.event({
      name: 'external_link_click',
      properties: {
        url,
        link_text: linkText,
      },
    });
  }

  /**
   * Track download
   */
  trackDownload(fileName: string, fileType: string): void {
    this.event({
      name: 'file_download',
      properties: {
        file_name: fileName,
        file_type: fileType,
      },
    });
  }

  /**
   * Track search
   */
  trackSearch(query: string, resultsCount: number): void {
    this.event({
      name: 'search',
      properties: {
        query,
        results_count: resultsCount,
      },
    });
  }

  /**
   * Track video play
   */
  trackVideoPlay(videoTitle: string): void {
    this.event({
      name: 'video_play',
      properties: {
        video_title: videoTitle,
      },
    });
  }

  /**
   * Track error
   */
  trackError(errorMessage: string, errorType: string): void {
    this.event({
      name: 'error',
      properties: {
        error_message: errorMessage,
        error_type: errorType,
      },
    });
  }
}

// Singleton instance
export const analytics = new Analytics();

// Type declarations for global window objects
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}
