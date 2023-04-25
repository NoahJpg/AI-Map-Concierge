import React, { useState, useEffect } from 'react';

function WalkScore(props) {
  const [walkScore, setWalkScore] = useState(null);

  useEffect(() => {
    const fetchWalkScore = async () => {
      const response = await fetch
      (`https://cors-anywhere.herokuapp.com/`);

      const data = await response.json();
      setWalkScore(data.walkscore);
    };
    fetchWalkScore();
  }, [props.lat, props.lng]);

  useEffect(() => {
    console.log("Walk Score:", walkScore);
  }, [walkScore]);

  return (
    <div>
      {walkScore !== null ? (
        <p>Walk Score: {walkScore}</p>
      ) : (
        <p>Loading walk score...</p>
      )}
    </div>
  );
}

export default WalkScore;
