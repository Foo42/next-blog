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
      <section className={`card ${styles.about_me}`}>
        <div style={{flex: 1}}>
          <AboutMe/>
        </div>
        <div>
          <div className={styles.profilePictureWrapper} >
            <ProfilePic/>
          </div>
          <div>
            <ul className='plain' style={{textAlign: 'center', paddingTop: '2em'}}>
                <li><Image className='inline-icon' style={{marginInlineEnd: '0.5em'}} alt='github icon' src={githubIcon}/><Link href='https://github.com/Foo42'>Github</Link></li>
            </ul>
          </div>
        </div>
      </section>

      <section className='card'>
        <h3 style={{marginBottom: 'var(--s1)'}}><Link href='/posts'>Posts</Link></h3>
        <PostList/>
      </section>
    </main>
  )
}
