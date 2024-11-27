'use client'

import { Provider } from "@components/ui/provider"
import Layout from "@components/_common/Layout"
import { SessionProvider } from "next-auth/react"

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <SessionProvider>
            <Layout>
              <>
                {children}
              </>
            </Layout>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  )
}