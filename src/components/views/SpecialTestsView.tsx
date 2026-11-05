import React, { useState, useMemo } from 'react';
import {
  Search,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Info,
  X
} from 'lucide-react';
import { SpecialTest, JointType } from '../../types';
import { SPECIAL_TESTS_DATA } from '../../data/specialTestsData';

const JOINTS: { id: JointType | 'Todos'; label: string; icon: string }[] = [
  { id: 'Todos', label: 'Todas', icon: '🩺' },
  { id: 'Ombro', label: 'Ombro', icon: '🦾' },
  { id: 'Joelho', label: 'Joelho', icon: '🦵' },
  { id: 'Coluna', label: 'Coluna', icon: '🧍' },
  { id: 'Quadril', label: 'Quadril', icon: '🩻' },
  { id: 'Tornozelo', label: 'Tornozelo', icon: '🦶' },
  { id: 'Cotovelo', label: 'Cotovelo', icon: '💪' },
  { id: 'Punho', label: 'Punho/Mão', icon: '✋' },
];

export const SpecialTestsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJoint, setSelectedJoint] = useState<JointType | 'Todos'>('Todos');
  const [expandedTestIds, setExpandedTestIds] = useState<string[]>(['test-neer', 'test-lachman']);

  const toggleExpand = (id: string) => {
    setExpandedTestIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setExpandedTestIds(filteredTests.map((t) => t.id));
  };

  const collapseAll = () => {
    setExpandedTestIds([]);
  };

  const filteredTests = useMemo(() => {
    return SPECIAL_TESTS_DATA.filter((test) => {
      // Joint filter
      if (selectedJoint !== 'Todos' && test.joint !== selectedJoint) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = test.name.toLowerCase().includes(query);
        const matchObjective = test.objective.toLowerCase().includes(query);
        const matchPositive = test.positiveSign.toLowerCase().includes(query);
        const matchJoint = test.joint.toLowerCase().includes(query);

        if (!matchName && !matchObjective && !matchPositive && !matchJoint) {
          return false;
        }
      }

      return true;
    });
  }, [selectedJoint, searchQuery]);

  return (
    <div className="space-y-4 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-teal-200 text-xs font-semibold">
            <Stethoscope className="w-3.5 h-3.5 text-teal-300" />
            <span>Guia Rápido de Semiologia Ortopédica</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Buscador de Testes Especiais
          </h1>
          <p className="text-xs text-teal-100/90 leading-relaxed max-w-sm">
            Posicionamento, manobras provocativas e critérios de positividade para não hesitar na avaliação.
          </p>

          {/* Search Input */}
          <div className="relative pt-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por Lachman, Phalen, Neer, menisco..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 font-medium text-xs shadow-md outline-none focus:ring-4 focus:ring-teal-400/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Joint Tabs Carousel */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1 text-xs">
          <span className="font-bold text-slate-700 uppercase tracking-wider">
            Articulação Avaliada
          </span>
          <div className="flex items-center gap-2 text-[11px] text-teal-700 font-bold">
            <button onClick={expandAll} className="hover:underline">
              Expandir todos
            </button>
            <span>•</span>
            <button onClick={collapseAll} className="hover:underline">
              Recolher
            </button>
          </div>
        </div>

        <div
          onWheel={(e) => {
            if (e.deltaY !== 0) e.currentTarget.scrollLeft += e.deltaY * 0.8;
          }}
          className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 px-1 scroll-smooth"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}
        >
          {JOINTS.map((joint) => {
            const isSelected = selectedJoint === joint.id;
            return (
              <button
                key={joint.id}
                onClick={() => setSelectedJoint(joint.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl shrink-0 text-xs font-bold transition-all touch-press ${
                  isSelected
                    ? 'bg-teal-700 text-white shadow-md shadow-teal-700/30'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-teal-300'
                }`}
              >
                <span>{joint.icon}</span>
                <span>{joint.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* List of Test Cards */}
      <div className="space-y-3">
        {filteredTests.map((test) => {
          const isExpanded = expandedTestIds.includes(test.id);

          return (
            <div
              key={test.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-soft overflow-hidden transition-all duration-200"
            >
              {/* Card Header */}
              <div
                onClick={() => toggleExpand(test.id)}
                className="p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/80 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                      {test.joint}
                    </span>
                    {test.sensitivity && (
                      <span className="text-[10px] text-slate-500 font-semibold">
                        Sens: {test.sensitivity} • Espec: {test.specificity}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                    {test.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-1">
                    {test.objective}
                  </p>
                </div>

                <button
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 shrink-0 transition-colors"
                  aria-label={isExpanded ? 'Recolher detalhes' : 'Expandir detalhes'}
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Expandable Body */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 space-y-3 border-t border-slate-100 text-xs">
                  {/* Objetivo completo */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                    <span className="font-bold text-slate-700 block mb-1">
                      🎯 Objetivo do Teste:
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {test.objective}
                    </p>
                  </div>

                  {/* Posicionamento */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-100">
                      <span className="font-bold text-teal-900 block mb-1">
                        👤 Posição do Paciente:
                      </span>
                      <p className="text-slate-700 leading-relaxed">
                        {test.patientPosition}
                      </p>
                    </div>

                    <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-100">
                      <span className="font-bold text-teal-900 block mb-1">
                        🩺 Posição do Terapeuta:
                      </span>
                      <p className="text-slate-700 leading-relaxed">
                        {test.therapistPosition}
                      </p>
                    </div>
                  </div>

                  {/* Manobra Executada */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="font-bold text-slate-800 block mb-1">
                      🔄 Execução da Manobra:
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      {test.maneuver}
                    </p>
                  </div>

                  {/* CRITÉRIO DE TESTE POSITIVO (Badge Vermelha de Destaque conforme especificação) */}
                  <div className="p-3.5 rounded-xl bg-rose-50 border-2 border-rose-300 shadow-sm space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white font-black text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <AlertCircle className="w-3 h-3" />
                        Critério de Teste Positivo
                      </span>
                    </div>
                    <p className="text-rose-950 font-bold text-xs sm:text-[13px] leading-relaxed pt-1">
                      {test.positiveSign}
                    </p>
                  </div>

                  {/* Dica Clínica / Nota */}
                  {test.clinicalNotes && (
                    <div className="flex items-start gap-2 p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px]">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p>
                        <strong className="font-bold">Dica de Bolso:</strong> {test.clinicalNotes}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filteredTests.length === 0 && (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 space-y-2">
            <p className="font-bold">Nenhum teste encontrado para "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedJoint('Todos');
              }}
              className="text-xs font-bold text-teal-600 underline"
            >
              Ver todos os testes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
