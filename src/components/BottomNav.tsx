import React from 'react';
import { BookOpen, Stethoscope, FileText, Calculator, Clock } from 'lucide-react';

export type TabType = 'mapas' | 'testes' | 'soap' | 'escalas' | 'plantao';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  favoritesCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab, favoritesCount = 0 }) => {
  const tabs = [
    {
      id: 'mapas' as TabType,
      label: 'Mapas',
      sublabel: 'Acervo',
      icon: BookOpen,
      badge: favoritesCount > 0 ? favoritesCount : undefined,
    },
    {
      id: 'testes' as TabType,
      label: 'Testes',
      sublabel: 'Semiologia',
      icon: Stethoscope,
    },
    {
      id: 'soap' as TabType,
      label: 'SOAP',
      sublabel: 'Evolução',
      icon: FileText,
    },
    {
      id: 'escalas' as TabType,
      label: 'Escalas',
      sublabel: 'Scores',
      icon: Calculator,
    },
    {
      id: 'plantao' as TabType,
      label: 'Plantão',
      sublabel: 'Horas',
      icon: Clock,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-nav safe-area-pb">
      <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-200 touch-press ${
                isActive
                  ? 'text-emerald-600 font-bold'
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all duration-200 relative ${
                  isActive ? 'bg-emerald-50 text-emerald-600 scale-105' : 'bg-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
                {tab.badge !== undefined && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold bg-amber-500 text-white rounded-full ring-2 ring-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] tracking-tight mt-0.5 ${isActive ? 'text-emerald-700' : 'text-slate-500'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
