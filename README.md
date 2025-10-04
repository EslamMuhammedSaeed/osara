# OSARA - Modern Fashion Landing Page

A beautiful, responsive landing page for OSARA fashion brand built with React, TypeScript, Vite, and TailwindCSS.

![OSARA Landing Page](./docs/preview.png)

## ✨ Features

- 🎨 Modern, minimal design with elegant typography
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast performance with Vite
- 🔒 Type-safe with TypeScript
- 🎭 Beautiful hover effects and transitions
- 🌍 Arabic text support (RTL)
- ♿ Accessible components
- 🛍️ Product showcase sections
- 📸 Image gallery with grayscale effects

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository (or your own)
git clone <your-repo-url>
cd osara

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📂 Project Structure

```
osara/
├── src/
│   ├── components/       # React components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── ImageGallery.tsx
│   │   ├── Tagline.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductSection.tsx
│   │   └── Footer.tsx
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
│
├── public/
│   └── images/          # Static images
│       ├── hero/
│       ├── gallery/
│       └── products/
│
└── package.json
```

## 🖼️ Adding Your Images

To complete the design, add your images to the `public/images/` folder:

### Required Images:

1. **Hero Section**

   - `public/images/hero/hero-main.jpg` (1920x1080px recommended)

2. **Gallery Section**

   - `public/images/gallery/gallery-1.jpg` to `gallery-5.jpg`
   - Black and white lifestyle photos (800x1200px recommended)

3. **Products Section**
   - `public/images/products/product-1.jpg` to `product-8.jpg`
   - Product photos (600x600px recommended)

### Using Placeholder Images

For development, you can use placeholder services. The components will work with any image URLs.

Example using Unsplash:

```tsx
// In App.tsx, you can use online placeholders:
image: "https://images.unsplash.com/photo-...";
```

## 🎨 Customization

### Colors

Edit TailwindCSS classes in components to match your brand:

```tsx
// Example: Change primary color
className="text-blue-600" → className="text-purple-600"
```

### Typography

The design uses system fonts. To add custom fonts:

1. Add font files to `public/fonts/`
2. Update `index.css`:

```css
@font-face {
  font-family: "YourFont";
  src: url("/fonts/YourFont.woff2") format("woff2");
}

body {
  font-family: "YourFont", sans-serif;
}
```

### Product Data

Products are defined in `App.tsx`. Replace with your own data or connect to an API:

```tsx
const ourProducts = [
  {
    id: 1,
    image: "/images/products/product-1.jpg",
    title: "Your Product Name",
    price: 1300.0,
    originalPrice: 1800.0,
  },
  // ... more products
];
```

## 🛠️ Tech Stack

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Vite 7** - Build Tool & Dev Server
- **TailwindCSS 4** - Utility-First CSS
- **React Icons** - Icon Library
- **React Router DOM** - Routing (ready for expansion)

## 📱 Responsive Design

The layout adapts seamlessly across devices:

- **Mobile (< 640px):** Single column layout
- **Tablet (640px - 1024px):** 2 column grid
- **Desktop (> 1024px):** 4 column grid

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For questions or support, please open an issue or contact us.

---

Made with ❤️ for OSARA
