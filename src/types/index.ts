export type CategoryType =
  | 'Ortopedia & Traumatologia'
  | 'Fisioterapia Neurofuncional'
  | 'Fisioterapia Respiratória & UTI'
  | 'Cardiorrespiratória & Fisiologia'
  | 'Anatomia & Cinesiologia'
  | 'Pediatria & Saúde da Mulher'
  | 'Prática Clínica & Round';

export interface MindMap {
  id: string;
  title: string;
  category: CategoryType;
  subCategory: string;
  tags: string[];
  readTime: string; // e.g. "3 min"
  fileType: 'image' | 'pdf';
  fileUrl: string;
  thumbnailUrl: string;
  summary: string;
  keyPoints: string[];
  clinicalPearls: string[];
  createdAt: string;
  isCustom?: boolean;
}

export type JointType = 'Ombro' | 'Joelho' | 'Coluna' | 'Quadril' | 'Tornozelo' | 'Cotovelo' | 'Punho';

export interface SpecialTest {
  id: string;
  name: string;
  joint: JointType;
  objective: string;
  patientPosition: string;
  therapistPosition: string;
  maneuver: string;
  positiveSign: string;
  clinicalNotes?: string;
  sensitivity?: string;
  specificity?: string;
}

export interface SoapRecord {
  id: string;
  patientName: string;
  age?: string;
  bed?: string;
  diagnosis: string;
  date: string;
  time: string;
  subjective: {
    complaints: string[];
    customText: string;
  };
  objective: {
    vitals: {
      pa: string;
      fc: string;
      fr: string;
      spo2: string;
      temp: string;
      dorEva: string;
    };
    findings: string[];
    conducts: string[];
    customText: string;
  };
  assessment: {
    status: string;
    evolution: string;
    customText: string;
  };
  plan: {
    goals: string[];
    nextConducts: string[];
    customText: string;
  };
  studentName: string;
  crefitoOrRa: string;
  compiledText: string;
}

export interface InternshipShift {
  id: string;
  date: string;
  location: string;
  sector: string;
  preceptor: string;
  hours: number;
  notes: string;
  casesCount?: number;
}
