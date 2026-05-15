# Backend Integration Plan

## 📋 Overview

The reference backend (`tvkgallery-main/backend`) is a **complete Express.js + MongoDB API** that handles:
- ✅ Enquiry form submissions with validation
- ✅ WhatsApp confirmations via Meta Cloud API
- ✅ Admin panel authentication (JWT)
- ✅ Dashboard analytics
- ✅ Image management via Cloudinary
- ✅ Rate limiting and security

## 🏗️ Architecture Comparison

### Current Project (Your Site)
- **Frontend**: TanStack Start (React SSR)
- **Deployment**: Cloudflare Workers
- **Backend**: ❌ **MISSING** - Forms submit to non-existent `/api/enquiry`

### Reference Project (tvkgallery)
- **Frontend**: React + Vite (SPA)
- **Backend**: Express.js + MongoDB (separate server)
- **Deployment**: Vercel (frontend) + separate backend hosting
- **Features**: Full CRUD, WhatsApp integration, admin panel

---

## 🎯 Integration Options

### **Option 1: Use the Reference Backend As-Is** ⭐ **RECOMMENDED**
**Pros:**
- ✅ Already built and tested
- ✅ Complete feature set (enquiries, admin, WhatsApp)
- ✅ MongoDB for data persistence
- ✅ Admin panel included
- ✅ Can be deployed separately

**Cons:**
- ⚠️ Requires separate backend hosting (Railway, Render, Fly.io)
- ⚠️ Need MongoDB Atlas account
- ⚠️ Need Meta WhatsApp Business API setup

**Time to Deploy:** 2-3 hours

---

### **Option 2: Adapt Backend for Cloudflare Workers**
**Pros:**
- ✅ Single deployment (frontend + backend together)
- ✅ Use Cloudflare D1 (SQLite) or KV storage

**Cons:**
- ⚠️ Requires rewriting Express routes to Cloudflare Workers format
- ⚠️ Need to replace Mongoose with D1 ORM
- ⚠️ More complex setup

**Time to Deploy:** 6-8 hours

---

### **Option 3: Quick Fix - Use Formspree/EmailJS**
**Pros:**
- ✅ Fastest solution (30 minutes)
- ✅ No backend coding needed
- ✅ Email notifications work immediately

**Cons:**
- ⚠️ No database storage
- ⚠️ No admin panel
- ⚠️ No WhatsApp integration
- ⚠️ Limited customization

**Time to Deploy:** 30 minutes

---

## 🚀 RECOMMENDED APPROACH: Option 1

### Step-by-Step Implementation

#### **Phase 1: Set Up Backend (1 hour)**

1. **Create MongoDB Database**
   ```bash
   # Sign up at https://www.mongodb.com/cloud/atlas
   # Create free cluster
   # Get connection string
   ```

2. **Configure Backend Environment**
   ```bash
   cd "D:\MLA Mylapore\p.-venkatraman-official-main\Back end reference\tvkgallery-main\backend"
   
   # Copy and edit .env
   cp .env.example .env
   ```

   Edit `.env`:
   ```env
   PORT=5050
   NODE_ENV=development
   CORS_ORIGINS=http://localhost:8080,https://yourdomain.com
   
   MONGODB_URI=mongodb+srv://YOUR_CONNECTION_STRING
   
   JWT_SECRET=your_random_secret_here
   JWT_EXPIRES_IN=7d
   DEFAULT_ADMIN_EMAIL=admin@venkatraman.in
   DEFAULT_ADMIN_PASSWORD=ChangeThisPassword123!
   
   # Optional: WhatsApp (can skip for now)
   META_APP_ID=
   META_PHONE_NUMBER_ID=
   META_ACCESS_TOKEN=
   ```

3. **Install and Start Backend**
   ```bash
   npm install
   npm run seed    # Creates admin user + templates
   npm run dev     # Starts on http://localhost:5050
   ```

#### **Phase 2: Update Frontend to Use Backend (30 minutes)**

1. **Update EnquiryForm.tsx**
   
   Current code (line 115-118):
   ```typescript
   fetch("/api/enquiry", { 
     method: "POST", 
     body: JSON.stringify({ variant, ...form }) 
   }).catch(() => {});
   ```

   **Change to:**
   ```typescript
   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5050';
   
   fetch(`${BACKEND_URL}/api/public/enquiries`, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       category: variant, // 'party', 'assembly', or 'education'
       name: form.name,
       mobile: form.mobile,
       email: form.email || '',
       request: form.request
     })
   })
   .then(res => res.json())
   .then(data => {
     if (data.ok) {
       console.log('Enquiry submitted:', data.id);
     } else if (data.error === 'already_submitted') {
       alert('You have already submitted an enquiry for this category.');
     }
   })
   .catch(err => {
     console.error('Submission failed:', err);
   });
   ```

2. **Create Environment File**
   ```bash
   # In your main project root
   echo VITE_BACKEND_URL=http://localhost:5050 > .env.local
   ```

   For production:
   ```env
   VITE_BACKEND_URL=https://your-backend.railway.app
   ```

#### **Phase 3: Deploy Backend (1 hour)**

