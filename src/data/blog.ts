// ═══════════════════════════════════════════════
// Make It Neon — Blog Articles Data
// 5 full SEO articles in EN + DE
// ═══════════════════════════════════════════════

export interface BlogArticle {
  slug: string;
  datePublished: string;
  dateModified: string;
  readingTime: number; // minutes
  image: string; // gradient placeholder
  category: string;
  title: { en: string; de: string };
  metaDescription: { en: string; de: string };
  content: { en: string; de: string };
  relatedSlugs: string[];
}

export const blogArticles: BlogArticle[] = [
  {
    slug: '10-benefits-led-neon-signs-business',
    datePublished: '2026-03-15',
    dateModified: '2026-04-01',
    readingTime: 6,
    image: '/images/blog/benefits.webp',
    category: 'Business',
    title: {
      en: '10 Benefits of LED Neon Signs for Your Business',
      de: '10 Vorteile von LED-Neonschildern für Ihr Unternehmen',
    },
    metaDescription: {
      en: 'Discover how LED neon signs can boost your business visibility, attract customers, and enhance brand recognition. From energy efficiency to customization options.',
      de: 'Erfahren Sie, wie LED-Neonschilder die Sichtbarkeit Ihres Unternehmens steigern, Kunden anziehen und die Markenbekanntheit verbessern können.',
    },
    relatedSlugs: ['how-custom-neon-signs-are-made', 'neon-sign-ideas-restaurants-cafes-bars'],
    content: {
      en: `## Why LED Neon Signs Are a Game-Changer for Businesses

In today's competitive marketplace, standing out is everything. LED neon signs have emerged as one of the most effective tools for businesses looking to capture attention, build brand identity, and create memorable customer experiences. Here are ten compelling reasons to invest in LED neon signage for your business.

### 1. Unmatched Visibility — Day and Night

LED neon signs are designed to be seen. Their vibrant glow cuts through visual clutter, making your business instantly recognizable from a distance. Whether it's a busy high street in Zurich or a quiet shopping arcade, your sign will draw eyes 24/7. Studies show that businesses with illuminated signage experience up to 30% more foot traffic compared to those without.

### 2. Energy Efficiency That Saves Money

Unlike traditional glass neon, LED neon flex uses up to 80% less electricity. A typical LED neon sign consumes just 5–15 watts — roughly the same as a bedside lamp. Over a year, this translates to significant savings on your energy bill, making LED neon not just beautiful, but economically smart.

### 3. Complete Customization

From your brand's exact Pantone color to a specific font or logo shape, LED neon signs are fully customizable. Whether you need a sleek modern wordmark or an intricate illustration, skilled artisans can bring virtually any design to life. At Make It Neon, we offer 12+ colors, 30+ fonts, and unlimited custom shapes.

### 4. Safety First

Traditional glass neon tubes contain mercury and argon gas, operate at extremely high voltages (up to 15,000V), and get scorching hot. LED neon, by contrast, runs on safe 12V DC power, remains cool to the touch, and contains zero hazardous materials. This makes it safe for children, pets, and high-traffic areas.

### 5. Built to Last

Quality LED neon signs boast a lifespan of 50,000+ hours — that's over 5 years of continuous operation. They're shatterproof, flexible, and resistant to vibration. This durability means fewer replacements and lower long-term costs.

### 6. Instagram-Worthy Brand Moments

In the age of social media, your physical space is your content studio. A glowing neon sign creates an irresistible photo opportunity that your customers will share organically. Restaurants, cafés, salons, and boutiques with neon features report a measurable increase in social media mentions and user-generated content.

### 7. Versatile Indoor & Outdoor Use

With IP65 waterproof protection available, LED neon signs work just as well outdoors as they do inside. Use them for storefront signage, patio decor, event backdrops, or window displays. The flexibility of neon flex tubing means your sign can be mounted on virtually any surface.

### 8. Silent Operation

Unlike some illuminated signage that hums or buzzes, LED neon signs are completely silent. This makes them perfect for restaurants, spas, offices, and bedrooms where a peaceful atmosphere is essential.

### 9. Dimming & Smart Control

Modern LED neon signs come with dimmers and remote controls, allowing you to adjust brightness for different times of day or moods. Some models are even compatible with smart-home systems, giving you full control from your phone.

### 10. Eco-Friendly Choice

LED technology is inherently more sustainable. Lower power consumption means lower carbon emissions. The materials used in LED neon flex are recyclable, and the absence of toxic gases makes disposal safe and straightforward.

---

## Ready to Light Up Your Business?

Whether you're opening a new restaurant in Zurich, refreshing your salon's look, or creating a standout trade show booth, a custom LED neon sign is the perfect investment. At Make It Neon, every sign is handcrafted in our Zurich workshop with a 2-year warranty and free worldwide shipping.

**[Try our online calculator](/en/calculator) to design your sign and get instant pricing, or [contact us](/en/contact) for a free consultation.**`,
      de: `## Warum LED-Neonschilder ein Gamechanger für Unternehmen Sind

In der heutigen wettbewerbsintensiven Geschäftswelt ist es entscheidend, aufzufallen. LED-Neonschilder haben sich als eines der effektivsten Werkzeuge für Unternehmen etabliert, die Aufmerksamkeit erregen, ihre Markenidentität aufbauen und unvergessliche Kundenerlebnisse schaffen möchten. Hier sind zehn überzeugende Gründe, in LED-Neonbeschilderung für Ihr Unternehmen zu investieren.

### 1. Unübertroffene Sichtbarkeit — Tag und Nacht

LED-Neonschilder sind darauf ausgelegt, gesehen zu werden. Ihr lebendiges Leuchten durchdringt visuelles Durcheinander und macht Ihr Unternehmen sofort aus der Ferne erkennbar. Ob an einer belebten Einkaufsstrasse in Zürich oder in einer ruhigen Einkaufspassage — Ihr Schild zieht 24/7 Blicke an. Studien zeigen, dass Unternehmen mit beleuchteter Beschilderung bis zu 30% mehr Laufkundschaft verzeichnen.

### 2. Energieeffizienz, die Geld Spart

Im Gegensatz zu traditionellem Glasneon verbraucht LED Neon Flex bis zu 80% weniger Strom. Ein typisches LED-Neonschild verbraucht nur 5–15 Watt — etwa so viel wie eine Nachttischlampe. Über ein Jahr hinweg bedeutet das erhebliche Einsparungen bei Ihrer Stromrechnung.

### 3. Vollständige Individualisierung

Von der exakten Pantone-Farbe Ihrer Marke bis hin zu einer bestimmten Schriftart oder Logoform sind LED-Neonschilder vollständig anpassbar. Ob ein schlankes modernes Wortzeichen oder eine aufwendige Illustration — erfahrene Handwerker können praktisch jedes Design zum Leben erwecken. Bei Make It Neon bieten wir 12+ Farben, 30+ Schriftarten und unbegrenzte Sonderformen.

### 4. Sicherheit zuerst

Traditionelle Glasneonröhren enthalten Quecksilber und Argongas, arbeiten mit extrem hohen Spannungen (bis zu 15.000V) und werden glühend heiss. LED-Neon hingegen läuft mit sicheren 12V Gleichstrom, bleibt kühl und enthält keine gefährlichen Materialien. Das macht es sicher für Kinder, Haustiere und stark frequentierte Bereiche.

### 5. Gebaut für die Ewigkeit

Hochwertige LED-Neonschilder verfügen über eine Lebensdauer von über 50.000 Stunden — das sind mehr als 5 Jahre Dauerbetrieb. Sie sind bruchsicher, flexibel und vibrationsbeständig. Diese Langlebigkeit bedeutet weniger Ersatz und niedrigere langfristige Kosten.

### 6. Instagram-taugliche Markenmomente

Im Zeitalter der sozialen Medien ist Ihr physischer Raum Ihr Content-Studio. Ein leuchtendes Neonschild schafft eine unwiderstehliche Fotogelegenheit, die Ihre Kunden organisch teilen werden. Restaurants, Cafés, Salons und Boutiquen mit Neon-Elementen berichten von einem messbaren Anstieg der Social-Media-Erwähnungen.

### 7. Vielseitige Innen- und Aussennutzung

Mit verfügbarem IP65-Wasserschutz funktionieren LED-Neonschilder draussen genauso gut wie drinnen. Verwenden Sie sie für Schaufensterbeschilderung, Terrassendeko, Event-Kulissen oder Fensteranzeigen. Die Flexibilität der Neon-Flex-Schläuche bedeutet, dass Ihr Schild auf praktisch jeder Oberfläche montiert werden kann.

### 8. Geräuschloser Betrieb

Anders als manche beleuchtete Beschilderung, die summt oder brummt, sind LED-Neonschilder völlig lautlos. Das macht sie perfekt für Restaurants, Spas, Büros und Schlafzimmer, in denen eine ruhige Atmosphäre wichtig ist.

### 9. Dimmen und Smart-Steuerung

Moderne LED-Neonschilder werden mit Dimmern und Fernbedienungen geliefert, mit denen Sie die Helligkeit für verschiedene Tageszeiten oder Stimmungen anpassen können. Einige Modelle sind sogar mit Smart-Home-Systemen kompatibel.

### 10. Umweltfreundliche Wahl

LED-Technologie ist von Natur aus nachhaltiger. Geringerer Stromverbrauch bedeutet weniger CO₂-Emissionen. Die in LED Neon Flex verwendeten Materialien sind recycelbar, und das Fehlen giftiger Gase macht die Entsorgung sicher und unkompliziert.

---

## Bereit, Ihr Unternehmen zum Leuchten zu Bringen?

Ob Sie ein neues Restaurant in Zürich eröffnen, Ihren Salon auffrischen oder einen auffälligen Messestand gestalten — ein individuelles LED-Neonschild ist die perfekte Investition. Bei Make It Neon wird jedes Schild in unserer Zürcher Werkstatt mit 2-Jahres-Garantie und kostenlosem weltweitem Versand handgefertigt.

**[Probieren Sie unseren Online-Konfigurator](/de/calculator) aus, um Ihr Schild zu gestalten und sofortige Preise zu erhalten, oder [kontaktieren Sie uns](/de/contact) für eine kostenlose Beratung.**`,
    },
  },
  {
    slug: 'how-custom-neon-signs-are-made',
    datePublished: '2026-03-22',
    dateModified: '2026-04-05',
    readingTime: 7,
    image: '/images/blog/how-made.webp',
    category: 'Behind the Scenes',
    title: {
      en: 'How Custom Neon Signs Are Made: Behind the Scenes',
      de: 'Wie Individuelle Neonschilder Hergestellt Werden: Hinter den Kulissen',
    },
    metaDescription: {
      en: 'Step inside our Zurich workshop and discover the step-by-step process of creating custom LED neon signs — from digital design to final quality inspection.',
      de: 'Werfen Sie einen Blick in unsere Zürcher Werkstatt und entdecken Sie den Schritt-für-Schritt-Prozess der Herstellung individueller LED-Neonschilder.',
    },
    relatedSlugs: ['10-benefits-led-neon-signs-business', 'indoor-vs-outdoor-neon-signs'],
    content: {
      en: `## From Concept to Glow: The Art of Making LED Neon Signs

Ever wondered how a simple idea becomes a stunning neon sign hanging on your wall? At Make It Neon, we combine cutting-edge technology with traditional craftsmanship to create signs that are truly one of a kind. Here's a behind-the-scenes look at our production process.

### Step 1: Design & Digital Planning

Every project begins with a concept. Whether you send us a sketch, a logo file, or just describe your vision, our design team creates a precise digital mockup. We use specialized CNC software to calculate exact bending paths and milling coordinates, ensuring that every curve and letter is mathematically perfect.

Our design tool considers letter spacing, line height, and the physical properties of neon flex tubing (minimum bend radius of 25mm) to create production-ready blueprints.

### Step 2: Acrylic Backboard Preparation

We use premium Swiss-sourced 8mm acrylic for our backboards. The acrylic is precision-cut using CNC milling machines that follow the digital paths generated in Step 1. This creates channels and mounting points specific to each design.

The backboards are available in clear, frosted white, or matte black finishes. Each option creates a different aesthetic effect — clear for a floating look, frosted for a soft diffusion, and black for maximum contrast.

### Step 3: LED Neon Flex Bending

This is where the magic happens. Our skilled artisans hand-bend LED neon flex tubing to match the design template. Unlike traditional glass neon that requires gas filling and high-voltage electrodes, LED neon flex is a solid-state silicone tube containing an LED strip. This makes it:

- **Safer**: No gas or high voltage
- **More durable**: Flexible and shatterproof
- **Energy efficient**: 80% less power than glass neon

Each bend is heated gently to achieve smooth curves without kinking the tubing. This step typically takes 2–4 hours for a standard text sign and up to 8 hours for complex logos.

### Step 4: Electrical Wiring

Once the neon flex is shaped, our electricians connect it to a 12V DC power supply. All connections are soldered, heat-shrunk, and secured with silicone sealant for waterproofing. Each sign goes through an electrical safety test before proceeding to the next stage.

### Step 5: Mounting & Assembly

The shaped neon flex is carefully mounted to the acrylic backboard using specialized clips and adhesive. We use hidden mounting hardware — standoff pins that create a floating effect when the sign is hung on a wall. This allows the neon to cast a beautiful halo glow on the wall behind it.

### Step 6: Quality Control & Testing

Every sign undergoes a rigorous 24-hour burn-in test. We check for:

- Even brightness across all sections
- Consistent color temperature
- Secure mounting points
- Proper dimmer function
- No visible wiring from the front

Only after passing all checks is a sign approved for packaging and shipping.

### Step 7: Packaging & Delivery

Each sign is individually wrapped in foam padding, placed in a custom-fit wooden crate, and shipped in a reinforced box. We include a wall mounting kit, power adapter, dimmer with remote control, and detailed installation instructions.

---

## Want to See the Process in Person?

We offer workshop tours by appointment for anyone interested in seeing how their sign is made. [Contact us](/en/contact) to book a visit to our Zurich studio!`,
      de: `## Vom Konzept zum Leuchten: Die Kunst der LED-Neonschild-Herstellung

Haben Sie sich jemals gefragt, wie aus einer einfachen Idee ein atemberaubendes Neonschild wird, das an Ihrer Wand hängt? Bei Make It Neon verbinden wir modernste Technologie mit traditionellem Handwerk, um Schilder zu schaffen, die wirklich einzigartig sind. Hier ist ein Blick hinter die Kulissen unseres Produktionsprozesses.

### Schritt 1: Design und Digitale Planung

Jedes Projekt beginnt mit einem Konzept. Ob Sie uns eine Skizze, eine Logo-Datei oder einfach nur Ihre Vision beschreiben — unser Designteam erstellt ein präzises digitales Mockup. Wir verwenden spezialisierte CNC-Software, um exakte Biegepfade und Fräskoordinaten zu berechnen, damit jede Kurve und jeder Buchstabe mathematisch perfekt ist.

### Schritt 2: Acryl-Rückwand Vorbereitung

Wir verwenden hochwertiges Schweizer 8mm-Acryl für unsere Rückwände. Das Acryl wird mit CNC-Fräsmaschinen präzise geschnitten, die den in Schritt 1 generierten digitalen Pfaden folgen.

Die Rückwände sind in klar, matt-weiss oder matt-schwarz erhältlich. Jede Option erzeugt einen anderen ästhetischen Effekt — klar für einen schwebenden Look, matt für eine sanfte Diffusion und schwarz für maximalen Kontrast.

### Schritt 3: LED Neon Flex Biegen

Hier passiert die Magie. Unsere erfahrenen Handwerker biegen LED Neon Flex-Schläuche von Hand, um sie an die Designvorlage anzupassen. Im Gegensatz zu traditionellem Glasneon, das Gasfüllung und Hochspannungselektroden erfordert, ist LED Neon Flex ein Festkörper-Silikonschlauch mit einem LED-Streifen:

- **Sicherer**: Kein Gas oder Hochspannung
- **Langlebiger**: Flexibel und bruchsicher
- **Energieeffizient**: 80% weniger Verbrauch als Glasneon

### Schritt 4: Elektrische Verkabelung

Sobald der Neon Flex geformt ist, verbinden unsere Elektriker ihn mit einem 12V DC-Netzteil. Alle Verbindungen werden gelötet, mit Schrumpfschlauch versehen und mit Silikondichtmittel zur Wasserdichtung gesichert.

### Schritt 5: Montage und Zusammenbau

Der geformte Neon Flex wird sorgfältig mit speziellen Clips und Klebstoff auf der Acryl-Rückwand montiert. Wir verwenden versteckte Befestigungshardware — Abstandshalter, die einen Schwebeeffekt erzeugen.

### Schritt 6: Qualitätskontrolle und Tests

Jedes Schild durchläuft einen strengen 24-Stunden-Einbrenntest. Wir prüfen gleichmässige Helligkeit, konsistente Farbtemperatur, sichere Befestigungspunkte und die Dimmerfunktion.

### Schritt 7: Verpackung und Lieferung

Jedes Schild wird einzeln in Schaumstoffpolsterung eingewickelt und in einer verstärkten Box versendet. Wir liefern ein Wandmontage-Set, Netzteil, Dimmer mit Fernbedienung und detaillierte Installationsanweisungen mit.

---

## Möchten Sie den Prozess Persönlich Sehen?

Wir bieten nach Vereinbarung Werkstattführungen für alle an, die sehen möchten, wie ihr Schild hergestellt wird. [Kontaktieren Sie uns](/de/contact), um einen Besuch in unserem Zürcher Studio zu buchen!`,
    },
  },
  {
    slug: 'neon-sign-ideas-restaurants-cafes-bars',
    datePublished: '2026-03-28',
    dateModified: '2026-04-10',
    readingTime: 5,
    image: '/images/blog/restaurant.webp',
    category: 'Inspiration',
    title: {
      en: 'Neon Sign Ideas for Restaurants, Cafés and Bars',
      de: 'Neonschild-Ideen für Restaurants, Cafés und Bars',
    },
    metaDescription: {
      en: 'Get inspired with creative neon sign ideas for your restaurant, café, or bar. From welcomes to cocktail menus, discover designs that set the perfect mood.',
      de: 'Lassen Sie sich inspirieren mit kreativen Neonschild-Ideen für Ihr Restaurant, Café oder Ihre Bar. Entdecken Sie Designs, die die perfekte Stimmung schaffen.',
    },
    relatedSlugs: ['10-benefits-led-neon-signs-business', 'how-to-choose-right-size-neon-sign'],
    content: {
      en: `## Setting the Mood with Neon: Ideas for the Hospitality Industry

There's something magical about walking into a restaurant or bar and being greeted by the warm glow of a neon sign. It instantly sets the tone, creates atmosphere, and gives your establishment a unique personality. Here are our favorite neon sign ideas for the hospitality industry.

### Welcome Signs

The classic "Welcome" never goes out of style. Consider variations like:
- **"Come In, We're Awesome"** — playful and inviting
- **"Willkommen"** — elegant German touch for Swiss establishments
- **"Hello Beautiful"** — great for salons and beauty bars
- **"Please Wait to Be Seated"** — functional and stylish

### Food & Drink Themes

Let your menu inspire your neon:
- **"But First, Coffee"** — perfect for cafés
- **"Pizza Makes Everything Better"** — fun for pizzerias
- **"Cocktails & Dreams"** — classic bar aesthetic
- **"Eat, Drink, Be Happy"** — universal dining mantra
- **"Aperol O'Clock"** — trending in Swiss summer bars

### Motivational & Ambiance

Create a mood that lingers:
- **"Good Vibes Only"** — universal positive energy
- **"Bon Appétit"** — French elegance for fine dining
- **"Tonight We Shine"** — perfect for nightlife venues
- **"You Are What You Eat"** — health-conscious restaurants

### Logo Signs

Transform your brand into a neon masterpiece. Your logo in neon makes a powerful statement above the bar, behind the counter, or as a focal point in the dining area. At Make It Neon, we can recreate any logo — from simple text marks to complex illustrations — in vibrant LED neon.

### Custom Shapes & Icons

Sometimes a symbol says more than words:
- A neon **cocktail glass** for a bar
- A glowing **coffee cup** for a café
- A neon **pizza slice** for a pizzeria
- A flickering **flame** for a steakhouse
- A neon **pretzel** for a bakery

### Placement Tips

Where you place your neon sign matters as much as the design:

1. **Behind the bar** — creates a stunning centerpiece that photographs beautifully
2. **At the entrance** — sets the tone before customers even sit down
3. **In the restroom** — surprise and delight (and great selfie spots!)
4. **On the patio** — extends your ambiance outdoors
5. **In a photo corner** — designed specifically for social media sharing

### Choosing Colors for Your Space

| Mood | Recommended Colors |
|------|-------------------|
| Romantic / Intimate | Warm white, Pink, Hot pink |
| Energetic / Fun | Red, Orange, Green |
| Sophisticated / Upscale | White, Ice blue, Purple |
| Tropical / Summer | Lemon, Green, Blue |

---

## Let's Create Something Amazing

Every restaurant, café, and bar has a unique story. Let's tell yours in neon. **[Browse our ready-made collection](/en/shop) for instant inspiration, or [design your own](/en/calculator) custom sign.**`,
      de: `## Stimmung Setzen mit Neon: Ideen für die Gastronomie

Es gibt etwas Magisches daran, ein Restaurant oder eine Bar zu betreten und vom warmen Leuchten eines Neonschilds begrüsst zu werden. Es setzt sofort den Ton, schafft Atmosphäre und verleiht Ihrem Betrieb eine einzigartige Persönlichkeit. Hier sind unsere liebsten Neonschild-Ideen für die Gastronomie.

### Willkommensschilder

Das klassische "Willkommen" wird nie alt. Erwägen Sie Variationen wie:
- **"Hereinspaziert"** — verspielt und einladend
- **"Welcome"** — international und modern
- **"Schön, dass du da bist"** — persönlich und warm
- **"Bitte warten Sie auf einen Platz"** — funktional und stilvoll

### Essen & Trinken-Themen

Lassen Sie sich von Ihrer Speisekarte inspirieren:
- **"Aber zuerst, Kaffee"** — perfekt für Cafés
- **"Pizza macht alles besser"** — lustig für Pizzerien
- **"Cocktails & Träume"** — klassische Bar-Ästhetik
- **"Essen, Trinken, Glücklich sein"** — universelles Dinner-Mantra
- **"Aperol O'Clock"** — im Trend in Schweizer Sommer-Bars

### Logo-Schilder

Verwandeln Sie Ihre Marke in ein Neon-Meisterwerk. Ihr Logo in Neon macht ein kraftvolles Statement über der Bar, hinter der Theke oder als Blickfang im Essbereich. Bei Make It Neon können wir jedes Logo nachbilden — von einfachen Textmarken bis hin zu komplexen Illustrationen.

### Individuelle Formen und Icons

Manchmal sagt ein Symbol mehr als Worte:
- Ein Neon-**Cocktailglas** für eine Bar
- Eine leuchtende **Kaffeetasse** für ein Café
- Eine Neon-**Pizzascheibe** für eine Pizzeria
- Eine flackernde **Flamme** für ein Steakhouse

### Platzierungstipps

Wo Sie Ihr Neonschild platzieren, ist genauso wichtig wie das Design:

1. **Hinter der Bar** — schafft ein atemberaubendes Herzstück
2. **Am Eingang** — setzt den Ton, bevor die Gäste sich setzen
3. **Im Aussenbereich** — erweitert Ihre Atmosphäre nach draussen
4. **In einer Fotoecke** — speziell für Social-Media-Sharing gestaltet

---

## Lassen Sie uns etwas Erstaunliches Schaffen

Jedes Restaurant, Café und jede Bar hat eine einzigartige Geschichte. Lassen Sie uns Ihre in Neon erzählen. **[Stöbern Sie in unserer Kollektion](/de/shop) für sofortige Inspiration, oder [gestalten Sie Ihr eigenes](/de/calculator) individuelles Schild.**`,
    },
  },
  {
    slug: 'indoor-vs-outdoor-neon-signs',
    datePublished: '2026-04-01',
    dateModified: '2026-04-12',
    readingTime: 5,
    image: '/images/blog/indoor-outdoor.webp',
    category: 'Guide',
    title: {
      en: 'Indoor vs Outdoor Neon Signs: What You Need to Know',
      de: 'Indoor vs Outdoor Neonschilder: Was Sie Wissen Müssen',
    },
    metaDescription: {
      en: 'Understand the key differences between indoor and outdoor LED neon signs including IP ratings, weatherproofing, mounting options, and pricing to make the right choice.',
      de: 'Verstehen Sie die wichtigsten Unterschiede zwischen Indoor- und Outdoor-LED-Neonschildern — einschliesslich IP-Schutzarten, Wetterfestigkeit und Preise.',
    },
    relatedSlugs: ['how-custom-neon-signs-are-made', 'how-to-choose-right-size-neon-sign'],
    content: {
      en: `## Indoor vs Outdoor: Choosing the Right Neon Sign

One of the most common questions we receive at Make It Neon is: "Can I put my neon sign outside?" The answer is yes — but there are important differences to understand before deciding. This guide breaks down everything you need to know.

### Understanding IP Ratings

IP stands for "Ingress Protection" — a standard rating system that tells you how well a product is protected against dust and water:

| Rating | Dust Protection | Water Protection | Use Case |
|--------|----------------|-----------------|----------|
| IP20 | Protected against objects > 12mm | No protection | Indoor only |
| IP44 | Protected against objects > 1mm | Splash-proof | Sheltered outdoor |
| IP65 | Fully dust-tight | Water jet proof | Full outdoor |

At Make It Neon, our standard indoor signs are IP20, and our outdoor-rated signs are IP65.

### Key Differences

#### Indoor Signs (IP20)
- **Standard neon flex tubing** with exposed connections
- **Standard power supply** (non-waterproof)
- **Acrylic or PVC backboard** without weather sealing
- **Mounting**: Standoff pins for wall floating effect
- **Price**: Standard pricing
- **Best for**: Bedrooms, living rooms, offices, restaurants, cafés, shops

#### Outdoor Signs (IP65)
- **Waterproof silicone neon flex** with sealed connections
- **Weatherproof power supply** in a sealed enclosure
- **UV-resistant acrylic backboard** with weather-sealed edges
- **Mounting**: Heavy-duty brackets with waterproof cable routing
- **Price**: Approximately 40% more than indoor
- **Best for**: Storefronts, patios, gardens, building facades, event spaces

### When to Choose Outdoor

You need an outdoor-rated sign when:
1. The sign will be exposed to rain, snow, or humidity
2. It's mounted on an exterior wall or facade
3. It's in a location with extreme temperature variations
4. It's near a pool, fountain, or water feature
5. It's in an open-air restaurant or patio area

### When Indoor Is Sufficient

An indoor sign works perfectly when:
1. The sign is inside a building with controlled climate
2. It's under a covered porch or awning (partially sheltered)
3. It's in a conservatory or sunroom
4. The area doesn't experience extreme temperatures

### Maintenance Tips

**Indoor signs** require minimal maintenance — just dust occasionally with a soft cloth.

**Outdoor signs** should be:
- Checked annually for seal integrity
- Cleaned with a damp cloth (never pressure wash)
- Protected from direct sustained sunlight if possible
- Brought indoors during extreme weather events

---

## Not Sure Which to Choose?

Our team can help you decide based on your specific location and requirements. **[Contact us](/en/contact) for a free consultation, or [try our calculator](/en/calculator) and select your indoor/outdoor preference.**`,
      de: `## Indoor vs Outdoor: Das Richtige Neonschild Wählen

Eine der häufigsten Fragen, die wir bei Make It Neon erhalten, ist: "Kann ich mein Neonschild draussen aufhängen?" Die Antwort ist ja — aber es gibt wichtige Unterschiede, die Sie verstehen sollten. Dieser Leitfaden erklärt alles, was Sie wissen müssen.

### IP-Schutzarten Verstehen

IP steht für "Ingress Protection" — ein Standard-Bewertungssystem, das angibt, wie gut ein Produkt gegen Staub und Wasser geschützt ist:

| Schutzart | Staubschutz | Wasserschutz | Einsatzbereich |
|-----------|-------------|--------------|----------------|
| IP20 | Schutz gegen Objekte > 12mm | Kein Schutz | Nur Innenbereich |
| IP44 | Schutz gegen Objekte > 1mm | Spritzwasserschutz | Geschützter Aussenbereich |
| IP65 | Vollständig staubdicht | Strahlwasserschutz | Voller Aussenbereich |

### Hauptunterschiede

#### Indoor-Schilder (IP20)
- **Standard Neon-Flex-Schlauch** mit offenen Verbindungen
- **Standard-Netzteil** (nicht wasserdicht)
- **Acryl- oder PVC-Rückwand** ohne Wetterversiegelung
- **Preis**: Standardpreis
- **Ideal für**: Schlafzimmer, Wohnzimmer, Büros, Restaurants, Cafés, Geschäfte

#### Outdoor-Schilder (IP65)
- **Wasserdichter Silikon-Neon-Flex** mit versiegelten Verbindungen
- **Wetterfestes Netzteil** in einem versiegelten Gehäuse
- **UV-beständige Acryl-Rückwand** mit wetterversiegelten Kanten
- **Preis**: Etwa 40% mehr als Indoor
- **Ideal für**: Schaufenster, Terrassen, Gärten, Gebäudefassaden

### Pflegetipps

**Indoor-Schilder** erfordern minimale Pflege — entstauben Sie gelegentlich mit einem weichen Tuch.

**Outdoor-Schilder** sollten jährlich auf die Dichtungsintegrität überprüft und mit einem feuchten Tuch gereinigt werden.

---

## Nicht Sicher, Welches Sie Wählen Sollen?

Unser Team kann Ihnen basierend auf Ihrem spezifischen Standort und Ihren Anforderungen bei der Entscheidung helfen. **[Kontaktieren Sie uns](/de/contact) für eine kostenlose Beratung, oder [probieren Sie unseren Konfigurator](/de/calculator) aus.**`,
    },
  },
  {
    slug: 'how-to-choose-right-size-neon-sign',
    datePublished: '2026-04-08',
    dateModified: '2026-04-12',
    readingTime: 4,
    image: '/images/blog/size.webp',
    category: 'Guide',
    title: {
      en: 'How to Choose the Right Size for Your Neon Sign',
      de: 'So Wählen Sie die Richtige Grösse für Ihr Neonschild',
    },
    metaDescription: {
      en: 'Learn how to pick the perfect size for your LED neon sign based on wall space, viewing distance, and text length. Includes a handy sizing chart.',
      de: 'Erfahren Sie, wie Sie die perfekte Grösse für Ihr LED-Neonschild basierend auf Wandfläche, Betrachtungsabstand und Textlänge wählen.',
    },
    relatedSlugs: ['indoor-vs-outdoor-neon-signs', 'neon-sign-ideas-restaurants-cafes-bars'],
    content: {
      en: `## Getting the Size Right: A Complete Guide

Choosing the right size for your neon sign is crucial. Too small and it gets lost on the wall; too large and it overwhelms the space. Here's how to get it just right.

### The Wall Space Rule

A good rule of thumb: **your neon sign should cover 50–75% of the available wall width**. This ensures the sign is a clear focal point without crowding the space.

| Wall Width | Recommended Sign Width |
|-----------|----------------------|
| 1 meter | 50–75 cm |
| 2 meters | 100–150 cm |
| 3 meters | 150–225 cm |
| 4+ meters | 200–300 cm |

### Viewing Distance Matters

Consider how far away your audience will be:

- **Close viewing** (1–3 meters): Small signs (40–60 cm) work perfectly. Think bedroom, office desk, or retail counter.
- **Medium viewing** (3–8 meters): Medium signs (60–100 cm) are ideal. Perfect for restaurant interiors, café walls, or boutiques.
- **Far viewing** (8+ meters): Large signs (100+ cm) or extra-large (150+ cm) are necessary. Great for storefronts, event spaces, or building facades.

### Text Length & Font Considerations

The length of your text directly affects the optimal sign size:

- **Short text** (1–5 characters): Can work as small as 30 cm wide
- **Medium text** (6–15 characters): 50–80 cm recommended
- **Long text** (16–25 characters): 80–120 cm recommended
- **Extra long** (25+ characters): 120 cm or wider, possibly multi-line

Font style also plays a role — script fonts like *Pacifico* or *Great Vibes* need more horizontal space than block fonts like *Bebas Neue*.

### Multi-Line Signs

For text that spans two or more lines, the sign height increases proportionally. A two-line sign is approximately 50% taller than a single-line equivalent. Consider:

- **Line 1 might be larger** (the main message)
- **Line 2 can be smaller** (a supporting phrase)
- The **overall layout** should feel balanced

### Our Size Options

At Make It Neon, we offer four standard sizes for our ready-made signs:

| Size | Typical Width | Typical Height | Price Range |
|------|--------------|----------------|-------------|
| Small | 40–50 cm | 12–15 cm | 148–168 CHF |
| Medium | 50–66 cm | 15–20 cm | 168–198 CHF |
| Large | 66–80 cm | 20–24 cm | 198–223 CHF |
| X-Large | 80–107 cm | 24–32 cm | 223–308 CHF |

For custom sizes outside these ranges, [contact us](/en/contact) for a quote.

### Pro Tips

1. **Use painter's tape** to outline the sign dimensions on your wall before ordering
2. **Take a photo** of the tape outline to visualize the size in context
3. **Consider surrounding decor** — the sign should complement, not compete with other elements
4. **Think about power cable routing** — placement should allow easy access to a power outlet

---

## Still Unsure? Let Our Calculator Help

Our **[online calculator](/en/calculator)** shows you a real-time preview of your sign at different sizes, with instant pricing. Try it now to find your perfect fit!`,
      de: `## Die Richtige Grösse Finden: Ein Kompletter Leitfaden

Die Wahl der richtigen Grösse für Ihr Neonschild ist entscheidend. Zu klein und es geht an der Wand verloren; zu gross und es überwältigt den Raum. So treffen Sie die richtige Wahl.

### Die Wandflächen-Regel

Eine gute Faustregel: **Ihr Neonschild sollte 50–75% der verfügbaren Wandbreite abdecken**. Dies stellt sicher, dass das Schild ein klarer Blickfang ist, ohne den Raum zu überladen.

| Wandbreite | Empfohlene Schildbreite |
|------------|------------------------|
| 1 Meter | 50–75 cm |
| 2 Meter | 100–150 cm |
| 3 Meter | 150–225 cm |
| 4+ Meter | 200–300 cm |

### Betrachtungsabstand

Berücksichtigen Sie, wie weit Ihr Publikum entfernt sein wird:

- **Nahe Betrachtung** (1–3 Meter): Kleine Schilder (40–60 cm) funktionieren perfekt. Denken Sie an Schlafzimmer, Schreibtisch oder Verkaufstheke.
- **Mittlere Betrachtung** (3–8 Meter): Mittlere Schilder (60–100 cm) sind ideal. Perfekt für Restaurant-Innenräume, Café-Wände oder Boutiquen.
- **Ferne Betrachtung** (8+ Meter): Grosse Schilder (100+ cm) oder extra grosse (150+ cm) sind notwendig. Ideal für Schaufenster, Veranstaltungsräume oder Gebäudefassaden.

### Textlänge und Schriftart

Die Länge Ihres Textes beeinflusst direkt die optimale Schildgrösse:

- **Kurzer Text** (1–5 Zeichen): ab 30 cm Breite möglich
- **Mittlerer Text** (6–15 Zeichen): 50–80 cm empfohlen
- **Langer Text** (16–25 Zeichen): 80–120 cm empfohlen
- **Extra lang** (25+ Zeichen): 120 cm oder breiter

### Unsere Grössenoptionen

Bei Make It Neon bieten wir vier Standardgrössen:

| Grösse | Breite | Höhe | Preisbereich |
|--------|--------|------|-------------|
| Klein | 40–50 cm | 12–15 cm | 148–168 CHF |
| Mittel | 50–66 cm | 15–20 cm | 168–198 CHF |
| Gross | 66–80 cm | 20–24 cm | 198–223 CHF |
| Extra Gross | 80–107 cm | 24–32 cm | 223–308 CHF |

### Profi-Tipps

1. **Verwenden Sie Malerband**, um die Schildabmessungen an Ihrer Wand zu skizzieren
2. **Machen Sie ein Foto** der Bandumrisse, um die Grösse im Kontext zu visualisieren
3. **Berücksichtigen Sie die umgebende Dekoration** — das Schild sollte andere Elemente ergänzen, nicht konkurrieren
4. **Denken Sie an die Kabelführung** — die Platzierung sollte einfachen Zugang zu einer Steckdose ermöglichen

---

## Immer noch Unsicher? Unser Konfigurator Hilft

Unser **[Online-Konfigurator](/de/calculator)** zeigt Ihnen eine Echtzeit-Vorschau Ihres Schildes in verschiedenen Grössen, mit sofortiger Preisberechnung. Probieren Sie es jetzt aus!`,
    },
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find(a => a.slug === slug);
}

export function getRelatedArticles(article: BlogArticle): BlogArticle[] {
  return article.relatedSlugs
    .map(slug => blogArticles.find(a => a.slug === slug))
    .filter((a): a is BlogArticle => !!a);
}
