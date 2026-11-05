const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public', 'mapas');
const lotFolders = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory()).sort();

// Collect all files from disk
const diskRegistry = {};

lotFolders.forEach(lot => {
  const files = fs.readdirSync(path.join(baseDir, lot)).filter(f => f.endsWith('.png'));
  files.forEach(file => {
    const m = file.match(/mapa-(\d+)/i);
    if (m) {
      const id = parseInt(m[1], 10);
      diskRegistry[id] = {
        lot,
        file,
        path: `./mapas/${lot}/${file}`
      };
    }
  });
});

console.log('Total files found on disk:', Object.keys(diskRegistry).length);

// Default topics and clinical metadata generator
const LOT_CONFIG = {
  1: { cat: 'Ortopedia & Traumatologia', sub: 'Membro Superior' },
  2: { cat: 'Ortopedia & Traumatologia', sub: 'Membro Superior' },
  3: { cat: 'Ortopedia & Traumatologia', sub: 'Coluna & Pelve' },
  4: { cat: 'Ortopedia & Traumatologia', sub: 'Membro Inferior' },
  5: { cat: 'Ortopedia & Traumatologia', sub: 'Recursos Terapêuticos' },
  6: { cat: 'Fisioterapia Neurofuncional', sub: 'SNC' },
  7: { cat: 'Fisioterapia Neurofuncional', sub: 'Escalas Neurológicas' },
  8: { cat: 'Fisioterapia Respiratória & UTI', sub: 'Semiologia Pulmonar' },
  9: { cat: 'Fisioterapia Respiratória & UTI', sub: 'Recursos & Manobras' },
  10: { cat: 'Fisioterapia Respiratória & UTI', sub: 'Ventilação Mecânica' },
  11: { cat: 'Fisioterapia Respiratória & UTI', sub: 'Recursos & Manobras' },
  12: { cat: 'Cardiorrespiratória & Fisiologia', sub: 'Reabilitação Cardíaca' },
  13: { cat: 'Anatomia & Cinesiologia', sub: 'Biomecânica' },
  14: { cat: 'Pediatria & Saúde da Mulher', sub: 'Marcos Motores' },
  15: { cat: 'Prática Clínica & Round', sub: 'SOAP' },
};

