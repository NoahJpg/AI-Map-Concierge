import axios from 'axios';

const apiKey = process.env.REACT_APP_BEST_TIME_DATA
const baseURL = 'https://besttime.app/api/v1/keys/'

const FootTrafficData = ({ data }) => {
  const getFootTrafficData = async (data) => {
    try {
      const response = await axios.post(
        (`${baseURL}${apiKey}`)
      );

      console.log("Data:", data);

      return response.data.choices[0].text;
    } catch (error) {
      console.error(error);
      throw new Error('Error generating text');
    }
  };

};

export { FootTrafficData };
