/* ------------------------------------------------------------------------- *\
	 						   ROUTES USERS
\* ------------------------------------------------------------------------- */

var User = require('../models/user.js');
var Mail = require('../models/mail.js');
var Auth = require('../middlewares/authorization.js');

module.exports 	= function(app) {

	app.get('/api/users', Auth.user.isAdministrator, User.findAll);

	app.get('/api/users/:id', Auth.user.isAdministrator, User.findById);

	app.post('/api/users', User.create);

	app.put('/api/users/:id', Auth.user.isAdministrator, User.update);

	app.delete('/api/users/:id', Auth.user.isAdministrator, User.delete);

	app.post('/api/mail', Mail.sendMail);

	app.put('/api/users/parcours/:id', Auth.user.hasAuthorization, User.addParcours);

	app.put('/api/users/searches/:id', Auth.user.hasAuthorization, User.addSearches);

	app.put('/api/users/favorites/:id', Auth.user.hasAuthorization, User.addFavorites);



};
