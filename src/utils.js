// utils
var resourceHandler = function(handler) {
	return function(req, res) {
		handler(req, res)
			.then (function(response) { res.status(200).json(response); })
			.catch(function(error) { res.status(error.status || 500).json({error: error}); });
	};
};
var toJSON = function(data) {
	return data.map(function(item) {
		return csvJSON(item);
	});
};
var csvJSON = function(csv) {
	var lines=csv.split("\r"),
		result = [],
		headers=lines[0].split(",");
	for(var i=1;i<lines.length;i++){
		var obj = {},
			currentline=lines[i].split(",");
		for(var j=0;j<headers.length;j++){
			obj[headers[j]] = currentline[j];
		}
		result.push(obj);
	}
	return result;
};

module.exports = {
	resourceHandler: resourceHandler,
	toJSON: toJSON,
	csvJSON: csvJSON
};