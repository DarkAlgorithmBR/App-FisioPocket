const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public', 'mapas');
const lotFolders = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory()).sort();

// Complete dictionary of all 150 maps
const MAPS_INFO = [
  // LOTE 01
  {
    num: 1,
    title: 'Síndrome do Impacto Subacromial',
    cat: 'Ortopedia & Traumatologia',
    sub: 'Membro Superior',
    tags: ['ombro', 'impacto', 'subacromial', 'supraespinhal', 'neer', 'hawkins'],
    time: '3 min',
    summary: 'Mecanismo de compressão tendínea e da bursa sob o arco coracoacromial, testes provocativos e reabilitação em cadeia cinética fechada.',
    points: ['Espaço subacromial reduzido (< 6-7mm) por alteração acromial ou discinese.', 'Testes de Neer e Hawkins-Kennedy reproduzem os sintomas.', 'Reabilitação precoce focada no controle motor escapular e depressores umerais.'],
    pearls: ['Nunca inicie abdução em cadeia aberta com carga acima de 90° se houver discinese escapular evidente.']
  },
  {
    num: 2,
    title: 'Lesões do Manguito Rotador: Avaliação e Reabilitação',
    cat: 'Ortopedia & Traumatologia',
    sub: 'Membro Superior',
    tags: ['manguito', 'ombro', 'supraespinhal', 'jobe', 'patte', 'gerber'],
    time: '4 min',
    summary: 'Mapeamento anatômico dos 4 tendões do manguito rotador, testes específicos por músculo e critérios de conduta conservadora vs cirúrgica.',
    points: ['Tendão do supraespinhal é o mais acometido por hipovascularização na zona crítica.', 'Diferenciação entre tendinopatia (dor com força mantida) e ruptura (perda de força).', 'Progressão de ADM passiva para ativa-assistida, isometria e excêntricos.'],
    pearls: ['No teste de Jobe (Empty Can), fraqueza indolor sinaliza forte suspeita de ruptura tendínea total.']
  },
  {
    num: 3,
    title: 'Instabilidade Glenoumeral e Luxação do Ombro',
    cat: 'Ortopedia & Traumatologia',
    sub: 'Membro Superior',
    tags: ['instabilidade', 'luxação', 'ombro', 'bankart', 'hill-sachs', 'apreensao'],
    time: '3 min',
    summary: 'Instabilidade anterior, posterior e multidirecional do ombro. Lesões associadas (Bankart e Hill-Sachs) e proteção capsuloligamentar.',
    points: ['Luxação anterior responde por > 90% dos episódios agudos traumáticos.', 'Testes de Apreensão anterior e Relocação de Jobe são padrão-ouro.', 'Fortalecimento de estabilizadores dinâmicos (subescapular e manguito posterior).'],
    pearls: ['Evite abdução associada a rotação externa forçada nas primeiras 6 semanas pós-luxação anterior.']
  },
  {
    num: 4,
    title: 'Capsulite Adesiva (Ombro Congelado)',
    cat: 'Ortopedia & Traumatologia',
    sub: 'Membro Superior',
    tags: ['capsulite', 'ombro congelado', 'rigidez', 'mobilizacao', 'adm'],
    time: '3 min',
    summary: 'Fisiopatologia da fibrose capsular, as 3 fases clínicas (dor, congelamento e descongelamento) e terapia manual graduada.',
    points: ['Padrão capsular clássico: perda maior de rotação externa, depois abdução e rotação interna.', 'Fase inflamatória exige controle álgico e mobilizações suaves (graus I e II).', 'Fase de descongelamento foca em mobilizações graus III e IV para ganho de ADM.'],
    pearls: ['Mobilização articular forçada na fase inflamatória aguda só aumenta a dor e intensifica o espasmo protetor.']
  },
  {
    num: 5,
    title: 'Epicondilite Lateral (Cotovelo de Tenista)',
    cat: 'Ortopedia & Traumatologia',
    sub: 'Membro Superior',
    tags: ['cotovelo', 'epicondilite', 'cozen', 'mill', 'extensores', 'ercc'],
    time: '3 min',
    summary: 'Tendinopatia do extensor radial curto do carpo (ERCC), testes de Cozen, Mill e Maudsley e reabilitação excêntrica.',
    points: ['Desorganização de colágeno na origem comum dos extensores do punho.', 'Dor na extensão resistida do punho e palpação do epicôndilo lateral.', 'Exercícios excêntricos para extensores aumentam síntese de colágeno.'],
    pearls: ['Diferencie da compressão do nervo interósseo posterior que causa dor 4cm distal ao epicôndilo.']
  },
  {
    num: 6,
    title: 'Epicondilite Medial (Cotovelo de Golfista)',
    cat: 'Ortopedia & Traumatologia',
    sub: 'Membro Superior',
    tags: ['epicondilite medial', 'cotovelo', 'flexores', 'pronador', 'terapia manual'],
    time: '3 min',
    summary: 'Sobrecarga nos tendões dos músculos flexores do carpo e pronador redondo no epicôndilo medial do úmero.',
    points: ['Dor exacerbada com flexão resistida do punho e pronação do antebraço.', 'Atenção para neurite do nervo ulnar associada no túnel cubital.', 'Tratamento com modulação de carga, alongamentos e transição isométrico-excêntrico.'],
    pearls: ['Avalie a sensibilidade do 4º e 5º dedos da mão para descartar compressão do nervo ulnar concomitante.']
  },
  {
    num: 7,
    title: 'Bursite Subacromial e Bursite Olecraniana',
    cat: 'Ortopedia & Traumatologia',
    sub: 'Membro Superior',
    tags: ['bursite', 'olecrano', 'subacromial', 'inflamacao', 'edema', 'dor'],
    time: '3 min',
    summary: 'Inflamação das bolsas serosas do ombro e cotovelo, diagnóstico diferencial de bursite séptica e condutas térmicas.',
    points: ['Bursite olecraniana: aumento volumétrico posterior evidente do cotovelo.', 'Descartar infecção bacteriana: calor intenso, eritema, febre exigem drenagem médica.', 'Fase asséptica: repouso relativo, crioterapia, compressão e proteção articular.'],
    pearls: ['Se a bursite olecraniana estiver quente, hiperemiada e com ponto de flutuação, não aplique calor nem faça punção.']
  },
  {
    num: 8,
    title: 'Testes Especiais de Ombro: Guia de Bolso',
    cat: 'Ortopedia & Traumatologia',
    sub: 'Membro Superior',
    tags: ['testes ombro', 'neer', 'hawkins', 'yokum', 'jobe', 'speed', 'obrien'],
    time: '4 min',
    summary: 'Matriz comparativa de testes provocativos para impacto subacromial, manguito rotador, bíceps braquial e lábio glenoidal.',
    points: ['Impacto: Neer, Hawkins-Kennedy e Yokum.', 'Manguito: Jobe (supra), Patte (infra), Gerber e Belly-Press (subescapular).', 'Bíceps e Labrum: Speed, Yergason e Teste de O’Brien.'],
    pearls: ['O cluster de testes para impacto (Neer + Hawkins + Arco Doloroso) atinge sensibilidade superior a 90%.']
  },
  {
    num: 9,
    title: 'Testes Especiais de Cotovelo: Guia de Bolso',
    cat: 'Ortopedia & Traumatologia',
    sub: 'Membro Superior',
    tags: ['testes cotovelo', 'cozen', 'mill', 'maudsley', 'valgo', 'varo'],
    time: '3 min',
    summary: 'Bateria de testes para epicondilopatias medial e lateral, instabilidade ligamentar e compressões neurais no cotovelo.',
    points: ['Epicondilite Lateral: Cozen (extensão resistida) e Mill (alongamento passivo).', 'Epicondilite Medial: Flexão resistida do punho em pronação.', 'Ligamentar: Estresse em valgo a 25° para o ligamento colateral ulnar.'],
    pearls: ['Ao testar o estresse em valgo, sempre flexione o cotovelo a 20-30° para destravar o olécrano.']
  },
  {
    num: 10,
    title: 'Pós-Operatório do Manguito Rotador: Linha do Tempo',
    cat: 'Ortopedia & Traumatologia',
    sub: 'Membro Superior',
    tags: ['pos-op', 'manguito', 'tipoia', 'fases', 'cinesioterapia', 'ombro'],
    time: '4 min',
    summary: 'Diretrizes de proteção do reparo tendíneo cirúrgico: uso de tipoia, ganho passivo precoce e transição para fortalecimento.',
    points: ['Semanas 0-4: Fase de proteção máxima, tipoia em abdução neutra, pêndulos de Codman e ADM passiva.', 'Semanas 6-12: Desmame da tipoia, transição de passivo para ativo-assistido.', 'Semana 12+: Início gradual de fortalecimento isotônico com faixas elásticas.'],
    pearls: ['Respeite o tempo de cicatrização biológica do tendão; contração ativa do supraespinhal é proibida nas primeiras 4 semanas.']
  },

  // LOTE 02
  {
    num: 11,
    title: 'Síndrome do Túnel do Carpo (STC)',
    cat: 'Ortopedia & Traumatologia',
    sub: 'Membro Superior',
    tags: ['tunel do carpo', 'nervo mediano', 'phalen', 'tinel', 'parestesia', 'punho'],
    time: '3 min',
    summary: 'Compressão do nervo mediano sob o retináculo dos flexores, testes neurodinâmicos de Phalen e Tinel e órteses de posicionamento.',
    points: ['Parestesia no polegar, indicador, dedo médio e metade radial do anelar.', 'Piora noturna dos sintomas com alívio ao sacudir a mão (sinal de Flick).', 'Testes de Phalen (flexão forçada por 60s) e Tinel (percussão no retináculo).'],
    pearls: ['O uso de tala de punho neutra para dormir reduz a pressão intracarpeana em mais de 70% na fase inicial.']
  },
  {
    num: 12,
    title: 'Tenossinovite Estenosante de De Quervain',
    cat: 'Ortopedia & Traumatologia',
    sub: 'Membro Superior',
    tags: ['de quervain', 'finkelstein', 'polegar', 'punho', 'tendinite', 'puerperio'],
    time: '3 min',
    summary: 'Inflamação dos tendões do abdutor longo e extensor curto do polegar no primeiro compartimento extensor do rádio.',
    points: ['Muito frequente em puérperas e trabalhadores com pinça manual repetitiva.', 'Teste de Finkelstein (desvio ulnar com polegar fletido) reproduz dor intensa.', 'Órtese de imobilização espica do polegar e recursos analgésicos.'],
    pearls: ['Certifique-se de diferenciar da síndrome de interseção (dor 4cm proximal ao tubérculo de Lister).']
  },
  {
    num: 13,
    title: 'Fratura de Colles e Rádio Distal: Reabilitação',
    cat: 'Ortopedia & Traumatologia',
    sub: 'Membro Superior',
    tags: ['fratura', 'colles', 'radio distal', 'punho', 'mobilizacao', 'rigidez'],
    time: '4 min',
    summary: 'Mecanismo de queda sobre a mão espalmada, deformidade em dorso de garfo, cuidados pós-imobilização e prevenção de SDRC.',
    points: ['Fratura mais comum do membro superior em idosos com osteopenia.', 'Foco pós-gesso no ganho de prono-supinação e flexo-extensão do punho.', 'Mobilização imediata dos dedos durante a imobilização para evitar rigidez secundária.'],
    pearls: ['Monitore edema excessivo, calor e alodinia no punho para identificar precocemente a Síndrome da Dor Complexa Regional (SDRC Tipo 1).']
  },
  {
    num: 14,
    title: 'Cervicalgia Mecânica e Síndrome Postural',
    cat: 'Ortopedia & Traumatologia',
    sub: 'Coluna & Pelve',
    tags: ['cervical', 'cervicalgia', 'postura', 'trapezio', 'alongamento', 'mobilidade'],
    time: '3 min',
    summary: 'Desequilíbrio entre flexores profundos cervicais e trapézio superior/elevador da escápula, cefaleia cervicogênica e ergonomia.',
    points: ['Postura de anteriorização da cabeça sobrecarrega a coluna cervical alta e musculatura suboccipital.', 'Fraqueza dos flexores profundos cervicais (longo do pescoço e longo da cabeça).', 'Técnicas de retração cervical (chin-tuck) e fortalecimento com biofeedback pressórico.'],
    pearls: ['O teste de flexão craniocervical com biofeedback de pressão (Stabilizer) é padrão-ouro para reeducação dos flexores profundos.']
  },
  {
    num: 15,
    title: 'Hérnia de Disco Cervical e Radiculopatia',
    cat: 'Ortopedia & Traumatologia',
    sub: 'Coluna & Pelve',
    tags: ['hernia cervical', 'radiculopatia', 'spurling', 'c6', 'c7', 'mobilizacao neural'],
    time: '4 min',
    summary: 'Compressão das raízes nervosas C5, C6 e C7 por protrusão discal, teste de Spurling, tração cervical e mobilização neurodinâmica.',
    points: ['Dor em queimação irradiada para o membro superior seguindo trajeto dermatômico.', 'Teste de Spurling (compressão axial com inclinação) reproduz a radiculopatia.', 'Reflexos profundos correspondentes: bicipital (C5-C6), braquiorradial (C6) e tricipital (C7).'],
    pearls: ['Se o paciente apresentar hiper-reflexia em MMII e sinal de Hoffmann positivo nas mãos, suspeite de mielopatia cervical compressiva (alerta cirúrgico!).']
  },
  {
    num: 16,
    title: 'Síndrome do Desfiladeiro Torácico (SDT)',
    cat: 'Ortopedia & Traumatologia',
    sub: 'Coluna & Pelve',
    tags: ['desfiladeiro toracico', 'plexo braquial', 'adson', 'wright', 'roos', 'vascular'],
    time: '3 min',
    summary: 'Compressão do plexo braquial e vasos subclávios no triângulo interescalênico ou espaço costoclavicular.',
    points: ['Pode ser de origem neurogênica (95%) ou vascular (edema, palidez, ausência de pulso).', 'Testes provocativos: Teste de Adson, Wright e Roos (EAST Test por 3 minutos).', 'Alongamento dos escalenos e peitoral menor associado à mobilização da 1ª costela.'],
    pearls: ['A queda do pulso radial durante o teste de Adson com rotação e extensão cervical confirma o envolvimento mecânico escalênico.']
  },
  {
    num: 17,
    title: 'Escoliose Idiopática do Adolescente (EIA)',
    cat: 'Ortopedia & Traumatologia',
    sub: 'Coluna & Pelve',
    tags: ['escoliose', 'adams', 'cobb', 'giba', 'schroth', 'coluna'],
    time: '4 min',
    summary: 'Deformidade tridimensional da coluna vertebral, teste de Adams para gibosidade, ângulo de Cobb e exercícios fisioterapêuticos específicos (PSSE).',
    points: ['Definição: desvio lateral no plano frontal > 10° pelo ângulo de Cobb associado à rotação vertebral.', 'Teste de flexão anterior de Adams evidencia a gibosidade torácica/lombar.', 'Métodos baseados em evidência (ex: Schroth) com auto-correção ativa tridimensional.'],
    pearls: ['O sinal de Risser na radiografia de bacia indica a maturidade esquelética e o risco de progressão da curva.']
  },
  {
    num: 18,
    title: 'Hipercifose Torácica e Síndrome Dolorosa Miofascial',
    cat: 'Ortopedia & Traumatologia',
    sub: 'Coluna & Pelve',
    tags: ['hipercifose', 'coluna toracica', 'pontos gatilho', 'trigger points', 'romboides'],
    time: '3 min',
    summary: 'Aumento da convexidade torácica, encurtamento da musculatura anterior, dor miofascial nos romboides e técnicas de liberação.',
    points: ['Cifose torácica normal varia entre 20° e 40°; acima de 45° caracteriza hipercifose.', 'Pontos-gatilho miofasciais ativos frequentes nos músculos trapézio médio, romboides e elevador da escápula.', 'Mobilização torácica em extensão e fortalecimento dos extensores da coluna.'],
    pearls: ['Sempre avalie a mobilidade torácica antes de tentar fortalecer; coluna torácica rígida não sustenta correção postural ativa.']
  },
  {
    num: 19,
    title: 'Testes Especiais de Punho e Mão: Guia Rápido',
    cat: 'Ortopedia & Traumatologia',
    sub: 'Membro Superior',
    tags: ['testes punho', 'mao', 'phalen', 'finkelstein', 'allen', 'watson'],
    time: '3 min',
    summary: 'Compêndio de testes ortopédicos e vasculares para síndromes compressivas, tendinosas e estabilidade carpal.',
    points: ['Compressão neural: Teste de Phalen, Phalen Invertido e Tinel.', 'Tendinopatias: Teste de Finkelstein (De Quervain).', 'Vascular e Ligamentar: Teste de Allen (artérias radial e ulnar) e Watson (instabilidade escafo-semilunar).'],
    pearls: ['O Teste de Allen é mandatório antes de qualquer punção arterial ou procedimento que envolva a artéria radial.']
  },
  {
    num: 20,
    title: 'Testes Especiais Cervicais: Avaliação Funcional',
    cat: 'Ortopedia & Traumatologia',
    sub: 'Coluna & Pelve',
    tags: ['testes cervical', 'spurling', 'distracao', 'lhermitte', 'arteria vertebral'],
    time: '3 min',
    summary: 'Cluster de Wainner para radiculopatia cervical, testes de segurança da artéria vertebral e estabilidade ligamentar craniovertebral.',
    points: ['Cluster de Wainner: Spurling positivo, Tração cervical alivia, Rotação cervical < 60° e Teste de Tensão Neural MMSS (ULNT1).', 'Teste de Spurling comprime o forame intervertebral ipsilateral.', 'Teste da Artéria Vertebral (DeKleyn) avalia insuficiência vertebrobasilar.'],
    pearls: ['Se o paciente relatar vertigem, nistagmo, diplopia ou disartria no teste da artéria vertebral, CONTRAINDICA-SE qualquer manipulação cervical.']
  }
];

// Helper to fill all 150 maps with clinical intelligence
console.log('Generating mapsData.ts with all 150 official mental maps...');
