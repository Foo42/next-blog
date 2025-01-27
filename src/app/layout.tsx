import Link from "next/link";
import { PropsWithChildren } from "react"

import '@/styles/globals.css'
import '@/styles/typography2.css'
import styles from '@/styles/Layout.module.css'

export async function generateMetadata () {
  return {
    title: {
      template: '%s | Julian Haeger',
      default: 'Home'
    },
    viewport: "width=device-width, initial-scale=1"
  }
}

function RootLayout({children}: PropsWithChildren<{}>){
return (
  <html lang="en">
    <body>
      <header className="page-header">
        <div>
          <div className={styles.banner}>
            <h1><Link href="/">Julian&apos;s Thoughts</Link></h1>
          </div>
          {/* <nav>This is nav</nav> */}
        </div>
      </header>
      {children}
    </body>
  </html>)
}

export default RootLayout
