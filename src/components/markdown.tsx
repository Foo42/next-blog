import Markdownit from 'markdown-it'
import hljs from 'highlight.js' // https://highlightjs.org

interface Props {
  markdown: string,
  initialHeadingLevel?: number
  classNames?: string[]
}

function applyHighlighting(str: string, lang?: string): string {
  console.log("in apply highlighting", lang)
  if (lang && hljs.getLanguage(lang)){
    console.log("known language")
    try {
      const toReturn = hljs.highlight(str, {language: lang}).value
      console.log(toReturn)
      return toReturn
    } catch (err) {
      console.warn("code highlighting failed", err)
    }
  } else {
    console.log("unknown language")
  }
  return ''
}
export function Markdown(props: Props) {
  const mdit = new Markdownit({highlight: applyHighlighting})

  let markdown = props.markdown
  const additionalHeadings = props.initialHeadingLevel ?? 0
  if (additionalHeadings > 0) {
    const headingPrefix = ''.padStart(additionalHeadings, '#')
    console.log(headingPrefix)
    console.log(markdown)
    markdown = markdown.replace(/^\s?#/mg, `${headingPrefix}`)
    console.log(markdown)
  }

  const className = [ ...(props.classNames ?? [])].join(' ')
  const rendered = mdit.render(markdown)
  return <div className={className} dangerouslySetInnerHTML={{ __html: rendered }}></div>
}
