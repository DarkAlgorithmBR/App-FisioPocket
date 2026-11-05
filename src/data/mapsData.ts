import { MindMap, CategoryType } from '../types';

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
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="100%" height="100%" style="background:#f8fafc; font-family: system-ui, sans-serif;">
    <defs>
      <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${primaryColor}"/>
        <stop offset="100%" stop-color="${accentColor}"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="800" fill="#f8fafc"/>
    <rect x="50" y="40" width="1100" height="110" rx="20" fill="url(#headerGrad)"/>
    <text x="80" y="75" fill="#e2e8f0" font-size="14" font-weight="600" letter-spacing="2">FISIOPOCKET • MAPA MENTAL CLÍNICO</text>
    <text x="80" y="115" fill="#ffffff" font-size="28" font-weight="800">${title}</text>
    <rect x="940" y="60" width="180" height="34" rx="17" fill="#ffffff" fill-opacity="0.2"/>
    <text x="1030" y="82" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">${category}</text>
    <circle cx="600" cy="450" r="115" fill="#ffffff" stroke="${primaryColor}" stroke-width="8"/>
    <text x="600" y="445" fill="${primaryColor}" font-size="14" font-weight="700" text-anchor="middle">CONCEITO CHAVE</text>
    <text x="600" y="475" fill="#0f172a" font-size="18" font-weight="800" text-anchor="middle">${title.length > 25 ? title.slice(0, 25) + '...' : title}</text>
    <rect x="80" y="200" width="310" height="150" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <text x="105" y="235" fill="${primaryColor}" font-size="15" font-weight="800">1. DEFINIÇÃO &amp; FISIOPATOLOGIA</text>
    <text x="105" y="270" fill="#334155" font-size="13">${points[0] || 'Avaliação clínica minuciosa.'}</text>
    <rect x="810" y="200" width="310" height="150" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <text x="835" y="235" fill="${accentColor}" font-size="15" font-weight="800">2. TESTES &amp; SEMIOLOGIA</text>
    <text x="835" y="270" fill="#334155" font-size="13">${points[1] || 'Manobras provocativas.'}</text>
    <rect x="80" y="580" width="310" height="150" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <text x="105" y="615" fill="${primaryColor}" font-size="15" font-weight="800">3. CONDUTAS FISIOTERAPÊUTICAS</text>
    <text x="105" y="650" fill="#334155" font-size="13">${points[2] || 'Protocolos de tratamento.'}</text>
    <rect x="810" y="580" width="310" height="150" rx="16" fill="#ffffff" stroke="#fecaca" stroke-width="2"/>
    <text x="835" y="615" fill="#ef4444" font-size="15" font-weight="800">4. RED FLAGS &amp; PULOS DO GATO</text>
    <text x="835" y="650" fill="#334155" font-size="13">${points[3] || 'Atenção aos sinais de alarme.'}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const INITIAL_MIND_MAPS: MindMap[] = [
  {
    "id": "map-01",
    "title": "Síndrome do Impacto Subacromial",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Superior",
    "tags": [
      "sindrome",
      "impacto",
      "subacromial"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 01 - Ortopedia - Ombro e Cotovelo/mapa-01-impacto-subacromial.png",
    "thumbnailUrl": "./mapas/Lote 01 - Ortopedia - Ombro e Cotovelo/mapa-01-impacto-subacromial.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Síndrome do Impacto Subacromial.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Síndrome do Impacto Subacromial.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Síndrome do Impacto Subacromial."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-02",
    "title": "Lesões do Manguito Rotador: Avaliação e Reabilitação",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Superior",
    "tags": [
      "lesoes",
      "manguito",
      "rotador",
      "avaliacao",
      "reabilitacao"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 01 - Ortopedia - Ombro e Cotovelo/mapa-02-lesao-manguito-rotador.png",
    "thumbnailUrl": "./mapas/Lote 01 - Ortopedia - Ombro e Cotovelo/mapa-02-lesao-manguito-rotador.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Lesões do Manguito Rotador: Avaliação e Reabilitação.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Lesões do Manguito Rotador: Avaliação e Reabilitação.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Lesões do Manguito Rotador: Avaliação e Reabilitação."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-03",
    "title": "Instabilidade Glenoumeral e Luxação do Ombro",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Superior",
    "tags": [
      "instabilidade",
      "glenoumeral",
      "luxacao",
      "ombro"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 01 - Ortopedia - Ombro e Cotovelo/mapa-03-instabilidade-glenoumeral-luxacao.png",
    "thumbnailUrl": "./mapas/Lote 01 - Ortopedia - Ombro e Cotovelo/mapa-03-instabilidade-glenoumeral-luxacao.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Instabilidade Glenoumeral e Luxação do Ombro.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Instabilidade Glenoumeral e Luxação do Ombro.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Instabilidade Glenoumeral e Luxação do Ombro."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-04",
    "title": "Capsulite Adesiva (Ombro Congelado)",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Superior",
    "tags": [
      "capsulite",
      "adesiva",
      "ombro",
      "congelado"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 01 - Ortopedia - Ombro e Cotovelo/mapa-04-capsulite-adesiva.png",
    "thumbnailUrl": "./mapas/Lote 01 - Ortopedia - Ombro e Cotovelo/mapa-04-capsulite-adesiva.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Capsulite Adesiva (Ombro Congelado).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Capsulite Adesiva (Ombro Congelado).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Capsulite Adesiva (Ombro Congelado)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-05",
    "title": "Epicondilite Lateral (Cotovelo de Tenista)",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Superior",
    "tags": [
      "epicondilite",
      "lateral",
      "cotovelo",
      "tenista"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 01 - Ortopedia - Ombro e Cotovelo/mapa-05-epicondilite-lateral.png",
    "thumbnailUrl": "./mapas/Lote 01 - Ortopedia - Ombro e Cotovelo/mapa-05-epicondilite-lateral.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Epicondilite Lateral (Cotovelo de Tenista).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Epicondilite Lateral (Cotovelo de Tenista).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Epicondilite Lateral (Cotovelo de Tenista)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-06",
    "title": "Epicondilite Medial (Cotovelo de Golfista)",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Superior",
    "tags": [
      "epicondilite",
      "medial",
      "cotovelo",
      "golfista"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 01 - Ortopedia - Ombro e Cotovelo/mapa-06-epicondilite-medial.png",
    "thumbnailUrl": "./mapas/Lote 01 - Ortopedia - Ombro e Cotovelo/mapa-06-epicondilite-medial.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Epicondilite Medial (Cotovelo de Golfista).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Epicondilite Medial (Cotovelo de Golfista).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Epicondilite Medial (Cotovelo de Golfista)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-07",
    "title": "Bursite Subacromial e Olecraniana",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Superior",
    "tags": [
      "bursite",
      "subacromial",
      "olecraniana"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 01 - Ortopedia - Ombro e Cotovelo/mapa-07-bursite-subacromial-olecraniana.png",
    "thumbnailUrl": "./mapas/Lote 01 - Ortopedia - Ombro e Cotovelo/mapa-07-bursite-subacromial-olecraniana.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Bursite Subacromial e Olecraniana.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Bursite Subacromial e Olecraniana.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Bursite Subacromial e Olecraniana."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-08",
    "title": "Testes Especiais de Ombro: Guia de Bolso",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Superior",
    "tags": [
      "testes",
      "especiais",
      "ombro",
      "bolso"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 01 - Ortopedia - Ombro e Cotovelo/mapa-08-testes-especiais-ombro.png",
    "thumbnailUrl": "./mapas/Lote 01 - Ortopedia - Ombro e Cotovelo/mapa-08-testes-especiais-ombro.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Testes Especiais de Ombro: Guia de Bolso.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Testes Especiais de Ombro: Guia de Bolso.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Testes Especiais de Ombro: Guia de Bolso."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-09",
    "title": "Testes Especiais de Cotovelo: Guia de Bolso",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Superior",
    "tags": [
      "testes",
      "especiais",
      "cotovelo",
      "bolso"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 01 - Ortopedia - Ombro e Cotovelo/mapa-09-testes-especiais-cotovelo.png",
    "thumbnailUrl": "./mapas/Lote 01 - Ortopedia - Ombro e Cotovelo/mapa-09-testes-especiais-cotovelo.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Testes Especiais de Cotovelo: Guia de Bolso.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Testes Especiais de Cotovelo: Guia de Bolso.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Testes Especiais de Cotovelo: Guia de Bolso."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-10",
    "title": "Pós-Operatório do Manguito Rotador: Fases",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Superior",
    "tags": [
      "posoperatorio",
      "manguito",
      "rotador",
      "fases"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 01 - Ortopedia - Ombro e Cotovelo/mapa-10-pos-operatorio-manguito.png",
    "thumbnailUrl": "./mapas/Lote 01 - Ortopedia - Ombro e Cotovelo/mapa-10-pos-operatorio-manguito.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Pós-Operatório do Manguito Rotador: Fases.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Pós-Operatório do Manguito Rotador: Fases.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Pós-Operatório do Manguito Rotador: Fases."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-11",
    "title": "Síndrome do Túnel do Carpo (STC)",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Superior",
    "tags": [
      "sindrome",
      "tunel",
      "carpo",
      "stc"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 02 - Ortopedia - Punho Mao e Coluna Cervical e Toracica/mapa-11-sindrome-tunel-carpo.png",
    "thumbnailUrl": "./mapas/Lote 02 - Ortopedia - Punho Mao e Coluna Cervical e Toracica/mapa-11-sindrome-tunel-carpo.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Síndrome do Túnel do Carpo (STC).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Síndrome do Túnel do Carpo (STC).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Síndrome do Túnel do Carpo (STC)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-12",
    "title": "Tenossinovite Estenosante de De Quervain",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Superior",
    "tags": [
      "tenossinovite",
      "estenosante",
      "quervain"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 02 - Ortopedia - Punho Mao e Coluna Cervical e Toracica/mapa-12-tenossinovite-de-quervain.png",
    "thumbnailUrl": "./mapas/Lote 02 - Ortopedia - Punho Mao e Coluna Cervical e Toracica/mapa-12-tenossinovite-de-quervain.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Tenossinovite Estenosante de De Quervain.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Tenossinovite Estenosante de De Quervain.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Tenossinovite Estenosante de De Quervain."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-13",
    "title": "Fratura de Colles e Rádio Distal: Reabilitação",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Superior",
    "tags": [
      "fratura",
      "colles",
      "radio",
      "distal",
      "reabilitacao"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 02 - Ortopedia - Punho Mao e Coluna Cervical e Toracica/mapa-13-fratura-colles-radio-distal.png",
    "thumbnailUrl": "./mapas/Lote 02 - Ortopedia - Punho Mao e Coluna Cervical e Toracica/mapa-13-fratura-colles-radio-distal.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Fratura de Colles e Rádio Distal: Reabilitação.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Fratura de Colles e Rádio Distal: Reabilitação.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Fratura de Colles e Rádio Distal: Reabilitação."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-14",
    "title": "Cervicalgia Mecânica e Síndrome Postural",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Coluna & Pelve",
    "tags": [
      "cervicalgia",
      "mecanica",
      "sindrome",
      "postural"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 02 - Ortopedia - Punho Mao e Coluna Cervical e Toracica/mapa-14-cervicalgia-mecanica-postural.png",
    "thumbnailUrl": "./mapas/Lote 02 - Ortopedia - Punho Mao e Coluna Cervical e Toracica/mapa-14-cervicalgia-mecanica-postural.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Cervicalgia Mecânica e Síndrome Postural.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Cervicalgia Mecânica e Síndrome Postural.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Cervicalgia Mecânica e Síndrome Postural."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-15",
    "title": "Hérnia de Disco Cervical e Radiculopatia",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Coluna & Pelve",
    "tags": [
      "hernia",
      "disco",
      "cervical",
      "radiculopatia"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 02 - Ortopedia - Punho Mao e Coluna Cervical e Toracica/mapa-15-hernia-disco-cervical-radiculopatia.png",
    "thumbnailUrl": "./mapas/Lote 02 - Ortopedia - Punho Mao e Coluna Cervical e Toracica/mapa-15-hernia-disco-cervical-radiculopatia.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Hérnia de Disco Cervical e Radiculopatia.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Hérnia de Disco Cervical e Radiculopatia.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Hérnia de Disco Cervical e Radiculopatia."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-16",
    "title": "Síndrome do Desfiladeiro Torácico (SDT)",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Coluna & Pelve",
    "tags": [
      "sindrome",
      "desfiladeiro",
      "toracico",
      "sdt"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 02 - Ortopedia - Punho Mao e Coluna Cervical e Toracica/mapa-16-desfiladeiro-toracico.png",
    "thumbnailUrl": "./mapas/Lote 02 - Ortopedia - Punho Mao e Coluna Cervical e Toracica/mapa-16-desfiladeiro-toracico.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Síndrome do Desfiladeiro Torácico (SDT).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Síndrome do Desfiladeiro Torácico (SDT).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Síndrome do Desfiladeiro Torácico (SDT)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-17",
    "title": "Escoliose Idiopática do Adolescente (EIA)",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Coluna & Pelve",
    "tags": [
      "escoliose",
      "idiopatica",
      "adolescente",
      "eia"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 02 - Ortopedia - Punho Mao e Coluna Cervical e Toracica/mapa-17-escoliose-idiopatica.png",
    "thumbnailUrl": "./mapas/Lote 02 - Ortopedia - Punho Mao e Coluna Cervical e Toracica/mapa-17-escoliose-idiopatica.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Escoliose Idiopática do Adolescente (EIA).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Escoliose Idiopática do Adolescente (EIA).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Escoliose Idiopática do Adolescente (EIA)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-18",
    "title": "Hipercifose Torácica e Dor Miofascial",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Coluna & Pelve",
    "tags": [
      "hipercifose",
      "toracica",
      "dor",
      "miofascial"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 02 - Ortopedia - Punho Mao e Coluna Cervical e Toracica/mapa-18-hipercifose-dor-miofascial.png",
    "thumbnailUrl": "./mapas/Lote 02 - Ortopedia - Punho Mao e Coluna Cervical e Toracica/mapa-18-hipercifose-dor-miofascial.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Hipercifose Torácica e Dor Miofascial.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Hipercifose Torácica e Dor Miofascial.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Hipercifose Torácica e Dor Miofascial."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-19",
    "title": "Testes Especiais de Punho e Mão",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Superior",
    "tags": [
      "testes",
      "especiais",
      "punho",
      "mao"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 02 - Ortopedia - Punho Mao e Coluna Cervical e Toracica/mapa-19-testes-punho-mao.png",
    "thumbnailUrl": "./mapas/Lote 02 - Ortopedia - Punho Mao e Coluna Cervical e Toracica/mapa-19-testes-punho-mao.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Testes Especiais de Punho e Mão.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Testes Especiais de Punho e Mão.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Testes Especiais de Punho e Mão."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-20",
    "title": "Testes Especiais da Coluna Cervical",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Coluna & Pelve",
    "tags": [
      "testes",
      "especiais",
      "coluna",
      "cervical"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 02 - Ortopedia - Punho Mao e Coluna Cervical e Toracica/mapa-20-testes-especiais-cervicais.png",
    "thumbnailUrl": "./mapas/Lote 02 - Ortopedia - Punho Mao e Coluna Cervical e Toracica/mapa-20-testes-especiais-cervicais.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Testes Especiais da Coluna Cervical.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Testes Especiais da Coluna Cervical.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Testes Especiais da Coluna Cervical."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-21",
    "title": "Lombalgia Mecânica e Espondilolistese",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Coluna & Pelve",
    "tags": [
      "lombalgia",
      "mecanica",
      "espondilolistese"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 03 - Ortopedia - Coluna Lombar Pelve e Quadril/mapa-21-lombalgia-espondilolistese.png",
    "thumbnailUrl": "./mapas/Lote 03 - Ortopedia - Coluna Lombar Pelve e Quadril/mapa-21-lombalgia-espondilolistese.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Lombalgia Mecânica e Espondilolistese.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Lombalgia Mecânica e Espondilolistese.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Lombalgia Mecânica e Espondilolistese."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-22",
    "title": "Hérnia de Disco Lombar e Lombociatalgia",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Coluna & Pelve",
    "tags": [
      "hernia",
      "disco",
      "lombar",
      "lombociatalgia"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 03 - Ortopedia - Coluna Lombar Pelve e Quadril/mapa-22-hernia-disco-lombar-lombociatalgia.png",
    "thumbnailUrl": "./mapas/Lote 03 - Ortopedia - Coluna Lombar Pelve e Quadril/mapa-22-hernia-disco-lombar-lombociatalgia.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Hérnia de Disco Lombar e Lombociatalgia.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Hérnia de Disco Lombar e Lombociatalgia.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Hérnia de Disco Lombar e Lombociatalgia."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-23",
    "title": "Disfunção da Articulação Sacroilíaca (ASI)",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Coluna & Pelve",
    "tags": [
      "disfuncao",
      "articulacao",
      "sacroiliaca",
      "asi"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 03 - Ortopedia - Coluna Lombar Pelve e Quadril/mapa-23-disfuncao-sacroiliaca.png",
    "thumbnailUrl": "./mapas/Lote 03 - Ortopedia - Coluna Lombar Pelve e Quadril/mapa-23-disfuncao-sacroiliaca.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Disfunção da Articulação Sacroilíaca (ASI).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Disfunção da Articulação Sacroilíaca (ASI).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Disfunção da Articulação Sacroilíaca (ASI)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-24",
    "title": "Impacto Femoroacetabular (IFA)",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Coluna & Pelve",
    "tags": [
      "impacto",
      "femoroacetabular",
      "ifa"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 03 - Ortopedia - Coluna Lombar Pelve e Quadril/mapa-24-impacto-femoroacetabular.png",
    "thumbnailUrl": "./mapas/Lote 03 - Ortopedia - Coluna Lombar Pelve e Quadril/mapa-24-impacto-femoroacetabular.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Impacto Femoroacetabular (IFA).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Impacto Femoroacetabular (IFA).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Impacto Femoroacetabular (IFA)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-25",
    "title": "Dor Trocantérica Maior (Bursite Trocanteriana)",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Coluna & Pelve",
    "tags": [
      "dor",
      "trocanterica",
      "maior",
      "bursite",
      "trocanteriana"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 03 - Ortopedia - Coluna Lombar Pelve e Quadril/mapa-25-dor-trocanterica-maior.png",
    "thumbnailUrl": "./mapas/Lote 03 - Ortopedia - Coluna Lombar Pelve e Quadril/mapa-25-dor-trocanterica-maior.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Dor Trocantérica Maior (Bursite Trocanteriana).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Dor Trocantérica Maior (Bursite Trocanteriana).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Dor Trocantérica Maior (Bursite Trocanteriana)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-26",
    "title": "Coxartrose (Osteoartrose de Quadril)",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Coluna & Pelve",
    "tags": [
      "coxartrose",
      "osteoartrose",
      "quadril"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 03 - Ortopedia - Coluna Lombar Pelve e Quadril/mapa-26-artrose-quadril-coxartrose.png",
    "thumbnailUrl": "./mapas/Lote 03 - Ortopedia - Coluna Lombar Pelve e Quadril/mapa-26-artrose-quadril-coxartrose.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Coxartrose (Osteoartrose de Quadril).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Coxartrose (Osteoartrose de Quadril).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Coxartrose (Osteoartrose de Quadril)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-27",
    "title": "Síndrome do Músculo Piriforme",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Coluna & Pelve",
    "tags": [
      "sindrome",
      "musculo",
      "piriforme"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 03 - Ortopedia - Coluna Lombar Pelve e Quadril/mapa-27-sindrome-piriforme.png",
    "thumbnailUrl": "./mapas/Lote 03 - Ortopedia - Coluna Lombar Pelve e Quadril/mapa-27-sindrome-piriforme.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Síndrome do Músculo Piriforme.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Síndrome do Músculo Piriforme.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Síndrome do Músculo Piriforme."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-28",
    "title": "Testes Especiais Lombossacros: Guia de Bolso",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Coluna & Pelve",
    "tags": [
      "testes",
      "especiais",
      "lombossacros",
      "bolso"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 03 - Ortopedia - Coluna Lombar Pelve e Quadril/mapa-28-testes-lombossacros.png",
    "thumbnailUrl": "./mapas/Lote 03 - Ortopedia - Coluna Lombar Pelve e Quadril/mapa-28-testes-lombossacros.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Testes Especiais Lombossacros: Guia de Bolso.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Testes Especiais Lombossacros: Guia de Bolso.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Testes Especiais Lombossacros: Guia de Bolso."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-29",
    "title": "Testes Especiais de Quadril: Guia de Bolso",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Coluna & Pelve",
    "tags": [
      "testes",
      "especiais",
      "quadril",
      "bolso"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 03 - Ortopedia - Coluna Lombar Pelve e Quadril/mapa-29-testes-quadril.png",
    "thumbnailUrl": "./mapas/Lote 03 - Ortopedia - Coluna Lombar Pelve e Quadril/mapa-29-testes-quadril.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Testes Especiais de Quadril: Guia de Bolso.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Testes Especiais de Quadril: Guia de Bolso.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Testes Especiais de Quadril: Guia de Bolso."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-30",
    "title": "Estabilização Segmentar e Fortalecimento do Core",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Coluna & Pelve",
    "tags": [
      "estabilizacao",
      "segmentar",
      "fortalecimento",
      "core"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 03 - Ortopedia - Coluna Lombar Pelve e Quadril/mapa-30-estabilizacao-segmentar-core.png",
    "thumbnailUrl": "./mapas/Lote 03 - Ortopedia - Coluna Lombar Pelve e Quadril/mapa-30-estabilizacao-segmentar-core.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Estabilização Segmentar e Fortalecimento do Core.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Estabilização Segmentar e Fortalecimento do Core.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Estabilização Segmentar e Fortalecimento do Core."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-31",
    "title": "Lesão do Ligamento Cruzado Anterior (LCA)",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Inferior",
    "tags": [
      "lesao",
      "ligamento",
      "cruzado",
      "anterior",
      "lca"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 04 - Ortopedia - Joelho/mapa-31-lesao-lca.png",
    "thumbnailUrl": "./mapas/Lote 04 - Ortopedia - Joelho/mapa-31-lesao-lca.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Lesão do Ligamento Cruzado Anterior (LCA).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Lesão do Ligamento Cruzado Anterior (LCA).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Lesão do Ligamento Cruzado Anterior (LCA)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-32",
    "title": "Lesões Meniscais do Joelho (Medial e Lateral)",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Inferior",
    "tags": [
      "lesoes",
      "meniscais",
      "joelho",
      "medial",
      "lateral"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 04 - Ortopedia - Joelho/mapa-32-lesoes-meniscais.png",
    "thumbnailUrl": "./mapas/Lote 04 - Ortopedia - Joelho/mapa-32-lesoes-meniscais.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Lesões Meniscais do Joelho (Medial e Lateral).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Lesões Meniscais do Joelho (Medial e Lateral).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Lesões Meniscais do Joelho (Medial e Lateral)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-33",
    "title": "Síndrome da Dor Femoropatelar (Condromalácia)",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Inferior",
    "tags": [
      "sindrome",
      "dor",
      "femoropatelar",
      "condromalacia"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 04 - Ortopedia - Joelho/mapa-33-dor-femoropatelar.png",
    "thumbnailUrl": "./mapas/Lote 04 - Ortopedia - Joelho/mapa-33-dor-femoropatelar.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Síndrome da Dor Femoropatelar (Condromalácia).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Síndrome da Dor Femoropatelar (Condromalácia).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Síndrome da Dor Femoropatelar (Condromalácia)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-34",
    "title": "Lesões dos Ligamentos Colaterais (LCM e LCL)",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Inferior",
    "tags": [
      "lesoes",
      "ligamentos",
      "colaterais",
      "lcm",
      "lcl"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 04 - Ortopedia - Joelho/mapa-34-lesao-ligamentos-colaterais.png",
    "thumbnailUrl": "./mapas/Lote 04 - Ortopedia - Joelho/mapa-34-lesao-ligamentos-colaterais.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Lesões dos Ligamentos Colaterais (LCM e LCL).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Lesões dos Ligamentos Colaterais (LCM e LCL).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Lesões dos Ligamentos Colaterais (LCM e LCL)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-35",
    "title": "Tendinopatia Patelar (Joelho de Saltador)",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Inferior",
    "tags": [
      "tendinopatia",
      "patelar",
      "joelho",
      "saltador"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 04 - Ortopedia - Joelho/mapa-35-tendinopatia-patelar.png",
    "thumbnailUrl": "./mapas/Lote 04 - Ortopedia - Joelho/mapa-35-tendinopatia-patelar.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Tendinopatia Patelar (Joelho de Saltador).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Tendinopatia Patelar (Joelho de Saltador).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Tendinopatia Patelar (Joelho de Saltador)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-36",
    "title": "Gonartrose (Osteoartrose de Joelho)",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Inferior",
    "tags": [
      "gonartrose",
      "osteoartrose",
      "joelho"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 04 - Ortopedia - Joelho/mapa-36-osteoartrose-joelho.png",
    "thumbnailUrl": "./mapas/Lote 04 - Ortopedia - Joelho/mapa-36-osteoartrose-joelho.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Gonartrose (Osteoartrose de Joelho).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Gonartrose (Osteoartrose de Joelho).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Gonartrose (Osteoartrose de Joelho)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-37",
    "title": "Lesão do Ligamento Cruzado Posterior (LCP)",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Inferior",
    "tags": [
      "lesao",
      "ligamento",
      "cruzado",
      "posterior",
      "lcp"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 04 - Ortopedia - Joelho/mapa-37-lesao-lcp.png",
    "thumbnailUrl": "./mapas/Lote 04 - Ortopedia - Joelho/mapa-37-lesao-lcp.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Lesão do Ligamento Cruzado Posterior (LCP).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Lesão do Ligamento Cruzado Posterior (LCP).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Lesão do Ligamento Cruzado Posterior (LCP)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-38",
    "title": "Testes de Estabilidade do Joelho: Guia de Bolso",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Inferior",
    "tags": [
      "testes",
      "estabilidade",
      "joelho",
      "bolso"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 04 - Ortopedia - Joelho/mapa-38-testes-estabilidade-joelho.png",
    "thumbnailUrl": "./mapas/Lote 04 - Ortopedia - Joelho/mapa-38-testes-estabilidade-joelho.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Testes de Estabilidade do Joelho: Guia de Bolso.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Testes de Estabilidade do Joelho: Guia de Bolso.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Testes de Estabilidade do Joelho: Guia de Bolso."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-39",
    "title": "Testes Meniscais Especiais: Guia de Bolso",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Inferior",
    "tags": [
      "testes",
      "meniscais",
      "especiais",
      "bolso"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 04 - Ortopedia - Joelho/mapa-39-testes-meniscais.png",
    "thumbnailUrl": "./mapas/Lote 04 - Ortopedia - Joelho/mapa-39-testes-meniscais.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Testes Meniscais Especiais: Guia de Bolso.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Testes Meniscais Especiais: Guia de Bolso.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Testes Meniscais Especiais: Guia de Bolso."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-40",
    "title": "Reabilitação Acelerada de LCA: Critérios de Retorno",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Inferior",
    "tags": [
      "reabilitacao",
      "acelerada",
      "lca",
      "criterios",
      "retorno"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 04 - Ortopedia - Joelho/mapa-40-reabilitacao-acelerada-lca.png",
    "thumbnailUrl": "./mapas/Lote 04 - Ortopedia - Joelho/mapa-40-reabilitacao-acelerada-lca.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Reabilitação Acelerada de LCA: Critérios de Retorno.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Reabilitação Acelerada de LCA: Critérios de Retorno.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Reabilitação Acelerada de LCA: Critérios de Retorno."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-41",
    "title": "Entorse de Tornozelo por Inversão e Regras de Ottawa",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Inferior",
    "tags": [
      "entorse",
      "tornozelo",
      "por",
      "inversao",
      "regras",
      "ottawa"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 05 - Ortopedia - Tornozelo Pe e Recursos Terapeuticos/mapa-41-entorse-tornozelo-inversao.png",
    "thumbnailUrl": "./mapas/Lote 05 - Ortopedia - Tornozelo Pe e Recursos Terapeuticos/mapa-41-entorse-tornozelo-inversao.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Entorse de Tornozelo por Inversão e Regras de Ottawa.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Entorse de Tornozelo por Inversão e Regras de Ottawa.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Entorse de Tornozelo por Inversão e Regras de Ottawa."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-42",
    "title": "Fascite Plantar e Esporão de Calcâneo",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Inferior",
    "tags": [
      "fascite",
      "plantar",
      "esporao",
      "calcaneo"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 05 - Ortopedia - Tornozelo Pe e Recursos Terapeuticos/mapa-42-fascite-plantar-esporao.png",
    "thumbnailUrl": "./mapas/Lote 05 - Ortopedia - Tornozelo Pe e Recursos Terapeuticos/mapa-42-fascite-plantar-esporao.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Fascite Plantar e Esporão de Calcâneo.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Fascite Plantar e Esporão de Calcâneo.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Fascite Plantar e Esporão de Calcâneo."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-43",
    "title": "Tendinopatia do Calcâneo (Tendão de Aquiles)",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Inferior",
    "tags": [
      "tendinopatia",
      "calcaneo",
      "tendao",
      "aquiles"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 05 - Ortopedia - Tornozelo Pe e Recursos Terapeuticos/mapa-43-tendinopatia-calcaneo.png",
    "thumbnailUrl": "./mapas/Lote 05 - Ortopedia - Tornozelo Pe e Recursos Terapeuticos/mapa-43-tendinopatia-calcaneo.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Tendinopatia do Calcâneo (Tendão de Aquiles).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Tendinopatia do Calcâneo (Tendão de Aquiles).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Tendinopatia do Calcâneo (Tendão de Aquiles)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-44",
    "title": "Metatarsalgia e Neuroma de Morton",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Inferior",
    "tags": [
      "metatarsalgia",
      "neuroma",
      "morton"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 05 - Ortopedia - Tornozelo Pe e Recursos Terapeuticos/mapa-44-metatarsalgia-neuroma-morton.png",
    "thumbnailUrl": "./mapas/Lote 05 - Ortopedia - Tornozelo Pe e Recursos Terapeuticos/mapa-44-metatarsalgia-neuroma-morton.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Metatarsalgia e Neuroma de Morton.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Metatarsalgia e Neuroma de Morton.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Metatarsalgia e Neuroma de Morton."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-45",
    "title": "Instabilidade Crônica de Tornozelo (ICT)",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Inferior",
    "tags": [
      "instabilidade",
      "cronica",
      "tornozelo",
      "ict"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 05 - Ortopedia - Tornozelo Pe e Recursos Terapeuticos/mapa-45-instabilidade-cronica-tornozelo.png",
    "thumbnailUrl": "./mapas/Lote 05 - Ortopedia - Tornozelo Pe e Recursos Terapeuticos/mapa-45-instabilidade-cronica-tornozelo.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Instabilidade Crônica de Tornozelo (ICT).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Instabilidade Crônica de Tornozelo (ICT).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Instabilidade Crônica de Tornozelo (ICT)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-46",
    "title": "Testes Especiais de Tornozelo e Pé: Guia de Bolso",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Membro Inferior",
    "tags": [
      "testes",
      "especiais",
      "tornozelo",
      "bolso"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 05 - Ortopedia - Tornozelo Pe e Recursos Terapeuticos/mapa-46-testes-especiais-tornozelo.png",
    "thumbnailUrl": "./mapas/Lote 05 - Ortopedia - Tornozelo Pe e Recursos Terapeuticos/mapa-46-testes-especiais-tornozelo.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Testes Especiais de Tornozelo e Pé: Guia de Bolso.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Testes Especiais de Tornozelo e Pé: Guia de Bolso.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Testes Especiais de Tornozelo e Pé: Guia de Bolso."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-47",
    "title": "Terapia Manual Ortopédica: Conceitos Maitland e Mulligan",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Recursos Terapêuticos",
    "tags": [
      "terapia",
      "manual",
      "ortopedica",
      "conceitos",
      "maitland",
      "mulligan"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 05 - Ortopedia - Tornozelo Pe e Recursos Terapeuticos/mapa-47-terapia-manual-maitland-mulligan.png",
    "thumbnailUrl": "./mapas/Lote 05 - Ortopedia - Tornozelo Pe e Recursos Terapeuticos/mapa-47-terapia-manual-maitland-mulligan.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Terapia Manual Ortopédica: Conceitos Maitland e Mulligan.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Terapia Manual Ortopédica: Conceitos Maitland e Mulligan.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Terapia Manual Ortopédica: Conceitos Maitland e Mulligan."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-48",
    "title": "Liberação Miofascial e Pontos-Gatilho (Trigger Points)",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Recursos Terapêuticos",
    "tags": [
      "liberacao",
      "miofascial",
      "pontosgatilho",
      "trigger",
      "points"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 05 - Ortopedia - Tornozelo Pe e Recursos Terapeuticos/mapa-48-liberacao-miofascial-trigger-points.png",
    "thumbnailUrl": "./mapas/Lote 05 - Ortopedia - Tornozelo Pe e Recursos Terapeuticos/mapa-48-liberacao-miofascial-trigger-points.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Liberação Miofascial e Pontos-Gatilho (Trigger Points).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Liberação Miofascial e Pontos-Gatilho (Trigger Points).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Liberação Miofascial e Pontos-Gatilho (Trigger Points)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-49",
    "title": "Eletroterapia: Parâmetros de TENS e FES",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Recursos Terapêuticos",
    "tags": [
      "eletroterapia",
      "parametros",
      "tens",
      "fes"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 05 - Ortopedia - Tornozelo Pe e Recursos Terapeuticos/mapa-49-eletrotermofototerapia-tens-fes.png",
    "thumbnailUrl": "./mapas/Lote 05 - Ortopedia - Tornozelo Pe e Recursos Terapeuticos/mapa-49-eletrotermofototerapia-tens-fes.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Eletroterapia: Parâmetros de TENS e FES.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Eletroterapia: Parâmetros de TENS e FES.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Eletroterapia: Parâmetros de TENS e FES."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-50",
    "title": "Ultrassom Terapêutico e Laser de Baixa Potência",
    "category": "Ortopedia & Traumatologia",
    "subCategory": "Recursos Terapêuticos",
    "tags": [
      "ultrassom",
      "terapeutico",
      "laser",
      "baixa",
      "potencia"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 05 - Ortopedia - Tornozelo Pe e Recursos Terapeuticos/mapa-50-ultrassom-terapeutico-laser.png",
    "thumbnailUrl": "./mapas/Lote 05 - Ortopedia - Tornozelo Pe e Recursos Terapeuticos/mapa-50-ultrassom-terapeutico-laser.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Ultrassom Terapêutico e Laser de Baixa Potência.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Ultrassom Terapêutico e Laser de Baixa Potência.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Ultrassom Terapêutico e Laser de Baixa Potência."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-51",
    "title": "AVE Isquêmico vs Hemorrágico: Fisiopatologia e Fase Aguda",
    "category": "Fisioterapia Neurofuncional",
    "subCategory": "SNC",
    "tags": [
      "ave",
      "isquemico",
      "hemorragico",
      "fisiopatologia",
      "aguda"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 06 - Neurofuncional - Sistema Nervoso Central/mapa-51-ave-isquemico-hemorragico.png",
    "thumbnailUrl": "./mapas/Lote 06 - Neurofuncional - Sistema Nervoso Central/mapa-51-ave-isquemico-hemorragico.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para AVE Isquêmico vs Hemorrágico: Fisiopatologia e Fase Aguda.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para AVE Isquêmico vs Hemorrágico: Fisiopatologia e Fase Aguda.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de AVE Isquêmico vs Hemorrágico: Fisiopatologia e Fase Aguda."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-52",
    "title": "Fases de Recuperação Pós-AVE: Da Flacidez à Espasticidade",
    "category": "Fisioterapia Neurofuncional",
    "subCategory": "SNC",
    "tags": [
      "fases",
      "recuperacao",
      "posave",
      "flacidez",
      "espasticidade"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 06 - Neurofuncional - Sistema Nervoso Central/mapa-52-recuperacao-pos-ave-flacidez-espasticidade.png",
    "thumbnailUrl": "./mapas/Lote 06 - Neurofuncional - Sistema Nervoso Central/mapa-52-recuperacao-pos-ave-flacidez-espasticidade.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Fases de Recuperação Pós-AVE: Da Flacidez à Espasticidade.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Fases de Recuperação Pós-AVE: Da Flacidez à Espasticidade.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Fases de Recuperação Pós-AVE: Da Flacidez à Espasticidade."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-53",
    "title": "Doença de Parkinson: Raciocínio Clínico e Condutas",
    "category": "Fisioterapia Neurofuncional",
    "subCategory": "SNC",
    "tags": [
      "doenca",
      "parkinson",
      "raciocinio",
      "clinico",
      "condutas"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 06 - Neurofuncional - Sistema Nervoso Central/mapa-53-doenca-parkinson.png",
    "thumbnailUrl": "./mapas/Lote 06 - Neurofuncional - Sistema Nervoso Central/mapa-53-doenca-parkinson.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Doença de Parkinson: Raciocínio Clínico e Condutas.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Doença de Parkinson: Raciocínio Clínico e Condutas.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Doença de Parkinson: Raciocínio Clínico e Condutas."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-54",
    "title": "Traumatismo Cranioencefálico (TCE) e Escala de Glasgow",
    "category": "Fisioterapia Neurofuncional",
    "subCategory": "SNC",
    "tags": [
      "traumatismo",
      "cranioencefalico",
      "tce",
      "escala",
      "glasgow"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 06 - Neurofuncional - Sistema Nervoso Central/mapa-54-tce-escala-glasgow.png",
    "thumbnailUrl": "./mapas/Lote 06 - Neurofuncional - Sistema Nervoso Central/mapa-54-tce-escala-glasgow.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Traumatismo Cranioencefálico (TCE) e Escala de Glasgow.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Traumatismo Cranioencefálico (TCE) e Escala de Glasgow.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Traumatismo Cranioencefálico (TCE) e Escala de Glasgow."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-55",
    "title": "Traumatismo Raquimedular (TRM) e Escala ASIA",
    "category": "Fisioterapia Neurofuncional",
    "subCategory": "SNC",
    "tags": [
      "traumatismo",
      "raquimedular",
      "trm",
      "escala",
      "asia"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 06 - Neurofuncional - Sistema Nervoso Central/mapa-55-trm-escala-asia.png",
    "thumbnailUrl": "./mapas/Lote 06 - Neurofuncional - Sistema Nervoso Central/mapa-55-trm-escala-asia.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Traumatismo Raquimedular (TRM) e Escala ASIA.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Traumatismo Raquimedular (TRM) e Escala ASIA.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Traumatismo Raquimedular (TRM) e Escala ASIA."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-56",
    "title": "Esclerose Múltipla e Manejo da Fadiga",
    "category": "Fisioterapia Neurofuncional",
    "subCategory": "SNC",
    "tags": [
      "esclerose",
      "multipla",
      "manejo",
      "fadiga"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 06 - Neurofuncional - Sistema Nervoso Central/mapa-56-esclerose-multipla-fadiga.png",
    "thumbnailUrl": "./mapas/Lote 06 - Neurofuncional - Sistema Nervoso Central/mapa-56-esclerose-multipla-fadiga.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Esclerose Múltipla e Manejo da Fadiga.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Esclerose Múltipla e Manejo da Fadiga.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Esclerose Múltipla e Manejo da Fadiga."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-57",
    "title": "Paralisia Cerebral: Classificação GMFCS e Abordagem",
    "category": "Fisioterapia Neurofuncional",
    "subCategory": "SNC",
    "tags": [
      "paralisia",
      "cerebral",
      "classificacao",
      "gmfcs",
      "abordagem"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 06 - Neurofuncional - Sistema Nervoso Central/mapa-57-paralisia-cerebral-gmfcs.png",
    "thumbnailUrl": "./mapas/Lote 06 - Neurofuncional - Sistema Nervoso Central/mapa-57-paralisia-cerebral-gmfcs.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Paralisia Cerebral: Classificação GMFCS e Abordagem.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Paralisia Cerebral: Classificação GMFCS e Abordagem.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Paralisia Cerebral: Classificação GMFCS e Abordagem."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-58",
    "title": "Conceito Bobath / Neuroevolutivo na Prática Clínica",
    "category": "Fisioterapia Neurofuncional",
    "subCategory": "Equilíbrio & Marcha",
    "tags": [
      "conceito",
      "bobath",
      "neuroevolutivo",
      "pratica",
      "clinica"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 06 - Neurofuncional - Sistema Nervoso Central/mapa-58-conceito-bobath.png",
    "thumbnailUrl": "./mapas/Lote 06 - Neurofuncional - Sistema Nervoso Central/mapa-58-conceito-bobath.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Conceito Bobath / Neuroevolutivo na Prática Clínica.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Conceito Bobath / Neuroevolutivo na Prática Clínica.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Conceito Bobath / Neuroevolutivo na Prática Clínica."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-59",
    "title": "Facilitação Neuromuscular Proprioceptiva (FNP / Kabat)",
    "category": "Fisioterapia Neurofuncional",
    "subCategory": "Equilíbrio & Marcha",
    "tags": [
      "facilitacao",
      "neuromuscular",
      "proprioceptiva",
      "fnp",
      "kabat"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 06 - Neurofuncional - Sistema Nervoso Central/mapa-59-fnp-kabat.png",
    "thumbnailUrl": "./mapas/Lote 06 - Neurofuncional - Sistema Nervoso Central/mapa-59-fnp-kabat.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Facilitação Neuromuscular Proprioceptiva (FNP / Kabat).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Facilitação Neuromuscular Proprioceptiva (FNP / Kabat).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Facilitação Neuromuscular Proprioceptiva (FNP / Kabat)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-60",
    "title": "Treino de Marcha com Descarga de Peso e Pistas Sensoriais",
    "category": "Fisioterapia Neurofuncional",
    "subCategory": "Equilíbrio & Marcha",
    "tags": [
      "treino",
      "marcha",
      "descarga",
      "peso",
      "pistas",
      "sensoriais"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 06 - Neurofuncional - Sistema Nervoso Central/mapa-60-treino-marcha-descarga-peso.png",
    "thumbnailUrl": "./mapas/Lote 06 - Neurofuncional - Sistema Nervoso Central/mapa-60-treino-marcha-descarga-peso.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Treino de Marcha com Descarga de Peso e Pistas Sensoriais.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Treino de Marcha com Descarga de Peso e Pistas Sensoriais.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Treino de Marcha com Descarga de Peso e Pistas Sensoriais."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-61",
    "title": "Paralisia Facial Periférica (Bell) vs Central",
    "category": "Fisioterapia Neurofuncional",
    "subCategory": "SNP",
    "tags": [
      "paralisia",
      "facial",
      "periferica",
      "bell",
      "central"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 07 - Neurofuncional - Nervos Perifericos Tonus e Equilibrio/mapa-61-paralisia-facial-periferica-central.png",
    "thumbnailUrl": "./mapas/Lote 07 - Neurofuncional - Nervos Perifericos Tonus e Equilibrio/mapa-61-paralisia-facial-periferica-central.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Paralisia Facial Periférica (Bell) vs Central.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Paralisia Facial Periférica (Bell) vs Central.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Paralisia Facial Periférica (Bell) vs Central."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-62",
    "title": "Síndrome de Guillain-Barré: Fisioterapia Respiratória e Motora",
    "category": "Fisioterapia Neurofuncional",
    "subCategory": "SNP",
    "tags": [
      "sindrome",
      "guillainbarre",
      "fisioterapia",
      "respiratoria",
      "motora"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 07 - Neurofuncional - Nervos Perifericos Tonus e Equilibrio/mapa-62-guillain-barre.png",
    "thumbnailUrl": "./mapas/Lote 07 - Neurofuncional - Nervos Perifericos Tonus e Equilibrio/mapa-62-guillain-barre.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Síndrome de Guillain-Barré: Fisioterapia Respiratória e Motora.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Síndrome de Guillain-Barré: Fisioterapia Respiratória e Motora.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Síndrome de Guillain-Barré: Fisioterapia Respiratória e Motora."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-63",
    "title": "Esclerose Lateral Amiotrófica (ELA): Condutas e Cuidados",
    "category": "Fisioterapia Neurofuncional",
    "subCategory": "SNP",
    "tags": [
      "esclerose",
      "lateral",
      "amiotrofica",
      "ela",
      "condutas",
      "cuidados"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 07 - Neurofuncional - Nervos Perifericos Tonus e Equilibrio/mapa-63-ela.png",
    "thumbnailUrl": "./mapas/Lote 07 - Neurofuncional - Nervos Perifericos Tonus e Equilibrio/mapa-63-ela.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Esclerose Lateral Amiotrófica (ELA): Condutas e Cuidados.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Esclerose Lateral Amiotrófica (ELA): Condutas e Cuidados.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Esclerose Lateral Amiotrófica (ELA): Condutas e Cuidados."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-64",
    "title": "Lesões do Plexo Braquial (Erb-Duchenne e Klumpke)",
    "category": "Fisioterapia Neurofuncional",
    "subCategory": "SNP",
    "tags": [
      "lesoes",
      "plexo",
      "braquial",
      "erbduchenne",
      "klumpke"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 07 - Neurofuncional - Nervos Perifericos Tonus e Equilibrio/mapa-64-lesao-plexo-braquial.png",
    "thumbnailUrl": "./mapas/Lote 07 - Neurofuncional - Nervos Perifericos Tonus e Equilibrio/mapa-64-lesao-plexo-braquial.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Lesões do Plexo Braquial (Erb-Duchenne e Klumpke).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Lesões do Plexo Braquial (Erb-Duchenne e Klumpke).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Lesões do Plexo Braquial (Erb-Duchenne e Klumpke)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-65",
    "title": "Avaliação da Espasticidade: Escala de Ashworth Modificada",
    "category": "Fisioterapia Neurofuncional",
    "subCategory": "Escalas Neurológicas",
    "tags": [
      "avaliacao",
      "espasticidade",
      "escala",
      "ashworth",
      "modificada"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 07 - Neurofuncional - Nervos Perifericos Tonus e Equilibrio/mapa-65-espasticidade-ashworth.png",
    "thumbnailUrl": "./mapas/Lote 07 - Neurofuncional - Nervos Perifericos Tonus e Equilibrio/mapa-65-espasticidade-ashworth.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Avaliação da Espasticidade: Escala de Ashworth Modificada.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Avaliação da Espasticidade: Escala de Ashworth Modificada.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Avaliação da Espasticidade: Escala de Ashworth Modificada."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-66",
    "title": "Ataxias Cerebelares e Coordenação Motora (Exercícios de Frenkel)",
    "category": "Fisioterapia Neurofuncional",
    "subCategory": "Escalas Neurológicas",
    "tags": [
      "ataxias",
      "cerebelares",
      "coordenacao",
      "motora",
      "exercicios",
      "frenkel"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 07 - Neurofuncional - Nervos Perifericos Tonus e Equilibrio/mapa-66-ataxias-coordenacao.png",
    "thumbnailUrl": "./mapas/Lote 07 - Neurofuncional - Nervos Perifericos Tonus e Equilibrio/mapa-66-ataxias-coordenacao.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Ataxias Cerebelares e Coordenação Motora (Exercícios de Frenkel).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Ataxias Cerebelares e Coordenação Motora (Exercícios de Frenkel).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Ataxias Cerebelares e Coordenação Motora (Exercícios de Frenkel)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-67",
    "title": "Avaliação do Equilíbrio e Quedas: Escala de Berg e TUG Test",
    "category": "Fisioterapia Neurofuncional",
    "subCategory": "Escalas Neurológicas",
    "tags": [
      "avaliacao",
      "equilibrio",
      "quedas",
      "escala",
      "berg",
      "tug"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 07 - Neurofuncional - Nervos Perifericos Tonus e Equilibrio/mapa-67-equilibrio-berg-tug.png",
    "thumbnailUrl": "./mapas/Lote 07 - Neurofuncional - Nervos Perifericos Tonus e Equilibrio/mapa-67-equilibrio-berg-tug.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Avaliação do Equilíbrio e Quedas: Escala de Berg e TUG Test.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Avaliação do Equilíbrio e Quedas: Escala de Berg e TUG Test.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Avaliação do Equilíbrio e Quedas: Escala de Berg e TUG Test."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-68",
    "title": "Avaliação da Sensibilidade Superficial e Profunda",
    "category": "Fisioterapia Neurofuncional",
    "subCategory": "Escalas Neurológicas",
    "tags": [
      "avaliacao",
      "sensibilidade",
      "superficial",
      "profunda"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 07 - Neurofuncional - Nervos Perifericos Tonus e Equilibrio/mapa-68-sensibilidade-superficial-profunda.png",
    "thumbnailUrl": "./mapas/Lote 07 - Neurofuncional - Nervos Perifericos Tonus e Equilibrio/mapa-68-sensibilidade-superficial-profunda.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Avaliação da Sensibilidade Superficial e Profunda.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Avaliação da Sensibilidade Superficial e Profunda.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Avaliação da Sensibilidade Superficial e Profunda."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-69",
    "title": "Reflexos Profundos e Sinais Patológicos (Babinski e Hoffmann)",
    "category": "Fisioterapia Neurofuncional",
    "subCategory": "Escalas Neurológicas",
    "tags": [
      "reflexos",
      "profundos",
      "sinais",
      "patologicos",
      "babinski",
      "hoffmann"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 07 - Neurofuncional - Nervos Perifericos Tonus e Equilibrio/mapa-69-reflexos-profundos-babinski.png",
    "thumbnailUrl": "./mapas/Lote 07 - Neurofuncional - Nervos Perifericos Tonus e Equilibrio/mapa-69-reflexos-profundos-babinski.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Reflexos Profundos e Sinais Patológicos (Babinski e Hoffmann).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Reflexos Profundos e Sinais Patológicos (Babinski e Hoffmann).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Reflexos Profundos e Sinais Patológicos (Babinski e Hoffmann)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-70",
    "title": "Terapia por Contensão Induzida (TCI) e Neuroplasticidade",
    "category": "Fisioterapia Neurofuncional",
    "subCategory": "Equilíbrio & Marcha",
    "tags": [
      "terapia",
      "por",
      "contensao",
      "induzida",
      "tci",
      "neuroplasticidade"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 07 - Neurofuncional - Nervos Perifericos Tonus e Equilibrio/mapa-70-terapia-contensao-induzida.png",
    "thumbnailUrl": "./mapas/Lote 07 - Neurofuncional - Nervos Perifericos Tonus e Equilibrio/mapa-70-terapia-contensao-induzida.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Terapia por Contensão Induzida (TCI) e Neuroplasticidade.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Terapia por Contensão Induzida (TCI) e Neuroplasticidade.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Terapia por Contensão Induzida (TCI) e Neuroplasticidade."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-71",
    "title": "Mecânica Respiratória: Ventilação, Pressões e Complacência",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Semiologia Pulmonar",
    "tags": [
      "mecanica",
      "respiratoria",
      "ventilacao",
      "pressoes",
      "complacencia"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 08 - Respiratoria - Avaliacao e Semiologia Pulmonar/mapa-71-mecanica-respiratoria.png",
    "thumbnailUrl": "./mapas/Lote 08 - Respiratoria - Avaliacao e Semiologia Pulmonar/mapa-71-mecanica-respiratoria.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Mecânica Respiratória: Ventilação, Pressões e Complacência.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Mecânica Respiratória: Ventilação, Pressões e Complacência.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Mecânica Respiratória: Ventilação, Pressões e Complacência."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-72",
    "title": "Padrões Respiratórios e Deformidades Torácicas",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Semiologia Pulmonar",
    "tags": [
      "padroes",
      "respiratorios",
      "deformidades",
      "toracicas"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 08 - Respiratoria - Avaliacao e Semiologia Pulmonar/mapa-72-padroes-respiratorios-torax.png",
    "thumbnailUrl": "./mapas/Lote 08 - Respiratoria - Avaliacao e Semiologia Pulmonar/mapa-72-padroes-respiratorios-torax.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Padrões Respiratórios e Deformidades Torácicas.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Padrões Respiratórios e Deformidades Torácicas.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Padrões Respiratórios e Deformidades Torácicas."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-73",
    "title": "Ausculta Pulmonar e Ruídos Adventícios",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Semiologia Pulmonar",
    "tags": [
      "ausculta",
      "pulmonar",
      "ruidos",
      "adventicios"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 08 - Respiratoria - Avaliacao e Semiologia Pulmonar/mapa-73-ausculta-pulmonar.png",
    "thumbnailUrl": "./mapas/Lote 08 - Respiratoria - Avaliacao e Semiologia Pulmonar/mapa-73-ausculta-pulmonar.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Ausculta Pulmonar e Ruídos Adventícios.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Ausculta Pulmonar e Ruídos Adventícios.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Ausculta Pulmonar e Ruídos Adventícios."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-74",
    "title": "Gasometria Arterial: Valores de Referência e Raciocínio Clínico",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Semiologia Pulmonar",
    "tags": [
      "gasometria",
      "arterial",
      "valores",
      "referencia",
      "raciocinio",
      "clinico"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 08 - Respiratoria - Avaliacao e Semiologia Pulmonar/mapa-74-gasometria-arterial.png",
    "thumbnailUrl": "./mapas/Lote 08 - Respiratoria - Avaliacao e Semiologia Pulmonar/mapa-74-gasometria-arterial.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Gasometria Arterial: Valores de Referência e Raciocínio Clínico.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Gasometria Arterial: Valores de Referência e Raciocínio Clínico.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Gasometria Arterial: Valores de Referência e Raciocínio Clínico."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-75",
    "title": "Distúrbios Ácido-Básicos: Acidose e Alcalose (Compensações)",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Semiologia Pulmonar",
    "tags": [
      "disturbios",
      "acidobasicos",
      "acidose",
      "alcalose",
      "compensacoes"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 08 - Respiratoria - Avaliacao e Semiologia Pulmonar/mapa-75-disturbios-gasometricos.png",
    "thumbnailUrl": "./mapas/Lote 08 - Respiratoria - Avaliacao e Semiologia Pulmonar/mapa-75-disturbios-gasometricos.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Distúrbios Ácido-Básicos: Acidose e Alcalose (Compensações).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Distúrbios Ácido-Básicos: Acidose e Alcalose (Compensações).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Distúrbios Ácido-Básicos: Acidose e Alcalose (Compensações)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-76",
    "title": "Espirometria: Volumes, Capacidades e Curvas Fluxo-Volume",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Semiologia Pulmonar",
    "tags": [
      "espirometria",
      "volumes",
      "capacidades",
      "curvas",
      "fluxovolume"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 08 - Respiratoria - Avaliacao e Semiologia Pulmonar/mapa-76-espirometria-volumes.png",
    "thumbnailUrl": "./mapas/Lote 08 - Respiratoria - Avaliacao e Semiologia Pulmonar/mapa-76-espirometria-volumes.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Espirometria: Volumes, Capacidades e Curvas Fluxo-Volume.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Espirometria: Volumes, Capacidades e Curvas Fluxo-Volume.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Espirometria: Volumes, Capacidades e Curvas Fluxo-Volume."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-77",
    "title": "Pressões Respiratórias Máximas: PImáx e PEmáx",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Semiologia Pulmonar",
    "tags": [
      "pressoes",
      "respiratorias",
      "maximas",
      "pimax",
      "pemax"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 08 - Respiratoria - Avaliacao e Semiologia Pulmonar/mapa-77-pressoes-respiratorias.png",
    "thumbnailUrl": "./mapas/Lote 08 - Respiratoria - Avaliacao e Semiologia Pulmonar/mapa-77-pressoes-respiratorias.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Pressões Respiratórias Máximas: PImáx e PEmáx.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Pressões Respiratórias Máximas: PImáx e PEmáx.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Pressões Respiratórias Máximas: PImáx e PEmáx."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-78",
    "title": "Oxigenoterapia: Sistemas de Baixo e Alto Fluxo",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Semiologia Pulmonar",
    "tags": [
      "oxigenoterapia",
      "sistemas",
      "baixo",
      "alto",
      "fluxo"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 08 - Respiratoria - Avaliacao e Semiologia Pulmonar/mapa-78-oxigenoterapia-fluxo.png",
    "thumbnailUrl": "./mapas/Lote 08 - Respiratoria - Avaliacao e Semiologia Pulmonar/mapa-78-oxigenoterapia-fluxo.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Oxigenoterapia: Sistemas de Baixo e Alto Fluxo.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Oxigenoterapia: Sistemas de Baixo e Alto Fluxo.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Oxigenoterapia: Sistemas de Baixo e Alto Fluxo."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-79",
    "title": "Monitorização Não-Invasiva: Oximetria de Pulso e Capnografia",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Semiologia Pulmonar",
    "tags": [
      "monitorizacao",
      "naoinvasiva",
      "oximetria",
      "pulso",
      "capnografia"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 08 - Respiratoria - Avaliacao e Semiologia Pulmonar/mapa-79-oximetria-capnografia.png",
    "thumbnailUrl": "./mapas/Lote 08 - Respiratoria - Avaliacao e Semiologia Pulmonar/mapa-79-oximetria-capnografia.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Monitorização Não-Invasiva: Oximetria de Pulso e Capnografia.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Monitorização Não-Invasiva: Oximetria de Pulso e Capnografia.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Monitorização Não-Invasiva: Oximetria de Pulso e Capnografia."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-80",
    "title": "Índice de Respiração Rápida e Superficial (IRRS / Tobin)",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Semiologia Pulmonar",
    "tags": [
      "indice",
      "respiracao",
      "rapida",
      "superficial",
      "irrs",
      "tobin"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 08 - Respiratoria - Avaliacao e Semiologia Pulmonar/mapa-80-indice-tobin-irrs.png",
    "thumbnailUrl": "./mapas/Lote 08 - Respiratoria - Avaliacao e Semiologia Pulmonar/mapa-80-indice-tobin-irrs.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Índice de Respiração Rápida e Superficial (IRRS / Tobin).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Índice de Respiração Rápida e Superficial (IRRS / Tobin).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Índice de Respiração Rápida e Superficial (IRRS / Tobin)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-81",
    "title": "Doença Pulmonar Obstrutiva Crônica (DPOC): Manejo Clínico",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Patologias Respiratórias",
    "tags": [
      "doenca",
      "pulmonar",
      "obstrutiva",
      "cronica",
      "dpoc",
      "manejo"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 09 - Respiratoria - Manobras Recursos e Patologias/mapa-81-dpoc.png",
    "thumbnailUrl": "./mapas/Lote 09 - Respiratoria - Manobras Recursos e Patologias/mapa-81-dpoc.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Doença Pulmonar Obstrutiva Crônica (DPOC): Manejo Clínico.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Doença Pulmonar Obstrutiva Crônica (DPOC): Manejo Clínico.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Doença Pulmonar Obstrutiva Crônica (DPOC): Manejo Clínico."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-82",
    "title": "Crise Asmática Aguda: Avaliação da Gravidade e Intervenção",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Patologias Respiratórias",
    "tags": [
      "crise",
      "asmatica",
      "aguda",
      "avaliacao",
      "gravidade",
      "intervencao"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 09 - Respiratoria - Manobras Recursos e Patologias/mapa-82-crise-asmatica.png",
    "thumbnailUrl": "./mapas/Lote 09 - Respiratoria - Manobras Recursos e Patologias/mapa-82-crise-asmatica.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Crise Asmática Aguda: Avaliação da Gravidade e Intervenção.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Crise Asmática Aguda: Avaliação da Gravidade e Intervenção.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Crise Asmática Aguda: Avaliação da Gravidade e Intervenção."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-83",
    "title": "Pneumonias (PAC e PAV): Fisioterapia Respiratória",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Patologias Respiratórias",
    "tags": [
      "pneumonias",
      "pac",
      "pav",
      "fisioterapia",
      "respiratoria"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 09 - Respiratoria - Manobras Recursos e Patologias/mapa-83-pneumonia.png",
    "thumbnailUrl": "./mapas/Lote 09 - Respiratoria - Manobras Recursos e Patologias/mapa-83-pneumonia.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Pneumonias (PAC e PAV): Fisioterapia Respiratória.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Pneumonias (PAC e PAV): Fisioterapia Respiratória.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Pneumonias (PAC e PAV): Fisioterapia Respiratória."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-84",
    "title": "Atelectasias: Mecanismos e Técnicas de Reexpansão Pulmonar",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Recursos & Manobras",
    "tags": [
      "atelectasias",
      "mecanismos",
      "tecnicas",
      "reexpansao",
      "pulmonar"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 09 - Respiratoria - Manobras Recursos e Patologias/mapa-84-atelectasias-reexpansao.png",
    "thumbnailUrl": "./mapas/Lote 09 - Respiratoria - Manobras Recursos e Patologias/mapa-84-atelectasias-reexpansao.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Atelectasias: Mecanismos e Técnicas de Reexpansão Pulmonar.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Atelectasias: Mecanismos e Técnicas de Reexpansão Pulmonar.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Atelectasias: Mecanismos e Técnicas de Reexpansão Pulmonar."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-85",
    "title": "Derrame Pleural e Pneumotórax: Cuidados no Dreno de Tórax",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Patologias Respiratórias",
    "tags": [
      "derrame",
      "pleural",
      "pneumotorax",
      "cuidados",
      "dreno",
      "torax"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 09 - Respiratoria - Manobras Recursos e Patologias/mapa-85-derrame-pneumotorax.png",
    "thumbnailUrl": "./mapas/Lote 09 - Respiratoria - Manobras Recursos e Patologias/mapa-85-derrame-pneumotorax.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Derrame Pleural e Pneumotórax: Cuidados no Dreno de Tórax.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Derrame Pleural e Pneumotórax: Cuidados no Dreno de Tórax.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Derrame Pleural e Pneumotórax: Cuidados no Dreno de Tórax."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-86",
    "title": "Manobras de Higiene Brônquica: ELTGOL e Drenagem Postural",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Recursos & Manobras",
    "tags": [
      "manobras",
      "higiene",
      "bronquica",
      "eltgol",
      "drenagem",
      "postural"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 09 - Respiratoria - Manobras Recursos e Patologias/mapa-86-higiene-bronquica.png",
    "thumbnailUrl": "./mapas/Lote 09 - Respiratoria - Manobras Recursos e Patologias/mapa-86-higiene-bronquica.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Manobras de Higiene Brônquica: ELTGOL e Drenagem Postural.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Manobras de Higiene Brônquica: ELTGOL e Drenagem Postural.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Manobras de Higiene Brônquica: ELTGOL e Drenagem Postural."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-87",
    "title": "Técnicas de Expiração Forçada (TEF / Huffing) e Tosse Assistida",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Recursos & Manobras",
    "tags": [
      "tecnicas",
      "expiracao",
      "forcada",
      "tef",
      "huffing",
      "tosse"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 09 - Respiratoria - Manobras Recursos e Patologias/mapa-87-tef-tosse-assistida.png",
    "thumbnailUrl": "./mapas/Lote 09 - Respiratoria - Manobras Recursos e Patologias/mapa-87-tef-tosse-assistida.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Técnicas de Expiração Forçada (TEF / Huffing) e Tosse Assistida.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Técnicas de Expiração Forçada (TEF / Huffing) e Tosse Assistida.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Técnicas de Expiração Forçada (TEF / Huffing) e Tosse Assistida."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-88",
    "title": "Dispositivos Oscilatórios Orais: Flutter, Shaker e Acapella",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Recursos & Manobras",
    "tags": [
      "dispositivos",
      "oscilatorios",
      "orais",
      "flutter",
      "shaker",
      "acapella"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 09 - Respiratoria - Manobras Recursos e Patologias/mapa-88-flutter-shaker-acapella.png",
    "thumbnailUrl": "./mapas/Lote 09 - Respiratoria - Manobras Recursos e Patologias/mapa-88-flutter-shaker-acapella.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Dispositivos Oscilatórios Orais: Flutter, Shaker e Acapella.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Dispositivos Oscilatórios Orais: Flutter, Shaker e Acapella.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Dispositivos Oscilatórios Orais: Flutter, Shaker e Acapella."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-89",
    "title": "Espirometria de Incentivo a Volume e a Fluxo",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Recursos & Manobras",
    "tags": [
      "espirometria",
      "incentivo",
      "volume",
      "fluxo"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 09 - Respiratoria - Manobras Recursos e Patologias/mapa-89-espirometria-incentivo.png",
    "thumbnailUrl": "./mapas/Lote 09 - Respiratoria - Manobras Recursos e Patologias/mapa-89-espirometria-incentivo.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Espirometria de Incentivo a Volume e a Fluxo.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Espirometria de Incentivo a Volume e a Fluxo.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Espirometria de Incentivo a Volume e a Fluxo."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-90",
    "title": "Treinamento Muscular Inspiratório (TMI) com PowerBreathe",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Recursos & Manobras",
    "tags": [
      "treinamento",
      "muscular",
      "inspiratorio",
      "tmi",
      "powerbreathe"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 09 - Respiratoria - Manobras Recursos e Patologias/mapa-90-treinamento-muscular-inspiratorio.png",
    "thumbnailUrl": "./mapas/Lote 09 - Respiratoria - Manobras Recursos e Patologias/mapa-90-treinamento-muscular-inspiratorio.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Treinamento Muscular Inspiratório (TMI) com PowerBreathe.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Treinamento Muscular Inspiratório (TMI) com PowerBreathe.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Treinamento Muscular Inspiratório (TMI) com PowerBreathe."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-91",
    "title": "Monitorização Hemodinâmica Básica e Gasométrica na UTI",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Ventilação Mecânica",
    "tags": [
      "monitorizacao",
      "hemodinamica",
      "basica",
      "gasometrica",
      "uti"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 10 - UTI e Ventilacao Mecanica Basica/mapa-91-monitorizacao-hemodinamica.png",
    "thumbnailUrl": "./mapas/Lote 10 - UTI e Ventilacao Mecanica Basica/mapa-91-monitorizacao-hemodinamica.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Monitorização Hemodinâmica Básica e Gasométrica na UTI.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Monitorização Hemodinâmica Básica e Gasométrica na UTI.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Monitorização Hemodinâmica Básica e Gasométrica na UTI."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-92",
    "title": "Ventilação Não-Invasiva (VNI): Modalidades CPAP e BiPAP",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Ventilação Mecânica",
    "tags": [
      "ventilacao",
      "naoinvasiva",
      "vni",
      "modalidades",
      "cpap",
      "bipap"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 10 - UTI e Ventilacao Mecanica Basica/mapa-92-vni-cpap-bipap.png",
    "thumbnailUrl": "./mapas/Lote 10 - UTI e Ventilacao Mecanica Basica/mapa-92-vni-cpap-bipap.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Ventilação Não-Invasiva (VNI): Modalidades CPAP e BiPAP.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Ventilação Não-Invasiva (VNI): Modalidades CPAP e BiPAP.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Ventilação Não-Invasiva (VNI): Modalidades CPAP e BiPAP."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-93",
    "title": "Ventilação Mecânica Invasiva: Fases do Ciclo e Circuitos",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Ventilação Mecânica",
    "tags": [
      "ventilacao",
      "mecanica",
      "invasiva",
      "fases",
      "ciclo",
      "circuitos"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 10 - UTI e Ventilacao Mecanica Basica/mapa-93-ventilacao-invasiva.png",
    "thumbnailUrl": "./mapas/Lote 10 - UTI e Ventilacao Mecanica Basica/mapa-93-ventilacao-invasiva.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Ventilação Mecânica Invasiva: Fases do Ciclo e Circuitos.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Ventilação Mecânica Invasiva: Fases do Ciclo e Circuitos.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Ventilação Mecânica Invasiva: Fases do Ciclo e Circuitos."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-94",
    "title": "Modo VCV (Ventilação com Volume Controlado)",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Ventilação Mecânica",
    "tags": [
      "modo",
      "vcv",
      "ventilacao",
      "volume",
      "controlado"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 10 - UTI e Ventilacao Mecanica Basica/mapa-94-VCV.png",
    "thumbnailUrl": "./mapas/Lote 10 - UTI e Ventilacao Mecanica Basica/mapa-94-VCV.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Modo VCV (Ventilação com Volume Controlado).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Modo VCV (Ventilação com Volume Controlado).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Modo VCV (Ventilação com Volume Controlado)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-95",
    "title": "Modo PCV (Ventilação com Pressão Controlada)",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Ventilação Mecânica",
    "tags": [
      "modo",
      "pcv",
      "ventilacao",
      "pressao",
      "controlada"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 10 - UTI e Ventilacao Mecanica Basica/mapa-95-PCV.png",
    "thumbnailUrl": "./mapas/Lote 10 - UTI e Ventilacao Mecanica Basica/mapa-95-PCV.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Modo PCV (Ventilação com Pressão Controlada).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Modo PCV (Ventilação com Pressão Controlada).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Modo PCV (Ventilação com Pressão Controlada)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-96",
    "title": "Modo PSV (Pressão de Suporte Ventilatória)",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Ventilação Mecânica",
    "tags": [
      "modo",
      "psv",
      "pressao",
      "suporte",
      "ventilatoria"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 10 - UTI e Ventilacao Mecanica Basica/mapa-96-PSV.png",
    "thumbnailUrl": "./mapas/Lote 10 - UTI e Ventilacao Mecanica Basica/mapa-96-PSV.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Modo PSV (Pressão de Suporte Ventilatória).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Modo PSV (Pressão de Suporte Ventilatória).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Modo PSV (Pressão de Suporte Ventilatória)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-97",
    "title": "Parâmetros Protetores: Driving Pressure e Pressão de Platô",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Ventilação Mecânica",
    "tags": [
      "parametros",
      "protetores",
      "driving",
      "pressure",
      "pressao",
      "plato"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 10 - UTI e Ventilacao Mecanica Basica/mapa-97-parametros-ventilacao.png",
    "thumbnailUrl": "./mapas/Lote 10 - UTI e Ventilacao Mecanica Basica/mapa-97-parametros-ventilacao.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Parâmetros Protetores: Driving Pressure e Pressão de Platô.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Parâmetros Protetores: Driving Pressure e Pressão de Platô.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Parâmetros Protetores: Driving Pressure e Pressão de Platô."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-98",
    "title": "Desmame Ventilatório: Critérios de Elegibilidade e TRE",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Ventilação Mecânica",
    "tags": [
      "desmame",
      "ventilatorio",
      "criterios",
      "elegibilidade",
      "tre"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 10 - UTI e Ventilacao Mecanica Basica/mapa-98-desmame-criterios-TRE.png",
    "thumbnailUrl": "./mapas/Lote 10 - UTI e Ventilacao Mecanica Basica/mapa-98-desmame-criterios-TRE.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Desmame Ventilatório: Critérios de Elegibilidade e TRE.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Desmame Ventilatório: Critérios de Elegibilidade e TRE.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Desmame Ventilatório: Critérios de Elegibilidade e TRE."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-99",
    "title": "Extubação Segura e Teste de Vazamento do Cuff (Cuff Leak Test)",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Ventilação Mecânica",
    "tags": [
      "extubacao",
      "segura",
      "teste",
      "vazamento",
      "cuff",
      "cuff"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 10 - UTI e Ventilacao Mecanica Basica/mapa-99-extubacao-cuff-leak.png",
    "thumbnailUrl": "./mapas/Lote 10 - UTI e Ventilacao Mecanica Basica/mapa-99-extubacao-cuff-leak.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Extubação Segura e Teste de Vazamento do Cuff (Cuff Leak Test).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Extubação Segura e Teste de Vazamento do Cuff (Cuff Leak Test).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Extubação Segura e Teste de Vazamento do Cuff (Cuff Leak Test)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-100",
    "title": "Posição Prona na SDRA: Protocolo e Cuidados Fisioterapêuticos",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Ventilação Mecânica",
    "tags": [
      "posicao",
      "prona",
      "sdra",
      "protocolo",
      "cuidados",
      "fisioterapeuticos"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 10 - UTI e Ventilacao Mecanica Basica/mapa-100-posicao-prona-SDRA.png",
    "thumbnailUrl": "./mapas/Lote 10 - UTI e Ventilacao Mecanica Basica/mapa-100-posicao-prona-SDRA.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Posição Prona na SDRA: Protocolo e Cuidados Fisioterapêuticos.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Posição Prona na SDRA: Protocolo e Cuidados Fisioterapêuticos.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Posição Prona na SDRA: Protocolo e Cuidados Fisioterapêuticos."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-101",
    "title": "Fraqueza Muscular Adquirida na UTI (ICU-AW / PIDA)",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Recursos & Manobras",
    "tags": [
      "fraqueza",
      "muscular",
      "adquirida",
      "uti",
      "icuaw",
      "pida"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 11 - UTI - Mobilizacao Precoce e Fraqueza Adquirida/mapa-101-fraqueza-adquirida-UTI.png",
    "thumbnailUrl": "./mapas/Lote 11 - UTI - Mobilizacao Precoce e Fraqueza Adquirida/mapa-101-fraqueza-adquirida-UTI.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Fraqueza Muscular Adquirida na UTI (ICU-AW / PIDA).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Fraqueza Muscular Adquirida na UTI (ICU-AW / PIDA).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Fraqueza Muscular Adquirida na UTI (ICU-AW / PIDA)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-102",
    "title": "Escala MRC de Força Muscular na UTI (Escore 0 a 60)",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Semiologia Pulmonar",
    "tags": [
      "escala",
      "mrc",
      "forca",
      "muscular",
      "uti",
      "escore"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 11 - UTI - Mobilizacao Precoce e Fraqueza Adquirida/mapa-102-escala-MRC.png",
    "thumbnailUrl": "./mapas/Lote 11 - UTI - Mobilizacao Precoce e Fraqueza Adquirida/mapa-102-escala-MRC.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Escala MRC de Força Muscular na UTI (Escore 0 a 60).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Escala MRC de Força Muscular na UTI (Escore 0 a 60).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Escala MRC de Força Muscular na UTI (Escore 0 a 60)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-103",
    "title": "Escalas de Sedação e Agitação na UTI: RASS e SAS",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Semiologia Pulmonar",
    "tags": [
      "escalas",
      "sedacao",
      "agitacao",
      "uti",
      "rass",
      "sas"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 11 - UTI - Mobilizacao Precoce e Fraqueza Adquirida/mapa-103-RASS-SAS.png",
    "thumbnailUrl": "./mapas/Lote 11 - UTI - Mobilizacao Precoce e Fraqueza Adquirida/mapa-103-RASS-SAS.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Escalas de Sedação e Agitação na UTI: RASS e SAS.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Escalas de Sedação e Agitação na UTI: RASS e SAS.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Escalas de Sedação e Agitação na UTI: RASS e SAS."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-104",
    "title": "Delirium na UTI: Avaliação com o Método CAM-ICU",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Semiologia Pulmonar",
    "tags": [
      "delirium",
      "uti",
      "avaliacao",
      "metodo",
      "camicu"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 11 - UTI - Mobilizacao Precoce e Fraqueza Adquirida/mapa-104-delirium-CAM-ICU.png",
    "thumbnailUrl": "./mapas/Lote 11 - UTI - Mobilizacao Precoce e Fraqueza Adquirida/mapa-104-delirium-CAM-ICU.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Delirium na UTI: Avaliação com o Método CAM-ICU.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Delirium na UTI: Avaliação com o Método CAM-ICU.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Delirium na UTI: Avaliação com o Método CAM-ICU."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-105",
    "title": "Mobilização Precoce na UTI: Protocolos por Etapas e Segurança",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Recursos & Manobras",
    "tags": [
      "mobilizacao",
      "precoce",
      "uti",
      "protocolos",
      "por",
      "etapas"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 11 - UTI - Mobilizacao Precoce e Fraqueza Adquirida/mapa-105-mobilizacao-precoce.png",
    "thumbnailUrl": "./mapas/Lote 11 - UTI - Mobilizacao Precoce e Fraqueza Adquirida/mapa-105-mobilizacao-precoce.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Mobilização Precoce na UTI: Protocolos por Etapas e Segurança.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Mobilização Precoce na UTI: Protocolos por Etapas e Segurança.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Mobilização Precoce na UTI: Protocolos por Etapas e Segurança."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-106",
    "title": "Aspiração Traqueal em Sistema Aberto e Fechado",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Recursos & Manobras",
    "tags": [
      "aspiracao",
      "traqueal",
      "sistema",
      "aberto",
      "fechado"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 11 - UTI - Mobilizacao Precoce e Fraqueza Adquirida/mapa-106-aspiracao-traqueal.png",
    "thumbnailUrl": "./mapas/Lote 11 - UTI - Mobilizacao Precoce e Fraqueza Adquirida/mapa-106-aspiracao-traqueal.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Aspiração Traqueal em Sistema Aberto e Fechado.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Aspiração Traqueal em Sistema Aberto e Fechado.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Aspiração Traqueal em Sistema Aberto e Fechado."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-107",
    "title": "Fisioterapia no Paciente Traqueostomizado: Cuidados e Desmame",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Recursos & Manobras",
    "tags": [
      "fisioterapia",
      "paciente",
      "traqueostomizado",
      "cuidados",
      "desmame"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 11 - UTI - Mobilizacao Precoce e Fraqueza Adquirida/mapa-107-traqueostomia.png",
    "thumbnailUrl": "./mapas/Lote 11 - UTI - Mobilizacao Precoce e Fraqueza Adquirida/mapa-107-traqueostomia.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Fisioterapia no Paciente Traqueostomizado: Cuidados e Desmame.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Fisioterapia no Paciente Traqueostomizado: Cuidados e Desmame.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Fisioterapia no Paciente Traqueostomizado: Cuidados e Desmame."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-108",
    "title": "Parada Cardiorrespiratória (PCR): Suporte Básico de Vida (SBV)",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Recursos & Manobras",
    "tags": [
      "parada",
      "cardiorrespiratoria",
      "pcr",
      "suporte",
      "basico",
      "vida"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 11 - UTI - Mobilizacao Precoce e Fraqueza Adquirida/mapa-108-PCR-SBV.png",
    "thumbnailUrl": "./mapas/Lote 11 - UTI - Mobilizacao Precoce e Fraqueza Adquirida/mapa-108-PCR-SBV.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Parada Cardiorrespiratória (PCR): Suporte Básico de Vida (SBV).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Parada Cardiorrespiratória (PCR): Suporte Básico de Vida (SBV).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Parada Cardiorrespiratória (PCR): Suporte Básico de Vida (SBV)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-109",
    "title": "Lesão por Pressão: Posicionamento Terapêutico e Prevenção",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Recursos & Manobras",
    "tags": [
      "lesao",
      "por",
      "pressao",
      "posicionamento",
      "terapeutico",
      "prevencao"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 11 - UTI - Mobilizacao Precoce e Fraqueza Adquirida/mapa-109-lesao-pressao-posicionamento.png",
    "thumbnailUrl": "./mapas/Lote 11 - UTI - Mobilizacao Precoce e Fraqueza Adquirida/mapa-109-lesao-pressao-posicionamento.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Lesão por Pressão: Posicionamento Terapêutico e Prevenção.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Lesão por Pressão: Posicionamento Terapêutico e Prevenção.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Lesão por Pressão: Posicionamento Terapêutico e Prevenção."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-110",
    "title": "Acessos Vasculares, Sondas e Drenos: Cuidados na Mobilização",
    "category": "Fisioterapia Respiratória & UTI",
    "subCategory": "Recursos & Manobras",
    "tags": [
      "acessos",
      "vasculares",
      "sondas",
      "drenos",
      "cuidados",
      "mobilizacao"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 11 - UTI - Mobilizacao Precoce e Fraqueza Adquirida/mapa-110-acessos-sondas-drenos.png",
    "thumbnailUrl": "./mapas/Lote 11 - UTI - Mobilizacao Precoce e Fraqueza Adquirida/mapa-110-acessos-sondas-drenos.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Acessos Vasculares, Sondas e Drenos: Cuidados na Mobilização.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Acessos Vasculares, Sondas e Drenos: Cuidados na Mobilização.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Acessos Vasculares, Sondas e Drenos: Cuidados na Mobilização."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-111",
    "title": "Insuficiência Cardíaca Congestiva (ICC) e Classificação NYHA",
    "category": "Cardiorrespiratória & Fisiologia",
    "subCategory": "Reabilitação Cardíaca",
    "tags": [
      "insuficiencia",
      "cardiaca",
      "congestiva",
      "icc",
      "classificacao",
      "nyha"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 12 - Cardiorrespiratoria e Fisiologia do Exercicio/mapa-111-ICC-NYHA.png",
    "thumbnailUrl": "./mapas/Lote 12 - Cardiorrespiratoria e Fisiologia do Exercicio/mapa-111-ICC-NYHA.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Insuficiência Cardíaca Congestiva (ICC) e Classificação NYHA.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Insuficiência Cardíaca Congestiva (ICC) e Classificação NYHA.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Insuficiência Cardíaca Congestiva (ICC) e Classificação NYHA."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-112",
    "title": "Infarto Agudo do Miocárdio (IAM): Fase Hospitalar Precoce",
    "category": "Cardiorrespiratória & Fisiologia",
    "subCategory": "Reabilitação Cardíaca",
    "tags": [
      "infarto",
      "agudo",
      "miocardio",
      "iam",
      "hospitalar",
      "precoce"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 12 - Cardiorrespiratoria e Fisiologia do Exercicio/mapa-112-IAM-reabilitacao.png",
    "thumbnailUrl": "./mapas/Lote 12 - Cardiorrespiratoria e Fisiologia do Exercicio/mapa-112-IAM-reabilitacao.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Infarto Agudo do Miocárdio (IAM): Fase Hospitalar Precoce.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Infarto Agudo do Miocárdio (IAM): Fase Hospitalar Precoce.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Infarto Agudo do Miocárdio (IAM): Fase Hospitalar Precoce."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-113",
    "title": "Fases da Reabilitação Cardiovascular (Fases 1, 2, 3 e 4)",
    "category": "Cardiorrespiratória & Fisiologia",
    "subCategory": "Reabilitação Cardíaca",
    "tags": [
      "fases",
      "reabilitacao",
      "cardiovascular",
      "fases"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 12 - Cardiorrespiratoria e Fisiologia do Exercicio/mapa-113-fases-reabilitacao-cardiaca.png",
    "thumbnailUrl": "./mapas/Lote 12 - Cardiorrespiratoria e Fisiologia do Exercicio/mapa-113-fases-reabilitacao-cardiaca.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Fases da Reabilitação Cardiovascular (Fases 1, 2, 3 e 4).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Fases da Reabilitação Cardiovascular (Fases 1, 2, 3 e 4).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Fases da Reabilitação Cardiovascular (Fases 1, 2, 3 e 4)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-114",
    "title": "Hipertensão Arterial Sistêmica e Prescrição de Exercícios",
    "category": "Cardiorrespiratória & Fisiologia",
    "subCategory": "Prescrição de Exercício",
    "tags": [
      "hipertensao",
      "arterial",
      "sistemica",
      "prescricao",
      "exercicios"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 12 - Cardiorrespiratoria e Fisiologia do Exercicio/mapa-114-hipertensao-exercicio.png",
    "thumbnailUrl": "./mapas/Lote 12 - Cardiorrespiratoria e Fisiologia do Exercicio/mapa-114-hipertensao-exercicio.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Hipertensão Arterial Sistêmica e Prescrição de Exercícios.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Hipertensão Arterial Sistêmica e Prescrição de Exercícios.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Hipertensão Arterial Sistêmica e Prescrição de Exercícios."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-115",
    "title": "Fórmula de Karvonen e Frequência Cardíaca de Treinamento",
    "category": "Cardiorrespiratória & Fisiologia",
    "subCategory": "Prescrição de Exercício",
    "tags": [
      "formula",
      "karvonen",
      "frequencia",
      "cardiaca",
      "treinamento"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 12 - Cardiorrespiratoria e Fisiologia do Exercicio/mapa-115-Karvonen-FC-alvo.png",
    "thumbnailUrl": "./mapas/Lote 12 - Cardiorrespiratoria e Fisiologia do Exercicio/mapa-115-Karvonen-FC-alvo.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Fórmula de Karvonen e Frequência Cardíaca de Treinamento.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Fórmula de Karvonen e Frequência Cardíaca de Treinamento.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Fórmula de Karvonen e Frequência Cardíaca de Treinamento."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-116",
    "title": "Escalas de Percepção de Esforço de Borg (CR10 e 6-20)",
    "category": "Cardiorrespiratória & Fisiologia",
    "subCategory": "Testes Funcionais",
    "tags": [
      "escalas",
      "percepcao",
      "esforco",
      "borg",
      "cr10",
      "620"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 12 - Cardiorrespiratoria e Fisiologia do Exercicio/mapa-116-Borg-CR10-6-20.png",
    "thumbnailUrl": "./mapas/Lote 12 - Cardiorrespiratoria e Fisiologia do Exercicio/mapa-116-Borg-CR10-6-20.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Escalas de Percepção de Esforço de Borg (CR10 e 6-20).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Escalas de Percepção de Esforço de Borg (CR10 e 6-20).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Escalas de Percepção de Esforço de Borg (CR10 e 6-20)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-117",
    "title": "Teste de Caminhada de 6 Minutos (TC6M): Diretrizes ATS",
    "category": "Cardiorrespiratória & Fisiologia",
    "subCategory": "Testes Funcionais",
    "tags": [
      "teste",
      "caminhada",
      "minutos",
      "tc6m",
      "diretrizes",
      "ats"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 12 - Cardiorrespiratoria e Fisiologia do Exercicio/mapa-117-TC6M.png",
    "thumbnailUrl": "./mapas/Lote 12 - Cardiorrespiratoria e Fisiologia do Exercicio/mapa-117-TC6M.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Teste de Caminhada de 6 Minutos (TC6M): Diretrizes ATS.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Teste de Caminhada de 6 Minutos (TC6M): Diretrizes ATS.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Teste de Caminhada de 6 Minutos (TC6M): Diretrizes ATS."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-118",
    "title": "Vias Energéticas e Bioenergética Aplicada ao Exercício",
    "category": "Cardiorrespiratória & Fisiologia",
    "subCategory": "Prescrição de Exercício",
    "tags": [
      "vias",
      "energeticas",
      "bioenergetica",
      "aplicada",
      "exercicio"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 12 - Cardiorrespiratoria e Fisiologia do Exercicio/mapa-118-vias-energeticas.png",
    "thumbnailUrl": "./mapas/Lote 12 - Cardiorrespiratoria e Fisiologia do Exercicio/mapa-118-vias-energeticas.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Vias Energéticas e Bioenergética Aplicada ao Exercício.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Vias Energéticas e Bioenergética Aplicada ao Exercício.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Vias Energéticas e Bioenergética Aplicada ao Exercício."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-119",
    "title": "Consumo Máximo de Oxigênio (VO2 máx) e Limiares Ventilatórios",
    "category": "Cardiorrespiratória & Fisiologia",
    "subCategory": "Testes Funcionais",
    "tags": [
      "consumo",
      "maximo",
      "oxigenio",
      "vo2",
      "max",
      "limiares"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 12 - Cardiorrespiratoria e Fisiologia do Exercicio/mapa-119-VO2-limiares.png",
    "thumbnailUrl": "./mapas/Lote 12 - Cardiorrespiratoria e Fisiologia do Exercicio/mapa-119-VO2-limiares.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Consumo Máximo de Oxigênio (VO2 máx) e Limiares Ventilatórios.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Consumo Máximo de Oxigênio (VO2 máx) e Limiares Ventilatórios.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Consumo Máximo de Oxigênio (VO2 máx) e Limiares Ventilatórios."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-120",
    "title": "Prescrição do Treinamento Físico: Aeróbico vs Resistido",
    "category": "Cardiorrespiratória & Fisiologia",
    "subCategory": "Prescrição de Exercício",
    "tags": [
      "prescricao",
      "treinamento",
      "fisico",
      "aerobico",
      "resistido"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 12 - Cardiorrespiratoria e Fisiologia do Exercicio/mapa-120-prescricao-aerobico-resistido.png",
    "thumbnailUrl": "./mapas/Lote 12 - Cardiorrespiratoria e Fisiologia do Exercicio/mapa-120-prescricao-aerobico-resistido.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Prescrição do Treinamento Físico: Aeróbico vs Resistido.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Prescrição do Treinamento Físico: Aeróbico vs Resistido.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Prescrição do Treinamento Físico: Aeróbico vs Resistido."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-121",
    "title": "Planos, Eixos Anatômicos e Graus de Liberdade Articular",
    "category": "Anatomia & Cinesiologia",
    "subCategory": "Biomecânica",
    "tags": [
      "planos",
      "eixos",
      "anatomicos",
      "graus",
      "liberdade",
      "articular"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 13 - Anatomia Palpatoria e Cinesiologia Aplicada/mapa-121-planos-eixos-GDL.png",
    "thumbnailUrl": "./mapas/Lote 13 - Anatomia Palpatoria e Cinesiologia Aplicada/mapa-121-planos-eixos-GDL.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Planos, Eixos Anatômicos e Graus de Liberdade Articular.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Planos, Eixos Anatômicos e Graus de Liberdade Articular.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Planos, Eixos Anatômicos e Graus de Liberdade Articular."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-122",
    "title": "Tipos de Contração Muscular e Alavancas Biomecânicas",
    "category": "Anatomia & Cinesiologia",
    "subCategory": "Biomecânica",
    "tags": [
      "tipos",
      "contracao",
      "muscular",
      "alavancas",
      "biomecanicas"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 13 - Anatomia Palpatoria e Cinesiologia Aplicada/mapa-122-contracoes-alavancas.png",
    "thumbnailUrl": "./mapas/Lote 13 - Anatomia Palpatoria e Cinesiologia Aplicada/mapa-122-contracoes-alavancas.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Tipos de Contração Muscular e Alavancas Biomecânicas.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Tipos de Contração Muscular e Alavancas Biomecânicas.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Tipos de Contração Muscular e Alavancas Biomecânicas."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-123",
    "title": "Biomecânica da Marcha Humana Normal: Fases e Ações Musculares",
    "category": "Anatomia & Cinesiologia",
    "subCategory": "Biomecânica",
    "tags": [
      "biomecanica",
      "marcha",
      "humana",
      "normal",
      "fases",
      "acoes"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 13 - Anatomia Palpatoria e Cinesiologia Aplicada/mapa-123-marcha-normal.png",
    "thumbnailUrl": "./mapas/Lote 13 - Anatomia Palpatoria e Cinesiologia Aplicada/mapa-123-marcha-normal.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Biomecânica da Marcha Humana Normal: Fases e Ações Musculares.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Biomecânica da Marcha Humana Normal: Fases e Ações Musculares.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Biomecânica da Marcha Humana Normal: Fases e Ações Musculares."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-124",
    "title": "Marchas Patológicas: Trendelenburg, Escarvante, Ceifante e Anserina",
    "category": "Anatomia & Cinesiologia",
    "subCategory": "Biomecânica",
    "tags": [
      "marchas",
      "patologicas",
      "trendelenburg",
      "escarvante",
      "ceifante",
      "anserina"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 13 - Anatomia Palpatoria e Cinesiologia Aplicada/mapa-124-marchas-patologicas.png",
    "thumbnailUrl": "./mapas/Lote 13 - Anatomia Palpatoria e Cinesiologia Aplicada/mapa-124-marchas-patologicas.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Marchas Patológicas: Trendelenburg, Escarvante, Ceifante e Anserina.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Marchas Patológicas: Trendelenburg, Escarvante, Ceifante e Anserina.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Marchas Patológicas: Trendelenburg, Escarvante, Ceifante e Anserina."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-125",
    "title": "Anatomia Palpatória: Cintura Escapular, Ombro e Clavícula",
    "category": "Anatomia & Cinesiologia",
    "subCategory": "Palpação",
    "tags": [
      "anatomia",
      "palpatoria",
      "cintura",
      "escapular",
      "ombro",
      "clavicula"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 13 - Anatomia Palpatoria e Cinesiologia Aplicada/mapa-125-palpacao-ombro-escapula.png",
    "thumbnailUrl": "./mapas/Lote 13 - Anatomia Palpatoria e Cinesiologia Aplicada/mapa-125-palpacao-ombro-escapula.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Anatomia Palpatória: Cintura Escapular, Ombro e Clavícula.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Anatomia Palpatória: Cintura Escapular, Ombro e Clavícula.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Anatomia Palpatória: Cintura Escapular, Ombro e Clavícula."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-126",
    "title": "Anatomia Palpatória: Pelve, Quadril e Região Glútea",
    "category": "Anatomia & Cinesiologia",
    "subCategory": "Palpação",
    "tags": [
      "anatomia",
      "palpatoria",
      "pelve",
      "quadril",
      "regiao",
      "glutea"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 13 - Anatomia Palpatoria e Cinesiologia Aplicada/mapa-126-palpacao-quadril-pelve.png",
    "thumbnailUrl": "./mapas/Lote 13 - Anatomia Palpatoria e Cinesiologia Aplicada/mapa-126-palpacao-quadril-pelve.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Anatomia Palpatória: Pelve, Quadril e Região Glútea.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Anatomia Palpatória: Pelve, Quadril e Região Glútea.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Anatomia Palpatória: Pelve, Quadril e Região Glútea."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-127",
    "title": "Anatomia Palpatória: Joelho, Tornozelo e Pontos Ósseos do Pé",
    "category": "Anatomia & Cinesiologia",
    "subCategory": "Palpação",
    "tags": [
      "anatomia",
      "palpatoria",
      "joelho",
      "tornozelo",
      "pontos",
      "osseos"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 13 - Anatomia Palpatoria e Cinesiologia Aplicada/mapa-127-palpacao-joelho-tornozelo.png",
    "thumbnailUrl": "./mapas/Lote 13 - Anatomia Palpatoria e Cinesiologia Aplicada/mapa-127-palpacao-joelho-tornozelo.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Anatomia Palpatória: Joelho, Tornozelo e Pontos Ósseos do Pé.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Anatomia Palpatória: Joelho, Tornozelo e Pontos Ósseos do Pé.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Anatomia Palpatória: Joelho, Tornozelo e Pontos Ósseos do Pé."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-128",
    "title": "Mapa de Dermátomos e Miótomos (Sensibilidade e Força Motora)",
    "category": "Anatomia & Cinesiologia",
    "subCategory": "Dermátomos & Miótomos",
    "tags": [
      "mapa",
      "dermatomos",
      "miotomos",
      "sensibilidade",
      "forca",
      "motora"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 13 - Anatomia Palpatoria e Cinesiologia Aplicada/mapa-128-dermatomos-miotomos.png",
    "thumbnailUrl": "./mapas/Lote 13 - Anatomia Palpatoria e Cinesiologia Aplicada/mapa-128-dermatomos-miotomos.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Mapa de Dermátomos e Miótomos (Sensibilidade e Força Motora).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Mapa de Dermátomos e Miótomos (Sensibilidade e Força Motora).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Mapa de Dermátomos e Miótomos (Sensibilidade e Força Motora)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-129",
    "title": "Goniometria Articular: Posicionamento do Eixo e Valores Normais",
    "category": "Anatomia & Cinesiologia",
    "subCategory": "Goniometria",
    "tags": [
      "goniometria",
      "articular",
      "posicionamento",
      "eixo",
      "valores",
      "normais"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 13 - Anatomia Palpatoria e Cinesiologia Aplicada/mapa-129-goniometria.png",
    "thumbnailUrl": "./mapas/Lote 13 - Anatomia Palpatoria e Cinesiologia Aplicada/mapa-129-goniometria.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Goniometria Articular: Posicionamento do Eixo e Valores Normais.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Goniometria Articular: Posicionamento do Eixo e Valores Normais.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Goniometria Articular: Posicionamento do Eixo e Valores Normais."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-130",
    "title": "Avaliação Postural Global: Inspeção Sagital, Frontal e Transversa",
    "category": "Anatomia & Cinesiologia",
    "subCategory": "Palpação",
    "tags": [
      "avaliacao",
      "postural",
      "global",
      "inspecao",
      "sagital",
      "frontal"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 13 - Anatomia Palpatoria e Cinesiologia Aplicada/mapa-130-avaliacao-postural.png",
    "thumbnailUrl": "./mapas/Lote 13 - Anatomia Palpatoria e Cinesiologia Aplicada/mapa-130-avaliacao-postural.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Avaliação Postural Global: Inspeção Sagital, Frontal e Transversa.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Avaliação Postural Global: Inspeção Sagital, Frontal e Transversa.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Avaliação Postural Global: Inspeção Sagital, Frontal e Transversa."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-131",
    "title": "Marcos do Desenvolvimento Motor Típico (0 a 12 Meses)",
    "category": "Pediatria & Saúde da Mulher",
    "subCategory": "Marcos Motores",
    "tags": [
      "marcos",
      "desenvolvimento",
      "motor",
      "tipico",
      "meses"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 14 - Pediatria Neonatologia e Saude da Mulher/mapa-131-marcos-desenvolvimento.png",
    "thumbnailUrl": "./mapas/Lote 14 - Pediatria Neonatologia e Saude da Mulher/mapa-131-marcos-desenvolvimento.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Marcos do Desenvolvimento Motor Típico (0 a 12 Meses).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Marcos do Desenvolvimento Motor Típico (0 a 12 Meses).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Marcos do Desenvolvimento Motor Típico (0 a 12 Meses)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-132",
    "title": "Reflexos Primitivos do Neonato: Integração e Sinais de Alarme",
    "category": "Pediatria & Saúde da Mulher",
    "subCategory": "Marcos Motores",
    "tags": [
      "reflexos",
      "primitivos",
      "neonato",
      "integracao",
      "sinais",
      "alarme"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 14 - Pediatria Neonatologia e Saude da Mulher/mapa-132-reflexos-primitivos.png",
    "thumbnailUrl": "./mapas/Lote 14 - Pediatria Neonatologia e Saude da Mulher/mapa-132-reflexos-primitivos.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Reflexos Primitivos do Neonato: Integração e Sinais de Alarme.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Reflexos Primitivos do Neonato: Integração e Sinais de Alarme.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Reflexos Primitivos do Neonato: Integração e Sinais de Alarme."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-133",
    "title": "Escala de Apgar e Avaliação Imediata do Recém-Nascido",
    "category": "Pediatria & Saúde da Mulher",
    "subCategory": "Neonato",
    "tags": [
      "escala",
      "apgar",
      "avaliacao",
      "imediata",
      "recemnascido"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 14 - Pediatria Neonatologia e Saude da Mulher/mapa-133-Apgar-neonato.png",
    "thumbnailUrl": "./mapas/Lote 14 - Pediatria Neonatologia e Saude da Mulher/mapa-133-Apgar-neonato.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Escala de Apgar e Avaliação Imediata do Recém-Nascido.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Escala de Apgar e Avaliação Imediata do Recém-Nascido.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Escala de Apgar e Avaliação Imediata do Recém-Nascido."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-134",
    "title": "Bronquiolite Viral Aguda (BVA): Fisiopatologia e Condutas",
    "category": "Pediatria & Saúde da Mulher",
    "subCategory": "Neonato",
    "tags": [
      "bronquiolite",
      "viral",
      "aguda",
      "bva",
      "fisiopatologia",
      "condutas"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 14 - Pediatria Neonatologia e Saude da Mulher/mapa-134-bronquiolite-BVA.png",
    "thumbnailUrl": "./mapas/Lote 14 - Pediatria Neonatologia e Saude da Mulher/mapa-134-bronquiolite-BVA.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Bronquiolite Viral Aguda (BVA): Fisiopatologia e Condutas.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Bronquiolite Viral Aguda (BVA): Fisiopatologia e Condutas.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Bronquiolite Viral Aguda (BVA): Fisiopatologia e Condutas."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-135",
    "title": "Fisioterapia Respiratória Pediátrica: Peculiaridades e Manobras",
    "category": "Pediatria & Saúde da Mulher",
    "subCategory": "Neonato",
    "tags": [
      "fisioterapia",
      "respiratoria",
      "pediatrica",
      "peculiaridades",
      "manobras"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 14 - Pediatria Neonatologia e Saude da Mulher/mapa-135-fisioterapia-respiratoria-pediatrica.png",
    "thumbnailUrl": "./mapas/Lote 14 - Pediatria Neonatologia e Saude da Mulher/mapa-135-fisioterapia-respiratoria-pediatrica.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Fisioterapia Respiratória Pediátrica: Peculiaridades e Manobras.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Fisioterapia Respiratória Pediátrica: Peculiaridades e Manobras.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Fisioterapia Respiratória Pediátrica: Peculiaridades e Manobras."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-136",
    "title": "Torcicolo Congênito e Plagiocefalia Posicional",
    "category": "Pediatria & Saúde da Mulher",
    "subCategory": "Neonato",
    "tags": [
      "torcicolo",
      "congenito",
      "plagiocefalia",
      "posicional"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 14 - Pediatria Neonatologia e Saude da Mulher/mapa-136-torcicolo-plagiocefalia.png",
    "thumbnailUrl": "./mapas/Lote 14 - Pediatria Neonatologia e Saude da Mulher/mapa-136-torcicolo-plagiocefalia.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Torcicolo Congênito e Plagiocefalia Posicional.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Torcicolo Congênito e Plagiocefalia Posicional.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Torcicolo Congênito e Plagiocefalia Posicional."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-137",
    "title": "Anatomia Funcional do Assoalho Pélvico Feminino (MAP)",
    "category": "Pediatria & Saúde da Mulher",
    "subCategory": "Urogineco",
    "tags": [
      "anatomia",
      "funcional",
      "assoalho",
      "pelvico",
      "feminino",
      "map"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 14 - Pediatria Neonatologia e Saude da Mulher/mapa-137-assoalho-pelvico-feminino.png",
    "thumbnailUrl": "./mapas/Lote 14 - Pediatria Neonatologia e Saude da Mulher/mapa-137-assoalho-pelvico-feminino.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Anatomia Funcional do Assoalho Pélvico Feminino (MAP).",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Anatomia Funcional do Assoalho Pélvico Feminino (MAP).",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Anatomia Funcional do Assoalho Pélvico Feminino (MAP)."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-138",
    "title": "Incontinência Urinária de Esforço vs Urgência: Avaliação e Biofeedback",
    "category": "Pediatria & Saúde da Mulher",
    "subCategory": "Urogineco",
    "tags": [
      "incontinencia",
      "urinaria",
      "esforco",
      "urgencia",
      "avaliacao",
      "biofeedback"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 14 - Pediatria Neonatologia e Saude da Mulher/mapa-138-incontinencia-urinaria.png",
    "thumbnailUrl": "./mapas/Lote 14 - Pediatria Neonatologia e Saude da Mulher/mapa-138-incontinencia-urinaria.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Incontinência Urinária de Esforço vs Urgência: Avaliação e Biofeedback.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Incontinência Urinária de Esforço vs Urgência: Avaliação e Biofeedback.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Incontinência Urinária de Esforço vs Urgência: Avaliação e Biofeedback."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-139",
    "title": "Diástase dos Retos Abdominais: Avaliação e Reabilitação",
    "category": "Pediatria & Saúde da Mulher",
    "subCategory": "Urogineco",
    "tags": [
      "diastase",
      "retos",
      "abdominais",
      "avaliacao",
      "reabilitacao"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 14 - Pediatria Neonatologia e Saude da Mulher/mapa-139-diastase-retos-abdominais.png",
    "thumbnailUrl": "./mapas/Lote 14 - Pediatria Neonatologia e Saude da Mulher/mapa-139-diastase-retos-abdominais.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Diástase dos Retos Abdominais: Avaliação e Reabilitação.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Diástase dos Retos Abdominais: Avaliação e Reabilitação.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Diástase dos Retos Abdominais: Avaliação e Reabilitação."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-140",
    "title": "Fisioterapia Obstétrica: Pré-Parto, Parto Humanizado e Puerpério",
    "category": "Pediatria & Saúde da Mulher",
    "subCategory": "Puerpério",
    "tags": [
      "fisioterapia",
      "obstetrica",
      "preparto",
      "parto",
      "humanizado",
      "puerperio"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 14 - Pediatria Neonatologia e Saude da Mulher/mapa-140-pre-parto-parto-puerperio.png",
    "thumbnailUrl": "./mapas/Lote 14 - Pediatria Neonatologia e Saude da Mulher/mapa-140-pre-parto-parto-puerperio.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Fisioterapia Obstétrica: Pré-Parto, Parto Humanizado e Puerpério.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Fisioterapia Obstétrica: Pré-Parto, Parto Humanizado e Puerpério.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Fisioterapia Obstétrica: Pré-Parto, Parto Humanizado e Puerpério."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-141",
    "title": "Método SOAP no Prontuário Hospitalar: Passo a Passo",
    "category": "Prática Clínica & Round",
    "subCategory": "SOAP",
    "tags": [
      "metodo",
      "soap",
      "prontuario",
      "hospitalar",
      "passo",
      "passo"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 15 - Pratica Clinica Estagio e Ferramental Diario/mapa-141-metodo-SOAP.png",
    "thumbnailUrl": "./mapas/Lote 15 - Pratica Clinica Estagio e Ferramental Diario/mapa-141-metodo-SOAP.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Método SOAP no Prontuário Hospitalar: Passo a Passo.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Método SOAP no Prontuário Hospitalar: Passo a Passo.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Método SOAP no Prontuário Hospitalar: Passo a Passo."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-142",
    "title": "Anamnese e Exame Físico Fisioterapêutico no Estágio",
    "category": "Prática Clínica & Round",
    "subCategory": "Condutas Rápidas",
    "tags": [
      "anamnese",
      "exame",
      "fisico",
      "fisioterapeutico",
      "estagio"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 15 - Pratica Clinica Estagio e Ferramental Diario/mapa-142-anamnese-estagio.png",
    "thumbnailUrl": "./mapas/Lote 15 - Pratica Clinica Estagio e Ferramental Diario/mapa-142-anamnese-estagio.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Anamnese e Exame Físico Fisioterapêutico no Estágio.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Anamnese e Exame Físico Fisioterapêutico no Estágio.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Anamnese e Exame Físico Fisioterapêutico no Estágio."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-143",
    "title": "Escalas de Dor e Incapacidade: EVA, Roland-Morris e Oswestry",
    "category": "Prática Clínica & Round",
    "subCategory": "SOAP",
    "tags": [
      "escalas",
      "dor",
      "incapacidade",
      "eva",
      "rolandmorris",
      "oswestry"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 15 - Pratica Clinica Estagio e Ferramental Diario/mapa-143-EVA-Roland-Oswestry.png",
    "thumbnailUrl": "./mapas/Lote 15 - Pratica Clinica Estagio e Ferramental Diario/mapa-143-EVA-Roland-Oswestry.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Escalas de Dor e Incapacidade: EVA, Roland-Morris e Oswestry.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Escalas de Dor e Incapacidade: EVA, Roland-Morris e Oswestry.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Escalas de Dor e Incapacidade: EVA, Roland-Morris e Oswestry."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-144",
    "title": "Biossegurança Hospitalar, Higienização das Mãos e Uso de EPIs",
    "category": "Prática Clínica & Round",
    "subCategory": "Condutas Rápidas",
    "tags": [
      "biosseguranca",
      "hospitalar",
      "higienizacao",
      "maos",
      "uso",
      "epis"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 15 - Pratica Clinica Estagio e Ferramental Diario/mapa-144-biosseguranca-EPIs.png",
    "thumbnailUrl": "./mapas/Lote 15 - Pratica Clinica Estagio e Ferramental Diario/mapa-144-biosseguranca-EPIs.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Biossegurança Hospitalar, Higienização das Mãos e Uso de EPIs.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Biossegurança Hospitalar, Higienização das Mãos e Uso de EPIs.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Biossegurança Hospitalar, Higienização das Mãos e Uso de EPIs."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-145",
    "title": "Roteiro de Apresentação de Casos Clínicos no Round Multidisciplinar",
    "category": "Prática Clínica & Round",
    "subCategory": "Condutas Rápidas",
    "tags": [
      "roteiro",
      "apresentacao",
      "casos",
      "clinicos",
      "round",
      "multidisciplinar"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 15 - Pratica Clinica Estagio e Ferramental Diario/mapa-145-apresentacao-round.png",
    "thumbnailUrl": "./mapas/Lote 15 - Pratica Clinica Estagio e Ferramental Diario/mapa-145-apresentacao-round.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Roteiro de Apresentação de Casos Clínicos no Round Multidisciplinar.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Roteiro de Apresentação de Casos Clínicos no Round Multidisciplinar.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Roteiro de Apresentação de Casos Clínicos no Round Multidisciplinar."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-146",
    "title": "Fisioterapia Baseada em Evidências: Pirâmide e Níveis de Evidência",
    "category": "Prática Clínica & Round",
    "subCategory": "Condutas Rápidas",
    "tags": [
      "fisioterapia",
      "baseada",
      "evidencias",
      "piramide",
      "niveis",
      "evidencia"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 15 - Pratica Clinica Estagio e Ferramental Diario/mapa-146-fisioterapia-baseada-evidencias.png",
    "thumbnailUrl": "./mapas/Lote 15 - Pratica Clinica Estagio e Ferramental Diario/mapa-146-fisioterapia-baseada-evidencias.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Fisioterapia Baseada em Evidências: Pirâmide e Níveis de Evidência.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Fisioterapia Baseada em Evidências: Pirâmide e Níveis de Evidência.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Fisioterapia Baseada em Evidências: Pirâmide e Níveis de Evidência."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-147",
    "title": "Comunicação Terapêutica, Ética e Sigilo em Prontuário",
    "category": "Prática Clínica & Round",
    "subCategory": "Condutas Rápidas",
    "tags": [
      "comunicacao",
      "terapeutica",
      "etica",
      "sigilo",
      "prontuario"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 15 - Pratica Clinica Estagio e Ferramental Diario/mapa-147-comunicacao-etica-prontuario.png",
    "thumbnailUrl": "./mapas/Lote 15 - Pratica Clinica Estagio e Ferramental Diario/mapa-147-comunicacao-etica-prontuario.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Comunicação Terapêutica, Ética e Sigilo em Prontuário.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Comunicação Terapêutica, Ética e Sigilo em Prontuário.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Comunicação Terapêutica, Ética e Sigilo em Prontuário."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-148",
    "title": "Gerenciamento do Tempo no Plantão e Atendimento Ambulatorial",
    "category": "Prática Clínica & Round",
    "subCategory": "Condutas Rápidas",
    "tags": [
      "gerenciamento",
      "tempo",
      "plantao",
      "atendimento",
      "ambulatorial"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 15 - Pratica Clinica Estagio e Ferramental Diario/mapa-148-gerenciamento-tempo-ambulatorio.png",
    "thumbnailUrl": "./mapas/Lote 15 - Pratica Clinica Estagio e Ferramental Diario/mapa-148-gerenciamento-tempo-ambulatorio.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Gerenciamento do Tempo no Plantão e Atendimento Ambulatorial.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Gerenciamento do Tempo no Plantão e Atendimento Ambulatorial.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Gerenciamento do Tempo no Plantão e Atendimento Ambulatorial."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-149",
    "title": "Red Flags na Fisioterapia: Sinais de Alarme para Encaminhamento Urgente",
    "category": "Prática Clínica & Round",
    "subCategory": "Red Flags",
    "tags": [
      "red",
      "flags",
      "fisioterapia",
      "sinais",
      "alarme",
      "encaminhamento"
    ],
    "readTime": "4 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 15 - Pratica Clinica Estagio e Ferramental Diario/mapa-149-red-flags.png",
    "thumbnailUrl": "./mapas/Lote 15 - Pratica Clinica Estagio e Ferramental Diario/mapa-149-red-flags.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Red Flags na Fisioterapia: Sinais de Alarme para Encaminhamento Urgente.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Red Flags na Fisioterapia: Sinais de Alarme para Encaminhamento Urgente.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Red Flags na Fisioterapia: Sinais de Alarme para Encaminhamento Urgente."
    ],
    "createdAt": "2026-03-01"
  },
  {
    "id": "map-150",
    "title": "Yellow Flags: Fatores Psicossociais e Risco de Cronificação da Dor",
    "category": "Prática Clínica & Round",
    "subCategory": "Red Flags",
    "tags": [
      "yellow",
      "flags",
      "fatores",
      "psicossociais",
      "risco",
      "cronificacao"
    ],
    "readTime": "3 min",
    "fileType": "image",
    "fileUrl": "./mapas/Lote 15 - Pratica Clinica Estagio e Ferramental Diario/mapa-150-yellow-flags.png",
    "thumbnailUrl": "./mapas/Lote 15 - Pratica Clinica Estagio e Ferramental Diario/mapa-150-yellow-flags.png",
    "summary": "Mapa mental detalhado com fluxogramas, critérios diagnósticos e condutas práticas baseadas em evidências para Yellow Flags: Fatores Psicossociais e Risco de Cronificação da Dor.",
    "keyPoints": [
      "Fisiopatologia, anatomia aplicada e raciocínio clínico direto para Yellow Flags: Fatores Psicossociais e Risco de Cronificação da Dor.",
      "Semiologia, testes especiais específicos e critérios de gravidade no plantão.",
      "Prescrição de condutas fisioterapêuticas, progressão de exercícios e parâmetros de segurança."
    ],
    "clinicalPearls": [
      "Dica de Bolso no Estágio: Sempre verifique os parâmetros vitais e sinais de alarme antes de iniciar a intervenção de Yellow Flags: Fatores Psicossociais e Risco de Cronificação da Dor."
    ],
    "createdAt": "2026-03-01"
  }
];
