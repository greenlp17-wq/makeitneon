import { useState } from 'react';
import { ChevronDown, ChevronUp, Check, Search, X } from 'lucide-react';
import { neonFonts } from '../../data/fonts';

interface FontSelectorProps {
  selectedFontId: string;
  onSelect: (id: string) => void;
}

// Default visible count
const DEFAULT_VISIBLE = 9;

export function FontSelector({ selectedFontId, onSelect }: FontSelectorProps) {
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? neonFonts.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
    : neonFonts;

  const visibleFonts = (showAll || search.trim()) ? filtered : filtered.slice(0, DEFAULT_VISIBLE);
  const hiddenCount = filtered.length - DEFAULT_VISIBLE;

  return (
    <div className="space-y-2">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search fonts…"
          className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-neon-pink/50 focus:ring-1 focus:ring-neon-pink/20 transition-all"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Font grid — always visible, no dropdown */}
      {visibleFonts.length > 0 ? (
        <div className="grid grid-cols-3 gap-1.5">
          {visibleFonts.map(font => (
            <button
              key={font.id}
              onClick={() => onSelect(font.id)}
              className={`relative flex flex-col items-center justify-center px-1.5 py-2.5 rounded-lg border text-center transition-all min-h-[56px] ${
                font.id === selectedFontId
                  ? 'border-neon-pink bg-neon-pink/5 ring-1 ring-neon-pink/30'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {font.id === selectedFontId && (
                <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-neon-pink rounded-full flex items-center justify-center">
                  <Check className="w-2 h-2 text-white" />
                </div>
              )}
              <span
                className={`text-sm leading-tight w-full truncate ${
                  font.id === selectedFontId ? 'text-neon-pink' : 'text-slate-700'
                }`}
                style={{ fontFamily: `'${font.googleName}', cursive` }}
              >
                {font.name}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-center text-xs text-slate-400 py-4">No fonts match "{search}"</p>
      )}

      {/* Show more / less toggle — only when no search active */}
      {!search.trim() && filtered.length > DEFAULT_VISIBLE && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-slate-400 hover:text-neon-pink transition-colors"
        >
          {showAll ? (
            <><ChevronUp className="w-3.5 h-3.5" /> Show less</>
          ) : (
            <><ChevronDown className="w-3.5 h-3.5" /> +{hiddenCount} more fonts</>
          )}
        </button>
      )}
    </div>
  );
}
