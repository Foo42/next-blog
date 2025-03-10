import styles from './style.module.css'
import PostList from '@/components/postList'

export const metadata = {
  title: 'Posts',
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
