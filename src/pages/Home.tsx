import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";

import { heroVideo, smallHeroVideo } from "../utils";
import { Typography } from "../conponents/Typography";

export default function Home() {
 
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );


  const handleVideoSet=()=>{
    if (window.innerWidth<760){
        setVideoSrc(smallHeroVideo)
    } else{
        setVideoSrc(heroVideo)
    }
  }

  // ✅ Update video source when screen width changes
  useEffect(() => {
  window.addEventListener('resize', handleVideoSet)
  return () => window.removeEventListener("resize", handleVideoSet);
  }, []);

  // ✅ Run GSAP animation
  useGSAP(() => {
    gsap.to("#hero", {
      opacity: 1,
      duration: 2,
      ease: "power1.in",
    });
    gsap.to('#cta',{
        opacity:1,
y:10,
        delay:3,
        translate:40,
        ease:'power1.inOut'
       
    })
  }, []);

  return (
    <section className="w-full nav-height relative">
      <div className="h-5/6 w-full flex justify-center flex-col items-center">
        <Typography id="hero" text="iPhone 15 Pro" variant="hero-title" />
        <div className="md:w-10/12 w-9/12 my-2">
          <video className="pointer-events-none" autoPlay muted  playsInline key={videoSrc}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
      <div id='cta' className="gap-2 flex flex-col items-center opacity-0 traslate-y-20">
            <a href="#higlihts" className="bg-primary text-primay inline-block px-4 py-2 rounded-lg">Buy</a>
            <p className="font-normal text-xl">from $999/month or $999</p>
      </div>
    </section>
  );
}
