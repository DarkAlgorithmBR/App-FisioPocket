import React, { useState } from 'react';
import { X, UploadCloud, FileImage, Sparkles, Check, AlertCircle, Link as LinkIcon } from 'lucide-react';
import { MindMap, CategoryType } from '../types';
import { CATEGORIES_CONFIG, createMapSvg } from '../data/mapsData';

interface AdminUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMap: (map: Omit<MindMap, 'id' | 'createdAt' | 'isCustom'>) => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

const CATEGORY_NAMES = Object.keys(CATEGORIES_CONFIG) as CategoryType[];

export const AdminUploadModal: React.FC<AdminUploadModalProps> = ({
  isOpen,
  onClose,
  onAddMap,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('Ortopedia & Traumatologia');
  const [subCategory, setSubCategory] = useState(CATEGORIES_CONFIG['Ortopedia & Traumatologia'].subCategories[0]);
  const [tagsInput, setTagsInput] = useState('');
  const [readTime, setReadTime] = useState('3 min');
  const [summary, setSummary] = useState('');
  const [keyPointsInput, setKeyPointsInput] = useState('');
  const [clinicalPearl, setClinicalPearl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileType, setFileType] = useState<'image' | 'pdf'>('image');
  const [previewName, setPreviewName] = useState('');

  const handleCategoryChange = (newCat: CategoryType) => {
    setCategory(newCat);
    const subcats = CATEGORIES_CONFIG[newCat].subCategories;
    setSubCategory(subcats[0] || 'Geral');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewName(file.name);
    if (file.type.includes('pdf')) {
      setFileType('pdf');
    } else {
      setFileType('image');
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFileUrl(event.target.result as string);
        onShowToast(`Arquivo carregado: ${file.name}`, 'info');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      onShowToast('Por favor, digite o título do mapa mental.', 'error');
      return;
    }

    // Process tags
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    if (tags.length === 0) {
      tags.push(category.toLowerCase().split(' ')[0]);
    }

    // Process key points
    const keyPoints = keyPointsInput
      .split('\n')
      .map((k) => k.trim())
      .filter(Boolean);

    // If no custom file was uploaded or linked, generate a beautiful visual SVG template
    let finalFileUrl = fileUrl;
    if (!finalFileUrl) {
      finalFileUrl = createMapSvg(
        title,
        category,
        '#059669',
        '#0d9488',
        keyPoints.length > 0
          ? keyPoints
          : [
              'Conceitos clínicos e diretrizes da Associação de Fisioterapia.',
              'Semiologia, testes específicos e palpação anatômica.',
              'Prescrição de conduta e cinesioterapia baseada em evidência.',
              'Atenção às red flags e contraindicações no plantão.',
            ]
      );
    }

    const newMapData = {
      title: title.trim(),
      category,
      subCategory,
      tags,
      readTime: readTime || '3 min',
      fileType,
      fileUrl: finalFileUrl,
      thumbnailUrl: '',
      summary: summary.trim() || `Mapa mental estruturado sobre ${title} para consulta rápida no estágio supervisionado.`,
      keyPoints: keyPoints.length > 0 ? keyPoints : [
        'Anatomia aplicada e raciocínio fisioterapêutico rápido.',
        'Sinais de alarme e conduta clínica imediata.',
        'Parâmetros de acompanhamento e alta fisioterapêutica.'
      ],
      clinicalPearls: clinicalPearl.trim()
        ? [clinicalPearl.trim()]
        : ['Verifique sempre os sinais vitais antes e após cada intervenção no paciente!'],
    };

    onAddMap(newMapData);
    onShowToast('Mapa mental indexado com sucesso no acervo!', 'success');
    onClose();
  };

  const currentSubcategories = CATEGORIES_CONFIG[category]?.subCategories || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-none">
                Painel Admin / Upload de Mapas
              </h2>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Indexação de arquivos para o acervo de 150 mapas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 space-y-4 flex-grow text-xs">
          {/* Título */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Título do Mapa Mental <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Cifose e Escoliose: Avaliação com Teste de Adams"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 text-sm outline-none transition-all"
            />
          </div>

          {/* Categoria & Subcategoria */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Especialidade / Categoria <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value as CategoryType)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-800 font-medium outline-none"
              >
                {CATEGORY_NAMES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Subcategoria / Foco <span className="text-rose-500">*</span>
              </label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-800 font-medium outline-none"
              >
                {currentSubcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Upload de Arquivo ou URL Pública */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Arquivo do Mapa (Imagem WebP/PNG ou PDF)
            </label>
            <div className="space-y-2">
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 cursor-pointer bg-slate-50/50 hover:bg-emerald-50/30 transition-all">
                <FileImage className="w-7 h-7 text-emerald-600 mb-1" />
                <span className="text-xs font-semibold text-slate-700">
                  {previewName ? previewName : 'Clique para selecionar arquivo do dispositivo'}
                </span>
                <span className="text-[10px] text-slate-400">
                  PNG, JPG, WebP, SVG ou PDF (suporte a tela cheia)
                </span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-semibold text-[10px] uppercase">ou vincular URL:</span>
                <div className="relative flex-grow">
                  <LinkIcon className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="url"
                    placeholder="https://cdn.exemplo.com/mapa-12.png"
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tags & Tempo de Leitura */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-slate-700 font-bold mb-1">
                Palavras-chave / Tags (separadas por vírgula)
              </label>
              <input
                type="text"
                placeholder="ex: escoliose, adams, cobb, goniometria"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Tempo de Leitura
              </label>
              <select
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-white outline-none"
              >
                <option value="2 min">2 min</option>
                <option value="3 min">3 min</option>
                <option value="4 min">4 min</option>
                <option value="5 min">5 min</option>
              </select>
            </div>
          </div>

          {/* Resumo Breve */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Resumo Clínico
            </label>
            <textarea
              rows={2}
              placeholder="Descreva o propósito principal do mapa mental..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none resize-none"
            />
          </div>

          {/* Pulo do Gato no Estágio */}
          <div>
            <label className="block text-amber-700 font-bold mb-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Pulo do Gato no Estágio / Dica de Ouro
            </label>
            <input
              type="text"
              placeholder="Dica prática rápida que o preceptor costuma cobrar no round..."
              value={clinicalPearl}
              onChange={(e) => setClinicalPearl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-amber-50/30 focus:border-amber-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Check className="w-4 h-4" />
              Cadastrar Mapa no Acervo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
