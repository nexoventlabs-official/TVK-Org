# P. Venkataramanan Official Website

Official website for P. Venkataramanan - MLA Mylapore, School Education Minister Tamil Nadu, and TVK Party Treasurer.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- MongoDB Atlas account
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd p.-venkatraman-official-main
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   bun run dev
   # or
   npm run dev
   ```

   The site will be available at `http://localhost:8080`

### Backend Setup

The backend server is located in the `backend/` folder.

1. **Navigate to backend**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB and Cloudinary credentials
   ```

4. **Start backend server**
   ```bash
   npm run dev
   ```

   Backend will run on `http://localhost:5050`

### Admin Panel Setup

The admin panel is located in the `admin/` folder.

1. **Navigate to admin**
   ```bash
   cd admin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with backend URL
   ```

4. **Start admin panel**
   ```bash
   npm run dev
   ```

   Admin panel will be available at `http://localhost:5174`

## 📁 Project Structure

```
p.-venkatraman-official-main/
├── admin/                     # Admin panel (React + Vite)
│   ├── src/
│   ├── package.json
│   └── README.md
├── backend/                   # Backend API (Node.js + Express)
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── package.json
│   └── README.md
├── docs/                      # Documentation
│   ├── setup/                 # Setup guides
│   ├── development/           # Development docs
│   ├── deployment/            # Deployment guides
│   ├── audits/                # Audit reports
│   └── screenshots/           # Screenshots
├── public/                    # Static assets
├── scripts/                   # Build/deployment scripts
├── src/                       # Frontend source (React + Vite)
│   ├── assets/                # Images, icons
│   ├── components/
│   │   ├── site/              # Site-specific components
│   │   └── ui/                # Reusable UI components (Shadcn)
│   ├── config/                # App configuration
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities
│   ├── routes/                # Page routes (TanStack Router)
│   ├── types/                 # TypeScript types
│   └── utils/                 # Helper functions
├── tests/                     # Test files
│   ├── unit/                  # Unit tests
│   ├── integration/           # Integration tests
│   └── e2e/                   # End-to-end tests
└── .env.example               # Environment variables template
```

## 🎨 Tech Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Routing:** TanStack Router
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **Animations:** Framer Motion
- **Forms:** React Hook Form
- **Package Manager:** Bun

### Backend
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB Atlas
- **Image Storage:** Cloudinary
- **Authentication:** JWT

## 🔧 Available Scripts

```bash
# Development
bun run dev          # Start dev server (port 8080)

# Build
bun run build        # Build for production

# Preview
bun run preview      # Preview production build

# Linting
bun run lint         # Run ESLint
```

## 🎯 Key Features

### Public Website
- Hero section with dynamic image loading
- Gallery with Cloudinary integration
- Three enquiry forms (TVK, Assembly, Education)
- News section
- About page
- Responsive design (mobile-first)

### Admin Panel
- Dashboard with analytics
- Photo management (upload/delete)
- Enquiry management
- Message templates
- Secure authentication

## 🌈 Color System

The website uses a strategic color system:

- **TVK Red** (`#8B0000`) - Primary brand color
- **TVK Yellow** (`#FFCC00`) - Accent color
- **Assembly Blue** (`#1D4ED8`) - Government work
- **Education Green** (`#15803D`) - Ministry work

See `docs/audits/color-strategy-audit.md` for details.

## 📱 Responsive Design

Fully responsive across all devices:
- Desktop (1024px+)
- Tablet (768px - 1024px)
- Mobile (480px - 768px)
- Small Mobile (<480px)

See `docs/development/responsive-design-updates.md` for details.

## 🔐 Environment Variables

Required environment variables:

```env
# Frontend
VITE_API_URL=http://localhost:5050

# Backend (in backend/.env)
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 📚 Documentation

- **Setup Guides:** `docs/setup/`
  - MongoDB Setup
  - Cloudinary Setup
  - Admin Panel Guide
  
- **Development:** `docs/development/`
  - Responsive Design
  - Image Management
  - Testing Backend

- **Audits:** `docs/audits/`
  - Comprehensive Audit
  - Color Strategy
  - Project Organization

## 🚀 Deployment

### Frontend Deployment
The frontend can be deployed to:
- Vercel
- Netlify
- Cloudflare Pages

### Backend Deployment
The backend can be deployed to:
- Railway
- Render
- Heroku
- AWS/GCP/Azure

See `docs/deployment/` for detailed guides.

## 🧪 Testing

```bash
# Run unit tests
bun test

# Run integration tests
bun test:integration

# Run e2e tests
bun test:e2e
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 👥 Team

- **Developer:** [Your Name]
- **Client:** Office of P. Venkataramanan

## 📞 Support

For support, email: [support-email]

## 🎉 Acknowledgments

- TVK Party for branding guidelines
- Shadcn UI for component library
- Cloudinary for image management
- MongoDB Atlas for database hosting

---

**Built with ❤️ for the people of Mylapore**
