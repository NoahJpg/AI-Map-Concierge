import React, { useState } from "react";
import RangeSlider from "react-bootstrap-range-slider";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import CustomQuestion from "./CustomQuestion";
import PresetQuestion from "./PresetQuestion";
import "../styles/DarkMode.css";
import "../styles/Sidebar.css";

const Sidebar = ({ address }) => {
  const [generatedText] = useState("");
  const [maxTokens] = useState(75);
  const [temperature, setTemperature] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showQuestions, setShowQuestionms] = useState(false);

  const handleToggleQuestions = () => {
    setShowQuestionms(!showQuestions);
  };

  const handleTemperatureChange = (e) => {
    setTemperature(parseFloat(e.target.value));
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const sidebarReturn = `sidebar-wrapper${isDarkMode ? " dark-mode" : ""}`;
  const darkModeButton = `btn-mode${isDarkMode ? " light" : " dark"}`;
  const helpfulAIMessage =
    "You are a helpful AI who is very familiar with this area:";

  return (
    <div className={sidebarReturn}>
      <button className={darkModeButton} onClick={handleToggleDarkMode}>
        {isDarkMode ? "🌝🌝🌝" : "🌚🌚🌚"}
      </button>
      <p className={isDarkMode ? "dark" : "light"}>{generatedText}</p>
      <hr />
      <p>
        <span className="title">Address: </span>
        <em>{address}</em>
      </p>
      <hr />
      <br />
      <button className="dropdown-question" onClick={handleToggleQuestions}>
        {showQuestions ? "⬆Hide⬆" : "⬇Show Preset Questions⬇"}
      </button>
      <br />
      <div className="custom-question-item">
        {showQuestions && (
          <div className="preset-questions-container">
            <div className="preset-questions-item">
              <PresetQuestion
                buttonText="What is there to do here?"
                prompt={`${helpfulAIMessage}: ${address} and recommend specific things to do around the neighborhood. Keep it very brief.`}
                maxTokens={maxTokens}
                temperature={temperature}
              />
            </div>
            <div className="preset-questions-item">
              <PresetQuestion
                buttonText="What is the weather like here?"
                prompt={`${helpfulAIMessage}: ${address} describe the weather in the area for each season. Keep it concise.`}
                maxTokens={maxTokens}
                temperature={temperature}
              />
            </div>
            <div className="preset-questions-item">
              <PresetQuestion
                buttonText="What is the Walk Score®?"
                prompt={`${helpfulAIMessage}: ${address} and tell them the Walk Score and explain what the score means. Then tell them the Transit Score, and Bike Score. Keep it concise.`}
                maxTokens={maxTokens}
                temperature={temperature}
              />
            </div>
            <div className="preset-questions-item">
              <PresetQuestion
                buttonText="What are the best restaurants?"
                prompt={`${helpfulAIMessage}: ${address} and briefly tell them the top 3 restaurants in the area. Keep it concise.`}
                maxTokens={maxTokens}
                temperature={temperature}
              />
            </div>
            <div className="preset-questions-item">
              <PresetQuestion
                buttonText="Recommendations for date night?"
                prompt={`${helpfulAIMessage}: ${address} and create the perfect date night for them specific to this location. Recommend a romantic restaurant, a nice activity, and a specific place to go if they want to stay out. Keep it concise.`}
                maxTokens={maxTokens}
                temperature={temperature}
              />
            </div>
          </div>
        )}
      </div>
      <br />
      <br /> <hr />
      <div className="slider">
        <p>
          <b>Response Unpredictablity</b> <em>{temperature}</em>
        </p>
        <RangeSlider
          value={temperature}
          min={0}
          max={10}
          step={0.1}
          onChange={handleTemperatureChange}
        />
      </div>
      <br /> <br />
      <h1 className="title-center">AiMessage</h1>
      <CustomQuestion
        prompt={`You are someone who knows a lot about this place:${address}. 
        ${prompt} This message comes from your friend. Be a helpful concierege. 
        If they refer to 'here' it is in reference to this place:${address}. 
        If you repeat the address, omit the city, state, country, and zip code.
        Keep your response short, but give examples.`}
        temperature={temperature}
        n={5}
      />
    </div>
  );
};

export default Sidebar;
