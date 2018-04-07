

var TemplateCaches = require("octemplate") ;
var RenderBuffer = require("octemplate/lib/RenderBuffer.js") ;
var ui = require("octemplate").singleton ;


var tpl = ui.template("octemplate/example/templates/template-a.html",function(err,tpl){
	if(err)
	{
		console.log(err.stack) ;
		console.log(err.toString()) ;
	}

	var model = {
		a: "a"
		, b: 'b'
		, c: 'c'
		, d: 'd'
		, x: 1000
		, i: 1
		, l: 0
		, arr: [1,2,3]
		, obj: {a:1,b:2,c:3}
	} ;

	tpl.render(model,function(err,buff){
		if(err)
		{
			console.log(err.message) ;
			console.log(err.stack) ;
		}
		console.log(buff.toString()) ;
	}) ;

//	test(model,new RenderBuffer,function(err,buff){
//		console.log(buff.toString()) ;
//	}) ;

}) ;



function test($model,buff,callback){

	var $variables = {};
	$variables.__proto__ = $model;
	function _$step_0(err)
	{
		if(err){ callback && callback(err) ; return ;}
		var $nextstep = _$step_last ;
		with($variables)
		{try{
			buff.write( "<div>a</div>\n\n<div>\n    <include file=\"octemplate/example/templates/template-b.html\" />\n</div>\n\n        <if \"\">\n            hi\n        </if>\n\n<div title=\"\" " );
			buff.write( i )

			buff.write( ">ccc</div>\n    " );
			buff.write( i )

			buff.write( "\n<div>dddd</div>\n\n<loop 10 var=i>\n    " );
			buff.write( i )

			buff.write( "\n</loop>\n\n\n<foreach \"\" var=\"v\" key=\"i\">\n    <foreach \"\" var=\"vv\" key=\"k\">\n        " );
			buff.write( i )

			buff.write( " : " );
			buff.write( v )

			buff.write( "\n        " );
			buff.write( k )

			buff.write( " : " );
			buff.write( vv )

			buff.write( "\n    </foreach>\n</foreach>" );


			$nextstep(null) ;
		}catch(err){
			callback && callback(err) ;
			return ;
		}}
	}

	function _$step_last(err)
	{
		callback && callback(err||$lasterr,buff) ;
	}
	_$step_0(null) ;
}


