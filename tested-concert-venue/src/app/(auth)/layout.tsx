'use client';
 
import { useSession, SessionProvider } from 'next-auth/react';
 
export default function AuthLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  const session = useSession();
  console.log({session})
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}