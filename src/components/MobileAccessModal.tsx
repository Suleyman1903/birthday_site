import { useState } from 'react';
import { Smartphone, QrCode, Copy, Check, X, Wifi, Globe, ExternalLink } from 'lucide-react';

const LOCAL_URL = 'http://10.33.122.141:5173';
const PUBLIC_URL = 'https://sean-products-martha-drainage.trycloudflare.com';

export default function MobileAccessModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUrlType, setSelectedUrlType] = useState<'public' | 'local'>('public');
  const [copied, setCopied] = useState(false);

  const activeUrl = selectedUrlType === 'public' ? PUBLIC_URL : LOCAL_URL;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    activeUrl
  )}&color=C0446B&bgcolor=FFF8F3&margin=6`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3.5 py-2 rounded-full glass-card border border-rose-300/60 shadow-lg shadow-rose-200/50 hover:scale-105 active:scale-95 transition-all text-rose-600 font-heading text-xs sm:text-sm font-medium cursor-pointer"
        aria-label="Mobilde Aç / QR Kod"
      >
        <Smartphone className="w-4 h-4 text-rose-500 animate-bounce-soft" />
        <span>Mobilde Aç</span>
        <QrCode className="w-3.5 h-3.5 text-rose-400" />
      </button>

      {/* Modal Backdrop & Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div
            className="relative w-full max-w-sm rounded-3xl glass-card bg-cream-50/95 border border-rose-200/80 shadow-2xl p-6 flex flex-col items-center text-center animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-rose-100/60 text-ink-700/60 hover:text-rose-600 transition-colors cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-500 mb-3 shadow-inner">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-rose-600 mb-1">
              Telefonda Aç
            </h3>
            <p className="font-body text-xs text-ink-700/80 mb-4 px-2">
              Kameranızla QR kodu tarayın veya bağlantıyı tarayıcınızda açın.
            </p>

            {/* Network / Public Tab Switcher */}
            <div className="flex w-full p-1 bg-rose-100/60 rounded-xl mb-4 text-xs font-heading">
              <button
                onClick={() => setSelectedUrlType('public')}
                className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${selectedUrlType === 'public'
                    ? 'bg-white text-rose-600 shadow-sm font-semibold'
                    : 'text-ink-700/70 hover:text-rose-600'
                  }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Her Yerden (Genel)</span>
              </button>
              <button
                onClick={() => setSelectedUrlType('local')}
                className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${selectedUrlType === 'local'
                    ? 'bg-white text-rose-600 shadow-sm font-semibold'
                    : 'text-ink-700/70 hover:text-rose-600'
                  }`}
              >
                <Wifi className="w-3.5 h-3.5" />
                <span>Aynı Wi-Fi (Yerel)</span>
              </button>
            </div>

            {/* QR Code */}
            <div className="relative p-3 rounded-2xl bg-white border border-rose-200/60 shadow-md mb-4 flex items-center justify-center">
              <img
                src={qrCodeUrl}
                alt="Mobil Bağlantı QR Kodu"
                width={170}
                height={170}
                className="rounded-lg"
              />
            </div>

            {/* URL Display & Copy */}
            <div className="w-full flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-rose-200/60 mb-4">
              <input
                type="text"
                readOnly
                value={activeUrl}
                className="w-full bg-transparent text-xs text-ink-700 font-mono px-2 select-all outline-none truncate"
              />
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs font-heading font-medium flex items-center gap-1 shrink-0 transition-all cursor-pointer shadow-sm shadow-rose-300"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Kopyala</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Helper Note */}
            <div className="text-[11px] text-ink-700/70 bg-peach-100/60 rounded-xl p-2.5 w-full text-left">
              {selectedUrlType === 'public' ? (
                <p>
                  💡 <strong>Mobil Veri (LTE/5G)</strong> dahil telefonunuzdan doğrudan açabilirsiniz.
                </p>
              ) : (
                <p>
                  💡 Bilgisayarınız ve telefonunuz <strong>aynı Wi-Fi</strong> ağına bağlı olduğunda bu bağlantı üzerinden doğrudan erişebilirsiniz.
                </p>
              )}
            </div>

            {/* Direct Open Button */}
            <a
              href={activeUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 underline underline-offset-2"
            >
              <span>Yeni sekmede test et</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
