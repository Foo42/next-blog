import { Markdown } from "@/components/markdown"
import { listSortedPosts, loadFileFromSlug, PostFile } from "../../../../lib/listPostPaths"

type Params = {
  slug: string
}
type Props = {
  params: Promise<Params>
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
    throw new Error('Not found')
  }
  return (
    <main>
      <article className='stack card' style={{ textAlign: 'justify' }}>
        <h2>{post.metadata.title}</h2>
        <Markdown markdown={post.markdown} initialHeadingLevel={2} classNames={['pros']} />
      </article>
    </main>)
}

function stripH1<T extends PostFile|undefined>(post: T): T {
  if (post === undefined){
    return post
  }
  const h1Regex = /^\s*#\s*\w.*$/
  const lines = post.markdown.split('\n')
  const withoutH1 = lines.filter(line => !line.match(h1Regex))
  return {...post, markdown: withoutH1.join('\n')}
}
