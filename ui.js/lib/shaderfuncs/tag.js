var shaderText = require("./text.js") ;
module.exports = {

	selector: "*"

	, shader: function(uiobject,buff,next,generator,tpl){

		buff.output("<") ;

		if(uiobject.tail){
			buff.output("/") ;
		}

		buff.output(uiobject.tagName) ;

		// 属性
		for(var i=0; i<uiobject.attributes.length; i++ )
		{
			// 属性前的空格
			buff.output( uiobject.attributes[i].whitespace ) ;

			// 名称
			if( uiobject.attributes[i].name )
			{
				buff.output(uiobject.attributes[i].name) ;
				buff.output("=") ;
			}

			// 属性值
			buff.output(uiobject.attributes[i].boundaryChar) ;
			generator.makeObjectSync(uiobject.attributes[i].text,buff,tpl) ;
			buff.output(uiobject.attributes[i].boundaryChar) ;
		}

		// 标签结束
		buff.output(uiobject.rawSlash) ;	// 斜线
		buff.output(">") ;

		next() ;
	}

} ;