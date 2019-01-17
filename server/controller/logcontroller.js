var router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var LogModel = sequelize.import('../models/log');

router.post('/', (req, res) => {
    var owner = req.user.id;
    var logData = req.body.logData;

    LogModel.create({
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
        owner: req.body.owner
    })
    .then(
        createSuccess = (logdata) => {
            res.json({
                logdata: logdata
            });
        },
        createError = (err) => {
            res.send(500, err.message);
        }
    );
});

router.get('/', (req, res) => {
    var userid = req.user.id;

    LogModel.findAll({
        where: {owner: userid}
    })
    .then(findAllSuccess = (data) => {
        res.json(data);
    },
    findAllError = (err) => {
        res.send(500, err.message);
    }
    );
});

router.get('/:id', (req, res) => {
    var data = req.params.id;
    var userid = req.user.id;

    LogModel.findOne({
        where: {id: data, owner: userid}
    }).then(
        findOneSuccess = (data) => {
            res.json(data);
        },
        findOneError = (err) => {
            res.send(500, err.message);
        }
    );
});

router.put('/update/:id', (req, res) => {
    var data = req.params.id;
    var logdata = req.body;

    LogModel.update(
        logdata,
     {where: {id: data}} ).then(
        updateSuccess = (updatedLog) => {
            res.json({
                logdata: logdata
            });
        },
        updateError = (err) => {
            res.send(500, err.message);
        }
    )
});

router.delete('/delete/:id', (req, res) => {
    var data = req.params.id;
    var userid = req.user.id

    LogModel.destroy({
        where: {id: data, owner: userid}
    }).then(
        deleteLogSuccess = (data) => {
            res.send('you removed a log');
        },
        deleteLogError = (err) => {
            res.send(500, err.message);
        }
    );
});

module.exports = router;
