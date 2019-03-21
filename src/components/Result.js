import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
// import result from '../mocks';
import './Result.css';

class Result extends Component {

  render () {
    const {history} = this.props;

    const attrStyle = {
      display: 'flex',
      justifyContent: 'center'
    }
    const {result} = this.props;

    let renderResult = [];
    result && (renderResult = result.map((el,index) => {
      return (
        <div className="song-container" key={el.trackId} onClick={()=> this.props.history.push(`/song/${index}`)}>
          <img className="song-img" src={el.artworkUrl60} ></img>
          <div className="song-attr" style={attrStyle}>{el.artistName}</div>
          <div className="song-attr" style={attrStyle}>{el.trackName}</div>
        </div>
      )
    }));

    return (
      <div
        style={{
          marginTop: '12%',
          display: "flex",
          flexDirection: 'column',
          justifyContent: "space-around",
          alignItems: "center",
          height: '88%',
          width: '100%',
          flexWrap: 'nowrap',
          overflowY: 'scroll',
          scrollBarWidth: 'none',
          msOverflowStyle: 'none'
        }
        }
      >
        <AppBar position="fixed" color="gray" styles={{ top: 0 }} onClick={history.goBack} >
          <Toolbar>
            <Typography variant="h6" color="inherit">
              BACK
          </Typography>
          </Toolbar>
        </AppBar>
        {renderResult}
      </div >
    )
  }
}

const mapStateToProps = state => {
  console.log(state);
  return(
   {result: state.result}
  )
}

export default connect(
  mapStateToProps,
  null
)(Result)