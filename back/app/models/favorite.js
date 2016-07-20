var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var favoriteSchema = new mongoose.Schema({
  Parcours:[{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Parcours'
	}],
  user:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
  }],
  });

var Favorite = {
    model: mongoose.model('Favorite', favoriteSchema),


		findAll: function(req, res) {
    		Favorite.model.find({}, {password: 0})
    		.populate('POIS')
    		.exec(function (err, favorites) {
    			console.log(favorites);
    			res.send(favorites);
    		});
    	},

			findById: function(req, res) {
					Favorite.model.findOne(req.params.id, {
									password: 0
							})
							.populate('author')
							.exec(function(err, favorite) {
									if (favorite) {
											console.log(favorite);
											res.send(favorite);
									} else {
											res.send(err);
									}
							});
			},

	create: function(req, res) {
		Favorite.model.create(req.body,
        function(err, favorite) {
            if (!err)
                res.json(favorite);
            else{
                if (err.code === 11000 || err.code === 11001)
                    err.message = "Favoritename " + req.body.name  + " already exist";

                res.status(500).send(err.message);
            }
	    });
	},

	update: function(req, res) {
		Favorite.model.update({_id: req.params.id}, req.body, function(err, favorite) {
            console.log(favorite);
            if (err)
                res.status(500).send(err.message);
            res.json(favorite);
	    });
	},

	delete: function(req, res){
		Favorite.model.findByIdAndRemove(req.params.id, function(err){
            if (err)
                res.status(500).send(err.message);
			res.sendStatus(200);
		})
	}
}


module.exports = Favorite;
