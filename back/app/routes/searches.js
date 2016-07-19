/* ------------------------------------------------------------------------- *\
	 						   ROUTES USERS
\* ------------------------------------------------------------------------- */

var Search = require('../models/search.js');

module.exports 	= function(app) {

	app.get('/api/parcours', Search.findAll);

	app.get('/api/parcours/:id', Search.findById);

	app.post('/api/parcours', Search.create);

	app.put('/api/parcours/:id', Search.update);

	app.delete('/api/parcours/:id', Search.delete);

};
