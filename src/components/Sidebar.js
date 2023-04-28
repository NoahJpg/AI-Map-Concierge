import React, { useState } from 'react';
import { getGeneratedText } from './ChatGPT';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import CustomQuestion from './CustomQuestion';
import PresetQuestion from './PresetQuestion';

const Sidebar = ({ address, lat, lng }) => {
  const [generatedText, setGeneratedText] = useState('');
  const [temperature, setTemperature] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [maxTokens, setMaxTokens] = useState(200);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  
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

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleToggleSettings = () => {
    setShowSettings(!showSettings);
  }

  const wrapperClassName = `sidebar-wrapper${isDarkMode ? ' dark-mode' : ''}`;
  const buttonClassName = `btn-mode${isDarkMode ? ' light' : ' dark'}`;
  

  return (
    <div className={wrapperClassName}>
      <h2 className="title">Info Generator</h2>
      <button className={buttonClassName} onClick={handleToggleDarkMode}>
        {isDarkMode ? '🌝' : '🌚'}
      </button>
      <br/ ><br/ >


      <p><span className='title'>Address: </span>{address}</p>
      <PresetQuestion
        buttonText='What is there to do around here?'
        prompt={`Pretend you are a friend who lives in this city: ${address} and reccomend things to do around the neighborhood`}
        maxTokens={maxTokens}
        temperature={temperature}
      />
      <PresetQuestion
        buttonText='What is the weather like in this area?'
        prompt={`Pretend you are a friend who lives in this city: ${address} and describe the weather in the area.`}
        maxTokens={maxTokens}
        temperature={temperature}
      />
      <br /><br />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>{generatedText}</p>
      )}

      <br /><br />
      <div className="dropdown">
        <button 
          className={showSettings ? "dropdown-active" : "dropdown-item"}
          onClick={handleToggleSettings}>
          Advanced Settings
        </button>
        <div className="dropdown-content">
          <div>
            <p><b>Unpredictable Factor:</b> <em>{temperature}</em></p>
            <RangeSlider
              value={temperature}
              min={0}
              max={10}
              step={.1}
              onChange={handleTemperatureChange}
            />
          </div>
          <div>
            <p><strong>Max Response Length: </strong><em><br />{maxTokens} tokens</em></p>
            <RangeSlider
              value={maxTokens}
              min={10}
              max={300}
              step={1}
              onChange={handleMaxTokensChange}
            />
          </div>
        </div>
      </div>
    </div>

    
  );
};

export default Sidebar;
