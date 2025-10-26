# 🎛️ لوحة التحكم الإدارية - OSARA Admin Panel

## 📋 نظرة عامة

تم تنفيذ لوحة تحكم إدارية كاملة الميزات لتطبيق OSARA باستخدام React + TypeScript + Redux. اللوحة مصممة بالكامل بنمط RTL (من اليمين لليسار) مع واجهة عربية كاملة.

---

## 🚀 الميزات الرئيسية

### ✅ نظام المصادقة

- 🔐 تسجيل الدخول للمشرفين
- 🔑 إدارة التوكن (Token) في localStorage
- 🛡️ حماية المسارات (Protected Routes)
- 🚪 تسجيل الخروج الآمن

### 📊 لوحة التحكم الرئيسية

- 📈 إحصائيات في الوقت الفعلي:
  - إجمالي الطلبات
  - الطلبات المعلقة
  - إجمالي الإيرادات
  - إجمالي الأرباح
- 📋 عرض أحدث الطلبات

### 🛒 إدارة الطلبات

- ✨ تصميم مطابق للواجهة المرجعية
- 📑 تبويبات حسب حالة الطلب:
  - قيد الانتظار (Pending)
  - مؤكد (Confirmed)
  - قيد التنفيذ (Processing)
  - تم التحضير (Picked)
  - تم الشحن (Shipped)
  - تم التسليم (Delivered)
  - ملغي (Cancelled)
- 🔍 البحث برقم الطلب
- 🗂️ تصفية حسب التاريخ
- ✏️ تحديث حالة الطلب
- 🗑️ حذف الطلبات
- 📄 نظام ترقيم الصفحات (Pagination)

### 📦 إدارة المنتجات

- ➕ إضافة منتجات جديدة
- ✏️ تعديل المنتجات الموجودة
- 🗑️ حذف المنتجات
- 🔍 البحث عن المنتجات
- 📊 عرض الكروت (Grid View)
- 📄 نظام ترقيم الصفحات
- 🏷️ إدارة الفئات والألوان والمقاسات

### 👥 إدارة المشرفين

- 👤 عرض معلومات المشرف الحالي
- 📧 البريد الإلكتروني
- 📅 تاريخ التسجيل
- 📊 إحصائيات المشرفين

### 🎨 واجهة المستخدم

- 🎯 تصميم RTL كامل
- 🌐 واجهة عربية بالكامل
- 📱 تصميم متجاوب (Responsive)
- 🎭 شريط جانبي قابل للطي
- 🌈 ألوان وتدرجات حديثة
- ✨ رسوم متحركة سلسة
- 🔘 تفاعلات مستخدم محسّنة

---

## 🏗️ البنية المعمارية

### 📁 هيكل الملفات

