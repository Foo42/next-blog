import React from 'react'
import {ProfilePic} from '@/components/ProfilePic'
import PostList from '@/components/postList'
import Link from 'next/link'
import AboutMe from '@/components/AboutMe'
import githubIcon from '../../../public/github-mark.svg'
import Image from 'next/image'
import styles from './style.module.css'

export const metadata = {
  title: 'Home',
}

export default async function Home() {

  return (
    <main>
      <section className={`card raised ${styles.about_me}`}>
        <div style={{flex: 1}}>
          <AboutMe/>
        </div>
      </section>

      <section className='card raised'>
        <h3 style={{marginBottom: 'var(--s1)'}}><Link href='/posts'>Posts</Link></h3>
        <PostList/>
      </section>
    </main>
  )
}
