var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var parcourSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  duration: String,
  category: Array,
  theme: Array,
  distance: String,
  POI: Array,
  isAdmin : { type: Boolean, default: false}
});

var Parcour = {
    model: mongoose.model('Parcour', parcourSchema),


    findAll: function(req, res) {
		Parcour.model.find({}, {password: 0}, function (err, parcours) {
			res.json(parcours);
		});
	},

	findById: function(req, res) {
		Parcour.model.findById(req.params.id, {password: 0}, function (err, parcour) {
			 res.json(parcour);
		});
	},

	create: function(req, res) {
		Parcour.model.create(req.body,
        function(err, parcour) {
            if (!err)
                res.json(parcour);
            else{
                if (err.code === 11000 || err.code === 11001)
                    err.message = "Parcourname " + req.body.name  + " already exist";

                res.status(500).send(err.message);
            }
	    });
	},

	update: function(req, res) {
		Parcour.model.update({_id: req.params.id}, req.body, function(err, parcour) {
            console.log(parcour);
            if (err)
                res.status(500).send(err.message);
            res.json(parcour);
	    });
	},

	delete: function(req, res){
		Parcour.model.findByIdAndRemove(req.params.id, function(err){
            if (err)
                res.status(500).send(err.message);
			res.sendStatus(200);
		})
	}
}


module.exports = Parcour;
