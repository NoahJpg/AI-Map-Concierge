// import React, { useState, useEffect } from 'react';

// function WalkScore(props) {
//   const [walkScore, setWalkScore] = useState(null);

//   useEffect(() => {
//     const fetchWalkScore = async () => {
//       try {
//         const response = await fetch(`http://api.walkscore.com/score?format=json&address=${props.address}&lat=${props.lat}&lon=${props.lng}&wsapikey=${process.env.REACT_APP_WALKSCORE_KEY}`)
        
//         const data = await response.json();

//         console.log("Walk Score data: ", data);
//         console.log("URL response:", response)
//         if (data && data.walkscore) {
//           setWalkScore(data.walkscore);
//         }
//     } catch (error) {
//         console.error("Error fetching WalkScore", error)
//     }
//     };
//     fetchWalkScore();
//   }, [props.lat, props.lng, props.address]);

//   useEffect(() => {
//     console.log("Walk Score:", walkScore);
//   }, [walkScore]);

//   return (
//     <div>
//       {walkScore !== null ? (
//         <p>Walk Score: {walkScore}</p>
//       ) : (
//         <p>Loading walk score...</p>
//       )}
//     </div>
//   );
// }

// export default WalkScore;
