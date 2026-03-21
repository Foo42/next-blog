import { siteOrigin } from 'lib/hostname'
import styles from './style.module.css'
import PostList from '@/components/postList'

export const metadata = {
  title: 'Posts',
  alternates: {
    canonical: `${siteOrigin}/posts`,
    types: {
      'application/atom+xml': `${siteOrigin}/feeds/posts/atom.xml`
    }
  }
}

export default async function PostsIndex() {
  return (
    <main>
      <div className='card raised'>
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}><h2>Posts</h2><div><a href='/feeds/posts/atom.xml'>Feed</a></div></div>
        <PostList/>
      </div>
    </main>
  )
}
