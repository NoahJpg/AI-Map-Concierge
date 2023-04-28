import React, { useState } from "react";
import { generateText, generatedText } from "./ChatGPT";

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
      <div>
        <br />
          <button onClick={handleButtonSubmit}>{buttonText}</button>
        <br />
        {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>{generatedText}</p>
      )}
      </div>
    )
}

export default PresetQuestion;