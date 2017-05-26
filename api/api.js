module.exports = function(val)
{
	var dict="0123456789abcdefghijklmnopqrstuvwqyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var count=parseInt(val);
	var res="";
	while(count){
		res=dict[(count%62)]+res;
		count=parseInt(count/62);
	}
	while(res.length<6)
	{
		res="0"+res;
	}
	return res;
}