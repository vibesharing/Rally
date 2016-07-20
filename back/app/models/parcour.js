var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var parcoursSchema = new mongoose.Schema({
  name: String,
  author:{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
	} ,
  duration: Number,
  category: Array,
  distance: Number,
  location: String,
  POIS:[{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'POI'
	}],
  comments:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment'
  }],
  });

var Parcours = {
    model: mongoose.model('Parcours', parcoursSchema),


    findAll: function(req, res) {
    		Parcours.model.find({}, {password: 0})
    		.populate('POIS')
        .populate('user')
    		.populate('comments')
    		.exec(function (err, parcours) {
    			console.log(parcours);
    			res.send(parcours);
    		});
    	},
      findById: function(req, res) {
          Parcours.model.findOne(req.params.id, {
                  password: 0
              })
              .populate('POIS')
              .populate('user')
          		.populate('comments')
              .exec(function(err, parcours) {
                  if (parcours) {
                      console.log(parcours);
                      res.send(parcours);
                  } else {
                      res.send(err);
                  }
              });
      },

	create: function(req, res) {
    console.log(req.body);
		Parcours.model.create(req.body,
        function(err, parcours) {
            if (!err)
                res.json(parcours);
            else{
                if (err.code === 11000 || err.code === 11001)
                    err.message = "Parcourssname " + req.body.name  + " already exist";

                res.status(500).send(err.message);
            }
	    });
	},

	update: function(req, res) {
		Parcours.model.update({_id: req.params.id}, req.body, function(err, parcours) {
            console.log(parcours);
            if (err)
                res.status(500).send(err.message);
            res.json(parcours);
	    });
	},

	delete: function(req, res){
		Parcours.model.findByIdAndRemove(req.params.id, function(err){
            if (err)
                res.status(500).send(err.message);
			res.sendStatus(200);
		});
	},
  addPOIS: function(req, res) {
      Parcours.model.findById(req.params.id, function(err, user) {
          user.POIS.push(req.body.id_);
          user.save();
          Parcours.findById(req, res);
      });
  },

  addcomments: function(req, res) {
      Parcours.model.findById(req.params.id, function(err, user) {
          user.comments.push(req.body.id_);
          user.save();
          Parcours.findById(req, res);
      });
  },
}


module.exports = Parcours;
