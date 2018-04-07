
var Template = require("./Template.js") ;
var Parser = require("./Parser.js") ;
var Generator = require("./Generator.js") ;
var Class = require("occlass/lib/Class.js") ;

module.exports = Class.extend({
	ctor: function(templateClass,parser,generator)
	{
		this._caches = {} ;
		this._tempateclass = templateClass || Template ;
		this._parser = parser || Parser.singleton ;
		this._generator = generator || Generator.singleton ;
	}

	, cache: function(filename,from)
	{
		var filepath = this.resolve(filename,from||2) ;
		return this._caches[filepath];
	}

	, template: function(filename,callback,from)
	{
		try{
			var filepath = this.resolve(filename,from||2) ;
		}catch(err){
			callback && callback(err) ;
			return ;
		}

		// 建立 template 对象缓存
		if( !this._caches[filepath] )
		{
			this._caches[filepath] = new this._tempateclass( filepath, this._parser, this._generator ) ;
			var cache = false ;
		}
		else
		{
			var cache = true ;
		}

		this._caches[filepath].load(function(err,tpl){
			callback && callback(err,tpl,cache) ;
		}) ;

		return this._caches[filepath] ;
	}

	, resolve: function(filename,from)
	{
		if( filename && filename[0]=="." )
		{
			if(typeof from=="number"){
				var stackTrace = require('stack-trace') ;
				from = stackTrace.get()[from].getFileName() ;
			}

			var path = require('path') ;
			return path.resolve(from,filename) ;
		}

		else
		{
			return require.resolve(filename) ;
		}
	}
}) ;



module.exports.singleton = new module.exports ;

