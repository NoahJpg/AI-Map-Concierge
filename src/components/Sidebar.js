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
  const [maxTokens, setMaxTokens] = useState(100);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showQuestions, setShowQuestionms] = useState(false);

  const handleToggleQuestions = () => {
    setShowQuestionms(!showQuestions);
  }


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
      <button className={buttonClassName} onClick={handleToggleDarkMode}>
        {isDarkMode ? '🌝' : '🌚'}
      </button>
      <p className={isDarkMode ? 'dark' : 'light'}>
      {generatedText}
      </p>
      &nbsp;&nbsp;&nbsp;&nbsp;
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
              max={100}
              step={1}
              onChange={handleMaxTokensChange}
            />
          </div>
        </div>
      </div>
      <p><span className='title'>Address: </span><em>{address}</em></p>
      <br/ ><br/ >
      <h2 className="title">How can I help you?</h2>

      <button className='dropdown-item' onClick={handleToggleQuestions}>
        {showQuestions ? 'Hide Questions' : 'Show Questions'}
      </button>

      {showQuestions && (
        <div className='preset-questions-container'>
        <div className='preset-questions-item'>
          <PresetQuestion
            buttonText='What is there to do here?'
            prompt={`Pretend you are a friend who lives in this city: ${address} and reccomend things to do around the neighborhood.`}
            maxTokens={maxTokens}
            temperature={temperature}
          />
        </div>
        <div className='preset-questions-item'>
          <PresetQuestion
            buttonText='What is the weather like in this area?'
            prompt={`Pretend you are a friend who lives in this city: ${address} and describe the weather in the area.`}
            maxTokens={maxTokens}
            temperature={temperature}
          />
        </div>
        <div className='preset-questions-item'>
          <PresetQuestion
            buttonText='What is the Walk Score®?'
            prompt={`Pretend you are a friend who lives in this city: ${address} and tell them the Walk Score and explain what the score means. Then tell them the Transit Score, and Bike Score.`}
            maxTokens={maxTokens}
            temperature={temperature}
          />
        </div>
        <div className='preset-questions-item'>
          <PresetQuestion
            buttonText='What are the best restaurants?'
            prompt={`Pretend you are a friend who lives in this city: ${address} and tell them the top 3 restaurants in the area.`}
            maxTokens={maxTokens}
            temperature={temperature}
          />
        </div>
        <div className='preset-questions-item'>
          <PresetQuestion
            buttonText='Recommendations for date night?'
            prompt={`Pretend you are a friend who lives in this city: ${address} and create the perfect date night for them specific to this location. Recommend a romantic restaurant, a nice activity, and a specific place to go if they want to stay out.`}
            maxTokens={maxTokens}
            temperature={temperature}
          />
        </div>
      </div>
      )}
      
      <div className='custom-question-item'>
      <CustomQuestion 
        prompt={`Pretend you are a friend who lives nearby and reply to this prompt, but make your response to the prompt only related to this address: ${address}.`}
      /></div>

      <br /><br />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>{generatedText}</p>
      )}

      <br /><br />
     
    </div>

    
  );
};

export default Sidebar;
