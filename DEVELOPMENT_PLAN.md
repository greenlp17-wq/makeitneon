# Make It Neon — План разработки

> **Этот документ** содержит полный план разработки сайта Make It Neon, разбитый на логические этапы с готовыми промтами для каждой задачи. Используйте его для продолжения работы в новых чатах.
>
> **Связанный документ:** `MAKEITNEON_SPEC.md` — полная спецификация проекта (конкуренты, ценообразование, дизайн-система, SEO).

---

## Глобальный контекст (вставлять в начало каждого нового чата)

```
Я продолжаю работу над проектом Make It Neon — сайт-магазин для компании по производству LED Neon Flex вывесок в Цюрихе, Швейцария. Спецификация проекта находится в файле /Users/green/Documents/landing/makeitneon/MAKEITNEON_SPEC.md — прочитай его перед началом работы. План разработки в файле /Users/green/Documents/landing/makeitneon/DEVELOPMENT_PLAN.md. Проект инициализирован на Vite + React + TypeScript + Tailwind CSS v4 + shadcn/ui. Шрифт проекта — Unbounded. Дизайн — Light Mode, glassmorphism, ультрасовременный.
```

---

## Этап 0: Инфраструктура проекта ✅
**Статус: ЗАВЕРШЁН**

- [x] Инициализация Vite + React + TypeScript
- [x] Настройка Tailwind CSS v4
- [x] Настройка shadcn/ui
- [x] Настройка path aliases (@/*)
- [x] Верификация сборки

---

## Этап 1: Дизайн-система и фундамент ✅
**Статус: ЗАВЕРШЁН**

### Задача 1.1: Дизайн-система (токены, шрифты, утилиты)

```prompt
Контекст: Я работаю над проектом Make It Neon — сайт-магазин LED Neon Flex вывесок. Прочитай спецификацию /Users/green/Documents/landing/makeitneon/MAKEITNEON_SPEC.md.

Задача: Создай полную дизайн-систему проекта:

1. Обнови src/index.css:
   - Подключи шрифты Unbounded (heading) и Inter (body) через @import Google Fonts
   - Определи все CSS-переменные из раздела "4. Дизайн-система" спецификации
   - Создай утилитарные классы: .glass (glassmorphism), .neon-glow, .neon-flicker
   - Настрой Tailwind v4 тему: кастомные цвета (neon-pink, neon-blue, neon-green, neon-violet, neon-warm), шрифты, spacing, border-radius
   - Базовые стили (body, headings, links, smooth scroll)

2. Обнови src/lib/utils.ts — добавь утилиты cn() если нет

3. Установи и настрой shadcn/ui компоненты которые понадобятся:
   - Button (уже есть)
   - Card
   - Input
   - Select
   - Slider
   - Tabs
   - Accordion
   - Dialog/Modal
   - Sheet (mobile menu)
   - Badge
   - Separator

Убедись что дизайн-система работает — создай временную тестовую страницу со всеми компонентами.
```

### Задача 1.2: Routing и Layout

```prompt
Контекст: Make It Neon проект, прочитай спецификацию в /Users/green/Documents/landing/makeitneon/MAKEITNEON_SPEC.md.

Задача: Настрой маршрутизацию и общий лейаут:

1. Установи react-router-dom v7
2. Создай структуру папок:
   src/
   ├── components/
   │   ├── layout/
   │   │   ├── Header.tsx (навигация, лого, языковой переключатель EN/DE)
   │   │   ├── Footer.tsx (контакты, соцсети, правовые ссылки)
   │   │   ├── MobileMenu.tsx (Sheet из shadcn)
   │   │   └── Layout.tsx (обёртка Header + Outlet + Footer)
   │   ├── ui/ (shadcn components)
   │   ├── sections/ (секции главной страницы)
   │   ├── calculator/ (компоненты калькулятора)
   │   └── shop/ (компоненты магазина)
   ├── pages/
   │   ├── HomePage.tsx
   │   ├── CalculatorPage.tsx
   │   ├── ShopPage.tsx
   │   ├── ProductPage.tsx
   │   ├── CustomOrderPage.tsx
   │   ├── PortfolioPage.tsx
   │   ├── AboutPage.tsx
   │   ├── FAQPage.tsx
   │   ├── ContactPage.tsx
   │   └── BlogPage.tsx
   ├── data/ (статические данные, каталог, цены)
   ├── hooks/ (кастомные хуки)
   ├── lib/ (утилиты)
   └── i18n/ (файлы переводов)

3. Настрой маршруты в App.tsx согласно Sitemap из спецификации.
4. Header должен быть sticky с glassmorphism-эффектом при скролле.
5. Footer — полный с колонками: Services, Company, Legal, Contact.
6. Навигация: Logo | Калькулятор | Магазин | Портфолио | О нас | FAQ | Контакты | [EN/DE] | CTA кнопка "Заказать"
```

### Задача 1.3: Интернационализация (i18n)

```prompt
Контекст: Make It Neon. Спецификация: /Users/green/Documents/landing/makeitneon/MAKEITNEON_SPEC.md

Задача: Настрой мультиязычность EN + DE:

1. Установи react-i18next и i18next
2. Создай файлы переводов:
   - src/i18n/locales/en/translation.json
   - src/i18n/locales/de/translation.json
3. Настрой i18n.ts с определением языка по браузеру
4. Заполни переводы для навигации, footer, основных CTA-кнопок, мета-тегов
5. Создай компонент LanguageSwitcher с флагами 🇬🇧/🇨🇭
6. Убедись что переключение работает без перезагрузки страницы
7. URL должен содержать язык: /en/calculator, /de/calculator
```

---

## Этап 2: Hero секция и 3D-анимации
**Статус: ЧАСТИЧНО ЗАВЕРШЁН**

### Задача 2.1: 3D Hero-секция (Three.js) ✅
**Статус: ЗАВЕРШЁН**

```prompt
Контекст: Make It Neon — сайт для компании LED Neon Flex вывесок из Цюриха. Прочитай спецификацию /Users/green/Documents/landing/makeitneon/MAKEITNEON_SPEC.md. Дизайн — Light Mode, шрифт Unbounded, glassmorphism.

Задача: Создай WOW hero-секцию уровня Awwwards:

1. Установи: three, @react-three/fiber, @react-three/drei, gsap, @gsap/react
2. Создай 3D-сцену с интерактивной неоновой вывеской:
   - Тёмная секция hero на светлом фоне сайта (контраст как в реальности — неон красиво смотрится на тёмном)
   - 3D-текст "Make It Neon" с реалистичным неоновым свечением (emission shader, bloom effect)
   - Текст должен плавно "включаться" при загрузке страницы (по буквам, с легким flicker effect)
   - Интерактивность: при движении мыши 3D-сцена слегка поворачивается (parallax)
   - Частицы света / пыли в воздухе вокруг вывески
   - На фоне — полупрозрачная кирпичная стена или тёмная стена
   
3. Под 3D-сценой:
   - Заголовок: "Custom LED Neon Signs" (шрифт Unbounded, крупный)
   - Подзаголовок: "Handcrafted in Zurich. Delivered worldwide."
   - Два CTA: "Design Your Sign" (primary) и "Browse Collection" (secondary, outline)

4. Скролл-анимация: при скролле вниз вывеска плавно уменьшается и "уезжает" вверх

5. Performance: 
   - Lazy-load Three.js (Suspense)
   - Fallback для мобильных (CSS-анимация неона вместо 3D)
   - Целевой FPS: 60 на desktop, 30 на mobile

Используй скилы frontend-design, canvas-design и react-patterns если они установлены.
```

### Задача 2.2: Scroll-анимации для всех секций

```prompt
Контекст: Make It Neon. Спецификация: /Users/green/Documents/landing/makeitneon/MAKEITNEON_SPEC.md

Задача: Добавь scroll-анимации GSAP ко всем секциям главной страницы:

1. Установи gsap ScrollTrigger
2. Для каждой секции реализуй entry-анимацию:
   - Fade-in + slide-up для текстовых блоков
   - Scale-in для карточек
   - Stagger для списков элементов
   - Parallax для фоновых элементов
3. Секция "Как это работает" — 3 шага с прогресс-линией, которая заполняется при скролле
4. Секция преимуществ — карточки с glassmorphism появляются каскадом
5. Все анимации должны быть smooth, не дёргаться, respect prefers-reduced-motion
6. Mobile: упрощённые анимации (без parallax, проще timing)
```

---

## Этап 3: Калькулятор неоновых вывесок (КЛЮЧЕВАЯ ФИЧА) ✅
**Статус: ЗАВЕРШЁН**

### Задача 3.1: Ядро калькулятора — логика и данные

```prompt
Контекст: Make It Neon. Прочитай спецификацию /Users/green/Documents/landing/makeitneon/MAKEITNEON_SPEC.md, особенно раздел "2. Ценообразование и логика калькулятора".

Задача: Создай ядро калькулятора стоимости неоновой вывески:

1. Файл src/data/pricing.ts:
   - Таблица цен для 1 строки текста (14 размеров × цена)
   - Таблица цен для 2 строк текста (13 размеров × цена)
   - Массив доступных цветов LED: White, Warm White, Ice Blue, Blue, Red, Pink, Hot Pink, Purple, Green, Yellow, Orange, Lemon
   - RGB опция с отдельной ценой
   - Надбавки: outdoor (+40%), RGB (+50%), dimmer (+30 CHF), стойка (+45 CHF), аракал (+30 CHF)
   - Массив шрифтов: минимум 8-10 шрифтов (по категориям: Script, Sans-Serif, Serif, Fun)
   
2. Файл src/data/fonts.ts:
   - Для каждого шрифта: name, category, googleFontUrl, complexityMultiplier (1.0-1.5)
   - Шрифты загружать из Google Fonts динамически
   
3. Хук src/hooks/useNeonCalculator.ts:
   - State: text, font, fontSize (ширина в см), color, lines (1/2), isOutdoor, isRGB, hasDimmer, mountType
   - Логика автоматического определения минимального размера на основе кол-ва символов
   - Функция расчёта цены по таблице с интерполяцией
   - Если текст не помещается в выбранный размер — предупреждение + автоувеличение
   - Возврат: basePrice, addonsPrice, totalPrice, signDimensions (W×H), estimatedTapeLength

4. Файл src/lib/centerline.ts:
   - Функция для примерного расчёта длины центральной линии текста
   - Используй Canvas API: рендер текста → measureText() для ширины
   - Для каждого шрифта коэффициент "визуальная плотность" (сколько ленты на см ширины)
   - Это нужно для информации клиенту, основная цена — из таблицы
```

### Задача 3.2: UI калькулятора — визуализация

```prompt
Контекст: Make It Neon. Спецификация: /Users/green/Documents/landing/makeitneon/MAKEITNEON_SPEC.md

Задача: Создай визуальную часть калькулятора вывески:

1. Компонент src/components/calculator/NeonPreview.tsx:
   - Canvas или CSS, который рендерит текст выбранным шрифтом
   - Текст отображается с НЕОНОВЫМ СВЕЧЕНИЕМ (CSS text-shadow или canvas glow)
   - Фон — тёмный (стена), текст — выбранным цветом LED
   - Лёгкая анимация мерцания (subtle flicker как настоящий неон)
   - При изменении текста/шрифта — плавная анимация перерисовки
   - Размер превью адаптируется под мобильные
   - Показывать размеры вывески (W × H) с линейками/стрелками
   - Выбор фона: кирпичная стена, белая стена, бетон, тёмная стена

2. Компонент src/components/calculator/BackgroundSelector.tsx:
   - 4-5 пресетов фона стены
   - При клике фон меняется под превью

3. Общий layout калькулятора:
   - Левая часть (60%): превью вывески на стене
   - Правая часть (40%): панель настроек
   - На мобильном: превью сверху, настройки снизу (sticky bottom)
```

### Задача 3.3: UI калькулятора — панель настроек

```prompt
Контекст: Make It Neon. Спецификация: /Users/green/Documents/landing/makeitneon/MAKEITNEON_SPEC.md

Задача: Создай панель настроек калькулятора:

1. Компонент src/components/calculator/CalculatorPanel.tsx:
   
   Секция 1 — Текст:
   - Input для ввода текста (1 или 2 строки)
   - Переключатель 1/2 строки
   - Счётчик символов (живой, с лимитом для выбранного размера)
   
   Секция 2 — Шрифт:
   - Горизонтальный скролл или grid с превью шрифтов
   - Каждый шрифт показан как карточка с примером текста
   - Активный шрифт подсвечен
   - Группировка: Script | Sans-Serif | Serif | Fun
   
   Секция 3 — Размер:
   - Slider от 40 до 140 см
   - Или выпадающий список фиксированных размеров
   - Показывать обе единицы: см и inches
   - Индикатор "Рекомендуемый размер" на основе длины текста
   
   Секция 4 — Цвет:
   - Цветовые swatch-кружки (12+ цветов)
   - Специальный swatch для RGB с радужной заливкой
   - При наведении — название цвета
   - При выборе — превью обновляется
   
   Секция 5 — Опции:
   - Toggle: Indoor / Outdoor (с tooltip "What's the difference?")
   - Toggle: Dimmer & Remote
   - Select: Mounting Type (Wall mount / Hanging / Stand)
   - Toggle: Backboard color fill (Aracal)
   
   Секция 6 — Цена (sticky внизу панели):
   - Базовая цена: XXX CHF
   - Надбавки (детализация): +XX CHF outdoor, +XX CHF RGB...
   - ИТОГО: XXX CHF (крупно, жирно, шрифт Unbounded)
   - Кнопка "Order Now" (primary, large, glow-effect)
   - Кнопка "Get Free Quote" (secondary)
   - Текст: "Free design mockup • 2 year warranty • Handcrafted in Zurich"

2. При клике "Order Now":
   - Собрать все данные заказа
   - Сделать скриншот превью (html2canvas или toDataURL)
   - Отправить на email: текст, шрифт, размер, цвет, опции, цена, скриншот
   - Показать success-модал с благодарностью
```

---

## Этап 4: Каталог / Магазин готовых вывесок ✅
**Статус: ЗАВЕРШЁН**

### Задача 4.1: Данные каталога

```prompt
Контекст: Make It Neon. Спецификация: /Users/green/Documents/landing/makeitneon/MAKEITNEON_SPEC.md

Задача: Создай каталог готовых неоновых вывесок:

1. Файл src/data/catalog.ts с минимум 30-40 позициями в категориях:
   
   Категория "Business" (10+ шт):
   - Open, Open/Closed, Welcome, Café, Bar, Beauty, Nails, Barber, Restaurant, Menu, No WiFi Talk to Each Other, Good Vibes Only, Come In We're Open
   
   Категория "Wedding" (8+ шт):
   - Mr & Mrs, Better Together, I Do, Til Death Do Us Part, Love Is Love, Just Married, Forever & Always, To The Moon And Back
   
   Категория "Motivation" (8+ шт):
   - Dream Big, Hustle, Good Vibes, Never Give Up, Be Kind, Create, Believe, You Got This
   
   Категория "Home Decor" (8+ шт):
   - Home Sweet Home, Hello, Love, Bon Appetit, Cheers, Let's Stay In, Chill, Sweet Dreams
   
   Для каждого продукта:
   - id, slug, name_en, name_de, category, availableColors[], availableSizes[], basePrice, description_en, description_de, imagePlaceholder (generate with AI image tool)

2. Создай типы TypeScript для Product, Category, CartItem
```

### Задача 4.2: UI магазина

```prompt
Контекст: Make It Neon. Спецификация: /Users/green/Documents/landing/makeitneon/MAKEITNEON_SPEC.md

Задача: Создай страницы магазина:

1. ShopPage.tsx:
   - Фильтр по категориям (tabs или chips)
   - Grid карточек продуктов (responsive: 4 col desktop, 2 col tablet, 1 col mobile)
   - Карточка: изображение, название, цена от X CHF, кнопка "View"
   - Hover на карточке: scale + shadow + neon border glow
   - Search input для фильтрации
   - Sorting: Popular, Price Low-High, Price High-Low, New

2. ProductPage.tsx:
   - Изображение продукта (на тёмном фоне с glow)
   - Название, описание
   - Выбор цвета (swatches)
   - Выбор размера (radio buttons с ценой)
   - Indoor/Outdoor toggle
   - Кол-во
   - Кнопка "Add to Cart" или "Order Now"
   - Секция "Includes": dimmer, remote, mounting kit, power adapter
   - Раздел "Specifications": dimensions, wattage, IP rating, warranty
   - Related products

3. Мини-корзина:
   - Иконка в header с badge (кол-во товаров)
   - Sheet (sidebar) при клике
   - Список товаров, кол-во, цена
   - Кнопка "Request Order" (отправка по email)
```

---

## Этап 5: Секции главной страницы (контент) ✅
**Статус: ЗАВЕРШЁН**

### Задача 5.1: About / USP секция

```prompt
Контекст: Make It Neon. Спецификация: /Users/green/Documents/landing/makeitneon/MAKEITNEON_SPEC.md

Задача: Создай секцию USP (Unique Selling Points) для главной:

1. Заголовок: "Why Choose Make It Neon?" / "Warum Make It Neon?"
2. 4 карточки с glassmorphism:
   - 🏭 "Handcrafted in Zurich" — собственное производство, контроль качества
   - 🌍 "Worldwide Shipping" — доставка по всему миру, монтаж по Швейцарии и южной Германии
   - ⚡ "Energy Efficient LED" — 80% экономии по сравнению с традиционным неоном
   - 🛡️ "2 Year Warranty" — полная гарантия на все продукты
3. Каждая карточка: иконка (emoji или Lucide icons), заголовок, 2-3 строки текста
4. Анимация: карточки появляются каскадом при скролле (GSAP stagger)
5. Дизайн: Light mode, карточки с backdrop-filter blur, subtle gradient border
```

### Задача 5.2: "Как это работает" секция

```prompt
Контекст: Make It Neon.

Задача: Создай секцию "How It Works" / "So funktioniert's":

1. 3 шага с progress-линией:
   Шаг 1: "Design" — "Enter your text, choose font, color and size in our calculator"
   Шаг 2: "Craft" — "Our artisans handcraft your sign in our Zurich workshop"
   Шаг 3: "Shine" — "Receive your sign with free delivery & easy mounting"

2. Каждый шаг: номер (01, 02, 03) крупно, заголовок, описание, иконка/иллюстрация
3. Между шагами — соединительная линия с градиентом неоновых цветов
4. Scroll-анимация: линия "рисуется" при скролле, шаги появляются последовательно
5. CTA внизу: "Start Designing Now" → ведёт на калькулятор
```

### Задача 5.3: Портфолио / Галерея

```prompt
Контекст: Make It Neon.

Задача: Создай секцию Портфолио для главной и отдельную страницу:

1. На главной: горизонтальный карусель с 8-10 лучшими работами
   - Infinite scroll автоматически
   - При hover — название + категория
   - Кнопка "See All Work"

2. Страница PortfolioPage.tsx:
   - Masonry grid layout
   - Фильтр по категориям: All, Business, Events, Home, Wedding
   - Lightbox при клике на изображение
   - 20+ изображений (сгенерируй с помощью generate_image tool)
   
3. Каждое изображение: неоновая вывеска в реальном интерьере (кафе, ресторан, спальня, свадьба, офис)
```

### Задача 5.4: Отзывы клиентов

```prompt
Контекст: Make It Neon.

Задача: Создай секцию отзывов:

1. Карусель с отзывами (автоскролл + свайп на мобильных)
2. Минимум 8 отзывов (реалистичные, разные персоны):
   - Имя, город, рейтинг (5 звёзд), текст отзыва, категория заказа
   - Примеры: владелица кафе из Цюриха, невеста из Берна, владелец барбершопа из Люцерна
3. Средний рейтинг наверху: "4.9 ★ Based on 120+ reviews"
4. Карточка отзыва: glassmorphism, аватар (placeholder circle), цитата, звезды
5. Ссылки на Google Reviews и Trustpilot
```

### Задача 5.5: FAQ секция

```prompt
Контекст: Make It Neon.

Задача: Создай FAQ секцию (Accordion):

1. Минимум 12 вопросов-ответов по категориям:
   
   Заказ и оплата:
   - How do I order a custom neon sign?
   - How long does production take?
   - What payment methods do you accept?
   - Can I cancel or modify my order?
   
   Продукт:
   - What is LED neon flex?
   - How long do LED neon signs last?
   - What's the difference between indoor and outdoor signs?
   - What colors are available?
   - Can you make a sign from my logo?
   
   Доставка и монтаж:
   - Do you ship internationally?
   - How is my sign packaged for shipping?
   - Do you offer installation services?
   
2. Используй shadcn Accordion компонент
3. Поисковая строка для быстрого поиска по FAQ
4. SEO: добавь FAQPage schema (JSON-LD)
```

---

## Этап 6: Формы и коммуникация ✅
**Статус: ЗАВЕРШЁН**

### Задача 6.1: Форма кастомного заказа ✅

```prompt
Контекст: Make It Neon.

Задача: Создай страницу Custom Order:

1. CustomOrderPage.tsx с формой:
   - Тип проекта: Text Sign / Logo / Custom Shape
   - Описание проекта (textarea)
   - Загрузка файла (drag&drop zone для логотипа/эскиза)
   - Примерный размер (dropdown)
   - Indoor / Outdoor
   - Цвет предпочтений
   - Контактные данные: имя, email, телефон, компания (опционально)
   
2. Используй react-hook-form + zod для валидации
3. Отправка через EmailJS (бесплатный план)
4. Success state: "Thank you! We'll get back to you within 24 hours with a free design mockup."
5. Дизайн: split layout — форма слева, изображение/информация справа
```

### Задача 6.2: Страница контактов ✅

```prompt
Контекст: Make It Neon.

Задача: Создай Contact Page:

1. Карточки с контактной информацией:
   - 📍 Адрес: Zurich, Switzerland
   - 📞 Phone / WhatsApp: +41 XX XXX XX XX
   - ✉️ Email: info@makeitneon.ch
   - ⏰ Working hours: Mon-Fri 9:00-18:00

2. Форма обратной связи (простая: имя, email, тема, сообщение)
3. Встроенная карта Google Maps (Zurich)
4. Соцсети: Instagram, TikTok, Facebook
5. CTA блок: "Prefer to chat? WhatsApp us!" с кнопкой
```

---

## Этап 7: SEO и производительность
**Статус: ЗАВЕРШЁН**

### Задача 7.1: SEO-оптимизация ✅

```prompt
Контекст: Make It Neon. Спецификация: /Users/green/Documents/landing/makeitneon/MAKEITNEON_SPEC.md

Задача: Полная SEO-оптимизация сайта:

1. Установи react-helmet-async
2. Для КАЖДОЙ страницы:
   - Уникальный title и meta description (EN + DE)
   - Open Graph теги (og:title, og:description, og:image)
   - Twitter Card теги
   - Canonical URL
   - Hreflang теги (en, de)
   
3. JSON-LD структурированные данные:
   - LocalBusiness (адрес в Цюрихе, часы работы)
   - Product (для каждого товара в каталоге)
   - FAQPage (для FAQ секции)
   - BreadcrumbList
   - WebSite (search action)
   
4. Semantic HTML: проверь что используются header, main, nav, section, article, footer
5. Создай sitemap.xml и robots.txt в public/
6. Добавь alt-тексты ко всем изображениям
7. Оптимизируй Core Web Vitals:
   - Lazy load изображений
   - Preload критических шрифтов
   - Code splitting для Three.js (dynamic import)
```

### Задача 7.2: Блог (SEO-контент) ✅

```prompt
Контекст: Make It Neon.

Задача: Создай blog-секцию для SEO:

1. BlogPage.tsx — список статей в виде карточек
2. BlogPostPage.tsx — полная статья

3. Создай 3-5 статей (полнотекстовые, 500+ слов каждая):
   - "10 Benefits of LED Neon Signs for Your Business"
   - "How Custom Neon Signs Are Made: Behind the Scenes"
   - "Neon Sign Ideas for Restaurants, Cafés and Bars"
   - "Indoor vs Outdoor Neon Signs: What You Need to Know"
   - "How to Choose the Right Size for Your Neon Sign"
   
4. Каждая статья:
   - SEO-оптимизированные заголовки H1-H3
   - Meta description
   - Дата публикации
   - Estimated reading time
   - Related articles
   - CTA в конце: "Ready to get your own neon sign? Try our calculator!"
   
5. Все статьи на EN и DE
```

---

## Этап 8: WhatsApp виджет, чат, аналитика
**Статус: ЗАВЕРШЁН**

### Задача 8.1: Виджеты и интеграции ✅

```prompt
Контекст: Make It Neon.

Задача: Добавь интеграции:

1. WhatsApp floating button (нижний правый угол):
   - Зелёная иконка WhatsApp
   - При клике: открывает wa.me/41XXXXXXXXX с предзаполненным текстом
   - Pulse animation для привлечения внимания
   - Скрывается при скролле вверх, появляется при остановке

2. Google Analytics 4:
   - Установи gtag.js
   - Events: page_view, calculator_use, order_submit, product_view, contact_form, language_switch

3. Cookie consent banner:
   - Простой баннер внизу: "We use cookies..." с кнопками Accept / Decline
   - GDPR-compliant (Швейцария)
   - Сохранение выбора в localStorage

4. Scroll-to-top кнопка:
   - Появляется после скролла 300px вниз
   - Smooth scroll наверх
   - Стилизованная кнопка с glassmorphism
```

---

## Этап 9: Генерация изображений и финальная полировка ✅
**Статус: ЗАВЕРШЁН**

### Задача 9.1: Генерация изображений для каталога и портфолио

```prompt
Контекст: Make It Neon.

Задача: Сгенерируй изображения для сайта используя generate_image tool:

1. Hero секция: 
   - Фоновое изображение тёмной стены с неоновым свечением
   
2. Каталог (минимум 10 изображений):
   - Неоновая надпись "Open" на кирпичной стене кафе
   - "Mr & Mrs" в свадебном зале
   - "Dream Big" над рабочим столом
   - "Welcome" у входа в ресторан
   - "Love" в спальне
   - "Cheers" в баре
   - "Hello" в прихожей
   - "Beauty" в салоне красоты
   - Красивый логотип неоном в офисе
   - "Good Vibes" в гостиной

3. Портфолио (8+ изображений):
   - Разные интерьеры с неоновыми вывесками: кафе, бар, отель, салон, дом

4. About page:
   - Фото мастерской/цеха (стилизованное)
   
Стиль: реалистичная фотография, LED neon glow effect, высокое качество, modern interiors
```

### Задача 9.2: Финальная полировка

```prompt
Контекст: Make It Neon.

Задача: Финальная проверка и полировка:

1. Responsive тестирование:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1280px, 1920px)
   - Проверь все страницы на каждом breakpoint

2. Performance:
   - Запусти Lighthouse audit
   - Оптимизируй изображения (WebP формат)
   - Проверь bundle size, сделай code splitting где возможно
   - Цель: Performance > 90, Accessibility > 95, SEO > 95

3. Cross-browser:
   - Chrome, Safari, Firefox, Edge
   - iOS Safari, Android Chrome

4. Accessibility:
   - Keyboard navigation
   - Focus states для всех интерактивных элементов
   - Screen reader compatibility
   - Color contrast check (WCAG AA)

5. Final touches:
   - Favicon (неоновая буква N)
   - Loading states для всех async операций
   - 404 page с неоновой тематикой
   - Smooth page transitions
```

---

## Приоритеты выполнения

| Приоритет | Этап | Описание | Оценка времени |
|:---------:|:----:|---------|:--------------:|
| 🔴 P0 | 1 | Дизайн-система, Routing, i18n | 1 чат-сессия |
| 🔴 P0 | 2 | Hero секция + 3D анимации | 1-2 чат-сессии |
| 🟢 P0 | 3 | Калькулятор (ядро + UI + формы) | ЗАВЕРШЁН |
| 🟡 P1 | 4 | Каталог/Магазин | 1-2 чат-сессии |
| 🟡 P1 | 5 | Секции главной (контент) | 1-2 чат-сессии |
| 🟡 P1 | 6 | Формы и коммуникация | 1 чат-сессия |
| 🟢 P2 | 7 | SEO и блог | 1 чат-сессия |
| 🟢 P2 | 8 | Виджеты и аналитика | 1 чат-сессия |
| 🟢 P2 | 9 | Изображения и полировка | 1 чат-сессия |

---

## Заметки для разработчика

> **Шрифт проекта строго Unbounded** для заголовков, Inter для body.
> **Дизайн — Light Mode**, тёмная тема только для калькулятора (чтобы неон "светился").
> **Glassmorphism** — активно, но уместно: навигация, карточки, модальные окна.
> **Валюта — CHF** (швейцарский франк).
> **Подложка вывесок** — только прозрачный акрил + опция аракал для цветного заполнения.
> **Целевой рынок** — Швейцария (монтаж), Германия (южная, монтаж), весь мир (доставка).
