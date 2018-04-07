function testNoEval() {
	var startTime = new Date();
	var a = function(){
		var str = 'test';
	}
	for(var i=0; i<500000; i++) {
		a() ;
	}
	var endTime = new Date();
	console.log( arguments.callee.name+'() 耗时：' +  (endTime - startTime) + 'ms' );
}

function testEval() {
	var startTime = new Date();
	for(var i=0; i<500000; i++) {
		eval("var str = 'test';");
	}
	var endTime = new Date();
	console.log( arguments.callee.name+'() 耗时：' +  (endTime - startTime) + 'ms' );
}

function testNewFunction() {
	var startTime = new Date();
	var func = new Function("var str = 'test' ;") ;
	for(var i=0; i<500000; i++) {
		func() ;
	}
	var endTime = new Date();
	console.log( arguments.callee.name+'() 耗时：' +  (endTime - startTime) + 'ms' );
}

function testBindingEvals() {
	var startTime = new Date();
	var a = new (process.binding("evals").NodeScript)("var str = 'test';") ;
	//var ctx = a.createContext() ;
	for(var i=0; i<500000; i++) {
		a.runInThisContext() ;
	}
	var endTime = new Date();
	console.log( arguments.callee.name+'() 耗时：' +  (endTime - startTime) + 'ms' );
}



testEval() ;
testNoEval() ;
testNewFunction() ;
testBindingEvals() ;
