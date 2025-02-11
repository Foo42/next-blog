import styles from './style.module.css'
import PostList from '@/components/postList'

export const metadata = {
  title: 'Posts',
}

export default async function PostsIndex() {
  return (
    <main>
      <div className='card'>
        <h2>Recent Posts</h2>
        <PostList/>
      </div>
    </main>
  )
}
