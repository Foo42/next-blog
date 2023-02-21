import { PropsWithChildren } from "react";
import styles from '@/styles/Layout.module.css'

export default function Layout(props: PropsWithChildren<{}>) {
  return (<>
    <div>
      <header className="page-header">
        <div>
          <div className={styles.banner}>
            <h1><a href="/">Julian's Thoughts</a></h1>
          </div>
          {/* <nav>This is nav</nav> */}
        </div>
      </header>
      {props.children}
    </div>
  </>)
}