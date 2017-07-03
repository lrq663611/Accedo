import React from 'react';
import ReactDOM from 'react-dom';
import VideoList from './video_list';
import VideoWatched from './video_watched';
import VideoPlayer from './video_player';

export default class Index extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      current_title: '',
      current_url: ''
    }
  }

  handleSelect(data) {
     this.setState({
       current_title: data[0],
       current_url: data[1]
     })
  }

  render(){
    return(
      <div>
        {/* use props to pass data from/to children */}
        <VideoList handleSelect={this.handleSelect.bind(this)}></VideoList>
        <VideoPlayer videoTitle={this.state.current_title} videoUrl={this.state.current_url}></VideoPlayer>
        <VideoWatched handleSelect={this.handleSelect.bind(this)}></VideoWatched>
      </div>
    );
  }
}

ReactDOM.render(<Index/>, document.getElementById('mainContainer'));
