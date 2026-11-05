import { MindMap, SoapRecord, InternshipShift } from '../types';
import { INITIAL_MIND_MAPS } from '../data/mapsData';

const STORAGE_KEYS = {
  FAVORITES: 'fisiopocket_favorites_v1',
  CUSTOM_MAPS: 'fisiopocket_custom_maps_v1',
  SOAP_HISTORY: 'fisiopocket_soap_history_v1',
  SHIFTS: 'fisiopocket_shifts_v1',
  TARGET_HOURS: 'fisiopocket_target_hours_v1',
  STUDENT_PROFILE: 'fisiopocket_student_profile_v1',
};

export const StorageService = {
  // Favorites
  getFavorites(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : ['map-01', 'map-06']; // default 2 favorites for demonstration
    } catch {
      return ['map-01', 'map-06'];
    }
  },

  toggleFavorite(id: string): string[] {
    const favorites = this.getFavorites();
    let updated: string[];
    if (favorites.includes(id)) {
      updated = favorites.filter(favId => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    return updated;
  },

  // Custom Maps & Merged Maps
  getCustomMaps(): MindMap[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_MAPS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  getAllMaps(): MindMap[] {
    const custom = this.getCustomMaps();
    return [...custom, ...INITIAL_MIND_MAPS];
  },

  addCustomMap(map: Omit<MindMap, 'id' | 'createdAt' | 'isCustom'>): MindMap {
    const newMap: MindMap = {
      ...map,
      id: `custom-map-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      isCustom: true,
    };
    const custom = this.getCustomMaps();
    const updated = [newMap, ...custom];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_MAPS, JSON.stringify(updated));
    return newMap;
  },

  deleteCustomMap(id: string): void {
    const custom = this.getCustomMaps();
    const updated = custom.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_MAPS, JSON.stringify(updated));
  },

  // SOAP Records
  getSoapHistory(): SoapRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SOAP_HISTORY);
      if (data) return JSON.parse(data);

      // Seed with 1 realistic initial hospital evolution
      const defaultRecord: SoapRecord = {
        id: 'soap-demo-1',
        patientName: 'José Carlos da Silva',
        age: '64 anos',
        bed: 'Leito 12 - UTI Adulto',
        diagnosis: 'Pneumonia Bacteriana Adquirida na Comunidade + DPOC Agudizado',
        date: new Date().toLocaleDateString('pt-BR'),
        time: '10:45',
        subjective: {
          complaints: ['Dispneia moderada aos mínimos esforços', 'Tosse produtiva'],
          customText: 'Paciente lúcido, orientado no tempo e espaço, refere leve cansaço ao falar.'
        },
        objective: {
          vitals: {
            pa: '125/80 mmHg',
            fc: '82 bpm',
            fr: '20 irpm',
            spo2: '95% em Cateter Nasal O2 a 2 L/min',
            temp: '36.6 °C',
            dorEva: '2'
          },
          findings: [
            'Murmúrio vesicular presente bilateralmente com roncos difusos em terço médio',
            'Padrão respiratório tóraco-abdominal coordenado'
          ],
          conducts: [
            'Higiene brônquica: Drenagem postural modificada e expiração lenta total com a glote aberta (ELTGOL)',
            'Tosse dirigida assistida com eliminação de secreção mucopurulenta moderada',
            'Cinesioterapia motora ativa com cicloergômetro de MMII (15 min, sem desnaturação)'
          ],
          customText: 'Ausculta pulmonar pós-conduta limpa em terço médio, sem roncos residuais.'
        },
        assessment: {
          status: 'Quadro respiratório e motor estável com boa resposta à desobstrução brônquica.',
          evolution: 'Evolui cooperativo, mantendo estabilidade hemodinâmica durante e após o atendimento.',
          customText: ''
        },
        plan: {
          goals: ['Manter vias aéreas pérvias', 'Desmame gradual do oxigênio suplementar para ar ambiente'],
          nextConducts: ['Estimular deambulação supervisionada no corredor no período vespertino'],
          customText: ''
        },
        studentName: 'Acadêmico(a) de Fisioterapia',
        crefitoOrRa: 'RA: 20241088 / Sob supervisão Prof. Dra. Camila Prado',
        compiledText: `EVOLUÇÃO FISIOTERAPÊUTICA HOSPITALAR\nData: ${new Date().toLocaleDateString('pt-BR')} às 10:45 | Leito 12 - UTI Adulto\nPaciente: José Carlos da Silva (64 anos)\nDiagnóstico: Pneumonia Bacteriana Adquirida na Comunidade + DPOC Agudizado\n\n[S - SUBJETIVO]\nPaciente refere: Dispneia moderada aos mínimos esforços; Tosse produtiva.\nPaciente lúcido, orientado no tempo e espaço, refere leve cansaço ao falar.\n\n[O - OBJETIVO]\nSinais Vitais: PA: 125/80 mmHg | FC: 82 bpm | FR: 20 irpm | SpO2: 95% em Cateter Nasal O2 a 2 L/min | Temp: 36.6 °C | Dor (EVA): 2/10.\nAchados: Murmúrio vesicular presente bilateralmente com roncos difusos em terço médio; Padrão respiratório tóraco-abdominal coordenado.\nCondutas Realizadas: Higiene brônquica: Drenagem postural modificada e expiração lenta total com a glote aberta (ELTGOL); Tosse dirigida assistida com eliminação de secreção mucopurulenta moderada; Cinesioterapia motora ativa com cicloergômetro de MMII (15 min, sem desnaturação).\n\n[A - AVALIAÇÃO]\nQuadro respiratório e motor estável com boa resposta à desobstrução brônquica. Evolui cooperativo, mantendo estabilidade hemodinâmica durante e após o atendimento.\n\n[P - PLANO]\nMetas: Manter vias aéreas pérvias; Desmame gradual do oxigênio suplementar para ar ambiente.\nPróxima conduta: Estimular deambulação supervisionada no corredor no período vespertino.\n\nAcadêmico(a) de Fisioterapia - RA: 20241088 / Sob supervisão Prof. Dra. Camila Prado`
      };
      return [defaultRecord];
    } catch {
      return [];
    }
  },

  saveSoapRecord(record: SoapRecord): SoapRecord[] {
    const history = this.getSoapHistory();
    const updated = [record, ...history];
    localStorage.setItem(STORAGE_KEYS.SOAP_HISTORY, JSON.stringify(updated));
    return updated;
  },

  deleteSoapRecord(id: string): SoapRecord[] {
    const history = this.getSoapHistory();
    const updated = history.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.SOAP_HISTORY, JSON.stringify(updated));
    return updated;
  },

  // Internship Shifts
  getShifts(): InternshipShift[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SHIFTS);
      if (data) return JSON.parse(data);

      // Seed initial shifts for realistic progress view
      const demoShifts: InternshipShift[] = [
        {
          id: 'shift-1',
          date: '2026-03-02',
          location: 'Hospital Geral Universitário',
          sector: 'UTI Geral Adulto',
          preceptor: 'Dra. Mariana Costa (CREFITO-3 12458-F)',
          hours: 6,
          notes: 'Round matinal, gasometrias, 4 desmames de VM, mobilização precoce no leito.',
          casesCount: 6
        },
        {
          id: 'shift-2',
          date: '2026-03-04',
          location: 'Hospital Geral Universitário',
          sector: 'Enfermaria Respiratória',
          preceptor: 'Dr. Thiago Ribeiro (CREFITO-3 89745-F)',
          hours: 6,
          notes: 'Desobstrução brônquica em pós-COVID e DPOC agudizado, treino de marcha no corredor.',
          casesCount: 8
        },
        {
          id: 'shift-3',
          date: '2026-03-09',
          location: 'Clínica Escola Integrada',
          sector: 'Ambulatório de Ortopedia & Traumato',
          preceptor: 'Prof. Ricardo Mendes',
          hours: 4,
          notes: 'Pós-op LCA semitendíneo semana 3, impacto subacromial fase 2, fascite plantar.',
          casesCount: 5
        },
        {
          id: 'shift-4',
          date: '2026-03-11',
          location: 'Clínica Escola Integrada',
          sector: 'Ambulatório de Neurologia Adulto',
          preceptor: 'Profa. Dra. Camila Prado',
          hours: 4,
          notes: 'Paciente AVE isquêmico crônico com treino de equilíbrio em esteira com suporte e TCI.',
          casesCount: 4
        }
      ];
      return demoShifts;
    } catch {
      return [];
    }
  },

  saveShift(shift: Omit<InternshipShift, 'id'>): InternshipShift[] {
    const newShift: InternshipShift = {
      ...shift,
      id: `shift-${Date.now()}`
    };
    const current = this.getShifts();
    const updated = [newShift, ...current];
    localStorage.setItem(STORAGE_KEYS.SHIFTS, JSON.stringify(updated));
    return updated;
  },

  deleteShift(id: string): InternshipShift[] {
    const current = this.getShifts();
    const updated = current.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SHIFTS, JSON.stringify(updated));
    return updated;
  },

  getTargetHours(): number {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TARGET_HOURS);
      return data ? parseInt(data, 10) : 400; // default 400h
    } catch {
      return 400;
    }
  },

  setTargetHours(hours: number): void {
    localStorage.setItem(STORAGE_KEYS.TARGET_HOURS, hours.toString());
  },

  getProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STUDENT_PROFILE);
      return data ? JSON.parse(data) : { name: 'Acadêmico(a) de Fisioterapia', ra: 'RA: 20241088', university: 'Universidade de Saúde' };
    } catch {
      return { name: 'Acadêmico(a) de Fisioterapia', ra: 'RA: 20241088', university: 'Universidade de Saúde' };
    }
  },

  setProfile(profile: { name: string; ra: string; university: string }) {
    localStorage.setItem(STORAGE_KEYS.STUDENT_PROFILE, JSON.stringify(profile));
  }
};
