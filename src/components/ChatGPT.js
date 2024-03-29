import axios from "axios";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const baseURL = "https://api.openai.com/v1";
const engine = "gpt-3.5-turbo-instruct";
const maxTokens = 200;
const numCompletions = 3;
const temperature = 0.5;

axios.defaults.headers.common["Authorization"] = `Bearer ${apiKey}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

const generateText = async (prompt) => {
  try {
    const response = await axios.post(
      `${baseURL}/engines/${engine}/completions`,
      {
        prompt: prompt,
        max_tokens: maxTokens,
        n: numCompletions,
        temperature: temperature,
      }
    );

    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    throw new Error("Error generating text");
  }
};

const getGeneratedText = async (address) => {
  const neighborhoodPrompt = `Pretend you are a friend who is very familiar with this area and neighborhood ${address} and recommend things to do around the neighborhood`;

  try {
    const response = await axios.post(
      `${baseURL}/engines/${engine}/completions`,
      {
        prompt: neighborhoodPrompt,
        max_tokens: maxTokens,
        n: numCompletions,
        stop: ".",
        echo: false,
      }
    );

    const generatedText = response.data.choices[0].text.trim();
    return generatedText;
  } catch (error) {
    console.error(error);
    throw new Error("Error generating text");
  }
};

export { generateText, getGeneratedText };
