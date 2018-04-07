var RenderBuffer = require("./RenderBuffer.js") ;
var Generator = require("./Generator.js") ;
var Parser = require("./Parser.js") ;
var RenderHelper = require("./RenderHelper.js") ;
var Class = require("occlass/lib/Class.js") ;

var Template = module.exports = Class.extend({

	ctor: function(path,parser,generator)
	{
		this.filePath = path ;
		this.fileContent = null ;
		this.document = null ;
		this.uiroot = null ;
		this.parser = parser || Parser.singleton ;
		this.generator = generator || Generator.singleton ;
		this.renderer = null ;
		this.helper = RenderHelper.singleton() ;
		// this.uiObjectShaders = new UIObjectShaders(this.uiObjectPool) ;

		this.loaded = false ;
		this.loading = false ;
		this.loadCallbacks = [] ;

		this._id = Template._assigned_id ++ ;
	}

	, load: function(callback,parser)
	{
		// 加载、分析 模板
		if(!this.loaded)
		{
			var tpl = this ;

			if(callback)
			{
				this.loadCallbacks.push(callback) ;
			}

			if(!this.loading)
			{
				this.loading = true ;

				this._readTemplateFile(function(err,buff){

					if(err)
					{
						tpl._loadDone(err) ;
						return ;
					}

					tpl.fileContent = buff ;

					try{
						(parser||tpl.parser).parseSync(tpl) ;
					} catch(e) {
						tpl._loadDone(e) ;
					}

					tpl._loadDone(null) ;
				}) ;
			}
		}

		//
		else
		{
			if(callback)
			{
				callback(null,this) ;
			}
		}

		return this ;
	}

	, _readTemplateFile: function(callback){
		var fs = require("fs") ;
		var tpl = this ;
		fs.stat(this.filePath,function(err,stat){
			if(err)
			{
				callback(err) ;
				return ;
			}
			tpl.mtime = stat.mtime ;
			fs.readFile(tpl.filePath,callback);
		}) ;
	}

	, _loadDone: function(err){

		var tpl = this ;

		this.loaded = true ;
		this.loading = false ;

		for(var i=0;i<this.loadCallbacks.length;i++)
		{
			(function(callback){

				// 异步回调
				process.nextTick(function(){
					callback(err,tpl) ;
				});

			})(this.loadCallbacks[i]) ;
		}

		// 清理回调函数
		this.loadCallbacks = [] ;
	}

	, hasLoaded: function() {
		return this.loaded ;
	}

	, compile: function(generator)
	{
		this.renderer = (generator || this.generator).makeSync(this) ;
	}

	, render: function(model,callback,buff)
	{
		if( !this.renderer )
		{
			this.compile(null) ;
		}

		this.renderer( model, buff||new RenderBuffer, callback, require ) ;
	}

	, hasParsed: function() {
		return this.uitree!==null ;
	}
	, hasCompiled: function() {
		return this.renderer!==null ;
	}

	, exportRenderer: function()
	{
		return this.renderer? this.renderer.toString(): '' ;
	}

	, reset: function()
	{
		// 不能在 loading 的时候 调用reset()
		if(this.loading)
		{
			return this ;
		}

		this.fileContent = null ;
		this.document = null ;
		this.uiroot = null ;
		this.renderer = null ;

		this.loaded = false ;
		this.loading = false ;

		return this ;
	}

	, watching: function()
	{
		if(this._watcher)
		{
			return ;
		}
		this.load((function(){

			var fs = require("fs") ;
			this._watcher = fs.watchFile(this.filePath,(function(){
				console.log('['+(new Date).toISOString()+"] Template file has changed,auto reload it:") ;
				console.log('    '+this.filePath) ;
				this.reset().load() ;
			}).bind(this)) ;

		}).bind(this)) ;
	}

	, checkModify: function()
	{
		var fs = require("fs") ;
		var stat = fs.statSync(this.filePath) ;
		return new Date(stat.mtime()) > new Date(this.mtime) ;
	}
}) ;


Template._assigned_id = 0 ;




////////
var _TemplateElementNode = function (ele){
	this.tagName = ele._tagName ;
	//this.single = single || false ;
	this.attributes = {} ;
	this.children = [] ;

	// attribute
	for(var i=0;i<ele._attributes.length;i++)
	{
		this.attributes[ele.attributes[i].name] = ele.attributes[i].value
	}
}

var _TemplateElementText = function (ele){
	this.text = ele.nodeValue ;
}

