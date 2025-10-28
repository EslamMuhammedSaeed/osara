# Order Creation Setup Guide

## Overview

The order creation feature is now fully implemented! This guide will help you set up the required configuration to connect to your backend API.

## ✅ What's Implemented

1. **Shipping Form** - Collects customer information:

   - Name
   - Email
   - Phone (Egyptian format: +20 followed by 10 digits)
   - Governorate and City selection
   - Detailed address
   - Optional notes

2. **Cart Summary** - Shows:

   - Subtotal
   - Shipping fee (based on selected city)
   - Total amount
   - Order creation button

3. **Order Creation** - Handles:
   - Form validation
   - Data transformation to match API format
   - Success/error feedback
   - Cart clearing on success

## 🔧 Setup Instructions

### Step 1: Create Environment File

Create a `.env` file in the project root directory:

```bash
# In the project root (d:\osara)
touch .env
```

### Step 2: Add API URL

Add the following content to your `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

**Note:** Change the URL if your backend runs on a different port or domain.

### Step 3: Restart Development Server

After creating the `.env` file, restart your development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

## 📡 API Integration

### Expected Backend Endpoint

**POST** `/api/orders`

### Request Format

The frontend sends the following data structure:

```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "size": "M",
      "color": ["#808000", "FFFDD0"]
    }
  ],
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+201234567890",
  "governorate": "Cairo",
  "city": "Nasr City",
  "address": "123 Main Street, Apt 4B",
  "notes": "Please call before delivery"
}
```

### Expected Response Format

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "orderNumber": "ORD-001",
    "items": [...],
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+201234567890",
    "governorate": "Cairo",
    "city": "Nasr City",
    "address": "123 Main Street, Apt 4B",
    "notes": "Please call before delivery",
    "status": "pending",
    "total": 2600,
    "profit": 0,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Order created successfully"
}
```

**Error Response (4xx/5xx):**

```json
{
  "success": false,
  "message": "Error message here"
}
```

## 🧪 Testing

### Test with Sample Data

1. **Add items to cart:**

   - Go to a product page
   - Select size and color
   - Add to cart

2. **Fill shipping form:**

   - Name: Test User
   - Email: test@example.com
   - Phone: 1012345678
   - Governorate: القاهرة (Cairo)
   - City: مدينة نصر (Nasr City)
   - Address: 123 Test Street

3. **Click "إنشاء الطلب" (Create Order)**

4. **Expected behavior:**
   - Loading state on button
   - Success modal on success
   - Cart cleared
   - Error modal if API fails

### Testing Without Backend

If you don't have a backend yet, you can mock the API response:

1. Open `src/services/api.ts`
2. Temporarily modify the `create` function in `ordersAPI`:

```typescript
create: async (data: CreateOrderData): Promise<ApiResponse<Order>> => {
  // Mock response for testing
  return {
    success: true,
    data: {
      id: 1,
      orderNumber: 'ORD-' + Date.now(),
      items: data.items.map((item, index) => ({
        id: index + 1,
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
        color: item.color.join(','),
        price: 1300,
      })),
      name: data.name,
      email: data.email,
      phone: data.phone,
      governorate: data.governorate,
      city: data.city,
      address: data.address,
      notes: data.notes,
      status: 'pending',
      total: 2600,
      profit: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    message: 'Order created successfully',
  };
},
```

## 🔍 Validation

The form validates:

- **Name**: Required, non-empty
- **Email**: Required, valid email format
- **Phone**: Required, 10 digits starting with 10, 11, 12, or 15
- **Governorate**: Required selection
- **City**: Required selection
- **Address**: Required, non-empty
- **Cart**: Must have at least one item

## 🎯 Features

### Form Features

- ✅ Real-time validation
- ✅ Dynamic city filtering based on governorate
- ✅ Automatic shipping fee calculation
- ✅ Phone number formatting with +20 prefix
- ✅ Optional notes field

### Order Creation Features

- ✅ Form validation before submission
- ✅ Loading states during API call
- ✅ Success modal with order number
- ✅ Error handling with user feedback
- ✅ Automatic cart clearing on success
- ✅ Data transformation to API format
- ✅ Color array handling
- ✅ Country code prefix for phone numbers

## 🐛 Troubleshooting

### Orders Not Being Created

1. **Check .env file exists:**

   ```bash
   ls -la | grep .env
   ```

2. **Check API URL is correct:**

   - Open browser console (F12)
   - Look for network requests
   - Check the request URL

3. **Check backend is running:**

   ```bash
   curl http://localhost:3000/api/orders
   ```

4. **Check CORS settings:**
   - Backend must allow requests from `http://localhost:5173`

### Validation Errors

- **Phone**: Must be exactly 10 digits, starting with 10, 11, 12, or 15
- **Email**: Must be valid email format
- **All required fields**: Must be filled

### Network Errors

If you see network errors in console:

1. Verify backend is running
2. Check `.env` file has correct URL
3. Restart dev server after creating `.env`
4. Check browser console for CORS errors

## 📝 Files Modified

The following files were updated to implement order creation:

1. **src/components/Cart/ShippingForm.tsx**

   - Added `onFormDataChange` callback
   - Exported `ShippingData` interface
   - Added notes field

2. **src/components/Cart/CartSummary.tsx**

   - Added form data state management
   - Implemented form validation
   - Added order creation logic
   - Added success/error handling
   - Added cart clearing on success

3. **src/services/api.ts**

   - Already had `ordersAPI.create()` implemented

4. **src/store/slices/ordersSlice.ts**

   - Already had `createOrder` thunk implemented

5. **src/types/admin.types.ts**
   - Already had `CreateOrderData` type defined

## 🚀 Next Steps

1. Set up backend API endpoint at `POST /api/orders`
2. Test order creation flow
3. Implement payment integration (if needed)
4. Add order confirmation email
5. Add order tracking for customers

## 📞 Support

For backend API requirements, see: `BACKEND_API_REQUIREMENTS.md`

---

**Order creation is ready! Just add your backend API URL to `.env` and you're good to go! 🎉**
