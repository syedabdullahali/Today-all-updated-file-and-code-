import React from 'react'
import beachResort from "../assets/beachResort.mp4"
import "../styles/main.css"
const Video = () => {
  return (
    <div className='main'>
        < video src={beachResort} autoPlay loop muted />
    </div>
  )
}

export default Video