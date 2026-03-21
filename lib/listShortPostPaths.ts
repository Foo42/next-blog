import {resolve as resolvePath, join as joinPath} from 'path'
import matter from 'gray-matter'
import * as z from 'zod'
import {readdir, readFile} from 'fs/promises'

const rootPath = resolvePath(joinPath(process.cwd(), 'short_posts'))

const metaDataSchema = z.object({
  date: z.date().or(z.string().transform(s => new Date(s))),
  tags: z.array(z.string()).optional().default([])
})
export type ShortPostMetatdata = z.infer<typeof metaDataSchema>

export type ShortPostFile = {
  filePath: string,
  fullFilePath: string,
  id: string,
  markdown: string,
  metadata: ShortPostMetatdata
}

export async function loadFromId(id: string): Promise<ShortPostFile> {
  const filePath = `${id}.md`
  const fullFilePath = joinPath(rootPath, filePath)
  const rawContent = await readFile(fullFilePath, 'utf-8')
  const {content: markdown, data} = matter(rawContent)
  const metadata = metaDataSchema.parse(data)
  return {filePath, fullFilePath, markdown, metadata, id}
}


export async function listSortedShortPosts(): Promise<ShortPostFile[]>{
  const paths = await readdir(rootPath)
  const markdownPaths = paths.filter(path => path.endsWith('.md'))
  const posts = await Promise.all(markdownPaths.map(async filePath => {
    const id = filePath.slice(0,-3) // remove the .md
    return await loadFromId(id)
  }))
  return posts.sort((a: ShortPostFile, b: ShortPostFile) => {
    if (a.metadata.date < b.metadata.date) {
      return 1
    } else {
      return -1
    }
  })
}
