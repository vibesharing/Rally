/* ------------------------------------------------------------------------- *\
	 						   ROUTES USERS
\* ------------------------------------------------------------------------- */

var Parcour = require('../models/parcour.js');

module.exports 	= function(app) {

	app.get('/api/parcours', Parcour.findAll);

	app.get('/api/parcours/:id', Parcour.findById);

	app.post('/api/parcours', Parcour.create);

	app.put('/api/parcours/:id', Parcour.update);

	app.delete('/api/parcours/:id', Parcour.delete);

};
