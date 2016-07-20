var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
	},
  content: String,
  rating: Number,
  date: Date,
  });

var Comment = {
    model: mongoose.model('Comment', commentSchema),


		findAll: function(req, res) {
    		Comment.model.find({}, {password: 0})
    		.populate('author')
    		.exec(function (err, comments) {
    			console.log(comments);
    			res.send(comments);
    		});
    	},

			findById: function(req, res) {
					Comment.model.findOne(req.params.id, {
									password: 0
							})
							.populate('author')
							.exec(function(err, comment) {
									if (comment) {
											console.log(comment);
											res.send(comment);
									} else {
											res.send(err);
									}
							});
			},

	create: function(req, res) {
		Comment.model.create(req.body,
        function(err, comment) {
            if (!err)
                res.json(comment);
            else{
                if (err.code === 11000 || err.code === 11001)
                    err.message = "Commentname " + req.body.name  + " already exist";

                res.status(500).send(err.message);
            }
	    });
	},

	update: function(req, res) {
		Comment.model.update({_id: req.params.id}, req.body, function(err, comment) {
            console.log(comment);
            if (err)
                res.status(500).send(err.message);
            res.json(comment);
	    });
	},

	delete: function(req, res){
		Comment.model.findByIdAndRemove(req.params.id, function(err){
            if (err)
                res.status(500).send(err.message);
			res.sendStatus(200);
		});
	}
};


module.exports = Comment;
