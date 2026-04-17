import opentype from 'opentype.js';
import { PRICE_PER_METER_NEON, PRICE_PER_METER_LASER, BASE_COST, PADDING_CM } from '../data/pricing';

export interface CNCEngineResult {
  pathData: string;
  widthMm: number;
  heightMm: number;
  cutWidthMm: number;
  cutHeightMm: number;
  millingMeters: number;
  cuttingMeters: number;
  price: number;
  paddingMm: number;
  cuttingPathData: string;
}

export function processEngine(font: opentype.Font | null, text: string, widthCm: number): CNCEngineResult | null {
  if (!font || !text) {
    return null;
  }

  // 1. Get raw font path at an arbitrary solid size (e.g., 100pt)
  const rawPath = font.getPath(text, 0, 0, 100);
  const bb = rawPath.getBoundingBox(); // {x1, y1, x2, y2}
  
  const internalWidth = bb.x2 - bb.x1;
  const internalHeight = bb.y2 - bb.y1;
  
  if (internalWidth <= 0 || internalHeight <= 0) return null;

  // 2. Calculate Scale Factor (SF) to convert to millimeters (mm)
  // CNC prefers millimeters over cm.
  const targetWidthMm = widthCm * 10;
  const SF = targetWidthMm / internalWidth;

  // 3. Calculate Real Height
  const targetHeightMm = internalHeight * SF;

  // 4. Generate Scaled Absolute Coordinates Path
  // CNC machines hate CSS transforms. We mathematically move points and normalize to Origin (0,0).
  let scaledD = '';
  type PathCommand = { type: string; x?: number; y?: number; x1?: number; y1?: number; x2?: number; y2?: number };
  rawPath.commands.forEach((cmd: PathCommand) => {
    const x = ((cmd.x || 0) - bb.x1) * SF;
    const y = ((cmd.y || 0) - bb.y1) * SF;
    const x1 = cmd.x1 !== undefined ? (cmd.x1 - bb.x1) * SF : 0;
    const y1 = cmd.y1 !== undefined ? (cmd.y1 - bb.y1) * SF : 0;
    const x2 = cmd.x2 !== undefined ? (cmd.x2 - bb.x1) * SF : 0;
    const y2 = cmd.y2 !== undefined ? (cmd.y2 - bb.y1) * SF : 0;

    if (cmd.type === 'M') scaledD += `M${x.toFixed(2)} ${y.toFixed(2)} `;
    else if (cmd.type === 'L') scaledD += `L${x.toFixed(2)} ${y.toFixed(2)} `;
    else if (cmd.type === 'Q') scaledD += `Q${x1.toFixed(2)} ${y1.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} `;
    else if (cmd.type === 'C') scaledD += `C${x1.toFixed(2)} ${y1.toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} `;
    else if (cmd.type === 'Z') scaledD += 'Z ';
  });

  scaledD = scaledD.trim();

  // 5. Measure Path Length (Utilizing Browser's detached SVGElement if possible, or fallback)
  const measureNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  measureNode.setAttribute('d', scaledD);
  
  // Some browsers need the node in the DOM to measure length
  measureNode.style.display = 'none';
  document.body.appendChild(measureNode);
  
  let rawOutlineLengthMm = 0;
  try {
    rawOutlineLengthMm = measureNode.getTotalLength();
  } catch (e) {
    console.error("Could not measure path length", e);
  }
  document.body.removeChild(measureNode);

  // Font is an outline, so the neon flex sits inside the groove (approx 50% length of the perimeter)
  const millingLengthMeter = (rawOutlineLengthMm / 2) / 1000;

  // 6. Calculate Acrylic Backing (Rectangular padding in mm)
  const padMm = PADDING_CM * 10;
  const cutWidthMm = targetWidthMm + (padMm * 2);
  const cutHeightMm = targetHeightMm + (padMm * 2);
  const cuttingLengthMeter = ((cutWidthMm + cutHeightMm) * 2) / 1000;

  // Simple rectangular cutting perimeter offset by paddingMm
  const cuttingPathM = `M-${padMm} -${padMm} L${targetWidthMm + padMm} -${padMm} L${targetWidthMm + padMm} ${targetHeightMm + padMm} L-${padMm} ${targetHeightMm + padMm} Z`;

  // 7. Pricing Formula
  const millingCost = millingLengthMeter * PRICE_PER_METER_NEON;
  const cuttingCost = cuttingLengthMeter * PRICE_PER_METER_LASER;
  const totalPrice = BASE_COST + millingCost + cuttingCost;

  return {
    pathData: scaledD,
    cuttingPathData: cuttingPathM,
    widthMm: targetWidthMm,
    heightMm: targetHeightMm,
    cutWidthMm: cutWidthMm,
    cutHeightMm: cutHeightMm,
    millingMeters: millingLengthMeter,
    cuttingMeters: cuttingLengthMeter,
    price: totalPrice,
    paddingMm: padMm
  };
}

/** Generate SVG string for CNC (for email attachment, NOT client download) */
export function generateSVGString(res: CNCEngineResult, widthCm: number): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="${res.cutWidthMm}mm" height="${res.cutHeightMm}mm" viewBox="-${res.paddingMm} -${res.paddingMm} ${res.cutWidthMm} ${res.cutHeightMm}" xmlns="http://www.w3.org/2000/svg">
  <!-- MakeItNeon CNC Export | Width: ${widthCm}cm | Generated: ${new Date().toISOString()} -->
  <!-- Milling Groove (Blue = neon flex channel) -->
  <g id="Milling_Groove" stroke="#0000ff" stroke-width="1" fill="none">
    <path d="${res.pathData}" />
  </g>
  <!-- Cutting Line (Red = acrylic cut perimeter) -->
  <g id="Cutting_Line" stroke="#ff0000" stroke-width="1" fill="none">
    <path d="${res.cuttingPathData}" />
  </g>
</svg>`;
}
