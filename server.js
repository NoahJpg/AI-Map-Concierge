const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");
const fetch = require("node-fetch").default;

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Proxy API requests to the WalkScore API
app.use("/score", async (req, res) => {
  const { lat, lng, address } = req.query;
  const apiKey = process.env.REACT_APP_WALKSCORE_KEY;
  const url = `https://api.walkscore.com/score?format=json&lat=${lat}&lon=${lng}&address=${address}&wsapikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    res.json(json);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving Walk Score data");
  }
});

// Handle all other requests by returning the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

import("node-fetch")
  .then((fetch) => {
    // use fetch here
  })
  .catch((err) => {
    // handle error here
  });
