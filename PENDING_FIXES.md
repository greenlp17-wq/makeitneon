# Список известных проблем для финального этапа (Stage 9 / Polish)

Этот файл содержит технический долг, неработающие ссылки и проблемы производительности, выявленные на Этапе 8. Исправить перед релизом.

## 1. Проблемы с роутингом (Внутренние ссылки)
Вместо компонентов `<Link>` из `react-router-dom` используются обычные теги `<a>`, что вызывает жесткую перезагрузку страницы вместо плавного перехода (SPA):

- [x] **`src/pages/ShopPage.tsx` (строка 234):** Кнопка перехода в калькулятор из пустой корзины. ✅ Fixed
- [x] **`src/pages/CustomOrderPage.tsx` (строки 248, 850):** Ссылки на калькулятор. ✅ Fixed
- [x] **`src/components/calculator/CalculatorPanel.tsx` (строка 99):** Ссылка на форму кастомного заказа. ✅ Fixed
- [x] **Ссылки внутри статей блога (`src/data/blog.ts`):** Markdown парсер оборачивает ссылки в `<a href="...">`. Для этого потребуется создать кастомный парсер ссылок в `BlogPostPage.tsx`, чтобы внутренние ссылки перехватывались `react-router-dom` или перевести их на `<Link>`. ✅ Fixed (click interception via handleContentClick)

## 2. Pаглушки (Placeholders), требующие реальных данных
- [ ] **WhatsApp:** Заменить `41XXXXXXXX` на реальный номер в `src/components/widgets/WhatsAppButton.tsx` и `src/pages/ContactPage.tsx`.
- [ ] **Google Analytics:** Заменить `G-XXXXXXXXXX` на рабочий GA4 Measurement ID в `src/components/widgets/CookieConsent.tsx`.
- [ ] **Google Maps:** Проверить и утвердить реальный физический адрес точки для `ContactPage.tsx`.
- [ ] **Социальные сети:** Ссылки на Instagram, TikTok и Facebook захардкожены на `/makeitneon`. (Файлы: `Footer.tsx`, `ContactPage.tsx`).
- [ ] **Отзывы:** Заменить заглушки ссылок на Google Reviews и Trustpilot (`src/components/sections/TestimonialsSection.tsx`).

## 3. Ошибки линтера и предупреждения React
Рефакторинг кода для улучшения производительности и соответствия стандартам:

- [x] **Cascading Renders:** Убрать синхронный `setState` внутри `useEffect`. ✅ Fixed
  - Файл 1: `src/hooks/useNeonCalculator.ts` (`setIsCalculating(true)`).
  - Файл 2: `src/pages/ProductPage.tsx` (`setSelectedColorId(...)`).
- [ ] **Fast Refresh:** Разделить экспорт хуков и UI-компонентов в `src/hooks/useCart.tsx`. (Сейчас экспортируется стейт-провайдер и хук синхронно, что отключает горячую перезагрузку для этого файла).
- [x] **React Hook Form:** Вынести использование `watch('approximateSize')` изнутри маппинга массива `.map()` для избежания проблем с мемоизацией компилятора. (`src/pages/CustomOrderPage.tsx`). ✅ Fixed (extracted to top-level watchApproximateSize)
- [ ] **Доступность (Base UI):** Предупреждение `nativeButton={true}` — исправить использование псевдо-кнопок в компонентах (`Header.tsx`, `HeroSection.tsx`, `HomePage.tsx` и др.). Везде, где кнопка не является семантическим `<button>`, установить `nativeButton={false}` или переписать на `button`.
- [x] **Удалить неиспользуемые переменные:** Очистить код от `any` и неиспользуемых импортов. ✅ Fixed (FAQPage StaggerGroup, AboutPage Factory/ShieldCheck)

## 4. Дополнительные исправления (Stage 9.2)
- [x] **Accordion TypeScript:** `type="single"` и `collapsible` не являются валидными пропсами для base-ui Accordion — обновлён wrapper. ✅ Fixed
- [x] **Zod v4:** `required_error` → `message` для `z.enum()` в CustomOrderPage. ✅ Fixed
- [x] **CookieConsent:** `if (window.gtag)` всегда true — исправлено на `typeof window.gtag === 'function'`. ✅ Fixed
- [x] **404 страница:** Добавлена `NotFoundPage.tsx` с неоновой тематикой вместо redirect. ✅ Added
