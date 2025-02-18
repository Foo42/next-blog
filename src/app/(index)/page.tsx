import React from 'react'
import {ProfilePic} from '@/components/ProfilePic'
import PostList from '@/components/postList'
import Link from 'next/link'
import AboutMe from '@/components/AboutMe'

export const metadata = {
  title: 'Home',
}

export default async function Home() {

  return (
    <main>
      <section className='card'>
        <div style={{display: 'flex'}}>
          <div style={{flex: 1}}>
            <AboutMe/>
          </div>
          <div>
            <div>
              <ProfilePic/>
            </div>
            <div>
              Some links to profiles etc
            </div>
          </div>
        </div>
      </section>

      <section className='card'>
        <h3><Link href='/posts'>Posts</Link></h3>
        <PostList/>
      </section>
    </main>
  )
}
