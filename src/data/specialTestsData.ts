import { SpecialTest, JointType } from '../types';

export const SPECIAL_TESTS_DATA: SpecialTest[] = [
  // --- OMBRO ---
  {
    id: 'test-neer',
    name: 'Teste de Neer',
    joint: 'Ombro',
    objective: 'Identificar síndrome do impacto subacromial (compressão do tendão do supraespinhal e bursa sob o arco coracoacromial).',
    patientPosition: 'Sentado ou em pé com o braço relaxado ao lado do corpo.',
    therapistPosition: 'Em pé, ao lado ou atrás do paciente. Uma mão estabiliza a escápula superiormente.',
    maneuver: 'Com a escápula estabilizada, o terapeuta realiza uma elevação anterior passiva rápida e forçada do membro superior em rotação interna máxima.',
    positiveSign: 'Reprodução da dor anterior/lateral do ombro, geralmente entre 70° e 120° de flexão.',
    clinicalNotes: 'A rotação interna posiciona a tuberosidade maior contra a superfície anteroinferior do acrômio.',
    sensitivity: '79%',
    specificity: '53%'
  },
  {
    id: 'test-hawkins',
    name: 'Teste de Hawkins-Kennedy',
    joint: 'Ombro',
    objective: 'Avaliar impacto subacromial secundário e tendinopatia do supraespinhal.',
    patientPosition: 'Sentado ou em pé.',
    therapistPosition: 'Em pé, de frente para o paciente.',
    maneuver: 'O examinador flexiona passivamente o ombro a 90° e o cotovelo a 90°. Em seguida, realiza rotação interna passiva forçada e rápida do úmero.',
    positiveSign: 'Dor na região subacromial ou na face súpero-lateral do ombro durante a rotação interna.',
    clinicalNotes: 'Muito sensível para impacto subacromial. Frequentemente combinado com Neer e Arco Doloroso.',
    sensitivity: '80%',
    specificity: '56%'
  },
  {
    id: 'test-jobe',
    name: 'Teste de Jobe (Empty Can Test)',
    joint: 'Ombro',
    objective: 'Testar a integridade estrutural e funcional do músculo e tendão supraespinhal.',
    patientPosition: 'Em pé ou sentado.',
    therapistPosition: 'De frente para o paciente.',
    maneuver: 'Braços abduzidos a 90° no plano da escápula (30° anterior ao plano frontal), em rotação interna total (polegares apontados para o chão). O examinador aplica força descendente nos antebraços enquanto o paciente resiste.',
    positiveSign: 'Dor referida no trajeto do supraespinhal ou incapacidade evidente de manter a posição contra a resistência imposta (fraqueza acentuada).',
    clinicalNotes: 'Fraqueza sem dor sugere ruptura completa do tendão; dor com força preservada sugere tendinopatia.',
    sensitivity: '89%',
    specificity: '68%'
  },
  {
    id: 'test-patte',
    name: 'Teste de Patte (Infraspinatus Test)',
    joint: 'Ombro',
    objective: 'Avaliar tendinopatia ou ruptura do músculo infraespinhal e redondo menor.',
    patientPosition: 'Sentado ereto.',
    therapistPosition: 'Ao lado ou atrás do paciente, sustentando o cotovelo a 90° de abdução no plano escapular.',
    maneuver: 'O examinador solicita rotação externa do ombro contra a resistência de sua mão posicionada no dorso do punho do paciente.',
    positiveSign: 'Dor ou incapacidade de realizar e manter a rotação externa contra a resistência imposta.',
    clinicalNotes: 'O sinal da queda (Lag Sign em RE) ocorre quando o paciente não consegue manter a rotação externa passiva.',
    sensitivity: '84%',
    specificity: '78%'
  },
  {
    id: 'test-gerber',
    name: 'Teste de Gerber (Lift-Off Test)',
    joint: 'Ombro',
    objective: 'Avaliar a integridade do músculo e tendão subescapular.',
    patientPosition: 'Em pé com o dorso da mão apoiado na região lombar média (rotação interna máxima).',
    therapistPosition: 'Atrás do paciente.',
    maneuver: 'Solicita-se ao paciente afastar ativamente o dorso da mão das costas. Se conseguir, o examinador aplica leve resistência contra o dorso da mão.',
    positiveSign: 'Incapacidade de afastar a mão das costas ou de resistir à pressão do examinador.',
    clinicalNotes: 'Se o paciente não conseguir atingir a posição por dor ou rigidez, utilize o Belly-Press Test.',
    sensitivity: '80%',
    specificity: '92%'
  },
  {
    id: 'test-yergason',
    name: 'Teste de Yergason',
    joint: 'Ombro',
    objective: 'Verificar tendinopatia do cabo longo do bíceps ou instabilidade no sulco intertubercular.',
    patientPosition: 'Sentado com braço junto ao tronco e cotovelo flexionado a 90°, antebraço pronado.',
    therapistPosition: 'De frente, com uma mão segurando o punho e a outra palpando o sulco bicipital.',
    maneuver: 'O paciente tenta supinar ativamente o antebraço e flexionar o cotovelo contra a resistência máxima imposta pelo examinador.',
    positiveSign: 'Dor localizada precisamente no sulco bicipital ou sensação audível de ressalto do tendão.',
    clinicalNotes: 'Alta especificidade quando combinado com o Teste de Speed.',
    sensitivity: '63%',
    specificity: '89%'
  },

  // --- JOELHO ---
  {
    id: 'test-lachman',
    name: 'Teste de Lachman',
    joint: 'Joelho',
    objective: 'Avaliar a integridade das bandas anteromedial e posterolateral do Ligamento Cruzado Anterior (LCA).',
    patientPosition: 'Decúbito dorsal com joelho flexionado entre 20° e 30° e musculatura completamente relaxada.',
    therapistPosition: 'Ao lado do membro testado. Uma mão segura e estabiliza o fêmur distal; a outra segura a tíbia proximal posteriormente.',
    maneuver: 'O terapeuta aplica uma translação anterior rápida e firme na tíbia em relação ao fêmur estabilizado.',
    positiveSign: 'Translação anterior excessiva da tíbia com desfecho suave, elástico ou ausência de ponto final rígido (hard end-feel).',
    clinicalNotes: 'Considerado o teste clínico padrão-ouro mais sensível para ruptura de LCA no pós-trauma agudo.',
    sensitivity: '87%',
    specificity: '93%'
  },
  {
    id: 'test-gaveta-ant',
    name: 'Teste de Gaveta Anterior',
    joint: 'Joelho',
    objective: 'Detectar insuficiência ou ruptura do Ligamento Cruzado Anterior.',
    patientPosition: 'Decúbito dorsal com quadril a 45° e joelho a 90° de flexão, pé fixo sobre a maca.',
    therapistPosition: 'Sentado levemente sobre o antepé do paciente para fixá-lo. Ambas as mãos abraçam a tíbia proximal com polegares no platô anterior.',
    maneuver: 'Traciona-se vigorosamente a tíbia anteriormente em sentido anterior ao eixo do fêmur.',
    positiveSign: 'Deslocamento anterior excessivo da tíbia (> 6 mm de diferença em relação ao lado contralateral) com perda do batente rígido.',
    clinicalNotes: 'A contração protetora dos isquiotibiais em pacientes agudos pode gerar falso-negativo.',
    sensitivity: '70%',
    specificity: '95%'
  },
  {
    id: 'test-gaveta-post',
    name: 'Teste de Gaveta Posterior',
    joint: 'Joelho',
    objective: 'Avaliar a integridade do Ligamento Cruzado Posterior (LCP).',
    patientPosition: 'Decúbito dorsal, joelho a 90° e quadril a 45°.',
    therapistPosition: 'Sentado sobre o antepé do paciente. Mãos na tíbia proximal anterior.',
    maneuver: 'Empurra-se a tíbia proximal diretamente para trás (posteriormente).',
    positiveSign: 'Translação posterior aumentada da tíbia com perda do contorno anterior normal do joelho.',
    clinicalNotes: 'Sempre observe previamente o sinal da queda posterior da tíbia (Godfrey Test) para não confundir com falsa gaveta anterior.',
    sensitivity: '90%',
    specificity: '99%'
  },
  {
    id: 'test-mcmurray',
    name: 'Teste de McMurray',
    joint: 'Joelho',
    objective: 'Identificar lesões e rupturas nos meniscos medial e lateral.',
    patientPosition: 'Decúbito dorsal, membro inferior completamente relaxado.',
    therapistPosition: 'Ao lado do paciente; uma mão palpa a interlinha articular do joelho e a outra segura o calcâneo/pé.',
    maneuver: 'Flexiona-se o joelho ao máximo. Para testar o menisco medial: rotação externa da tíbia + estresse em valgo enquanto estende o joelho. Para o lateral: rotação interna da tíbia + estresse em varo enquanto estende.',
    positiveSign: 'Estalido palpável/audível doloroso acompanhado de dor no nível da interlinha articular testada.',
    clinicalNotes: 'Mais fidedigno em lesões de corno posterior do menisco.',
    sensitivity: '71%',
    specificity: '87%'
  },
  {
    id: 'test-apley',
    name: 'Teste de Compressão e Tração de Apley',
    joint: 'Joelho',
    objective: 'Diferenciar lesão meniscal de lesão ligamentar colateral.',
    patientPosition: 'Decúbito ventral com o joelho flexionado a 90°.',
    therapistPosition: 'Ao lado do paciente, estabilizando a coxa posterior com o próprio joelho.',
    maneuver: '1) Compressão axial sobre o calcanhar combinada com rotações interna e externa da tíbia. 2) Tração vertical com rotações.',
    positiveSign: 'Dor aumentada durante a compressão indica lesão meniscal; dor durante a tração isolada indica lesão capsuloligamentar.',
    clinicalNotes: 'Excelente teste complementar quando o McMurray é duvidoso.',
    sensitivity: '60%',
    specificity: '80%'
  },

  // --- COLUNA & PELVE ---
  {
    id: 'test-lasegue',
    name: 'Teste de Lasègue (Elevação da Perna Reta)',
    joint: 'Coluna',
    objective: 'Identificar compressão, estiramento ou irritação da raiz nervosa ciática (L4-S2) por hérnia discal.',
    patientPosition: 'Decúbito dorsal em repouso sem travesseiro.',
    therapistPosition: 'Ao lado do membro avaliado, segurando o tornozelo posterior com a outra mão sobre o joelho para mantê-lo em extensão.',
    maneuver: 'Elevação lenta e passiva do membro inferior com joelho estendido até o aparecimento de sintomas.',
    positiveSign: 'Reprodução da dor ciática irradiada típica (abaixo do joelho até o pé) entre 30° e 70° de angulação.',
    clinicalNotes: 'Dor lombar isolada ou tensão na panturrilha não constituem teste positivo. Confirme com dorsiflexão do tornozelo (Manobra de Braggard).',
    sensitivity: '91%',
    specificity: '42%'
  },
  {
    id: 'test-slump',
    name: 'Slump Test (Teste de Colapso Neural)',
    joint: 'Coluna',
    objective: 'Avaliar a mecanossensibilidade do neuroeixo e canal vertebral lombar.',
    patientPosition: 'Sentado à beira da maca com as mãos entrelaçadas atrás das costas.',
    therapistPosition: 'Ao lado do paciente para guiar a progressão de tensão neural.',
    maneuver: 'Seqüência: 1) Flexão toracolombar (colapso); 2) Flexão cervical com overpressure; 3) Extensão passiva do joelho; 4) Dorsiflexão do tornozelo; 5) Alívio da flexão cervical.',
    positiveSign: 'Reprodução dos sintomas radiculares durante as manobras com alívio imediato da dor ao desfaer a flexão cervical.',
    clinicalNotes: 'Se a extensão cervical aliviar a dor na perna, a causa do sintoma é indiscutivelmente neurodinâmica.',
    sensitivity: '84%',
    specificity: '83%'
  },
  {
    id: 'test-patrick',
    name: 'Teste de Patrick / FABERE',
    joint: 'Coluna',
    objective: 'Diferenciar disfunção da articulação sacroilíaca de patologia coxofemoral.',
    patientPosition: 'Decúbito dorsal.',
    therapistPosition: 'Ao lado do paciente.',
    maneuver: 'Posiciona-se o membro testado em Flexão, ABdução e Rotação Externa (FABERE - maléolo lateral apoiado no joelho oposto, formato número 4). O examinador estabiliza a EIAS contralateral e aplica pressão para baixo sobre o joelho flexionado.',
    positiveSign: 'Dor profunda na nádega/região sacroilíaca posterior (disfunção SI) ou na virilha anterior (patologia do quadril).',
    clinicalNotes: 'A localização da dor refere o sítio primário anatômico da disfunção.',
    sensitivity: '77%',
    specificity: '88%'
  },

  // --- QUADRIL ---
  {
    id: 'test-thomas',
    name: 'Teste de Thomas',
    joint: 'Quadril',
    objective: 'Avaliar encurtamento do músculo iliopsoas, reto femoral e tensor da fáscia lata.',
    patientPosition: 'Decúbito dorsal na extremidade distal da maca.',
    therapistPosition: 'Ao lado do paciente.',
    maneuver: 'O paciente flexiona ativamente um quadril até o tronco para retificar a coluna lombar. O outro membro permanece livre pendendo na maca.',
    positiveSign: 'A coxa oposta se eleva da superfície da maca (flexão do quadril = iliopsoas encurtado) ou o joelho não atinge 90° de flexão (reto femoral encurtado).',
    clinicalNotes: 'Se houver abdução simultânea do membro, teste positivo para banda iliotibial/TFL (Sinal de Janda).',
    sensitivity: '89%',
    specificity: '92%'
  },
  {
    id: 'test-trendelenburg',
    name: 'Teste de Trendelenburg',
    joint: 'Quadril',
    objective: 'Avaliar a competência mecânica e força do músculo glúteo médio ipsilateral em apoio monopodal.',
    patientPosition: 'Em pé, descalço.',
    therapistPosition: 'Atrás do paciente com olhar no nível das cristas ilíacas.',
    maneuver: 'Solicita-se ao paciente elevar um dos pés do chão e permanecer em apoio unipodal por 30 segundos.',
    positiveSign: 'Queda da pelve para o lado oposto ao membro que está apoiado no chão (lado que não tem peso).',
    clinicalNotes: 'Se o tronco inclinar-se para o lado que está apoiando para compensar, trata-se de Trendelenburg compensado.',
    sensitivity: '73%',
    specificity: '77%'
  },

  // --- TORNOZELO ---
  {
    id: 'test-thompson',
    name: 'Teste de Thompson (Simmonds)',
    joint: 'Tornozelo',
    objective: 'Detectar ruptura completa do tendão calcâneo (Tendão de Aquiles).',
    patientPosition: 'Decúbito ventral com os pés livres para fora da maca.',
    therapistPosition: 'Ao lado do paciente.',
    maneuver: 'O examinador comprime vigorosamente a massa muscular do tríceps sural (gastrocnêmios/sóleo) no terço médio da panturrilha.',
    positiveSign: 'Ausência de flexão plantar passiva do tornozelo ao comprimir a panturrilha.',
    clinicalNotes: 'Sinal patognomônico de ruptura total do tendão de Aquiles. Encaminhamento imediato ao cirurgião.',
    sensitivity: '96%',
    specificity: '98%'
  },
  {
    id: 'test-gaveta-ant-tornozelo',
    name: 'Gaveta Anterior do Tornozelo',
    joint: 'Tornozelo',
    objective: 'Avaliar a estabilidade e integridade do Ligamento Talofibular Anterior (LTFA) após entorse em inversão.',
    patientPosition: 'Sentado com perna relaxada ou decúbito dorsal com joelho levemente flexionado.',
    therapistPosition: 'Uma mão estabiliza a tíbia e fíbula distalmente; a outra envolve o calcanhar com o pé em leve flexão plantar (10°-15°).',
    maneuver: 'Traciona-se o calcâneo e tálus anteriormente em relação à tíbia fixa.',
    positiveSign: 'Translação anterior aumentada do tálus com sensação de folga articular ou sucção da pele anterior ("dimple sign").',
    clinicalNotes: 'LTFA é o ligamento mais comumente lesionado em entorses de tornozelo no esporte.',
    sensitivity: '73%',
    specificity: '84%'
  },

  // --- COTOVELO ---
  {
    id: 'test-cozen',
    name: 'Teste de Cozen (Epicondilite Lateral)',
    joint: 'Cotovelo',
    objective: 'Identificar tendinopatia dos extensores comuns do punho ("cotovelo de tenista", especialmente o extensor radial curto do carpo).',
    patientPosition: 'Sentado com antebraço pronado e cotovelo flexionado a 90° apoiado.',
    therapistPosition: 'Ao lado. O examinador palpa com o polegar o epicôndilo lateral enquanto a outra mão repousa no dorso da mão fechada do paciente.',
    maneuver: 'Com o punho pronado e desvio radial, o paciente realiza extensão ativa do punho contra a forte resistência imposta pelo examinador.',
    positiveSign: 'Dor aguda e súbita localizada precisamente sobre a origem comum no epicôndilo lateral.',
    clinicalNotes: 'Confirme com o Teste de Mill (alongamento passivo) e Teste de Maudsley (extensão resistida do 3º dedo).',
    sensitivity: '84%',
    specificity: '75%'
  },

  // --- PUNHO & MÃO ---
  {
    id: 'test-phalen',
    name: 'Teste de Phalen',
    joint: 'Punho',
    objective: 'Diagnóstico da Síndrome do Túnel do Carpo (compressão do nervo mediano sob o retináculo dos flexores).',
    patientPosition: 'Sentado ou em pé.',
    therapistPosition: 'De frente para o paciente.',
    maneuver: 'O paciente flexiona ambos os punhos a 90° e encosta o dorso das mãos com os dedos apontando para baixo, mantendo essa postura por 60 segundos ininterruptos.',
    positiveSign: 'Aparecimento ou exacerbação de parestesias (formigamento, dormência ou queimação) no território do nervo mediano (polegar, indicador, médio e metade radial do anelar).',
    clinicalNotes: 'Se o paciente não conseguir fletir o punho, utilize o Teste de Phalen Invertido (posição de prece).',
    sensitivity: '68%',
    specificity: '73%'
  },
  {
    id: 'test-tinel',
    name: 'Sinal de Tinel no Punho',
    joint: 'Punho',
    objective: 'Detectar regeneração ou compressão do nervo mediano no túnel do carpo.',
    patientPosition: 'Sentado com antebraço supinado apoiado na mesa.',
    therapistPosition: 'Ao lado do paciente.',
    maneuver: 'Percussão leve e rítmica com a ponta dos dedos ou martelo de reflexos sobre o retináculo dos flexores na face volar do punho.',
    positiveSign: 'Sensação de choque elétrico ou formigamento que se irradia distalmente para os dedos inervados pelo nervo mediano.',
    clinicalNotes: 'Excelente para correlacionar com o teste de Phalen no ambulatório.',
    sensitivity: '50%',
    specificity: '77%'
  },
  {
    id: 'test-finkelstein',
    name: 'Teste de Finkelstein',
    joint: 'Punho',
    objective: 'Identificar Tenossinovite Estenosante de De Quervain (músculos abdutor longo e extensor curto do polegar).',
    patientPosition: 'Sentado com antebraço apoiado em rotação neutra.',
    therapistPosition: 'Ao lado do paciente.',
    maneuver: 'O paciente flete o polegar na palma da mão e cerra os demais dedos sobre ele (punho fechado abraçando o polegar). Em seguida, realiza-se o desvio ulnar passivo e rápido do punho.',
    positiveSign: 'Dor excruciante aguda sobre o processo estiloide do rádio no primeiro compartimento extensor.',
    clinicalNotes: 'Manobra muito comum em puérperas devido à postura de amamentação e carregar o bebê.',
    sensitivity: '89%',
    specificity: '98%'
  }
];
