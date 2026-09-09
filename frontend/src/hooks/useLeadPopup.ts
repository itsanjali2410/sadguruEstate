import { useEffect, useState } from 'react';

const SEEN_KEY = 'leadPopupSeen';
/** Once someone has seen or submitted the popup, leave them alone this long. */
const COOLDOWN_MS = 24 * 60 * 60 * 1000;

function recentlySeen(): boolean {
  try {
    const at = Number(localStorage.getItem(SEEN_KEY));
    return Boolean(at) && Date.now() - at < COOLDOWN_MS;
  } catch {
    // Private mode / storage blocked: fall back to once per page load.
    return false;
  }
}

function markSeen() {
  try {
    localStorage.setItem(SEEN_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

/**
 * Shows the lead popup at most once per visitor per cooldown window — after a
 * delay, or on exit intent, whichever comes first. Previously each trigger
 * re-fired independently and neither remembered a dismissal, so the form
 * reappeared every 10s and on every mouse-out.
 */
export function useLeadPopup(delayMs = 20000) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (recentlySeen()) return;

    // One-shot: the first trigger to fire wins and disarms the rest.
    let done = false;
    const open = () => {
      if (done) return;
      done = true;
      markSeen();
      setIsOpen(true);
      cleanup();
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) open();
    };

    const timer = setTimeout(open, delayMs);
    document.addEventListener('mouseleave', onMouseLeave);

    function cleanup() {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', onMouseLeave);
    }
    return cleanup;
  }, [delayMs]);

  return { isOpen, close: () => setIsOpen(false) };
}
