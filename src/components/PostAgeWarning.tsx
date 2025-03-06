'use client'

import { useEffect, useState } from "react"

type Props = {
  publishDate: Date
}

const msPerYear = 31536000000

function PostAgeWarning (props: Props) {
  const renderTime = Date.now()
  const ageAtRenderTime = (renderTime - props.publishDate.getTime()) / msPerYear

  const [isOld, setIsOld] = useState(ageAtRenderTime > 5)

  useEffect(() => {
    const ageAtDisplayTime = (Date.now() - props.publishDate.getTime()) / msPerYear
    setIsOld(ageAtDisplayTime > 5)
  }, [setIsOld, props.publishDate])

  const oldPostWarning = (<div>Warning: This post is over 5 years old and may not be representative of my current understanding or opinions!</div>)
  return (
    <div className="warningBox card">
      {isOld ? oldPostWarning : null}
    </div>
  )
}

export default PostAgeWarning
