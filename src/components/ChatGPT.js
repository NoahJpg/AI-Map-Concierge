import axios from 'axios';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const baseURL = 'https://api.openai.com/v1';
const engine = 'text-davinci-002';
const maxTokens = 100;
const numCompletions = 3;
const temperature = 0.5;

axios.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Generate text using OpenAI API
const generateText = async (prompt) => {
  try {
    const response = await axios.post(`${baseURL}/engines/${engine}/completions`, {
      prompt: prompt,
      max_tokens: maxTokens,
      n: numCompletions,
      temperature: temperature,
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    throw new Error('Error generating text');
  }
};

// Get generated text for a given address
const getGeneratedText = async (address) => {
  // Create a prompt for generating text
  const neighborhoodPrompt = `Pretend you are a friend who lives in this city ${address} and recommend things to do around the neighborhood`;

  try {
    const response = await axios.post(`${baseURL}/engines/${engine}/completions`, {
      prompt: neighborhoodPrompt,
      max_tokens: maxTokens,
      n: numCompletions,
      stop: '.',
      echo: false,
    });

    const generatedText = response.data.choices[0].text.trim();
    console.log("GPT Text:", generatedText);
    return generatedText;
  } catch (error) {
    console.error(error);
    throw new Error('Error generating text');
  }
};

export { generateText, getGeneratedText };
