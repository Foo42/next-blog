import { Markdown } from "@/components/markdown"
import { listSortedPosts, loadFileFromSlug } from "../../../../lib/listPostPaths"
import { stripH1 } from "../../../../lib/stripH1"
import styles from "./style.module.css"
import PostAgeWarning from "@/components/PostAgeWarning"
import BlogComments from "@/components/BlogComments"
import { notFound } from "next/navigation"

type Params = {
  slug: string
}
type Props = {
  params: Promise<Params>
}

export async function generateMetadata(props: Props) {
  const params = await props.params
  const post = stripH1(await loadFileFromSlug(params.slug))
  return {
    title: post?.metadata.title ?? 'Blog Post',
    authors: [{name: 'Julian Haeger'}],
    openGraph: {
      title: post?.metadata.title ?? 'Blog Post'
    }
  }
}

export async function generateStaticParams(): Promise<Params[]> {
  const sortedPosts = await listSortedPosts()
  const sortedSlugs = sortedPosts.map(({metadata}) => metadata.slug)
  return sortedSlugs.map(slug => ({slug}))
}


export default async function Post(props: Props) {
  const params = await props.params
  const post = stripH1(await loadFileFromSlug(params.slug))
  if (post === undefined){
    // todo custom error to return a 404
    notFound()
  }
  return (
    <main>
      <article className='stack card raised' style={{ textAlign: 'justify' }}>
        <header className={styles.postHeader}>
          <h2>{post.metadata.title}</h2>
          <div className={styles.postDate}>
            {post.metadata.date.toISOString().split('T')[0]}
          </div>
        </header>
        <PostAgeWarning publishDate={post.metadata.date}/>
        <Markdown markdown={post.markdown} initialHeadingLevel={2} classNames={['pros']} />
      </article>
      <BlogComments/>
    </main>)
}
