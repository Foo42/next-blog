import styles from '@/styles/Home.module.css'
import { listSortedPosts } from '../../../lib/listPostPaths'

export const metadata = {
  title: 'Posts',
}

export default async function Home() {
  const posts = await listSortedPosts()
  const postLinks = posts.map(post => {
    const dateString = post.metadata.date instanceof Date ? post.metadata.date.toISOString() : post.metadata.date
    return (<li key={post.filePath}>
      <a href={`/posts/${post.metadata.slug}`}>
        <div>{post.metadata.title}</div>
        <div style={{ fontSize: '0.5em' }}>{dateString.split('T')[0]}</div>
      </a>
    </li>)
  })
  return (
    <main className={styles.main}>
      <article className='stack' style={{ maxWidth: '80ch', padding: 'var(--s1)' }}>
        <h2>Recent Posts</h2>
        <ul style={{listStyleType: 'none'}}>
          {postLinks}
        </ul>
      </article>
    </main>
  )
}
