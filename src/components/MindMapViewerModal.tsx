import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Heart,
  Share2,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Maximize2,
  FileDown,
  Layers,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { MindMap } from '../types';
import { CATEGORIES_CONFIG } from '../data/mapsData';

interface MindMapViewerModalProps {
  map: MindMap | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const MindMapViewerModal: React.FC<MindMapViewerModalProps> = ({
  map,
  onClose,
  isFavorite,
  onToggleFavorite,
  onShowToast,
}) => {
  if (!map) return null;

  const [zoom, setZoom] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'visual' | 'resumo'>('visual');
  const [imageError, setImageError] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom on map change
  useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setActiveTab('visual');
    setImageError(false);
  }, [map.id]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.35, 4.0));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(prev - 0.35, 0.7);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse & Touch Pan Handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const safeFileUrl = map.fileUrl ? encodeURI(map.fileUrl) : '';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = safeFileUrl;
    link.download = `${map.id}-${map.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('Download do mapa mental iniciado em alta resolução!', 'success');
  };

  const handleOpenOriginal = () => {
    window.open(safeFileUrl, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: map.title,
          text: `FisioPocket: Mapa Mental - ${map.title}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      onShowToast('Link do mapa copiado para a área de transferência!', 'info');
    }
  };

  const categoryConfig = CATEGORIES_CONFIG[map.category] || {
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-200 overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-3 py-2.5 bg-slate-900/95 border-b border-slate-800 text-white z-20">
        <div className="flex items-center gap-2 overflow-hidden mr-2">
          <button
            onClick={onClose}
            className="p-2 -ml-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors active:scale-95 shrink-0"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="overflow-hidden">
            <h2 className="text-sm font-bold truncate tracking-tight text-white">
              {map.title}
            </h2>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${categoryConfig.bg} ${categoryConfig.color}`}>
                {map.category}
              </span>
              <span>•</span>
              <span className="truncate">{map.subCategory}</span>
            </div>
          </div>
        </div>

        {/* Action icons & Primary Download Button */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Prominent Download Button */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-950/40 transition-all active:scale-95"
            title="Baixar Imagem em Alta Resolução (PNG)"
          >
            <Download className="w-4 h-4" />
            <span className="hidden xs:inline">Baixar PNG</span>
          </button>

          <button
            onClick={() => onToggleFavorite(map.id)}
            className={`p-2 rounded-xl transition-all ${
              isFavorite
                ? 'bg-rose-500 text-white shadow-md shadow-rose-900/50'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Favoritar"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleOpenOriginal}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Abrir Imagem em Nova Aba"
          >
            <ExternalLink className="w-4 h-4" />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Compartilhar"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs Switcher: Mapa Visual vs Pulos do Gato Clínicos */}
      <div className="flex items-center justify-center gap-2 py-2 px-4 bg-slate-900 border-b border-slate-800 z-10">
        <button
          onClick={() => setActiveTab('visual')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'visual'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/50 ring-2 ring-emerald-500/30'
              : 'text-slate-400 hover:text-white bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Visualizador HD</span>
        </button>

        <button
          onClick={() => setActiveTab('resumo')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'resumo'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/50 ring-2 ring-emerald-500/30'
              : 'text-slate-400 hover:text-white bg-slate-800'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Pulos do Gato no Estágio</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-grow flex items-center justify-center overflow-hidden bg-slate-950 select-none">
        {activeTab === 'visual' ? (
          <div
            ref={containerRef}
            className={`w-full h-full flex items-center justify-center overflow-hidden cursor-grab ${
              isDragging ? 'cursor-grabbing' : ''
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
              className="flex items-center justify-center p-2"
            >
              {!imageError ? (
                <img
                  src={safeFileUrl}
                  alt={map.title}
                  className="max-w-[95vw] max-h-[75vh] object-contain rounded-xl shadow-2xl pointer-events-none"
                  draggable={false}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="max-w-md p-6 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-3">
                  <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
                  <h3 className="font-bold text-white text-sm">Visualização em modo texto</h3>
                  <p className="text-xs text-slate-400">
                    Não foi possível carregar a imagem direta. Você pode consultar todos os pontos clínicos na aba "Pulos do Gato no Estágio".
                  </p>
                  <button
                    onClick={() => setActiveTab('resumo')}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                  >
                    Abrir Resumo Clínico
                  </button>
                </div>
              )}
            </div>

            {/* Floating Zoom Controls Bar with Quick Download */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 border border-slate-700/80 rounded-full shadow-2xl backdrop-blur-md z-30">
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 0.7}
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full disabled:opacity-40 transition-colors"
                title="Reduzir Zoom"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono font-bold text-emerald-400 px-2 min-w-[3.5rem] text-center">
                {Math.round(zoom * 100)}%
              </span>

              <button
                onClick={handleZoomIn}
                disabled={zoom >= 4.0}
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full disabled:opacity-40 transition-colors"
                title="Aumentar Zoom"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="w-[1px] h-4 bg-slate-700 mx-1" />

              <button
                onClick={handleResetZoom}
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                title="Redefinir Zoom 100%"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <div className="w-[1px] h-4 bg-slate-700 mx-1" />

              {/* Floating Download Button */}
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-full transition-all active:scale-95 shadow-md shadow-emerald-950/50"
                title="Baixar Imagem PNG"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar</span>
              </button>
            </div>
          </div>
        ) : (
          /* Clinical Summary & Pearls Tab */
          <div className="w-full h-full overflow-y-auto p-4 max-w-lg mx-auto text-slate-100 flex flex-col gap-4">
            {/* Top Download Card Banner */}
            <div className="bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-700/50 p-4 rounded-2xl flex items-center justify-between gap-3 shadow-md">
              <div>
                <h4 className="font-bold text-sm text-white">Salvar este mapa mental</h4>
                <p className="text-xs text-emerald-200/80">Arquivo PNG em alta resolução para seus estudos</p>
              </div>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Baixar PNG</span>
              </button>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Resumo Clínico Essencial
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {map.summary}
              </p>
            </div>

            {/* Key Points */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
              <h3 className="text-sm font-bold text-teal-400 uppercase tracking-wider mb-2.5">
                Pontos de Decisão no Leito
              </h3>
              <ul className="space-y-2">
                {map.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-teal-900/70 text-teal-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {index + 1}
                    </span>
                    <span className="leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Clinical Pearls / Pulos do Gato */}
            <div className="bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-800/60 p-4 rounded-2xl">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Pulo do Gato no Estágio (Não erre no Round!)
              </h3>
              <div className="space-y-2">
                {map.clinicalPearls.map((pearl, index) => (
                  <p key={index} className="text-xs text-amber-200/90 leading-relaxed bg-amber-900/20 p-2.5 rounded-xl border border-amber-800/40">
                    💡 {pearl}
                  </p>
                ))}
              </div>
            </div>

            {/* Tags footer & Bottom Download CTA */}
            <div className="space-y-3 pb-8">
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-2xl shadow-lg transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Baixar Mapa Mental em Alta Resolução (PNG)</span>
              </button>

              <div className="flex flex-wrap gap-1.5">
                {map.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-800 text-slate-400 rounded-lg text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
