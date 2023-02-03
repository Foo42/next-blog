import {resolve as resolvePath, join as joinPath} from 'path'
import matter from 'gray-matter'
import * as z from 'zod'

import {readdir, readFile} from 'fs/promises'
async function findPostFiles(){
  const rootPath = resolvePath(joinPath(process.cwd(), 'posts'))
  const paths = await readdir(rootPath)
  const markdownPaths = paths.filter(path => path.endsWith('.md'))


  return Promise.all(markdownPaths.map(async filePath => {
    const fullFilePath = joinPath(rootPath, filePath)
    const rawContent = await readFile(fullFilePath, 'utf-8')
    return {filePath, fullFilePath, rawContent}
  }))
}

const metaDataSchema = z.object({
  title: z.string(),
  date: z.date().or(z.string().transform(s => new Date(s))),
  slug: z.string().optional(),
  aliases: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([])
}).passthrough().transform(generateMissingSlug)
export type PostMetatdata = z.infer<typeof metaDataSchema>

export type PostFile = {
  filePath: string,
  fullFilePath: string
  markdown: string,
  metadata: PostMetatdata
}

export async function listSortedPosts(): Promise<PostFile[]>{
  const files = await findPostFiles()
  const posts = files.map(file => {
    const {content: markdown, data} = matter(file.rawContent)
    const metadata = metaDataSchema.parse(data)

    return {...file, markdown, metadata}
  })

  return posts.sort((a,b) => {
    if (a.metadata.date < b.metadata.date) {
      return 1
    } else {
      return -1
    }
  })
}

function generateMissingSlug<T extends {title: string, slug?: string}>(metadata: T): T & {slug: string} {
  const generatedSlug = metadata.title.replace(/\W+/g, '-')
  return {...metadata, slug: metadata.slug ?? generatedSlug}
}