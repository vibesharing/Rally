var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var searchSchema = new mongoose.Schema({
  author:{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
	},
  category: Array,
  rangeTime: String,
	rangeKms: String,
	location: Object,
  });

var Search = {
    model: mongoose.model('Search', searchSchema),


		findAll: function(req, res) {
				Search.model.find({}, {password: 0})
				.populate('user')
				.exec(function (err, searches) {
					console.log(searches);
					res.send(searches);
				});
			},

			findById: function(req, res) {
					Search.model.findOne(req.params.id, {
									password: 0
							})
							.populate('user')
							.exec(function(err, search) {
									if (search) {
											console.log(search);
											res.send(search);
									} else {
											res.send(err);
									}
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
