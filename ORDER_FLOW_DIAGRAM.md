# 📊 Order Creation Flow

## Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     USER JOURNEY                             │
└─────────────────────────────────────────────────────────────┘

    [Browse Products]
           ↓
    [Select Size & Color]
           ↓
    [Add to Cart] ───────────────┐
           ↓                      │ (Can add multiple items)
    [Continue Shopping?] ─────────┘
           ↓ No
    [Go to Cart Page]
           ↓
    ┌───────────────────────────────────┐
    │   CART PAGE                        │
    │                                    │
    │  • View Cart Items                 │
    │  • Adjust Quantities               │
    │  • Remove Items                    │
    │  • See Subtotal                    │
    └───────────────────────────────────┘
           ↓
    ┌───────────────────────────────────┐
    │   SHIPPING FORM                    │
    │                                    │
    │  • Name           [_____________]  │
    │  • Email          [_____________]  │
    │  • Phone          [+20_________]   │
    │  • Governorate    [▼___________]   │
    │  • City           [▼___________]   │
    │  • Address        [_____________]  │
    │  • Notes          [_____________]  │
    │                                    │
    │  💰 Shipping Fee: XX جنيه          │
    └───────────────────────────────────┘
           ↓
    [View Total] (Subtotal + Shipping)
           ↓
    [Click "إنشاء الطلب"]
           ↓
    ┌───────────────────────────────────┐
    │   VALIDATION                       │
    │                                    │
    │  ✓ Name not empty?                 │
    │  ✓ Email valid?                    │
    │  ✓ Phone valid?                    │
    │  ✓ Governorate selected?           │
    │  ✓ City selected?                  │
    │  ✓ Address not empty?              │
    │  ✓ Cart has items?                 │
    └───────────────────────────────────┘
           ↓
        Valid? ──No──→ [Show Error Modal]
           ↓ Yes              ↓
           │           [User Fixes Form]
           │                  ↓
           └──────────────────┘
           ↓
    ┌───────────────────────────────────┐
    │   DATA TRANSFORMATION              │
    │                                    │
    │  Cart Items → Order Items:         │
    │  • id → productId                  │
    │  • Keep quantity, size, color      │
    │                                    │
    │  Phone → +20 prefix                │
    │  • "1012345678" → "+201012345678"  │
    │                                    │
    │  Governorate ID → Name             │
    │  • "1" → "القاهرة"                 │
    │                                    │
    │  City ID → Name                    │
    │  • "123" → "مدينة نصر"             │
    └───────────────────────────────────┘
           ↓
    ┌───────────────────────────────────┐
    │   API CALL                         │
    │                                    │
    │  POST /api/orders                  │
    │  {                                 │
    │    items: [...],                   │
    │    name: "...",                    │
    │    email: "...",                   │
    │    phone: "+20...",                │
    │    governorate: "...",             │
    │    city: "...",                    │
    │    address: "...",                 │
    │    notes: "..."                    │
    │  }                                 │
    └───────────────────────────────────┘
           ↓
    ┌──────────┴──────────┐
    ↓                      ↓
[SUCCESS]            [ERROR]
    ↓                      ↓
┌─────────────────┐  ┌─────────────────┐
│ Success Modal   │  │ Error Modal     │
│                 │  │                 │
│ 🎉 Order Created│  │ ❌ Order Failed │
│ Order #: XXX    │  │ Error message   │
│                 │  │                 │
│ [OK]            │  │ [OK]            │
└─────────────────┘  └─────────────────┘
    ↓                      ↓
[Clear Cart]         [Keep Cart]
    ↓                      ↓
[Show Empty Cart]    [User Can Retry]
```

## Component Interaction

```
┌─────────────────────────────────────────────────────────────┐
│                   COMPONENT STRUCTURE                        │
└─────────────────────────────────────────────────────────────┘

    CartPage
      │
      ├── CartItems (left side)
      │     │
      │     ├── CartItem ×N
      │     │     └── Shows: image, name, price, size, color
      │     │
      │     └── useCart hook
      │           └── cartItems, updateQuantity, removeFromCart
      │
      └── CartSummary (right side)
            │
            ├── ShippingForm
            │     │
            │     ├── State: formData
            │     │     ├── name
            │     │     ├── email
            │     │     ├── phone
            │     │     ├── governorate
            │     │     ├── city
            │     │     ├── address
            │     │     └── notes
            │     │
            │     ├── Callbacks:
            │     │     ├── onFormDataChange(data)
            │     │     └── onShippingFeeChange(fee)
            │     │
            │     └── Features:
            │           ├── Dynamic city filtering
            │           ├── Validation
            │           └── Shipping fee calculation
            │
            ├── State Management:
            │     ├── shippingData (from ShippingForm)
            │     ├── shippingFee (from ShippingForm)
            │     ├── isSubmitting
            │     └── modalConfig
            │
            ├── Order Creation Logic:
            │     ├── validateForm()
            │     ├── handleCheckout()
            │     └── dispatch(createOrder())
            │
            └── Modal
                  └── Shows success/error messages
```

## Data Transformation

```
┌─────────────────────────────────────────────────────────────┐
│                   DATA FLOW                                  │
└─────────────────────────────────────────────────────────────┘

