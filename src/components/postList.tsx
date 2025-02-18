import { listSortedPosts } from "lib/listPostPaths"

async function PostList(){
  const posts = await listSortedPosts()
  const postLinks = posts.map(post => {
    const dateString = post.metadata.date instanceof Date ? post.metadata.date.toISOString() : post.metadata.date
    return (<li key={post.filePath} style={{marginLeft: 0}}>
      <a href={`/posts/${post.metadata.slug}`}>
        <h4>{post.metadata.title}</h4>
        <div style={{ fontSize: '0.5em' }}>{dateString.split('T')[0]}</div>
      </a>
    </li>)
  })

  return (
    <ul style={{listStyleType: 'none', paddingLeft: 0}}>
      {postLinks}
    </ul>
  )
}

export default PostList
