import React from 'react';

export default class VideoWatched extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      movies: '',
      current_title: '',
      current_url: ''
    }
  }

  componentWillMount(){
    var myFetchOptions = {
      method: 'GET'
    }
    fetch("https://demo2697834.mockable.io/movies", myFetchOptions)
    .then(response => response.json())
    .then(json => this.setState({movies: json}));
  }

  selectVideo(e) {
    e.preventDefault();

    //pass date to parent
    var data = [e.target.alt, e.target.parentNode.href];
    this.props.handleSelect(data);

    localStorage.latest = parseInt(localStorage.latest) + 1;

    //get list from localStorage convert it to object, manipulate it and put it back to localStorage
    if(localStorage.videoWatched === undefined){
      var watchedHistoryObject = {};
    }else{
      var watchedHistoryObject = JSON.parse(localStorage.videoWatched);
    }
    watchedHistoryObject[e.target.parentNode.title] = localStorage.latest;
    localStorage.videoWatched = JSON.stringify(watchedHistoryObject);

    //sort the list
    var keysSorted = Object.keys(watchedHistoryObject).sort(function(a,b){
      return watchedHistoryObject[b]-watchedHistoryObject[a];
    })
    localStorage.videoWatchedDESC = JSON.stringify(keysSorted);
  }

  render(){
    const {movies} = this.state;
    var watchedList = "";

    if(localStorage.videoWatchedDESC != undefined){
      var videoWatchedDESCObject = JSON.parse(localStorage.videoWatchedDESC);

      //compare the api response and the list from localStorage and only output the mathces
      var watchedList = [];
      var i, j;
      for(i = 0; i < videoWatchedDESCObject.length; i++){
        for (var index in movies.entries){
          if(videoWatchedDESCObject[i] == movies.entries[index].id){
            watchedList.push(
              <li key={index} className="movieListItem">
                <a href={movies.entries[index].contents[0].url} onClick={this.selectVideo.bind(this)} title={movies.entries[index].id}>
                  <img src={movies.entries[index].images[0].url} alt={movies.entries[index].title} />
                  {movies.entries[index].title}
                </a>
              </li>
            );
          }
        }
      }
    }

    return(
      <div className='carousel carousel-watched'>
        <h2>Previously watched</h2>
        <div className='left-click'>{"<"}</div>
        <div className='carousel-inner'>
          <ul className='carousel-ul'>
            {watchedList}
          </ul>
        </div>
        <div className='right-click'>{">"}</div>
      </div>
    )
  }
}
