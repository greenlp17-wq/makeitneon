import { useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AlignLeft, AlignCenter, AlignRight,
  Check, Shield, Clock, Truck,
  ChevronDown, ChevronUp,
  Upload, X, Image,
} from 'lucide-react';
import type { UseNeonCalculatorReturn } from '../../hooks/useNeonCalculator';
import { neonColors } from '../../data/neonColors';
import { SIZE_PRESETS, MOUNT_OPTIONS, BACKBOARD_COLORS, BACKBOARD_SHAPES } from '../../data/pricing';
import { FontSelector } from './FontSelector';
import { OrderModal } from './OrderModal';

export function CalculatorPanel({ calcState }: { calcState: UseNeonCalculatorReturn }) {
  const { lang } = useParams();
  const {
    text, setText,
    textAlign, setTextAlign,
    lineCount,
    widthCm, setWidthCm,
    selectedFontId, setSelectedFontId,
    selectedColorId, setSelectedColorId,
    activeColor,
    isRGB, setIsRGB,
    isOutdoor, setIsOutdoor,
    mountType, setMountType,
    backboardColor, setBackboardColor,
    backboardShape, setBackboardShape,
    priceBreakdown,
  } = calcState;

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderMode, setOrderMode] = useState<'order' | 'quote'>('order');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    advanced: false,
  });

  // Logo upload state
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = useCallback((file: File) => {
    if (!file.type.startsWith('image/') && !file.name.endsWith('.svg') && !file.name.endsWith('.pdf')) return;
    if (file.size > 10 * 1024 * 1024) { alert('File size must be under 10 MB'); return; }
    setLogoFile(file);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setLogoPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setLogoPreview(null); // PDF/SVG — no preview
    }
  }, []);

  const handleRemoveLogo = useCallback(() => {
    setLogoFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleLogoUpload(file);
  }, [handleLogoUpload]);

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Compute active size preset
  const activeSizePreset = SIZE_PRESETS.find(p => p.widthCm === widthCm)?.id || null;

  return (
    <>
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 flex flex-col h-full overflow-hidden">
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-slate-100">

            {/* ① ENTER YOUR TEXT — always visible */}
            <div className="px-4 lg:px-5 py-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-6 bg-slate-800 text-white text-xs font-bold rounded-md flex items-center justify-center shrink-0">1</span>
                <span className="text-sm font-bold text-slate-800 uppercase tracking-wide">Enter Your Text</span>
              </div>
              <div className="space-y-3">
                <div className="relative">
                  <textarea
                    value={text}
                    onChange={(e) => {
                      // Limit to 2 lines and 50 chars
                      const lines = e.target.value.split('\n').slice(0, 2);
                      const joined = lines.join('\n');
                      if (joined.length <= 60) setText(joined);
                    }}
                    placeholder="ENTER TEXT HERE&#10;Press Enter for a new line"
                    rows={2}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-pink/40 focus:border-neon-pink transition-all shadow-sm font-medium text-slate-800 text-center resize-none placeholder:text-slate-300 placeholder:text-center"
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[11px] text-slate-400">
                      {text.replace(/\n/g, '').length} chars • {lineCount} {lineCount === 1 ? 'line' : 'lines'}
                    </span>
                    {/* Text alignment */}
                    <div className="flex items-center gap-0.5 bg-slate-100 rounded-lg p-0.5">
                      {[
                        { id: 'left' as const, icon: AlignLeft },
                        { id: 'center' as const, icon: AlignCenter },
                        { id: 'right' as const, icon: AlignRight },
                      ].map(({ id, icon: Icon }) => (
                        <button
                          key={id}
                          onClick={() => setTextAlign(id)}
                          className={`p-1.5 rounded-md transition-all ${
                            textAlign === id ? 'bg-neon-pink text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Logo/Design Upload */}
                {logoFile ? (
                  <div className="border border-neon-pink/30 bg-neon-pink/5 rounded-xl p-3">
                    <div className="flex items-center gap-3">
                      {/* Preview thumbnail */}
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo" className="w-14 h-14 rounded-lg object-contain bg-white border border-slate-200" />
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                          <Image className="w-6 h-6 text-slate-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-neon-pink truncate">{logoFile.name}</p>
                        <p className="text-[11px] text-slate-400">
                          {(logoFile.size / 1024).toFixed(0)} KB • Logo/Design mode
                        </p>
                      </div>
                      <button
                        onClick={handleRemoveLogo}
                        className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-red-500 shrink-0"
                        title="Remove logo"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[11px] text-neon-pink/70 mt-2">
                      ✨ Our designers will trace your logo into neon. You'll receive a free mockup within 24h.
                    </p>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative flex flex-col items-center justify-center gap-1.5 px-4 py-4 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                      isDragging
                        ? 'border-neon-pink bg-neon-pink/10'
                        : 'border-slate-200 hover:border-neon-pink/40 hover:bg-neon-pink/5'
                    }`}
                  >
                    <Upload className={`w-5 h-5 ${
                      isDragging ? 'text-neon-pink' : 'text-slate-400'
                    }`} />
                    <span className="text-xs font-semibold text-slate-600">Upload Logo or Design</span>
                    <span className="text-[10px] text-slate-400">PNG, JPG, SVG, PDF • Max 10 MB</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.svg,.pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleLogoUpload(file);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* ② CHOOSE FONT */}
            <div className="px-4 lg:px-5 py-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-6 bg-slate-800 text-white text-xs font-bold rounded-md flex items-center justify-center shrink-0">2</span>
                <span className="text-sm font-bold text-slate-800 uppercase tracking-wide">Choose Font</span>
              </div>
              <FontSelector
                selectedFontId={selectedFontId}
                onSelect={setSelectedFontId}
              />
            </div>

            {/* ③ SPECIAL EFFECTS + COLOR (merged, compact) */}
            <div className="px-4 lg:px-5 py-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-6 bg-slate-800 text-white text-xs font-bold rounded-md flex items-center justify-center shrink-0">3</span>
                <span className="text-sm font-bold text-slate-800 uppercase tracking-wide">Color & Effects</span>
              </div>
              {/* Inline color/RGB toggle */}
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => setIsRGB(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    !isRGB
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  Single Color
                </button>
                <button
                  onClick={() => setIsRGB(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isRGB
                      ? 'bg-gradient-to-r from-red-500 via-green-500 to-blue-500 text-white'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  RGB +50%
                </button>
              </div>
              {/* Color swatches — only if single color */}
              {!isRGB && (
                <div className="flex flex-wrap gap-2">
                  {neonColors.map(color => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColorId(color.id)}
                      title={color.name}
                      className={`w-8 h-8 rounded-full transition-all flex items-center justify-center ${
                        selectedColorId === color.id
                          ? 'ring-2 ring-offset-2 ring-slate-800 scale-110'
                          : 'hover:scale-110'
                      }`}
                      style={{
                        backgroundColor: color.hex,
                        boxShadow: selectedColorId === color.id
                          ? `0 0 12px ${color.hex}60`
                          : `0 1px 3px rgba(0,0,0,0.15)`,
                      }}
                    >
                      {selectedColorId === color.id && (
                        <Check
                          className={`w-3.5 h-3.5 ${
                            ['white', 'warm-white', 'yellow', 'lemon'].includes(color.id)
                              ? 'text-slate-800'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
              {activeColor && !isRGB && (
                <div className="mt-1.5 text-[11px] text-slate-400 flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: activeColor.hex }}
                  />
                  {activeColor.name}
                </div>
              )}
            </div>

            {/* ④ SIZE — always visible */}
            <div className="px-4 lg:px-5 py-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-6 bg-slate-800 text-white text-xs font-bold rounded-md flex items-center justify-center shrink-0">4</span>
                <span className="text-sm font-bold text-slate-800 uppercase tracking-wide">Size</span>
                <span className="text-xs text-slate-400 ml-auto">{widthCm} cm</span>
              </div>
              <div className="space-y-2.5">
                {/* Size preset pills — horizontal scrollable */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
                  {SIZE_PRESETS.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => setWidthCm(preset.widthCm)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                        activeSizePreset === preset.id
                          ? 'border-neon-pink bg-neon-pink/5 text-neon-pink'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                {/* Custom slider */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-400 w-10">30 cm</span>
                  <input
                    type="range"
                    min="30"
                    max="200"
                    step="5"
                    value={widthCm}
                    onChange={e => setWidthCm(Number(e.target.value))}
                    className="flex-1 h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-neon-pink"
                  />
                  <span className="text-[10px] text-slate-400 w-10 text-right">200 cm</span>
                </div>
                <div className="text-center text-[11px] text-slate-500">
                  {widthCm} cm ({(widthCm / 2.54).toFixed(1)} inches)
                </div>
              </div>
            </div>

            {/* ⑤ CUSTOMIZE — collapsible advanced options */}
            <div className="px-4 lg:px-5">
              <button
                onClick={() => toggleSection('advanced')}
                className="w-full flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 bg-slate-800 text-white text-xs font-bold rounded-md flex items-center justify-center shrink-0">5</span>
                  <div className="text-left">
                    <span className="text-sm font-bold text-slate-800 uppercase tracking-wide">Customize</span>
                    <p className="text-[11px] text-slate-400 font-normal">Backing, mounting & more options</p>
                  </div>
                </div>
                {expandedSections.advanced ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {expandedSections.advanced && (
                <div className="pb-4 space-y-4">
                  {/* Indoor / Outdoor */}
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase mb-2">Indoor / Outdoor</div>
                    <div className="grid grid-cols-2 gap-2">
                      <ToggleCard
                        active={!isOutdoor}
                        onClick={() => setIsOutdoor(false)}
                        title="Indoor"
                        description="For covered, dry locations"
                      />
                      <ToggleCard
                        active={isOutdoor}
                        onClick={() => setIsOutdoor(true)}
                        title="Outdoor"
                        description="IP65 Waterproof"
                        badge="+25%"
                      />
                    </div>
                  </div>

                  {/* Backboard Shape */}
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase mb-2">Backboard Shape</div>
                    <div className="space-y-1.5">
                      {BACKBOARD_SHAPES.map(shape => (
                        <button
                          key={shape.id}
                          onClick={() => setBackboardShape(shape.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all ${
                            backboardShape === shape.id
                              ? 'border-neon-pink bg-neon-pink/5'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {/* Mini shape illustration */}
                          <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                            <svg viewBox="0 0 40 24" className="w-full h-full">
                              {shape.id === 'rectangle' && (
                                <>
                                  <rect x="1" y="1" width="38" height="22" rx="2" fill="none"
                                    stroke={backboardShape === 'rectangle' ? '#FF2D78' : '#94a3b8'}
                                    strokeWidth="1.5" strokeDasharray="3 2" />
                                  <text x="20" y="15" textAnchor="middle" fontSize="8"
                                    fill={backboardShape === 'rectangle' ? '#FF2D78' : '#64748b'}
                                    fontWeight="bold">Ab</text>
                                </>
                              )}
                              {shape.id === 'cut-to-shape' && (
                                <>
                                  <path d="M5 4 Q3 4 3 6 L3 18 Q3 20 5 20 L35 20 Q37 20 37 18 L37 6 Q37 4 35 4 Z"
                                    fill="none"
                                    stroke={backboardShape === 'cut-to-shape' ? '#FF2D78' : '#94a3b8'}
                                    strokeWidth="1.5" strokeDasharray="3 2" />
                                  <text x="20" y="15" textAnchor="middle" fontSize="8"
                                    fill={backboardShape === 'cut-to-shape' ? '#FF2D78' : '#64748b'}
                                    fontWeight="bold">Ab</text>
                                </>
                              )}
                              {shape.id === 'cut-to-letter' && (
                                <>
                                  <rect x="4" y="3" width="14" height="18" rx="3" fill="none"
                                    stroke={backboardShape === 'cut-to-letter' ? '#FF2D78' : '#94a3b8'}
                                    strokeWidth="1.5" strokeDasharray="3 2" />
                                  <rect x="22" y="3" width="14" height="18" rx="3" fill="none"
                                    stroke={backboardShape === 'cut-to-letter' ? '#FF2D78' : '#94a3b8'}
                                    strokeWidth="1.5" strokeDasharray="3 2" />
                                  <text x="11" y="15" textAnchor="middle" fontSize="8"
                                    fill={backboardShape === 'cut-to-letter' ? '#FF2D78' : '#64748b'}
                                    fontWeight="bold">A</text>
                                  <text x="29" y="15" textAnchor="middle" fontSize="8"
                                    fill={backboardShape === 'cut-to-letter' ? '#FF2D78' : '#64748b'}
                                    fontWeight="bold">b</text>
                                </>
                              )}
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-medium ${
                                backboardShape === shape.id ? 'text-neon-pink' : 'text-slate-700'
                              }`}>
                                {shape.label}
                              </span>
                              {shape.cost > 0 && (
                                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-neon-pink/10 text-neon-pink">
                                  +{shape.cost} CHF
                                </span>
                              )}
                              {shape.cost === 0 && (
                                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-green-100 text-green-700">
                                  Included
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5">{shape.description}</p>
                          </div>
                          {backboardShape === shape.id && (
                            <div className="w-5 h-5 bg-neon-pink rounded-full flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Backboard Color */}
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase mb-2">Backboard Color</div>
                    <div className="flex flex-wrap gap-2">
                      {BACKBOARD_COLORS.map(bb => (
                        <button
                          key={bb.id}
                          onClick={() => setBackboardColor(bb.id)}
                          className={`px-3 py-2 rounded-lg border text-xs transition-all flex items-center gap-2 ${
                            backboardColor === bb.id
                              ? 'border-neon-pink bg-neon-pink/5 text-neon-pink font-medium'
                              : 'border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-slate-200 shrink-0"
                            style={{
                              backgroundColor: bb.hex === 'transparent'
                                ? 'transparent'
                                : bb.hex,
                              backgroundImage: bb.hex === 'transparent'
                                ? 'linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%), linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%)'
                                : undefined,
                              backgroundSize: bb.hex === 'transparent' ? '6px 6px' : undefined,
                              backgroundPosition: bb.hex === 'transparent' ? '0 0, 3px 3px' : undefined,
                            }}
                          />
                          {bb.label}
                          {bb.cost > 0 && (
                            <span className="text-slate-400 text-[10px]">+{bb.cost}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mounting */}
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase mb-2">Mounting</div>
                    <div className="space-y-1.5">
                      {MOUNT_OPTIONS.map(mount => (
                        <button
                          key={mount.id}
                          onClick={() => setMountType(mount.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-left transition-all ${
                            mountType === mount.id
                              ? 'border-neon-pink bg-neon-pink/5'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div>
                            <div className={`text-sm font-medium ${
                              mountType === mount.id ? 'text-neon-pink' : 'text-slate-700'
                            }`}>
                              {mount.label}
                            </div>
                            <div className="text-[11px] text-slate-400">{mount.description}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            {mount.cost > 0 && (
                              <span className="text-xs text-slate-400">+{mount.cost} CHF</span>
                            )}
                            {mountType === mount.id && (
                              <div className="w-5 h-5 bg-neon-pink rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                    {/* Dimmer & Remote — always included free */}
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-slate-700">Dimmer & Remote</div>
                          <div className="text-[11px] text-slate-400">Adjust brightness wirelessly</div>
                        </div>
                        <span className="text-[11px] font-semibold px-2 py-1 rounded-lg bg-green-100 text-green-700 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Free
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ⑨ PRICE SUMMARY (Sticky bottom) */}
        <div className="border-t border-slate-200 bg-white p-4 lg:p-5 space-y-3 shrink-0">
          {logoFile ? (
            <>
              {/* Logo mode — quote only */}
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Image className="w-5 h-5 text-neon-pink" />
                  <span className="text-sm font-semibold text-slate-700">Logo/Design Mode</span>
                </div>
                <p className="text-xs text-slate-400">
                  Custom logos require a personalized quote. Our team will review your design and send you a free mockup with pricing within 24 hours.
                </p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => { setOrderMode('quote'); setOrderModalOpen(true); }}
                  className="w-full bg-neon-pink hover:bg-neon-pink/90 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-neon-pink/25 text-sm btn-glow"
                >
                  Get Free Quote for Logo
                </button>
              </div>
            </>
          ) : priceBreakdown ? (
            <>
              {/* Price breakdown */}
              <div className="space-y-1.5">
                <PriceLine label="Base price" value={priceBreakdown.basePrice} />
                {priceBreakdown.outdoorAddon > 0 && (
                  <PriceLine label="Outdoor (IP65)" value={priceBreakdown.outdoorAddon} />
                )}
                {priceBreakdown.rgbAddon > 0 && (
                  <PriceLine label="RGB Color Changing" value={priceBreakdown.rgbAddon} />
                )}
                {priceBreakdown.dimmerAddon > 0 && (
                  <PriceLine label="Dimmer & Remote" value={priceBreakdown.dimmerAddon} />
                )}
                {priceBreakdown.mountAddon > 0 && (
                  <PriceLine label="Mounting upgrade" value={priceBreakdown.mountAddon} />
                )}
                {priceBreakdown.shapeAddon > 0 && (
                  <PriceLine label="Backboard shape" value={priceBreakdown.shapeAddon} />
                )}
                {priceBreakdown.backboardAddon > 0 && (
                  <PriceLine label="Backboard upgrade" value={priceBreakdown.backboardAddon} />
                )}

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-700">Total</span>
                  <span className="text-2xl font-bold text-neon-pink font-heading">
                    {priceBreakdown.totalPrice} CHF
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => { setOrderMode('order'); setOrderModalOpen(true); }}
                  className="w-full bg-neon-pink hover:bg-neon-pink/90 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-neon-pink/25 text-sm btn-glow"
                >
                  Order Now — {priceBreakdown.totalPrice} CHF
                </button>
                <button
                  onClick={() => { setOrderMode('quote'); setOrderModalOpen(true); }}
                  className="w-full bg-white border-2 border-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all text-sm"
                >
                  Get Free Quote
                </button>
              </div>
            </>
          ) : (
            <div className="text-center text-sm text-slate-400 py-2">
              Enter text to see pricing
            </div>
          )}

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-3 text-[10px] text-slate-400 flex-wrap">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3" /> 2 Year Warranty
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-green-500" /> Free Dimmer & Remote
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> Free Mockup
            </span>
            <span className="flex items-center gap-1">
              <Truck className="w-3 h-3" /> Handmade in Zurich
            </span>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        calcState={calcState}
        mode={orderMode}
      />
    </>
  );
}

// ─── Subcomponents ───

function SectionWrapper({
  number,
  title,
  subtitle,
  expanded,
  onToggle,
  children,
}: {
  number: number;
  title: string;
  subtitle?: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 lg:px-5">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3.5"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 bg-slate-800 text-white text-xs font-bold rounded-md flex items-center justify-center shrink-0">
            {number}
          </span>
          <div className="text-left">
            <span className="text-sm font-bold text-slate-800 uppercase tracking-wide">{title}</span>
            {subtitle && (
              <p className="text-[11px] text-slate-400 font-normal">{subtitle}</p>
            )}
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>
      {expanded && (
        <div className="pb-4">
          {children}
        </div>
      )}
    </div>
  );
}

function EffectRadio({
  selected,
  onClick,
  title,
  description,
  badge,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-3 px-3 py-3 rounded-xl border text-left transition-all ${
        selected
          ? 'border-neon-pink bg-neon-pink/5'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className={`w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
        selected ? 'border-neon-pink' : 'border-slate-300'
      }`}>
        {selected && <div className="w-2.5 h-2.5 bg-neon-pink rounded-full" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${selected ? 'text-neon-pink' : 'text-slate-700'}`}>
            {title}
          </span>
          {badge && (
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
              badge === 'Free'
                ? 'bg-green-100 text-green-700'
                : 'bg-neon-pink/10 text-neon-pink'
            }`}>
              {badge}
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-400 mt-0.5">{description}</p>
      </div>
    </button>
  );
}

function ToggleCard({
  active,
  onClick,
  title,
  description,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center px-3 py-3 rounded-xl border text-center transition-all ${
        active
          ? 'border-neon-pink bg-neon-pink/5 ring-1 ring-neon-pink/20'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <span className={`text-sm font-semibold ${active ? 'text-neon-pink' : 'text-slate-700'}`}>
        {title}
      </span>
      <span className="text-[11px] text-slate-400">{description}</span>
      {badge && (
        <span className="text-[10px] font-semibold text-neon-pink mt-1">{badge}</span>
      )}
    </button>
  );
}

function PriceLine({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-700 font-medium">{value > 0 ? `+${value}` : value} CHF</span>
    </div>
  );
}
