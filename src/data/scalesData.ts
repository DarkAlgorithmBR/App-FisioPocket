// Scales and Calculators definitions and logic

export interface GlasgowState {
  ocular: number;
  verbal: number;
  motor: number;
  pupils: number;
}

export const GLASGOW_OPTIONS = {
  ocular: [
    { value: 4, label: 'Espontânea', desc: 'Olhos abertos sem estímulo prévio' },
    { value: 3, label: 'Ao comando verbal', desc: 'Abre os olhos após chamada em voz alta' },
    { value: 2, label: 'À estimulação de pressão', desc: 'Abre os olhos mediante estímulo na ponta dos dedos' },
    { value: 1, label: 'Nenhuma', desc: 'Não abre os olhos mesmo sob dor' },
  ],
  verbal: [
    { value: 5, label: 'Orientado', desc: 'Sabe nome, onde está, mês e ano' },
    { value: 4, label: 'Confuso', desc: 'Conversa, mas respostas desconexas/desorientado' },
    { value: 3, label: 'Palavras inapropriadas', desc: 'Grita ou pronuncia palavras soltas sem sentido' },
    { value: 2, label: 'Sons ininteligíveis', desc: 'Geme ou balbucia sons sem palavras articuladas' },
    { value: 1, label: 'Nenhuma', desc: 'Sem qualquer resposta vocal audível' },
  ],
  motor: [
    { value: 6, label: 'Obedece a comandos', desc: 'Cumpre ordens verbais simples (ex: aperte a mão)' },
    { value: 5, label: 'Localiza o estímulo', desc: 'Leva a mão acima da clavícula ao estímulo doloroso' },
    { value: 4, label: 'Flexão normal (retirada)', desc: 'Flete o braço retirando o membro da fonte de dor' },
    { value: 3, label: 'Flexão anormal (Decorticação)', desc: 'Flexão rígida de MMSS e extensão de MMII (lesão hemisférica)' },
    { value: 2, label: 'Extensão anormal (Descerebração)', desc: 'Extensão rígida e pronação de MMSS (lesão de tronco)' },
    { value: 1, label: 'Nenhuma', desc: 'Flacidez motora total sem movimento reflexo' },
  ],
  pupils: [
    { value: 0, label: 'Ambas reagem à luz', desc: 'Nenhuma pupila não reativa (subtrai 0)' },
    { value: 1, label: 'Apenas uma reage', desc: 'Anisocoria pupilar (subtrai 1 da pontuação)' },
    { value: 2, label: 'Nenhuma reage', desc: 'Midríase ou miose bilateral fixa (subtrai 2 pontos)' },
  ]
};

export function calculateGlasgow(state: GlasgowState) {
  const gcs = state.ocular + state.verbal + state.motor;
  const gcsP = Math.max(1, gcs - state.pupils);

  let severity = 'Leve';
  let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  let recommendation = 'Vigilância clínica e avaliação neurológica seriada a cada 2 a 4 horas.';

  if (gcs <= 8) {
    severity = 'Grave (TCE Grave)';
    badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
    recommendation = '⚠️ ALERTA: Glasgow ≤ 8 indica indicação formal de Intubação Orotraqueal (IOT) para proteção de vias aéreas e prevenção de hipóxia secundária!';
  } else if (gcs <= 12) {
    severity = 'Moderado (TCE Moderado)';
    badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
    recommendation = 'Monitoração contínua na UTI/Semi-intensiva. Risco de deterioração neurológica rápida.';
  }

  return { gcs, gcsP, severity, badgeColor, recommendation };
}

// MRC Strength Scale
export const MRC_SCALE_GRADES = [
  { grade: 0, title: 'Grau 0 - Nenhuma contração', desc: 'Paralisia motora completa, sem esboço palpável ou visível de contração.' },
  { grade: 1, title: 'Grau 1 - Esboço / Contração visível', desc: 'Contração muscular palpável ou visível, porém insuficiente para movimentar a articulação.' },
  { grade: 2, title: 'Grau 2 - Movimento com gravidade eliminada', desc: 'Movimento ativo completo no plano horizontal (com alívio total da força da gravidade).' },
  { grade: 3, title: 'Grau 3 - Vence a gravidade', desc: 'Movimento ativo completo contra a gravidade, mas sem suportar resistência imposta pelo examinador.' },
  { grade: 4, title: 'Grau 4 - Vence resistência moderada', desc: 'Movimento ativo completo contra a gravidade e contra resistência manual moderada.' },
  { grade: 5, title: 'Grau 5 - Força normal', desc: 'Força muscular plena contra gravidade e contra resistência manual máxima.' },
];

export const MRC_ICU_MUSCLE_PAIRS = [
  { id: 'shoulder', name: 'Abdução de Ombro (C5)' },
  { id: 'elbow', name: 'Flexão de Cotovelo (C6)' },
  { id: 'wrist', name: 'Extensão de Punho (C7)' },
  { id: 'hip', name: 'Flexão de Quadril (L2-L3)' },
  { id: 'knee', name: 'Extensão de Joelho (L3-L4)' },
  { id: 'ankle', name: 'Dorsiflexão de Tornozelo (L4-L5)' },
];

