import React, {Component} from 'react';
import {updateQuery, fetchSearch} from '../redux/actions';
import {connect} from 'react-redux';
import {FormControl, InputLabel, Input, Button, Select, MenuItem} from '@material-ui/core';
import './Search.css'

class Search extends Component {

  render () {

    const {query, updateQuery, fetchSearch, history} = this.props;


    return (
      <div
        style={{
          display: "flex",
          flexDirection: 'column',
          justifyContent: "space-around",
          alignItems:"center",
          height:'100%',
          width:'100%'
        }}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/ITunes_logo.svg/1200px-ITunes_logo.svg.png" style={{maxWidth:'40%'}}></img>
        <form style={{ width: "70%", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
          <h3>SEARCH FOR MUSIC</h3>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="query">QUERY</InputLabel>
            <Input id="query" type="text" onChange={e => updateQuery({term: e.target.value})} />
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email">ATTRIBUTE</InputLabel>
            <Select
            value={query.attribute}

            inputProps={{
              name: 'attribute',
              id: 'music-attribute',
            }}
            onChange={(e) => updateQuery({attribute: e.target.value})}

          >
            <MenuItem value=''>
            <em>ATTRIBUTE</em>

            </MenuItem>
            <MenuItem value='artistTerm'>ARTIST</MenuItem>
            <MenuItem value='albumTerm'>ALBUM</MenuItem>
            <MenuItem value='songTerm'>SONG</MenuItem>
          </Select>
          </FormControl>

          <Button variant="contained" color="primary" size="large" onClick={(e) => {
            fetchSearch(query);
            updateQuery({term:'', attribute:''});
            history.push('/result')
          }}>
            SEARCH
          </Button>
        </form>
      </div>

    )
  }


};

const mapStateToProps = state => ({
  query: state.query
});

const mapDispatchToProps = dispatch => ({
  updateQuery: (obj) => dispatch(updateQuery(obj)),
  fetchSearch: (obj) => dispatch(fetchSearch(obj))
});

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Search);