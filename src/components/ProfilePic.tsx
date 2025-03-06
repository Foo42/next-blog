import React, { CSSProperties } from 'react'
import profilePic from '../../public/profile-pic.jpg'
import Image from 'next/image'

export function ProfilePic(props: {style?: CSSProperties}) {
  return <Image className='profile_picture' unoptimized={true} src={profilePic} style={{borderRadius: '50%', maxWidth: 'min(100%, 200px)', height: 'auto', shapeOutside: 'margin-box', ...props.style}} alt='Photo of Julian Haeger'/>
}
