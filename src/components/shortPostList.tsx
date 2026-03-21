import { listSortedShortPosts } from "lib/listShortPostPaths"
import { Markdown } from "./markdown"

async function ShortPostList(){
  const posts = await listSortedShortPosts()
  const items = posts.map(post => {
    const dateString = post.metadata.date instanceof Date ? post.metadata.date.toISOString() : post.metadata.date
    return (<li key={post.filePath} style={{marginLeft: 0}}>
      <a href={`/short-posts/${post.id}`}>
        <article style={{paddingLeft: 0, paddingRight: 0}}>
          <h4>
            <div style={{ fontSize: '0.5em' }}>{dateString}</div>
          </h4>
          <Markdown markdown={post.markdown}/>
        </article>
      </a>
    </li>)
  })

  return (
    <>
    <div>
    <p style={{borderBottom: '1px solid gray'}}>
        Short, untitled, quick thoughts (like tweets, but on my own site). At some point I might implement ActivityPub so these can be published directly into the fediverse, but for now they&apos;re available here for POSSE, or via RSS feed.
    </p>
    </div>
    <ul className='plain'>
      {items}
    </ul>
    </>
  )
}

export default ShortPostList