\`\`\`
src/
├── pages/admin/
│ ├── Login.tsx # صفحة تسجيل الدخول
│ ├── Login.module.scss
│ ├── Dashboard.tsx # لوحة التحكم الرئيسية
│ ├── Dashboard.module.scss
│ ├── OrderManagement.tsx # إدارة الطلبات
│ ├── OrderManagement.module.scss
│ ├── ProductManagement.tsx # إدارة المنتجات
│ ├── ProductManagement.module.scss
│ ├── AdminManagement.tsx # إدارة المشرفين
│ └── AdminManagement.module.scss
│
├── components/admin/
│ ├── AdminLayout.tsx # Layout الرئيسي
│ ├── AdminLayout.module.scss
│ ├── ProtectedRoute.tsx # حماية المسارات
│ ├── ProductModal.tsx # نموذج إضافة/تعديل المنتج
│ └── ProductModal.module.scss
│
├── store/
│ ├── index.ts # Redux Store
│ ├── hooks.ts # Custom Hooks
│ └── slices/
│ ├── authSlice.ts # إدارة المصادقة
│ ├── ordersSlice.ts # إدارة الطلبات
│ └── productsSlice.ts # إدارة المنتجات
│
├── services/
│ └── api.ts # Axios API Service
│
└── types/
└── admin.types.ts # TypeScript Types
\`\`\`

### 🔧 التقنيات المستخدمة

- ⚛️ **React 19** - مكتبة الواجهات
- 📘 **TypeScript** - لغة البرمجة
- 🔄 **Redux Toolkit** - إدارة الحالة
- 🛣️ **React Router v7** - التوجيه
- 🎨 **SCSS Modules** - التنسيق
- 🌐 **Axios** - طلبات API
- ✅ **Zod** - التحقق من البيانات
- 🎯 **React Icons** - الأيقونات

---

## 🔌 تكامل API

### Base URL

\`\`\`
http://localhost:3000/api
\`\`\`

### Endpoints المستخدمة

#### Admin APIs

\`\`\`typescript
POST /admin/register # تسجيل مشرف جديد
POST /admin/login # تسجيل الدخول
GET /admin/profile # جلب معلومات المشرف
GET /admin/dashboard/stats # إحصائيات اللوحة
\`\`\`

#### Products APIs

\`\`\`typescript
GET /products # جلب جميع المنتجات
GET /products/:id # جلب منتج واحد
GET /products/categories # جلب الفئات
POST /products # إضافة منتج
PUT /products/:id # تحديث منتج
DELETE /products/:id # حذف منتج
\`\`\`

#### Orders APIs

\`\`\`typescript
GET /orders # جلب جميع الطلبات
GET /orders/:id # جلب طلب واحد
POST /orders # إنشاء طلب
PATCH /orders/:id/status # تحديث حالة الطلب
DELETE /orders/:id # حذف طلب
\`\`\`

### 🔐 المصادقة

يتم استخدام Bearer Token للمصادقة:

\`\`\`typescript
headers: {
'Authorization': 'Bearer <token>'
}
\`\`\`

التوكن يُحفظ في localStorage بعد تسجيل الدخول ويُرسل تلقائياً مع كل طلب.

---

## 🚀 كيفية الاستخدام

### 1️⃣ تسجيل الدخول

انتقل إلى:
\`\`\`
http://localhost:5173/admin/login
\`\`\`

استخدم بيانات الاعتماد:
\`\`\`
البريد الإلكتروني: admin@example.com
كلمة المرور: password123
\`\`\`

### 2️⃣ المسارات المتاحة

- 🏠 `/admin/dashboard` - لوحة التحكم الرئيسية
- 🛒 `/admin/orders` - إدارة الطلبات
- 📦 `/admin/products` - إدارة المنتجات
- 👥 `/admin/admins` - إدارة المشرفين
- 📊 `/admin/reports` - التقارير

### 3️⃣ الوظائف الرئيسية

#### إدارة الطلبات:

1. اختر تبويب حسب حالة الطلب
2. ابحث عن طلب برقمه
3. اضغط على حالة الطلب لتغييرها
4. استخدم القائمة (⋮) لعرض التفاصيل أو الحذف

#### إدارة المنتجات:

1. اضغط "إضافة منتج جديد"
2. املأ البيانات المطلوبة
3. احفظ المنتج
4. استخدم أزرار التعديل والحذف على الكروت

---

## 🎨 التصميم والألوان

### نظام الألوان

\`\`\`scss
// Primary Colors
$primary: #667eea;
$primary-dark: #764ba2;

// Status Colors
$pending: #f6ad55;
$confirmed: #3182ce;
$processing: #ed8936;
$picked: #9f7aea;
$shipped: #4299e1;
$delivered: #48bb78;
$cancelled: #e53e3e;

// Neutral Colors
$text-primary: #2d3748;
$text-secondary: #4a5568;
$text-muted: #718096;
$background: #f7fafc;
$border: #e2e8f0;
\`\`\`

### الخطوط

يستخدم التطبيق خطوط Cairo للعربية.

---

## 📱 التجاوبية

اللوحة متجاوبة بالكامل مع:

- 💻 **Desktop** (> 1024px) - عرض كامل
- 📱 **Tablet** (768px - 1024px) - تخطيط متكيف
- 📱 **Mobile** (< 768px) - قائمة جانبية منبثقة

### Breakpoints

\`\`\`scss
$mobile: 768px;
$tablet: 1024px;
$desktop: 1440px;
\`\`\`

---

## 🔒 الأمان

### الميزات الأمنية:

1. ✅ **Protected Routes** - حماية جميع مسارات الإدارة
2. ✅ **Token Validation** - التحقق من صلاحية التوكن
3. ✅ **Auto Logout** - تسجيل خروج تلقائي عند انتهاء الجلسة
4. ✅ **HTTPS Ready** - جاهز للاستخدام مع HTTPS

---

## 🧪 الاختبار

### اختبار تسجيل الدخول:

\`\`\`bash

# ابدأ الخادم

npm run dev

# افتح المتصفح

http://localhost:5173/admin/login

# سجل الدخول باستخدام:

Email: admin@example.com
Password: password123
\`\`\`

### اختبار الوظائف:

1. ✅ تسجيل الدخول
2. ✅ عرض لوحة التحكم
3. ✅ إدارة الطلبات (عرض، تصفية، تحديث الحالة)
4. ✅ إدارة المنتجات (إضافة، تعديل، حذف)
5. ✅ تسجيل الخروج

---

## 🐛 معالجة الأخطاء

### Response Interceptor

يتعامل التطبيق تلقائياً مع:

- ❌ **401 Unauthorized** - إعادة توجيه لصفحة تسجيل الدخول
- ❌ **Network Errors** - عرض رسالة خطأ
- ❌ **Validation Errors** - عرض الأخطاء في النماذج

---

## 📈 التحسينات المستقبلية

### مقترحات للتطوير:

1. 📊 **تقارير متقدمة** - charts و graphs
2. 📧 **إشعارات Email** - عند الطلبات الجديدة
3. 🔔 **إشعارات Push** - في الوقت الفعلي
4. 📸 **رفع الصور** - مباشرة للمنتجات
5. 🌍 **تعدد اللغات** - دعم الإنجليزية
6. 📱 **تطبيق Mobile** - React Native
7. 🔍 **بحث متقدم** - فلاتر أكثر
8. 📦 **تصدير البيانات** - Excel/PDF
9. 👥 **أدوار متعددة** - Admin, Manager, Editor
10. 📈 **تحليلات متقدمة** - Google Analytics

---

## 🤝 المساهمة

إذا كنت ترغب في المساهمة في تطوير اللوحة:

1. Fork المشروع
2. أنشئ فرع جديد (\`git checkout -b feature/amazing-feature\`)
3. Commit التغييرات (\`git commit -m 'Add amazing feature'\`)
4. Push للفرع (\`git push origin feature/amazing-feature\`)
5. افتح Pull Request

---

## 📞 الدعم

إذا واجهت أي مشاكل أو لديك استفسارات:

- 📧 Email: support@osara.com
- 💬 Discord: [Join Server]
- 📱 Twitter: @osara_store

---

## 📄 الترخيص

© 2025 OSARA. جميع الحقوق محفوظة.

---

## 🎉 شكراً

تم بناء هذه اللوحة باستخدام أحدث التقنيات وأفضل الممارسات لتوفير تجربة إدارة سلسة وفعالة.

**صُنع بـ ❤️ في مصر**
