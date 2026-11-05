import React from 'react';
import { Sparkles, Smartphone } from 'lucide-react';

interface NavbarProps {
  onOpenInstall: () => void;
  mapsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInstall }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5 transition-all">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 ring-2 ring-emerald-500/20">
            <Sparkles className="w-5 h-5 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 tracking-tight text-lg">
                Fisio<span className="text-emerald-600">Pocket</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                PWA
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-none">
              O App de Bolso do Acadêmico
            </p>
          </div>
        </div>

        {/* Action Button: Baixar App no Celular */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenInstall}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-700/20 transition-all active:scale-95"
            title="Baixar e Instalar o App no Celular"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-100" />
            <span>Baixar App</span>
          </button>
        </div>
      </div>
    </header>
  );
};
