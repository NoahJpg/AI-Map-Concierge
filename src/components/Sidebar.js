import React, { useState } from 'react';
import { getGeneratedText } from './ChatGPT';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import {geocodeAddress} from "./Map"


const Sidebar = ({ address, lat, lng }) => {
  const [userQuestion, setUserQuestion] = useState("");
  const [generatedText, setGeneratedText] = useState('');
  const [temperature, setTemperature] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [maxTokens, setMaxTokens] = useState(200);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);


  const handleUserQuestionSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userQuestion = e.target.elements.userQuestion
    const response = await getGeneratedText(address, userQuestion, maxTokens, temperature);
    setGeneratedText(response);
    setIsLoading(false);
  }

  const handleUserQuestionChange = (e) => {
      setUserQuestion(e.target.value);
    };
  
  const handleGenerateText = async () => {
    setIsLoading(true);
    const response = await getGeneratedText(address, userQuestion, maxTokens, temperature);
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
      <button onClick={handleGenerateText}>What is there to do around here?</button>
      <br /><br />
      <form onSubmit={handleUserQuestionSubmit}>
        <input 
          type='text' 
          name='user-question'
          placeholder='Ask a question' 
          onChange={handleUserQuestionChange} 
          value={userQuestion} />
        <button type='submit'>submit</button>
      </form>

      <br /><br /><br />
 
      <p>Response: </p>

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
            <p><b>Predictable Factor:</b> <em>{temperature}</em></p>
            <RangeSlider
              value={temperature}
              min={0}
              max={5}
              step={.1}
              onChange={handleTemperatureChange}
            />
          </div>
          <div>
            <p><strong>Max Response Length: </strong><em>{maxTokens}%</em></p>
            <RangeSlider
              value={maxTokens}
              min={10}
              max={200}
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