**Option A: Railway.app** (Recommended - Free tier available)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
cd backend
railway login
railway init
railway up
railway variables set MONGODB_URI="your_connection_string"
railway variables set JWT_SECRET="your_secret"
# ... set other env vars
```

**Option B: Render.com** (Free tier)
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repo (or upload backend folder)
4. Set environment variables
5. Deploy

**Option C: Fly.io**
```bash
# Install flyctl
cd backend
fly launch
fly secrets set MONGODB_URI="your_connection_string"
fly deploy
```

#### **Phase 4: Update Frontend for Production**

1. Update `.env` with production backend URL
2. Rebuild frontend:
   ```bash
   bun run build
   ```
3. Deploy to Cloudflare Pages

---

## 📊 Backend API Reference

### Public Endpoint (Used by Your Site)

**POST** `/api/public/enquiries`

**Request Body:**
```json
{
  "category": "party" | "assembly" | "education",
  "name": "John Doe",
  "mobile": "9876543210",
  "email": "john@example.com",
  "request": "I need help with..."
}
```

**Success Response (201):**
```json
{
  "ok": true,
  "id": "507f1f77bcf86cd799439011",
  "category": "party",
  "createdAt": "2026-05-15T10:30:00.000Z"
}
```

**Error Response (409 - Duplicate):**
```json
{
  "ok": false,
  "error": "already_submitted",
  "message": "You have already submitted an enquiry under this category.",
  "category": "party",
  "submittedAt": "2026-05-14T15:20:00.000Z"
}
```

**Validation:**
- ✅ Rate limited: 20 requests per minute per IP
- ✅ Mobile format validation
- ✅ Email format validation (optional field)
- ✅ Duplicate prevention (one submission per category per mobile)
- ✅ Stores IP and User-Agent for spam prevention

---

## 🔐 Admin Panel Features

The reference backend includes a complete admin panel at `/admin`:

- **Dashboard**: Analytics, status breakdown, daily timeline
- **Enquiries**: Kanban board (New → In Progress → Resolved)
- **Templates**: Manage WhatsApp confirmation messages
- **Images**: Upload site images via Cloudinary

**Admin Login:**
- URL: `http://localhost:5174` (when running admin)
- Default: `admin@venkatraman.in` / `admin@123`

---

## 📱 WhatsApp Integration (Optional)

The backend supports automatic WhatsApp confirmations via Meta Cloud API.

**Setup Steps:**
1. Create Meta Business Account
2. Set up WhatsApp Business API
3. Create message templates
4. Add credentials to `.env`:
   ```env
   META_APP_ID=your_app_id
   META_PHONE_NUMBER_ID=your_phone_id
   META_ACCESS_TOKEN=your_token
   ```

**How it works:**
- User submits enquiry → Saved to DB
- Backend sends WhatsApp confirmation automatically
- Uses approved templates or 24-hour window for free-form messages
- Tracks delivery status in database

**Can skip for MVP** - Forms will work without WhatsApp

---

## ✅ Testing Checklist

### Local Testing
- [ ] Backend starts without errors (`npm run dev`)
- [ ] MongoDB connection successful
- [ ] Frontend can reach backend (check CORS)
- [ ] Form submission works
- [ ] Duplicate submission blocked
- [ ] Validation errors shown correctly

### Production Testing
- [ ] Backend deployed and accessible
- [ ] Environment variables set correctly
- [ ] Frontend points to production backend URL
- [ ] CORS allows production domain
- [ ] SSL/HTTPS working
- [ ] Rate limiting active
- [ ] Admin panel accessible

---

## 🎯 Quick Start Commands

```bash
# Terminal 1: Start Backend
cd "D:\MLA Mylapore\p.-venkatraman-official-main\Back end reference\tvkgallery-main\backend"
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run seed
npm run dev

# Terminal 2: Start Frontend (already running)
# Your dev server is already at http://localhost:8080

# Test the integration
# Open http://localhost:8080
# Fill out an enquiry form
# Check backend terminal for logs
```

---

## 💰 Cost Estimate

| Service | Free Tier | Paid (if needed) |
|---------|-----------|------------------|
| MongoDB Atlas | 512MB free | $9/month (2GB) |
| Railway.app | $5 credit/month | $5/month usage-based |
| Render.com | 750 hours/month free | $7/month |
| Cloudflare Pages | Unlimited | Free |
| Meta WhatsApp | 1000 messages/month free | $0.005-0.09/message |

**Total for MVP:** $0-5/month (using free tiers)

---

## 🚨 Important Notes

1. **Category Mapping**: Your forms use `variant` prop, backend expects `category`:
   - `variant="kalagam"` → `category="party"`
   - `variant="assembly"` → `category="assembly"`
   - `variant="education"` → `category="education"`

2. **CORS Configuration**: Backend must allow your frontend domain

3. **Environment Variables**: Never commit `.env` files to Git

4. **Security**: Change default admin password before production

---

## 📞 Next Steps

1. **Immediate (30 min)**: Set up MongoDB Atlas account
2. **Today (2 hours)**: Get backend running locally and test integration
3. **This week**: Deploy backend to Railway/Render
4. **Optional**: Set up WhatsApp Business API

Would you like me to help you with any of these steps?
