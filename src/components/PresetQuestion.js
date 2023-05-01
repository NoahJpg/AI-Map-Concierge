import React, { useState } from "react";
import { generateText } from "./ChatGPT";
import isDarkMode from './Sidebar'

const PresetQuestion = ({ buttonText, prompt, maxTokens, temperature }) => {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState('');

  const handleButtonSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await generateText(`${prompt}${userInput}`, maxTokens, temperature);
    setGeneratedText(response);
    setIsLoading(false);
  }

  return (
    <div className="answer">
      <br />
      <button onClick={handleButtonSubmit}>{buttonText}</button>
      <br />
      <div className='answer'>
        {isLoading ? (
          <p className={isDarkMode ? 'dark loading-bubble' : 'light loading-bubble'}>Loading...</p>
        ) : (
          <div className='generated-text'>
            <p className={isDarkMode ? 'dark' : 'light'}>{generatedText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PresetQuestion;