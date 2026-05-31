import React from 'react'
import PostList from '@/components/postList'
import Link from 'next/link'
import AboutMe from '@/components/AboutMe'
import lakes from '../../../public/lakes_fade_small-min.png'
import Image from 'next/image'
import styles from './style.module.css'
import ShortPostList from '@/components/shortPostList'
import { siteOrigin } from 'lib/hostname'

export const metadata = {
  title: 'Home',
  description: 'Blog of Julian Haeger — Writing about software engineering, technology, and anything else I fancy',
  alternates: {
    canonical: siteOrigin,
  },
  openGraph: {
    type: 'website',
    url: siteOrigin,
  },
}

export default async function Home() {

  return (
    <main>
      <section className={`card raised ${styles.about_me}`} style={{backgroundImage: `url("${lakes.src}")`}}>
        <div style={{flex: 1}}>
          <AboutMe/>
        </div>
        <Image src={lakes} className={styles.space_holder} alt='Lake district image for spacing purposes' style={{}}/>
      </section>

      <section className='card raised'>
        <h3 style={{marginBottom: 'var(--s1)'}}><Link href='/posts'>Posts</Link></h3>
        <PostList/>
      </section>
      <section className='card raised'>
        <h3 style={{marginBottom: 'var(--s1)'}}><Link href='/short-posts'>Short Posts</Link></h3>
        <ShortPostList/>
      </section>
    </main>
  )
}
