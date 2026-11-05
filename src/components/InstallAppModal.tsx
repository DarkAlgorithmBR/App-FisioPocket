import React, { useState, useEffect } from 'react';
import {
  X,
  Smartphone,
  Download,
  Share,
  PlusSquare,
  CheckCircle2,
  Copy,
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop'>('desktop');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);

    if (isIOS) {
      setPlatform('ios');
    } else if (isAndroid) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }
  }, []);

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          onShowToast('FisioPocket instalado com sucesso no seu dispositivo!', 'success');
          onClose();
        }
      } catch (err) {
        console.error('Erro na instalação:', err);
      }
    } else {
      onShowToast('Siga o passo a passo abaixo para adicionar à tela inicial.', 'info');
    }
  };

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    onShowToast('Link do FisioPocket copiado! Envie para o WhatsApp do seu celular.', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-5 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <Smartphone className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                Aplicativo Mobile (PWA)
              </span>
              <h2 className="text-lg font-extrabold leading-tight">
                Baixar FisioPocket no Celular
              </h2>
            </div>
          </div>
          <p className="text-xs text-emerald-100/90 leading-relaxed">
            Tenha todos os 150 mapas mentais, testes e calculadoras salvos direto na tela do seu smartphone, rápido como um app nativo.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Direct Install Button if browser supports it */}
          {deferredPrompt && (
            <button
              onClick={handleNativeInstall}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-700/30 transition-all active:scale-95"
            >
              <Download className="w-5 h-5" />
              <span>Instalar Aplicativo com 1 Toque</span>
            </button>
          )}

          {/* Platform Selector Tabs */}
          <div className="flex items-center justify-center p-1 bg-slate-100 rounded-2xl text-xs font-bold text-slate-600">
            <button
              onClick={() => setPlatform('android')}
              className={`flex-1 py-1.5 rounded-xl transition-all ${
                platform === 'android' ? 'bg-white text-emerald-700 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              Android (Chrome)
            </button>
            <button
              onClick={() => setPlatform('ios')}
              className={`flex-1 py-1.5 rounded-xl transition-all ${
                platform === 'ios' ? 'bg-white text-emerald-700 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              iPhone (Safari)
            </button>
            <button
              onClick={() => setPlatform('desktop')}
              className={`flex-1 py-1.5 rounded-xl transition-all ${
                platform === 'desktop' ? 'bg-white text-emerald-700 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              No Computador
            </button>
          </div>

          {/* Platform Instructions */}
          {platform === 'ios' && (
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5 text-emerald-700">
                <Sparkles className="w-3.5 h-3.5" />
                No iPhone (Safari da Apple)
              </h3>
              <ol className="space-y-2.5 text-xs text-slate-600 font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    1
                  </span>
                  <span>
                    No rodapé do Safari, toque no botão <strong>Compartilhar</strong> (ícone com quadrado e seta para cima).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    2
                  </span>
                  <span>
                    Role as opções para baixo e selecione <strong>"Adicionar à Tela de Início"</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    3
                  </span>
                  <span>
                    Toque em <strong>"Adicionar"</strong> no canto superior direito. Pronto! O ícone do FisioPocket aparecerá junto com seus outros aplicativos.
                  </span>
                </li>
              </ol>
            </div>
          )}

          {platform === 'android' && (
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5 text-emerald-700">
                <Sparkles className="w-3.5 h-3.5" />
                No Android (Google Chrome / Samsung Internet)
              </h3>
              <ol className="space-y-2.5 text-xs text-slate-600 font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    1
                  </span>
                  <span>
                    Toque no menu de <strong>três pontinhos (⋮)</strong> no canto superior direito do navegador.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    2
                  </span>
                  <span>
                    Selecione <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    3
                  </span>
                  <span>
                    Confirme em <strong>"Instalar"</strong>. O FisioPocket será instalado como app completo no seu aparelho.
                  </span>
                </li>
              </ol>
            </div>
          )}

          {platform === 'desktop' && (
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5 text-emerald-700">
                <Sparkles className="w-3.5 h-3.5" />
                Como abrir no Celular se você está no PC:
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Copie o link abaixo e envie para si mesmo (WhatsApp Web, Telegram ou e-mail), depois abra no navegador do seu smartphone:
              </p>
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-between gap-2 p-3 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-all shadow-sm"
              >
                <span className="truncate">{window.location.href}</span>
                <span className="flex items-center gap-1 text-emerald-600 font-bold shrink-0">
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copiado!' : 'Copiar'}
                </span>
              </button>
            </div>
          )}

          {/* Perks checklist */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Vantagens no Estágio &amp; Plantão:
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Abre em 1 toque</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Sem barra de navegador</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>150 mapas no bolso</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Funciona em tela cheia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Entendido / Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
