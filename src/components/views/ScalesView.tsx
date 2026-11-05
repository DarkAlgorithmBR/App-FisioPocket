import React, { useState } from 'react';
import {
  Calculator,
  Brain,
  Smile,
  Meh,
  Frown,
  Activity,
  Wind,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Info
} from 'lucide-react';
import {
  GLASGOW_OPTIONS,
  calculateGlasgow,
  GlasgowState,
  MRC_SCALE_GRADES,
  MRC_ICU_MUSCLE_PAIRS,
  interpretGasometry
} from '../../data/scalesData';

type ScaleTab = 'glasgow' | 'eva' | 'mrc' | 'gasometria';

export const ScalesView: React.FC = () => {
  const [activeScale, setActiveScale] = useState<ScaleTab>('glasgow');

  // --- 1. GLASGOW STATE ---
  const [glasgowState, setGlasgowState] = useState<GlasgowState>({
    ocular: 4,
    verbal: 5,
    motor: 6,
    pupils: 0,
  });

  const glasgowResult = calculateGlasgow(glasgowState);

  // --- 2. EVA STATE ---
  const [painLevel, setPainLevel] = useState<number>(3);

  const getEvaInfo = (level: number) => {
    if (level === 0) {
      return {
        label: 'Sem Dor',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
        face: Smile,
        conduct: 'Paciente confortável. Prossiga com o protocolo cinesioterapêutico planejado sem restrições álgicas.',
      };
    } else if (level <= 3) {
      return {
        label: 'Dor Leve',
        color: 'text-teal-700 bg-teal-50 border-teal-300',
        face: Smile,
        conduct: 'Dor tolerável. Realize mobilizações ativas e monitore a resposta durante o atendimento.',
      };
    } else if (level <= 6) {
      return {
        label: 'Dor Moderada',
        color: 'text-amber-700 bg-amber-50 border-amber-300',
        face: Meh,
        conduct: 'Interferência nas atividades. Considere recursos eletroterapêuticos (TENS convencional), termoterapia ou ajuste de amplitude.',
      };
    } else if (level <= 8) {
      return {
        label: 'Dor Intensa',
        color: 'text-orange-700 bg-orange-50 border-orange-300',
        face: Frown,
        conduct: 'Limitação severa. Evite movimentos contra a resistência. Prefira técnicas manuais suaves de desativação de pontos gatilho e relaxamento.',
      };
    } else {
      return {
        label: 'Dor Insuportável / Máxima',
        color: 'text-rose-700 bg-rose-50 border-rose-300',
        face: Frown,
        conduct: 'Parada da cinesioterapia ativa. Avaliar necessidade de analgesia médica antes de retomar qualquer mobilização.',
      };
    }
  };

  const evaInfo = getEvaInfo(painLevel);
  const EvaFaceIcon = evaInfo.face;

  // --- 3. MRC STATE ---
  const [mrcScores, setMrcScores] = useState<Record<string, { right: number; left: number }>>({
    shoulder: { right: 5, left: 5 },
    elbow: { right: 5, left: 5 },
    wrist: { right: 5, left: 5 },
    hip: { right: 5, left: 5 },
    knee: { right: 5, left: 5 },
    ankle: { right: 5, left: 5 },
  });

  const totalMrcScore = Object.values(mrcScores).reduce(
    (acc, curr) => acc + curr.right + curr.left,
    0
  );

  const handleMrcChange = (pairId: string, side: 'right' | 'left', value: number) => {
    setMrcScores((prev) => ({
      ...prev,
      [pairId]: {
        ...prev[pairId],
        [side]: value,
      },
    }));
  };

  // --- 4. GASOMETRIA STATE ---
  const [phInput, setPhInput] = useState('7.32');
  const [paco2Input, setPaco2Input] = useState('52');
  const [hco3Input, setHco3Input] = useState('27');
  const [pao2Input, setPao2Input] = useState('75');

  const gasometryResult = interpretGasometry(
    parseFloat(phInput) || 7.4,
    parseFloat(paco2Input) || 40,
    parseFloat(hco3Input) || 24,
    parseFloat(pao2Input) || 80
  );

  return (
    <div className="space-y-4 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-petroleum-700 via-petroleum-800 to-slate-900 rounded-3xl p-5 text-white shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-teal-200 text-xs font-semibold mb-2">
          <Calculator className="w-3.5 h-3.5 text-teal-300" />
          <span>Calculadoras Clínicas de Bolso</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          Escalas &amp; Gasometria Arterial
        </h1>
        <p className="text-xs text-teal-100/90 mt-1 max-w-sm">
          Cálculos e classificações instantâneas para tomada de decisão no plantão.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => setActiveScale('glasgow')}
          className={`py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all touch-press ${
            activeScale === 'glasgow'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500/20'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>Glasgow GCS-P</span>
        </button>

        <button
          onClick={() => setActiveScale('eva')}
          className={`py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all touch-press ${
            activeScale === 'eva'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500/20'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300'
          }`}
        >
          <Smile className="w-4 h-4" />
          <span>Escala EVA Dor</span>
        </button>

        <button
          onClick={() => setActiveScale('mrc')}
          className={`py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all touch-press ${
            activeScale === 'mrc'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500/20'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Escala MRC / PIDA</span>
        </button>

        <button
          onClick={() => setActiveScale('gasometria')}
          className={`py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all touch-press ${
            activeScale === 'gasometria'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500/20'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300'
          }`}
        >
          <Wind className="w-4 h-4" />
          <span>Gasometria</span>
        </button>
      </div>

      {/* --- 1. GLASGOW CONTENT --- */}
      {activeScale === 'glasgow' && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-soft space-y-4 text-xs animate-in fade-in">
          {/* Result Banner */}
          <div className={`p-4 rounded-2xl border-2 ${glasgowResult.badgeColor} space-y-2`}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Pontuação Total GCS-P
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black">{glasgowResult.gcsP}</span>
                  <span className="text-xs font-semibold opacity-80">
                    / 15 pontos (GCS: {glasgowResult.gcs} - Pupilas: {glasgowState.pupils})
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-xl bg-white/80 backdrop-blur-md font-extrabold text-xs shadow-sm">
                {glasgowResult.severity}
              </span>
            </div>
            <p className="text-xs leading-relaxed font-medium pt-1 border-t border-current/20">
              {glasgowResult.recommendation}
            </p>
          </div>

          {/* Form Options */}
          <div className="space-y-3.5">
            {/* Ocular */}
            <div>
              <label className="font-bold text-slate-800 block mb-1.5 flex items-center justify-between">
                <span>1. Abertura Ocular (AO)</span>
                <span className="text-emerald-600 font-extrabold">Score: {glasgowState.ocular}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {GLASGOW_OPTIONS.ocular.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setGlasgowState((prev) => ({ ...prev, ocular: opt.value }))}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      glasgowState.ocular === opt.value
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt.label}</span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-white rounded-md border font-bold">
                        +{opt.value}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 block font-normal mt-0.5">
                      {opt.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Verbal */}
            <div>
              <label className="font-bold text-slate-800 block mb-1.5 flex items-center justify-between">
                <span>2. Melhor Resposta Verbal (MRV)</span>
                <span className="text-emerald-600 font-extrabold">Score: {glasgowState.verbal}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {GLASGOW_OPTIONS.verbal.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setGlasgowState((prev) => ({ ...prev, verbal: opt.value }))}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      glasgowState.verbal === opt.value
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt.label}</span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-white rounded-md border font-bold">
                        +{opt.value}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 block font-normal mt-0.5">
                      {opt.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Motora */}
            <div>
              <label className="font-bold text-slate-800 block mb-1.5 flex items-center justify-between">
                <span>3. Melhor Resposta Motora (MRM)</span>
                <span className="text-emerald-600 font-extrabold">Score: {glasgowState.motor}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {GLASGOW_OPTIONS.motor.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setGlasgowState((prev) => ({ ...prev, motor: opt.value }))}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      glasgowState.motor === opt.value
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt.label}</span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-white rounded-md border font-bold">
                        +{opt.value}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 block font-normal mt-0.5">
                      {opt.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reatividade Pupilar */}
            <div>
              <label className="font-bold text-slate-800 block mb-1.5 flex items-center justify-between">
                <span>4. Reatividade Pupilar à Luz (GCS-P)</span>
                <span className="text-rose-600 font-extrabold">Subtração: -{glasgowState.pupils}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                {GLASGOW_OPTIONS.pupils.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setGlasgowState((prev) => ({ ...prev, pupils: opt.value }))}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      glasgowState.pupils === opt.value
                        ? 'bg-rose-50 border-rose-400 text-rose-950 font-bold shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt.label}</span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-white rounded-md border font-bold">
                        -{opt.value}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 block font-normal mt-0.5">
                      {opt.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 2. EVA CONTENT --- */}
      {activeScale === 'eva' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft space-y-6 text-xs animate-in fade-in">
          {/* Visual Display */}
          <div className="text-center space-y-3">
            <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center shadow-lg transition-all bg-gradient-to-tr from-slate-100 to-white border border-slate-200">
              <EvaFaceIcon className="w-12 h-12 text-emerald-600 transition-transform duration-200" />
            </div>

            <div>
              <div className="text-4xl font-black text-slate-900 tracking-tight">
                {painLevel} <span className="text-lg text-slate-400 font-bold">/ 10</span>
              </div>
              <span
                className={`inline-block mt-1 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider border ${evaInfo.color}`}
              >
                {evaInfo.label}
              </span>
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-2 px-2">
            <input
              type="range"
              min={0}
              max={10}
              step={1}
              value={painLevel}
              onChange={(e) => setPainLevel(parseInt(e.target.value, 10))}
              className="w-full h-3 bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-600 rounded-lg appearance-none cursor-pointer accent-slate-900"
            />
            <div className="flex justify-between text-[11px] font-bold text-slate-500">
              <span>0 (Sem dor)</span>
              <span>2</span>
              <span>4</span>
              <span>6</span>
              <span>8</span>
              <span>10 (Pior dor)</span>
            </div>
          </div>

          {/* Conduct Recommendation */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <span className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Conduta Recomendada para o Nível {painLevel}:
            </span>
            <p className="text-slate-600 leading-relaxed text-xs">
              {evaInfo.conduct}
            </p>
          </div>
        </div>
      )}

      {/* --- 3. MRC CONTENT --- */}
      {activeScale === 'mrc' && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-soft space-y-4 text-xs animate-in fade-in">
          {/* ICU-AW Result Banner */}
          <div
            className={`p-4 rounded-2xl border-2 flex items-center justify-between ${
              totalMrcScore < 48
                ? 'bg-rose-50 border-rose-400 text-rose-950'
                : 'bg-emerald-50 border-emerald-400 text-emerald-950'
            }`}
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Escore Total MRC (PIDA / ICU-AW)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black">{totalMrcScore}</span>
                <span className="text-xs font-semibold opacity-80">/ 60 pontos</span>
              </div>
              <p className="text-[11px] font-medium mt-0.5">
                {totalMrcScore < 48
                  ? '⚠️ Ponto de corte < 48: Sugestivo de Fraqueza Muscular Adquirida na UTI!'
                  : '✅ Força global preservada (≥ 48 pontos). Baixo risco de ICU-AW.'}
              </p>
            </div>
          </div>

          {/* Guide to Grades */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-[11px]">
            <span className="font-bold text-slate-700 block">Legenda da Escala MRC (0 a 5):</span>
            <p className="text-slate-500">
              0: Nenhuma contração • 1: Esboço visível • 2: Movimento sem gravidade • 3: Vence gravidade • 4: Vence resistência moderada • 5: Força normal
            </p>
          </div>

          {/* Muscle Pairs List */}
          <div className="space-y-2.5">
            {MRC_ICU_MUSCLE_PAIRS.map((pair) => (
              <div
                key={pair.id}
                className="p-3 bg-white rounded-xl border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <span className="font-bold text-slate-800 text-xs">
                  {pair.name}
                </span>

                <div className="flex items-center gap-3">
                  {/* Right Side */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-500">Dir:</span>
                    <select
                      value={mrcScores[pair.id]?.right ?? 5}
                      onChange={(e) => handleMrcChange(pair.id, 'right', parseInt(e.target.value, 10))}
                      className="px-2 py-1 rounded-lg border border-slate-200 font-bold text-slate-800 bg-slate-50 outline-none"
                    >
                      {[0, 1, 2, 3, 4, 5].map((g) => (
                        <option key={g} value={g}>
                          Grau {g}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Left Side */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-500">Esq:</span>
                    <select
                      value={mrcScores[pair.id]?.left ?? 5}
                      onChange={(e) => handleMrcChange(pair.id, 'left', parseInt(e.target.value, 10))}
                      className="px-2 py-1 rounded-lg border border-slate-200 font-bold text-slate-800 bg-slate-50 outline-none"
                    >
                      {[0, 1, 2, 3, 4, 5].map((g) => (
                        <option key={g} value={g}>
                          Grau {g}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- 4. GASOMETRIA CONTENT --- */}
      {activeScale === 'gasometria' && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-soft space-y-4 text-xs animate-in fade-in">
          {/* Inputs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                pH (Ref: 7.35-7.45)
              </label>
              <input
                type="number"
                step="0.01"
                value={phInput}
                onChange={(e) => setPhInput(e.target.value)}
                className="w-full px-2 py-1.5 bg-white rounded-xl border border-slate-200 font-black text-sm text-slate-900 outline-none focus:border-emerald-500"
              />
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                PaCO2 (Ref: 35-45)
              </label>
              <input
                type="number"
                step="1"
                value={paco2Input}
                onChange={(e) => setPaco2Input(e.target.value)}
                className="w-full px-2 py-1.5 bg-white rounded-xl border border-slate-200 font-black text-sm text-slate-900 outline-none focus:border-emerald-500"
              />
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                HCO3 (Ref: 22-26)
              </label>
              <input
                type="number"
                step="0.5"
                value={hco3Input}
                onChange={(e) => setHco3Input(e.target.value)}
                className="w-full px-2 py-1.5 bg-white rounded-xl border border-slate-200 font-black text-sm text-slate-900 outline-none focus:border-emerald-500"
              />
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                PaO2 (Ref: 80-100)
              </label>
              <input
                type="number"
                step="1"
                value={pao2Input}
                onChange={(e) => setPao2Input(e.target.value)}
                className="w-full px-2 py-1.5 bg-white rounded-xl border border-slate-200 font-black text-sm text-slate-900 outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-[10px] text-slate-400 font-bold shrink-0">Casos Clínicos:</span>
            <button
              onClick={() => { setPhInput('7.28'); setPaco2Input('58'); setHco3Input('25'); setPao2Input('68'); }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-semibold shrink-0"
            >
              Acidose Resp. Aguda
            </button>
            <button
              onClick={() => { setPhInput('7.36'); setPaco2Input('62'); setHco3Input('34'); setPao2Input('62'); }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-semibold shrink-0"
            >
              DPOC Compensado
            </button>
            <button
              onClick={() => { setPhInput('7.52'); setPaco2Input('26'); setHco3Input('23'); setPao2Input('92'); }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-semibold shrink-0"
            >
              Alcalose Resp.
            </button>
            <button
              onClick={() => { setPhInput('7.24'); setPaco2Input('36'); setHco3Input('15'); setPao2Input('88'); }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-semibold shrink-0"
            >
              Acidose Metabólica
            </button>
          </div>

          {/* Diagnostic Result */}
          <div
            className={`p-4 rounded-2xl border-2 space-y-2 ${
              gasometryResult.isCritical
                ? 'bg-rose-50 border-rose-400 text-rose-950'
                : gasometryResult.type !== 'normal'
                ? 'bg-amber-50 border-amber-400 text-amber-950'
                : 'bg-emerald-50 border-emerald-400 text-emerald-950'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Interpretação Automática
              </span>
              {gasometryResult.isCritical && (
                <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white font-black text-[10px] uppercase animate-pulse">
                  Alerta Crítico
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-black tracking-tight">
              {gasometryResult.diagnosis}
            </h3>

            <p className="text-xs font-medium">
              💡 <strong>Mecanismo:</strong> {gasometryResult.compensation}
            </p>

            {gasometryResult.oxygenation && (
              <p className="text-xs font-semibold pt-1 border-t border-current/20">
                🫁 <strong>Oxigenação:</strong> {gasometryResult.oxygenation}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
