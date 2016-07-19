/* ------------------------------------------------------------------------- *\
	 						   ROUTES USERS
\* ------------------------------------------------------------------------- */

var Comment = require('../models/comment.js');

module.exports 	= function(app) {

	app.get('/api/parcours', Comment.findAll);

	app.get('/api/parcours/:id', Comment.findById);

	app.post('/api/parcours', Comment.create);

	app.put('/api/parcours/:id', Comment.update);

	app.delete('/api/parcours/:id', Comment.delete);

};
