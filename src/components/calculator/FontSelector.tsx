import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { neonFonts, type NeonFont, type FontCategory } from '../../data/fonts';

interface FontSelectorProps {
  selectedFontId: string;
  onSelect: (id: string) => void;
}

const CATEGORIES: { id: FontCategory | 'All'; label: string }[] = [
  { id: 'All', label: 'All' },
  { id: 'Script', label: 'Script' },
  { id: 'Sans-Serif', label: 'Sans-Serif' },
  { id: 'Serif', label: 'Serif' },
  { id: 'Fun', label: 'Fun' },
  { id: 'Neon', label: 'Neon' },
];

export function FontSelector({ selectedFontId, onSelect }: FontSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<FontCategory | 'All'>('All');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedFont = neonFonts.find(f => f.id === selectedFontId) || neonFonts[0];

  const filteredFonts = activeCategory === 'All'
    ? neonFonts
    : neonFonts.filter(f => f.category === activeCategory);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected font display / trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-all shadow-sm group"
      >
        <span
          className="text-lg text-slate-800 truncate"
          style={{ fontFamily: `'${selectedFont.googleName}', cursive` }}
        >
          {selectedFont.name}
        </span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden max-h-[480px] flex flex-col">
          {/* Header with close */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <span className="text-sm font-semibold text-slate-800">Choose Font</span>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Category tabs */}
          <div className="flex gap-1 px-3 py-2 border-b border-slate-100 overflow-x-auto shrink-0">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Font grid */}
          <div className="overflow-y-auto flex-1 p-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filteredFonts.map(font => (
                <FontCard
                  key={font.id}
                  font={font}
                  isSelected={font.id === selectedFontId}
                  onClick={() => {
                    onSelect(font.id);
                    setIsOpen(false);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FontCard({
  font,
  isSelected,
  onClick,
}: {
  font: NeonFont;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center px-2 py-3 rounded-lg border text-center transition-all min-h-[60px] ${
        isSelected
          ? 'border-neon-pink bg-neon-pink/5 ring-1 ring-neon-pink/30 shadow-sm'
          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      <span
        className={`text-base leading-tight truncate w-full ${
          isSelected ? 'text-neon-pink' : 'text-slate-700'
        }`}
        style={{ fontFamily: `'${font.googleName}', sans-serif` }}
      >
        {font.name}
      </span>
      <span className="text-[10px] text-slate-400 mt-1">{font.category}</span>
    </button>
  );
}
