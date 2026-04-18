import { useState, useEffect, useMemo, useCallback } from 'react';
import opentype from 'opentype.js';
import { neonFonts, type NeonFont } from '../data/fonts';
import { neonColors, RGB_OPTION, type NeonColor } from '../data/neonColors';
import { processEngine, type CNCEngineResult, generateSVGString } from '../lib/cncEngine';
import {
  BASE_COST,
  PRICE_PER_METER_NEON,
  PRICE_PER_METER_LASER,
  ADDON_OUTDOOR_MULTIPLIER,
  ADDON_RGB_MULTIPLIER,
  ADDON_DIMMER_COST,
  MOUNT_OPTIONS,
  BACKBOARD_COLORS,
  BACKBOARD_SHAPES,
  type MountType,
  type BackboardColor,
  type BackboardShape,
} from '../data/pricing';

// ─── Types ───

export type TextAlign = 'left' | 'center' | 'right';

export interface PriceBreakdown {
  basePrice: number;           // BASE_COST + neonMeters*rate + laserMeters*rate
  outdoorAddon: number;        // +25% if outdoor
  rgbAddon: number;            // +50% if RGB
  dimmerAddon: number;         // fixed if selected
  mountAddon: number;          // fixed for hanging/stand
  shapeAddon: number;          // fixed for cut-to-shape/cut-to-letter
  backboardAddon: number;      // fixed for colored backboard
  totalPrice: number;
}

export interface UseNeonCalculatorReturn {
  // Text
  text: string;
  setText: (t: string) => void;
  textAlign: TextAlign;
  setTextAlign: (a: TextAlign) => void;
  lineCount: number;

  // Size
  widthCm: number;
  setWidthCm: (w: number) => void;

  // Font
  selectedFontId: string;
  setSelectedFontId: (id: string) => void;
  fontObject: opentype.Font | null;
  activeFont: NeonFont;

  // Color
  selectedColorId: string;
  setSelectedColorId: (id: string) => void;
  activeColor: NeonColor;

  // Options
  isRGB: boolean;
  setIsRGB: (v: boolean) => void;
  isOutdoor: boolean;
  setIsOutdoor: (v: boolean) => void;
  hasDimmer: boolean;
  setHasDimmer: (v: boolean) => void;
  mountType: MountType;
  setMountType: (t: MountType) => void;
  backboardColor: BackboardColor;
  setBackboardColor: (c: BackboardColor) => void;
  backboardShape: BackboardShape;
  setBackboardShape: (s: BackboardShape) => void;

  // Preview
  backgroundId: string;
  setBackgroundId: (id: string) => void;
  isNeonOn: boolean;
  setIsNeonOn: (v: boolean) => void;

  // Engine
  engineResult: CNCEngineResult | null;
  isCalculating: boolean;

  // Pricing
  priceBreakdown: PriceBreakdown | null;

  // Actions
  generateOrderSVG: () => string | null;
}

