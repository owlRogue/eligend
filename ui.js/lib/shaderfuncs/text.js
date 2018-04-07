var UIExpression = require("../UIExpression.js") ;
var GenerateBuffer = require("../GenerateBuffer.js") ;

module.exports = {

	selector: "#text"

	, shader: function(uiobject,buff,next,generator,tpl){

		if( !uiobject.children )
		{
			if( uiobject.constructor===UIExpression )
			{
				buff.write( "buff.write("+uiobject.toString()+") \r\n" ) ;
			}
			else
			{
				buff.output( uiobject.raw ) ;
			}
		}
		else
		{
			for(var i=0;i<uiobject.children.length;i++)
			{
				if( uiobject.children[i].constructor===UIExpression )
				{
					buff.write( "buff.write("+uiobject.children[i].toString()+") \r\n" ) ;
				}
				else
				{
					buff.output( uiobject.children[i] ) ;
				}
			}
		}

		next() ;
	}

	, joinAsString: function(uiobject)
	{
		if( typeof uiobject.children=="undefined" )
		{
			if( uiobject.constructor===UIExpression )
			{
				return uiobject.toString() ;
			}
			else
			{
				return '"'+GenerateBuffer.prototype.escape( uiobject.raw )+'"' ;
			}
		}
		else
		{
			var code = "" ;

			for(var i=0;i<uiobject.children.length;i++)
			{
				if(code)
				{
					code+= " + " ;
				}
				if( uiobject.children[i].constructor===UIExpression )
				{
					code+= "("+uiobject.children[i].toString()+")" ;
				}
				else
				{
					code+= '"'+GenerateBuffer.prototype.escape( uiobject.raw )+'"' ;
				}
			}
		}
	}

} ;