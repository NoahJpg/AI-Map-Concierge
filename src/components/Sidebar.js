import React from 'react';
import { getGeneratedText } from './ChatGPT';

const Sidebar = ({ address, lat, lng, generatedText, setGeneratedText }) => {
  const handleGenerateText = async () => {
    const response = await getGeneratedText(address);
    setGeneratedText(response);
  };

  return (
    <div className='sidebar-wrapper'>
      <h2>Marker Info</h2>
      <p><span className='title'>Address: </span>{address}</p>
      <p><span className='title'>Latitude: </span>{lat}</p>
      <p><span className='title'>Longitude: </span>{lng}</p>
      <button onClick={handleGenerateText}>Generate Info About This Place</button>
      <br />
      <p>Response: </p>
      {generatedText && <p>{generatedText}</p>}

    </div>
  );
};

export default Sidebar;
