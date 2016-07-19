var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var searchSchema = new mongoose.Schema({
  author:{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'POI'
	},
  category: Array,
  city: String,
  });

var Search = {
    model: mongoose.model('Search', searchSchema),


    findAll: function(req, res) {
		Search.model.find({}, {password: 0}, function (err, searchs) {
			res.json(searchs);
		});
	},

	findById: function(req, res) {
		Search.model.findById(req.params.id, {password: 0}, function (err, search) {
			 res.json(search);
		});
	},

	create: function(req, res) {
		Search.model.create(req.body,
        function(err, search) {
            if (!err)
                res.json(search);
            else{
                if (err.code === 11000 || err.code === 11001)
                    err.message = "Searchname " + req.body.name  + " already exist";

                res.status(500).send(err.message);
            }
	    });
	},

	update: function(req, res) {
		Search.model.update({_id: req.params.id}, req.body, function(err, search) {
            console.log(search);
            if (err)
                res.status(500).send(err.message);
            res.json(search);
	    });
	},

	delete: function(req, res){
		Search.model.findByIdAndRemove(req.params.id, function(err){
            if (err)
                res.status(500).send(err.message);
			res.sendStatus(200);
		})
	}
}


module.exports = Search;
