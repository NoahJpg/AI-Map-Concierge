import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import CustomQuestion from './CustomQuestion';
import PresetQuestion from './PresetQuestion';

const Sidebar = ({ address, userLocation }) => {
  const [generatedText] = useState('');
  const [maxTokens] = useState(100);
  const [temperature, setTemperature] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showQuestions, setShowQuestionms] = useState(false);
  const [userAddress, setAddress] = useState("");

  const handleToggleQuestions = () => {
    setShowQuestionms(!showQuestions);
  }

  const handleTemperatureChange = (e) => {
    setTemperature(parseFloat(e.target.value));
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const getAddressFromLatLong = async (lat, lng) => {
    const apiKey = process.env.REACT_APP_GMAP_KEY
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length > 0) {
        const address = data.results[0].formatted_address;
        return address;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleLocationButtonClick = (location) => {
    console.log(location)
    getAddressFromLatLong(location.lat, location.lng);
  }

  const sidebarReturn = `sidebar-wrapper${isDarkMode ? ' dark-mode' : ''}`;
  const darkModeButton = `btn-mode${isDarkMode ? ' light' : ' dark'}`;

  console.log("temperature:", temperature)
  
  return (
    <div className={sidebarReturn}>

      <button className={darkModeButton} onClick={handleToggleDarkMode}>
        {isDarkMode ? '🌝🌝🌝' : '🌚🌚🌚'}
      </button>

      <p className={isDarkMode ? 'dark' : 'light'}>
        {generatedText}
      </p>
  
      <br /><hr />
      <p><span className='title'>Address: </span><em>{address}</em></p>

      <hr /><br/ ><br/ >

      

      <button className='dropdown-question' onClick={handleToggleQuestions}>
        {showQuestions ? '⬆Hide⬆' : '⬇Show Preset Questions⬇'} 
      </button>
      
      <br />

      <div className='custom-question-item'>
        {showQuestions && (
          <div className='preset-questions-container'>
          <div className='preset-questions-item'>
            <PresetQuestion
              buttonText='What is there to do here?'
              prompt={`Pretend you are a friend who lives in this city: ${address} and recommend specific things to do around the neighborhood.`}
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
     
      <br />  <hr /> <br />
      <h1 className='title-center'>iMessage ChatGPT</h1>
      <CustomQuestion 
        prompt={`Pretend you are a friend who lives in this city:${address} and respond to this question in a helpful way ${prompt}.`}
        temperature={temperature}
        n={5}
      />
    </div>
     
  );
};

export default Sidebar;
