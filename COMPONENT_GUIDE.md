# Component Guide - OSARA Landing Page

## 🎨 Visual Component Breakdown

This guide shows how each component maps to the design sections.

```
┌─────────────────────────────────────────────────────────┐
│  <Navbar />                                             │
│  ┌──────────────┐                    ┌────────┐        │
│  │ OSARA (Logo) │                    │ Search │        │
│  └──────────────┘                    └────────┘        │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  <Hero />                                               │
│                                                         │
│           ┌─────────────────────────┐                  │
│           │   Background Image      │                  │
│           │   with Gradient         │                  │
│           │                         │                  │
│           │   "مجموعة نساء"         │                  │
│           │   (Centered Text)       │                  │
│           └─────────────────────────┘                  │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  <ImageGallery />                                       │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐    │
│  │Image1│  │Image2│  │Image3│  │Image4│  │Image5│    │
│  │ B&W  │  │ B&W  │  │ B&W  │  │ B&W  │  │ B&W  │    │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘    │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  <Tagline />                                            │
│                                                         │
│         "أسارا أكثر من يتحدث"                          │
│         (Arabic Heading)                                │
│                                                         │
│         Arabic description text...                      │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  <ProductSection title="OUR PRODUCT" />                 │
│                                                         │
│                  OUR PRODUCT                            │
│                                                         │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐      │
│  │Product │  │Product │  │Product │  │Product │      │
│  │  #1    │  │  #2    │  │  #3    │  │  #4    │      │
│  │ ──────┐│  │ ──────┐│  │ ──────┐│  │ ──────┐│      │
│  │ Title  ││  │ Title  ││  │ Title  ││  │ Title  ││      │
│  │ $Price ││  │ $Price ││  │ $Price ││  │ $Price ││      │
│  └────────┘  └────────┘  └────────┘  └────────┘      │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  <ProductSection title="You may also like..." />        │
│                                                         │
│              You may also like...                       │
│                                                         │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐      │
│  │Product │  │Product │  │Product │  │Product │      │
│  │  #5    │  │  #6    │  │  #7    │  │  #8    │      │
│  └────────┘  └────────┘  └────────┘  └────────┘      │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  <Footer />                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │ Company  │  │  Legal   │  │ Product  │  │Social  │ │
│  │          │  │          │  │          │  │Media   │ │
│  │ Contact  │  │ Privacy  │  │  Home    │  │🌐🌐🌐  │ │
│  │  Blog    │  │  Terms   │  │Advisable │  │🌐🌐🌐  │ │
│  │  FAQ     │  │  404     │  │Promotion │  │        │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
│  ─────────────────────────────────────────────────────  │
│  💳💳💳💳         © 2024 osaradesign              │
└─────────────────────────────────────────────────────────┘
```

## 📦 Component Details

### 1. Navbar Component

**File:** `src/components/Navbar.tsx`

**Props:** None

**Features:**

- Fixed position (stays at top when scrolling)
- Logo text (customizable)
- Search icon button
- Clean, minimal design

**Customization:**

```tsx
// Change logo text
<span className="text-2xl font-light tracking-wider text-gray-800">
  YOUR_BRAND_NAME  // ← Change here
</span>

// Or replace with image
<img src="/images/logo.png" alt="Logo" className="h-8" />
```

---

### 2. Hero Component

**File:** `src/components/Hero.tsx`

**Props:** None

**Features:**

- Full-width background image
- Gradient overlay (transparent to white)
- Centered Arabic text
- Responsive height

**Customization:**

```tsx
// Change background image
backgroundImage: `url('/your-image.jpg')`

// Change heading text
<h1>Your Heading Text</h1>

// Adjust height
className="h-[80vh]" // 80% of viewport height
```

---

### 3. ImageGallery Component

**File:** `src/components/ImageGallery.tsx`

**Props:** None

**Features:**

- Responsive grid (1→2→4 columns)
- Grayscale with hover color effect
- Shadow effects
- Rounded corners

**Customization:**

```tsx
// Update images array
const galleryImages = [
  "/your-image-1.jpg",
  "/your-image-2.jpg",
  // ... add more
];

// Change grid columns
className = "lg:grid-cols-4"; // Change to 3 or 5
```

---

### 4. Tagline Component

**File:** `src/components/Tagline.tsx`

**Props:** None

**Features:**

- Centered layout
- Arabic text support
- RTL direction for description

**Customization:**

```tsx
// Change heading
<h2>Your Arabic or English Heading</h2>

// Change description
<p dir="rtl">Your description text</p>
```

---

### 5. ProductCard Component

**File:** `src/components/ProductCard.tsx`

**Props:**

