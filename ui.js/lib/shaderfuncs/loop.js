var text = new require("./text.js") ;

module.exports = {

	selector: "loop"

	, shader: function(uiobject,buff,next,generator,tpl){


		var start = uiobject.headTag.namedAttributes["start"]?
			text.joinAsString(uiobject.headTag.namedAttributes["start"].text): '1' ;
		var step = uiobject.headTag.namedAttributes["step"]?
			text.joinAsString(uiobject.headTag.namedAttributes["step"].text): '1' ;

		var varname = uiobject.headTag.namedAttributes["var"]?
			uiobject.headTag.namedAttributes["var"].text.raw: 'loop_var_'+uiobject.id ;
		varname = "$variables."+varname ;


		var end = uiobject.headTag.namedAttributes.end || uiobject.headTag.unamedAttributes[0] ;
		if(!end)
		{
			throw new Error("loop 标签缺少必须的end属性") ;
		}
		end = text.joinAsString(end.text) ;

		buff.write("") ;
		buff.write("// loop") ;
		buff.write("for( "+varname+"=("+start+");"+varname+"<=("+end+");"+varname+"+=("+step+") )") ;
		buff.write("{") ;
		buff.indent(1) ;

		// loop body
		generator.makeChildrenSync(uiobject,buff,tpl) ;

		buff.indent(-1) ;
		buff.write("}") ;

	}

} ;