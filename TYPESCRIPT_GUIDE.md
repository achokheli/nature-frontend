# TypeScript Guide

## Overview

This project uses TypeScript 5 with strict type checking for maximum type safety and developer experience.

## Type Definitions

All type definitions are centralized in `types/index.ts`. This includes:

### Core Data Models

```typescript
import { User, Project, Reward, Investment } from '@/types';
```

- **User**: User account information
- **Project**: Project data with all fields
- **Reward**: Reward/pledge tier information
- **Investment**: User investment records

### Component Props

All component props are strongly typed:

```typescript
import { ButtonProps, InputProps, HeaderProps } from '@/types';

const MyButton: React.FC<ButtonProps> = ({ variant, size, children }) => {
  // TypeScript knows all available props and their types
};
```

### API Responses

API responses use generic types:

```typescript
interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Usage
const response = await api.get<ApiResponse<Project[]>>('/projects');
// response.data.data is typed as Project[]
```

## Best Practices Used

### 1. Interface Over Type

We use `interface` for object shapes:

```typescript
// Good ✓
export interface User {
  id: string;
  name: string;
}

// Avoid ✗
export type User = {
  id: string;
  name: string;
};
```

### 2. Const Assertions

For constants and enums:

```typescript
export const ROUTES = {
  HOME: '/',
  PROJECTS: '/projects',
} as const;
```

### 3. Proper Null Handling

Always handle nullable values:

```typescript
const userName = user?.name || 'Guest';
const projectId = project.id || project._id || '';
```

### 4. Type Guards

For runtime type checking:

```typescript
if (user && user.role === 'admin') {
  // TypeScript knows user is not null here
}
```

### 5. Generic Functions

Helper functions with proper types:

```typescript
export const calculateProgress = (raised: number, target: number): number => {
  if (!target || target === 0) return 0;
  return Math.min(Math.round((raised / target) * 100), 100);
};
```

### 6. React Component Typing

All components use `React.FC<Props>`:

```typescript
interface MyComponentProps {
  title: string;
  count: number;
  onUpdate?: (count: number) => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, count, onUpdate }) => {
  // Component implementation
};
```

### 7. Event Handlers

Properly typed event handlers:

```typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(e.target.value);
};

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  // ...
};
```

## Common Patterns

### Component with Props

```typescript
import React from 'react';

interface MyComponentProps {
  title: string;
  subtitle?: string; // Optional prop
  items: string[];   // Required array
  onItemClick?: (item: string) => void; // Optional callback
  className?: string;
}

const MyComponent: React.FC<MyComponentProps> = ({
  title,
  subtitle,
  items,
  onItemClick,
  className = '', // Default value
}) => {
  return (
    <div className={className}>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
      {items.map((item, index) => (
        <div 
          key={index}
          onClick={() => onItemClick?.(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
```

### Client Component with State

```typescript
'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
}

export default function MyForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // formData is fully typed
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### API Call with Types

```typescript
import { Project, ApiResponse } from '@/types';
import api from '@/lib/api/config';

export const getProject = async (id: string): Promise<Project> => {
  const response = await api.get<ApiResponse<Project>>(`/projects/${id}`);
  return response.data.data;
};
```

### Context with Types

```typescript
'use client';

import { createContext, useContext, useState } from 'react';

interface MyContextType {
  count: number;
  increment: () => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [count, setCount] = useState(0);
  
  const value: MyContextType = {
    count,
    increment: () => setCount(c => c + 1),
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
};
```

## IDE Integration

### VS Code

TypeScript is fully integrated with VS Code:
- Autocomplete for props
- Inline type hints
- Error checking in real-time
- Go to definition
- Refactoring support

### Type Checking

Run type check without building:

```bash
npx tsc --noEmit
```

## Troubleshooting

### Common Errors

**Error: Cannot find module '@/...'**
- Check `tsconfig.json` has proper path mapping
- Ensure import uses `@/` prefix

**Error: 'X' is possibly null**
- Use optional chaining: `user?.name`
- Provide default: `user?.name || 'Default'`
- Type guard: `if (user) { user.name }`

**Error: Type 'X' is not assignable to type 'Y'**
- Check interface definitions in `types/index.ts`
- Ensure proper type casting if needed
- Use `as` for type assertion (carefully)

## Adding New Types

1. Add to `types/index.ts`
2. Export properly
3. Import where needed: `import { MyType } from '@/types';`

```typescript
// types/index.ts
export interface MyNewType {
  id: string;
  name: string;
}

// component.tsx
import { MyNewType } from '@/types';

const MyComponent: React.FC<{ data: MyNewType }> = ({ data }) => {
  // ...
};
```

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Next.js TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
