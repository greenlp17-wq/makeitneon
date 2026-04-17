// ═══════════════════════════════════════════════
// Make It Neon — Font Library
// ═══════════════════════════════════════════════

export interface NeonFont {
  id: string;
  name: string;
  category: FontCategory;
  url: string;
  googleName: string;
  weight?: number;
}

export type FontCategory = 'Script' | 'Sans-Serif' | 'Serif' | 'Fun' | 'Neon';

export const neonFonts: NeonFont[] = [
  {
    id: 'austin',
    name: 'Austin',
    category: 'Neon',
    url: `/fonts/Austin.ttf`,
    googleName: 'Austin'
  },
  {
    id: 'jura-regular',
    name: 'Jura Regular',
    category: 'Neon',
    url: `/fonts/Jura-Regular.woff2`,
    googleName: 'Jura-Regular'
  },
  {
    id: 'avante',
    name: 'Avante',
    category: 'Neon',
    url: `/fonts/Avante.ttf`,
    googleName: 'Avante'
  },
  {
    id: 'buttercup',
    name: 'Buttercup',
    category: 'Neon',
    url: `/fonts/Buttercup.ttf`,
    googleName: 'Buttercup'
  },
  {
    id: 'exodar',
    name: 'Exodar',
    category: 'Neon',
    url: `/fonts/Exodar.8a2f33e.ttf`,
    googleName: 'Exodar'
  },
  {
    id: 'beon',
    name: 'Beon',
    category: 'Neon',
    url: `/fonts/Beon.76f7cab.ttf`,
    googleName: 'Beon'
  },
  {
    id: 'amanda',
    name: 'Amanda',
    category: 'Neon',
    url: `/fonts/Amanda.ttf`,
    googleName: 'Amanda'
  },
  {
    id: 'classictype',
    name: 'ClassicType',
    category: 'Neon',
    url: `/fonts/ClassicType.ttf`,
    googleName: 'ClassicType'
  },
  {
    id: 'sanbernardinoregular',
    name: 'SanBernardinoRegular',
    category: 'Neon',
    url: `/fonts/SanBernardinoRegular.woff2`,
    googleName: 'SanBernardinoRegular'
  },
  {
    id: 'amaticsc-regular',
    name: 'AmaticSC Regular',
    category: 'Neon',
    url: `/fonts/AmaticSC-Regular.woff2`,
    googleName: 'AmaticSC-Regular'
  },
  {
    id: 'neonscript',
    name: 'Neonscript',
    category: 'Neon',
    url: `/fonts/Neonscript.ttf`,
    googleName: 'Neonscript'
  },
  {
    id: 'freehand',
    name: 'Freehand',
    category: 'Neon',
    url: `/fonts/Freehand.ttf`,
    googleName: 'Freehand'
  },
  {
    id: 'vampiroone-regular',
    name: 'VampiroOne Regular',
    category: 'Neon',
    url: `/fonts/VampiroOne-Regular.woff2`,
    googleName: 'VampiroOne-Regular'
  },
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    category: 'Neon',
    url: `/fonts/Neon Glow.06328cb.ttf`,
    googleName: 'Neon Glow'
  },
  {
    id: 'signature',
    name: 'Signature',
    category: 'Neon',
    url: `/fonts/Signature.ttf`,
    googleName: 'Signature'
  },
  {
    id: 'prologuescriptlite-regular',
    name: 'PrologueScriptLite Regular',
    category: 'Neon',
    url: `/fonts/PrologueScriptLite-Regular.woff2`,
    googleName: 'PrologueScriptLite-Regular'
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    category: 'Neon',
    url: `/fonts/Barcelona.ttf`,
    googleName: 'Barcelona'
  },
  {
    id: 'murreyc',
    name: 'MurreyC',
    category: 'Neon',
    url: `/fonts/MurreyC.woff2`,
    googleName: 'MurreyC'
  },
  {
    id: 'bpneon',
    name: 'BPneon',
    category: 'Neon',
    url: `/fonts/BPneon.9dbecbb.ttf`,
    googleName: 'BPneon'
  },
  {
    id: 'huxley',
    name: 'Huxley',
    category: 'Neon',
    url: `/fonts/Huxley.ttf`,
    googleName: 'Huxley'
  },
  {
    id: 'mama',
    name: 'Mama',
    category: 'Neon',
    url: `/fonts/Mama.c89f560.ttf`,
    googleName: 'Mama'
  },
  {
    id: 'neon-bines',
    name: 'Neon Bines',
    category: 'Neon',
    url: `/fonts/Neon Bines.bd66f01.ttf`,
    googleName: 'Neon Bines'
  },
  {
    id: 'library3amsoft',
    name: 'LIBRARY3AMsoft',
    category: 'Neon',
    url: `/fonts/LIBRARY3AMsoft.woff2`,
    googleName: 'LIBRARY3AMsoft'
  },
  {
    id: 'rocket',
    name: 'Rocket',
    category: 'Neon',
    url: `/fonts/Rocket.ttf`,
    googleName: 'Rocket'
  },
  {
    id: 'loveneon',
    name: 'LoveNeon',
    category: 'Neon',
    url: `/fonts/LoveNeon.ttf`,
    googleName: 'LoveNeon'
  },
  {
    id: 'prociono-regular',
    name: 'Prociono Regular',
    category: 'Neon',
    url: `/fonts/Prociono-Regular.woff2`,
    googleName: 'Prociono-Regular'
  },
  {
    id: 'neononeregular',
    name: 'NeonOneRegular',
    category: 'Neon',
    url: `/fonts/NeonOneRegular.woff2`,
    googleName: 'NeonOneRegular'
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    category: 'Neon',
    url: `/fonts/Amsterdam.ttf`,
    googleName: 'Amsterdam'
  },
  {
    id: 'rosamarena',
    name: 'RosaMarena',
    category: 'Neon',
    url: `/fonts/RosaMarena.woff2`,
    googleName: 'RosaMarena'
  },
  {
    id: 'chelsea',
    name: 'Chelsea',
    category: 'Neon',
    url: `/fonts/Chelsea.ttf`,
    googleName: 'Chelsea'
  },
  {
    id: 'neotokyo',
    name: 'NeoTokyo',
    category: 'Neon',
    url: `/fonts/NeoTokyo.ttf`,
    googleName: 'NeoTokyo'
  },
  {
    id: 'linoleoscript',
    name: 'LinoleoScript',
    category: 'Neon',
    url: `/fonts/LinoleoScript.woff2`,
    googleName: 'LinoleoScript'
  },
  {
    id: 'freespirit',
    name: 'Freespirit',
    category: 'Neon',
    url: `/fonts/Freespirit.ttf`,
    googleName: 'Freespirit'
  },
  {
    id: 'beachfront',
    name: 'Beachfront',
    category: 'Neon',
    url: `/fonts/Beachfront.ttf`,
    googleName: 'Beachfront'
  },
  {
    id: 'katona',
    name: 'Katona',
    category: 'Neon',
    url: `/fonts/Katona.ttf`,
    googleName: 'Katona'
  },
  {
    id: 'arciformsans',
    name: 'ArciformSans',
    category: 'Neon',
    url: `/fonts/ArciformSans.e9c40cc.ttf`,
    googleName: 'ArciformSans'
  },
  {
    id: 'royalty',
    name: 'Royalty',
    category: 'Neon',
    url: `/fonts/Royalty.ttf`,
    googleName: 'Royalty'
  },
  {
    id: 'bellview',
    name: 'Bellview',
    category: 'Neon',
    url: `/fonts/Bellview.ttf`,
    googleName: 'Bellview'
  },
  {
    id: 'houschka',
    name: 'Houschka',
    category: 'Neon',
    url: `/fonts/Houschka.ttf`,
    googleName: 'Houschka'
  },
  {
    id: 'vintage',
    name: 'Vintage',
    category: 'Neon',
    url: `/fonts/Vintage.ttf`,
    googleName: 'Vintage'
  },
  {
    id: 'redvevet',
    name: 'RedVevet',
    category: 'Neon',
    url: `/fonts/RedVevet.woff2`,
    googleName: 'RedVevet'
  },
  {
    id: 'roboto-bold',
    name: 'Roboto Bold',
    category: 'Neon',
    url: `/fonts/Roboto-Bold.75371f5.ttf`,
    googleName: 'Roboto-Bold'
  },
  {
    id: 'fontawesome-webfont',
    name: 'fontawesome webfont',
    category: 'Neon',
    url: `/fonts/fontawesome-webfont.woff2`,
    googleName: 'fontawesome-webfont'
  },
  {
    id: 'chilanka',
    name: 'Chilanka',
    category: 'Neon',
    url: `/fonts/Chilanka.6584c69.woff2`,
    googleName: 'Chilanka'
  },
  {
    id: 'marske',
    name: 'Marske',
    category: 'Neon',
    url: `/fonts/Marske.woff2`,
    googleName: 'Marske'
  },
  {
    id: 'festus',
    name: 'Festus',
    category: 'Neon',
    url: `/fonts/Festus.woff2`,
    googleName: 'Festus'
  },
  {
    id: 'greenworld',
    name: 'Greenworld',
    category: 'Neon',
    url: `/fonts/Greenworld.ttf`,
    googleName: 'Greenworld'
  },
  {
    id: 'caveat-regular',
    name: 'Caveat Regular',
    category: 'Neon',
    url: `/fonts/Caveat-Regular.woff2`,
    googleName: 'Caveat-Regular'
  },
  {
    id: 'comfortaa',
    name: 'Comfortaa',
    category: 'Neon',
    url: `/fonts/Comfortaa.ttf`,
    googleName: 'Comfortaa'
  },
  {
    id: 'handboys',
    name: 'HandBoys',
    category: 'Neon',
    url: `/fonts/HandBoys.woff2`,
    googleName: 'HandBoys'
  },
  {
    id: 'neonlite',
    name: 'NeonLite',
    category: 'Neon',
    url: `/fonts/NeonLite.ttf`,
    googleName: 'NeonLite'
  },
  {
    id: 'pacifico-latin-r',
    name: 'pacifico latin r',
    category: 'Neon',
    url: `/fonts/pacifico-latin-r.woff2`,
    googleName: 'pacifico-latin-r'
  },
  {
    id: 'wiesbadenswingltcyr-roman',
    name: 'WiesbadenSwingLTCYR Roman',
    category: 'Neon',
    url: `/fonts/WiesbadenSwingLTCYR-Roman.woff2`,
    googleName: 'WiesbadenSwingLTCYR-Roman'
  },
  {
    id: 'wildscript',
    name: 'WildScript',
    category: 'Neon',
    url: `/fonts/WildScript.ttf`,
    googleName: 'WildScript'
  },
  {
    id: 'marquee',
    name: 'Marquee',
    category: 'Neon',
    url: `/fonts/Marquee.ttf`,
    googleName: 'Marquee'
  },
  {
    id: 'monaco',
    name: 'Monaco',
    category: 'Neon',
    url: `/fonts/Monaco.ttf`,
    googleName: 'Monaco'
  },
  {
    id: 'nickainley',
    name: 'Nickainley',
    category: 'Neon',
    url: `/fonts/Nickainley.ttf`,
    googleName: 'Nickainley'
  },
  {
    id: 'newcursive',
    name: 'NewCursive',
    category: 'Neon',
    url: `/fonts/NewCursive.ttf`,
    googleName: 'NewCursive'
  },
  {
    id: 'monof',
    name: 'Monof',
    category: 'Neon',
    url: `/fonts/Monof.e63adfd.ttf`,
    googleName: 'Monof'
  },
  {
    id: 'roboto-regular',
    name: 'Roboto Regular',
    category: 'Neon',
    url: `/fonts/Roboto-Regular.a8d6ac0.ttf`,
    googleName: 'Roboto-Regular'
  },
  {
    id: 'lovenote',
    name: 'LoveNote',
    category: 'Neon',
    url: `/fonts/LoveNote.ttf`,
    googleName: 'LoveNote'
  },
  {
    id: 'bukharis',
    name: 'BukhariS',
    category: 'Neon',
    url: `/fonts/BukhariS.ttf`,
    googleName: 'BukhariS'
  },
  {
    id: 'photogenic',
    name: 'Photogenic',
    category: 'Neon',
    url: `/fonts/Photogenic.ttf`,
    googleName: 'Photogenic'
  },
  {
    id: 'rolleston',
    name: 'Rolleston',
    category: 'Neon',
    url: `/fonts/Rolleston.otf`,
    googleName: 'Rolleston'
  },
  {
    id: 'aaneon',
    name: 'AANeon',
    category: 'Neon',
    url: `/fonts/AANeon.6b0eedf.ttf`,
    googleName: 'AANeon'
  },
  {
    id: 'scifi',
    name: 'SciFi',
    category: 'Neon',
    url: `/fonts/SciFi.ttf`,
    googleName: 'SciFi'
  },
  {
    id: 'jura',
    name: 'Jura',
    category: 'Neon',
    url: `/fonts/Jura.ttf`,
    googleName: 'Jura'
  },
  {
    id: 'melbourne',
    name: 'Melbourne',
    category: 'Neon',
    url: `/fonts/Melbourne.ttf`,
    googleName: 'Melbourne'
  },
  {
    id: 'rosalindaregular',
    name: 'RosalindaRegular',
    category: 'Neon',
    url: `/fonts/RosalindaRegular.woff2`,
    googleName: 'RosalindaRegular'
  },
  {
    id: 'kobzarks',
    name: 'KobzarKS',
    category: 'Neon',
    url: `/fonts/KobzarKS.e40a723.ttf`,
    googleName: 'KobzarKS'
  },
  {
    id: 'typewriter',
    name: 'Typewriter',
    category: 'Neon',
    url: `/fonts/Typewriter.ttf`,
    googleName: 'Typewriter'
  },
  {
    id: 'badscript-regular',
    name: 'BadScript Regular',
    category: 'Neon',
    url: `/fonts/BadScript-Regular.woff2`,
    googleName: 'BadScript-Regular'
  },
  {
    id: 'sorrento',
    name: 'Sorrento',
    category: 'Neon',
    url: `/fonts/Sorrento.ttf`,
    googleName: 'Sorrento'
  },
  {
    id: 'esqadero',
    name: 'Esqadero',
    category: 'Neon',
    url: `/fonts/Esqadero.94e96a0.ttf`,
    googleName: 'Esqadero'
  },
  {
    id: 'clip',
    name: 'Clip',
    category: 'Neon',
    url: `/fonts/Clip.woff2`,
    googleName: 'Clip'
  },
  {
    id: 'korean-looks',
    name: 'Korean Looks',
    category: 'Neon',
    url: `/fonts/Korean Looks.8b41bd4.ttf`,
    googleName: 'Korean Looks'
  },
  {
    id: 'neontrace',
    name: 'Neontrace',
    category: 'Neon',
    url: `/fonts/Neontrace.ttf`,
    googleName: 'Neontrace'
  },
  {
    id: 'comfortaa-regular',
    name: 'Comfortaa Regular',
    category: 'Neon',
    url: `/fonts/Comfortaa-Regular.woff2`,
    googleName: 'Comfortaa-Regular'
  },
  {
    id: 'neonglow',
    name: 'NeonGlow',
    category: 'Neon',
    url: `/fonts/NeonGlow.ttf`,
    googleName: 'NeonGlow'
  },
  {
    id: 'didactgothic',
    name: 'DidactGothic',
    category: 'Neon',
    url: `/fonts/DidactGothic.ttf`,
    googleName: 'DidactGothic'
  },
  {
    id: 'alexa',
    name: 'Alexa',
    category: 'Neon',
    url: `/fonts/Alexa.ttf`,
    googleName: 'Alexa'
  },
  {
    id: 'waikiki',
    name: 'Waikiki',
    category: 'Neon',
    url: `/fonts/Waikiki.ttf`,
    googleName: 'Waikiki'
  },
  {
    id: 'neoneon',
    name: 'Neoneon',
    category: 'Neon',
    url: `/fonts/Neoneon.a202b3f.ttf`,
    googleName: 'Neoneon'
  },
  {
    id: 'northshore',
    name: 'Northshore',
    category: 'Neon',
    url: `/fonts/Northshore.ttf`,
    googleName: 'Northshore'
  },
  {
    id: 'nevada',
    name: 'Nevada',
    category: 'Neon',
    url: `/fonts/Nevada.ttf`,
    googleName: 'Nevada'
  },
  {
    id: 'veles',
    name: 'Veles',
    category: 'Neon',
    url: `/fonts/Veles.1b4aab5.ttf`,
    googleName: 'Veles'
  },
  {
    id: 'didactgothic-regular',
    name: 'DidactGothic Regular',
    category: 'Neon',
    url: `/fonts/DidactGothic-Regular.woff2`,
    googleName: 'DidactGothic-Regular'
  },
  {
    id: 'venetian',
    name: 'Venetian',
    category: 'Neon',
    url: `/fonts/Venetian.ttf`,
    googleName: 'Venetian'
  },
  {
    id: 'mayfair',
    name: 'Mayfair',
    category: 'Neon',
    url: `/fonts/Mayfair.ttf`,
    googleName: 'Mayfair'
  },
  {
    id: 'bayview',
    name: 'Bayview',
    category: 'Neon',
    url: `/fonts/Bayview.ttf`,
    googleName: 'Bayview'
  },
  {
    id: 'mint-type',
    name: 'Mint Type',
    category: 'Neon',
    url: `/fonts/Mint-Type.ba3aacc.ttf`,
    googleName: 'Mint-Type'
  }
];

export function getFontsByCategory(category?: FontCategory): NeonFont[] {
  if (!category) return neonFonts;
  return neonFonts.filter(f => f.category === category);
}

// No longer exporting google fonts url, returns empty string to not break types immediately
export function getGoogleFontsImportUrl(): string {
  return '';
}
