import React from 'react'
import Link from 'next/link'
import { Metadata, Viewport } from 'next'
import { PropsWithChildren } from "react"
import { Crimson_Text } from 'next/font/google'
import { siteOrigin } from 'lib/hostname'

import './globals.css'
import './typography2.css'
import styles from './layout.module.css'

const crimsonText = Crimson_Text({subsets: ['latin'], weight: '400'})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    template: '%s | Julian Haeger',
    default: 'Julian Haeger'
  },
  description: 'Blog of Julian Haeger — Writing about software engineering, technology, and anything else I fancy',
  openGraph: {
    siteName: 'Julian Haeger',
    type: 'website',
    images: [`${siteOrigin}/profile-pic.jpg`],
  },
  twitter: {
    card: 'summary',
    images: [`${siteOrigin}/profile-pic.jpg`],
  },
}


function RootLayout({children}: PropsWithChildren<{}>){
  return (
    <html lang="en" className={crimsonText.className}>
      <body>
        <header className={`${styles.banner} raised`}>
          <div className={styles.bannerContent}>
            <h1><Link href="/">Julian Haeger</Link></h1>
            <nav>
              <ul>
                <li>
                  <Link href="/posts">Blog</Link>
                </li>
                <li>
                  <Link href="/short-posts">Short Posts</Link>
                </li>
                <li>
                  <Link href="https://github.com/foo42">Github</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>)
  }

export default RootLayout
