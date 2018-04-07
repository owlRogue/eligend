var text = new require("./text.js") ;

module.exports = {

	selector: "foreach"

	, shader: function(uiobject,buff,next,generator,tpl){

		var forattr = uiobject.headTag.namedAttributes.for || uiobject.headTag.unamedAttributes[0] ;
		if( !forattr )
		{
			throw new Error("foreach 标签缺少 for 属性") ;
		}

		var forvar = text.joinAsString(forattr.text) ;
		var forvarname = "foreach_" + uiobject.id ;

		var varname = uiobject.headTag.namedAttributes["var"]?
			uiobject.headTag.namedAttributes["var"].text.raw: 'foreach_var_'+uiobject.id ;

		var keyname = uiobject.headTag.namedAttributes["key"]?
			uiobject.headTag.namedAttributes["key"].text.raw: 'foreach_key_'+uiobject.id ;

		forvarname = "$variables." + forvarname ;
		varname = "$variables." + varname ;
		keyname = "$variables." + keyname ;

		buff.write( "" ) ;
		buff.write( "// foreach loop's body ----------------------------------------" ) ;

		buff.write( forvarname+" = "+forvar+" ;" ) ;
		buff.write( "if("+forvarname+")" ) ;
		buff.write( "{" ) ;
		buff.indent(1) ;

		// loop body
		buff.write( "// for each body" ) ;
		buff.write( "function foreach_body_"+uiobject.id+"($variables)" ) ;
		buff.write( "{" ) ;
		buff.indent(1) ;
		buff.write( "with($variables){" ) ;
		buff.indent(1) ;
		generator.makeChildrenSync(uiobject,buff,tpl) ;
		buff.indent(-1) ;
		buff.write("}") ;
		buff.indent(-1) ;
		buff.write("}") ;

		// as array or string
		buff.write( "" ) ;
		buff.write( "// for each as array or string" ) ;
		buff.write( "if("+forvarname+".constructor===Array || "+forvarname+".constructor===String)" ) ;
		buff.write( "{" ) ;
		buff.indent(1) ;
		buff.write( "for("+keyname+"=0;"+keyname+"<"+forvarname+".length;"+keyname+"++)" ) ;
		buff.write( "{" ) ;
		buff.indent(1) ;
		buff.write( varname+" = "+forvarname+"["+keyname+"] ;" ) ;
		buff.write( "foreach_body_"+uiobject.id+" ($variables) ;" ) ;
		buff.indent(-1) ;
		buff.write( "}" ) ;
		buff.indent(-1) ;
		buff.write( "}" ) ;

		// as object
		buff.write( "" ) ;
		buff.write( "// for each as object" ) ;
		buff.write( "else" ) ;
		buff.write( "{" ) ;
		buff.indent(1) ;
		buff.write( "for("+keyname+" in "+forvarname+")" ) ;
		buff.write( "{" ) ;
		buff.indent(1) ;
		buff.write( varname+" = "+forvarname+"["+keyname+"] ;" ) ;
		buff.write( "foreach_body_"+uiobject.id+" ($variables) ;" ) ;
		buff.indent(-1) ;
		buff.write( "}" ) ;
		buff.indent(-1) ;
		buff.write( "}" ) ;

		buff.indent(-1) ;
		buff.write( "}" ) ;

	}

} ;