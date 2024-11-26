import React, { useState } from "react";
import RangeSlider from "react-bootstrap-range-slider";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import CustomQuestion from "./CustomQuestion";
import PresetQuestion from "./PresetQuestion";
import "../styles/DarkMode.css";
import "../styles/Sidebar.css";
import useShouldShowSidebar from "../hooks/useShouldShowSideBar";

const Sidebar = ({ address }) => {
  const [maxTokens] = useState(75);
  const [temperature, setTemperature] = useState(1);
  const [responseLength, setResponseLength] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  const handleToggleQuestions = () => {
    setShowQuestions(!showQuestions);
  };

  const handleTemperatureChange = (e) => {
    setTemperature(parseFloat(e.target.value));
  };

  const handleResponseLengthChange = (e) => {
    setResponseLength(parseFloat(e.target.value));
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const sidebarReturn = `sidebar-wrapper${isDarkMode ? " dark-mode" : ""}`;
  const darkModeButton = `btn-mode${isDarkMode ? " light" : " dark"}`;
  const helpfulAIMessage =
    "You are a helpful AI who is very familiar with this area:";

  const gptLengthExplanation = `The length of your response is based on a scale of 1-5. 1 being a few words. 2 being a sentence. And up to 5 being the longest. This is your length response this time: ${responseLength}`;

  const gptCustomQuestionQuery = `You are someone who knows a lot about this place:${address}. 
        ${prompt} This message comes from your friend. Be a helpful concierge. 
        If they refer to 'here' it is in reference to this place:${address}. 
        If you repeat the address, omit the city, state, country, and zip code.
        Keep your response short, but give examples. ${gptLengthExplanation}`;

  function getPresetQuestionsData(helpfulAIMessage, address) {
    return [
      {
        buttonText: "What is there to do here?",
        prompt: `${helpfulAIMessage}: ${address} and recommend specific things to do around the neighborhood. ${gptLengthExplanation}`,
      },
      {
        buttonText: "What is the weather like here?",
        prompt: `${helpfulAIMessage}: ${address} describe the weather in the area for each season. ${gptLengthExplanation}`,
      },
      {
        buttonText: "What is the Walk Score®?",
        prompt: `${helpfulAIMessage}: ${address} and tell them the Walk Score and explain what the score means. Then tell them the Transit Score, and Bike Score. ${gptLengthExplanation}`,
      },
      {
        buttonText: "What are the best restaurants?",
        prompt: `${helpfulAIMessage}: ${address} and briefly tell them the top 3 restaurants in the area. ${gptLengthExplanation}`,
      },
      {
        buttonText: "Recommendations for date night?",
        prompt: `${helpfulAIMessage}: ${address} and create the perfect date night for them specific to this location. Recommend a romantic restaurant, a nice activity, and a specific place to go if they want to stay out. ${gptLengthExplanation}`,
      },
    ];
  }

  const shouldShowSidebar = useShouldShowSidebar();

  return shouldShowSidebar ? (
    <div className={sidebarReturn}>
      <div className="button-container">
        <button className={darkModeButton} onClick={handleToggleDarkMode}>
          {isDarkMode ? "🌝🌝🌝" : "🌚🌚🌚"}
        </button>
        <button className="dropdown-question" onClick={handleToggleQuestions}>
          {showQuestions ? "⬆Hide⬆" : "⬇Show Preset Questions⬇"}
        </button>
      </div>
      <p className={isDarkMode ? "dark" : "light"}></p>
      <hr />
      <p>
        <span className="title">Address: </span>
        <em>{address ? address : "Loading..."}</em>
      </p>
      <hr />
      {showQuestions && (
        <div className="custom-question-item">
          <div className="preset-questions-container">
            {getPresetQuestionsData(helpfulAIMessage, address).map(
              ({ buttonText, prompt }, index) => (
                <div className="preset-questions-item" key={index}>
                  <PresetQuestion
                    buttonText={buttonText}
                    prompt={prompt}
                    maxTokens={maxTokens}
                    temperature={temperature}
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}
      <br />
      <br /> <hr />
      <div className="slider">
        <p>
          <b>Response Length:</b> <em>{responseLength}</em>
        </p>
        <RangeSlider
          value={responseLength}
          min={1}
          max={5}
          step={0.1}
          onChange={handleResponseLengthChange}
        />
      </div>
      <div className="slider">
        <p>
          <b>Response Randomness:</b> <em>{temperature}</em>
          <br />
          <br />
          <em>This changes how predictable the response will be</em>
        </p>
        <RangeSlider
          value={temperature}
          min={1}
          max={10}
          step={0.1}
          onChange={handleTemperatureChange}
        />
      </div>
      <br /> <br />
      <h1 className="title-center">AiMessage</h1>
      <CustomQuestion
        prompt={gptCustomQuestionQuery}
        temperature={temperature}
        n={5}
      />
    </div>
  ) : null;
};

export default Sidebar;
