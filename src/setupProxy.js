const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/score', 
    createProxyMiddleware({
      target: 'https://api.walkscore.com',
      changeOrigin: true,
      pathRewrite: {
        '^/score': '/score',
      },
      onProxyReq: (proxyReq, req, res) => {
        const { lat, lng } = req.query;
        const apiKey = process.env.REACT_APP_WALKSCORE_KEY;
        proxyReq.path += `?format=json&lat=${lat}&lon=${lng}&wsapikey=${apiKey}`;
      },
      headers: {
        'Access-Control-Allow-Origin': 'https://noahjpg.github.io/Livable',
      }
    })
  );
};
