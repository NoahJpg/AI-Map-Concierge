import { useState } from 'react';

export const useAddress = () => {
  const [address, setAddress] = useState(null);

  const getAddressFromLatLong = async (lat, lng) => {
    const apiKey = process.env.REACT_APP_GMAP_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length > 0) {
        const address = data.results[0].formatted_address;
        setAddress(address);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { address, getAddressFromLatLong };
};
