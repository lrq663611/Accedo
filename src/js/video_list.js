import React from 'react';

export default class VideoList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      movies: '',
      current_title: '',
      current_url: ''
    }
  }

  componentWillMount(){
    if(localStorage.latest === undefined){
      localStorage.latest = 0;
    }

    var myFetchOptions = {
      method: 'GET'
    }
    fetch("https://demo2697834.mockable.io/movies", myFetchOptions)
    .then(response => response.json())
    .then(json => this.setState({movies: json}));
  }

  componentDidMount(){
    // Below jQuery code is for carousel animation. not recommended for using within ReachJs
    var carousel_slider = function() {
    	var item_width = $('.movieListItem').outerWidth(true);
    	var left_css = parseInt($('.carousel-ul').css('left'));

    	$('.right-click').click(function(){
    		var item_left = left_css - item_width;
    		$(this).closest(".carousel").find('.carousel-ul').animate({'left' : item_left},500,function(){
    			$(this).closest(".carousel").find('.movieListItem:last').after($(this).closest(".carousel").find('.movieListItem:first'));
    			$(this).closest(".carousel").find('.carousel-ul').css({'left' : left_css});
    		});
    	});

    	$('.left-click').click(function(){
    		var item_left = left_css + item_width;
    		$(this).closest(".carousel").find('.carousel-ul').animate({'left' : item_left},500,function(){
    			$(this).closest(".carousel").find('.movieListItem:first').before($(this).closest(".carousel").find('.movieListItem:last'));
    			$(this).closest(".carousel").find('.carousel-ul').css({'left' : left_css});
    		});
    	});
    }();
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
    const movieList = movies
    ?
    movies.entries.map((movie, index)=>(
      <li key={index} className="movieListItem">
        <a href={movie.contents[0].url} onClick={this.selectVideo.bind(this)} title={movie.id}>
          <img src={movie.images[0].url} alt={movie.title} />
          {movie.title}
        </a>
      </li>
    ))
    :
    'Nothing Found';

    return(
      <div className='carousel'>
        <div className='left-click'>{"<"}</div>
        <div className='carousel-inner'>
          <ul className='carousel-ul'>
            {movieList}
          </ul>
        </div>
        <div className='right-click'>{">"}</div>
      </div>
    )
  }
}
