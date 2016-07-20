/* ------------------------------------------------------------------------- *\
	 						   ROUTES USERS
\* ------------------------------------------------------------------------- */

var Search = require('../models/search.js');

module.exports 	= function(app) {

	app.get('/api/searches', Search.findAll);

	app.get('/api/searches/:id', Search.findById);

	app.post('/api/searches', Search.create);

	app.put('/api/searches/:id', Search.update);

	app.delete('/api/searches/:id', Search.delete);

};
