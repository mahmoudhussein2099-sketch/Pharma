// src/lib/pwa.js
// Shared PWA install state. The `beforeinstallprompt` event only fires once per
// page load, so the prompt is captured here at the app level and survives any
// client-side navigation/remount (fixes the button disappearing between pages).

let deferredPrompt = null;
let promptVisible = false;
const listeners = new Set();

const emit = () => {
  for (const fn of listeners) {
    try {
      fn();
    } catch {}
  }
};

export const getDeferredPrompt = () => deferredPrompt;

export const isPromptVisible = () => promptVisible;

export const subscribe = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export const promptInstall = async () => {
  if (!deferredPrompt) return 'unavailable';
  try {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      deferredPrompt = null;
      promptVisible = false;
      emit();
    }
    return outcome;
  } catch {
    return 'unavailable';
  }
};

// Call once from _app.js so the event listener lives for the whole session.
export function initPwa() {
  if (typeof window === 'undefined') return () => {};
  const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches;

  const onBeforeInstallPrompt = (e) => {
    e.preventDefault();
    deferredPrompt = e;
    promptVisible = !isStandalone();
    emit();
  };

  const onAppInstalled = () => {
    deferredPrompt = null;
    promptVisible = false;
    emit();
  };

  const onMedia = (e) => {
    if (e.matches) {
      promptVisible = false;
      emit();
    }
  };

  window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
  window.addEventListener('appinstalled', onAppInstalled);
  window.matchMedia('(display-mode: standalone)').addEventListener('change', onMedia);

  return () => {
    window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.removeEventListener('appinstalled', onAppInstalled);
    window.matchMedia('(display-mode: standalone)').removeEventListener('change', onMedia);
  };
}
