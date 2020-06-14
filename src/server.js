require('dotenv').config({ path: 'config.env' });
require('./api/db/mongoose');
const http = require('http');
const { app } = require('./app');

const port = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(port, () => console.log(`Server Listening on PORT ${port}`));
