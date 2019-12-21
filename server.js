/*
 ** Node JS Core mudule dependences
 */
const http = require('http');

const { app } = require('./app'); //impoted the app.js 

const port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port, () => console.log(`Server Listening on PORT ${port}`));