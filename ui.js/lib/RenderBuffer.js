
var RenderBuffer = module.exports = function RenderBuffer(){
	this._buff = "" ;
}

RenderBuffer.prototype.write = function(string){
	this._buff+= string ;
}

RenderBuffer.prototype.toString = function(string){
	return this._buff ;
}
