import React, { createContext, useState } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(null);

  const updateLocation = (location) => {
    setCurrentLocation(location);
  };

  return (
    <LocationContext.Provider value={{ currentLocation, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
