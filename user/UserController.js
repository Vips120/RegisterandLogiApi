const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
const User = require('./User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');


/** POST METHOD */

router.post('/Register', (req,res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password , 8);
  User.create({
      username: req.body.username,
      password: hashedPassword,
      useremail:req.body.useremail,
      address: req.body.address,
      userDetail: {
          firstname: req.body.firstname,
          lastname: req.body.lastname
      }
  }, (err,user) => {
    if(err){
       return res.status(500).send('There was a problem to register this user');
    }
    const token = jwt.sign({id: user._id}, config.secret,{
        expiresIn: 86400
    });
    res.status(200).send({auth: true, token: token});
  }

)
});


/***
 * 
 * Login METHOD
 */




router.post('/Login', function(req, res) {
    User.findOne({ useremail: req.body.useremail }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    });
  });
  









  /**
   * Token ID
   */



router.get('/me', function(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      User.findById(decoded.id, 
      { password: 0 }, // projection
      function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        // res.status(200).send(user); Comment this out!
        next(user); // add this line
      });
    });
  });









  // add the middleware function
  router.use(function (user, req, res, next) {
    res.status(200).send(user);
  });

  module.exports = router;