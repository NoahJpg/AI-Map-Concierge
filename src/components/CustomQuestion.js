import React, { useState } from "react";
import { generateText } from "./ChatGPT";
import "../styles/iMessage.css";

const Conversation = ({ messages }) => (
  <div className="conversation">
    {messages.map(({ text, isUser }, i) => (
      <div
        key={i}
        className={isUser ? "user-message message" : "generated-message message"}
      >
        {text}
      </div>
    ))}
  </div>
);


const CustomQuestion = ({ prompt, maxTokens, temperature }) => {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleUserInputSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await generateText(`${prompt}${userInput}?`, maxTokens, temperature);
    setConversation([
      ...conversation,
      { text: userInput, isUser: true },
      { text: response, isUser: false },
    ]);
    setGeneratedText(response);
    setUserInput("");
    setIsLoading(false);
  };

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="container">
      <div className="imessage">
        <Conversation messages={conversation} />
      </div>
      <div className="input-container">
        <form onSubmit={handleUserInputSubmit}>
          <input
            type="text"
            className="custom-question"
            placeholder="iMessage"
            onChange={handleUserInputChange}
            value={userInput}
            required
          />
          <button onClick={handleUserInputSubmit} className="send-button">
            Send
          </button>
        </form>
        <div className="loading-container">
          {isLoading && <p>...</p>}
        </div>
      </div>
    </div>
  );
};

export default CustomQuestion;
