export function extractDescription(markdown: string): string {
  const firstParagraph = markdown.trim().split(/\n\n+/)[0]
  const text = firstParagraph
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`#>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (text.length <= 160) return text
  const truncated = text.slice(0, 160)
  const lastDot = truncated.lastIndexOf('.')
  return lastDot > 80 ? text.slice(0, lastDot + 1) : truncated + '…'
}
