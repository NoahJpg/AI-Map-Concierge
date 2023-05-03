import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import CustomQuestion from './CustomQuestion';
import PresetQuestion from './PresetQuestion';


const Sidebar = ({ address}) => {
  const [generatedText] = useState('');
  const [maxTokens] = useState(100);
  const [temperature, setTemperature] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showQuestions, setShowQuestionms] = useState(false);

  const handleToggleQuestions = () => {
    setShowQuestionms(!showQuestions);
  }

  const handleTemperatureChange = (e) => {
    setTemperature(parseFloat(e.target.value));
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const sidebarReturn = `sidebar-wrapper${isDarkMode ? ' dark-mode' : ''}`;
  const darkModeButton = `btn-mode${isDarkMode ? ' light' : ' dark'}`;
  
  return (
    <div className={sidebarReturn}>

      <button className={darkModeButton} onClick={handleToggleDarkMode}>
        {isDarkMode ? '🌝🌝🌝' : '🌚🌚🌚'}
      </button>

      <p className={isDarkMode ? 'dark' : 'light'}>
        {generatedText}
      </p>
  
      <div className='slider'>
        <p><b>Response Weirdness Scale:</b> <em>{temperature}</em></p>
        <RangeSlider
          value={temperature}
          min={0}
          max={10}
          step={.1}
          onChange={handleTemperatureChange}
        />
      </div>
      <br /><br /><hr />
      <p><span className='title'>Address: </span><em>{address}</em></p>
      
      <hr /><br/ ><br/ >
      
      <h2 className="title">How can I help you?</h2>

      <CustomQuestion 
        prompt={`Pretend you are a friend who lives nearby and reply to this prompt, but make your response to the prompt only related to this address: ${address}.`}
      />
      
      <button className='dropdown-question' onClick={handleToggleQuestions}>
        {showQuestions ? '⬆Hide⬆' : '⬇Show Questions⬇'} 
      </button>
      
      <br />

      <div className='custom-question-item'>
        {showQuestions && (
          <div className='preset-questions-container'>
          <div className='preset-questions-item'>
            <PresetQuestion
              buttonText='What is there to do here?'
              prompt={`Pretend you are a friend who lives in this city: ${address} and reccomend specific things to do around the neighborhood.`}
              maxTokens={maxTokens}
              temperature={temperature}
            />
          </div>
          <div className='preset-questions-item'>
            <PresetQuestion
              buttonText='What is the weather like here?'
              prompt={`Pretend you are a friend who lives in this city: ${address} and describe the weather in the area for each season.`}
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
              prompt={`Pretend you are a friend who lives in this city: ${address} and briefly tell them the top 3 restaurants in the area.`}
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
      </div>
      <br /><br />
    </div>
  );
};

export default Sidebar;
