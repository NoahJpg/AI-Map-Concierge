import React, { useState } from 'react';
import { getGeneratedText } from './ChatGPT';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';


const Sidebar = ({ address, lat, lng }) => {
  const [generatedText, setGeneratedText] = useState('');
  const [temperature, setTemperature] = useState(0.5);

  const handleGenerateText = async () => {
    const response = await getGeneratedText(address, temperature);
    setGeneratedText(response);
  };

  const handleTemperatureChange = (e) => {
    setTemperature(parseFloat(e.target.value));
  };

  return (
    <div className='sidebar-wrapper'>
      <h2>Marker Info</h2>
      <p><span className='title'>Address: </span>{address}</p>
      <p><span className='title'>Latitude: </span>{lat}</p>
      <p><span className='title'>Longitude: </span>{lng}</p>
      <br />
      <p>Wackiness: {temperature}</p>
      <RangeSlider
        value={temperature}
        min={0}
        max={10}
        step={1}
        onChange={handleTemperatureChange}
        />
        <br />
        <button onClick={handleGenerateText}>Generate Info About This Place</button>
      <p>Response: </p>
      {generatedText && <p>{generatedText}</p>}

    </div>
  );
};

export default Sidebar;
