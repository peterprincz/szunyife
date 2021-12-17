import React from 'react';
import styles from './video.module.css'


const BackgroundVideo = ({ videoSource, children, blur }) => {

  const classes = {
    overLay: {
      position: "absolute",
      
      top: "10%",
      width: "100%",
      left: 0,
      zIndex: 1,
    }
  };

  return (
    <>
      <div style={classes.container}>
        <video
          style={{ filter: `blur(${blur}px)`, WebkitFilter: `blur(${blur}px)`}}
          className={styles['videoPlayer']}
          autoPlay="autoplay"
          loop="loop"
          muted
          // ref={video}
          id="video-id"
          className={styles['videoPlayer']} >
          {/* TODO make it accept multiple media types */}
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div style={classes.overLay}>
          {children}
        </div>
      </div>
      {/* <span id="video-bottom"></span> */}
    </>
  )
}

export default BackgroundVideo