function Content(db,app) {
	this.index = function(req,res) {
		res.render('index.jade');
	}
}

module.exports = Content;