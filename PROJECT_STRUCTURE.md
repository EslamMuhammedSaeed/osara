# OSARA Landing Page - Project Structure

## Overview

This is a modern, responsive landing page for OSARA fashion brand built with React, TypeScript, TailwindCSS, and Vite.

## 📁 Project Structure

```
osara/
├── public/
│   └── images/
│       ├── hero/
│       │   └── hero-main.jpg          # Main hero background image
│       ├── gallery/
│       │   ├── gallery-1.jpg          # Gallery images (5 total)
│       │   ├── gallery-2.jpg
│       │   ├── gallery-3.jpg
│       │   ├── gallery-4.jpg
│       │   └── gallery-5.jpg
│       └── products/
│           ├── product-1.jpg to product-8.jpg  # Product images
│
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                 # Top navigation with logo and search
│   │   ├── Hero.tsx                   # Hero section with background image
│   │   ├── ImageGallery.tsx           # 4-column responsive gallery
│   │   ├── Tagline.tsx                # Arabic tagline section
│   │   ├── ProductCard.tsx            # Reusable product card component
│   │   ├── ProductSection.tsx         # Product grid section wrapper
│   │   └── Footer.tsx                 # Footer with links and social media
│   │
│   ├── App.tsx                        # Main application component
│   ├── main.tsx                       # Application entry point
│   └── index.css                      # Global styles with TailwindCSS
│
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.js
```

## 🎨 Components Description

### Navbar

- Fixed position navbar with logo and search icon
- Minimal, clean design
- Responsive padding

### Hero Section

- Full-width hero with background image
- Gradient overlay fading to white
- Centered Arabic text "مجموعة نساء"
- Responsive height (60vh on mobile, 80vh on desktop)

### ImageGallery

- Responsive grid: 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)
- Grayscale images with hover effect
- Shadow effects

### Tagline

- Arabic text with description
- Centered layout
- RTL support for Arabic content

### ProductCard

- Reusable component for product display
- Image, title, price, and optional original price
- Hover effects with scale animation
- Shadow transitions

### ProductSection

- Wrapper for product grids
- Used for both "OUR PRODUCT" and "You may also like..." sections
- Responsive 4-column grid

### Footer

- 4-column layout on desktop
- Company, Legal, Product links
- Social media icons (Twitter, Facebook, Pinterest, Instagram, TikTok, YouTube)
- Payment method icons
- Copyright information
- Fully responsive

## 🖼️ Image Placeholders Required

You need to add the following images to make the design complete:

### Hero Section

- `public/images/hero/hero-main.jpg` - Main hero background (recommended: 1920x1080px)

### Gallery Section

- `public/images/gallery/gallery-1.jpg` through `gallery-5.jpg`
- Recommended: Black and white lifestyle photos (800x1200px each)

### Products Section

- `public/images/products/product-1.jpg` through `product-8.jpg`
- Recommended: Product photos (600x600px each)

## 🚀 Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Add your images:**

   - Place images in the `public/images/` folders as described above
   - Use placeholder services like [Unsplash](https://unsplash.com) or [Pexels](https://pexels.com) for testing

3. **Run development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🎯 Design Features

- ✅ Fully responsive (mobile-first design)
- ✅ Modern UI with TailwindCSS
- ✅ Smooth hover effects and transitions
- ✅ Arabic text support (RTL)
- ✅ Accessibility features (aria-labels)
- ✅ Clean component structure
- ✅ TypeScript type safety
- ✅ Optimized for performance

## 📱 Responsive Breakpoints

- **Mobile:** < 640px (1 column)
- **Tablet:** 640px - 1024px (2 columns)
- **Desktop:** > 1024px (4 columns)

## 🔧 Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS 4** - Utility-first CSS
- **React Icons** - Icon library
- **React Router DOM** - Routing (ready for multi-page)

## 📝 Notes

- All components are functional components with TypeScript
- Product data is currently hardcoded in `App.tsx` - ready for API integration
- Images use public folder for easy deployment
- Footer includes placeholder payment icons (can be replaced with actual payment provider icons)
