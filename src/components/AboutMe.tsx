import React from 'react'
import { Markdown } from '@/components/markdown'
import { ProfilePic } from './ProfilePic'

const aboutMeText = `I've been a developer since I graduated in 2006. In that time, there's been plenty of variety. I've worked in scrappy start-ups to big enterprises, built flashy front ends to big-iron backends, monoliths to microservices, and serverless to rack-your-own. I've seen a lot of mistakes, made my fair share, and learned a thing or two along the way.

These days I'm working primarily in Python and Typescript as a principal developer at heat pump optimisation company [Homely Energy](https://www.homelyenergy.com/).

I live in the North West of England with my wife, 2 kids, and a Cocker Spaniel.
`

export default function AboutMe() {
  return (
    <>
      <h3 style={{marginBottom: 'var(--s0)'}}>About Me</h3>
      <ProfilePic style={{float: 'right', display: 'inline-block', marginLeft: '2rem', border: '0.5rem solid rgb(var(--theme-very-light-green-rgb))'}}/>
      <Markdown markdown={aboutMeText} initialHeadingLevel={4} classNames={['pros']}/>
    </>
  )
}