CART ITEM (Frontend)               ORDER ITEM (API)
┌─────────────────────┐            ┌─────────────────────┐
│ {                   │            │ {                   │
│   id: 1,            │ ──────────→│   productId: 1,     │
│   name: "Product",  │     ✕      │                     │
│   price: 1300,      │     ✕      │                     │
│   quantity: 2,      │ ──────────→│   quantity: 2,      │
│   image: "/...",    │     ✕      │                     │
│   color: [          │ ──────────→│   color: [          │
│     "#808000",      │            │     "#808000",      │
│     "FFFDD0"        │            │     "FFFDD0"        │
│   ],                │            │   ],                │
│   size: "M"         │ ──────────→│   size: "M"         │
│ }                   │            │ }                   │
└─────────────────────┘            └─────────────────────┘

SHIPPING FORM (Frontend)           ORDER DATA (API)
┌─────────────────────┐            ┌─────────────────────┐
│ {                   │            │ {                   │
│   name: "John",     │ ──────────→│   name: "John",     │
│   email: "j@...",   │ ──────────→│   email: "j@...",   │
│   phone: "10123...",│ ──────────→│   phone: "+2010..", │
│   governorate: "1", │ ──────────→│   governorate: "ال..│
│   city: "123",      │ ──────────→│   city: "مدينة...", │
│   address: "123 ...",│──────────→│   address: "123...", │
│   notes: "Please.." │ ──────────→│   notes: "Please.." │
│ }                   │            │ }                   │
└─────────────────────┘            └─────────────────────┘

COMPLETE ORDER REQUEST
┌──────────────────────────────────────────────────────────┐
│ POST /api/orders                                         │
│                                                          │
│ {                                                        │
│   items: [                                               │
│     { productId: 1, quantity: 2, size: "M", color: [...] }│
│   ],                                                     │
│   name: "John Doe",                                      │
│   email: "john@example.com",                             │
│   phone: "+201012345678",                                │
│   governorate: "القاهرة",                                │
│   city: "مدينة نصر",                                     │
│   address: "123 Main Street",                            │
│   notes: "Please call before delivery"                   │
│ }                                                        │
└──────────────────────────────────────────────────────────┘
```

## State Management (Redux)

```
┌─────────────────────────────────────────────────────────────┐
│                   REDUX FLOW                                 │
└─────────────────────────────────────────────────────────────┘

    Component: CartSummary
           ↓
    dispatch(createOrder({ data }))
           ↓
    Redux Thunk: ordersSlice
           ↓
    ordersAPI.create(data)
           ↓
    axios.post('/api/orders', data)
           ↓
    ┌──────────┴──────────┐
    ↓                      ↓
[200 OK]              [Error]
    ↓                      ↓
Success Action        Rejected Action
    ↓                      ↓
.unwrap()             throw Error
    ↓                      ↓
try { }               catch { }
    ↓                      ↓
Show Success          Show Error
Clear Cart            Keep Cart
```

## Error Handling

```
┌─────────────────────────────────────────────────────────────┐
│                   ERROR SCENARIOS                            │
└─────────────────────────────────────────────────────────────┘

Validation Errors (Before API)
├── Empty name          → "يرجى إدخال الاسم"
├── Invalid email       → "يرجى إدخال بريد إلكتروني صحيح"
├── Invalid phone       → "يرجى إدخال رقم هاتف صحيح"
├── No governorate      → "يرجى اختيار المحافظة"
├── No city             → "يرجى اختيار المدينة"
├── Empty address       → "يرجى إدخال العنوان التفصيلي"
└── Empty cart          → "يرجى إضافة منتجات إلى السلة"

API Errors (After API)
├── Network error       → "حدث خطأ أثناء إنشاء الطلب"
├── Server error (5xx)  → Backend error message
├── Validation (4xx)    → Backend error message
└── Timeout             → "حدث خطأ أثناء إنشاء الطلب"

All errors show modal with:
  - Error icon (❌)
  - Arabic title
  - Clear message
  - OK button
```

## Loading States

```
┌─────────────────────────────────────────────────────────────┐
│                   LOADING STATES                             │
└─────────────────────────────────────────────────────────────┘

Initial State
  Button: "إنشاء الطلب"
  Enabled: true

Loading State (During API Call)
  Button: "جاري إنشاء الطلب..."
  Enabled: false (disabled)
  Cursor: not-allowed

Success State
  Modal: Shows success message
  Cart: Cleared
  Button: Back to "إنشاء الطلب" (but cart is empty)

Error State
  Modal: Shows error message
  Cart: Unchanged
  Button: Back to "إنشاء الطلب" (can retry)
```

---

## 🎯 Key Features

✅ **Form Validation** - 7 validation rules
✅ **Dynamic Filtering** - Cities based on governorate
✅ **Auto Calculation** - Shipping fees
✅ **Data Transform** - Cart to API format
✅ **Error Handling** - Comprehensive coverage
✅ **Loading States** - User feedback
✅ **Success Flow** - Cart clearing
✅ **Type Safety** - Full TypeScript

---

**This diagram shows the complete order creation flow implemented in your application!**
