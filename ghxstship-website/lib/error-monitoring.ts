/**
 * Error Monitoring Service
 * Centralized error tracking and reporting
 */

interface ErrorContext {
  user?: {
    id?: string;
    email?: string;
    name?: string;
  };
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;
}

class ErrorMonitoring {
  private enabled: boolean;
  private sentryInitialized: boolean = false;

  constructor() {
    this.enabled = typeof window !== 'undefined' && process.env.NODE_ENV === 'production';
  }

  /**
   * Initialize Sentry (if available)
   */
  private initSentry(): void {
    if (this.sentryInitialized || typeof window === 'undefined') return;

    // Check if Sentry is loaded
    if (window.Sentry) {
      this.sentryInitialized = true;
    }
  }

  /**
   * Capture exception
   */
  captureException(error: Error, context?: ErrorContext): void {
    this.initSentry();

    if (!this.enabled) {
      console.error('[Error Monitoring] Exception:', error, context);
      return;
    }

    if (window.Sentry) {
      window.Sentry.captureException(error, {
        user: context?.user,
        tags: context?.tags,
        extra: context?.extra,
      });
    } else {
      // Fallback to console
      console.error('[Error]', error, context);
    }
  }

  /**
   * Capture message
   */
  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info', context?: ErrorContext): void {
    this.initSentry();

    if (!this.enabled) {
      console.log(`[Error Monitoring] ${level.toUpperCase()}:`, message, context);
      return;
    }

    if (window.Sentry) {
      window.Sentry.captureMessage(message, {
        level,
        user: context?.user,
        tags: context?.tags,
        extra: context?.extra,
      });
    } else {
      console[level === 'error' ? 'error' : 'log'](`[${level.toUpperCase()}]`, message, context);
    }
  }

  /**
   * Set user context
   */
  setUser(user: { id?: string; email?: string; name?: string } | null): void {
    this.initSentry();

    if (window.Sentry) {
      window.Sentry.setUser(user);
    }
  }

  /**
   * Add breadcrumb
   */
  addBreadcrumb(message: string, category: string, data?: Record<string, unknown>): void {
    this.initSentry();

    if (window.Sentry) {
      window.Sentry.addBreadcrumb({
        message,
        category,
        data,
        level: 'info',
      });
    }
  }

  /**
   * Capture API error
   */
  captureAPIError(endpoint: string, statusCode: number, errorMessage: string): void {
    this.captureMessage(`API Error: ${endpoint}`, 'error', {
      tags: {
        endpoint,
        status_code: statusCode.toString(),
      },
      extra: {
        error_message: errorMessage,
      },
    });
  }

  /**
   * Capture form validation error
   */
  captureValidationError(formName: string, errors: Record<string, string>): void {
    this.captureMessage(`Form Validation Error: ${formName}`, 'warning', {
      tags: {
        form_name: formName,
      },
      extra: {
        validation_errors: errors,
      },
    });
  }

  /**
   * Capture performance issue
   */
  capturePerformanceIssue(metric: string, value: number, threshold: number): void {
    this.captureMessage(`Performance Issue: ${metric}`, 'warning', {
      tags: {
        metric,
      },
      extra: {
        value,
        threshold,
        exceeded_by: value - threshold,
      },
    });
  }
}

// Singleton instance
export const errorMonitoring = new ErrorMonitoring();

// Global error handler
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    errorMonitoring.captureException(event.error || new Error(event.message), {
      tags: {
        type: 'unhandled_error',
      },
      extra: {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    errorMonitoring.captureException(
      event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
      {
        tags: {
          type: 'unhandled_rejection',
        },
      }
    );
  });
}

// Type declarations
declare global {
  interface Window {
    Sentry?: {
      captureException: (error: Error, context?: unknown) => void;
      captureMessage: (message: string, context?: unknown) => void;
      setUser: (user: Record<string, unknown> | null) => void;
      addBreadcrumb: (breadcrumb: Record<string, unknown>) => void;
    };
  }
}
