import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { PropsWithChildren } from "react"
import { Crimson_Text } from 'next/font/google'

import './globals.css'
import './typography2.css'
import styles from './layout.module.css'

const crimsonText = Crimson_Text({subsets: ['latin'], weight: '400'})

export const metadata: Metadata = {
  title: {
    template: '%s | Julian Haeger',
    default: 'Home'
  },
  viewport: "width=device-width, initial-scale=1"
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
