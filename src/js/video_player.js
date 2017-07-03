import React from 'react';

export default class VideoPlayer extends React.Component{

  handleKeyup(e) {
    var video = document.getElementById("Video");
    if (e.keyCode == 27) {//Esc
      document.getElementById('video-player').innerHTML = "";
    }
    else if(e.keyCode == 32 || e.keyCode == 13){//space or enter
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
    else if(e.keyCode == 37 || e.keyCode == 100){//left or 4
      video.currentTime += -20;
    }
    else if(e.keyCode == 39 || e.keyCode == 102){//right or 6
      video.currentTime += 20;
    }
  }

  handleEnded(e){
    document.getElementById('video-player').innerHTML = "";
  }

  componentDidMount(){
    document.addEventListener('keyup', this.handleKeyup);
    document.getElementById('Video').addEventListener('ended',this.handleEnded);
  }

  render(){
    return(
      <div id="video-player">
        <h2 id="video-title">{this.props.videoTitle}</h2>
        <video id="Video" src={this.props.videoUrl} controls autoPlay>
        </video>
      </div>
    )
  }
}
