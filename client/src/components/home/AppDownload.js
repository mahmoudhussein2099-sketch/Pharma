import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QRCodeSVG } from 'qrcode.react';
import { Smartphone, X, Apple, MonitorSmartphone, Copy, Check, Download, QrCode } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { subscribe, isPromptVisible, promptInstall } from '../../lib/pwa';

const AppDownload = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.localStorage.getItem('awonAppCardDismissed') !== '1';
  });
  const [open, setOpen] = useState(false);
  const [siteUrl, setSiteUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [, setTick] = useState(0);
  const qrRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSiteUrl(window.location.origin);
    }
    return subscribe(() => setTick((n) => n + 1));
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!isVisible) return null;

  const canInstall = isPromptVisible();

  const handleClose = () => {
    setIsVisible(false);
    window.localStorage.setItem('awonAppCardDismissed', '1');
  };

  const handleInstall = async () => {
    if (canInstall) {
      await promptInstall();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleDownload = () => {
    const svg = qrRef.current;
    if (!svg) return;
    const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'awon-pharmacy-qr.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed bottom-5 end-5 z-50">
      {open ? (
        <Card ref={cardRef} className="w-[340px] overflow-hidden shadow-2xl sm:w-[360px]">
          <div className="relative bg-gradient-to-r from-primary to-secondary px-5 py-4 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                <Smartphone className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold">{t('installApp', 'Install Awon App')}</h3>
                <p className="text-xs text-primary-foreground/85">
                  {t('appInstallTagline', 'Exclusive offers, offline access & faster checkout')}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="absolute end-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-primary-foreground transition-colors hover:bg-white/25"
              aria-label={t('close', 'Close')}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-4 p-5">
            {/* Install buttons */}
            {canInstall ? (
              <button
                type="button"
                onClick={handleInstall}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <MonitorSmartphone className="h-4 w-4" aria-hidden="true" />
                {t('installAndroid', 'Install on Android / Chrome')}
              </button>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={handleInstall}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Apple className="h-4 w-4" aria-hidden="true" />
                  {t('iosAddHome', 'iOS: Add to Home Screen')}
                </button>
                <p className="mt-2 text-xs text-muted-foreground">
                  {t('iosHint', 'On iPhone/iPad tap the share button, then “Add to Home Screen”.')}
                </p>
              </div>
            )}

            {/* Live QR code */}
            <div className="rounded-2xl border border-border bg-muted/50 p-4">
              <div className="flex items-center gap-2.5">
                <QrCode className="h-5 w-5 text-primary" aria-hidden="true" />
                <p className="text-sm font-semibold text-foreground">
                  {t('scanToVisit', 'Scan to visit our website')}
                </p>
              </div>
              <p className="mb-3 mt-1 text-xs text-muted-foreground">
                {t('scanToVisitDesc', 'Point your camera at the code on the pharmacy door to open the store instantly')}
              </p>

              <div className="flex flex-col items-center gap-3">
                <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-border">
                  {siteUrl ? (
                    <QRCodeSVG
                      ref={qrRef}
                      value={siteUrl}
                      size={168}
                      level="M"
                      marginSize={1}
                      fgColor="#0f172a"
                      bgColor="#ffffff"
                      title={t('scanToVisit', 'Scan to visit our website')}
                    />
                  ) : (
                    <div className="h-[168px] w-[168px] animate-pulse rounded-md bg-muted" />
                  )}
                </div>
                <p className="max-w-full truncate text-xs font-mono text-muted-foreground" dir="ltr">
                  {siteUrl}
                </p>
                <div className="flex w-full gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {copied ? t('linkCopied', 'Link copied!') : t('copyLink', 'Copy link')}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    {t('downloadQr', 'Download QR')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={t('installApp', 'Install Awon App')}
          aria-expanded={open}
        >
          <Smartphone className="h-6 w-6 transition-transform duration-300 group-hover:rotate-6" aria-hidden="true" />
          <span className="pointer-events-none absolute end-1 top-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full border border-primary bg-success" />
          </span>
        </button>
      )}
    </div>
  );
};

export default AppDownload;
