import { Markdown } from "@/components/markdown"
import Layout from "@/layouts/layout"
import { listSortedPosts } from "lib/listPostPaths"

type Props = {
  post: {
    markdown: string,
    title: string,
    dateString: string
  }
}
export default function PostPage(props: Props) {
  return (<Layout><main>
    <article style={{ maxWidth: '80ch', margin: 'auto', textAlign: 'justify' }}>
      <Markdown markdown={props.post.markdown} initialHeadingLevel={2} />
    </article>
  </main></Layout>)
}

export async function getStaticPaths() {
  return {
    paths: (await listSortedPosts()).map(post => ({ params: { slug: post.metadata.slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }): Promise<{ props: Props }> {
  //TODO: we only really need to load a single file, refactor to avoid loading the full list each time
  const allPosts = await listSortedPosts()
  const thisPost = allPosts.find(post => post.metadata.slug === params.slug)
  if (thisPost === undefined) {
    throw new Error(`Couldn't find post with matching slug`)
  }
  return {
    props: {
      post: {
        markdown: thisPost.markdown,
        title: thisPost.metadata.title,
        dateString: thisPost?.metadata.date.toISOString()
      }
    }
  }
}