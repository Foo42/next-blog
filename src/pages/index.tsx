import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { listSortedPosts, PostFile } from 'lib/listPostPaths'
import Layout from '../layouts/layout'

type Props = {
  posts: PostFile[]
}

export default function Home(props: Props) {
  const postLinks = props.posts.map(post => (<li key={post.filePath}><a href={`/posts/${post.metadata.slug}`}>{post.metadata.title}</a></li>))
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Recent posts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className={styles.main}>
          <div className='stack' style={{ maxWidth: '80ch', backgroundColor: 'white', padding: 'var(--s1)' }}>
            <h2>Recent Posts</h2>
            <ul>
              {postLinks}
            </ul>
          </div>
        </main>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      posts: (await listSortedPosts()).map(post => ({ ...post, metadata: { ...post.metadata, date: post.metadata.date.toISOString() } }))
    }
  }
}