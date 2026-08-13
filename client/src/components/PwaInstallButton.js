// src/components/PwaInstallButton.js
// Floating "Install app" button. Subscribes to the shared PWA state so it stays
// visible across client-side navigations. On iOS Safari it falls back to an
// "Add to Home Screen" hint.
import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { subscribe, isPromptVisible, promptInstall } from '../lib/pwa';
import { cn } from '../lib/utils';

const isIos = () =>
  typeof window !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent);

const PwaInstallButton = () => {
  const [, setTick] = useState(0);

  useEffect(() => subscribe(() => setTick((n) => n + 1)), []);

  const visible = isPromptVisible();
  const iosHint = isIos() && !visible;

  const handleInstall = async () => {
    const outcome = await promptInstall();
    if (outcome === 'accepted' || outcome === 'dismissed') {
      setTick((n) => n + 1);
    }
  };

  if (!visible && !iosHint) return null;

  return (
    <>
      {visible && (
        <button
          type="button"
          onClick={handleInstall}
          aria-label="Install Awon Pharmacy app"
          className={cn(
            'fixed bottom-5 start-5 z-50 inline-flex h-12 items-center gap-2 rounded-full bg-primary ps-5 pe-6 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
          )}
        >
          <Download className="h-5 w-5" aria-hidden="true" />
          Install App
        </button>
      )}
      {iosHint && (
        <div
          role="status"
          className="fixed bottom-5 start-5 z-50 max-w-xs rounded-xl border border-border bg-popover p-4 shadow-lg"
        >
          <p className="text-sm text-popover-foreground">
            Install Awon Pharmacy: tap the share button, then “Add to Home Screen”.
          </p>
        </div>
      )}
    </>
  );
};

export default PwaInstallButton;
