import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, Typography, Card, CardContent, CardMedia, IconButton } from '@material-ui/core';
import { SkipPrevious, SkipNext, PlayArrow, Pause } from '@material-ui/icons';
import { fetchOne } from '../redux/actions';
// import result from '../mocks';
import './Song.css';
import {
  FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon, EmailShareButton, EmailIcon
} from 'react-share';

// const currentIndex=20;


class Song extends Component {
  state = {
    play: false,
  }



  toggleAudio = () => {
    this.setState({ play: !this.state.play })
  }

  setSong (int = 0) {
    let { result, currentIndex } = this.props;
    currentIndex && (currentIndex = Number(currentIndex));
    currentIndex += int;
    let currentSong = result[currentIndex];
    let audio = currentSong ? new Audio(currentSong.previewUrl) : undefined;
    this.setState({ currentSong, audio, result, currentIndex })
  }

  setSongByTrackId () {
    const {currentIndex} = this.props;
    this.props.fetchOne(currentIndex);
  }

  componentDidMount () {
    this.props.result.length ? this.setSong() : this.setSongByTrackId();
  }

  componentDidUpdate() {
    if (!this.state.currentSong) {
      let currentSong = this.props.currentSong.pop();
      let audio = currentSong ? new Audio(currentSong.previewUrl) : undefined;
      this.setState({currentSong, audio});
    }
  }



  goBack = (audio) => {
    audio.pause();
    this.props.history.goBack();
    this.setState({ play: false });
  }

  render () {
    console.log(this.props, 'AAAAAA', this.state)
    const { result, history } = this.props;
    let { audio } = this.state;
    (audio && this.state.play) && audio.play();
    (audio && !this.state.play) && audio.pause();
    let {currentSong} = this.state;
    // let currentSong = this.props.currentSong.length ? this.props.currentSong.pop() : result[20];


    return (currentSong ?
      <div
        style={{
          marginTop: '12%',
          display: "flex",
          flexDirection: 'column',
          justifyContent: "space-around",
          alignItems: "center",
          height: '100%',
          width: '100%',
          flexWrap: 'nowrap',
          overflowY: 'hidden',
        }
        }
      >
        {(this.state.result && this.state.result.length) ? <AppBar position="fixed" color="gray" styles={{ top: 0 }} >
          <Toolbar>
            <Typography variant="h6" color="inherit" onClick={() => this.goBack(audio)}>
              BACK
        </Typography>
          </Toolbar>
        </AppBar> : null}
        <Card style={{ display: "flex" }}>
          <div >
            <CardContent>
              <Typography component="h5" variant="h5">
                {currentSong.trackName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {currentSong.artistName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {currentSong.albumName}
              </Typography>
            </CardContent>
            <div style={{
              display: 'flex',
              alignItems: 'center',
            }}>
              <IconButton aria-label="Previous">

              </IconButton>
              <IconButton aria-label="Play/pause" onClick={this.toggleAudio}>
                {this.state.play ? <Pause /> : <PlayArrow />}
              </IconButton>
              {(this.state.result && this.state.result.length) ?
                <IconButton aria-label="Next">
                  <SkipPrevious onClick={() => { audio.pause(); this.setSong(-1); }} />
                  <SkipNext onClick={() => { audio.pause(); this.setSong(+1); }} />
                </IconButton> : null}
            </div>
          </div>
          <CardMedia style={{ height: '100px', width: '100px' }}
            image={currentSong.artworkUrl100}
            title={currentSong.albumName}
          />
        </Card>
        <Card style={{display:'flex'}}>
          <FacebookShareButton url={`http://localhost:3000/song/${currentSong.trackId}`}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={`http://localhost:3000/song/${currentSong.trackId}`}><TwitterIcon size={32} round/></TwitterShareButton>
          <LinkedinShareButton url={`http://localhost:3000/song/${currentSong.trackId}`}><LinkedinIcon size={32} round/></LinkedinShareButton>
          <EmailShareButton url={`http://localhost:3000/song/${currentSong.trackId}`}><EmailIcon size={32} round/></EmailShareButton>
        </Card>


      </div >
      : null);

  }
};

const mapStateToProps = (state, ownProps) => ({
  result: state.result,
  currentIndex: ownProps.match.params.index,
  currentSong: state.currentSong
})

const mapDispatchTopProps = dispatch => ({
  fetchOne: id => dispatch(fetchOne(id))
})

export default connect(
  mapStateToProps,
  mapDispatchTopProps
)(Song);