// Titles and specific subcategories for all 150 items
const TITLES = {
  // Lote 01 (1-10)
  1: { t: 'Síndrome do Impacto Subacromial', sub: 'Membro Superior' },
  2: { t: 'Lesões do Manguito Rotador: Avaliação e Reabilitação', sub: 'Membro Superior' },
  3: { t: 'Instabilidade Glenoumeral e Luxação do Ombro', sub: 'Membro Superior' },
  4: { t: 'Capsulite Adesiva (Ombro Congelado)', sub: 'Membro Superior' },
  5: { t: 'Epicondilite Lateral (Cotovelo de Tenista)', sub: 'Membro Superior' },
  6: { t: 'Epicondilite Medial (Cotovelo de Golfista)', sub: 'Membro Superior' },
  7: { t: 'Bursite Subacromial e Olecraniana', sub: 'Membro Superior' },
  8: { t: 'Testes Especiais de Ombro: Guia de Bolso', sub: 'Membro Superior' },
  9: { t: 'Testes Especiais de Cotovelo: Guia de Bolso', sub: 'Membro Superior' },
  10: { t: 'Pós-Operatório do Manguito Rotador: Fases', sub: 'Membro Superior' },

  // Lote 02 (11-20)
  11: { t: 'Síndrome do Túnel do Carpo (STC)', sub: 'Membro Superior' },
  12: { t: 'Tenossinovite Estenosante de De Quervain', sub: 'Membro Superior' },
  13: { t: 'Fratura de Colles e Rádio Distal: Reabilitação', sub: 'Membro Superior' },
  14: { t: 'Cervicalgia Mecânica e Síndrome Postural', sub: 'Coluna & Pelve' },
  15: { t: 'Hérnia de Disco Cervical e Radiculopatia', sub: 'Coluna & Pelve' },
  16: { t: 'Síndrome do Desfiladeiro Torácico (SDT)', sub: 'Coluna & Pelve' },
  17: { t: 'Escoliose Idiopática do Adolescente (EIA)', sub: 'Coluna & Pelve' },
  18: { t: 'Hipercifose Torácica e Dor Miofascial', sub: 'Coluna & Pelve' },
  19: { t: 'Testes Especiais de Punho e Mão', sub: 'Membro Superior' },
  20: { t: 'Testes Especiais da Coluna Cervical', sub: 'Coluna & Pelve' },

  // Lote 03 (21-30)
  21: { t: 'Lombalgia Mecânica e Espondilolistese', sub: 'Coluna & Pelve' },
  22: { t: 'Hérnia de Disco Lombar e Lombociatalgia', sub: 'Coluna & Pelve' },
  23: { t: 'Disfunção da Articulação Sacroilíaca (ASI)', sub: 'Coluna & Pelve' },
  24: { t: 'Impacto Femoroacetabular (IFA)', sub: 'Coluna & Pelve' },
  25: { t: 'Dor Trocantérica Maior (Bursite Trocanteriana)', sub: 'Coluna & Pelve' },
  26: { t: 'Coxartrose (Osteoartrose de Quadril)', sub: 'Coluna & Pelve' },
  27: { t: 'Síndrome do Músculo Piriforme', sub: 'Coluna & Pelve' },
  28: { t: 'Testes Especiais Lombossacros: Guia de Bolso', sub: 'Coluna & Pelve' },
  29: { t: 'Testes Especiais de Quadril: Guia de Bolso', sub: 'Coluna & Pelve' },
  30: { t: 'Estabilização Segmentar e Fortalecimento do Core', sub: 'Coluna & Pelve' },

  // Lote 04 (31-40)
  31: { t: 'Lesão do Ligamento Cruzado Anterior (LCA)', sub: 'Membro Inferior' },
  32: { t: 'Lesões Meniscais do Joelho (Medial e Lateral)', sub: 'Membro Inferior' },
  33: { t: 'Síndrome da Dor Femoropatelar (Condromalácia)', sub: 'Membro Inferior' },
  34: { t: 'Lesões dos Ligamentos Colaterais (LCM e LCL)', sub: 'Membro Inferior' },
  35: { t: 'Tendinopatia Patelar (Joelho de Saltador)', sub: 'Membro Inferior' },
  36: { t: 'Gonartrose (Osteoartrose de Joelho)', sub: 'Membro Inferior' },
  37: { t: 'Lesão do Ligamento Cruzado Posterior (LCP)', sub: 'Membro Inferior' },
  38: { t: 'Testes de Estabilidade do Joelho: Guia de Bolso', sub: 'Membro Inferior' },
  39: { t: 'Testes Meniscais Especiais: Guia de Bolso', sub: 'Membro Inferior' },
  40: { t: 'Reabilitação Acelerada de LCA: Critérios de Retorno', sub: 'Membro Inferior' },

  // Lote 05 (41-50)
  41: { t: 'Entorse de Tornozelo por Inversão e Regras de Ottawa', sub: 'Membro Inferior' },
  42: { t: 'Fascite Plantar e Esporão de Calcâneo', sub: 'Membro Inferior' },
  43: { t: 'Tendinopatia do Calcâneo (Tendão de Aquiles)', sub: 'Membro Inferior' },
  44: { t: 'Metatarsalgia e Neuroma de Morton', sub: 'Membro Inferior' },
  45: { t: 'Instabilidade Crônica de Tornozelo (ICT)', sub: 'Membro Inferior' },
  46: { t: 'Testes Especiais de Tornozelo e Pé: Guia de Bolso', sub: 'Membro Inferior' },
  47: { t: 'Terapia Manual Ortopédica: Conceitos Maitland e Mulligan', sub: 'Recursos Terapêuticos' },
  48: { t: 'Liberação Miofascial e Pontos-Gatilho (Trigger Points)', sub: 'Recursos Terapêuticos' },
  49: { t: 'Eletroterapia: Parâmetros de TENS e FES', sub: 'Recursos Terapêuticos' },
  50: { t: 'Ultrassom Terapêutico e Laser de Baixa Potência', sub: 'Recursos Terapêuticos' },

  // Lote 06 (51-60)
  51: { t: 'AVE Isquêmico vs Hemorrágico: Fisiopatologia e Fase Aguda', sub: 'SNC' },
  52: { t: 'Fases de Recuperação Pós-AVE: Da Flacidez à Espasticidade', sub: 'SNC' },
  53: { t: 'Doença de Parkinson: Raciocínio Clínico e Condutas', sub: 'SNC' },
  54: { t: 'Traumatismo Cranioencefálico (TCE) e Escala de Glasgow', sub: 'SNC' },
  55: { t: 'Traumatismo Raquimedular (TRM) e Escala ASIA', sub: 'SNC' },
  56: { t: 'Esclerose Múltipla e Manejo da Fadiga', sub: 'SNC' },
  57: { t: 'Paralisia Cerebral: Classificação GMFCS e Abordagem', sub: 'SNC' },
  58: { t: 'Conceito Bobath / Neuroevolutivo na Prática Clínica', sub: 'Equilíbrio & Marcha' },
  59: { t: 'Facilitação Neuromuscular Proprioceptiva (FNP / Kabat)', sub: 'Equilíbrio & Marcha' },
  60: { t: 'Treino de Marcha com Descarga de Peso e Pistas Sensoriais', sub: 'Equilíbrio & Marcha' },

  // Lote 07 (61-70)
  61: { t: 'Paralisia Facial Periférica (Bell) vs Central', sub: 'SNP' },
  62: { t: 'Síndrome de Guillain-Barré: Fisioterapia Respiratória e Motora', sub: 'SNP' },
  63: { t: 'Esclerose Lateral Amiotrófica (ELA): Condutas e Cuidados', sub: 'SNP' },
  64: { t: 'Lesões do Plexo Braquial (Erb-Duchenne e Klumpke)', sub: 'SNP' },
  65: { t: 'Avaliação da Espasticidade: Escala de Ashworth Modificada', sub: 'Escalas Neurológicas' },
  66: { t: 'Ataxias Cerebelares e Coordenação Motora (Exercícios de Frenkel)', sub: 'Escalas Neurológicas' },
  67: { t: 'Avaliação do Equilíbrio e Quedas: Escala de Berg e TUG Test', sub: 'Escalas Neurológicas' },
  68: { t: 'Avaliação da Sensibilidade Superficial e Profunda', sub: 'Escalas Neurológicas' },
  69: { t: 'Reflexos Profundos e Sinais Patológicos (Babinski e Hoffmann)', sub: 'Escalas Neurológicas' },
  70: { t: 'Terapia por Contensão Induzida (TCI) e Neuroplasticidade', sub: 'Equilíbrio & Marcha' },

  // Lote 08 (71-80)
  71: { t: 'Mecânica Respiratória: Ventilação, Pressões e Complacência', sub: 'Semiologia Pulmonar' },
  72: { t: 'Padrões Respiratórios e Deformidades Torácicas', sub: 'Semiologia Pulmonar' },
  73: { t: 'Ausculta Pulmonar e Ruídos Adventícios', sub: 'Semiologia Pulmonar' },
  74: { t: 'Gasometria Arterial: Valores de Referência e Raciocínio Clínico', sub: 'Semiologia Pulmonar' },
  75: { t: 'Distúrbios Ácido-Básicos: Acidose e Alcalose (Compensações)', sub: 'Semiologia Pulmonar' },
  76: { t: 'Espirometria: Volumes, Capacidades e Curvas Fluxo-Volume', sub: 'Semiologia Pulmonar' },
  77: { t: 'Pressões Respiratórias Máximas: PImáx e PEmáx', sub: 'Semiologia Pulmonar' },
  78: { t: 'Oxigenoterapia: Sistemas de Baixo e Alto Fluxo', sub: 'Semiologia Pulmonar' },
  79: { t: 'Monitorização Não-Invasiva: Oximetria de Pulso e Capnografia', sub: 'Semiologia Pulmonar' },
  80: { t: 'Índice de Respiração Rápida e Superficial (IRRS / Tobin)', sub: 'Semiologia Pulmonar' },

  // Lote 09 (81-90)
  81: { t: 'Doença Pulmonar Obstrutiva Crônica (DPOC): Manejo Clínico', sub: 'Patologias Respiratórias' },
  82: { t: 'Crise Asmática Aguda: Avaliação da Gravidade e Intervenção', sub: 'Patologias Respiratórias' },
  83: { t: 'Pneumonias (PAC e PAV): Fisioterapia Respiratória', sub: 'Patologias Respiratórias' },
  84: { t: 'Atelectasias: Mecanismos e Técnicas de Reexpansão Pulmonar', sub: 'Recursos & Manobras' },
  85: { t: 'Derrame Pleural e Pneumotórax: Cuidados no Dreno de Tórax', sub: 'Patologias Respiratórias' },
  86: { t: 'Manobras de Higiene Brônquica: ELTGOL e Drenagem Postural', sub: 'Recursos & Manobras' },
  87: { t: 'Técnicas de Expiração Forçada (TEF / Huffing) e Tosse Assistida', sub: 'Recursos & Manobras' },
  88: { t: 'Dispositivos Oscilatórios Orais: Flutter, Shaker e Acapella', sub: 'Recursos & Manobras' },
  89: { t: 'Espirometria de Incentivo a Volume e a Fluxo', sub: 'Recursos & Manobras' },
  90: { t: 'Treinamento Muscular Inspiratório (TMI) com PowerBreathe', sub: 'Recursos & Manobras' },

  // Lote 10 (91-100)
  91: { t: 'Monitorização Hemodinâmica Básica e Gasométrica na UTI', sub: 'Ventilação Mecânica' },
  92: { t: 'Ventilação Não-Invasiva (VNI): Modalidades CPAP e BiPAP', sub: 'Ventilação Mecânica' },
  93: { t: 'Ventilação Mecânica Invasiva: Fases do Ciclo e Circuitos', sub: 'Ventilação Mecânica' },
  94: { t: 'Modo VCV (Ventilação com Volume Controlado)', sub: 'Ventilação Mecânica' },
  95: { t: 'Modo PCV (Ventilação com Pressão Controlada)', sub: 'Ventilação Mecânica' },
  96: { t: 'Modo PSV (Pressão de Suporte Ventilatória)', sub: 'Ventilação Mecânica' },
  97: { t: 'Parâmetros Protetores: Driving Pressure e Pressão de Platô', sub: 'Ventilação Mecânica' },
  98: { t: 'Desmame Ventilatório: Critérios de Elegibilidade e TRE', sub: 'Ventilação Mecânica' },
  99: { t: 'Extubação Segura e Teste de Vazamento do Cuff (Cuff Leak Test)', sub: 'Ventilação Mecânica' },
  100: { t: 'Posição Prona na SDRA: Protocolo e Cuidados Fisioterapêuticos', sub: 'Ventilação Mecânica' },

  // Lote 11 (101-110)
  101: { t: 'Fraqueza Muscular Adquirida na UTI (ICU-AW / PIDA)', sub: 'Recursos & Manobras' },
  102: { t: 'Escala MRC de Força Muscular na UTI (Escore 0 a 60)', sub: 'Semiologia Pulmonar' },
  103: { t: 'Escalas de Sedação e Agitação na UTI: RASS e SAS', sub: 'Semiologia Pulmonar' },
  104: { t: 'Delirium na UTI: Avaliação com o Método CAM-ICU', sub: 'Semiologia Pulmonar' },
  105: { t: 'Mobilização Precoce na UTI: Protocolos por Etapas e Segurança', sub: 'Recursos & Manobras' },
  106: { t: 'Aspiração Traqueal em Sistema Aberto e Fechado', sub: 'Recursos & Manobras' },
  107: { t: 'Fisioterapia no Paciente Traqueostomizado: Cuidados e Desmame', sub: 'Recursos & Manobras' },
  108: { t: 'Parada Cardiorrespiratória (PCR): Suporte Básico de Vida (SBV)', sub: 'Recursos & Manobras' },
  109: { t: 'Lesão por Pressão: Posicionamento Terapêutico e Prevenção', sub: 'Recursos & Manobras' },
  110: { t: 'Acessos Vasculares, Sondas e Drenos: Cuidados na Mobilização', sub: 'Recursos & Manobras' },

  // Lote 12 (111-120)
  111: { t: 'Insuficiência Cardíaca Congestiva (ICC) e Classificação NYHA', sub: 'Reabilitação Cardíaca' },
  112: { t: 'Infarto Agudo do Miocárdio (IAM): Fase Hospitalar Precoce', sub: 'Reabilitação Cardíaca' },
  113: { t: 'Fases da Reabilitação Cardiovascular (Fases 1, 2, 3 e 4)', sub: 'Reabilitação Cardíaca' },
  114: { t: 'Hipertensão Arterial Sistêmica e Prescrição de Exercícios', sub: 'Prescrição de Exercício' },
  115: { t: 'Fórmula de Karvonen e Frequência Cardíaca de Treinamento', sub: 'Prescrição de Exercício' },
  116: { t: 'Escalas de Percepção de Esforço de Borg (CR10 e 6-20)', sub: 'Testes Funcionais' },
  117: { t: 'Teste de Caminhada de 6 Minutos (TC6M): Diretrizes ATS', sub: 'Testes Funcionais' },
  118: { t: 'Vias Energéticas e Bioenergética Aplicada ao Exercício', sub: 'Prescrição de Exercício' },
  119: { t: 'Consumo Máximo de Oxigênio (VO2 máx) e Limiares Ventilatórios', sub: 'Testes Funcionais' },
  120: { t: 'Prescrição do Treinamento Físico: Aeróbico vs Resistido', sub: 'Prescrição de Exercício' },

  // Lote 13 (121-130)
  121: { t: 'Planos, Eixos Anatômicos e Graus de Liberdade Articular', sub: 'Biomecânica' },
  122: { t: 'Tipos de Contração Muscular e Alavancas Biomecânicas', sub: 'Biomecânica' },
  123: { t: 'Biomecânica da Marcha Humana Normal: Fases e Ações Musculares', sub: 'Biomecânica' },
  124: { t: 'Marchas Patológicas: Trendelenburg, Escarvante, Ceifante e Anserina', sub: 'Biomecânica' },
  125: { t: 'Anatomia Palpatória: Cintura Escapular, Ombro e Clavícula', sub: 'Palpação' },
  126: { t: 'Anatomia Palpatória: Pelve, Quadril e Região Glútea', sub: 'Palpação' },
  127: { t: 'Anatomia Palpatória: Joelho, Tornozelo e Pontos Ósseos do Pé', sub: 'Palpação' },
  128: { t: 'Mapa de Dermátomos e Miótomos (Sensibilidade e Força Motora)', sub: 'Dermátomos & Miótomos' },
  129: { t: 'Goniometria Articular: Posicionamento do Eixo e Valores Normais', sub: 'Goniometria' },
  130: { t: 'Avaliação Postural Global: Inspeção Sagital, Frontal e Transversa', sub: 'Palpação' },

  // Lote 14 (131-140)
  131: { t: 'Marcos do Desenvolvimento Motor Típico (0 a 12 Meses)', sub: 'Marcos Motores' },
  132: { t: 'Reflexos Primitivos do Neonato: Integração e Sinais de Alarme', sub: 'Marcos Motores' },
  133: { t: 'Escala de Apgar e Avaliação Imediata do Recém-Nascido', sub: 'Neonato' },
  134: { t: 'Bronquiolite Viral Aguda (BVA): Fisiopatologia e Condutas', sub: 'Neonato' },
  135: { t: 'Fisioterapia Respiratória Pediátrica: Peculiaridades e Manobras', sub: 'Neonato' },
  136: { t: 'Torcicolo Congênito e Plagiocefalia Posicional', sub: 'Neonato' },
  137: { t: 'Anatomia Funcional do Assoalho Pélvico Feminino (MAP)', sub: 'Urogineco' },
  138: { t: 'Incontinência Urinária de Esforço vs Urgência: Avaliação e Biofeedback', sub: 'Urogineco' },
  139: { t: 'Diástase dos Retos Abdominais: Avaliação e Reabilitação', sub: 'Urogineco' },
  140: { t: 'Fisioterapia Obstétrica: Pré-Parto, Parto Humanizado e Puerpério', sub: 'Puerpério' },

  // Lote 15 (141-150)
  141: { t: 'Método SOAP no Prontuário Hospitalar: Passo a Passo', sub: 'SOAP' },
  142: { t: 'Anamnese e Exame Físico Fisioterapêutico no Estágio', sub: 'Condutas Rápidas' },
  143: { t: 'Escalas de Dor e Incapacidade: EVA, Roland-Morris e Oswestry', sub: 'SOAP' },
  144: { t: 'Biossegurança Hospitalar, Higienização das Mãos e Uso de EPIs', sub: 'Condutas Rápidas' },
  145: { t: 'Roteiro de Apresentação de Casos Clínicos no Round Multidisciplinar', sub: 'Condutas Rápidas' },
  146: { t: 'Fisioterapia Baseada em Evidências: Pirâmide e Níveis de Evidência', sub: 'Condutas Rápidas' },
  147: { t: 'Comunicação Terapêutica, Ética e Sigilo em Prontuário', sub: 'Condutas Rápidas' },
  148: { t: 'Gerenciamento do Tempo no Plantão e Atendimento Ambulatorial', sub: 'Condutas Rápidas' },
  149: { t: 'Red Flags na Fisioterapia: Sinais de Alarme para Encaminhamento Urgente', sub: 'Red Flags' },
  150: { t: 'Yellow Flags: Fatores Psicossociais e Risco de Cronificação da Dor', sub: 'Red Flags' }
};

