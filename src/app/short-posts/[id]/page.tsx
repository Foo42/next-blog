import { Markdown } from "@/components/markdown"
import {listSortedShortPosts, loadFromId, ShortPostFile} from "../../../../lib/listShortPostPaths"
import styles from "./style.module.css"
import PostAgeWarning from "@/components/PostAgeWarning"
import BlogComments from "@/components/BlogComments"

type Params = {
  id: string
}
type Props = {
  params: Promise<Params>
}

export async function generateMetadata(props: Props) {
  const params = await props.params
  const title = `Post ${params.id}`
  return {
    title: title,
    authors: [{name: 'Julian Haeger'}],
    openGraph: {
      title: title
    }
  }
}

export async function generateStaticParams(): Promise<Params[]> {
  const sortedPosts = await listSortedShortPosts()
  const sortedIds = sortedPosts.map(({id}) => id)
  return sortedIds.map(id => ({id}))
}


export default async function ShortPost(props: Props) {
  const params = await props.params
  const post = stripH1(await loadFromId(params.id))
  if (post === undefined){
    // todo custom error to return a 404
    throw new Error('Not found')
  }
  return (
    <main>
      <article className='stack card raised' style={{ textAlign: 'justify' }}>
        <header className={styles.postHeader}>
          <h2>{post.id}</h2>
          <div className={styles.postDate}>
            {post.metadata.date.toISOString().split('T')[0]}
          </div>
        </header>
        <PostAgeWarning publishDate={post.metadata.date}/>
        <Markdown markdown={post.markdown} initialHeadingLevel={2} classNames={['pros']} />
      </article>
    </main>)
}

function stripH1<T extends ShortPostFile|undefined>(post: T): T {
  if (post === undefined){
    return post
  }
  const h1Regex = /^\s*#\s*\w.*$/
  const lines = post.markdown.split('\n')
  const withoutH1 = lines.filter(line => !line.match(h1Regex))
  return {...post, markdown: withoutH1.join('\n')}
}
