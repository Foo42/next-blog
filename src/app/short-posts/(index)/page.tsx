import ShortPostList from '@/components/shortPostList'
import styles from './style.module.css'
import {siteOrigin} from '../../../../lib/hostname'

export const metadata = {
  title: 'Short Posts',
  alternates: {
    canonical: `${siteOrigin}/short-posts`,
    types: {
      'application/atom+xml': `${siteOrigin}/feeds/short-posts/atom.xml`
    }
  }
}

export default async function ShortPostsIndex() {
  return (
    <main>
      <div className='card raised'>
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}><h2>Short Posts</h2><div><a href='/feeds/short-posts/atom.xml'>Feed</a></div></div>
        <ShortPostList/>
      </div>
    </main>
  )
}
