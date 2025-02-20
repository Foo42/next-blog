import React from 'react'
import {ProfilePic} from '@/components/ProfilePic'
import PostList from '@/components/postList'
import Link from 'next/link'
import AboutMe from '@/components/AboutMe'
import githubIcon from '../../../public/github-mark.svg'
import Image from 'next/image'

export const metadata = {
  title: 'Home',
}

export default async function Home() {

  return (
    <main>
      <section className='card'>
        <div style={{display: 'flex', gap: '4rem'}}>
          <div style={{flex: 1}}>
            <AboutMe/>
          </div>
          <div style={{width: '40%'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <ProfilePic/>
            </div>
            <div>
              <ul className='plain' style={{textAlign: 'center', paddingTop: '2em'}}>
                  <li><Image className='inline-icon' style={{marginInlineEnd: '0.5em'}} alt='github icon' src={githubIcon}/><Link href='https://github.com/Foo42'>Github</Link></li>
              </ul>
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
