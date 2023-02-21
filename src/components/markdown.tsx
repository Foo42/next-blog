import Markdownit from 'markdown-it'

interface Props {
  markdown: string,
  initialHeadingLevel?: number
}

export function Markdown(props: Props) {
  const mdit = new Markdownit()

  let markdown = props.markdown
  const additionalHeadings = props.initialHeadingLevel ?? 0
  if (additionalHeadings > 0) {
    const headingPrefix = ''.padStart(additionalHeadings, '#')
    console.log(headingPrefix)
    console.log(markdown)
    markdown = markdown.replace(/^\s?#/mg, `${headingPrefix}`)
    console.log(markdown)
  }

  const rendered = mdit.render(markdown)
  return <div className='stack' dangerouslySetInnerHTML={{ __html: rendered }}></div>
}
