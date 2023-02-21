import { PropsWithChildren } from "react";
import styles from '@/styles/Layout.module.css'
import Link from "next/link";

export default function Layout(props: PropsWithChildren<{}>) {
  return (<>
    <div>
      <header className="page-header">
        <div>
          <div className={styles.banner}>
            <h1><Link href="/">Julian&apos;s Thoughts</Link></h1>
          </div>
          {/* <nav>This is nav</nav> */}
        </div>
      </header>
      {props.children}
    </div>
  </>)
}