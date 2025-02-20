import React from 'react'
import profilePic from '../../public/profile-pic.jpg'
import Image from 'next/image'

export function ProfilePic() {
  return <Image unoptimized={true} src={profilePic} style={{borderRadius: '50%', maxWidth: 'min(100%, 200px)', height: 'auto'}} alt='Photo of Julian Haeger'/>
}
