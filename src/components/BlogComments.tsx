"use client"
import Giscus from '@giscus/react';

function BlogComments(): JSX.Element {
  return (<Giscus
        id="comments"
        repo="Foo42/julianhaeger-dot-com-comments"
        repoId="R_kgDOO2ZOtg"
        category="Announcements"
        categoryId="DIC_kwDOO2ZOts4CrEAb"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="light"
        lang="en"
        loading="lazy"
      />)
}

export default BlogComments
