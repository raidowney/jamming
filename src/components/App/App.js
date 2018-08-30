import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {
          name: "Rusty Cage",
          artist: "Soundgarden",
          album: "Badmotorfinger",
          id: 4
        }, {
          name: "Frank Sinatra",
          artist: "Cake",
          album: "Fashion Nugget",
          id: 5
        }, {
          name: "Wet Sand",
          artist: "Red Hot Chili Peppers",
          album: "Stadium Arcadium",
          id: 6
        }
      ],
      playlistName: "THIS IS AWESOME!",
      playlistTracks: [
        {
          name: "South of Heaven",
          artist: "Slayer",
          album: "South of Heaven",
          id: 1
        }, {
          name: "Enter Sandman",
          artist: "Metallica",
          album: "Metallica",
          id: 2
        }, {
          name: "War Pigs",
          artist: "Black Sabbath",
          album: "Black Sabbath",
          id: 3
        },
        {
          name: "Wet Sand",
          artist: "Red Hot Chili Peppers",
          album: "Stadium Arcadium",
          id: 6
        }
      ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.setState({playlistTracks: this.state.playlistTracks.push(track)})
    console.log(this.state.playlistTracks)
  }

  removeTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      this.setState({playlistTracks: this.state.playlistTracks.splice(this.state.playlistTracks.find(track.id), 1)})
    }
  }

  savePlaylist(){
    const uri = []
  }

  updatePlaylist(name){
    this.setState({playlistName: name})
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={ this.state.searchResults }
              onAdd={ this.addTrack }
            />
            <Playlist
              playlistName={ this.state.playlistName }
              playlistTracks={ this.state.playlistTracks }
              onRemove={ this.removeTrack }
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
