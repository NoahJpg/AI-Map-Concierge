// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/score', 
//     createProxyMiddleware({
//       target: 'https://api.walkscore.com',
//       changeOrigin: true,
//       pathRewrite: {
//         '^/score': '/score',
//       },
//       onProxyReq: (proxyReq, req, res) => {
//         const { lat, lng, address } = req.query;
//         const apiKey = process.env.REACT_APP_WALKSCORE_KEY;
//         const qs = `?format=json&lat=${lat}&lon=${lng}&address=${address}&wsapikey=${apiKey}`;
//         proxyReq.path += qs;
//       }
//     })
//   );
// };
