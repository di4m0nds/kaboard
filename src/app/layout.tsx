import type { Metadata } from 'next'
import './globals.css'

import { inter } from './fonts'
import { Providers } from './providers'
import Head from 'next/head'

export const metadata: Metadata = {
  title: 'Kaboard',
  description: 'Kaboard is an intuitive Kanban Board application designed to streamline task management and enhance productivity. With its user-friendly interface and flexible organization features, Kaboard empowers teams and individuals to efficiently manage tasks, and track progress.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${ inter.className }`}
      suppressHydrationWarning
    >
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content={`${metadata.description}`} />
        <meta name="keywords" content="kanban, board" />
        <meta name="author" content="@di4m0nds" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta property="og:title" content={`${metadata.title}`} />
        <meta property="og:description" content={`${metadata.description}`} />
        <meta property="og:image" content="/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:site" content="@javslvt" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#000" />
        <title>{`${metadata.title}`}</title>
      </Head>
      <body className="dark:bg-black">
        <Providers>
          { children }
        </Providers>
      </body>
    </html>
  )
}
