# Migration Guide: React + Vite → Next.js + TypeScript

## Overview

This document outlines the migration from the React + Vite codebase to Next.js 16 with TypeScript.

## Key Changes

### 1. Routing

**Before (React Router):**
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

<Link to="/projects">Projects</Link>
const navigate = useNavigate();
navigate('/projects');
```

**After (Next.js App Router):**
```tsx
import Link from 'next/link';
import { useRouter } from 'next/navigation';

<Link href="/projects">Projects</Link>
const router = useRouter();
router.push('/projects');
```

### 2. File Structure

**Before:**
- `src/pages/` - Page components
- `src/components/` - Reusable components
- `src/context/` - Context providers
- `src/App.jsx` - Main app with routing

**After:**
- `app/` - Next.js App Router pages
- `components/` - Reusable components (same structure)
- `contexts/` - Context providers
- `app/layout.tsx` - Root layout with providers

### 3. TypeScript Integration

All files migrated to TypeScript with:
- Strong typing throughout
- Interfaces defined in `types/index.ts`
- Proper generics for API responses
- Type-safe props for all components

### 4. Client vs Server Components

**Client Components** (with 'use client'):
- Components using React hooks
- Components using browser APIs (localStorage)
- Event handlers
- Context providers and consumers

**Server Components** (default):
- Static content
- No hooks needed
- Better performance

### 5. Context Providers

Context providers now use 'use client' directive:

```tsx
'use client';

import { createContext, useContext } from 'react';
// ... rest of context
```

### 6. API Layer

API layer remains similar but with TypeScript:
- Defined return types
- Type-safe requests/responses
- Proper error handling

### 7. Environment Variables

**Before:** `.env` files
**After:** `.env.local` with `NEXT_PUBLIC_` prefix for client-side variables

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### 8. Styling

Tailwind CSS v4 with new syntax:
- `@import "tailwindcss"` instead of `@tailwind` directives
- `@theme` block for custom theme
- CSS custom properties for colors

## Component Mapping

| React Component | Next.js Component | Location |
|----------------|-------------------|----------|
| `src/components/common/Button.jsx` | `components/common/Button.tsx` | Same |
| `src/components/common/Input.jsx` | `components/common/Input.tsx` | Same |
| `src/pages/Landing.jsx` | `app/page.tsx` | App Router |
| `src/pages/projects/ProjectsList.jsx` | `app/projects/page.tsx` | App Router |
| `src/pages/projects/ProjectDetail.jsx` | `app/projects/[id]/page.tsx` | Dynamic Route |
| `src/context/AuthContext.jsx` | `contexts/AuthContext.tsx` | Same |
| `src/api/config.js` | `lib/api/config.ts` | Renamed lib |

## Breaking Changes

### 1. No More `<Outlet />`

React Router's `<Outlet />` for nested routes is replaced with Next.js layouts and parallel routes if needed.

### 2. Link Component

- `<Link to="/path">` → `<Link href="/path">`
- No need for wrapping `<a>` tags

### 3. Navigation

- `useNavigate()` → `useRouter()` from 'next/navigation'
- `navigate('/path')` → `router.push('/path')`
- `useLocation()` → `usePathname()` from 'next/navigation'

### 4. Image Optimization

Can use Next.js `<Image />` component for optimization:

```tsx
import Image from 'next/image';

<Image src="/path" alt="..." width={800} height={600} />
```

## Migration Checklist

- [x] Create Next.js project with TypeScript
- [x] Define all TypeScript interfaces
- [x] Migrate common components
- [x] Migrate layout components
- [x] Migrate UI components
- [x] Migrate page components
- [x] Convert React Router to App Router
- [x] Migrate context providers
- [x] Migrate API layer
- [x] Configure Tailwind CSS v4
- [x] Update environment variables
- [x] Build successfully

## Testing the Migration

1. **Start development server:**
   ```bash
   cd nature-frontend-next
   npm run dev
   ```

2. **Test routes:**
   - http://localhost:3000 (Landing page)
   - http://localhost:3000/projects (Projects list)
   - http://localhost:3000/projects/1 (Project detail)

3. **Verify functionality:**
   - Navbar overlays background image ✓
   - Mock data displays correctly ✓
   - Navigation works ✓
   - Search functionality works ✓
   - Project cards display ✓

## Next Steps

Additional pages to implement (following the same patterns):

1. **Authentication pages:**
   - `app/auth/login/page.tsx`
   - `app/auth/signup/page.tsx`

2. **Profile pages:**
   - `app/profile/page.tsx`
   - `app/profile/investments/page.tsx`
   - `app/profile/campaigns/page.tsx`

3. **Investment flow:**
   - `app/invest/[step]/page.tsx`

4. **Admin pages:**
   - `app/project/create/page.tsx`

All pages should follow the established TypeScript patterns with proper types and interfaces.

## Benefits of Migration

1. **Type Safety**: Catch errors at compile time
2. **Better DX**: Autocomplete and IntelliSense
3. **Performance**: Next.js optimization and Turbopack
4. **SEO**: Server-side rendering capabilities
5. **Maintainability**: Cleaner code with TypeScript
6. **Scalability**: Better architecture for future growth
