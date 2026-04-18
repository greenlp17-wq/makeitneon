import { useMemo } from 'react';
import { Power } from 'lucide-react';
import type { UseNeonCalculatorReturn } from '../../hooks/useNeonCalculator';
import { BackgroundSelector, wallBackgrounds } from './BackgroundSelector';

export function NeonPreview({ calcState }: { calcState: UseNeonCalculatorReturn }) {
  const {
    engineResult,
    activeColor,
    isCalculating,
    isNeonOn,
    setIsNeonOn,
    backgroundId,
    setBackgroundId,
    widthCm,
    setWidthCm,
    priceBreakdown,
    isRGB,
    backboardShape,
  } = calcState;

  const wallStyle = useMemo(
    () => wallBackgrounds.find(b => b.id === backgroundId)?.style || wallBackgrounds[0].style,
    [backgroundId]
  );

  // Determine the display color for RGB mode (animate or use gradient)
  const glowHex = isRGB ? '#FF2D78' : (activeColor.glowColor || activeColor.hex);


  // Loading state
  if (isCalculating && !engineResult) {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">
        <div
          className="flex flex-col items-center justify-center w-full min-h-[350px] lg:min-h-[500px] gap-4"
          style={wallBackgrounds[0].style}
        >
          <div className="relative">
            <div className="w-12 h-12 border-2 border-neon-pink/30 border-t-neon-pink rounded-full animate-spin" />
            <div className="absolute inset-0 w-12 h-12 border-2 border-transparent border-b-neon-violet/50 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          </div>
          <div className="text-white/60 text-sm font-medium">
            Preparing your preview...
          </div>
        </div>
      </div>
    );
  }

  const { paddingMm = 30, cutWidthMm = 600, cutHeightMm = 200, pathData = '', widthMm = 0, heightMm = 0 } = engineResult || {};

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl group">
      {/* Main Preview Area */}
      <div
        className="relative w-full min-h-[350px] lg:min-h-[500px] flex items-center justify-center transition-all duration-500"
        style={wallStyle}
      >
        {/* ON/OFF Toggle */}
        <button
          onClick={() => setIsNeonOn(!isNeonOn)}
          className={`absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
            isNeonOn
              ? 'bg-green-500/20 border-green-500/40 text-green-400'
              : 'bg-white/10 border-white/20 text-white/50'
          }`}
        >
          <Power className="w-3.5 h-3.5" />
          {isNeonOn ? 'ON' : 'OFF'}
        </button>

        {/* Total Price Display */}
        {priceBreakdown && (
          <div className="absolute top-4 right-4 z-10 text-right">
            <div className="text-white/40 text-xs font-medium uppercase tracking-wider">Total</div>
            <div className="text-white text-2xl lg:text-3xl font-bold font-heading">
              {priceBreakdown.totalPrice} <span className="text-base font-normal text-white/60">CHF</span>
            </div>
          </div>
        )}

        {/* SVG Preview */}
        {pathData && (
          <svg
            id="preview-svg"
            width="100%"
            height="100%"
            viewBox={`-${paddingMm} -${paddingMm} ${cutWidthMm} ${cutHeightMm}`}
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full p-6 lg:p-10 transition-all duration-300"
          >
            <defs>
              {/* Neon glow filter — optimized for filled paths */}
              {isNeonOn && (
                <>
                  {/* Wide ambient glow */}
                  <filter id="neon-glow-wide" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="22" />
                  </filter>
                  {/* Medium glow halo */}
                  <filter id="neon-glow-mid" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
                  </filter>
                  {/* Tight inner glow for bright core */}
                  <filter id="neon-glow-core" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                  </filter>
                </>
              )}

              {/* RGB gradient for RGB mode */}
              {isRGB && isNeonOn && (
                <linearGradient id="rgb-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF0000" />
                  <stop offset="16%" stopColor="#FF8800" />
                  <stop offset="33%" stopColor="#FFFF00" />
                  <stop offset="50%" stopColor="#00FF00" />
                  <stop offset="66%" stopColor="#0088FF" />
                  <stop offset="83%" stopColor="#8800FF" />
                  <stop offset="100%" stopColor="#FF0088" />
                </linearGradient>
              )}
            </defs>

            <g id="preview-group">
              {/* Acrylic Backing outline — shape-dependent */}
              {backboardShape === 'rectangle' && (
                <rect
                  x={-paddingMm}
                  y={-paddingMm}
                  width={cutWidthMm}
                  height={cutHeightMm}
                  rx={20}
                  fill="rgba(255,255,255,0.02)"
                  stroke="rgba(255,255,255,0.1)"
                  strokeDasharray="12 12"
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
              )}
              {backboardShape === 'cut-to-shape' && (
                <rect
                  x={-paddingMm * 0.5}
                  y={-paddingMm * 0.5}
                  width={widthMm + paddingMm}
                  height={heightMm + paddingMm}
                  rx={Math.min(paddingMm, 30)}
                  fill="rgba(255,255,255,0.02)"
                  stroke="rgba(255,255,255,0.15)"
                  strokeDasharray="8 6"
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
              )}
              {/* cut-to-letter = no visible backing (invisible mount) */}

              {isNeonOn ? (
                <>
                  {/* Layer 1: Wide ambient glow (color, very blurred) */}
                  <path
                    d={pathData}
                    fill={isRGB ? 'url(#rgb-gradient)' : glowHex}
                    stroke="none"
                    opacity="0.4"
                    className="transition-all duration-500"
                    filter="url(#neon-glow-wide)"
                  />
                  {/* Layer 2: Medium glow halo */}
                  <path
                    d={pathData}
                    fill={isRGB ? 'url(#rgb-gradient)' : glowHex}
                    stroke="none"
                    opacity="0.6"
                    className="transition-all duration-400"
                    filter="url(#neon-glow-mid)"
                  />
                  {/* Layer 3: Solid color fill (the "tube") */}
                  <path
                    d={pathData}
                    fill={isRGB ? 'url(#rgb-gradient)' : glowHex}
                    stroke="none"
                    opacity="0.95"
                    className="transition-all duration-300"
                    filter="url(#neon-glow-core)"
                  />
                  {/* Layer 4: White-hot center core */}
                  <path
                    d={pathData}
                    fill="#ffffff"
                    stroke="none"
                    opacity="0.6"
                    className="transition-all duration-300"
                  />
                </>
              ) : (
                /* OFF state — muted filled shape */
                <path
                  d={pathData}
                  fill="rgba(255,255,255,0.15)"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                  className="transition-all duration-500"
                />
              )}
            </g>
          </svg>
        )}

        {/* No text placeholder */}
        {!pathData && !isCalculating && (
          <div className="text-white/30 text-lg font-medium">
            Type something to see your neon sign...
          </div>
        )}

        {/* Dimension Markers */}
        {engineResult && widthMm > 0 && (
          <>
            {/* Width dimension — bottom */}
            <div className="absolute bottom-[70px] left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/50 text-xs">
              <div className="w-8 h-px bg-white/30" />
              <span className="bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded text-white/70 font-medium">
                {(widthMm / 10).toFixed(0)} cm
              </span>
              <div className="w-8 h-px bg-white/30" />
            </div>

            {/* Height dimension — right */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 text-white/50 text-xs">
              <div className="w-px h-6 bg-white/30" />
              <span className="bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded text-white/70 font-medium whitespace-nowrap -rotate-90 origin-center">
                {(heightMm / 10).toFixed(0)} cm
              </span>
              <div className="w-px h-6 bg-white/30" />
            </div>
          </>
        )}
      </div>

      {/* Bottom Bar — Width Slider + Background Selector */}
      <div className="bg-black/80 backdrop-blur-md border-t border-white/10 px-4 py-3 flex flex-col sm:flex-row items-center gap-3">
        {/* Width Slider */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-white/50 text-xs font-medium uppercase tracking-wider whitespace-nowrap">
            Width: {widthCm} cm
          </span>
          <input
            type="range"
            min="30"
            max="200"
            step="5"
            value={widthCm}
            onChange={e => setWidthCm(Number(e.target.value))}
            className="flex-1 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-pink min-w-[120px]"
          />
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-6 bg-white/10" />

        {/* Background Selector */}
        <BackgroundSelector selectedId={backgroundId} onSelect={setBackgroundId} />

        {/* Mockup disclaimer */}
        <span className="text-white/30 text-[10px] whitespace-nowrap">Digital Mockup Only</span>
      </div>
    </div>
  );
}
