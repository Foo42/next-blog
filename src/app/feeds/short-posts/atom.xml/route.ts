import { Feed, Item as FeedItem } from "feed"
import profilePic from "../../../../../public/profile-pic.jpg"
import Markdownit from 'markdown-it'
import { siteOrigin } from "lib/hostname"
import { listSortedShortPosts } from "lib/listShortPostPaths"

export const dynamic = 'force-static'


export async function GET() {
  const feedUrl = `${siteOrigin}/short-posts`
  const shortPosts = await listSortedShortPosts()

  const mdit = new Markdownit()
  const feedItems = shortPosts.map(post => {
    const contentHtml = mdit.render(post.markdown)
    const feedItem: FeedItem = {
      date: post.metadata.date,
      title: `Post on ${post.metadata.date}`,
      link: `${feedUrl}/${post.id}`,
      content: contentHtml
    }
    return feedItem
  })

  const feed = new Feed({
    title: "Julian Haeger's Short Posts",
    description: "Julian Haeger's Short Posts",
    id: feedUrl,
    link: feedUrl,
    language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    image: profilePic.src,
    updated: shortPosts[0].metadata.date,
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
