import React, { useEffect, useState } from "react";
import { LocationContext  } from "./LocationContext";

const UserLocation = ({ onLocationButtonClick }) => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const getUserLocation = () => {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              resolve({ lat: latitude, lng: longitude });
            },
            (error) => {
              reject(error);
            }
          );
        } else {
          reject(new Error("Geolocation is not supported by this browser."));
        }
      });
    };

    getUserLocation()
      .then((location) => {
        setCurrentLocation(location);
      })
      .catch((error) => {
        console.error("Error fetching user location:", error);
      });
  }, []);

  const handleLocationButtonClick = () => {
    if (currentLocation) {
      onLocationButtonClick(currentLocation);
    }
  }

  return (
    <div>
      <button onClick={handleLocationButtonClick}>Find Your Location</button>
        {currentLocation && (
          <p>
            Current Location: {currentLocation.lat}, {currentLocation.lng}
          </p>
        )}
        
    </div>
  );
};

export default UserLocation;