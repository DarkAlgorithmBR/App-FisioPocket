import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search,
  Filter,
  Heart,
  Sparkles,
  BookOpen,
  X,
  ChevronRight,
  ChevronLeft,
  Flame,
  Award,
  Smartphone,
  Download
} from 'lucide-react';
import { MindMap, CategoryType } from '../../types';
import { CATEGORIES_CONFIG } from '../../data/mapsData';
import { MindMapCard } from '../MindMapCard';

interface MapsViewProps {
  maps: MindMap[];
  favorites: string[];
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  onSelectMap: (map: MindMap) => void;
  onOpenUpload?: () => void;
  onOpenInstall?: () => void;
}

const CATEGORY_LIST: { id: CategoryType | 'Todos'; label: string; icon: string }[] = [
  { id: 'Todos', label: 'Todos os Mapas', icon: '📚' },
  { id: 'Ortopedia & Traumatologia', label: 'Ortopedia', icon: '🦴' },
  { id: 'Fisioterapia Neurofuncional', label: 'Neurofuncional', icon: '🧠' },
  { id: 'Fisioterapia Respiratória & UTI', label: 'Respiratória & UTI', icon: '🫁' },
  { id: 'Cardiorrespiratória & Fisiologia', label: 'Cardiorrespiratória', icon: '❤️' },
  { id: 'Anatomia & Cinesiologia', label: 'Anatomia & Cinesio', icon: '🧬' },
  { id: 'Pediatria & Saúde da Mulher', label: 'Pediatria & Mulher', icon: '👶' },
  { id: 'Prática Clínica & Round', label: 'Round & Prática', icon: '📋' },
];

