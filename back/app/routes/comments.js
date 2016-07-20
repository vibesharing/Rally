/* ------------------------------------------------------------------------- *\
	 						   ROUTES USERS
\* ------------------------------------------------------------------------- */

var Comment = require('../models/comment.js');

module.exports 	= function(app) {

	app.get('/api/comments', Comment.findAll);

	app.get('/api/comments/:id', Comment.findById);

	app.post('/api/comments', Comment.create);

	app.put('/api/comments/:id', Comment.update);

	app.delete('/api/comments/:id', Comment.delete);

};
