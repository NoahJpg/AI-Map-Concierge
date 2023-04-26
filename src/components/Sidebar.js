import React from 'react';

const Sidebar = ({ address, lat, lng, getGeneratedText, generatedText }) => {
  return (
    <div className='sidebar-wrapper'>
      <h2>Marker Info</h2>
      <p>Address: {address}</p>
      <p>Latitude: {lat}</p>
      <p>Longitude: {lng}</p>
      <button onClick={() => getGeneratedText(address)}>Generate Text</button>
      {generatedText && <p>{generatedText}</p>}
    </div>
  );
};

export default Sidebar;
