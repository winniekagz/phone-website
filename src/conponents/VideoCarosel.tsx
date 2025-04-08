import {  useEffect, useRef, useState } from 'react';
import { hightlightsSlides } from '../constants';
import gsap from 'gsap'; // Assuming gsap is imported here
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';

const initialVideoStates = {
  isEnd: false,
  isInt: false,
  startPlay: false,
  videoId: 0,
  isLastVideo: false,
  isPlaying: false,
};

const VideoCarousel = () => {
  const videoRef = useRef<HTMLVideoElement[]>([]);
  const videoDivRef = useRef<HTMLSpanElement[]>([]);
  const videoSpanRef = useRef<HTMLSpanElement[]>([]);
  const [loadedData, setLoadedData] = useState<string[]>([]); // Adjust type based on your data
  const [video, setVideo] = useState(initialVideoStates);
  const { isInt, isLastVideo, isPlaying, startPlay, videoId, isEnd } = video;

  useGSAP(()=>{
    gsap.to('#video',{
      scrollTrigger:{
        trigger:'#video',
        toggleActions:'restart none none none',
      },
      onComplete:()=>{
        setVideo((prev) => ({ ...prev, startPlay: true,isPlaying:true }));
      }
    })

    gsap.to('#slider',{
      transform:`translateX(${-100* videoId}%)`,
      duration:2,
      ease:'power2.inOut',
      // onComplete:()=>{
      //   setVideo((prev) => ({ ...prev, isInt: true }));
      // }
    })

  
  },[isEnd,videoId])

  const handleLoadedMetaData=(i,e)=>{
setLoadedData((prev)=>[...prev,e])
  }

  // Play video effect
  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId]?.pause(); // Optional chaining to prevent errors if element is undefined
      } else {
        startPlay && videoRef.current[videoId]?.play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // Track progress effect (using gsap for animation)
  // useEffect(() => {
  //   if (videoSpanRef.current[videoId]) {
  //     let anim = gsap.to(videoSpanRef.current[videoId], {
  //       onUpdate: () => {
  //         // Update logic
  //       },
  //       onComplete: () => {
  //         // Completion logic
  //       },
  //     });
  //   }
  // }, [videoId, startPlay]);

  useEffect(() => {
    let currentProgress=0
    const span=videoSpanRef.current
    if (span[videoId]) {
      let anim=gsap.to(span[videoId], {
        onUpdate: () => {
        const progress=Math.ceil(anim.progress()*100)
        if (progress !== currentProgress) {
          currentProgress=progress
        }
        gsap.to(videoDivRef.current[videoId], {
          width:window.innerWidth<760?'10vw':
          window.innerWidth<1200?'10vw':'4vw'
        })
        gsap.to(span[videoId], {
          width:`${currentProgress}%`,
          backgroundColor:'white',
          duration:0.5,
        })
        },
        onComplete: () => {
        if (isPlaying){
          gsap.to(videoDivRef.current[videoId], {
           width:'12px' ,
          })
          gsap.to(span[videoId], {
            backgroundColor:'#afafaf',
          })

        }
        },
      })
      if (videoId==0){
        anim.restart()
      }

      const animUpdate = () => {
        anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration);
      }

      if (isPlaying){
        gsap.ticker.add(animUpdate);
      }else{
        gsap.ticker.remove(animUpdate);
      }
      span[videoId].style.width = `${currentProgress}%`;
    }
  },[videoId,startPlay])

  const handleProcess = (type: string,index:number) => {
    switch (type) {
      case 'video-play':
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
        case 'video-pause':
          setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
          break;
        case 'video-end':
        setVideo((prev) => ({ ...prev, isEnd: true , videoId: index+1 }));
        break;
        case 'video-last':
        setVideo((prev) => ({ ...prev, isLastVideo: true }));
        break;
        case 'video-reset':
          setVideo({
            isEnd: false,
            isInt: false,
            startPlay: false,
            videoId: 0,
            isLastVideo: false,
            isPlaying: false,
          });
          break;
        default:
          return video
    }
  }

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((slide, i) => (
          <div key={slide.id} id='slider' className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  autoPlay
                  id={`video-${i}`} // Ensure each video has a unique ID
                  playsInline={true}
                  preload="auto"
                  muted
                  className={`${slide.id==2 && 'translate-x-44'} pointer-events-none`}
                  ref={(el) => (videoRef.current[i] = el)}
                  onEnded={() => 
                    i !==3?handleProcess('video-end', i):handleProcess('video-last', i)
                }
                  onPlay={() => {
                    setVideo((prev) => ({ ...prev, isPlaying: true }));
                   
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetaData(i,e)}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-15 z-10">
                {slide.textLists.map((text) => (
                  <p key={text} className="text-xl md:text-2xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center mt-10">
        <div className="bg-gray-300 rounded-full backdrop-blur flex-center py-5 px-7">
            {
              videoRef.current.map((_,index)=>(
                <span
                key={index}
                ref={(el) => (videoDivRef.current[index] = el)}
                className={`w-3 h-3 bg-gray-200 relative rounded-full mx-2 cursor-pointer ${index === videoId ? 'bg-blue-500' : 'bg-gray-400'}`}
                
                >
<span ref={(el) => (videoSpanRef.current[index] = el)}
                  className={`w-3 h-3 bg-gray-200 relative rounded-full mx-2 cursor-pointer ${index === videoId ? 'bg-blue-500' : 'bg-gray-400'}`}
></span>
                </span>
              ))  
            }
        </div>
        <button
  className="control-btn"
  onClick={() =>
    isLastVideo
      ? handleProcess('video-reset')
      : !isPlaying
      ? handleProcess('video-play' )
      : handleProcess('video-pause' )
  }
>
  <img
    src={isLastVideo ? replayImg : isPlaying ? pauseImg : playImg}
    alt={isLastVideo ? 'Replay' : isPlaying ? 'Pause' : 'Play'}
    nClick={() =>
      isLastVideo
        ? handleProcess('video-reset')
        : !isPlaying
        ? handleProcess('video-play' )
        : handleProcess('video-pause' )
    }
  />
</button>

      </div>
    </>
  );
};

export default VideoCarousel