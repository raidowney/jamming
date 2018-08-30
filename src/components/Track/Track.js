import React, { Component } from 'react';
import './Track.css'

class Track extends Component {
  constructor(props){
    super(props)
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.renderAction = this.renderAction.bind(this);
  }

  addTrack(event) {
    this.props.onAdd(this.props.track);

    event.preventDefault();
  }

  removeTrack(event) {
   this.props.onRemove(event.target.track);

   event.preventDefault();
  }

  renderAction() {
    console.log(this.props)
    if (this.props.isRemoval === false){
      return <a className="Track-action" onClick={this.addTrack}>+</a>;
    } else {
      return <a className="" onClick={this.removeTrack}>-</a>;
    }
  }

  render () {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album} </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;