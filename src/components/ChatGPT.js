import axios from 'axios';
import isDarkMode from './Sidebar'

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const baseURL = 'https://api.openai.com/v1';
const engine = 'text-davinci-002';
const maxTokens = 100;
const n = 2;
const temperature = 0.5;


axios.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';


const generateText = async (prompt) => {
  try {
    const response = await axios.post(`${baseURL}/engines/${engine}/completions`, {
      prompt: prompt,
      max_tokens: maxTokens,
      n: n,
      temperature: temperature,
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    throw new Error('Error generating text');
  }
}

const getGeneratedText = async (address) => {
  const prompt = `Pretend you are a friend who lives in this city ${address} and recommend things to do around the neighborhood`;

  try {
    const response = await axios.post(`${baseURL}/engines/${engine}/completions`, {
      prompt: prompt,
      max_tokens: maxTokens,
      n: n,
      stop: '.',
      echo: false
    });

    const generatedText = response.data.choices[0].text.trim();
    console.log("Gpt Text", generatedText);
    return generatedText;
  } catch (error) {
    console.error(error);
    throw new Error('Error generating text');
  }
};

export { generateText, getGeneratedText };
