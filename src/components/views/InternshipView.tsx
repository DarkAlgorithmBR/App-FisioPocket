import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  Building2,
  UserCheck,
  Plus,
  Trash2,
  Award,
  Sparkles,
  ChevronRight,
  TrendingUp,
  X,
  FileCheck,
  Edit2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { InternshipShift } from '../../types';
import { StorageService } from '../../utils/storage';

interface InternshipViewProps {
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

const SECTOR_OPTIONS = [
  'UTI Geral Adulto',
  'UTI Neonatal & Pediátrica',
  'Enfermaria Cirúrgica/Clínica',
  'Ambulatório de Ortopedia & Traumato',
  'Ambulatório de Neurologia Adulto',
  'Saúde Coletiva / UBS',
  'Fisioterapia Aquática / Hidro',
  'Outro Setor',
];

export const InternshipView: React.FC<InternshipViewProps> = ({ onShowToast }) => {
  const [shifts, setShifts] = useState<InternshipShift[]>(() => StorageService.getShifts());
  const [targetHours, setTargetHours] = useState<number>(() => StorageService.getTargetHours());
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [tempTarget, setTempTarget] = useState(targetHours.toString());

  // Modal to add shift
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState('');
  const [sector, setSector] = useState(SECTOR_OPTIONS[0]);
  const [preceptor, setPreceptor] = useState('');
  const [hours, setHours] = useState('6');
  const [notes, setNotes] = useState('');
  const [casesCount, setCasesCount] = useState('4');

  const totalCompletedHours = shifts.reduce((sum, s) => sum + s.hours, 0);
  const totalCases = shifts.reduce((sum, s) => sum + (s.casesCount || 0), 0);
  const progressPercent = Math.min(Math.round((totalCompletedHours / targetHours) * 100), 100);
  const remainingHours = Math.max(0, targetHours - totalCompletedHours);

  const handleSaveTarget = () => {
    const val = parseInt(tempTarget, 10);
    if (!isNaN(val) && val > 0) {
      setTargetHours(val);
      StorageService.setTargetHours(val);
      setIsEditingTarget(false);
      onShowToast(`Meta de horas atualizada para ${val} horas!`, 'success');
    }
  };

  const handleAddShift = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(hours);
    if (isNaN(h) || h <= 0) {
      onShowToast('Informe uma quantidade válida de horas.', 'error');
      return;
    }

    const newShiftData = {
      date,
      location: location.trim() || 'Hospital / Clínica Escola',
      sector,
      preceptor: preceptor.trim() || 'Preceptor Responsável',
      hours: h,
      notes: notes.trim(),
      casesCount: parseInt(casesCount, 10) || 0,
    };

    const updated = StorageService.saveShift(newShiftData);
    setShifts(updated);
    setIsModalOpen(false);

    // Trigger celebration confetti
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
    });

    onShowToast(`Plantão de ${h}h registrado com sucesso!`, 'success');

    // Reset fields
    setLocation('');
    setNotes('');
  };

  const handleDeleteShift = (id: string) => {
    const updated = StorageService.deleteShift(id);
    setShifts(updated);
    onShowToast('Plantão removido do registro.', 'info');
  };

  // Group hours by sector
  const hoursBySector = shifts.reduce<Record<string, number>>((acc, curr) => {
    acc[curr.sector] = (acc[curr.sector] || 0) + curr.hours;
    return acc;
  }, {});

  return (
    <div className="space-y-4 pb-20">
      {/* Header Banner & Main Progress */}
      <div className="bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 rounded-3xl p-5 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 text-amber-300" />
            <span>Rastreador de Plantões &amp; Estágio</span>
          </div>

          <button
            onClick={() => setIsEditingTarget(!isEditingTarget)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-emerald-100 transition-colors"
          >
            <Edit2 className="w-3 h-3" />
            <span>Meta: {targetHours}h</span>
          </button>
        </div>

        {/* Edit Target Form */}
        {isEditingTarget && (
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-white/10 flex items-center gap-2">
            <input
              type="number"
              value={tempTarget}
              onChange={(e) => setTempTarget(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white text-slate-900 font-bold text-xs w-32 outline-none"
              placeholder="Ex: 400"
            />
            <button
              onClick={handleSaveTarget}
              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl"
            >
              Salvar Meta
            </button>
          </div>
        )}

        {/* Progress Display */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-3xl sm:text-4xl font-black tracking-tight">
                {totalCompletedHours}
              </span>
              <span className="text-emerald-200 font-bold text-sm ml-1.5">
                / {targetHours} horas cumpridas
              </span>
            </div>
            <span className="text-2xl font-black text-amber-300">
              {progressPercent}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden p-0.5">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-gradient-to-r from-teal-300 to-emerald-400 rounded-full transition-all duration-500 shadow-sm"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-emerald-100/90 pt-1">
            <span>Faltam <strong>{remainingHours}h</strong> para a meta</span>
            <span><strong>{totalCases}</strong> pacientes atendidos</span>
          </div>
        </div>

        {/* Add Shift Trigger Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full py-3 bg-white text-emerald-800 hover:bg-emerald-50 font-black rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Registrar Novo Plantão</span>
        </button>
      </div>

      {/* Sector Breakdown */}
      {Object.keys(hoursBySector).length > 0 && (
        <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-soft space-y-2 text-xs">
          <span className="font-bold text-slate-800 block uppercase tracking-wider text-[11px]">
            Horas por Especialidade / Setor
          </span>
          <div className="grid grid-cols-2 gap-2 pt-1">
            {Object.entries(hoursBySector).map(([sec, h]) => (
              <div key={sec} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                <span className="text-slate-600 font-medium text-[11px] truncate">{sec}</span>
                <span className="text-emerald-700 font-extrabold text-sm">{h} horas</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History of Completed Shifts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">
            Histórico de Plantões Realizados ({shifts.length})
          </span>
        </div>

        {shifts.map((shift) => (
          <div
            key={shift.id}
            className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-soft space-y-2 text-xs hover:border-emerald-300 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                    {shift.sector}
                  </span>
                  <span className="text-slate-400 font-medium text-[11px]">
                    {new Date(shift.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm mt-1">
                  {shift.location}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white font-black text-xs shadow-sm">
                  +{shift.hours}h
                </span>
                <button
                  onClick={() => handleDeleteShift(shift.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Excluir plantão"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
              <span className="flex items-center gap-1 font-medium">
                <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                {shift.preceptor}
              </span>
              {shift.casesCount && (
                <span className="font-semibold text-teal-700">
                  {shift.casesCount} casos
                </span>
              )}
            </div>

            {shift.notes && (
              <p className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 text-[11px] leading-relaxed">
                📝 {shift.notes}
              </p>
            )}
          </div>
        ))}

        {shifts.length === 0 && (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 space-y-2">
            <Clock className="w-8 h-8 mx-auto text-slate-300" />
            <p className="font-bold">Nenhum plantão registrado ainda.</p>
            <p className="text-xs">Clique no botão acima para somar suas horas de estágio!</p>
          </div>
        )}
      </div>

      {/* Modal: Add New Shift */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 leading-none">
                    Registrar Plantão
                  </h2>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Controle de frequência de estágio supervisionado
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddShift} className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Data do Plantão</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Horas Cumpridas</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="24"
                    required
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Local / Hospital / Clínica</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Hospital das Clínicas ou Clínica Escola"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Setor / Especialidade</label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-white font-medium"
                  >
                    {SECTOR_OPTIONS.map((sec) => (
                      <option key={sec} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pacientes Atendidos</label>
                  <input
                    type="number"
                    min="0"
                    value={casesCount}
                    onChange={(e) => setCasesCount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Preceptor(a) Supervisor(a)</label>
                <input
                  type="text"
                  placeholder="Ex: Dra. Mariana Costa (CREFITO 12345)"
                  value={preceptor}
                  onChange={(e) => setPreceptor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Casos Atendidos / Observações</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Pós-op imediato de quadril, 2 desmames de VM, treino de marcha..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30 transition-all text-sm"
                >
                  Confirmar e Salvar Horas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
