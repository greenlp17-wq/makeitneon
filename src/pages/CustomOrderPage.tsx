import { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { sendEmail } from '@/lib/email';
import { Upload, Send, Loader2, Check, X, FileImage, Shield, Clock, MapPin, Sparkles, Palette, Ruler, MessageSquare, Building2, Image as ImageIcon, Type, Shapes, ChevronRight } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

/* ─── Zod Schema ─── */
const customOrderSchema = z.object({
  projectType: z.enum(['text', 'logo', 'custom'], {
    message: 'Please select a project type'
  }),
  description: z.string().min(10, 'Please describe your project (at least 10 characters)').max(2000, 'Description is too long'),
  approximateSize: z.string().min(1, 'Please select an approximate size'),
  usage: z.enum(['indoor', 'outdoor']),
  colorPreference: z.string().optional(),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  company: z.string().optional()
});
type CustomOrderFormData = z.infer<typeof customOrderSchema>;

/* ─── Constants ─── */
const PROJECT_TYPES = [{
  value: 'text' as const,
  icon: Type,
  labelEN: 'Text Sign',
  labelDE: 'Textschild',
  descEN: 'Custom text in your choice of font and color',
  descDE: 'Benutzerdefinierter Text in Ihrer Wunschschrift und Farbe'
}, {
  value: 'logo' as const,
  icon: ImageIcon,
  labelEN: 'Logo Sign',
  labelDE: 'Logo-Schild',
  descEN: 'Your brand logo recreated in neon',
  descDE: 'Ihr Markenlogo als Neonschild'
}, {
  value: 'custom' as const,
  icon: Shapes,
  labelEN: 'Custom Shape',
  labelDE: 'Individuelle Form',
  descEN: 'Unique shape, artwork or illustration',
  descDE: 'Einzigartige Form, Artwork oder Illustration'
}];
const SIZES = [{
  value: '30-50',
  labelEN: 'Small (30-50 cm)',
  labelDE: 'Klein (30-50 cm)'
}, {
  value: '50-80',
  labelEN: 'Medium (50-80 cm)',
  labelDE: 'Mittel (50-80 cm)'
}, {
  value: '80-120',
  labelEN: 'Large (80-120 cm)',
  labelDE: 'Groß (80-120 cm)'
}, {
  value: '120-150',
  labelEN: 'Extra Large (120-150 cm)',
  labelDE: 'Extra Groß (120-150 cm)'
}, {
  value: '150+',
  labelEN: 'Oversized (150+ cm)',
  labelDE: 'Übergröße (150+ cm)'
}, {
  value: 'unsure',
  labelEN: "I'm not sure",
  labelDE: 'Ich bin nicht sicher'
}];
const COLORS = [{
  name: 'White',
  hex: '#FFFFFF',
  border: true
}, {
  name: 'Warm White',
  hex: '#FFE4B5'
}, {
  name: 'Ice Blue',
  hex: '#00D4FF'
}, {
  name: 'Blue',
  hex: '#0066FF'
}, {
  name: 'Red',
  hex: '#FF0000'
}, {
  name: 'Pink',
  hex: '#FF69B4'
}, {
  name: 'Hot Pink',
  hex: '#FF2D78'
}, {
  name: 'Purple',
  hex: '#BF40FF'
}, {
  name: 'Green',
  hex: '#39FF14'
}, {
  name: 'Yellow',
  hex: '#FFD700'
}, {
  name: 'Orange',
  hex: '#FF6600'
}, {
  name: 'RGB',
  hex: 'linear-gradient(135deg, #FF2D78, #BF40FF, #00D4FF, #39FF14, #FFB800)',
  isGradient: true
}];
export default function CustomOrderPage() {
  const {
    t,
    i18n
  } = useTranslation();
  const isDE = i18n.language === 'de';
  const isUK = i18n.language === 'uk';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors
    }
  } = useForm<CustomOrderFormData>({
    resolver: zodResolver(customOrderSchema),
    defaultValues: {
      usage: 'indoor',
      colorPreference: '',
      approximateSize: ''
    }
  });
  const watchProjectType = watch('projectType');
  const watchUsage = watch('usage');
  const watchApproximateSize = watch('approximateSize');

  /* ─── File upload handlers ─── */
  const handleFileSelect = useCallback((file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp', 'application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      alert(isUK ? 'Будь ласка, завантажте зображення (JPG, PNG, SVG, WebP, PDF)' : isDE ? 'Bitte laden Sie ein Bild hoch (JPG, PNG, SVG, WebP, PDF)' : 'Please upload an image file (JPG, PNG, SVG, WebP, PDF)');
      return;
    }
    if (file.size > maxSize) {
      alert(isUK ? 'Файл занадто великий (макс 10MB)' : isDE ? 'Datei ist zu groß (max 10MB)' : 'File is too large (max 10MB)');
      return;
    }
    setUploadedFile(file);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => setUploadPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setUploadPreview(null);
    }
  }, [isDE]);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  const removeFile = () => {
    setUploadedFile(null);
    setUploadPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /* ─── Form submit ─── */
  const onSubmit = async (data: CustomOrderFormData) => {
    setIsSubmitting(true);
    try {
      // Create a payload combining form data and file metadata
      const payload = {
        ...data,
        colorPreference: selectedColor || data.colorPreference,
        fileName: uploadedFile?.name || 'No file uploaded',
        fileSize: uploadedFile ? `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB` : '0 MB',
        timestamp: new Date().toISOString()
      };
      await sendEmail(payload, 'Custom Sign Order');
      setIsSuccess(true);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } catch (e) {
      console.error(e);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ─── Success state ─── */
  if (isSuccess) {
    return <section className="section-padding" id="custom-order-success">
        <div className="container-tight flex items-center justify-center min-h-[50vh]">
          <div className="glass p-10 md:p-14 rounded-3xl max-w-lg w-full text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-green-100">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl md:text-3xl mb-3">
              {isUK ? 'Запит отримано!' : isDE ? 'Anfrage erhalten!' : 'Request Received!'}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {isUK ? 'Дякуємо! Ми зв\'яжемося з Вами протягом 24 годин із безкоштовним макетом дизайну.' : isDE ? 'Vielen Dank! Wir melden uns innerhalb von 24 Stunden mit einem kostenlosen Design-Mockup bei Ihnen.' : "Thank you! We'll get back to you within 24 hours with a free design mockup."}
            </p>

            <div className="flex flex-col gap-3 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2.5 justify-center">
                <div className="w-8 h-8 rounded-full bg-neon-pink/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-neon-pink" />
                </div>
                <span>{isUK ? 'Безкоштовний макет дизайну у комплекті' : isDE ? 'Kostenloses Design-Mockup' : 'Free design mockup included'}</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center">
                <div className="w-8 h-8 rounded-full bg-neon-blue/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-neon-blue" />
                </div>
                <span>{isUK ? 'Відповідь протягом 24 годин' : isDE ? 'Antwort innerhalb von 24 Stunden' : 'Response within 24 hours'}</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center">
                <div className="w-8 h-8 rounded-full bg-neon-green/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-neon-green" />
                </div>
                <span>{isUK ? 'Гарантія 2 роки' : isDE ? '2 Jahre Garantie' : '2 year warranty'}</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center">
                <div className="w-8 h-8 rounded-full bg-neon-violet/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-neon-violet" />
                </div>
                <span>{isUK ? 'Ручна робота в Цюриху' : isDE ? 'Handgefertigt in Zürich' : 'Handcrafted in Zurich'}</span>
              </div>
            </div>

            <Link to={`/${i18n.language}/calculator`} className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl font-medium hover:opacity-90 transition-opacity">
              {isUK ? 'Спробувати наш калькулятор' : isDE ? 'Konfigurator ausprobieren' : 'Try Our Calculator'}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>;
  }

  /* ─── Form render ─── */
  return <>
      <SEO title={t('pages.customOrder.title')} description={t('pages.customOrder.description')} />
    <section className="section-padding" id="custom-order-page">
      <div className="container-wide">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-violet/10 text-neon-violet text-sm font-medium mb-6">
            <Upload className="w-4 h-4" />
            {t('nav.customOrder')}
          </div>
          <h1 className="mb-6">
            {isUK ? <>Індивідуальне <span className="gradient-neon-text">Замовлення</span></> : isDE ? <>Individuelle <span className="gradient-neon-text">Bestellung</span></> : <>Custom <span className="gradient-neon-text">Order</span></>}
          </h1>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed text-muted-foreground">
            {isUK ? 'Надішліть свій логотип, дизайн або ідею — ми створимо безкоштовний макет за 24 години.' : isDE ? 'Senden Sie uns Ihr Logo, Design oder Ihre Idee — wir erstellen innerhalb von 24 Stunden ein kostenloses Mockup.' : 'Send us your logo, design, or idea — we\'ll create a free mockup within 24 hours.'}
          </p>
        </ScrollReveal>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">

          {/* ═══ LEFT: Form (3 cols) ═══ */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

              {/* ── Section 1: Project Type ── */}
              <div className="glass p-6 md:p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-neon-pink/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-neon-pink" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    {isUK ? 'Тип проєкту' : isDE ? 'Projekttyp' : 'Project Type'}
                  </h3>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  {PROJECT_TYPES.map(type => {
                    const Icon = type.icon;
                    const isSelected = watchProjectType === type.value;
                    return <label key={type.value} className={`
                          relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200
                          hover:border-neon-pink/40 hover:shadow-md
                          ${isSelected ? 'border-neon-pink bg-neon-pink/5 shadow-md shadow-neon-pink/10' : 'border-border bg-white/60'}
                        `}>
                        <input type="radio" value={type.value} {...register('projectType')} className="sr-only" />
                        <div className="text-center">
                          <div className={`w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center transition-colors ${isSelected ? 'bg-neon-pink/15 text-neon-pink' : 'bg-secondary text-muted-foreground'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="font-semibold text-sm mb-1">
                            {isUK ? type.labelUK || type.labelEN : isDE ? type.labelDE : type.labelEN}
                          </div>
                          <div className="text-xs text-muted-foreground leading-snug">
                            {isUK ? type.descUK || type.descEN : isDE ? type.descDE : type.descEN}
                          </div>
                        </div>
                        {isSelected && <div className="absolute top-2 right-2 w-5 h-5 bg-neon-pink rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>}
                      </label>;
                  })}
                </div>
                {errors.projectType && <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                    <X className="w-3.5 h-3.5" />
                    {isUK ? errors.projectType.message : isDE ? 'Bitte wählen Sie einen Projekttyp' : errors.projectType.message}
                  </p>}
              </div>

              {/* ── Section 2: Description ── */}
              <div className="glass p-6 md:p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-neon-blue/10 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-neon-blue" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    {isUK ? 'Опис проєкту' : isDE ? 'Projektbeschreibung' : 'Project Description'}
                  </h3>
                </div>

                <textarea {...register('description')} rows={5} placeholder={isUK ? 'Опишіть свій проєкт: бажаний текст, стиль, де буде встановлена вивіска...' : isDE ? 'Beschreiben Sie Ihr Projekt: gewünschter Text, Stil, wo die Vyvieska montiert wird...' : 'Describe your project: desired text, style, where the sign will be mounted...'} className={`
                    w-full px-4 py-3 bg-white/70 border-2 rounded-xl resize-none transition-all
                    focus:outline-none focus:ring-2 focus:ring-neon-pink/30 focus:border-neon-pink
                    ${errors.description ? 'border-red-300' : 'border-border'}
                  `} />
                {errors.description && <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                    <X className="w-3.5 h-3.5" />
                    {isUK ? errors.description.message : isDE ? 'Bitte beschreiben Sie Ihr Projekt (mind. 10 Zeichen)' : errors.description.message}
                  </p>}
              </div>

              {/* ── Section 3: File Upload ── */}
              <div className="glass p-6 md:p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-neon-green/10 flex items-center justify-center">
                    <FileImage className="w-4 h-4 text-neon-green" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    {isUK ? 'Завантажити файл' : isDE ? 'Datei hochladen' : 'Upload File'}
                    <span className="text-sm font-normal text-muted-foreground ml-2">
                      ({isUK ? 'опціонально' : isDE ? 'optional' : 'optional'})
                    </span>
                  </h3>
                </div>

                {!uploadedFile ? <div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onClick={() => fileInputRef.current?.click()} className={`
                      border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
                      ${isDragging ? 'border-neon-pink bg-neon-pink/5 scale-[1.01]' : 'border-border hover:border-neon-pink/40 hover:bg-secondary/50'}
                    `}>
                    <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-colors ${isDragging ? 'bg-neon-pink/15 text-neon-pink' : 'bg-secondary text-muted-foreground'}`}>
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="font-medium mb-1">
                      {isUK ? 'Перетягніть файл сюди' : isDE ? 'Datei hierher ziehen' : 'Drag & drop your file here'}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {isUK ? 'або натисніть щоб вибрати' : isDE ? 'oder klicken zum Auswählen' : 'or click to browse'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG, SVG, WebP, PDF • Max 10MB
                    </p>
                    <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/svg+xml,image/webp,application/pdf" onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }} className="hidden" />
                  </div> : <div className="border-2 border-neon-green/30 bg-neon-green/5 rounded-xl p-4 flex items-center gap-4">
                    {uploadPreview ? <img src={uploadPreview} alt="Upload preview" className="w-16 h-16 rounded-lg object-cover border border-border" /> : <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center">
                        <FileImage className="w-6 h-6 text-muted-foreground" />
                      </div>}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{uploadedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <button type="button" onClick={removeFile} className="p-2 hover:bg-red-50 rounded-lg transition-colors group">
                      <X className="w-4 h-4 text-muted-foreground group-hover:text-red-500" />
                    </button>
                  </div>}
              </div>

              {/* ── Section 4: Size & Options ── */}
              <div className="glass p-6 md:p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-neon-violet/10 flex items-center justify-center">
                    <Ruler className="w-4 h-4 text-neon-violet" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    {isUK ? 'Розмір та опції' : isDE ? 'Größe & Optionen' : 'Size & Options'}
                  </h3>
                </div>

                {/* Approximate size */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    {isUK ? 'Приблизний розмір' : isDE ? 'Ungefähre Größe' : 'Approximate Size'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SIZES.map(size => {
                      const isSelected = watchApproximateSize === size.value;
                      return <label key={size.value} className={`
                            cursor-pointer rounded-lg border-2 px-3 py-2.5 text-center text-sm transition-all
                            hover:border-neon-violet/40
                            ${isSelected ? 'border-neon-violet bg-neon-violet/5 font-medium' : 'border-border bg-white/60'}
                          `}>
                          <input type="radio" value={size.value} {...register('approximateSize')} className="sr-only" />
                          {isUK ? size.labelUK || size.labelEN : isDE ? size.labelDE : size.labelEN}
                        </label>;
                    })}
                  </div>
                  {errors.approximateSize && <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                      <X className="w-3.5 h-3.5" />
                      {isUK ? errors.approximateSize.message : isDE ? 'Bitte wählen Sie eine Größe' : errors.approximateSize.message}
                    </p>}
                </div>

                {/* Indoor / Outdoor */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    {isUK ? 'Використання' : isDE ? 'Verwendung' : 'Usage'}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['indoor', 'outdoor'] as const).map(usage => {
                      const isSelected = watchUsage === usage;
                      return <label key={usage} className={`
                            cursor-pointer rounded-xl border-2 p-4 text-center transition-all
                            hover:border-neon-violet/40
                            ${isSelected ? 'border-neon-violet bg-neon-violet/5' : 'border-border bg-white/60'}
                          `}>
                          <input type="radio" value={usage} {...register('usage')} className="sr-only" />
                          <div className="font-semibold text-sm mb-0.5">
                            {usage === 'indoor' ? isUK ? 'В приміщенні' : isDE ? 'Innenbereich' : 'Indoor' : isUK ? 'На вулиці' : isDE ? 'Außenbereich' : 'Outdoor'}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {usage === 'indoor' ? isUK ? 'Стандартний захист' : isDE ? 'Standard-Schutz' : 'Standard protection' : isUK ? 'Захист від води IP65 (+40%)' : isDE ? 'IP65 wetterfest (+40%)' : 'IP65 weatherproof (+40%)'}
                          </div>
                        </label>;
                    })}
                  </div>
                </div>

                {/* Color Preference */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Palette className="w-4 h-4 inline mr-1.5" />
                    {isUK ? 'Вибір кольору' : isDE ? 'Farbwunsch' : 'Color Preference'}
                    <span className="text-muted-foreground font-normal ml-1.5">
                      ({isUK ? 'опціонально' : isDE ? 'optional' : 'optional'})
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {COLORS.map(color => {
                      const isSelected = selectedColor === color.name;
                      return <button key={color.name} type="button" onClick={() => {
                        setSelectedColor(isSelected ? '' : color.name);
                        setValue('colorPreference', isSelected ? '' : color.name);
                      }} title={color.name} className={`
                            w-9 h-9 rounded-full transition-all duration-200 ring-offset-2 ring-offset-background
                            ${isSelected ? 'ring-2 ring-neon-pink scale-110' : 'hover:scale-110'}
                            ${color.border ? 'border-2 border-gray-200' : ''}
                          `} style={{
                        background: color.isGradient ? color.hex : color.hex
                      }} />;
                    })}
                  </div>
                  {selectedColor && <p className="text-xs text-muted-foreground mt-2">
                      {isUK ? 'Вибрано:' : isDE ? 'Gewählt:' : 'Selected:'} {selectedColor}
                    </p>}
                </div>
              </div>

              {/* ── Section 5: Contact Details ── */}
              <div className="glass p-6 md:p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-neon-warm/10 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-neon-warm" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    {isUK ? 'Контактні дані' : isDE ? 'Kontaktdaten' : 'Contact Details'}
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      {isUK ? 'Повне ім\'я' : isDE ? 'Name' : 'Full Name'} *
                    </label>
                    <input type="text" {...register('name')} placeholder={isUK ? 'Ваше ім\'я' : isDE ? 'Ihr Name' : 'Your name'} className={`
                        w-full px-4 py-2.5 bg-white/70 border-2 rounded-xl transition-all
                        focus:outline-none focus:ring-2 focus:ring-neon-pink/30 focus:border-neon-pink
                        ${errors.name ? 'border-red-300' : 'border-border'}
                      `} />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{isUK ? errors.name.message : isDE ? 'Name ist erforderlich' : errors.name.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      E-Mail *
                    </label>
                    <input type="email" {...register('email')} placeholder="you@example.com" className={`
                        w-full px-4 py-2.5 bg-white/70 border-2 rounded-xl transition-all
                        focus:outline-none focus:ring-2 focus:ring-neon-pink/30 focus:border-neon-pink
                        ${errors.email ? 'border-red-300' : 'border-border'}
                      `} />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{isUK ? errors.email.message : isDE ? 'Bitte gültige E-Mail eingeben' : errors.email.message}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      {isUK ? 'Телефон' : isDE ? 'Telefon' : 'Phone'}
                      <span className="text-muted-foreground font-normal ml-1.5">({isUK ? 'опціонально' : isDE ? 'optional' : 'optional'})</span>
                    </label>
                    <input type="tel" {...register('phone')} placeholder="+41 XX XXX XX XX" className="w-full px-4 py-2.5 bg-white/70 border-2 border-border rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-neon-pink/30 focus:border-neon-pink" />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      {isUK ? 'Компанія' : isDE ? 'Firma' : 'Company'}
                      <span className="text-muted-foreground font-normal ml-1.5">({isUK ? 'опціонально' : isDE ? 'optional' : 'optional'})</span>
                    </label>
                    <input type="text" {...register('company')} placeholder={isUK ? 'Назва компанії' : isDE ? 'Firmenname' : 'Company name'} className="w-full px-4 py-2.5 bg-white/70 border-2 border-border rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-neon-pink/30 focus:border-neon-pink" />
                  </div>
                </div>
              </div>

              {/* ── Submit Button ── */}
              <div className="sticky bottom-4 z-10">
                <div className="glass p-4 md:p-5 rounded-2xl shadow-lg">
                  <button type="submit" disabled={isSubmitting} className="
                      w-full bg-foreground hover:bg-foreground/90 text-background font-semibold
                      py-4 rounded-xl flex items-center justify-center gap-2.5
                      transition-all disabled:opacity-50 disabled:cursor-not-allowed
                      shadow-lg hover:shadow-xl active:scale-[0.99]
                    ">
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    <span className="text-base">
                      {isSubmitting ? isUK ? 'Відправлення...' : isDE ? 'Wird gesendet...' : 'Sending...' : isUK ? 'Надіслати запит' : isDE ? 'Anfrage senden' : 'Send Request'}
                    </span>
                  </button>
                  <p className="text-center text-xs text-muted-foreground mt-3">
                    {isUK ? 'Безкоштовний макет • Відповідь за 24г • Не потрібно платити' : isDE ? 'Kostenloses Design-Mockup • Antwort in 24h • Keine Zahlungspflicht' : 'Free design mockup • Response within 24h • No payment required'}
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* ═══ RIGHT: Info Sidebar (2 cols) ═══ */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28 space-y-6">

              {/* How it works */}
              <div className="glass p-6 md:p-8 rounded-2xl">
                <h3 className="text-lg font-semibold mb-5">
                  {isUK ? 'Як це працює' : isDE ? 'So funktioniert\'s' : 'How It Works'}
                </h3>
                <div className="space-y-5">
                  {[{
                    step: '01',
                    titleEN: 'Submit Your Idea',
                    titleDE: 'Idee einreichen',
                    descEN: 'Fill out the form with your project details and upload any reference files.',
                    descDE: 'Füllen Sie das Formular mit Ihren Projektdetails aus und laden Sie Referenzdateien hoch.',
                    color: 'neon-pink'
                  }, {
                    step: '02',
                    titleEN: 'Free Design Mockup',
                    titleDE: 'Kostenloses Mockup',
                    descEN: 'We create a professional mockup of your sign within 24 hours — completely free.',
                    descDE: 'Wir erstellen innerhalb von 24 Stunden ein professionelles Mockup — komplett kostenlos.',
                    color: 'neon-blue'
                  }, {
                    step: '03',
                    titleEN: 'Approve & Craft',
                    titleDE: 'Bestätigen & Fertigen',
                    descEN: 'Once you approve the design, our artisans handcraft your sign in our Zurich workshop.',
                    descDE: 'Nach Ihrer Freigabe fertigen unsere Handwerker Ihr Schild in unserer Zürcher Werkstatt.',
                    color: 'neon-green'
                  }].map((item, idx) => <div key={idx} className="flex gap-4">
                      <div className={`
                        w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                        font-heading font-bold text-sm
                        ${item.color === 'neon-pink' ? 'bg-neon-pink/10 text-neon-pink' : ''}
                        ${item.color === 'neon-blue' ? 'bg-neon-blue/10 text-neon-blue' : ''}
                        ${item.color === 'neon-green' ? 'bg-neon-green/10 text-neon-green' : ''}
                      `}>
                        {item.step}
                      </div>
                      <div>
                        <div className="font-semibold text-sm mb-0.5">
                          {isUK ? item.titleUK || item.titleEN : isDE ? item.titleDE : item.titleEN}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {isUK ? item.descUK || item.descEN : isDE ? item.descDE : item.descEN}
                        </p>
                      </div>
                    </div>)}
                </div>
              </div>

              {/* Trust signals */}
              <div className="glass p-6 md:p-8 rounded-2xl">
                <h3 className="text-lg font-semibold mb-5">
                  {isUK ? 'Чому Make It Neon?' : isDE ? 'Warum Make It Neon?' : 'Why Make It Neon?'}
                </h3>
                <div className="space-y-4">
                  {[{
                    icon: Shield,
                    titleEN: '2 Year Warranty',
                    titleDE: '2 Jahre Garantie',
                    descEN: 'Full warranty on all products.',
                    descDE: 'Volle Garantie auf alle Produkte.'
                  }, {
                    icon: MapPin,
                    titleEN: 'Made in Zurich',
                    titleDE: 'Made in Zürich',
                    descEN: 'Handcrafted in our own workshop.',
                    descDE: 'Handgefertigt in unserer eigenen Werkstatt.'
                  }, {
                    icon: Clock,
                    titleEN: '5-7 Days Production',
                    titleDE: '5-7 Tage Produktion',
                    descEN: 'Quick turnaround with free shipping.',
                    descDE: 'Schnelle Fertigung mit kostenlosem Versand.'
                  }, {
                    icon: Sparkles,
                    titleEN: 'Energy Efficient',
                    titleDE: 'Energieeffizient',
                    descEN: '80% less power than traditional neon.',
                    descDE: '80% weniger Strom als traditionelles Neon.'
                  }].map((item, idx) => {
                    const Icon = item.icon;
                    return <div key={idx} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{isUK ? item.titleUK || item.titleEN : isDE ? item.titleDE : item.titleEN}</div>
                          <p className="text-xs text-muted-foreground">{isUK ? item.descUK || item.descEN : isDE ? item.descDE : item.descEN}</p>
                        </div>
                      </div>;
                  })}
                </div>
              </div>

              {/* CTA to calculator */}
              <div className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-neon-pink rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-neon-blue rounded-full blur-3xl" />
                </div>
                <div className="relative">
                  <h4 className="font-semibold text-white mb-2">
                    {isUK ? 'Потрібна лише текстова вивіска?' : isDE ? 'Nur ein Textschild?' : 'Just need a text sign?'}
                  </h4>
                  <p className="text-sm text-white/70 mb-4 leading-relaxed">
                    {isUK ? 'Використайте калькулятор для миттєвої ціни та прев\'ю.' : isDE ? 'Nutzen Sie unseren Konfigurator für sofortige Preise und Live-Vorschau.' : 'Use our calculator for instant pricing and live preview of your sign.'}
                  </p>
                  <Link to={`/${i18n.language}/calculator`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors">
                    {isUK ? 'Спробувати калькулятор' : isDE ? 'Zum Konfigurator' : 'Try Calculator'}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
    </>;
}