
import gsap from 'gsap'
import { Typography } from '../conponents/Typography'
import { useGSAP } from '@gsap/react'
import { rightImg, watchImg } from '../utils'
import VideoCarosel from '../conponents/VideoCarosel'

export default function Highlight() {
  useGSAP(()=>{
    gsap.to('#title',{
opacity:1,
duration:2,
y:0
    })
    gsap.to('.link',{opacity:1,y:0,duration:3,stagger:0.25})
  },[])
  return (
    <section id='highlights' className='w-screen overflow-hidden common-padding bg-zinc-950 '>
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-end justify-between ">
     <Typography id='title' 
     variant ='section-heading' text='Get The Highlights'/>
     <div className="flex flex-wrap items-end gap-3">
      <p className='link'>Watch Film</p>
      <img src={watchImg} alt="watch" className='ml-2' />
      </div>
      <div className="flex flex-wrap items-end gap-3">
      <p className='link'>Watch the event </p>
      <img src={rightImg} alt="right" className='ml-2' />
     
    </div>
     
     
        </div>
        <VideoCarosel/>
      </div>
    </section>
  )
}
