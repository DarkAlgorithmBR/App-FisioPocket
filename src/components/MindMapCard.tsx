import React, { useState } from 'react';
import { Heart, Clock, Sparkles, FileText, ChevronRight, Bookmark, Layers } from 'lucide-react';
import { MindMap } from '../types';
import { CATEGORIES_CONFIG } from '../data/mapsData';

interface MindMapCardProps {
  map: MindMap;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelect: (map: MindMap) => void;
}

export const MindMapCard: React.FC<MindMapCardProps> = ({
  map,
  isFavorite,
  onToggleFavorite,
  onSelect,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const categoryConfig = CATEGORIES_CONFIG[map.category] || {
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  };

  // Extract map number from ID e.g. "map-01" -> "01"
  const mapNumMatch = map.id.match(/\d+/);
  const mapNum = mapNumMatch ? mapNumMatch[0] : '';
  const lotNum = mapNum ? Math.ceil(parseInt(mapNum, 10) / 10) : null;

  // Safe encoded URL for file paths with spaces
  const safeFileUrl = map.fileUrl ? encodeURI(map.fileUrl) : '';

  return (
    <div
      onClick={() => onSelect(map)}
      className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/50 shadow-soft hover:shadow-card transition-all duration-200 overflow-hidden cursor-pointer flex flex-col touch-press"
    >
      {/* Top Graphic Thumbnail Banner */}
      <div className="relative h-40 sm:h-44 w-full bg-slate-900/95 overflow-hidden border-b border-slate-100 flex items-center justify-center">
        {/* Loading skeleton pulse */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
            <span className="text-slate-500 text-xs font-medium">Carregando mapa...</span>
          </div>
        )}

        {!imageError && safeFileUrl ? (
          <img
            src={safeFileUrl}
            alt={map.title}
            className={`w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />
        ) : (
          /* High quality fallback vector graphic if image not available */
          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 p-4 flex flex-col justify-between text-white">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                FisioPocket HD
              </span>
              <FileText className="w-4 h-4 text-slate-400" />
            </div>
            <p className="font-bold text-xs leading-tight line-clamp-2 text-slate-200">
              {map.title}
            </p>
            <span className="text-[10px] text-slate-400 font-medium">
              Toque para abrir em tela cheia
            </span>
          </div>
        )}

        {/* Soft overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

        {/* Map Sequence Number Badge */}
        {mapNum && (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-slate-950/80 text-white backdrop-blur-md text-[10px] font-mono font-bold border border-white/20 shadow-sm flex items-center gap-1">
            <span className="text-emerald-400">#</span>
            <span>{mapNum}</span>
          </div>
        )}

        {/* Favorite Floating Button */}
        <button
          onClick={(e) => onToggleFavorite(map.id, e)}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all active:scale-90 z-10 ${
            isFavorite
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 ring-2 ring-white'
              : 'bg-white/85 text-slate-700 hover:text-rose-500 hover:bg-white shadow-sm'
          }`}
          title={isFavorite ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
          aria-label="Favoritar"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Category & Lot Badges on Thumbnail */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 pointer-events-none">
          <div className="flex items-center gap-1 flex-wrap">
            <span
              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold backdrop-blur-md shadow-sm ${categoryConfig.bg} ${categoryConfig.color} border ${categoryConfig.border}`}
            >
              {map.category.split('&')[0].trim()}
            </span>
            {lotNum && (
              <span className="px-1.5 py-0.5 rounded-lg text-[9px] font-bold bg-white/20 text-white backdrop-blur-md border border-white/20">
                Lote {lotNum < 10 ? `0${lotNum}` : lotNum}
              </span>
            )}
          </div>
          <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-900/80 text-white backdrop-blur-md flex items-center gap-1 border border-slate-700/60 shrink-0">
            <Clock className="w-2.5 h-2.5 text-emerald-400" />
            {map.readTime}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3.5 flex flex-col flex-grow justify-between gap-2.5">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-semibold mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
            <span className="truncate">{map.subCategory}</span>
          </div>

          <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
            {map.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {map.summary}
          </p>
        </div>

        {/* Tags and CTA */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 overflow-hidden max-w-[65%]">
            {map.tags.slice(0, 2).map((t, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-medium truncate"
              >
                #{t}
              </span>
            ))}
          </div>

          <span className="flex items-center gap-0.5 text-emerald-600 font-bold text-xs group-hover:translate-x-0.5 transition-transform shrink-0">
            Ver Mapa HD
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
