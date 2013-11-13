var ContentHandler = require('./content');

module.exports = function(db,app) {
	var content = new ContentHandler(db);

	app.get('/',content.index);
};