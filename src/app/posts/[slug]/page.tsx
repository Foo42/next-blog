import { Markdown } from "@/components/markdown"
import { listSortedPosts, loadFileFromSlug } from "../../../../lib/listPostPaths"

type Params = {
  slug: string
}
type Props = {
  params: Params
}

export async function generateStaticParams(): Promise<Params[]> {
  const sortedPosts = await listSortedPosts()
  const sortedSlugs = sortedPosts.map(({metadata}) => metadata.slug)
  return sortedSlugs.map(slug => ({slug}))
}


export default async function Post(props: Props) {
  const post = await loadFileFromSlug(props.params.slug)
  if (post === undefined){
    // todo custom error to return a 404
    throw new Error('Not found')
  }
  return (
    <main>
      <article style={{ margin: 'auto', textAlign: 'justify' }}>
        <h2>{post.metadata.title}</h2>
        <Markdown markdown={post.markdown} initialHeadingLevel={2} />
      </article>
    </main>)
}