export function useNeonCalculator(initialText: string = 'Make It Neon'): UseNeonCalculatorReturn {
  // ─── Text State ───
  const [text, setText] = useState(initialText);
  const [textAlign, setTextAlign] = useState<TextAlign>('center');

  // ─── Size ───
  const [widthCm, setWidthCm] = useState(80);

  // ─── Font ───
  const [selectedFontId, setSelectedFontId] = useState(neonFonts[0].id); // Barcelona/Pacifico default
  const [fontObject, setFontObject] = useState<opentype.Font | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // ─── Color ───
  const [selectedColorId, setSelectedColorId] = useState('hot-pink');

  // ─── Options ───
  const [isRGB, setIsRGB] = useState(false);
  const [isOutdoor, setIsOutdoor] = useState(false);
  const [hasDimmer, setHasDimmer] = useState(true); // included free with every sign
  const [mountType, setMountType] = useState<MountType>('wall');
  const [backboardColor, setBackboardColor] = useState<BackboardColor>('clear');
  const [backboardShape, setBackboardShape] = useState<BackboardShape>('rectangle');

  // ─── Preview ───
  const [backgroundId, setBackgroundId] = useState('dark-wall');
  const [isNeonOn, setIsNeonOn] = useState(true);

  // ─── Derived Values ───
  const lineCount = useMemo(() => {
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    return Math.max(1, Math.min(lines.length, 2));
  }, [text]);

  const activeFont = useMemo(
    () => neonFonts.find(f => f.id === selectedFontId) || neonFonts[0],
    [selectedFontId]
  );

  const activeColor = useMemo(
    () => {
      if (isRGB) return RGB_OPTION;
      return neonColors.find(c => c.id === selectedColorId) || neonColors[0];
    },
    [selectedColorId, isRGB]
  );

  // ─── Font Loading (with timeout + retry) ───
  useEffect(() => {
    let isMounted = true;
    const TIMEOUT_MS = 10_000;
    const MAX_RETRIES = 2;

    const loadFontWithTimeout = (url: string): Promise<opentype.Font> => {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          reject(new Error(`Font load timed out after ${TIMEOUT_MS}ms`));
        }, TIMEOUT_MS);

        opentype.load(url, (err: Error | unknown, font: opentype.Font | undefined) => {
          clearTimeout(timer);
          if (err) reject(err);
          else if (font) resolve(font);
          else reject(new Error('Font loaded but returned undefined'));
        });
      });
    };

    const loadWithRetry = async () => {
      setIsCalculating(true);

      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        if (!isMounted) return;
        try {
          const font = await loadFontWithTimeout(activeFont.url);
          if (!isMounted) return;
          setFontObject(font);
          setIsCalculating(false);
          return;
        } catch (err) {
          console.warn(`[Font] Attempt ${attempt + 1}/${MAX_RETRIES + 1} failed for "${activeFont.name}":`, err);
          // Wait a bit before retrying (exponential backoff)
          if (attempt < MAX_RETRIES) {
            await new Promise(r => setTimeout(r, 500 * (attempt + 1)));
          }
        }
      }

      // All retries exhausted
      if (isMounted) {
        console.error(`[Font] Failed to load "${activeFont.name}" after ${MAX_RETRIES + 1} attempts`);
        setIsCalculating(false);
      }
    };

    // Delay to next microtask to avoid synchronous setState inside useEffect
    Promise.resolve().then(() => {
      if (isMounted) loadWithRetry();
    });

    return () => {
      isMounted = false;
    };
  }, [activeFont]);

  // ─── CNC Engine ───
  const engineResult = useMemo(() => {
    if (!fontObject || !text.trim()) return null;
    // For multiline: process each line, combine results
    const lines = text.split('\n').filter(l => l.trim().length > 0).slice(0, 2);
    if (lines.length === 0) return null;

    if (lines.length === 1) {
      return processEngine(fontObject, lines[0], widthCm);
    }

    // Two lines: each line takes widthCm, stack vertically
    const line1Result = processEngine(fontObject, lines[0], widthCm);
    const line2Result = processEngine(fontObject, lines[1], widthCm);
    if (!line1Result || !line2Result) return line1Result || line2Result;

    // Combine: width = max of both, height = sum, paths concatenated
    const gap = 20; // 20mm gap between lines
    const combinedWidthMm = Math.max(line1Result.widthMm, line2Result.widthMm);
    const combinedHeightMm = line1Result.heightMm + gap + line2Result.heightMm;

    // Offset line2 path vertically
    const line2OffsetY = line1Result.heightMm + gap;
    // Handle all path commands for vertical offset
    const offsetCurves = (path: string, offsetY: number): string => {
      let result = '';
      const parts = path.split(/(?=[MLCQZ])/);
      for (const part of parts) {
        if (!part.trim()) continue;
        const cmd = part[0];
        const nums = part.slice(1).trim().split(/\s+/).map(Number);
        if (cmd === 'M' || cmd === 'L') {
          result += `${cmd}${nums[0].toFixed(2)} ${(nums[1] + offsetY).toFixed(2)} `;
        } else if (cmd === 'Q') {
          result += `Q${nums[0].toFixed(2)} ${(nums[1] + offsetY).toFixed(2)} ${nums[2].toFixed(2)} ${(nums[3] + offsetY).toFixed(2)} `;
        } else if (cmd === 'C') {
          result += `C${nums[0].toFixed(2)} ${(nums[1] + offsetY).toFixed(2)} ${nums[2].toFixed(2)} ${(nums[3] + offsetY).toFixed(2)} ${nums[4].toFixed(2)} ${(nums[5] + offsetY).toFixed(2)} `;
        } else if (cmd === 'Z') {
          result += 'Z ';
        }
      }
      return result.trim();
    };

    const combinedPathData = line1Result.pathData + ' ' + offsetCurves(line2Result.pathData, line2OffsetY);
    const padMm = line1Result.paddingMm;
    const combinedCutWidthMm = combinedWidthMm + padMm * 2;
    const combinedCutHeightMm = combinedHeightMm + padMm * 2;
    const combinedCuttingMeter = ((combinedCutWidthMm + combinedCutHeightMm) * 2) / 1000;
    const combinedMillingMeter = line1Result.millingMeters + line2Result.millingMeters;
    const combinedCuttingPath = `M-${padMm} -${padMm} L${combinedWidthMm + padMm} -${padMm} L${combinedWidthMm + padMm} ${combinedHeightMm + padMm} L-${padMm} ${combinedHeightMm + padMm} Z`;

    const price = BASE_COST + combinedMillingMeter * PRICE_PER_METER_NEON + combinedCuttingMeter * PRICE_PER_METER_LASER;

    return {
      pathData: combinedPathData,
      cuttingPathData: combinedCuttingPath,
      widthMm: combinedWidthMm,
      heightMm: combinedHeightMm,
      cutWidthMm: combinedCutWidthMm,
      cutHeightMm: combinedCutHeightMm,
      millingMeters: combinedMillingMeter,
      cuttingMeters: combinedCuttingMeter,
      price,
      paddingMm: padMm,
    } as CNCEngineResult;
  }, [fontObject, text, widthCm]);

  // ─── Price Breakdown ───
  const priceBreakdown = useMemo((): PriceBreakdown | null => {
    if (!engineResult) return null;

    const basePrice = engineResult.price;
    const outdoorAddon = isOutdoor ? basePrice * (ADDON_OUTDOOR_MULTIPLIER - 1) : 0;
    const rgbAddon = isRGB ? basePrice * (ADDON_RGB_MULTIPLIER - 1) : 0;

    // Fixed addons
    const dimmerAddon = hasDimmer ? ADDON_DIMMER_COST : 0;
    const mountAddon = MOUNT_OPTIONS.find(m => m.id === mountType)?.cost || 0;
    const shapeAddon = BACKBOARD_SHAPES.find(s => s.id === backboardShape)?.cost || 0;
    const backboardAddon = BACKBOARD_COLORS.find(b => b.id === backboardColor)?.cost || 0;

    const totalPrice = basePrice + outdoorAddon + rgbAddon + dimmerAddon + mountAddon + shapeAddon + backboardAddon;

    return {
      basePrice: Math.round(basePrice),
      outdoorAddon: Math.round(outdoorAddon),
      rgbAddon: Math.round(rgbAddon),
      dimmerAddon,
      mountAddon,
      shapeAddon,
      backboardAddon,
      totalPrice: Math.round(totalPrice),
    };
  }, [engineResult, isOutdoor, isRGB, hasDimmer, mountType, backboardShape, backboardColor]);

  // ─── SVG Generation (for email, not for client download) ───
  const generateOrderSVG = useCallback((): string | null => {
    if (!engineResult) return null;
    return generateSVGString(engineResult, widthCm);
  }, [engineResult, widthCm]);

  return {
    text,
    setText,
    textAlign,
    setTextAlign,
    lineCount,

    widthCm,
    setWidthCm,

    selectedFontId,
    setSelectedFontId,
    fontObject,
    activeFont,

    selectedColorId,
    setSelectedColorId,
    activeColor,

    isRGB,
    setIsRGB,
    isOutdoor,
    setIsOutdoor,
    hasDimmer,
    setHasDimmer,
    mountType,
    setMountType,
    backboardColor,
    setBackboardColor,
    backboardShape,
    setBackboardShape,

    backgroundId,
    setBackgroundId,
    isNeonOn,
    setIsNeonOn,

    engineResult,
    isCalculating,
    priceBreakdown,

    generateOrderSVG,
  };
}