// Helper to normalize accents and lowercase
export function normalizeClinicalText(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// Clinical synonyms dictionary for student queries
const CLINICAL_SYNONYMS: Record<string, string[]> = {
  avc: ['ave', 'acidente vascular', 'isquemico', 'hemorragico', 'hemiplegia'],
  ave: ['avc', 'acidente vascular', 'isquemico', 'hemorragico'],
  derrame: ['ave', 'avc', 'acidente vascular cerebral'],
  lca: ['ligamento cruzado anterior', 'lachman', 'gaveta anterior'],
  lcp: ['ligamento cruzado posterior', 'gaveta posterior'],
  manguito: ['rotador', 'supraespinhal', 'infraespinhal', 'subescapular', 'redondo menor', 'jobe', 'neer'],
  dpoc: ['doenca pulmonar obstrutiva', 'enfisema', 'bronquite', 'espirometria', 'tabagismo'],
  tep: ['tromboembolismo', 'embolia pulmonar'],
  iam: ['infarto', 'miocardio', 'coronaria', 'reabilitacao cardiaca'],
  uti: ['terapia intensiva', 'ventilacao mecanica', 'desmame', 'sedacao', 'tot', 'tubo endotraqueal'],
  vni: ['ventilacao nao invasiva', 'cpap', 'bipap', 'pressao positiva'],
  gaso: ['gasometria', 'gasometria arterial', 'paco2', 'hco3', 'acidose', 'alcalose'],
  gasometria: ['gaso', 'arterial', 'ph', 'paco2', 'hco3', 'acidose', 'alcalose'],
  glasgow: ['gcs', 'coma', 'escala de coma', 'tce', 'ocular', 'verbal', 'motora'],
  tce: ['traumatismo cranioencefalico', 'glasgow', 'pic'],
  eva: ['escala visual analogica', 'dor', 'mensuracao da dor'],
  mrc: ['forca muscular', 'fraqueza adquirida', 'icu-aw', 'pida', 'grau 0 a 5'],
  joelho: ['menisco', 'patela', 'lca', 'lcp', 'condromalacia', 'gonartrose', 'femoropatelar'],
  ombro: ['manguito', 'bursite', 'subacromial', 'glenoumeral', 'capsulite', 'impacto'],
  quadril: ['femoroacetabular', 'coxartrose', 'piriforme', 'trocanteriana', 'bursite trocanterica'],
  coluna: ['hernia', 'disco', 'lombalgia', 'cervicalgia', 'radiculopatia', 'escoliose', 'ciatico', 'lombociatalgia'],
  ciatico: ['ciatalgia', 'lombociatalgia', 'hernia de disco', 'lasegue'],
  tornozelo: ['entorse', 'aquiles', 'calcaneo', 'talus', 'fibula', 'ottawa'],
  pe: ['fascite', 'calcaneo', 'metatarso', 'neuroma', 'fascite plantar'],
  mao: ['carpo', 'de quervain', 'colles', 'dedo em gatilho', 'falange'],
  punho: ['carpo', 'de quervain', 'colles', 'tunel do carpo'],
  cotovelo: ['epicondilite', 'tenista', 'golfista', 'olecrano'],
  respiratoria: ['pulmonar', 'ausculta', 'roncos', 'crepitantes', 'sibilos', 'ventilacao'],
  pediatria: ['marcos motores', 'bebe', 'recem nascido', 'neonato', 'apgar', 'desenvolvimento motor'],
  mulher: ['assoalho pelvico', 'incontinencia', 'puerperio', 'gestante', 'diastase', 'urogineco'],
};

export const MapsView: React.FC<MapsViewProps> = ({
  maps,
  favorites,
  onToggleFavorite,
  onSelectMap,
  onOpenUpload,
  onOpenInstall,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'Todos'>('Todos');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('Todas');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Scroll controls for categories container
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Scroll controls for quick keywords container
  const quickKeywordsRef = useRef<HTMLDivElement>(null);
  const [canScrollKwLeft, setCanScrollKwLeft] = useState(false);
  const [canScrollKwRight, setCanScrollKwRight] = useState(true);

  // Mouse drag-to-scroll state for categories
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);

  // Mouse drag-to-scroll state for quick keywords
  const isKwMouseDownRef = useRef(false);
  const kwStartXRef = useRef(0);
  const kwScrollLeftStartRef = useRef(0);

  const updateScrollButtons = () => {
    if (categoriesRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoriesRef.current;
      setCanScrollLeft(scrollLeft > 8);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
    }
    if (quickKeywordsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = quickKeywordsRef.current;
      setCanScrollKwLeft(scrollLeft > 6);
      setCanScrollKwRight(scrollLeft < scrollWidth - clientWidth - 6);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener('resize', updateScrollButtons);
    return () => window.removeEventListener('resize', updateScrollButtons);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (categoriesRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      categoriesRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(updateScrollButtons, 350);
    }
  };

  const handleKwScroll = (direction: 'left' | 'right') => {
    if (quickKeywordsRef.current) {
      const scrollAmount = direction === 'left' ? -180 : 180;
      quickKeywordsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(updateScrollButtons, 350);
    }
  };

  // Drag-to-scroll handlers for desktop mouse users on quick keywords
  const handleKwMouseDown = (e: React.MouseEvent) => {
    if (!quickKeywordsRef.current) return;
    isKwMouseDownRef.current = true;
    kwStartXRef.current = e.pageX - quickKeywordsRef.current.offsetLeft;
    kwScrollLeftStartRef.current = quickKeywordsRef.current.scrollLeft;
  };

  const handleKwMouseLeaveOrUp = () => {
    isKwMouseDownRef.current = false;
  };

  const handleKwMouseMove = (e: React.MouseEvent) => {
    if (!isKwMouseDownRef.current || !quickKeywordsRef.current) return;
    e.preventDefault();
    const x = e.pageX - quickKeywordsRef.current.offsetLeft;
    const walk = (x - kwStartXRef.current) * 1.5;
    quickKeywordsRef.current.scrollLeft = kwScrollLeftStartRef.current - walk;
    updateScrollButtons();
  };

  const handleKwWheel = (e: React.WheelEvent) => {
    if (quickKeywordsRef.current && e.deltaY !== 0) {
      quickKeywordsRef.current.scrollLeft += e.deltaY * 0.8;
      updateScrollButtons();
    }
  };

  // Drag-to-scroll handlers for desktop mouse users on categories
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!categoriesRef.current) return;
    isMouseDownRef.current = true;
    startXRef.current = e.pageX - categoriesRef.current.offsetLeft;
    scrollLeftStartRef.current = categoriesRef.current.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    isMouseDownRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current || !categoriesRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoriesRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    categoriesRef.current.scrollLeft = scrollLeftStartRef.current - walk;
    updateScrollButtons();
  };

  // Horizontal mouse wheel handler for categories
  const handleWheel = (e: React.WheelEvent) => {
    if (categoriesRef.current && e.deltaY !== 0) {
      categoriesRef.current.scrollLeft += e.deltaY * 0.8;
      updateScrollButtons();
    }
  };

  // Quick keywords suggestions for students in a hurry
  const quickKeywords = [
    { label: 'LCA (Joelho)', term: 'LCA' },
    { label: 'Manguito', term: 'Manguito' },
    { label: 'Ventilação UTI', term: 'Ventilação' },
    { label: 'Ausculta', term: 'Ausculta' },
    { label: 'Glasgow (TCE)', term: 'Glasgow' },
    { label: 'AVE / AVC', term: 'AVE' },
    { label: 'Ciático / Lombar', term: 'Ciático' },
    { label: 'Gasometria', term: 'Gasometria' },
    { label: 'Dermátomos', term: 'Dermátomos' },
  ];

  // Handle category change
  const handleCategorySelect = (cat: CategoryType | 'Todos') => {
    setSelectedCategory(cat);
    setSelectedSubCategory('Todas');
  };

  // Robust Search & Filter logic
  const filteredMaps = useMemo(() => {
    const rawQuery = searchQuery.trim();
    const normalizedQuery = normalizeClinicalText(rawQuery);

    // Check if query is explicitly searching by lot: "lote 1", "lote 01", "lote 10"
    const lotMatch = normalizedQuery.match(/^lote\s*(\d{1,2})$/);
    const explicitLotNum = lotMatch ? parseInt(lotMatch[1], 10) : null;

    // Check if query is explicitly searching by map number: "31", "#31", "mapa 31", "map-31"
    const numberMatch = normalizedQuery.match(/^(?:mapa\s*|#|map-)?(\d{1,3})$/);
    const explicitMapNum = numberMatch ? parseInt(numberMatch[1], 10) : null;

    // Split query terms (space separated)
    const queryTokens = normalizedQuery
      .split(/\s+/)
      .filter((t) => t.length > 0 && t !== 'de' && t !== 'do' && t !== 'da' && t !== 'e' && t !== 'em' && t !== 'na' && t !== 'no');

    return maps.filter((map, index) => {
      // 1. Favorites filter
      if (onlyFavorites && !favorites.includes(map.id)) {
        return false;
      }

      // 2. Category filter
      if (selectedCategory !== 'Todos' && map.category !== selectedCategory) {
        return false;
      }

      // 3. Subcategory filter
      if (selectedSubCategory !== 'Todas' && map.subCategory !== selectedSubCategory) {
        return false;
      }

      // Determine map sequence number (from map.id "map-XX" or index + 1)
      const mapNumMatch = map.id.match(/\d+/);
      const currentMapNum = mapNumMatch ? parseInt(mapNumMatch[0], 10) : index + 1;
      const currentLotNum = Math.ceil(currentMapNum / 10);

      // 4. Explicit lot query e.g. "lote 01"
      if (explicitLotNum !== null) {
        return currentLotNum === explicitLotNum;
      }

      // 5. Explicit map number query e.g. "#31" or "31"
      if (explicitMapNum !== null) {
        return currentMapNum === explicitMapNum;
      }

      // 6. General Search Query matching
      if (normalizedQuery) {
        // Build comprehensive normalized searchable corpus for this map
        const titleNorm = normalizeClinicalText(map.title);
        const categoryNorm = normalizeClinicalText(map.category);
        const subCategoryNorm = normalizeClinicalText(map.subCategory);
        const summaryNorm = normalizeClinicalText(map.summary);
        const tagsNorm = map.tags.map(normalizeClinicalText).join(' ');
        const keyPointsNorm = (map.keyPoints || []).map(normalizeClinicalText).join(' ');
        const pearlsNorm = (map.clinicalPearls || []).map(normalizeClinicalText).join(' ');
        const mapIdNorm = normalizeClinicalText(map.id);

        const corpus = `${titleNorm} ${categoryNorm} ${subCategoryNorm} ${tagsNorm} ${summaryNorm} ${keyPointsNorm} ${pearlsNorm} ${mapIdNorm}`;

        // Verify if ALL query tokens match (AND logic for high precision)
        const allTokensMatch = queryTokens.every((token) => {
          // Direct token inclusion in title/category/tags/summary
          if (corpus.includes(token)) return true;

          // Check synonym expansions for this token
          const synonyms = CLINICAL_SYNONYMS[token];
          if (synonyms) {
            return synonyms.some((syn) => {
              const synNorm = normalizeClinicalText(syn);
              return corpus.includes(synNorm);
            });
          }

          return false;
        });

        if (!allTokensMatch) {
          return false;
        }
      }

      return true;
    });
  }, [maps, favorites, onlyFavorites, selectedCategory, selectedSubCategory, searchQuery]);

  const activeSubcategories =
    selectedCategory !== 'Todos' ? CATEGORIES_CONFIG[selectedCategory]?.subCategories || [] : [];

  return (
    <div className="space-y-4 pb-20">
      {/* Search Header Banner */}
      <div className="bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-44 h-44 rounded-full bg-teal-400/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Acervo Completo de 150 Mapas Mentais</span>
            </div>

            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                onlyFavorites
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-900/40 ring-2 ring-white/30'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-current' : ''}`} />
              <span>Favoritos ({favorites.length})</span>
            </button>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight">
            Consulte qualquer conduta clínica em 1 toque
          </h1>

          {/* Instant Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600" />
            <input
              type="text"
              placeholder="Buscar por LCA, ausculta, Glasgow, manguito, #31..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 font-medium text-sm shadow-md outline-none focus:ring-4 focus:ring-emerald-400/30 transition-all border border-transparent focus:border-emerald-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition-colors"
                title="Limpar busca"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Keywords Chips with Left/Right Arrows & Wheel Scroll */}
          <div className="relative group/kw pt-1">
            {canScrollKwLeft && (
              <button
                onClick={() => handleKwScroll('left')}
                className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-emerald-950/90 text-white shadow-md border border-white/30 flex items-center justify-center hover:bg-emerald-900 transition-all active:scale-95"
                aria-label="Rolar atalhos para esquerda"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {canScrollKwRight && (
              <button
                onClick={() => handleKwScroll('right')}
                className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-emerald-950/90 text-white shadow-md border border-white/30 flex items-center justify-center hover:bg-emerald-900 transition-all active:scale-95"
                aria-label="Rolar atalhos para direita"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            <div
              ref={quickKeywordsRef}
              onScroll={updateScrollButtons}
              onMouseDown={handleKwMouseDown}
              onMouseLeave={handleKwMouseLeaveOrUp}
              onMouseUp={handleKwMouseLeaveOrUp}
              onMouseMove={handleKwMouseMove}
              onWheel={handleKwWheel}
              className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scroll-smooth select-none cursor-grab active:cursor-grabbing"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255,255,255,0.25) transparent'
              }}
            >
              <span className="text-emerald-200 font-semibold shrink-0">Atalhos rápidos:</span>
              {quickKeywords.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setSearchQuery(item.term)}
                  className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-all whitespace-nowrap ${
                    searchQuery.toLowerCase() === item.term.toLowerCase()
                      ? 'bg-white text-emerald-800 font-bold shadow-sm'
                      : 'bg-white/10 text-emerald-100 hover:bg-white/20 border border-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Install App Callout Banner */}
      {onOpenInstall && (
        <div
          onClick={onOpenInstall}
          className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/90 hover:border-emerald-400 rounded-2xl p-3 flex items-center justify-between cursor-pointer transition-all shadow-sm active:scale-[0.99] group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-600/30 group-hover:scale-105 transition-transform">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-xs text-slate-900 leading-tight">
                  Baixar FisioPocket no Celular
                </h4>
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                  App PWA
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                Instale na tela de início para acessar os 150 mapas no estágio
              </p>
            </div>
          </div>
          <span className="px-3 py-1.5 bg-emerald-600 group-hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shrink-0 shadow-sm transition-colors flex items-center gap-1">
            <Download className="w-3.5 h-3.5" />
            <span>Instalar</span>
          </span>
        </div>
      )}

      {/* Horizontal Category Carousel with Navigation Controls */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1 text-xs">
          <span className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-emerald-600" />
            Categorias Clínicas
          </span>
          <span className="text-slate-600 font-bold bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
            {filteredMaps.length} de {maps.length} mapas
          </span>
        </div>

        {/* Carousel Container with Left/Right Arrows */}
        <div className="relative group">
          {/* Left Arrow Button */}
          {canScrollLeft && (
            <button
              onClick={() => handleScroll('left')}
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white text-slate-700 shadow-md border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:text-emerald-600 transition-all active:scale-95"
              aria-label="Rolar para esquerda"
              title="Ver categorias anteriores"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Arrow Button */}
          {canScrollRight && (
            <button
              onClick={() => handleScroll('right')}
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white text-slate-700 shadow-md border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:text-emerald-600 transition-all active:scale-95"
              aria-label="Rolar para direita"
              title="Ver mais categorias"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Scrollable Categories List */}
          <div
            ref={categoriesRef}
            onScroll={updateScrollButtons}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            onWheel={handleWheel}
            className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 px-1 scroll-smooth select-none cursor-grab active:cursor-grabbing"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#cbd5e1 transparent'
            }}
          >
            {CATEGORY_LIST.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl shrink-0 text-xs font-bold transition-all touch-press ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500/20'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span className="whitespace-nowrap">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Subcategories (if a category is active) */}
        {activeSubcategories.length > 0 && (
          <div
            onWheel={(e) => {
              if (e.deltaY !== 0) e.currentTarget.scrollLeft += e.deltaY * 0.8;
            }}
            className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-1 px-1 scroll-smooth"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}
          >
            <button
              onClick={() => setSelectedSubCategory('Todas')}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold shrink-0 transition-all whitespace-nowrap ${
                selectedSubCategory === 'Todas'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Todas subcategorias
            </button>
            {activeSubcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubCategory(sub)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold shrink-0 transition-all whitespace-nowrap ${
                  selectedSubCategory === sub
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid of Mind Maps */}
      {filteredMaps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filteredMaps.map((map) => (
            <MindMapCard
              key={map.id}
              map={map}
              isFavorite={favorites.includes(map.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectMap}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3 shadow-soft my-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">
            Nenhum mapa encontrado
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            Não encontramos mapas para <span className="font-semibold text-slate-700">"{searchQuery}"</span> com os filtros atuais.
          </p>
          <div className="pt-2 flex justify-center gap-2">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Todos');
                setSelectedSubCategory('Todas');
                setOnlyFavorites(false);
              }}
              className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 shadow-md transition-colors"
            >
              Limpar Todos os Filtros (Ver 150 Mapas)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
