var mongoose = require('mongoose');
var Tank = require('../model/TankModel');

exports.listTanks = function (req, res) {
  console.log('listTanks');
  Tank.find({}, 'uuid name iconId').then(
    (tanks) => {
      res.json(tanks);
    },
    (err) => {
      res.send(err);
    });
};

exports.getTank = function (req, res) {
  Tank.find({ uuid: 3 })
};

exports.monitor = function (req, res) {
  const { tankId } = req.params;
  const { action } = req.query;

  Tank.findOne({ uuid: tankId }).then(
    (tank) => {
      if (tank !== null) {

        if (action !== null) {
          Tank.updateOne({ uuid: tankId }, { actionCache: action });
        }
        res.json(tank);

      } else {
        res.status(404).send('No se encontró el ambiente.');
      }
    },
    (err) => {
      res.send(err);
    });
};

exports.updateTank = function (req, res) {
  const { tankId } = req.params;

  var updateData = {
    state: req.body.state
  };

  Tank.findOneAndUpdate({ uuid: tankId }, updateData, (err, tank) => {
    if (err) res.send(err);
    
    if (tank !== null) {
      res.json(tank);
    } else {
      res.status(404).send('No se encontró el ambiente.');
    }
  });
};