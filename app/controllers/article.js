var fs = require('fs');
var path = require('path');

module.exports = function (req, res){
	var page = req.params.article;
	var id;
	page = page.split(/\.|\-/);
	for (var i in page)
		if ((/^\d+$/).test(page[i]))
			id = page[i];
	if (id && id > 0 && id < 71){
		var content = JSON.parse(fs.readFileSync(path.dirname(require.main.filename) + '/feeds/art_' + id + '.json', 'utf8'));
		res.render('../views/article', {text: content.text});
	} else
		res.render('../views/error');
}