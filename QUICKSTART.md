# Quick Start Guide

## Getting Started

### 1. Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_APP_NAME=Nature Frontend
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## Available Routes

- **Landing Page**: http://localhost:3000
- **Projects List**: http://localhost:3000/projects
- **Project Detail**: http://localhost:3000/projects/1 (or /2, /3)

## Mock Data

The application includes 3 mock projects for visual testing:
1. Ocean Cleanup Initiative
2. Renewable Energy Expansion
3. Sustainable Agriculture Program

These display automatically when the backend is not available.

## Features

✅ **Navbar overlaid on background image** - Both landing and projects pages
✅ **Component 3.1.1** - Explore Projects Page (fully functional)
✅ **Component 4.1.1** - Project Detail Page (fully functional)
✅ **TypeScript** - Strong typing throughout
✅ **Mock data** - Displays when backend unavailable
✅ **Search** - Filter projects by name/description
✅ **Responsive** - Works on desktop (mobile can be added)

## Project Structure

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx            # Landing page
├── globals.css         # Tailwind config
└── projects/
    ├── page.tsx        # Projects list
    └── [id]/
        └── page.tsx    # Project detail (dynamic)

components/
├── common/             # Button, Input, etc.
├── layout/             # Header, Footer
├── ui/                 # Cards, Lightbox, etc.
└── pages/              # Page-level components

contexts/               # Auth & Project contexts
lib/api/                # API layer with Axios
types/                  # TypeScript definitions
utils/                  # Helpers, constants, mock data
```

## TypeScript

All components are strongly typed. See `types/index.ts` for all interface definitions.

## Next Steps

1. Implement authentication pages (`app/auth/login/page.tsx`)
2. Implement profile pages (`app/profile/page.tsx`)
3. Implement investment flow (`app/invest/[step]/page.tsx`)
4. Connect to real backend API
5. Add tests

## Troubleshooting

### Build Errors

```bash
npm run build
```

If you see TypeScript errors, check:
- All imports use `@/` alias
- Props are properly typed
- 'use client' directive is added where needed

### Runtime Errors

Check browser console and server logs:
```bash
npm run dev
```

## Support

For issues or questions, refer to:
- `README.md` - Full documentation
- `MIGRATION_GUIDE.md` - Migration details
- `COMPONENTS_3.1.1_4.1.1.md` - Component documentation
