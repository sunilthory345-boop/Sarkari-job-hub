/**
 * Safe Browser Storage Utility
 * Prevents QuotaExceededError and security errors from crashing the React tree.
 * Provides automated pruning and session/in-memory fallback when localStorage is full.
 */

const memoryStore = new Map<string, string>();

/**
 * Prune non-critical large caches when quota is exceeded.
 */
function pruneBulkyStorage(): void {
  try {
    // 1. Remove cached camera/notebook photos which are huge base64 strings
    localStorage.removeItem('sarkari_notebook_photo_cached');

    // 2. Prune live notifications to the 10 most recent
    const rawNotifs = localStorage.getItem('sarkari_live_notifications');
    if (rawNotifs) {
      try {
        const notifs = JSON.parse(rawNotifs);
        if (Array.isArray(notifs) && notifs.length > 10) {
          localStorage.setItem('sarkari_live_notifications', JSON.stringify(notifs.slice(0, 10)));
        }
      } catch {
        localStorage.removeItem('sarkari_live_notifications');
      }
    }

    // 3. Prune old broadcasts
    const rawBroadcasts = localStorage.getItem('sarkari_wa_feed_broadcasts');
    if (rawBroadcasts) {
      try {
        const broadcasts = JSON.parse(rawBroadcasts);
        if (Array.isArray(broadcasts) && broadcasts.length > 5) {
          localStorage.setItem('sarkari_wa_feed_broadcasts', JSON.stringify(broadcasts.slice(0, 5)));
        }
      } catch {
        localStorage.removeItem('sarkari_wa_feed_broadcasts');
      }
    }

    // 4. Prune candidate objections if any
    const rawObjections = localStorage.getItem('sarkari_candidate_objections');
    if (rawObjections) {
      try {
        const obj = JSON.parse(rawObjections);
        if (Array.isArray(obj) && obj.length > 10) {
          localStorage.setItem('sarkari_candidate_objections', JSON.stringify(obj.slice(0, 10)));
        }
      } catch {
        // ignore
      }
    }
  } catch (err) {
    console.warn('[safeStorage] Error during storage pruning:', err);
  }
}

export function safeGetItem(key: string): string | null {
  try {
    const val = localStorage.getItem(key);
    if (val !== null) return val;
  } catch (e) {
    // localStorage might be blocked or restricted
  }

  try {
    const sessionVal = sessionStorage.getItem(key);
    if (sessionVal !== null) return sessionVal;
  } catch (e) {
    // sessionStorage might be restricted
  }

  return memoryStore.get(key) ?? null;
}

export function safeSetItem(key: string, value: string): boolean {
  // Always mirror in-memory for instant reliable access
  memoryStore.set(key, value);

  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err: any) {
    const isQuotaError = 
      err?.name === 'QuotaExceededError' || 
      err?.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
      err?.code === 22 || 
      err?.code === 1014 ||
      (typeof err?.message === 'string' && err.message.toLowerCase().includes('quota'));

    if (isQuotaError) {
      console.warn(`[safeStorage] Storage quota reached while setting "${key}". Pruning bulky keys and retrying...`);
      pruneBulkyStorage();

      try {
        localStorage.setItem(key, value);
        return true;
      } catch (retryErr) {
        console.warn(`[safeStorage] Quota still exceeded for "${key}". Falling back to sessionStorage / in-memory cache.`);
      }
    }

    // Fallback to sessionStorage
    try {
      sessionStorage.setItem(key, value);
      return true;
    } catch {
      // Both localStorage and sessionStorage failed; kept in memoryStore safely
      return false;
    }
  }
}

export function safeRemoveItem(key: string): void {
  memoryStore.delete(key);
  try {
    localStorage.removeItem(key);
  } catch {}
  try {
    sessionStorage.removeItem(key);
  } catch {}
}

export function safeGetJSON<T>(key: string, defaultValue: T): T {
  const raw = safeGetItem(key);
  if (!raw) return defaultValue;
  try {
    return JSON.parse(raw) as T;
  } catch (e) {
    console.warn(`[safeStorage] Failed to parse JSON for key "${key}":`, e);
    return defaultValue;
  }
}

export function safeSetJSON<T>(key: string, value: T): boolean {
  try {
    const str = JSON.stringify(value);
    return safeSetItem(key, str);
  } catch (e) {
    console.warn(`[safeStorage] Failed to stringify JSON for key "${key}":`, e);
    return false;
  }
}
