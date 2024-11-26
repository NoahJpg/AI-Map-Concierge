import React, { useState, useRef, useEffect } from "react";
import { generateText } from "./ChatGPT";
import "../styles/iMessage.css";

const Conversation = ({ messages, messagesEndRef }) => (
  <div className="conversation">
    {messages.map(({ text, isUser }, i) => (
      <div
        key={i}
        className={
          isUser ? "user-message message" : "generated-message message"
        }
      >
        {text}
      </div>
    ))}
    <div ref={messagesEndRef} />
  </div>
);

const CustomQuestion = ({ prompt, maxTokens, temperature }) => {
  const initialAIMessage =
    "I'm here to help you find places to eat, things to see, and help you discover more about where you are or where you want to go!";
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState([
    { text: initialAIMessage, isUser: false },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [conversation]);

  const handleUserInputSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setConversation([...conversation, { text: userInput, isUser: true }]);
    scrollToBottom();
    const response = await generateText(
      `${prompt}${userInput}?`,
      maxTokens,
      temperature
    );
    setConversation([
      ...conversation,
      { text: userInput, isUser: true },
      { text: response, isUser: false },
    ]);
    setUserInput("");
    setIsLoading(false);
    scrollToBottom();
  };

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="container">
      <div className="imessage">
        <Conversation messages={conversation} messagesEndRef={messagesEndRef} />
        {isLoading && <p className="loading-container">...</p>}
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
          <button
            onClick={handleUserInputSubmit}
            className="send-button imessage-send-button"
          >
            ⇧
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomQuestion;
