var shaderText = require("./text.js") ;
module.exports = {

	selector: "*"

	, shader: function(uiobject,buff,next,generator,tpl){

		// 处理头标签
		if( uiobject.headTag ){
			generator.makeObjectSync(uiobject.headTag,buff,tpl)
		}

		// 处理子元素
		generator.makeChildrenSync(uiobject,buff,tpl) ;

		// 处理尾标签
		if( uiobject.tailTag ){
			generator.makeObjectSync(uiobject.tailTag,buff,tpl) ;
		}

		next() ;
	}

} ;