import React, { useState } from "react";
import { generateText } from "./ChatGPT";

const CustomQuestion = ({ prompt, maxTokens, temperature }) => {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState('');

  const handleUserInputSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await generateText(`${prompt}${userInput}?`, maxTokens, temperature);
    setGeneratedText(response);
    setIsLoading(false);
  }

  const handleUserInputChange = (e) => {
      setIsLoading(true);
      setUserInput(e.target.value);
      setIsLoading(false);
    };

    return (
      <div>
        <br />
        <form onSubmit={handleUserInputSubmit}>
          <input
            type="text"
            className="custom-question"
            placeholder="ask any question"
            onChange={handleUserInputChange}
            value={userInput} 
            required
          /> 
          <button onClick={handleUserInputSubmit} className="submit-button">send</button>
        </form>
        
        <br />
      <div className="generated-text">
        {isLoading ? (<p>Loading...</p>) : (<p>{generatedText}</p>)}
      </div>  
      </div>
    )
}

export default CustomQuestion;