// Generate list of 150 items
const allMaps = [];

for (let i = 1; i <= 150; i++) {
  const fileInfo = diskRegistry[i];
  if (!fileInfo) {
    console.error(`Warning: map ${i} not found on disk!`);
    continue;
  }

  // Determine lot number (1 to 15)
  const lotNum = Math.ceil(i / 10);
  const lotConf = LOT_CONFIG[lotNum];
  const itemInfo = TITLES[i] || { t: `Mapa Mental Clínico ${i}`, sub: lotConf.sub };

  const id = `map-${String(i).padStart(2, '0')}`;
  const title = itemInfo.t;
  const category = lotConf.cat;
  const subCategory = itemInfo.sub || lotConf.sub;
  const fileUrl = fileInfo.path;

  // Extract clean keywords from title
  const cleanTags = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !['para', 'com', 'dos', 'das', 'uma', 'seu', 'sua', 'pelo', 'pela', 'fase', 'guia'].includes(w))
    .slice(0, 6);

  allMaps.push({
    id,
    title,
    category,
    subCategory,
    tags: cleanTags,
    readTime: `${Math.floor(Math.random() * 2) + 3} min`,
    fileType: 'image',
    fileUrl,
    thumbnailUrl: fileUrl,
    summary: `Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para ${title}.`,
    keyPoints: [
      `Fisiopatologia, anatomia aplicada e raciocínio clínico direto para ${title}.`,
      `Semiologia, testes especiais específicos e critérios de gravidade no plantão.`,
      `Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança.`
    ],
    clinicalPearls: [
      `Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de ${title}.`
    ],
    createdAt: '2026-03-01'
  });
}

