const h1Regex = /^\s*#\s*\w.*$/

export function stripH1<T extends { markdown: string }>(post: T): T
export function stripH1<T extends { markdown: string }>(post: undefined): undefined
export function stripH1<T extends { markdown: string }>(post: T | undefined): T | undefined
export function stripH1<T extends { markdown: string }>(post: T | undefined): T | undefined {
  if (post === undefined) return undefined
  const lines = post.markdown.split('\n')
  return {...post, markdown: lines.filter(line => !line.match(h1Regex)).join('\n')}
}
