var GenerateBuffer = require("./GenerateBuffer.js") ;

module.exports = function()
{
	this._shaderFuncs = [] ;

	// 内置 shader
	this.registerShaderDefine(require("./shaderfuncs/if.js")) ;
	this.registerShaderDefine(require("./shaderfuncs/elseif.js")) ;
	this.registerShaderDefine(require("./shaderfuncs/else.js")) ;
	this.registerShaderDefine(require("./shaderfuncs/continue.js")) ;
	this.registerShaderDefine(require("./shaderfuncs/break.js")) ;
	this.registerShaderDefine(require("./shaderfuncs/include.js")) ;
	this.registerShaderDefine(require("./shaderfuncs/loop.js")) ;
	this.registerShaderDefine(require("./shaderfuncs/foreach.js")) ;
}

module.exports.prototype.registerShaderFunction = function(selector,shaderFunc)
{
	if(selector.constructor===Array)
	{
		for(var i=0;i<selector.length;i++)
		{
			this._shaderFuncs.push({
				selector: selector[i]
				, shader: shaderFunc
			}) ;
		}
	}
	else
	{
		this._shaderFuncs.push({
			selector: selector
			, shader: shaderFunc
		}) ;
	}
}

module.exports.prototype.registerShaderDefine = function(define)
{
	this.registerShaderFunction(define.selector,define.shader) ;
}

module.exports.prototype.makeSync = function(tpl,callback,buff,queue)
{
	// 连接内置 shader
	for(var i=0;i<this._shaderFuncs.length;i++)
	{
		this.applyShader(tpl,this._shaderFuncs[i]) ;
	}

	//
	buff = buff || new GenerateBuffer() ;

	if( typeof(buff.write)!=="function" || typeof(buff.toString)!=="function" ){
		throw new Error("RenderContext::render() 的参数 buff 对象必须提供 write() 和 toString() 方法。") ;
	}

	if(tpl.uiroot)
	{
		this.makeChildrenSync(tpl.uiroot,buff,tpl) ;
	}

	var funcbody = "try{\r\n"
					+ buff.toString()
					+ "\r\n\r\n}catch(e){\r\n"
					+ "\tvar err = new Error('模板文件中的表达式在渲染过程中抛出了异常，渲染过程终端') ;\r\n"
					+ "\terr.cause = e ;\r\n"
					+ "\tthrow err ;\r\n"
					+"}" ;
	return new Function('$model','buff','callback','require',funcbody) ;
}


module.exports.prototype.applyShader = function(tpl,shader)
{
	var eleLst = tpl.Sizzle(shader.selector,tpl.document) ;
	for(var l=0;l<eleLst.length;l++)
	{
		var uiobj = eleLst[l].rawObj ;
		if( !uiobj._shaders )
		{
			uiobj._shaders = [] ;
		}
		uiobj._shaders.push(shader.shader) ;
	}
}

module.exports.prototype.makeChildrenSync = function(uiobj,buff,tpl)
{
	if( uiobj.children && uiobj.children.constructor===Array )
	{
		for(var i=0;i<uiobj.children.length;i++)
		{
			this.makeObjectSync(uiobj.children[i],buff,tpl) ;
		}
	}
}


module.exports.prototype.makeObjectSync = function(uiobj,buff,tpl)
{
	var shader, shaderLst = [] ;

	// 按类型找shader
	if( this.constructor.uiobjectClassShaders[uiobj.type] )
	{
		shaderLst = shaderLst.concat( this.constructor.uiobjectClassShaders[uiobj.type] ) ;
	}

	// ui object 上的 shader
	if( uiobj._shaders )
	{
		shaderLst = shaderLst.concat(uiobj._shaders) ;
	}

	(function (){

		if(! (shader=shaderLst.pop()) )
		{
			// 结束
			return ;
		}

		shader(uiobj,buff,arguments.callee.bind(this),this,tpl) ;

	}).bind(this) () ;
}


var shaderNode = require("./shaderfuncs/node.js").shader ;
var shaderTag = require("./shaderfuncs/tag.js").shader ;
var shaderText = require("./shaderfuncs/text.js").shader ;
module.exports.uiobjectClassShaders = {
	"ElementNode": [ shaderNode ]
	, "ElementTag": [ shaderTag ]
	, "ElementText": [ shaderText ]
	, "ElementScript": [ shaderText ]
	, "ElementComment": [ shaderText ]
	, "UIExpression": [ shaderText ]
}



module.exports.singleton = new module.exports ;
