import { Feed, Item as FeedItem } from "feed"
import profilePic from "../../../../../public/profile-pic.jpg"
import { listSortedPosts } from "lib/listPostPaths"
import Markdownit from 'markdown-it'



export async function GET(request: Request) {
  const feedUrl = request.url
  const parsedUrl = new URL(feedUrl)
  const origin = parsedUrl?.origin
  const posts = await listSortedPosts()

  const mdit = new Markdownit()
  const feedItems = posts.map(post => {
    const contentHtml = mdit.render(post.markdown)
    const feedItem: FeedItem = {
      title: post.metadata.title,
      date: post.metadata.date,
      link: `${origin}/posts/${post.metadata.slug}`,
      description: post.metadata.summary,
      content: contentHtml
    }
    return feedItem
  })

  const feed = new Feed({
    title: "Julian Haeger's Blog",
    description: "Julian Haeger's Blog",
    id: feedUrl,
    link: feedUrl,
    language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    image: profilePic.src,
    updated: new Date(),
    feedLinks: {
      atom: feedUrl
    },
    copyright: 'Julian Haeger',
    author: {
      name: "Julian Haeger",
      link: "https://www.julianhaeger.com"
    }
  })
  feedItems.forEach((item: FeedItem) => feed.addItem(item))
  const headers = {
    'Content-Type': 'application/atom+xml'
  }
    return new Response(feed.atom1(), {status: 200, headers})
}
