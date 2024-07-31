

import React, { useState } from 'react';
import './SegmentPopup.css';
import axios from 'axios';

const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

function SegmentPopup({ onClose, onSave }) {
  const [segmentName, setSegmentName] = useState('');
  const [schemas, setSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState('');

  const handleAddSchema = () => {
    if (selectedSchema && !schemas.includes(selectedSchema)) {
      setSchemas([...schemas, selectedSchema]);
      setSelectedSchema('');
    }
  };

  const handleSaveSegment = async () => {
    const payload = {
      segment_name: segmentName,
      schema: schemas.map(schema => ({
        [schema]: schemaOptions.find(option => option.value === schema).label
      }))
    };

    try {
      const response = await axios.post('https://webhook.site/da8a2c48-3a97-4124-94be-9f39a052c54c', payload);
      console.log('Segment saved:', response.data);
      onSave(payload); // Call the onSave callback with the payload
    } catch (error) {
      console.error('Error saving segment:', error);
      onSave(payload); // Call onSave even in case of an error
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Saving Segment</h2>
        <input
          type="text"
          placeholder="Name of the segment"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
          className="segment-input"
        />
        <div className="schema-container">
          {schemas.map((schema, index) => (
            <select
              key={index}
              value={schema}
              onChange={(e) => {
                const newSchemas = [...schemas];
                newSchemas[index] = e.target.value;
                setSchemas(newSchemas);
              }}
              className="schema-dropdown"
            >
              {schemaOptions
                .filter(option => !schemas.includes(option.value) || option.value === schema)
                .map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
          ))}
        </div>
        <select
          value={selectedSchema}
          onChange={(e) => setSelectedSchema(e.target.value)}
          className="add-schema-dropdown"
        >
          <option value="" disabled>Add schema to segment</option>
          {schemaOptions
            .filter(option => !schemas.includes(option.value))
            .map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
        <button onClick={handleAddSchema} className="add-schema-button">+ Add new schema</button>
        <div className="popup-buttons">
          <button className="save-button" onClick={handleSaveSegment}>Save the Segment</button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default SegmentPopup;
