import React from 'react'
import profilePic from '../../public/profile-pic.jpg'
import Image from 'next/image'

export function ProfilePic() {
  return <Image src={profilePic} style={{borderRadius: '50%'}} alt='Photo of Julian Haeger'/>
}