// Arterial Blood Gas Calculator
export interface GasometryResult {
  diagnosis: string;
  type: 'acidosis' | 'alkalosis' | 'normal';
  compensation: string;
  details: string[];
  oxygenation?: string;
  isCritical: boolean;
}

export function interpretGasometry(ph: number, paco2: number, hco3: number, pao2?: number): GasometryResult {
  const details: string[] = [];
  let diagnosis = 'Gasometria Normal';
  let type: 'acidosis' | 'alkalosis' | 'normal' = 'normal';
  let compensation = 'Parâmetros dentro da faixa normal';
  let isCritical = false;

  const normalPh = ph >= 7.35 && ph <= 7.45;
  const isAcidosis = ph < 7.35;
  const isAlkalosis = ph > 7.45;

  const highCo2 = paco2 > 45; // Acidificante
  const lowCo2 = paco2 < 35;  // Alcalinizante
  const highHco3 = hco3 > 26; // Alcalinizante
  const lowHco3 = hco3 < 22;  // Acidificante

  if (ph < 7.20 || ph > 7.60) {
    isCritical = true;
  }

  if (normalPh) {
    if (highCo2 && highHco3) {
      diagnosis = ph < 7.40 ? 'Acidose Respiratória Totalmente Compensada' : 'Alcalose Metabólica Totalmente Compensada';
      compensation = 'Compensação renal e respiratória completa.';
    } else if (lowCo2 && lowHco3) {
      diagnosis = ph < 7.40 ? 'Acidose Metabólica Totalmente Compensada' : 'Alcalose Respiratória Totalmente Compensada';
      compensation = 'Compensação completa mantendo pH fisiológico.';
    } else {
      diagnosis = 'Equilíbrio Ácido-Básico Normal';
      compensation = 'Homeostase preservada.';
    }
  } else if (isAcidosis) {
    type = 'acidosis';
    if (highCo2 && !lowHco3) {
      if (highHco3) {
        diagnosis = 'Acidose Respiratória Parcialmente Compensada';
        compensation = 'Rim retendo HCO3 para tentar amortecer a acidose.';
      } else {
        diagnosis = 'Acidose Respiratória Aguda (Descompensada)';
        compensation = 'Sem compensação renal evidente (fase aguda ou falência renal).';
      }
    } else if (lowHco3 && !highCo2) {
      if (lowCo2) {
        diagnosis = 'Acidose Metabólica Parcialmente Compensada';
        compensation = 'Hiperventilação compensatória (lavando CO2).';
      } else {
        diagnosis = 'Acidose Metabólica Aguda (Descompensada)';
        compensation = 'Sem resposta respiratória compensatória.';
      }
    } else if (highCo2 && lowHco3) {
      diagnosis = 'Distúrbio Misto: Acidose Respiratória + Acidose Metabólica';
      compensation = 'Condição gravíssima: ambos os sistemas contribuindo para acidemia severa!';
      isCritical = true;
    }
  } else if (isAlkalosis) {
    type = 'alkalosis';
    if (lowCo2 && !highHco3) {
      if (lowHco3) {
        diagnosis = 'Alcalose Respiratória Parcialmente Compensada';
        compensation = 'Rim excretando bicarbonato para reduzir a alcalose.';
      } else {
        diagnosis = 'Alcalose Respiratória Aguda (Descompensada)';
        compensation = 'Sem compensação renal (comum em hiperventilação psicogênica ou dor).';
      }
    } else if (highHco3 && !lowCo2) {
      if (highCo2) {
        diagnosis = 'Alcalose Metabólica Parcialmente Compensada';
        compensation = 'Hipoventilação compensatória com retenção de CO2.';
      } else {
        diagnosis = 'Alcalose Metabólica Aguda (Descompensada)';
        compensation = 'Sem compensação pulmonar.';
      }
    } else if (lowCo2 && highHco3) {
      diagnosis = 'Distúrbio Misto: Alcalose Respiratória + Alcalose Metabólica';
      compensation = 'Condição de alto risco com alcalemia extrema!';
      isCritical = true;
    }
  }

  let oxygenation = undefined;
  if (pao2 !== undefined && !isNaN(pao2) && pao2 > 0) {
    if (pao2 >= 80) oxygenation = 'Normoxemia (PaO2 ≥ 80 mmHg)';
    else if (pao2 >= 60) oxygenation = 'Hipoxemia Leve (PaO2 60-79 mmHg)';
    else if (pao2 >= 40) oxygenation = 'Hipoxemia Moderada (PaO2 40-59 mmHg)';
    else {
      oxygenation = 'Hipoxemia Grave (PaO2 < 40 mmHg) - Risco de Hipóxia Tecidual!';
      isCritical = true;
    }
  }

  details.push(`pH: ${ph.toFixed(2)} (Ref: 7.35 - 7.45)`);
  details.push(`PaCO2: ${paco2} mmHg (Ref: 35 - 45 mmHg)`);
  details.push(`HCO3: ${hco3} mEq/L (Ref: 22 - 26 mEq/L)`);

  return { diagnosis, type, compensation, details, oxygenation, isCritical };
}
