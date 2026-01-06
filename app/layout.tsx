import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProjectProvider } from '@/contexts/ProjectContext';
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
        <AuthProvider>
          <ProjectProvider>
            {children}
          </ProjectProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