```tsx
interface ProductCardProps {
  image: string; // Product image URL
  title: string; // Product name
  price: number; // Current price
  originalPrice?: number; // Optional: crossed-out price
  currency?: string; // Default: 'EGP'
}
```

**Features:**

- Hover scale effect
- Shadow transitions
- Price display with optional original price
- Responsive design

**Usage:**

```tsx
<ProductCard
  image="/images/products/product-1.jpg"
  title="Elegant Abaya"
  price={1300}
  originalPrice={1800}
  currency="EGP"
/>
```

---

### 6. ProductSection Component

**File:** `src/components/ProductSection.tsx`

**Props:**

```tsx
interface ProductSectionProps {
  title: string; // Section title
  products: Product[]; // Array of products
}
```

**Features:**

- Section heading
- Responsive grid layout
- Maps through products

**Usage:**

```tsx
<ProductSection
  title="OUR PRODUCT"
  products={[
    { id: 1, image: "...", title: "...", price: 1300 },
    // ... more products
  ]}
/>
```

---

### 7. Footer Component

**File:** `src/components/Footer.tsx`

**Props:** None

**Features:**

- 3-column link sections
- Social media icons
- Payment method icons
- Copyright text
- Fully responsive

**Customization:**

```tsx
// Update links
<a href="/your-page">Your Link</a>

// Change social media links
<a href="https://twitter.com/yourhandle">...</a>

// Update copyright
<p>© 2024 <span>yourbrand</span>. All rights reserved.</p>
```

---

## 🎨 Styling Guide

### Colors Used

| Element        | Color       | Tailwind Class      |
| -------------- | ----------- | ------------------- |
| Primary Text   | Dark Gray   | `text-gray-800`     |
| Secondary Text | Medium Gray | `text-gray-600`     |
| Background     | White       | `bg-white`          |
| Hover States   | Light Gray  | `hover:bg-gray-100` |
| Borders        | Light Gray  | `border-gray-200`   |

### Typography

| Element        | Size       | Weight | Tailwind Class                     |
| -------------- | ---------- | ------ | ---------------------------------- |
| Hero Title     | 4xl-6xl    | Light  | `text-4xl md:text-6xl font-light`  |
| Section Titles | 2xl-3xl    | Normal | `text-2xl md:text-3xl font-normal` |
| Product Title  | Base       | Medium | `text-base font-medium`            |
| Body Text      | Small-Base | Normal | `text-sm md:text-base`             |

### Spacing

| Section   | Padding | Tailwind Class         |
| --------- | ------- | ---------------------- |
| Sections  | 12-16   | `py-12 md:py-16`       |
| Container | 4-8     | `px-4 sm:px-6 lg:px-8` |
| Grid Gap  | 6-8     | `gap-6 md:gap-8`       |

### Responsive Breakpoints

```tsx
// Tailwind default breakpoints used:
sm:  640px   // Tablet
md:  768px   // Tablet landscape
lg:  1024px  // Desktop
xl:  1280px  // Large desktop
```

---

## 🔄 Data Flow

```
App.tsx
  │
  ├─ Define product arrays
  │  └─ ourProducts: Product[]
  │  └─ relatedProducts: Product[]
  │
  ├─ <Navbar /> ──────────────────────> No props
  ├─ <Hero /> ────────────────────────> No props
  ├─ <ImageGallery /> ────────────────> No props
  ├─ <Tagline /> ─────────────────────> No props
  ├─ <ProductSection
  │    title="OUR PRODUCT"
  │    products={ourProducts} /> ─────> Renders ProductCard for each
  ├─ <ProductSection
  │    title="You may also like..."
  │    products={relatedProducts} /> ─> Renders ProductCard for each
  └─ <Footer /> ──────────────────────> No props
```

---

## 🚀 Quick Customization Checklist

- [ ] Update brand name in Navbar
- [ ] Replace hero background image
- [ ] Update Arabic text in Hero and Tagline
- [ ] Update product data in App.tsx
- [ ] Replace gallery images
- [ ] Replace product images
- [ ] Update footer links
- [ ] Update social media URLs
- [ ] Customize colors (replace Tailwind classes)
- [ ] Add your logo image

---

## 📱 Testing Components

### Test each component:

1. **Navbar**: Scroll down - should stay fixed at top
2. **Hero**: Check text centering and gradient
3. **Gallery**: Hover over images - should remove grayscale
4. **Products**: Hover over cards - should scale up
5. **Footer**: Click links to verify they work

### Test responsiveness:

```bash
# Open browser DevTools (F12)
# Toggle device toolbar (Ctrl+Shift+M)
# Test these sizes:
- iPhone 14: 390x844
- iPad Air: 820x1180
- Desktop: 1440x900
```

---

Made with ❤️ for OSARA | Last Updated: October 3, 2025
