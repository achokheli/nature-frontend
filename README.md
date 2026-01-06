# Nature Frontend - Next.js + TypeScript

A modern impact investment platform built with Next.js 16, TypeScript, and Tailwind CSS.

## 🚀 Migration from React + Vite

This project has been migrated from React + Vite to Next.js with TypeScript, maintaining all functionality while adding:
- Strong TypeScript typing throughout
- Next.js App Router for better performance
- Server and Client Components
- Improved SEO capabilities
- Better code organization with TypeScript interfaces

## 📦 Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript 5** - Static type checking
- **Tailwind CSS 4** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Zustand** - State management (if needed for complex state)
- **React Context** - For authentication and project state

## 🏗️ Project Structure

```
nature-frontend-next/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page (landing)
│   ├── globals.css          # Global styles and Tailwind config
│   └── projects/
│       ├── page.tsx         # Projects list page
│       └── [id]/
│           └── page.tsx     # Project detail page (dynamic route)
│
├── components/
│   ├── common/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── LoadingSpinner.tsx
│   ├── layout/              # Layout components
│   │   ├── ExploreHeader.tsx
│   │   └── ExploreFooter.tsx
│   ├── ui/                  # Feature-specific components
│   │   ├── ExploreProjectsCard.tsx
│   │   ├── RewardCard.tsx
│   │   ├── VideoLightbox.tsx
│   │   └── FilterDropdown.tsx
│   └── pages/               # Page-level components
│       ├── ExploreProjectsPage.tsx
│       └── ProjectDetailPage.tsx
│
├── contexts/                # React Context providers
│   ├── AuthContext.tsx
│   └── ProjectContext.tsx
│
├── lib/                     # Library code
│   └── api/                 # API layer
│       ├── config.ts        # Axios configuration
│       ├── auth.ts          # Authentication API
│       └── projects.ts      # Projects API
│
├── hooks/                   # Custom React hooks (future use)
│
├── types/                   # TypeScript type definitions
│   └── index.ts            # All type definitions
│
├── utils/                   # Utility functions
│   ├── helpers.ts          # Helper functions
│   ├── constants.ts        # Constants and routes
│   └── mockData.ts         # Mock data for testing
│
└── public/                  # Static files
```

## 🛠️ Setup and Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
   NEXT_PUBLIC_APP_NAME=Nature Frontend
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## 📋 Key Features

### Components 3.1.1 and 4.1.1

This project implements:
- **Component 3.1.1**: Explore Projects Page (navbar, hero, filters, project cards grid, footer)
- **Component 4.1.1**: Project Detail Page (navbar, hero with video, overview bar, two-column layout)

All components are:
- ✅ Fully typed with TypeScript
- ✅ Independent and reusable
- ✅ All data passed via props
- ✅ Client-side rendering where needed
- ✅ Server components where possible

### Type Safety

Strong typing throughout:
- Interface definitions for all data models
- Typed props for all components
- Typed API responses
- Typed context providers

### Mock Data

The application includes mock data for visual testing while the backend is not available. Mock data automatically switches to real backend data when available.

## 🎨 Styling

Tailwind CSS 4 with custom theme:
- Primary color: Orange (#FF6B35)
- Secondary color: Yellow (#F7B801)
- Dark backgrounds: #1A1A1A, #2D2D2D, #3A3A3A

All colors are defined in `app/globals.css` using CSS custom properties.

## 🔐 Authentication

JWT-based authentication with:
- Login/Signup flows
- Protected routes
- Role-based access control (admin vs user)
- Token refresh handling

## 📡 API Integration

All API calls centralized in `lib/api/`:
- Automatic token injection via Axios interceptors
- Error handling and 401 redirects
- TypeScript interfaces for requests/responses

## 🔄 State Management

- **AuthContext**: Authentication state
- **ProjectContext**: Projects state
- Local storage for persistence
- React Context with TypeScript

## 🚦 Routes

- `/` - Landing page
- `/projects` - Projects list
- `/projects/[id]` - Project detail
- `/auth/login` - Login page (to be implemented)
- `/auth/signup` - Signup page (to be implemented)
- `/profile` - User profile (to be implemented)
- `/invest/[step]` - Investment flow (to be implemented)

## 🎯 Future Integration

### Payment System
- Reward pledge handlers already in place
- Easy integration via `onRewardPledgeClick` prop
- Structured for Stripe/payment gateway integration

### Additional Pages
Additional pages can be easily added following the established patterns:
- Authentication pages (`app/auth/login`, `app/auth/signup`)
- Profile pages (`app/profile/page.tsx`)
- Investment flow (`app/invest/[step]/page.tsx`)

## 📝 TypeScript Best Practices

This codebase follows TypeScript best practices:
1. **Strong typing**: No `any` types except where absolutely necessary
2. **Interface over Type**: Using interfaces for object shapes
3. **Proper generics**: Typed API responses with `ApiResponse<T>`
4. **Const assertions**: Using `as const` for constants
5. **Type inference**: Leveraging TypeScript's type inference
6. **Null safety**: Proper handling of nullable values

## 🔧 Development

### Adding New Components

1. Define TypeScript interface in `types/index.ts`
2. Create component in appropriate directory
3. Use proper prop types
4. Add 'use client' directive if using React hooks or browser APIs

### Adding New Pages

1. Create file in `app/` directory following Next.js routing conventions
2. Use TypeScript for type safety
3. Integrate with existing contexts/providers
4. Follow established patterns

## 🧪 Testing (Future)

Ready for testing integration:
- Jest and React Testing Library
- Playwright for E2E tests
- Type checking via TypeScript compiler

## 📄 License

Private - All rights reserved
