var text = new require("./text.js") ;

module.exports = {

	selector: "elseif"

	, shader: function(uiobject,buff,next,generator,tpl)
	{
		var condition = text.joinAsString(uiobject.headTag.unamedAttributes[0].text) || "(function(){ throw new Error('elseif 节点缺少条件属性') ;})()" ;
		buff.write("\r\n}elseif( " + condition + " ){" ) ;
	}

} ;


