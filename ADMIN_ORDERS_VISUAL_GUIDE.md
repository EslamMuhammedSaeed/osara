# 📸 Admin Orders Page - Visual Guide

## 🎨 UI Overview

### Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│  إدارة الطلبات                                              │
├─────────────────────────────────────────────────────────────┤
│  [قيد الانتظار] [مؤكد] [قيد التنفيذ] [تم التحضير] ...     │
├─────────────────────────────────────────────────────────────┤
│  [🔍 البحث برقم الطلب]           [تصفية حسب التاريخ ▼]     │
├─────────────────────────────────────────────────────────────┤
│                    ORDERS TABLE                             │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Table Structure

### While Loading (Skeleton):

```
┌──────────┬─────────┬──────┬──────────────┬──────────┬────────────┬───┐
│ ████████ │ ██████  │ ████ │ ████████████ │ ████████ │ ██████████ │ █ │
│ ████████ │ ██████  │ ████ │ ████████████ │ ████████ │ ██████████ │ █ │
│ ████████ │ ██████  │ ████ │ ████████████ │ ████████ │ ██████████ │ █ │
│ ████████ │ ██████  │ ████ │ ████████████ │ ████████ │ ██████████ │ █ │
│ ████████ │ ██████  │ ████ │ ████████████ │ ████████ │ ██████████ │ █ │
└──────────┴─────────┴──────┴──────────────┴──────────┴────────────┴───┘
```

### After Loading:

```
┌──────────┬───────────┬──────────┬────────────────┬─────────────────────┬────────────┬───┐
│ رقم الطلب │  التاريخ  │ العناصر  │    العميل      │      الإجمالي        │   الحالة   │   │
├──────────┼───────────┼──────────┼────────────────┼─────────────────────┼────────────┼───┤
│   #1     │  الآن     │  4 منتج  │ Eslam3         │ 3264.92 جنيه        │ قيد الانتظار│ ⋮ │
│          │           │          │ 15 مايو, القاهرة│ شحن: 65.00 جنيه    │            │   │
│          │           │          │                │ ربح: 500.00 جنيه 15%│            │   │
└──────────┴───────────┴──────────┴────────────────┴─────────────────────┴────────────┴───┘
```

## 🎯 Table Columns in Detail

### Column 1: Order Number

```
┌──────────┐
│   #1     │  ← Order ID (since orderNumber not in API)
└──────────┘
```

### Column 2: Date

```
┌──────────┐
│  الآن     │  ← "Now" (< 1 minute)
│ 5 دقيقة  │  ← "5 minutes" (< 60 min)
│ 2 ساعة   │  ← "2 hours" (< 24 hours)
│ ١٢/١/٢٠٢٥│  ← Full date (> 24 hours)
└──────────┘
```

### Column 3: Items Count

```
┌──────────┐
│ 4 منتج   │  ← Total quantity of all items
│          │    (item1.quantity + item2.quantity + ...)
└──────────┘
```

### Column 4: Customer Info

```
┌────────────────┐
│ Eslam3         │  ← Customer name (bold)
│ 15 مايو, القاهرة│  ← City, Governorate (small, gray)
└────────────────┘
```

### Column 5: Amount Breakdown

```
┌─────────────────────┐
│ 3264.92 جنيه        │  ← Total amount (bold, large)
│ شحن: 65.00 جنيه    │  ← Shipping fee (small, gray)
│ ربح: 500.00 جنيه 15%│  ← Profit + % (small, green)
└─────────────────────┘
```

### Column 6: Status Badge

```
┌────────────┐
│ قيد الانتظار│  ← Clickable badge with dropdown
│     ▼      │    Colors:
└────────────┘    - Yellow: pending
                  - Blue: confirmed
                  - Orange: processing
                  - Purple: picked
                  - Light blue: shipped
                  - Green: delivered
                  - Red: cancelled
```

### Column 7: Actions

```
┌───┐
│ ⋮ │  ← Dropdown menu:
└───┘    - 👁 عرض التفاصيل
         - 🗑 حذف
```

## 💫 Color Previews

### Single Color:

```
┌──────────────────┐
│ اللون: ■          │  ← Solid color square
└──────────────────┘
```

### Multiple Colors (Gradient):

```
┌──────────────────┐
│ اللون: ◧          │  ← Gradient from color 1 to color 2
└──────────────────┘
```

## 🎭 Order Details Modal

```
┌─────────────────────────────────────────────────────────────┐
│  تفاصيل الطلب #1                                        [×] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  معلومات العميل                                             │
│  ┌─────────────────┬──────────────────┬──────────────────┐  │
│  │ الاسم: Eslam3   │ البريد: ...     │ 📞 الهاتف: ...  │  │
│  │ 📍 العنوان: ... │                 │                  │  │
│  └─────────────────┴──────────────────┴──────────────────┘  │
│                                                             │
│  المنتجات المطلوبة                                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ [IMAGE] دريس إشراقة            799.98 جنيه          │   │
│  │         الكمية: 1   المقاس: XL   اللون: ◧          │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │ [IMAGE] دريس إشراقة            2,399.94 جنيه        │   │
│  │         الكمية: 3   المقاس: XL   اللون: ■          │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ملخص الطلب                                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ المجموع الجزئي:                      3,199.92 جنيه  │   │
│  │ رسوم الشحن:                             65.00 جنيه  │   │
│  │ ──────────────────────────────────────────────────── │   │
│  │ الإجمالي:                            3,264.92 جنيه  │   │
│  │ الربح المتوقع:                    500.00 جنيه 15.3% │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  حالة الطلب                                                 │
│  [قيد الانتظار]  السبت، ٢٧ أكتوبر ٢٠٢٥ ١١:٣٢ م           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                              [إغلاق] [تغيير الحالة]        │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Color Scheme

### Status Colors:

| Status     | Background | Text Color | Use Case     |
| ---------- | ---------- | ---------- | ------------ |
| pending    | `#fef5e7`  | `#f6ad55`  | قيد الانتظار |
| confirmed  | `#e6f7ff`  | `#3182ce`  | مؤكد         |
| processing | `#fef3e6`  | `#ed8936`  | قيد التنفيذ  |
| picked     | `#f0e7ff`  | `#9f7aea`  | تم التحضير   |
| shipped    | `#e6f3ff`  | `#4299e1`  | تم الشحن     |
| delivered  | `#d4f4dd`  | `#48bb78`  | تم التسليم   |
| cancelled  | `#ffe6e6`  | `#e53e3e`  | ملغي         |

