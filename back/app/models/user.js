var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: String,
  picture: String,
  isAdmin : { type: Boolean, default: false},
  favorites:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'parcour'
  }],
  searches:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'search'
  }],
  parcours:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'parcour'
  }],
  bio: String,
});


var User = {
    model: mongoose.model('User', userSchema),

    connect: function(req, res) {
        User.model.findOne(req.body, {password: 0}, function(err, user){
            if(err || !user)
                res.sendStatus(403);
            else{
                var token = jwt.sign(user, 'tokenSecret', {
                  expiresInMinutes: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                  success: true,
                  token: token
                });
            }
        });
	},
  findAll: function(req, res) {
  		User.model.find({}, {password: 0})
  		.populate('favorites')
  		.populate('searches')
      .populate('parcours')
  		.exec(function (err, users) {
  			console.log(users);
  			res.send(users);
  		});
  	},
    findById: function(req, res) {
    		User.model.findOne(req.params.id, {password: 0})
    		.populate('favorites')
    		.populate('searches')
        .populate('parcours')
        .exec(function(err, user){
			if (user){
			console.log(user);
				res.send(user);
			}
			else{
				res.send(err);
			}
		}
		);
	},



	create: function(req, res) {
		User.model.create(req.body,
        function(err, user) {
            if (!err)
                res.json(user);
            else{
                if (err.code === 11000 || err.code === 11001)
                    err.message = "Username " + req.body.name  + " already exist";

                res.status(500).send(err.message);
            }
	    });
	},

	update: function(req, res) {
		User.model.update({_id: req.params.id}, req.body, function(err, user) {
            console.log(user);
            if (err)
                res.status(500).send(err.message);
            res.json(user);
	    });
	},

	delete: function(req, res){
		User.model.findByIdAndRemove(req.params.id, function(err){
            if (err)
                res.status(500).send(err.message);
			res.sendStatus(200);
		})
	},
  addFavorites: function(req, res){
		User.model.findById(req.params.id, function(err, user){
				user.CCC.push(req.body.id_favorite);
				user.save();
				User.findById(req,res);
			});
	},
  addSearches: function(req, res){
		User.model.findById(req.params.id, function(err, user){
				user.CCC.push(req.body.id_search);
				user.save();
				User.findById(req,res);
			});
	},
  addParcours: function(req, res){
    User.model.findById(req.params.id, function(err, user){
        user.CCC.push(req.body.id_parcours);
        user.save();
        User.findById(req,res);
      });
  },

}


module.exports = User;