console.log(`Successfully mapped ${allMaps.length} mind maps!`);

// Write to src/data/mapsData.ts
const fileContent = `import { MindMap, CategoryType } from '../types';

export const CATEGORIES_CONFIG: Record<CategoryType, { color: string; bg: string; border: string; subCategories: string[] }> = {
  'Ortopedia & Traumatologia': {
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    subCategories: ['Membro Superior', 'Membro Inferior', 'Coluna & Pelve', 'Recursos Terapêuticos']
  },
  'Fisioterapia Neurofuncional': {
    color: 'text-indigo-700',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    subCategories: ['SNC', 'SNP', 'Equilíbrio & Marcha', 'Escalas Neurológicas']
  },
  'Fisioterapia Respiratória & UTI': {
    color: 'text-teal-700',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    subCategories: ['Semiologia Pulmonar', 'Patologias Respiratórias', 'Recursos & Manobras', 'Ventilação Mecânica']
  },
  'Cardiorrespiratória & Fisiologia': {
    color: 'text-rose-700',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    subCategories: ['Reabilitação Cardíaca', 'Testes Funcionais', 'Prescrição de Exercício']
  },
  'Anatomia & Cinesiologia': {
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    subCategories: ['Palpação', 'Biomecânica', 'Goniometria', 'Dermátomos & Miótomos']
  },
  'Pediatria & Saúde da Mulher': {
    color: 'text-purple-700',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    subCategories: ['Marcos Motores', 'Neonato', 'Urogineco', 'Puerpério']
  },
  'Prática Clínica & Round': {
    color: 'text-sky-700',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    subCategories: ['SOAP', 'Red Flags', 'Condutas Rápidas']
  }
};

// Fallback generator for custom upload preview
export function createMapSvg(title: string, category: string, primaryColor: string, accentColor: string, points: string[]): string {
  const svg = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="100%" height="100%" style="background:#f8fafc; font-family: system-ui, sans-serif;">
    <defs>
      <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="\${primaryColor}"/>
        <stop offset="100%" stop-color="\${accentColor}"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="800" fill="#f8fafc"/>
    <rect x="50" y="40" width="1100" height="110" rx="20" fill="url(#headerGrad)"/>
    <text x="80" y="75" fill="#e2e8f0" font-size="14" font-weight="600" letter-spacing="2">FISIOPOCKET • MAPA MENTAL CLÍNICO</text>
    <text x="80" y="115" fill="#ffffff" font-size="28" font-weight="800">\${title}</text>
    <rect x="940" y="60" width="180" height="34" rx="17" fill="#ffffff" fill-opacity="0.2"/>
    <text x="1030" y="82" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">\${category}</text>
    <circle cx="600" cy="450" r="115" fill="#ffffff" stroke="\${primaryColor}" stroke-width="8"/>
    <text x="600" y="445" fill="\${primaryColor}" font-size="14" font-weight="700" text-anchor="middle">CONCEITO CHAVE</text>
    <text x="600" y="475" fill="#0f172a" font-size="18" font-weight="800" text-anchor="middle">\${title.length > 25 ? title.slice(0, 25) + '...' : title}</text>
    <rect x="80" y="200" width="310" height="150" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <text x="105" y="235" fill="\${primaryColor}" font-size="15" font-weight="800">1. DEFINIÇÃO &amp; FISIOPATOLOGIA</text>
    <text x="105" y="270" fill="#334155" font-size="13">\${points[0] || 'Avaliação clínica minuciosa.'}</text>
    <rect x="810" y="200" width="310" height="150" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <text x="835" y="235" fill="\${accentColor}" font-size="15" font-weight="800">2. TESTES &amp; SEMIOLOGIA</text>
    <text x="835" y="270" fill="#334155" font-size="13">\${points[1] || 'Manobras provocativas.'}</text>
    <rect x="80" y="580" width="310" height="150" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <text x="105" y="615" fill="\${primaryColor}" font-size="15" font-weight="800">3. CONDUTAS FISIOTERAPÊUTICAS</text>
    <text x="105" y="650" fill="#334155" font-size="13">\${points[2] || 'Protocolos de tratamento.'}</text>
    <rect x="810" y="580" width="310" height="150" rx="16" fill="#ffffff" stroke="#fecaca" stroke-width="2"/>
    <text x="835" y="615" fill="#ef4444" font-size="15" font-weight="800">4. RED FLAGS &amp; PULOS DO GATO</text>
    <text x="835" y="650" fill="#334155" font-size="13">\${points[3] || 'Atenção aos sinais de alarme.'}</text>
  </svg>\`;
  return \`data:image/svg+xml;utf8,\${encodeURIComponent(svg)}\`;
}

export const INITIAL_MIND_MAPS: MindMap[] = ${JSON.stringify(allMaps, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'mapsData.ts'), fileContent, 'utf8');
console.log('Successfully wrote all 150 maps to src/data/mapsData.ts!');