### Other Colors:

| Element     | Color  | Hex       |
| ----------- | ------ | --------- |
| Primary     | Purple | `#667eea` |
| Text Dark   | Gray   | `#2d3748` |
| Text Medium | Gray   | `#4a5568` |
| Text Light  | Gray   | `#718096` |
| Border      | Gray   | `#e2e8f0` |
| Background  | Gray   | `#f7fafc` |
| Profit      | Green  | `#48bb78` |

## 📐 Layout Measurements

### Table:

- Row height: `auto` (min 60px with padding)
- Column gap: `20px`
- Border radius: `16px`
- Box shadow: `0 2px 8px rgba(0,0,0,0.05)`

### Modal:

- Max width: `800px`
- Max height: `90vh`
- Border radius: `16px`
- Backdrop blur: `4px`
- Box shadow: `0 20px 60px rgba(0,0,0,0.15)`

### Product Image (in modal):

- Width: `80px`
- Height: `80px`
- Border radius: `8px`
- Object fit: `cover`

### Color Preview:

- Width: `20px`
- Height: `20px`
- Border radius: `4px`
- Border: `1px solid #e2e8f0`

## 🎭 Animations

### Skeleton Shimmer:

```scss
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
duration: 1.5s
iteration: infinite
```

### Modal Fade In:

```scss
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
duration: 0.2s;
```

### Modal Slide Up:

```scss
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
duration: 0.3s;
```

### Dropdown Slide Down:

```scss
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
duration: 0.2s;
```

## 📱 Responsive Breakpoints

### Desktop (> 1024px):

- Full table with 7 columns
- Modal: 800px wide
- Info grid: 2 columns

### Tablet/Mobile (≤ 1024px):

- Table scrolls horizontally
- Modal: Full screen (100% width/height, no border radius)
- Info grid: 1 column
- Touch-friendly buttons (larger hit areas)

## 🎯 Interactive States

### Button Hover:

- Background color change
- Slight scale (not implemented but recommended)
- Transition: `0.2s`

### Row Hover:

- Background: `#f7fafc`
- Cursor: default (not clickable)

### Dropdown Active:

- Shows with `slideDown` animation
- Z-index: `100`
- Click outside to close

### Modal:

- Overlay click: Close modal
- Modal content click: Prevent close
- ESC key: Not implemented (can add)

## 🔧 Empty States

### No Orders:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                          📦                                  │
│                    لا توجد طلبات                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Loading:

```
┌─────────────────────────────────────────────────────────────┐
│  ████████  ██████  ████  ████████████  ████████  ██████  █  │
│  ████████  ██████  ████  ████████████  ████████  ██████  █  │
│  ████████  ██████  ████  ████████████  ████████  ██████  █  │
└─────────────────────────────────────────────────────────────┘
```

## 💡 UI/UX Features

### Visual Feedback:

- ✅ Hover states on all interactive elements
- ✅ Loading states with skeletons
- ✅ Transition animations
- ✅ Color-coded status badges
- ✅ Icons for context (phone, location)

### Information Hierarchy:

- ✅ Important info (amount, customer name) is bold and larger
- ✅ Secondary info (location, shipping) is smaller and gray
- ✅ Proper use of whitespace
- ✅ Clear visual grouping

### Accessibility:

- ✅ Proper color contrast ratios
- ✅ Clear labels
- ✅ Icons with text (not icon-only)
- ✅ Keyboard navigation support (standard HTML)

### Mobile Optimization:

- ✅ Touch-friendly button sizes
- ✅ Horizontal scroll for wide table
- ✅ Full-screen modal on mobile
- ✅ Single-column info grid

## 🎨 Typography

### Fonts:

- Family: Inherits from global (Cairo for Arabic)
- Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Sizes:

- Page title: `32px`
- Modal title: `24px`
- Section title: `16px`
- Table header: `13px` (uppercase)
- Table content: `14px`
- Order number: `14px` (bold)
- Total amount: `15px` (bold)
- Small text (location, shipping): `12px-13px`

---

## 🎯 Visual Hierarchy Priority

### High Priority (Bold, Large, Dark):

1. Order number
2. Customer name
3. Total amount
4. Status badge

### Medium Priority (Normal, Medium, Medium Gray):

1. Date
2. Item count
3. Product names in modal
4. Section titles

### Low Priority (Small, Light Gray):

1. Customer location
2. Shipping fee
3. Profit info
4. Item specifications (size, color, quantity)
5. Time stamps

---

**This visual guide shows exactly how the admin orders page looks and behaves! 🎨**
