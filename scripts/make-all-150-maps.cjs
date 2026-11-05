const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public', 'mapas');
const lots = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory()).sort();

// Build map file registry: map number -> { lot, filename }
const fileRegistry = {};

lots.forEach(lot => {
  const files = fs.readdirSync(path.join(baseDir, lot)).filter(f => f.endsWith('.png'));
  files.forEach(file => {
    const match = file.match(/mapa-(\d+)/i);
    if (match) {
      const num = parseInt(match[1], 10);
      fileRegistry[num] = {
        lot,
        file,
        path: `./mapas/${lot}/${file}`
      };
    }
  });
});

console.log('Indexed', Object.keys(fileRegistry).length, 'files from disk.');

// Detailed data for 51-150
const REST_CATALOG = {
  // LOTE 06 - Neuro - SNC
  51: {
    title: 'AVE Isquêmico vs Hemorrágico: Fisiopatologia e Fase Aguda',
    cat: 'Fisioterapia Neurofuncional',
    sub: 'SNC',
    tags: ['ave', 'avc', 'isquemico', 'hemorragico', 'neuro', 'fase aguda'],
    summary: 'Territórios vasculares cerebrais (artéria cerebral média), penumbra isquêmica, controle hemodinâmico e intervenção motora precoce.',
    points: ['Isquêmico (85%) vs Hemorrágico (15% - maior mortalidade inicial e risco de hipertensão intracraniana).', 'Penumbra isquêmica: tecido viável ao redor do núcleo do infarto dependente de fluxo sanguíneo adequado.', 'Posicionamento adequado no leito para inibir padrões sinérgicos flexores em MMSS e extensores em MMII.'],
    pearls: ['Monitore a Pressão Arterial antes da mobilização; no AVE isquêmico agudo, a PA não deve ser reduzida abruptamente para preservar a penumbra.']
  },
  52: {
    title: 'Fases de Recuperação Pós-AVE: Da Flacidez à Espasticidade',
    cat: 'Fisioterapia Neurofuncional',
    sub: 'SNC',
    tags: ['brunnstrom', 'estagios brunnstrom', 'flacidez', 'espasticidade', 'sinergias'],
    summary: 'Os 6 estágios de recuperação motora de Brunnstrom, emergência de sinergias flexoras/extensoras e quebra de padrões anormais.',
    points: ['Estágio 1: Flacidez total e arreflexia; Estágio 2: Início da espasticidade e sinergias reflexas.', 'Estágio 3: Espasticidade máxima com sinergias voluntárias; Estágio 4: Primeiros movimentos fora da sinergia.', 'Treino de dissociação de cinturas e transferências precoces no leito.'],
    pearls: ['Jamais puxe o paciente hemiplégico pelo braço afetado durante as transferências de leito; risco altíssimo de subluxação glenoumeral!']
  },
  53: {
    title: 'Doença de Parkinson: Raciocínio Clínico e Condutas',
    cat: 'Fisioterapia Neurofuncional',
    sub: 'SNC',
    tags: ['parkinson', 'bradicinesia', 'rigidez', 'freezing', 'festinacao', 'pistas visuais'],
    summary: 'Degeneração dopaminérgica na substância negra, tétrade clássica (tremor de repouso, rigidez em roda dentada, bradicinesia e instabilidade postural).',
    points: ['Rigidez plástica em tubo de chumbo e roda dentada com aumento uniforme do tônus.', 'Fenômeno de congelamento da marcha (freezing) e marcha festinada com passos curtos e rápidos.', 'Uso de pistas sensoriais rítmicas (metrônomo sonoro e faixas no chão) para destravar a marcha.'],
    pearls: ['Pistas visuais transversais no chão são extremamente eficazes para superar o freezing em portas e passagens estreitas.']
  },
  54: {
    title: 'Traumatismo Cranioencefálico (TCE) e Escala de Glasgow',
    cat: 'Fisioterapia Neurofuncional',
    sub: 'SNC',
    tags: ['tce', 'glasgow', 'pic', 'coma', 'decorticacao', 'descerebracao'],
    summary: 'Lesões primárias (contusão, LAD) e secundárias (isquemia, aumento de PIC), Escala de Glasgow-P e condutas motoras.',
    points: ['Lesão Axonal Difusa (LAD) por mecanismo de aceleração-desaceleração angular.', 'Escala de Glasgow: Ocular (1-4), Verbal (1-5), Motora (1-6) com subtração da Reatividade Pupilar (0 a -2).', 'Glasgow ≤ 8 define TCE grave e indicação obrigatória de via aérea artificial.'],
    pearls: ['No paciente com monitorização de PIC (Pressão Intracraniana), mantenha a cabeceira a 30° e nunca realize rotação cervical extrema para não colapsar a veia jugular.']
  },
  55: {
    title: 'Traumatismo Raquimedular (TRM) e Escala ASIA',
    cat: 'Fisioterapia Neurofuncional',
    sub: 'SNC',
    tags: ['trm', 'escala asia', 'choque espinhal', 'nivel motor', 'bexiga neurogenica'],
    summary: 'Mapeamento do nível motor e sensitivo pela classificação ASIA (A a E), choque espinhal, bexiga neurogênica e disreflexia autonômica.',
    points: ['ASIA A: Lesão completa sem preservação sensitiva ou motora nos segmentos sacrais S4-S5.', 'Nível neurológico: segmento mais caudal com função motora ≥ 3/5 e sensibilidade normal.', 'Disreflexia Autonômica em lesões acima de T6: emergência hipertensiva desencadeada por bexiga cheia ou fecaloma.'],
    pearls: ['Se o paciente com TRM alto apresentar cefaleia súbita latejante, sudorese profusa acima da lesão e hipertensão severa, sente-o imediatamente e esvazie a sonda vesical!']
  },
  56: {
    title: 'Esclerose Múltipla e Manejo da Fadiga',
    cat: 'Fisioterapia Neurofuncional',
    sub: 'SNC',
    tags: ['esclerose multipla', 'desmielinizacao', 'fadiga', 'fenomeno uhthoff', 'edss'],
    summary: 'Doença autoimune desmielinizante do SNC, surtos e remissões, o Fenômeno de Uhthoff (sensibilidade ao calor) e conservação de energia.',
    points: ['A fadiga crônica é o sintoma mais incapacitante relatado por mais de 80% dos pacientes.', 'Fenômeno de Uhthoff: piora transitória dos déficits neurológicos quando a temperatura corporal aumenta.', 'Treino aeróbico intervalado em ambiente refrigerado associado a estratégias de conservação de energia.'],
    pearls: ['Evite hidroterapia em piscinas aquecidas (> 30°C) ou exercícios extenuantes no calor para não desencadear exacerbação de Uhthoff.']
  },
  57: {
    title: 'Paralisia Cerebral: Classificação GMFCS e Abordagem',
    cat: 'Fisioterapia Neurofuncional',
    sub: 'SNC',
    tags: ['paralisia cerebral', 'gmfcs', 'espastica', 'atetose', 'orteses', 'pediatria'],
    summary: 'Lesão encefálica não-progressiva no cérebro imaturo, classificação topográfica (diplegia, hemiplegia, tetraplegia) e sistema GMFCS (Níveis I a V).',
    points: ['GMFCS Nível I: deambula sem limitações; Nível V: restrito à cadeira de rodas com suporte total de tronco e cabeça.', 'Tipo Espástico (piramidal - mais prevalente), Discinético (atetóide) e Atáxico.', 'Prevenção de contraturas em flexão de quadril e joelho com órteses AFO e posicionamento anti-deformidade.'],
    pearls: ['O foco da fisioterapia neurofuncional moderna na PC é na funcionalidade e participação social (ICF/CIF), não na normalização do tônus isolado.']
  },
  58: {
    title: 'Conceito Bobath / Neuroevolutivo na Prática Clínica',
    cat: 'Fisioterapia Neurofuncional',
    sub: 'Equilíbrio & Marcha',
    tags: ['bobath', 'neuroevolutivo', 'pontos chaves', 'facilitacao', 'inibicao'],
    summary: 'Fundamentos da abordagem Bobath: manuseios em pontos-chave de controle (proximais e distais), facilitação do movimento normal e alinhamento biomecânico.',
    points: ['Pontos-chave proximais: cabeça, cintura escapular e pelve.', 'Pontos-chave distais: mãos e pés.', 'Integração de descarga de peso simétrica e transferências funcionais orientadas à tarefa.'],
    pearls: ['O alinhamento pélvico e o controle de tronco são pré-requisitos biomecânicos indispensáveis antes de iniciar o manuseio das extremidades distais.']
  },
  59: {
    title: 'Facilitação Neuromuscular Proprioceptiva (FNP / Kabat)',
    cat: 'Fisioterapia Neurofuncional',
    sub: 'Equilíbrio & Marcha',
    tags: ['fnp', 'kabat', 'diagonais', 'inversao agonista', 'manter relaxar'],
    summary: 'Padrões diagonais e espirais de movimento tridimensional, comandos verbais e manuais firmes e técnicas específicas (Estabilização Rítmica, Manter-Relaxar).',
    points: ['Diagonais de MMSS: Flexão-Abdução-Rotação Externa vs Extensão-Adução-Rotação Interna.', 'Uso do reflexo de estiramento rápido para recrutar unidades motoras inibidas.', 'Técnica de Manter-Relaxar para ganho de ADM por inibição autógena do OTG.'],
    pearls: ['A tração articular aplicada durante o movimento estimula os receptores de estiramento e facilita o movimento de flexão.']
  },
  60: {
    title: 'Treino de Marcha com Descarga de Peso e Pistas Sensoriais',
    cat: 'Fisioterapia Neurofuncional',
    sub: 'Equilíbrio & Marcha',
    tags: ['treino de marcha', 'descarga de peso', 'esteira', 'suspensao parcial', 'neuro'],
    summary: 'Biomecânica do ciclo da marcha neurológica, esteira ergométrica com suporte de peso corporal (BWSTT) e treino de dupla tarefa.',
    points: ['A descarga de peso no membro afetado estimula os receptores de carga e ativa os geradores de padrões centrais (CPGs).', 'Uso de suspensão de peso (20% a 30%) para permitir cadência rítmica sem colapso postural.', 'Treino orientado à tarefa com obstáculos, mudanças de direção e dupla-tarefa cognitiva.'],
    pearls: ['Não exceda 30% de sustentação de peso na esteira para não descaracterizar a ativação sensorial e biomecânica do apoio.']
  },

  // LOTE 07 - Neuro - SNP, Tônus e Equilíbrio
  61: {
    title: 'Paralisia Facial Periférica (Bell) vs Central',
    cat: 'Fisioterapia Neurofuncional',
    sub: 'SNP',
    tags: ['paralisia facial', 'bell', 'nervo facial', 'VII par', 'house-brackmann', 'sincinesias'],
    summary: 'Diferenciação anatômica entre lesão central (poupa a fronte superior) e periférica (acomete toda a hemiface ipsilateral), Escala de House-Brackmann e exercícios orofaciais.',
    points: ['Lesão Central (supranuclear): paciente consegue enrugar a testa devido à inervação bilateral do ramo frontal.', 'Lesão Periférica (infranuclear): paralisia total com lagoftalmo (olho não fecha) e sinal de Bell positivo.', 'Terapia miofuncional orofacial sem uso de eletroestimulação galvânica para evitar sincinesias.'],
    pearls: ['O uso de corrente elétrica na face na paralisia facial periférica aumenta exponencialmente o risco de sincinesias musculares aberrantes e espasmo hemifacial permanente.']
  },
  62: {
    title: 'Síndrome de Guillain-Barré (SGB): Fisioterapia Respiratória e Motora',
    cat: 'Fisioterapia Neurofuncional',
    sub: 'SNP',
    tags: ['guillain-barre', 'polineuropatia', 'fraqueza ascendente', 'pimáx', 'fadiga neural'],
    summary: 'Polirradiculoneuropatia inflamatória desmielinizante aguda pós-infecciosa, paralisia flácida simétrica ascendente e vigilância ventilatória.',
    points: ['Quadro clássico: fraqueza motora ascendente e simétrica com arreflexia profunda iniciada nos pés.', 'Risco iminente de paralisia diafragmática: monitorar PImáx e capacidade vital a cada plantão.', 'Na fase de platô e recuperação motora, respeitar o limiar de fadiga para evitar lesão axonal por sobrecarga.'],
    pearls: ['Capacidade vital forçada < 15-20 ml/kg ou queda da PImáx para < 30 cmH2O na SGB é critério de internação em UTI e intubação eletiva!']
  },
  63: {
    title: 'Esclerose Lateral Amiotrófica (ELA): Condutas e Cuidados Paliativos',
    cat: 'Fisioterapia Neurofuncional',
    sub: 'SNP',
    tags: ['ela', 'primeiro e segundo neuronio', 'fasciculacoes', 'vni', 'escala alsfrs'],
    summary: 'Degeneração progressiva do primeiro e segundo neurônios motores, fasciculações, disartria, disfagia e manejo com VNI e tosse assistida.',
    points: ['Mistura de sinais de neurônio motor superior (hiper-reflexia, espasticidade) e inferior (atrofia, fasciculações).', 'Início bulbar (disfagia/disartria) tem evolução mais rápida que início espinhal nos membros.', 'VNI com BiPAP preserva a qualidade de vida e prolonga a sobrevida quando a CVF cai abaixo de 50%.'],
    pearls: ['Exercícios de fortalecimento com contração excêntrica vigorosa são PROIBIDOS na ELA por acelerar a destruição de unidades motoras funcionais.']
  },
  64: {
    title: 'Lesões do Plexo Braquial (Erb-Duchenne e Klumpke)',
    cat: 'Fisioterapia Neurofuncional',
    sub: 'SNP',
    tags: ['plexo braquial', 'erb-duchenne', 'klumpke', 'garçom', 'c5-c6', 'mao em garra'],
    summary: 'Paralisia braquial obstétrica e traumática de alta energia, postura de "gorjeta de garçom" (tronco superior C5-C6) e mão em garra (C8-T1).',
    points: ['Erb-Duchenne (C5-C6): perda de abdução de ombro, flexão de cotovelo e supinação (braço aduzido e rodado medialmente).', 'Klumpke (C8-T1): perda dos intrínsecos da mão e flexores de dedos gerando mão em garra.', 'Estimulação sensitiva, mobilização articular passiva de punho/ombro e facilitação motora.'],
    pearls: ['Proteja o ombro da subluxação com tipoia funcional durante os primeiros meses de reinervação axilar.']
  },
  65: {
    title: 'Avaliação da Espasticidade: Escala de Ashworth Modificada (EAM)',
    cat: 'Fisioterapia Neurofuncional',
    sub: 'Escalas Neurológicas',
    tags: ['ashworth', 'espasticidade', 'hipertonia', 'sinal do canivete', 'escala'],
    summary: 'Hipertonia elástica velocidade-dependente (sinal do canivete), graduação precisa de 0 a 4 na movimentação rápida de 1 segundo.',
    points: ['Grau 0: Tônus normal sem aumento de resistência.', 'Grau 1: Leve travamento ("catch") e soltura ao final da ADM.', 'Grau 1+: Travamento seguido de resistência mínima na metade da ADM.', 'Grau 2: Aumento mais pronunciado do tônus na maior parte da ADM, mas membro move-se facilmente.', 'Graus 3 e 4: Movimento passivo difícil ou parte afetada rígida em flexão/extensão.'],
    pearls: ['Para a aplicação correta da EAM, o movimento passivo DEVE ser realizado em velocidade rápida (1 segundo para a ADM completa).']
  },
  66: {
    title: 'Ataxias Cerebelares e Coordenação Motora',
    cat: 'Fisioterapia Neurofuncional',
    sub: 'Escalas Neurológicas',
    tags: ['ataxia', 'cerebelo', 'dismetria', 'adiadococinesia', 'exercicios frenkel'],
    summary: 'Disfunção do controle de timing e erro motor cerebelar, dismetria (index-nariz), disdiadococinesia e os clássicos exercícios de Frenkel.',
    points: ['Marcha atáxica ebriosa: base alargada com desvio errático da trajetória.', 'Teste index-nariz e calcanhar-joelho evidenciam dismetria e tremor de intenção terminal.', 'Exercícios de Frenkel: movimentos precisos, coordenados e repetitivos realizados sob estrito controle visual.'],
    pearls: ['O uso de pesos leves nos tornozelos (tornozeleiras de 500g a 1kg) reduz o tremor oscilatório terminal e melhora a propriocepção na marcha do paciente atáxico.']
  },
  67: {
    title: 'Avaliação do Equilíbrio e Quedas: Escala de Berg e TUG Test',
    cat: 'Fisioterapia Neurofuncional',
    sub: 'Escalas Neurológicas',
    tags: ['escala de berg', 'tug test', 'equilibrio', 'quedas', 'idosos', 'score'],
    summary: 'Aplicação prática da Escala de Equilíbrio de Berg (14 tarefas, escore máx 56) e Timed Up and Go (TUG) para predição de risco de quedas.',
    points: ['Berg: escore < 45 pontos indica risco elevado de quedas na população geriátrica e neurológica.', 'Berg < 36 pontos confere risco de quedas próximo de 100% sem auxílio de marcha.', 'TUG Test: tempo > 12 a 14 segundos indica alto risco de queda funcional.'],
    pearls: ['No teste TUG, o paciente deve usar seu calçado habitual e seu dispositivo auxiliar de marcha (bengala/andador) se já fizer uso no dia a dia.']
  },
  68: {
    title: 'Avaliação da Sensibilidade Superficial e Profunda',
    cat: 'Fisioterapia Neurofuncional',
    sub: 'Escalas Neurológicas',
    tags: ['sensibilidade', 'tátil', 'dolorosa', 'propriocepcao', 'palestesia', 'estereognosia'],
    summary: 'Semiologia dos tratos espinotalâmicos (dor e temperatura) e cordão posterior (propriocepção consciente, vibração e tato discriminativo).',
    points: ['Sensibilidade superficial: tátil (algodão), térmica (tubos de ensaio) e dolorosa (ponta romba descartável).', 'Sensibilidade profunda: cinético-postural (propriocepção) e palestesia (diapasão de 128 Hz nas proeminências ósseas).', 'Sensibilidade cortical: estereognosia (identificação de objetos na mão) e grafestesia.'],
    pearls: ['O paciente DEVE manter os olhos fechados durante todo o teste de sensibilidade para eliminar compensações visuais corticais.']
  },
  69: {
    title: 'Reflexos Profundos e Sinais Patológicos (Babinski e Hoffmann)',
    cat: 'Fisioterapia Neurofuncional',
    sub: 'Escalas Neurológicas',
    tags: ['reflexos profundos', 'babinski', 'hoffmann', 'clonus', 'neuronio motor superior'],
    summary: 'Graduação dos reflexos miotáticos de 0 a 4+, pesquisa do reflexo cutâneo-plantar (Sinal de Babinski) e sinal de Hoffmann nas mãos.',
    points: ['Graus: 0 (arreflexia), 1+ (hiporreflexia), 2+ (normal), 3+ (hiper-reflexia), 4+ (hiper-reflexia com clônus inesgotável).', 'Sinal de Babinski: extensão do hálux com abertura em leque dos demais dedos indica lesão da via corticoespinhal (piramidal).', 'Sinal de Hoffmann: flexão distal do indicador e polegar à pinçagem rápida da unha do dedo médio.'],
    pearls: ['O Sinal de Babinski é fisiológico em bebês de até 12 a 18 meses devido à mielinização incompleta do trato corticoespinhal.']
  },
  70: {
    title: 'Terapia por Contensão Induzida (TCI)',
    cat: 'Fisioterapia Neurofuncional',
    sub: 'Equilíbrio & Marcha',
    tags: ['tci', 'contensao induzida', 'neuroplasticidade', 'shaping', 'membro superior'],
    summary: 'Princípios da TCI de Edward Taub: reversão do não-uso aprendido, imobilização da mão hígida por 90% do dia e treino em tarefas orientadas (Shaping).',
    points: ['Reversão do fenômeno de desuso aprendido que se instala na fase aguda pós-AVE.', 'Critério motor mínimo: conseguir estender 10° os dedos e 20° o punho ativo.', 'Protocolo clássico: restrição com luva do membro são por 2 semanas com 6h de prática diária orientada.'],
    pearls: ['A técnica de "Shaping" exige adaptação milimétrica da dificuldade da tarefa com reforço positivo imediato a cada sucesso motor.']
  },

  // LOTE 08 - Respiratória - Semiologia e Avaliação
  71: {
    title: 'Mecânica Respiratória: Ventilação, Pressões e Complacência',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Semiologia Pulmonar',
    tags: ['mecanica respiratoria', 'complacencia', 'resistencia', 'elastancia', 'trabalho respiratorio'],
    summary: 'Equação do movimento do sistema respiratório, complacência estática (Cest) vs dinâmica e trabalho mecânico ventilatório (WOB).',
    points: ['Complacência do sistema respiratório (normal: 50 a 80 ml/cmH2O em pacientes intubados).', 'Resistência de vias aéreas: diferença entre Pico e Platô dividida pelo fluxo inspiratório.', 'Aumento do trabalho respiratório consome até 30% do débito cardíaco em falência ventilatória.'],
    pearls: ['Se a Pressão de Pico subir mas a Pressão de Platô permanecer estável, a causa do problema é puramente resistiva (secreção no tubo, broncoespasmo ou mordedura).']
  },
  72: {
    title: 'Padrões Respiratórios e Deformidades Torácicas',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Semiologia Pulmonar',
    tags: ['padroes respiratorios', 'cheyne-stokes', 'kussmaul', 'biot', 'torax em barril', 'tiragem'],
    summary: 'Inspeção dinâmica do tórax: respiração paradoxal, padrão tóraco-abdominal, Cheyne-Stokes, Kussmaul, Biot e tiragens musculares.',
    points: ['Respiração Paradoxal: abdômen afunda na inspiração sinalizando fadiga diafragmática iminente.', 'Padrão de Cheyne-Stokes: hiperpneia crescendo-decrescendo com apneia central (comum em ICC e lesões encefálicas).', 'Padrão de Kussmaul: respiração rápida e profunda compensatória de cetoacidose diabética.'],
    pearls: ['Tiragem de fúrcula esternal e batimento de asa de nariz são sinais de extrema gravidade e esforço inspiratório exaustivo.']
  },
  73: {
    title: 'Ausculta Pulmonar e Ruídos Adventícios',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Semiologia Pulmonar',
    tags: ['ausculta pulmonar', 'murmurio', 'roncos', 'sibilos', 'crepitantes', 'estridor'],
    summary: 'Focos auscultatórios anteriores e posteriores, diferenciação entre sons contínuos (roncos/sibilos) e descontínuos (crepitações finas e grossas).',
    points: ['Murmúrio Vesicular: som suave e fisiológico ouvido predominantemente na inspiração.', 'Roncos: vibração de secreção espessa em vias aéreas de grande calibre (mudam com a tosse).', 'Sibilos: estreitamento bronquiolar por broncoespasmo ou edema mucoso.', 'Crepitantes Finos (tipo velcro): abertura súbita de alvéolos colapsados no final da inspiração (atelectasias, congestão, fibrose).'],
    pearls: ['Se o murmúrio vesicular estiver unilateralmente abolido com hipertimpanismo à percussão, PENSE EM PNEUMOTÓRAX HIPERTENSIVO antes de ventilar com pressão positiva!']
  },
  74: {
    title: 'Gasometria Arterial: Valores de Referência e Raciocínio Clínico',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Semiologia Pulmonar',
    tags: ['gasometria arterial', 'ph', 'paco2', 'hco3', 'be', 'pao2', 'sao2'],
    summary: 'Valores de referência fisiológicos (pH 7,35-7,45; PaCO2 35-45 mmHg; HCO3 22-26 mEq/L), relação PaO2/FiO2 e cálculos de oxigenação.',
    points: ['pH reflete a concentração livre de íons H+: < 7,35 = acidemia; > 7,45 = alcalemia.', 'PaCO2 é o componente respiratório: regulado em minutos pelos pulmões através da ventilação-minuto.', 'HCO3 é o componente metabólico: regulado em horas/dias pelos rins por retenção ou excreção.', 'Relação PaO2/FiO2: normal > 400; < 300 indica lesão pulmonar aguda; ≤ 200 indica SDRA moderada.'],
    pearls: ['Nunca olhe apenas o valor do pH isolado; um pH normal de 7,40 pode esconder um distúrbio misto grave com PaCO2 de 60 e HCO3 de 36 totalmente compensado!']
  },
  75: {
    title: 'Distúrbios Ácido-Básicos: Acidose e Alcalose (Compensações)',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Semiologia Pulmonar',
    tags: ['disturbios acido-basicos', 'acidose respiratoria', 'alcalose respiratoria', 'compensacao'],
    summary: 'Algoritmo de diagnóstico em 3 passos para distúrbios simples, parcialmente compensados e distúrbios mistos catastróficos.',
    points: ['Acidose Respiratória: pH baixo com PaCO2 alta (hipoventilação alveolar, DPOC descompensado, fraqueza neuromuscular).', 'Alcalose Respiratória: pH alto com PaCO2 baixa (hiperventilação, crise de pânico, dor, hipóxia inicial).', 'Acidose Metabólica: pH baixo com HCO3 baixo (choque séptico com hiperlactatemia, cetoacidose, insuficiência renal).', 'Distúrbios mistos ocorrem quando ambos os componentes alteram o pH no mesmo sentido.'],
    pearls: ['No paciente com DPOC retentor crônico de CO2, o rim compensa elevando o HCO3 (> 30 mEq/L); não tente normalizar a PaCO2 desse paciente na ventilação mecânica para não gerar alcalose metabólica severa.']
  },
  76: {
    title: 'Espirometria: Volumes, Capacidades e Curvas Fluxo-Volume',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Semiologia Pulmonar',
    tags: ['espirometria', 'cvf', 'vef1', 'tifffeneau', 'disturbio obstrutivo', 'restritivo'],
    summary: 'Volumes pulmonares mobilizáveis, Índice de Tiffeneau (VEF1/CVF), curva fluxo-volume e resposta ao broncodilatador (BD).',
    points: ['Distúrbio Ventilatório Obstrutivo: VEF1/CVF < 70% (ou abaixo do LIN) com curva fluxo-volume com concavidade expiratória (DPOC, asma).', 'Distúrbio Ventilatório Restritivo sugerido: VEF1/CVF normal com CVF < 80% do predito (confirmado pela CPT na pletismografia).', 'Critério de resposta ao BD: aumento do VEF1 ou CVF de pelo menos 200 ml e 12% do basal.'],
    pearls: ['O Índice de Tiffeneau (VEF1/CVF) reduzido é patognomônico de obstrução de vias aéreas; não confunda queda isolada de CVF com restrição sem pletismografia.']
  },
  77: {
    title: 'Pressões Respiratórias Máximas: PImáx e PEmáx',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Semiologia Pulmonar',
    tags: ['pimáx', 'pemáx', 'manovacuometria', 'força muscular respiratoria', 'diafragma'],
    summary: 'Avaliação da força dos músculos inspiratórios (diafragma) e expiratórios (abdominais) com manovacuômetro digital ou analógico.',
    points: ['PImáx realizada a partir do Volume Residual (VR); avalia predominantemente diafragma e intercostais externos.', 'PEmáx realizada a partir da Capacidade Pulmonar Total (CPT); avalia reto abdominal, oblíquos e intercostais internos.', 'PImáx < 30 cmH2O indica fraqueza muscular inspiratória severa e alto risco de falha de desmame.'],
    pearls: ['O orifício de fuga (leak) de 1 a 2 mm no circuito da manovacuometria é obrigatório para evitar o fechamento da glote e a contração isolada dos músculos bucinadores da boca.']
  },
  78: {
    title: 'Oxigenoterapia: Sistemas de Baixo e Alto Fluxo',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Semiologia Pulmonar',
    tags: ['oxigenoterapia', 'cateter nasal', 'mascara venturi', 'fio2', 'mascara reservatorio'],
    summary: 'Diferenciação precisa entre sistemas de baixo fluxo (FiO2 variável) e alto fluxo (FiO2 fixa conhecida), riscos da hiperóxia e toxicidade.',
    points: ['Baixo Fluxo: Cateter nasal (1 a 5 L/min, FiO2 ~24% a 40%) e Máscara facial simples.', 'Alto Fluxo: Máscara de Venturi com válvulas codificadas por cor (FiO2 precisa de 24% a 50%) e CNAF.', 'Máscara não-reinalante com reservatório: fornece FiO2 até 80-90% em fluxo de 10 a 15 L/min.'],
    pearls: ['Em pacientes com DPOC hipoxêmico crônico, a meta de SpO2 é de 88% a 92%; oxigênio excessivo (hiperóxia) pode eliminar o estímulo hipóxico e induzir acidose hipercápnica grave!']
  },
  79: {
    title: 'Monitorização Não-Invasiva: Oximetria de Pulso e Capnografia',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Semiologia Pulmonar',
    tags: ['oximetria', 'capnografia', 'etco2', 'onda capnografica', 'curva de dissociação'],
    summary: 'Curva de dissociação da oxiemoglobina (efeito Bohr), limitações da oximetria de pulso e a curva de capnografia com o EtCO2.',
    points: ['Uma SpO2 de 90% corresponde a uma PaO2 arterial de aproximadamente 60 mmHg no platô da curva.', 'Capnografia avalia a ventilação e a perfusão pulmonar através do dióxido de carbono exalado no final da expiração (EtCO2 normal: 35 a 45 mmHg).', 'Aumento da inclinação da fase III da curva capnográfica (formato em "barbatana de tubarão") indica broncoespasmo severo.'],
    pearls: ['Em parada cardiorrespiratória (PCR), uma subida abrupta do EtCO2 para > 40 mmHg na capnografia é o indicador mais precoce de Retorno da Circulação Espontânea (RCE).']
  },
  80: {
    title: 'Índice de Respiração Rápida e Superficial (IRRS / Tobin)',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Semiologia Pulmonar',
    tags: ['tobin', 'irrs', 'desmame ventilatorio', 'ventilômetro', 'f/vt'],
    summary: 'O preditor isolado mais consagrado de sucesso no desmame da ventilação mecânica: cálculo f/Vt em respiração espontânea.',
    points: ['Cálculo: Frequência respiratória (irpm) dividida pelo Volume Corrente em litros (Vt em L).', 'Medição realizada após 1 minuto de respiração espontânea em tubo T ou PSV de zero com ventilômetro de Wright.', 'IRRS < 105 ciclos/min/L indica alta probabilidade de desmame bem-sucedido; IRRS > 105 prevê falha por fadiga.'],
    pearls: ['Lembre-se sempre de converter o Volume Corrente para LITROS antes de dividir! Exemplo: FR de 24 irpm e Vt de 400 ml = 24 / 0,4 = 60 (aprovado!).']
  },

  // LOTE 09 - Respiratória - Manobras e Patologias
  81: {
    title: 'Doença Pulmonar Obstrutiva Crônica (DPOC): Manejo Clínico',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Patologias Respiratórias',
    tags: ['dpoc', 'enfisema', 'bronquite cronica', 'frenolabial', 'reabilitacao pulmonar'],
    summary: 'Fenótipos enfisematoso ("pink puffer") e bronquítico crônico ("blue bloater"), limitação crônica ao fluxo aéreo, hiperinsuflação e respiração frenolabial.',
    points: ['Destruição de septos alveolares com perda de recolhimento elástico e aprisionamento aéreo (auto-PEEP).', 'Técnica de respiração com lábios franzidos (freno-labial) gera contrapressão positiva e retarda o colapso brônquico expiratório.', 'Reabilitação pulmonar com treino aeróbico e de membros superiores reduz hospitalizações.'],
    pearls: ['A respiração frenolabial alivia a sensação de dispneia porque mantém as vias aéreas abertas por mais tempo na expiração, desinsuflando o pulmão dinamicamente.']
  },
  82: {
    title: 'Crise Asmática Aguda: Avaliação da Gravidade e Intervenção',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Patologias Respiratórias',
    tags: ['asma', 'broncoespasmo', 'peak flow', 'asma quase fatal', 'silencio respiratorio'],
    summary: 'Inflamação brônquica com hiper-reatividade e broncoconstrição, monitorização com Peak Flow e o temido "silêncio respiratório".',
    points: ['Tétrade fisiopatológica: edema mucoso, espasmo muscular liso, hipersecreção de muco espesso e infiltrado eosinofílico.', 'Medição do Pico de Fluxo Expiratório (Peak Flow): zona verde (> 80%), amarela (50-80%) e vermelha (< 50%).', 'Silêncio respiratório na ausculta: ausência de sibilos com esforço ventilatório extremo indica quase oclusão das vias aéreas (urgência máxima!).'],
    pearls: ['CUIDADO: Se o paciente asmático em crise parar de sibilar e começar a ficar sonolento, ele NÃO melhorou: está em exaustão diafragmática com parada iminente!']
  },
  83: {
    title: 'Pneumonias (PAC e PAV): Fisioterapia Respiratória',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Patologias Respiratórias',
    tags: ['pneumonia', 'pac', 'pav', 'consolidacao', 'bronquio aereo', 'higiene bronquica'],
    summary: 'Consolidação alveolar com broncograma aéreo, pneumonia adquirida na comunidade (PAC) vs associada à ventilação mecânica (PAV) e manobras.',
    points: ['Infiltrado inflamatório e exsudativo preenche os espaços alveolares gerando shunt intrapulmonar (V/Q = 0).', 'Prevenção da PAV: cabeceira elevada a 30-45°, higiene oral com clorexidina a 0,12% e pressão do cuff entre 20-30 cmH2O.', 'Uso criterioso de manobras de higiene brônquica apenas em pacientes hipersecretivos com tosse ineficaz.'],
    pearls: ['Na pneumonia lobar unilateral, posicione o paciente com o pulmão sadio para baixo ("good lung down") para melhorar a oxigenação por gravidade na perfusão.']
  },
  84: {
    title: 'Atelectasias: Mecanismos e Técnicas de Reexpansão Pulmonar',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Recursos & Manobras',
    tags: ['atelectasia', 'reexpansao', 'desvio traqueia', 'epap', 'padroes ventilatorios'],
    summary: 'Colapso alveolar por reabsorção de gás, compressão ou hipoventilação pós-cirúrgica, desvio da traqueia para o lado ipsilateral e recursos de reexpansão.',
    points: ['Atelectasia de reabsorção (obstrução brônquica por tampão mucoso) vs compressiva (derrame ou pneumotórax).', 'Sinais radiológicos: perda de volume, opacidade triangular homogênea e retração ipsilateral do mediastino e traqueia.', 'Técnicas: soluços inspiratórios, suspiro, sustentação máxima da inspiração e pressão positiva (EPAP / RPPI).'],
    pearls: ['Antes de tentar reexpandir uma atelectasia obstrutiva com pressão positiva, DESOBSTRUA a via aérea (aspiração ou tosse); senão a pressão hiperinsuflará apenas o tecido sadio adjacente!']
  },
  85: {
    title: 'Derrame Pleural e Pneumotórax: Cuidados no Dreno de Tórax',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Patologias Respiratórias',
    tags: ['derrame pleural', 'pneumotorax', 'dreno de torax', 'selo d agua', 'oscilacao'],
    summary: 'Acúmulo de líquido ou ar no espaço pleural, sistema de drenagem sob selo d’água, cuidados durante a cinesioterapia e deambulação.',
    points: ['Derrame pleural: desvio do mediastino para o lado CONTRALATERAL (diferente da atelectasia que puxa para o mesmo lado).', 'Pneumotórax hipertensivo: colapso pulmonar total com choque obstrutivo por compressão de grandes vasos (descompressão imediata com agulha no 2º EIC).', 'Sistema de selo d’água: a coluna de líquido DEVE oscilar com a respiração; borbulhamento contínuo indica fístula aérea ativa.'],
    pearls: ['NUNCA eleve o frasco de drenagem torácica acima do nível do tórax do paciente durante transferências ou deambulação para não refluir líquido para a cavidade pleural!']
  },
  86: {
    title: 'Manobras de Higiene Brônquica: ELTGOL e Drenagem Postural',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Recursos & Manobras',
    tags: ['higiene bronquica', 'eltgol', 'drenagem postural', 'desobstrucao', 'secrecao'],
    summary: 'Fisiologia do transporte mucociliar, Drenagem Autógena, ELTGOL (Expiração Lenta Total com a Glote Aberta em decúbito infralateral) e fluxo expiratório.',
    points: ['ELTGOL aproveita a compressão do pulmão infralateral pelo peso do mediastino associada à expiração lenta e profunda.', 'Drenagem Postural modificada utiliza a ação da gravidade em segmentos bronquiais específicos sem Trendelenburg invertido extremo.', 'Indicação: hipersecreção crônica e retenção mucosa com tosse ineficaz.'],
    pearls: ['O ELTGOL deve ser realizado com a glote totalmente aberta (o paciente solta o ar através de um bocal largo emitindo um suspiro suave) para não colapsar os brônquios precocemente.']
  },
  87: {
    title: 'Técnicas de Expiração Forçada (TEF / Huffing) e Tosse Assistida',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Recursos & Manobras',
    tags: ['huffing', 'tef', 'tosse assistida', 'tosse dirigida', 'ponto de igual pressao'],
    summary: 'Conceito do Ponto de Igual Pressão (PIP), fases da tosse mecânica (irritação, inspiração profunda, compressão glótica e expulsão explosiva).',
    points: ['Huffing (expiração forçada de baixo ou médio volume com glote aberta) desloca a secreção periférica para vias centrais com menos gasto energético.', 'Fases da tosse: perda de qualquer fase (ex: fraqueza de abdominais na expulsão) torna a tosse ineficaz.', 'Tosse assistida manualmente (pressão abdominal coordenada com a expiração) indicada em pacientes neuromusculares e tetraplégicos.'],
    pearls: ['Em pacientes com instabilidade brônquica ou colapso precoce das vias aéreas (ex: enfisema), prefira o Huffing suave à tosse vigorosa repetitiva.']
  },
  88: {
    title: 'Dispositivos Oscilatórios Orais: Flutter, Shaker e Acapella',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Recursos & Manobras',
    tags: ['flutter', 'shaker', 'acapella', 'pep oscilatorio', 'reologia muco'],
    summary: 'Pressão Expiratória Positiva Oscilatória (PEP oscilatória), diminuição da viscoelasticidade do muco (tixotropia) e descolamento brônquico.',
    points: ['A oscilação de alta frequência (11 a 15 Hz) ressoa com a frequência de batimento ciliar normal do epitélio respiratório.', 'Combinação de pressão positiva intrabrônquica (mantém a via aberta) com microvibrações que cisalham o muco espesso.', 'Acapella utiliza mecanismo magnético de alavanca e funciona em qualquer angulação corporal (ao contrário do Flutter e Shaker que dependem da gravidade).'],
    pearls: ['Ensine o paciente a inspirar 3/4 da capacidade máxima, prender por 2 a 3 segundos e expirar de forma sustentada e suave através do dispositivo.']
  },
  89: {
    title: 'Espirometria de Incentivo a Volume e a Fluxo',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Recursos & Manobras',
    tags: ['espirometria incentivo', 'coach', 'triflo', 'reexpansao alveolar', 'pos-operatorio'],
    summary: 'Incentivadores volumétricos (Coach) vs incentivadores a fluxo (Triflo / Respiron), fisiologia da respiração com suspiro e profilaxia pós-op.',
    points: ['Incentivadores volumétricos: promovem inspiração lenta, profunda e sustentada com feedback do volume real mobilizado em litros.', 'Incentivadores a fluxo: exigem fluxo turbulento alto para elevar as esferas, aumentando o trabalho dos músculos acessórios.', 'Indicação principal: pós-operatório de cirurgia torácica e abdominal alta para prevenção e tratamento de atelectasias.'],
    pearls: ['O incentivador a volume (como o Voldyne/Coach) é superior biomecanicamente ao Triflo por estimular a ventilação colateral com menor gasto energético muscular.']
  },
  90: {
    title: 'Treinamento Muscular Inspiratório (TMI) com PowerBreathe',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Recursos & Manobras',
    tags: ['tmi', 'powerbreathe', 'treinamento muscular inspiratorio', 'carga limiar', 'pimáx'],
    summary: 'Prescrição baseada em carga limiar pressórica (Threshold / PowerBreathe), dosagem de hipertrofia diafragmática (30% a 50% da PImáx).',
    points: ['Dispositivos de carga resistiva linear por mola independente de fluxo (Threshold) oferecem resistência constante ao longo de toda a inspiração.', 'Protocolo padrão-ouro baseado em evidência: 30 respirações (ou 2 séries de 30) 2x ao dia com carga de 30% a 50% da PImáx.', 'Reavaliação semanal da PImáx para progressão de carga de acordo com o princípio da sobrecarga biológica.'],
    pearls: ['O TMI acelera significativamente o desmame em pacientes com falha ventilatória por fraqueza diafragmática comprovada (PImáx < 30 cmH2O).']
  },

  // LOTE 10 - UTI e Ventilação Mecânica Básica
  91: {
    title: 'Monitorização Hemodinâmica Básica e Gasométrica na UTI',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Ventilação Mecânica',
    tags: ['hemodinamica', 'pvc', 'pressao arterial invasiva', 'pam', 'debito cardiaco', 'uti'],
    summary: 'Pressão Arterial Média (PAM normal: 65 a 100 mmHg), Pressão Venosa Central (PVC), lactato sérico e metas de perfusão tecidual no choque.',
    points: ['Cálculo da PAM: (PAS + 2xPAD) / 3. Manter PAM ≥ 65 mmHg é meta obrigatória na sepse para perfusão renal e coronariana.', 'Pressão de Perfusão Cerebral (PPC = PAM - PIC): manter entre 60 e 70 mmHg no neurocrítico.', 'Lactato arterial > 2 mmol/L sinaliza hipoperfusão tecidual e metabolismo anaeróbico celular.'],
    pearls: ['Interrompa qualquer exercício ou mobilização no leito se a PAM cair abaixo de 65 mmHg ou o paciente apresentar taquicardia desproporcional!']
  },
  92: {
    title: 'Ventilação Não-Invasiva (VNI): Modalidades CPAP e BiPAP',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Ventilação Mecânica',
    tags: ['vni', 'cpap', 'bipap', 'epap', 'ipap', 'edema agudo pulmao', 'dpoc'],
    summary: 'Indicações de classe I (EAP cardiogênico e DPOC agudizado com acidose hipercápnica), interfaces (nasal, orofacial, total face) e contraindicações.',
    points: ['CPAP (um nível de pressão): recrutamento alveolar e redução de pré-carga/pós-carga no edema agudo de pulmão.', 'BiPAP / Dois níveis (IPAP e EPAP): IPAP ventila e lava CO2; EPAP mantém alvéolos abertos e melhora oxigenação.', 'Contraindicações absolutas: PCR, rebaixamento de consciência (Glasgow < 8), vômitos incoercíveis e trauma facial grave.'],
    pearls: ['No DPOC descompensado, avalie a resposta gasométrica após 1 a 2 horas de VNI; a não-redução do PaCO2 e pH < 7,25 indica falha da VNI e necessidade de IOT imediata.']
  },
  93: {
    title: 'Ventilação Mecânica Invasiva: Fases do Ciclo e Circuitos',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Ventilação Mecânica',
    tags: ['ventilacao invasiva', 'disparo', 'ciclagem', 'tubo orotraqueal', 'tot', 'filtro hme'],
    summary: 'As 4 fases do ciclo ventilatório mecânico (disparo, fase inspiratória, ciclagem e fase expiratória), umidificação passiva (HME) vs ativa.',
    points: ['Disparo: o que inicia a inspiração (a tempo no modo controlado; a pressão ou a fluxo no modo assistido/espontâneo).', 'Ciclagem: o critério de transição de inspiração para expiração (volume em VCV, tempo em PCV, fluxo em PSV).', 'Filtro HMEF (trocador de calor e umidade com barreira bacteriana) deve ser posicionado entre o circuito em Y e o paciente.'],
    pearls: ['Troque o filtro HME imediatamente se estiver condensado ou sujo de secreção aspirada para não aumentar criticamente a resistência do circuito.']
  },
  94: {
    title: 'Modo VCV (Ventilação com Volume Controlado)',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Ventilação Mecânica',
    tags: ['vcv', 'volume controlado', 'volume corrente', 'fluxo quadrado', 'pressao pico'],
    summary: 'Volume Corrente (Vt) pré-determinado e fixo, fluxo inspiratório programado, ciclagem a volume e pressões nas vias aéreas variáveis.',
    points: ['Garante a entrega exata do volume corrente (ideal: 6 ml/kg de peso predito).', 'Forma da onda de fluxo: quadrada (tempo inspiratório fixo) ou desacelerada (melhor distribuição de gás).', 'Pressão de Pico varia de acordo com a complacência e resistência do paciente.'],
    pearls: ['Em VCV, se a complacência do paciente piorar bruscamente, a pressão de vias aéreas aumentará perigosamente; programe sempre o alarme de Pmax a 40 cmH2O!']
  },
  95: {
    title: 'Modo PCV (Ventilação com Pressão Controlada)',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Ventilação Mecânica',
    tags: ['pcv', 'pressao controlada', 'tempo inspiratorio', 'onda desacelerada', 'sdra'],
    summary: 'Pressão inspiratória pré-determinada e fixa, tempo inspiratório fixo, onda de fluxo desacelerada e volume corrente livre variável.',
    points: ['Limite rígido de pressão alveolar, protegendo os alvéolos contra barotrauma em pulmões heterogêneos.', 'Ciclagem a tempo (ajuste preciso do Tinsp e relação I:E).', 'Volume corrente entregue depende diretamente da mecânica do paciente (se o tórax estiver rígido, o Vt cai).'],
    pearls: ['No modo PCV, vigie constantemente o volume corrente expirado (Vte); se o paciente broncoespasmar ou colapsar alvéolos, ele receberá um volume perigosamente baixo sem soar alarme de pressão.']
  },
  96: {
    title: 'Modo PSV (Pressão de Suporte Ventilatória)',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Ventilação Mecânica',
    tags: ['psv', 'pressao de suporte', 'sensibilidade', 'ciclagem a fluxo', 'desmame'],
    summary: 'Modo totalmente espontâneo de transição e desmame: paciente controla início, frequência, volume e duração de cada respiração.',
    points: ['Disparo a pressão ou fluxo realizado pelo esforço diafragmático do próprio paciente.', 'Ciclagem a fluxo: o ventilador encerra o suporte quando o fluxo inspiratório cai para uma porcentagem do pico (comum: 25%).', 'Parâmetros ajustáveis: Pressão de Suporte (cmH2O), PEEP, FiO2 e Sensibilidade.'],
    pearls: ['Em pacientes com DPOC em PSV, aumentar a porcentagem de ciclagem de fluxo para 40-50% reduz o tempo inspiratório e evita o aprisionamento aéreo (auto-PEEP).']
  },
  97: {
    title: 'Parâmetros Protetores: Driving Pressure e Pressão de Platô',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Ventilação Mecânica',
    tags: ['driving pressure', 'pressao plato', 'ventilacao protetora', 'sdra', 'volutrauma'],
    summary: 'Estratégia ventilatória protetora na SDRA e cirurgia: Volume Corrente de 4 a 6 ml/kg de peso predito, Pplatô < 30 cmH2O e ΔP ≤ 15 cmH2O.',
    points: ['Cálculo do peso predito (fórmula ARDSNet): Homens = 50 + 0,91 x (altura cm - 152,4); Mulheres = 45,5 + 0,91 x (altura cm - 152,4).', 'Pressão de Platô medida através de pausa inspiratória de 2 a 3 segundos (reflete a pressão alveolar de estiramento).', 'Driving Pressure (ΔP = Pplatô - PEEP): deve ser mantida SEMPRE ≤ 15 cmH2O para reduzir mortalidade na SDRA.'],
    pearls: ['O pulmão não engorda com o excesso de tecido adiposo! Nunca regule o volume corrente pelo peso real do paciente obeso na UTI; use sempre o peso predito pela altura!']
  },
  98: {
    title: 'Desmame Ventilatório: Critérios de Elegibilidade e TRE',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Ventilação Mecânica',
    tags: ['desmame', 'tre', 'teste de respiracao espontanea', 'tubo t', 'criterios elegibilidade'],
    summary: 'Resolução da causa da intubação, estabilidade hemodinâmica, ausência de febre, equilíbrio ácido-básico e protocolo de TRE de 30 a 120 minutos.',
    points: ['Critérios de elegibilidade: PaO2/FiO2 > 150-200 com PEEP ≤ 8 cmH2O, FiO2 ≤ 40%, sem vasopressores em doses altas e Glasgow adequado.', 'Teste de Respiração Espontânea (TRE): 30 minutos em Tubo T com O2 ou PSV de 5 a 7 cmH2O com PEEP zero/fisiológica.', 'Critérios de falha do TRE: FR > 35 irpm, SpO2 < 90%, sudorese, agitação, arritmias ou uso de musculatura acessória.'],
    pearls: ['Pacientes que completam com sucesso 30 minutos de TRE em PSV baixa têm taxas de sucesso de extubação idênticas àqueles mantidos por 2 horas inteiras.']
  },
  99: {
    title: 'Extubação Segura e Teste de Vazamento do Cuff (Cuff Leak Test)',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Ventilação Mecânica',
    tags: ['extubacao', 'cuff leak test', 'edema laringeo', 'estridor pos-extubacao', 'desinsuflacao'],
    summary: 'Diferenciação entre falha de extubação (edema de glote/via aérea superior) e falha de desmame, aspiração prévia e teste de vazamento quantitativo.',
    points: ['Aspiração completa da orofaringe e cavidade subglótica antes de desinsuflar o balonete (cuff).', 'Cuff Leak Test quantitativo: desinsufla-se o cuff em modo VCV; a diferença entre volume inspirado e expirado deve ser > 110 ml (ou > 12-24%).', 'Ausência de vazamento indica edema de laringe e alto risco de estridor pós-extubação.'],
    pearls: ['Se o Cuff Leak Test for negativo (sem vazamento) em paciente intubado por tempo prolongado, a administração de corticoide venoso 4 a 6 horas antes da extubação reduz o risco de reintubação.']
  },
  100: {
    title: 'Posição Prona na SDRA: Protocolo e Cuidados Fisioterapêuticos',
    cat: 'Fisioterapia Respiratória & UTI',
    sub: 'Ventilação Mecânica',
    tags: ['posicao prona', 'sdra', 'hipoxemia refrataria', 'relacao pao2/fio2', 'protocolo prone'],
    summary: 'Indicação em SDRA grave com PaO2/FiO2 < 150 mmHg, homogeneização da ventilação dorsal, descompressão cardíaca e sessões de 16 horas.',
    points: ['Mecanismo: o pulmão dorsal é desobstruído da compressão do peso do coração e das estruturas do mediastino.', 'Duração recomendada pelo estudo PROSEVA: manter o paciente em prona por pelo menos 16 horas consecutivas.', 'Cuidados críticos durante o giro: segurança do tubo orotraqueal, proteção dos olhos com pomada e alívio de proeminências ósseas.'],
    pearls: ['A posição prona reduz a mortalidade em pacientes com SDRA moderada a grave quando instituída precocemente (nas primeiras 36 a 48 horas da ventilação mecânica).']
  }
};

console.log('Rest catalog ready.');
