import React, { useState } from "react";
import { generateText, generatedText, setIsLoading, IsLoading } from "./ChatGPT";

const CustomQuestion = ({ buttonText, prompt, maxTokens, temperature }) => {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState('');

  const handleUserInputSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await generateText(`${prompt}${userInput}`, maxTokens, temperature);
    setGeneratedText(response);
    setIsLoading(false);
  }

  const handleUserInputChange = (e) => {
      setUserInput(e.target.value);
    };

    return (
      <div>
        
        <br />
        <form onSubmit={handleUserInputSubmit}>
          <input
            type="text"
            placeholder="ask a question"
            onChange={handleUserInputChange}
            value={userInput} 
          /> 
          &nbsp;&nbsp;
          <button onClick={handleUserInputSubmit}>submit</button>
        </form>
        
        <br />
        {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>{generatedText}</p>
      )}


      </div>
    )
}

export default CustomQuestion;