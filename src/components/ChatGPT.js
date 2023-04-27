import axios from 'axios';

const generateText = async (prompt) => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const model = 'text-davinci-003';
  const maxTokens = 0;
  const n = 1;
  const temperature = 0.5;
  
  const response = await axios.post('https://api.openai.com/v1/engines/' + model + '/completions', {
    prompt: prompt,
    max_tokens: maxTokens,
    n: n,
    temperature: temperature,
  }, {
    headers: {
      'Authorization': 'Bearer ' + apiKey,
      'Content-Type': 'application/json'
    }
  });

  return response.data.choices[0].text;
}

const getGeneratedText = async (address) => {
  const prompt = `What is the walk score of this neighborhood ${address}?`;
  const response = await axios.post("https://api.openai.com/v1/engines/davinci/completions", {
      prompt: prompt,
      max_tokens: 200,
      n: 1,
      stop: "."
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      }
    });
  const data = response.data;
  const generatedText = data.choices[0].text.trim();
  console.log("Gpt Text", generatedText);
  return generatedText;
};

export { generateText, getGeneratedText };
