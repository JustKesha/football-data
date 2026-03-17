const corsAnywhere = require('cors-anywhere');
const proxy = corsAnywhere.createServer({
  originWhitelist: [],
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2']
});

proxy.listen(8080, () => {
  console.log('CORS Anywhere proxy running on port 8080');
});