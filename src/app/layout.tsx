import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { PropsWithChildren } from "react"

import './globals.css'
import './typography2.css'
import styles from './layout.module.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Julian Haeger',
    default: 'Home'
  },
  viewport: "width=device-width, initial-scale=1"
}


function RootLayout({children}: PropsWithChildren<{}>){
  return (
    <html lang="en">
      <body>
        <header className="page-header">
          <div className={styles.banner}>
            <h1><Link href="/">Julian Haeger</Link></h1>
            <nav>
              <ul style={{display: 'flex', flexDirection: 'row', listStyleType: 'none', gap: '1rem'}}>
                <li>
                  Some Link
                </li>
                <li>
                  Another Link
                </li>
                <li>
                  Third Link
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
