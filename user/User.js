const Mongoose = require('mongoose');
const UserSchema = new Mongoose.Schema({

    username: String,
    password: String,
    useremail: String,
    address: String,
    userDetail: {
        firstname: String,
        lastname: String
}
});

Mongoose.model('User', UserSchema);
module.exports = Mongoose.model('User');