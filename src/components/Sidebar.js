import React, { useState } from 'react';
import { getGeneratedText } from './ChatGPT';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { Typewriter } from 'react-typewriter-effect';



const Sidebar = ({ address, lat, lng }) => {
  const [generatedText, setGeneratedText] = useState('');
  const [temperature, setTemperature] = useState(0.5);
  const [isLoading, setIsLoading] = useState(false);
  const [maxTokens, setMaxTokens] = useState(200);

  const handleGenerateText = async () => {
    setIsLoading(true);
    const response = await getGeneratedText(address, maxTokens, temperature);
    setGeneratedText(response);
    setIsLoading(false);
  };

  const handleTemperatureChange = (e) => {
    setTemperature(parseFloat(e.target.value));
  };

  const handleMaxTokensChange = (e) => {
    setMaxTokens(parseInt(e.target.value));
  };

  return (
    <div className='sidebar-wrapper'>
      <h2>Info About This Spot</h2>
      <p><span className='title'>Address: </span>{address}</p>
      <p><span className='title'>Latitude: </span>{lat}</p>
      <p><span className='title'>Longitude: </span>{lng}</p>
      <br />
      <p><strong>Wackiness Factor: </strong><em>{temperature}<br />- Your results may vary</em> 🤪<br /><em>- Set to 0 for predicatble results</em> </p>
      <RangeSlider
        value={temperature}
        min={0}
        max={5}
        step={.1}
        onChange={handleTemperatureChange}
        />
        <br />
        <p><strong>Max Response Length: </strong><em>{maxTokens} characters<br />- Impacts load time</em></p>
      <RangeSlider
        value={maxTokens}
        min={20}
        max={500}
        step={1}
        onChange={handleMaxTokensChange}
      />
      <br />
      <button onClick={handleGenerateText}>What can you tell me about this place?</button>
      <p>Response: </p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>{generatedText}</p>
      )}
    </div>
  );
};

export default Sidebar;
