declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Read Google Analytics Measurement ID from environment variables, defaulting to your GA4 ID G-FRH0MF2F4B
// GA4 IDs usually look like G-XXXXXXXXXX
export const GA_MEASUREMENT_ID = (((import.meta as any).env?.VITE_GA_MEASUREMENT_ID) || "G-FRH0MF2F4B").trim();

/**
 * Dynamically initializes Google Analytics (gtag.js) on the page.
 * Safely checks if the measurement ID is configured in the environment.
 */
export function initializeGA() {
  if (!GA_MEASUREMENT_ID) {
    console.log(
      "%cGoogle Analytics (VITE_GA_MEASUREMENT_ID) is not configured in settings variables yet.",
      "color: #3b82f6; font-weight: bold;"
    );
    return;
  }

  try {
    // Check if script already exists to avoid duplicate loads
    const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
    if (existingScript) return;

    // 1. Create and inject the external tracking script
    const scriptTag = document.createElement("script");
    scriptTag.async = true;
    scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(scriptTag);

    // 2. Create and inject the inline config script
    const inlineScript = document.createElement("script");
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      window.gtag = gtag;
      
      // Google Consent Mode v2 compliance setup
      gtag('consent', 'default', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'wait_for_update': 500
      });

      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_path: window.location.pathname,
        send_page_view: true
      });
    `;
    document.head.appendChild(inlineScript);
    
    console.log(
      `%c🎉 Google Analytics connected successfully with ID: ${GA_MEASUREMENT_ID}`,
      "color: #10b981; font-weight: bold;"
    );
  } catch (error) {
    console.error("Failed to initialize Google Analytics:", error);
  }
}

/**
 * Tracks custom events, such as when clicking WhatsApp, Telegram, or starting a mock test.
 * @param action - Action performed (e.g., 'join_whatsapp', 'start_test')
 * @param category - Main target category (e.g., 'engagement', 'exam_prep')
 * @param label - Optional contextual label (e.g., 'National Alert Bar')
 * @param value - Optional numeric value
 */
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (window.gtag && GA_MEASUREMENT_ID) {
    try {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    } catch (e) {
      console.warn("Analytics event tracking failed:", e);
    }
  }
}

/**
 * Tracks route or tab navigation changes as page views.
 * @param pathOrTab - Name or path of the active tab (e.g., 'syllabus', 'mock-tests')
 */
export function trackPageView(pathOrTab: string) {
  if (window.gtag && GA_MEASUREMENT_ID) {
    try {
      const pathWithSlash = pathOrTab.startsWith("/") ? pathOrTab : `/${pathOrTab}`;
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: pathWithSlash,
        page_title: `Sarkari Hub - ${pathOrTab.charAt(0).toUpperCase() + pathOrTab.slice(1)}`
      });
    } catch (e) {
      console.warn("Analytics page tracking failed:", e);
    }
  }
}
