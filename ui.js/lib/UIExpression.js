module.exports = function(start,raw,code){

	code = code || raw.substr(2,raw.length-4) ;

	this.raw = raw ;
	this._start = start ;
	this._code = code ;
	this.length = raw.length ;
	this.type = "UIExpression" ;
}

module.exports.prototype.toString = function(){
	return this._code ;
}


