import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3500'
});
// axios will continue to use this URL as a base URL. We will need to change it later when we take this project live.

// npx json-server -p 3500 -w data/db.json;  
// -p: port, -w: watch