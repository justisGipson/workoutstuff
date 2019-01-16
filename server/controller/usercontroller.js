var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/user', (req, res) => {
    var username = req.body.user.username
    var password = req.body.user.password

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(password, 10)
    }).then(
        createSuccess = (user) => {
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        createError = (err) => {
            res.status(500).json({err: error})        
        }
    );
});

router.post('/login', (req, res) => {
    User.findOne({where: {username: req.body.user.username}}).then(
        function(user){
            if(user){
                bcrypt.compare(req.body.user.password, user.passwordhash, (err, matches) => {
                    if(matches) {
                        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: 'Success!',
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({error: 'Sign in failed'})
                    }
                });
            } else {
                res.status(500).send({error: 'Not Authorized'});
            }
        },
        function (err) {
            res.status(501).send({error: 'FAILED'})
        }
    );
});

module.exports = router;