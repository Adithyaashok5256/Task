
import React, { useState } from 'react';
import './App.css';
import SegmentPopup from './SegmentPopup';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [savedSegment, setSavedSegment] = useState(null);

  const handleSaveSegmentClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSaveSegment = (segment) => {
    setSavedSegment(segment);
    setShowPopup(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Segment Manager</h1>
        <button className="save-segment-button" onClick={handleSaveSegmentClick}>Save segment</button>
      </header>
      {showPopup && <SegmentPopup onClose={handleClosePopup} onSave={handleSaveSegment} />}
      {savedSegment && (
        <div className="saved-segment">
          <h2>Saved Segment</h2>
          <p><strong>Name:</strong> {savedSegment.segment_name}</p>
          <ul>
            {savedSegment.schema.map((schema, index) => (
              <li key={index}>{Object.values(schema)[0]}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

