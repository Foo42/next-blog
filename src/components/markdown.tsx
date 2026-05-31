import Markdownit from 'markdown-it'
import hljs from 'highlight.js' // https://highlightjs.org

interface Props {
  markdown: string,
  initialHeadingLevel?: number
  classNames?: string[]
}

function applyHighlighting(str: string, lang?: string): string {
  if (lang && hljs.getLanguage(lang)){
    try {
      const toReturn = hljs.highlight(str, {language: lang}).value
      return toReturn
    } catch (err) {
      console.warn("code highlighting failed", err)
    }
  } else {
  }
  return ''
}
export function Markdown(props: Props) {
  const mdit = new Markdownit({highlight: applyHighlighting})

  let markdown = props.markdown
  const additionalHeadings = props.initialHeadingLevel ?? 0
  if (additionalHeadings > 0) {
    const headingPrefix = ''.padStart(additionalHeadings, '#')
    markdown = markdown.replace(/^\s?#/mg, `${headingPrefix}`)
  }

  const className = [ ...(props.classNames ?? [])].join(' ')
  const rendered = mdit.render(markdown)
  return <div className={className} dangerouslySetInnerHTML={{ __html: rendered }}></div>
}
