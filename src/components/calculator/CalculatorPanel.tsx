import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AlignLeft, AlignCenter, AlignRight,
  Check, Shield, Clock, Truck,
  ChevronDown, ChevronUp,
  ExternalLink,
} from 'lucide-react';
import type { UseNeonCalculatorReturn } from '../../hooks/useNeonCalculator';
import { neonColors } from '../../data/neonColors';
import { SIZE_PRESETS, MOUNT_OPTIONS, BACKBOARD_COLORS } from '../../data/pricing';
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
    hasDimmer, setHasDimmer,
    mountType, setMountType,
    backboardColor, setBackboardColor,
    priceBreakdown,
  } = calcState;

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderMode, setOrderMode] = useState<'order' | 'quote'>('order');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    text: true, font: true, effects: true, color: true,
    size: true, location: true, backboard: false, mount: false,
  });

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

            {/* ① ENTER YOUR TEXT */}
            <SectionWrapper
              number={1}
              title="Enter Your Text"
              expanded={expandedSections.text}
              onToggle={() => toggleSection('text')}
            >
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
                {/* Logo/Design CTA */}
                <Link
                  to={`/${lang || 'en'}/custom-order`}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-neon-violet to-neon-pink text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all shadow-sm"
                >
                  I Have a Design or Logo
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </SectionWrapper>

            {/* ② CHOOSE FONT */}
            <SectionWrapper
              number={2}
              title="Choose Font"
              subtitle="Prices vary by the amount of LED neon required."
              expanded={expandedSections.font}
              onToggle={() => toggleSection('font')}
            >
              <FontSelector
                selectedFontId={selectedFontId}
                onSelect={setSelectedFontId}
              />
            </SectionWrapper>

            {/* ③ SPECIAL EFFECTS */}
            <SectionWrapper
              number={3}
              title="Special Effects"
              expanded={expandedSections.effects}
              onToggle={() => toggleSection('effects')}
            >
              <div className="space-y-2">
                <EffectRadio
                  selected={!isRGB}
                  onClick={() => setIsRGB(false)}
                  title="Single Color with Dimmer & Remote"
                  description="A sign in a single color, with a free dimmer and remote"
                  badge="Free"
                />
                <EffectRadio
                  selected={isRGB}
                  onClick={() => setIsRGB(true)}
                  title="RGB Color Changing"
                  description="Remote control the color and simple color-changing effects"
                  badge="+50%"
                />
              </div>
            </SectionWrapper>

            {/* ④ CHOOSE COLOR */}
            {!isRGB && (
              <SectionWrapper
                number={4}
                title="Choose Color"
                expanded={expandedSections.color}
                onToggle={() => toggleSection('color')}
              >
                <div className="flex flex-wrap gap-2.5">
                  {neonColors.map(color => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColorId(color.id)}
                      title={color.name}
                      className={`w-9 h-9 rounded-full transition-all flex items-center justify-center relative ${
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
                          className={`w-4 h-4 ${
                            ['white', 'warm-white', 'yellow', 'lemon'].includes(color.id)
                              ? 'text-slate-800'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
                {activeColor && !isRGB && (
                  <div className="mt-2 text-xs text-slate-500 flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: activeColor.hex }}
                    />
                    {activeColor.name}
                  </div>
                )}
              </SectionWrapper>
            )}

            {/* ⑤ CHOOSE SIZE */}
            <SectionWrapper
              number={isRGB ? 4 : 5}
              title="Choose Size"
              expanded={expandedSections.size}
              onToggle={() => toggleSection('size')}
            >
              <div className="space-y-3">
                {/* Size preset cards */}
                <div className="grid grid-cols-2 gap-2">
                  {SIZE_PRESETS.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => setWidthCm(preset.widthCm)}
                      className={`px-3 py-2.5 rounded-xl border text-left transition-all ${
                        activeSizePreset === preset.id
                          ? 'border-neon-pink bg-neon-pink/5 ring-1 ring-neon-pink/20'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`text-sm font-semibold ${
                        activeSizePreset === preset.id ? 'text-neon-pink' : 'text-slate-800'
                      }`}>
                        {preset.label}
                      </div>
                      <div className="text-[11px] text-slate-400">{preset.widthCm} cm • {preset.description}</div>
                    </button>
                  ))}
                </div>

                {/* Custom slider */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-12">30 cm</span>
                  <input
                    type="range"
                    min="30"
                    max="200"
                    step="5"
                    value={widthCm}
                    onChange={e => setWidthCm(Number(e.target.value))}
                    className="flex-1 h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-neon-pink"
                  />
                  <span className="text-xs text-slate-400 w-12 text-right">200 cm</span>
                </div>
                <div className="text-center text-xs font-semibold text-slate-600">
                  Custom: {widthCm} cm ({(widthCm / 2.54).toFixed(1)} inches)
                </div>
              </div>
            </SectionWrapper>

            {/* ⑥ INDOOR / OUTDOOR */}
            <SectionWrapper
              number={isRGB ? 5 : 6}
              title="Indoor / Outdoor"
              expanded={expandedSections.location}
              onToggle={() => toggleSection('location')}
            >
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
                  badge="+40%"
                />
              </div>
            </SectionWrapper>

            {/* ⑦ BACKBOARD STYLE */}
            <SectionWrapper
              number={isRGB ? 6 : 7}
              title="Backboard"
              expanded={expandedSections.backboard}
              onToggle={() => toggleSection('backboard')}
            >
              <div className="space-y-3">
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
            </SectionWrapper>

            {/* ⑧ MOUNTING */}
            <SectionWrapper
              number={isRGB ? 7 : 8}
              title="Mounting"
              expanded={expandedSections.mount}
              onToggle={() => toggleSection('mount')}
            >
              <div className="space-y-2">
                {MOUNT_OPTIONS.map(mount => (
                  <button
                    key={mount.id}
                    onClick={() => setMountType(mount.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-all ${
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

                {/* Dimmer toggle */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <div className="text-sm font-medium text-slate-700">Dimmer & Remote</div>
                      <div className="text-[11px] text-slate-400">Adjust brightness wirelessly</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">+30 CHF</span>
                      <button
                        onClick={() => setHasDimmer(!hasDimmer)}
                        className={`relative w-10 h-5.5 rounded-full transition-colors ${
                          hasDimmer ? 'bg-neon-pink' : 'bg-slate-200'
                        }`}
                      >
                        <span className={`absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-transform ${
                          hasDimmer ? 'left-5' : 'left-0.5'
                        }`} />
                      </button>
                    </div>
                  </label>
                </div>
              </div>
            </SectionWrapper>
          </div>
        </div>

        {/* ⑨ PRICE SUMMARY (Sticky bottom) */}
        <div className="border-t border-slate-200 bg-white p-4 lg:p-5 space-y-3 shrink-0">
          {priceBreakdown ? (
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
          <div className="flex items-center justify-center gap-3 text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3" /> 2 Year Warranty
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
