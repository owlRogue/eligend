

module.exports = function RenderBuffer(){
	this._code = "" ;
	this._code+= "" ;
	this._code+= "" ;
	this._output = "" ;
	this._indent = 1 ;
	this._stepcodes = [] ;

	// open new step
	this.closeStep() ;
}
module.exports.prototype.output = function(string){
	this._output+= string ;
}

module.exports.prototype.write = function(string,asline){
	this._useoutput() ;
	if(asline===undefined || asline)
	{
		for(var i=0;i<this._indent;i++)
		{
			this._code+= "\t"
		}
		this._code+= string+"\r\n" ;
	}
	else
	{
		this._code+= string ;
	}
}
module.exports.prototype.indent = function(lv){
	this._useoutput() ;
	this._indent+= (lv===undefined? 1: lv) ;
}
module.exports.prototype.toString = function(){
	return this.build() ;
}

module.exports.prototype.build = function()
{
	this.closeStep(true) ;

	var code = "var $variables = {};\r\n"
	code+= "$helper = this.helper ;\r\n" ;

	for(var i=0;i<this._stepcodes.length;i++)
	{
		code+= "function _$step_"+i+"(err)\r\n" ;
		code+= "{\r\n" ;
		code+= "	if(err){ _$step_last(err) ; return ;}\r\n" ;
		code+= "	var $nextstep = " + (i<this._stepcodes.length-1? ("_$step_"+(i+1)): "_$step_last") + " ;\r\n" ;
		code+= "	with($model){\r\n" ;
		code+= "	with($variables){\r\n" ;
		code+= "	try{\r\n" ;
		code+= this._stepcodes[i] ;
		code+= "	}catch(err){\r\n" ;
		code+= "		callback && callback(err) ;\r\n" ;
		code+= "		return ;\r\n" ;
		code+= "	}}}\r\n" ;
		code+= "}\r\n\r\n" ;
	}

	code+= "function _$step_last(err)\r\n";
	code+= "{\r\n";
	code+= "	callback && callback(err,buff) ;\r\n";
	code+= "}\r\n";

	if(this._stepcodes.length)
	{
		code+= "_$step_0(null) ;\r\n";
	}
	else
	{
		code+= "_$step_last(null) ;\r\n";
	}

	return code ;
}

module.exports.prototype._useoutput = function(){
	if(this._output)
	{
		var contents = this._output ;
		this._output = "" ;

		this.write( "buff.write( \""+ this.escape(contents) +"\" );",true) ;
	}
}

module.exports.prototype.escape = function(string){
	return string
		.replace(/[\\"']/g, '\\$&')
		.replace(/\u0000/g, '\\0')
		.replace(/\r/g, '\\r')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t') ;
}


module.exports.prototype.closeStep = function(nextAtOnce){

	this._useoutput() ;
	if(this._code)
	{
		if(nextAtOnce)
		{
			this.write("") ;
			this.write("") ;
			this.write("$nextstep(null) ;") ;
		}

		this._stepcodes.push(this._code) ;
	}

	this._code = "" ;
	this._indent = 2 ;
}