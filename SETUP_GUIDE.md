# Setup Guide - OSARA Landing Page

## Quick Start

Follow these steps to get your landing page running:

### Step 1: Install Dependencies ✅

You've already done this! Your project has all necessary packages.

### Step 2: Add Images

The design needs images in specific folders. Here are your options:

#### Option A: Use Placeholder Images (Quickest)

The components are already configured to work with placeholder images for development.
Just run the dev server and you'll see gray placeholder boxes.

```bash
npm run dev
```

#### Option B: Download Free Stock Images

1. Visit these sites for free images:

   - **Unsplash**: https://unsplash.com/s/photos/fashion-abaya
   - **Pexels**: https://pexels.com/search/modest-fashion
   - **Pixabay**: https://pixabay.com/images/search/hijab/

2. Download images and place them here:

```
public/
└── images/
    ├── hero/
    │   └── hero-main.jpg          (1 image - main hero background)
    ├── gallery/
    │   ├── gallery-1.jpg          (5 images - lifestyle photos)
    │   ├── gallery-2.jpg
    │   ├── gallery-3.jpg
    │   ├── gallery-4.jpg
    │   └── gallery-5.jpg
    └── products/
        ├── product-1.jpg          (8 images - product photos)
        ├── product-2.jpg
        ├── product-3.jpg
        ├── product-4.jpg
        ├── product-5.jpg
        ├── product-6.jpg
        ├── product-7.jpg
        └── product-8.jpg
```

#### Option C: Use Online Placeholder Service

Update the image paths in `App.tsx` and components to use online placeholders:

```tsx
// Example using placeholder.com
image: "https://via.placeholder.com/600x600/CCCCCC/666666?text=Product";
```

### Step 3: Run the Development Server

```bash
npm run dev
```

Open your browser to `http://localhost:5173`

### Step 4: Customize

Edit the following files to match your brand:

1. **Product Data** - `src/App.tsx`

   ```tsx
   const ourProducts = [
     {
       id: 1,
       image: "/images/products/product-1.jpg",
       title: "Your Product Name", // ← Change this
       price: 1300.0, // ← Change this
     },
   ];
   ```

2. **Colors** - Update TailwindCSS classes in components

   ```tsx
   // Example: Change accent color
   className="text-gray-800" → className="text-blue-800"
   ```

3. **Logo** - `src/components/Navbar.tsx`

   ```tsx
   <span className="text-2xl font-light tracking-wider text-gray-800">
     OSARA {/* ← Change to your brand name */}
   </span>
   ```

4. **Footer Text** - `src/components/Footer.tsx`
   ```tsx
   <p className="text-xs text-gray-500">
     © 2024 <span className="font-semibold">osaradesign</span> {/* ← Change */}
   </p>
   ```

## 🎨 Image Specifications

For best results, use these image sizes:

| Section         | Size        | Format  | Notes                               |
| --------------- | ----------- | ------- | ----------------------------------- |
| Hero Background | 1920x1080px | JPG     | High quality, dramatic lighting     |
| Gallery Images  | 800x1200px  | JPG     | Portrait orientation, B&W preferred |
| Product Images  | 600x600px   | JPG/PNG | Square, clean background            |

## 🔧 Troubleshooting

### Images Not Showing?

1. Check that images are in `public/images/` folder
2. Check that filenames match exactly (case-sensitive)
3. Clear browser cache and reload

### Port Already in Use?

```bash
# Kill the process on port 5173 or use a different port
npm run dev -- --port 3000
```

### Build Errors?

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📱 Testing Responsive Design

Test on different screen sizes:

1. **Mobile**: Chrome DevTools → Toggle Device Toolbar → iPhone 14
2. **Tablet**: Chrome DevTools → iPad Air
3. **Desktop**: Full browser window (1440px+ width)

## 🚀 Deploy to Production

### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Option 2: Netlify

```bash
npm run build
# Drag and drop 'dist' folder to Netlify
```

### Option 3: GitHub Pages

```bash
npm run build
# Push 'dist' folder to gh-pages branch
```

## 📞 Need Help?

- Check `PROJECT_STRUCTURE.md` for detailed component info
- Review component files in `src/components/`
- All components have TypeScript types for guidance

---

Happy coding! 🎉
