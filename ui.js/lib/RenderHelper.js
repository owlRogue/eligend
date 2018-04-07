module.exports = function(){}

module.exports.prototype.addslashes = function(string)
{
	if(!string)
	{
		return '' ;
	}
	return (typeof string=='string'? string: string.toString())
		.replace(/[\\"']/g, '\\$&')
		.replace(/\u0000/g, '\\0') ;
}

// singleton -----------
module.exports.singleton = function(){

	// 推迟到第一次访问的时候创建 singleton 对象
	// 避免在 “初始require链” 中过早创建对象
	if(!module.exports._singleton)
	{
		module.exports._singleton = new module.exports() ;
	}

	return module.exports._singleton ;
} ;
