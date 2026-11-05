import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  User,
  History,
  Trash2,
  Share2,
  Calendar,
  Clock,
  Activity,
  HeartPulse,
  PlusCircle,
  FileCheck2
} from 'lucide-react';
import { SoapRecord } from '../../types';
import { StorageService } from '../../utils/storage';

interface SoapViewProps {
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

// Rapid clinical chips for quick hospital documentation
const SUBJ_CHIPS = [
  'Lúcido e orientado no tempo/espaço',
  'Refere dor moderada aos movimentos',
  'Nega queixas álgicas no momento',
  'Dispneia aos mínimos esforços',
  'Tosse produtiva com secreção',
  'Refere fadiga muscular e cansaço',
  'Boa noite de sono, sem intercorrências',
  'Ansioso em relação ao prognóstico',
];

const FINDINGS_CHIPS = [
  'Murmúrio vesicular fisiológico sem ruídos',
  'Roncos difusos bilateralmente',
  'Sibilos expiratórios em ápices',
  'Crepitações finas em bases pulmonares',
  'Padrão respiratório coordenado',
  'Tiragem intercostal ausente',
  'Edema de MMII +/4+ sem cacifo',
  'ADM ativa preservada em MMSS e MMII',
  'Redução de ADM em flexão de joelho',
  'Espasticidade grau 1 em flexores de punho',
];

const CONDUCTS_CHIPS = [
  'Cinesioterapia motora ativa assistida',
  'Cicloergômetro de MMII (15 min)',
  'Treino de transferências e ortostatismo',
  'Deambulação assistida no corredor',
  'Exercícios metabólicos de tornozelo/pé',
  'Drenagem postural e manobra ELTGOL',
  'Tosse assistida e aspiração de VAS',
  'Pressão positiva (EPAP/CPAP)',
  'Fortalecimento isométrico de quadríceps',
  'Alongamento passivo de cadeia posterior',
];

const ASSESSMENT_CHIPS = [
  'Paciente cooperativo e colaborativo',
  'Estabilidade hemodinâmica durante condutas',
  'Boa resposta e tolerância aos exercícios',
  'Higiene brônquica efetiva pós-conduta',
  'Melhora da ausculta pulmonar após manobras',
  'Queda transitória de SpO2 revertida em repouso',
];

const PLAN_CHIPS = [
  'Manter cinesioterapia motora 2x ao dia',
  'Estimular ortostatismo e sedestação beira-leito',
  'Desmame gradual de oxigenoterapia',
  'Progressão de carga em cicloergômetro',
  'Orientar acompanhante sobre posicionamento',
  'Reavaliar ausculta e gasometria no próximo plantão',
];

export const SoapView: React.FC<SoapViewProps> = ({ onShowToast }) => {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [viewHistory, setViewHistory] = useState(false);
  const [history, setHistory] = useState<SoapRecord[]>(() => StorageService.getSoapHistory());

  // Patient Info
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [bed, setBed] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  // Step 1: Subjetivo
  const [selectedSubj, setSelectedSubj] = useState<string[]>([
    'Lúcido e orientado no tempo/espaço',
  ]);
  const [customSubj, setCustomSubj] = useState('');

  // Step 2: Objetivo
  const [pa, setPa] = useState('120/80');
  const [fc, setFc] = useState('78');
  const [fr, setFr] = useState('18');
  const [spo2, setSpo2] = useState('97% em AA');
  const [temp, setTemp] = useState('36.5');
  const [eva, setEva] = useState('2');
  const [selectedFindings, setSelectedFindings] = useState<string[]>([
    'Murmúrio vesicular fisiológico sem ruídos',
    'Padrão respiratório coordenado',
  ]);
  const [selectedConducts, setSelectedConducts] = useState<string[]>([
    'Cinesioterapia motora ativa assistida',
    'Treino de transferências e ortostatismo',
  ]);
  const [customObjective, setCustomObjective] = useState('');

  // Step 3: Avaliação
  const [selectedAssessment, setSelectedAssessment] = useState<string[]>([
    'Paciente cooperativo e colaborativo',
    'Estabilidade hemodinâmica durante condutas',
  ]);
  const [customAssessment, setCustomAssessment] = useState('');

  // Step 4: Plano
  const [selectedPlan, setSelectedPlan] = useState<string[]>([
    'Manter cinesioterapia motora 2x ao dia',
    'Estimular ortostatismo e sedestação beira-leito',
  ]);
  const [customPlan, setCustomPlan] = useState('');

  // Student details
  const [studentName, setStudentName] = useState('Acadêmico(a) de Fisioterapia');
  const [crefitoOrRa, setCrefitoOrRa] = useState('RA: 20241088 / Sob Supervisão');

  // Toggle helper for chips
  const toggleChip = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  // Compile formatted hospital evolution text
  const compileHospitalText = () => {
    const today = new Date().toLocaleDateString('pt-BR');
    const nowTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const pName = patientName.trim() || 'Paciente não identificado';
    const pAge = age.trim() ? ` (${age.trim()})` : '';
    const pBed = bed.trim() ? ` | Leito: ${bed.trim()}` : '';
    const pDiag = diagnosis.trim() ? `\nHD: ${diagnosis.trim()}` : '';

    const subjList = [...selectedSubj];
    if (customSubj.trim()) subjList.push(customSubj.trim());

    const vitalsStr = `PA: ${pa} mmHg | FC: ${fc} bpm | FR: ${fr} irpm | SpO2: ${spo2} | Temp: ${temp} °C | Dor EVA: ${eva}/10`;

    const findingsList = [...selectedFindings];
    const conductsList = [...selectedConducts];
    if (customObjective.trim()) conductsList.push(customObjective.trim());

    const assessList = [...selectedAssessment];
    if (customAssessment.trim()) assessList.push(customAssessment.trim());

    const planList = [...selectedPlan];
    if (customPlan.trim()) planList.push(customPlan.trim());

    return `EVOLUÇÃO FISIOTERAPÊUTICA HOSPITALAR
Data: ${today} às ${nowTime}${pBed}
Paciente: ${pName}${pAge}${pDiag}

[S - SUBJETIVO]
${subjList.length > 0 ? subjList.join('; ') + '.' : 'Paciente sem queixas registradas.'}

[O - OBJETIVO]
Sinais Vitais: ${vitalsStr}
Achados Clínicos: ${findingsList.length > 0 ? findingsList.join('; ') + '.' : 'Sem achados específicos.'}
Condutas Realizadas: ${conductsList.length > 0 ? conductsList.join('; ') + '.' : 'Atendimento cinesioterapêutico padrão.'}

[A - AVALIAÇÃO]
${assessList.length > 0 ? assessList.join('. ') + '.' : 'Quadro estável com boa tolerância.'}

[P - PLANO]
${planList.length > 0 ? planList.join('; ') + '.' : 'Manter condutas prescritas.'}

${studentName} - ${crefitoOrRa}`;
  };

  const handleCopy = () => {
    const text = compileHospitalText();
    navigator.clipboard.writeText(text);
    onShowToast('Evolução copiada no padrão hospitalar!', 'success');
  };

  const handleSaveToHistory = () => {
    const compiled = compileHospitalText();
    const newRecord: SoapRecord = {
      id: `soap-${Date.now()}`,
      patientName: patientName.trim() || 'Paciente Anônimo',
      age: age.trim(),
      bed: bed.trim(),
      diagnosis: diagnosis.trim() || 'Fisioterapia Geral',
      date: new Date().toLocaleDateString('pt-BR'),
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      subjective: { complaints: selectedSubj, customText: customSubj },
      objective: {
        vitals: { pa, fc, fr, spo2, temp, dorEva: eva },
        findings: selectedFindings,
        conducts: selectedConducts,
        customText: customObjective,
      },
      assessment: { status: selectedAssessment.join('; '), evolution: '', customText: customAssessment },
      plan: { goals: selectedPlan, nextConducts: [], customText: customPlan },
      studentName,
      crefitoOrRa,
      compiledText: compiled,
    };

    const updated = StorageService.saveSoapRecord(newRecord);
    setHistory(updated);
    onShowToast('Evolução salva no seu histórico com sucesso!', 'success');
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = StorageService.deleteSoapRecord(id);
    setHistory(updated);
    onShowToast('Evolução removida do histórico.', 'info');
  };

  const steps = [
    { num: 1, label: 'S', title: 'Subjetivo' },
    { num: 2, label: 'O', title: 'Objetivo' },
    { num: 3, label: 'A', title: 'Avaliação' },
    { num: 4, label: 'P', title: 'Plano' },
  ];

  return (
    <div className="space-y-4 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 rounded-3xl p-5 text-white shadow-xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Gerador Clínico Hospitalar</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Evolução Rápida (SOAP)
          </h1>
          <p className="text-xs text-emerald-100/90 mt-1 max-w-xs">
            Preenchimento ágil por chips e compilação instantânea para o prontuário.
          </p>
        </div>

        <button
          onClick={() => setViewHistory(!viewHistory)}
          className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all ${
            viewHistory ? 'bg-white text-emerald-900 shadow-lg' : 'bg-white/15 text-white hover:bg-white/25'
          }`}
          title="Histórico de evoluções"
        >
          <History className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold">Histórico</span>
        </button>
      </div>

      {viewHistory ? (
        /* Saved History View */
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-600" />
              Evoluções Salvas ({history.length})
            </h2>
            <button
              onClick={() => setViewHistory(false)}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              Voltar ao Gerador
            </button>
          </div>

          {history.length > 0 ? (
            history.map((record) => (
              <div
                key={record.id}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-soft space-y-3 text-xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">
                      {record.patientName} {record.age ? `• ${record.age}` : ''}
                    </h3>
                    <p className="text-slate-500 text-[11px] font-medium">
                      {record.bed || 'Leito não informado'} • {record.diagnosis}
                    </p>
                    <span className="text-[10px] text-emerald-700 font-bold">
                      {record.date} às {record.time}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDeleteHistoryItem(record.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 font-mono text-[11px] whitespace-pre-line text-slate-800 max-h-48 overflow-y-auto">
                  {record.compiledText}
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(record.compiledText);
                    onShowToast('Copiado para a área de transferência!', 'success');
                  }}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Esta Evolução</span>
                </button>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500 space-y-2">
              <FileText className="w-8 h-8 mx-auto text-slate-300" />
              <p className="font-bold">Nenhuma evolução salva ainda.</p>
              <button
                onClick={() => setViewHistory(false)}
                className="text-xs font-bold text-emerald-600 underline"
              >
                Criar uma nova evolução
              </button>
            </div>
          )}
        </div>
      ) : (
        /* 4-Step Progressive SOAP Generator Form */
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-soft space-y-4 text-xs">
          {/* Patient Quick Header */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pb-2 border-b border-slate-100">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Paciente</label>
              <input
                type="text"
                placeholder="Ex: João da Silva"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Idade</label>
              <input
                type="text"
                placeholder="Ex: 58 anos"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Leito / Setor</label>
              <input
                type="text"
                placeholder="Ex: Leito 08 - UTI"
                value={bed}
                onChange={(e) => setBed(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Diagnóstico Clínico</label>
              <input
                type="text"
                placeholder="Ex: Pós-op LCA / DPOC"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="flex items-center justify-between gap-1 pt-1">
            {steps.map((st) => {
              const isCurrent = activeStep === st.num;
              const isDone = activeStep > st.num;

              return (
                <button
                  key={st.num}
                  onClick={() => setActiveStep(st.num as any)}
                  className={`flex-1 py-2 px-1 rounded-xl flex items-center justify-center gap-1.5 font-bold transition-all ${
                    isCurrent
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500/20'
                      : isDone
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center bg-black/15">
                    {st.label}
                  </span>
                  <span className="hidden xs:inline text-xs">{st.title}</span>
                </button>
              );
            })}
          </div>

          {/* Step 1: SUBJETIVO */}
          {activeStep === 1 && (
            <div className="space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-sm">
                  1. S - Subjetivo (Queixas e Estado do Paciente)
                </span>
                <span className="text-[10px] text-slate-400">Toque para selecionar</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {SUBJ_CHIPS.map((chip) => {
                  const isSelected = selectedSubj.includes(chip);
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => toggleChip(selectedSubj, setSelectedSubj, chip)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all text-left ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Observações subjetivas adicionais:
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Paciente comunicativo, expressa desejo de receber alta para o quarto..."
                  value={customSubj}
                  onChange={(e) => setCustomSubj(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none text-xs"
                />
              </div>
            </div>
          )}

          {/* Step 2: OBJETIVO */}
          {activeStep === 2 && (
            <div className="space-y-3.5 animate-in fade-in">
              <span className="font-bold text-slate-800 text-sm block">
                2. O - Objetivo (Sinais Vitais, Exame Físico e Condutas)
              </span>

              {/* Vitals Form Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div>
                  <label className="text-[10px] font-bold text-slate-500">PA (mmHg)</label>
                  <input
                    type="text"
                    value={pa}
                    onChange={(e) => setPa(e.target.value)}
                    className="w-full px-2 py-1 bg-white rounded-lg border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500">FC (bpm)</label>
                  <input
                    type="text"
                    value={fc}
                    onChange={(e) => setFc(e.target.value)}
                    className="w-full px-2 py-1 bg-white rounded-lg border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500">FR (irpm)</label>
                  <input
                    type="text"
                    value={fr}
                    onChange={(e) => setFr(e.target.value)}
                    className="w-full px-2 py-1 bg-white rounded-lg border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500">SpO2 / O2</label>
                  <input
                    type="text"
                    value={spo2}
                    onChange={(e) => setSpo2(e.target.value)}
                    className="w-full px-2 py-1 bg-white rounded-lg border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500">Temp (°C)</label>
                  <input
                    type="text"
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    className="w-full px-2 py-1 bg-white rounded-lg border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500">Dor (EVA 0-10)</label>
                  <input
                    type="text"
                    value={eva}
                    onChange={(e) => setEva(e.target.value)}
                    className="w-full px-2 py-1 bg-white rounded-lg border border-slate-200 font-semibold"
                  />
                </div>
              </div>

              {/* Achados Clínicos */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Achados do Exame Físico / Ausculta:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {FINDINGS_CHIPS.map((chip) => {
                    const isSelected = selectedFindings.includes(chip);
                    return (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => toggleChip(selectedFindings, setSelectedFindings, chip)}
                        className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-teal-700 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                        }`}
                      >
                        {chip}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Condutas Aplicadas */}
              <div>
                <label className="font-bold text-emerald-800 block mb-1">
                  Condutas Fisioterapêuticas Realizadas:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {CONDUCTS_CHIPS.map((chip) => {
                    const isSelected = selectedConducts.includes(chip);
                    return (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => toggleChip(selectedConducts, setSelectedConducts, chip)}
                        className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                        }`}
                      >
                        {chip}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Detalhes adicionais de conduta / dosagem:
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Séries, repetições, parâmetros de estimulação ou parâmetros ventilatórios..."
                  value={customObjective}
                  onChange={(e) => setCustomObjective(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none text-xs"
                />
              </div>
            </div>
          )}

          {/* Step 3: AVALIAÇÃO */}
          {activeStep === 3 && (
            <div className="space-y-3 animate-in fade-in">
              <span className="font-bold text-slate-800 text-sm block">
                3. A - Avaliação (Interpretação e Resposta do Paciente)
              </span>

              <div className="flex flex-wrap gap-1.5">
                {ASSESSMENT_CHIPS.map((chip) => {
                  const isSelected = selectedAssessment.includes(chip);
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => toggleChip(selectedAssessment, setSelectedAssessment, chip)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Parecer clínico complementar:
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Paciente responde satisfatoriamente ao protocolo de reabilitação..."
                  value={customAssessment}
                  onChange={(e) => setCustomAssessment(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none text-xs"
                />
              </div>
            </div>
          )}

          {/* Step 4: PLANO & FINALIZAÇÃO */}
          {activeStep === 4 && (
            <div className="space-y-3.5 animate-in fade-in">
              <span className="font-bold text-slate-800 text-sm block">
                4. P - Plano Terapêutico &amp; Assinatura
              </span>

              <div className="flex flex-wrap gap-1.5">
                {PLAN_CHIPS.map((chip) => {
                  const isSelected = selectedPlan.includes(chip);
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => toggleChip(selectedPlan, setSelectedPlan, chip)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Metas para a próxima sessão:
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Iniciar treino de subida e descida de degraus com apoio..."
                  value={customPlan}
                  onChange={(e) => setCustomPlan(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none text-xs"
                />
              </div>

              {/* Student Identification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div>
                  <label className="text-[10px] font-bold text-slate-500">Seu Nome / Cargo</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-2 py-1.5 bg-white rounded-lg border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500">RA / Supervisão Preceptor</label>
                  <input
                    type="text"
                    value={crefitoOrRa}
                    onChange={(e) => setCrefitoOrRa(e.target.value)}
                    className="w-full px-2 py-1.5 bg-white rounded-lg border border-slate-200 font-semibold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            {activeStep > 1 ? (
              <button
                type="button"
                onClick={() => setActiveStep((prev) => (prev - 1) as any)}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>
            ) : <div />}

            {activeStep < 4 ? (
              <button
                type="button"
                onClick={() => setActiveStep((prev) => (prev + 1) as any)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1 shadow-md shadow-emerald-600/20 transition-all"
              >
                <span>Próximo Passo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveToHistory}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <FileCheck2 className="w-4 h-4 text-emerald-400" />
                  <span>Salvar</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-600/30 active:scale-95 transition-all"
                >
                  <Copy className="w-4 h-4" />
                  <span>1 Toque: Copiar para Prontuário</span>
                </button>
              </div>
            )}
          </div>

          {/* Live Preview Box of the Hospital Text */}
          <div className="pt-3 border-t border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold uppercase tracking-wider">
              <span>Prévia no Padrão Hospitalar:</span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-emerald-700 hover:underline flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                Copiar
              </button>
            </div>
            <pre className="p-3 bg-slate-950 text-emerald-300 font-mono text-[11px] rounded-2xl overflow-x-auto whitespace-pre-wrap max-h-48 border border-slate-800 shadow-inner">
              {compileHospitalText()}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
