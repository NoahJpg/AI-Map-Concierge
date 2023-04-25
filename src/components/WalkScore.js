import React, { useState, useEffect } from 'react';

function WalkScore(props) {
  const [walkScore, setWalkScore] = useState(null);

  useEffect(() => {
    const fetchWalkScore = async () => {
      try {
      const response = await fetch(`http://localhost:3000/score?format=json&lat=${props.lat}&lon=${props.lng}&wsapikey=${process.env.REACT_APP_WALKSCORE_KEY}`);
      const data = await response.json();
      console.log(data);
      setWalkScore(data.walkscore);
    } catch (error) {
      console.error("Error fetching WalkScore", error)
    }
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
