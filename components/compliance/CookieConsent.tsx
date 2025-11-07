'use client';

import { useState } from 'react';
import { Button } from '../ui/Button';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !localStorage.getItem('cookie-preferences');
  });
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  
  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
    setIsVisible(false);
  };
  
  const handleAcceptSelected = () => {
    savePreferences(preferences);
    setIsVisible(false);
  };
  
  const handleRejectAll = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(necessaryOnly);
    setIsVisible(false);
  };
  
  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-preferences', JSON.stringify(prefs));
  };
  
  if (!isVisible) return null;
  
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-black text-white border-t-2 border-white p-6"
      role="dialog"
      aria-label="Cookie consent"
      aria-describedby="cookie-description"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="font-bebas text-2xl uppercase mb-4">Cookie Preferences</h2>
        
        <p id="cookie-description" className="mb-6 max-w-3xl">
          We use cookies to enhance your experience and analyze site traffic. 
          You can customize your preferences below.
        </p>
        
        {showDetails && (
          <div className="mb-6 space-y-4">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={preferences.necessary}
                disabled
                className="mt-1 min-w-[1.25rem] min-h-[1.25rem]"
                aria-label="Necessary cookies (required)"
              />
              <div>
                <strong className="block">Necessary Cookies</strong>
                <p className="text-sm text-grey-400">Essential for the website to function. Cannot be disabled.</p>
              </div>
            </label>
            
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => 
                  setPreferences({ ...preferences, analytics: e.target.checked })
                }
                className="mt-1 min-w-[1.25rem] min-h-[1.25rem]"
                aria-label="Analytics cookies"
              />
              <div>
                <strong className="block">Analytics Cookies</strong>
                <p className="text-sm text-grey-400">Help us understand how visitors use our website.</p>
              </div>
            </label>
            
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => 
                  setPreferences({ ...preferences, marketing: e.target.checked })
                }
                className="mt-1 min-w-[1.25rem] min-h-[1.25rem]"
                aria-label="Marketing cookies"
              />
              <div>
                <strong className="block">Marketing Cookies</strong>
                <p className="text-sm text-grey-400">Used to deliver personalized advertisements.</p>
              </div>
            </label>
          </div>
        )}
        
        <div className="flex flex-wrap gap-4">
          <Button variant="filled" size="md" onClick={handleAcceptAll}>
            Accept All
          </Button>
          
          <Button variant="outlined" size="md" onClick={handleRejectAll} className="border-white text-white hover:bg-white hover:text-black">
            Reject All
          </Button>
          
          <Button variant="outlined" size="md" onClick={() => setShowDetails(!showDetails)} className="border-white text-white hover:bg-white hover:text-black">
            {showDetails ? 'Hide' : 'Show'} Details
          </Button>
          
          {showDetails && (
            <Button variant="filled" size="md" onClick={handleAcceptSelected}>
              Save Preferences
            </Button>
          )}
        </div>
        
        <p className="mt-4 text-sm text-grey-400">
          <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>
          {' • '}
          <a href="/terms" className="underline hover:text-white">Terms of Service</a>
        </p>
      </div>
    </div>
  );
}
