const app = require('./app');
const port = process.env.Port || 3000;
const server = app.listen(port,() => {
    console.log('connected to the server' + port);
})