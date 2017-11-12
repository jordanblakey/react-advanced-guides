import React, { Component } from "react";

class ChordEditor extends Component {
  render() {
    return (
      <div className="Chord">
        <header className="Chord-header">
          <img src={logo} className="Chord-logo" alt="logo" />
          <h1 className="Chord-title">Welcome to ChordEditor</h1>
        </header>
        <p className="Chord-intro" />
      </div>
    );
  }
}

export default ChordEditor;
