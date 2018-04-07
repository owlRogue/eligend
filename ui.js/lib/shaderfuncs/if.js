var text = new require("./text.js") ;

module.exports = {

	selector: "if"

	, shader: function(uiobject,buff,next,generator,tpl)
	{
		if(!uiobject.headTag.unamedAttributes[0])
		{
			throw new Error("if 节点缺少条件属性") ;
		}

		var condition = text.joinAsString(uiobject.headTag.unamedAttributes[0].text) ;
		buff.write("if( " + condition + " ){" ) ;

		// 处理子元素
		buff.indent(1) ;
		generator.makeChildrenSync(uiobject,buff,tpl) ;
		buff.indent(-1) ;

		buff.write("}") ;
	}

} ;


