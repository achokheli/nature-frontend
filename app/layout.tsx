import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProjectProvider } from '@/contexts/ProjectContext';
import SessionProvider from '@/components/providers/SessionProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nature Frontend - Impact Investment Platform',
  description: 'A modern impact investment platform for environmental projects',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProvider>
          <AuthProvider>
            <ProjectProvider>
              {children}
            </ProjectProvider>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
