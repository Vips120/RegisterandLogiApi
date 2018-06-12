const Mongoose = require('mongoose');
Mongoose.connect("mongodb://localhost/product")
.then(() => console.log('connection established'))
.catch(err => console.log('We got connection eror' + err));
