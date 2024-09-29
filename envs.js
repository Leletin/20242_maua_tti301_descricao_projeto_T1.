const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  url: process.env.URL,
  apiKey: process.env.API_KEY
}