var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'safe',
	database: 'reglamento',
	multipleStatements: true
});

module.exports = function(words, callback){
	pool.getConnection(function(err, connection){
		if (err){
			connection.release();
			throw err;
		}
		var words_select = '(';
		for (i in words){
			words_select += 'p.palabra = \'' + words[i] + '\'';
			if (i < words.length - 1)
				words_select += ' OR ';
		}
		words_select += ')';
		var query = 'SELECT a.id AS id FROM articulo a, articulo_palabra ap, palabra p WHERE a.id = ap.id_articulo AND ap.id_palabra = p.id AND ' + words_select + ' GROUP BY id ORDER BY SUM(ap.incidencias) DESC;';
		connection.query(query, function(err, rows){
			connection.release();
			if (err)
				throw err;
			callback(rows);
		});
	});
}