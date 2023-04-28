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
  const [maxTokens, setMaxTokens] = useState(500);
  const [isDarkMode, setIsDarkMode] = useState(false);
  

  const handleUserQuestionSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userQuestion = e.target.elements.userQuestion
    console.log("e.target:", e.target.elements.userQuestion)
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

  const wrapperClassName = `sidebar-wrapper${isDarkMode ? ' dark-mode' : ''}`;
  const buttonClassName = `btn-mode${isDarkMode ? ' light' : ' dark'}`;

  return (
    <div className={wrapperClassName}>
      <h2 className="title">Info Generator</h2>
      <button className={buttonClassName} onClick={handleToggleDarkMode}>
        {isDarkMode ? '🌝' : '🌚'}
      </button>
      <br/ ><br/ >
      <form onSubmit={handleUserQuestionSubmit}>
        <input 
          type='text' 
          name='user-question'
          placeholder='Ask a question' 
          onChange={handleUserQuestionChange} 
          value={userQuestion} />
        <button type='submit'>Ask</button>
      </form>
      <p><span className='title'>Address: </span>{address}</p>
      <br />
      <p><strong>Wackiness Factor: </strong><em>{temperature}<br />- Your results may vary</em><br /><em>- Set to 0 for predicatble results</em> </p>
      <RangeSlider
        value={temperature}
        min={0}
        max={5}
        step={.1}
        onChange={handleTemperatureChange}
        />
        <br />
        <p><strong>Max Response Length: </strong><em>{maxTokens}%<br />- Impacts load time</em></p>
      <RangeSlider
        value={maxTokens}
        min={10}
        max={100}
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
