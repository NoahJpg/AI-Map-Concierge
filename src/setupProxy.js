const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app, props) {
  app.use(
    '/score', 
    createProxyMiddleware({
      target: 'https://api.walkscore.com',
      changeOrigin: true,
      pathRewrite: {
        '^/score': `/score?format=json&lat=${props.lat}&lon=${props.lng}&wsapikey=${process.env.REACT_APP_WALKSCORE_KEY}`
      },
      headers: {
        'Access-Control-Allow-Origin': 'https://noahjpg.github.io/Livable',
      }
    })
  );
};
