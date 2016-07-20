/* ------------------------------------------------------------------------- *\
	 						   ROUTES USERS
\* ------------------------------------------------------------------------- */

var Parcours = require('../models/parcour.js');

module.exports 	= function(app) {

	app.get('/api/parcours', Parcours.findAll);

	app.get('/api/parcours/:id', Parcours.findById);

	app.post('/api/parcours', Parcours.create);

	app.put('/api/parcours/:id', Parcours.update);

	app.delete('/api/parcours/:id', Parcours.delete);

	app.put('/api/parcours/POIS/:id',  Parcours.addPOIS);

	app.put('/api/parcours/comments/:id', Parcours.addcomments);


};
