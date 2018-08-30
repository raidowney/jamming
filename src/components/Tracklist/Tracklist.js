import React, { Component } from 'react';
import './Tracklist.css'
import Track from '../Track/Track';

class Tracklist extends Component {
  render () {
    return (
      <div className="TrackList">
        {
          this.props.tracks.map(track => {
            if (this.props.onAdd){
              return (
                <Track
                  track={track}
                  key={track.id}
                  onAdd={this.props.onAdd}
                  isRemoval={this.props.isRemoval}
                />
              );
            } else {
              return (
                <Track
                  track={track}
                  key={track.id}
                  onRemove={this.props.onRemove}
                  isRemoval={this.props.isRemoval}
                />
              );
            }
          })
        }
      </div>
    );
  }
}

export default Tracklist;
