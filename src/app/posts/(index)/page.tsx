import { siteOrigin } from 'lib/hostname'
import styles from './style.module.css'
import PostList from '@/components/postList'

const description = 'Blog of Julian Haeger — Writing about software engineering, technology, and anything else I fancy'

export const metadata = {
  title: 'Posts',
  description,
  alternates: {
    canonical: `${siteOrigin}/posts`,
    types: {
      'application/atom+xml': `${siteOrigin}/feeds/posts/atom.xml`
    }
  },
  openGraph: {
    type: 'website',
    url: `${siteOrigin}/posts`,
    description,
  },
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
