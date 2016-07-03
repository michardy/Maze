onmessage = function (m){
	//console.log("exec");
	position = m.data[0];
	target = m.data[1];
	var x = Math.abs(target['x']-position['x']);
	var z = Math.abs(target['z']-position['z']);
	var sx = (target['x']-position['x'])/x;
	var sz = (target['z']-position['z'])/z;
	if (isNaN(sx)){
		sx = 1;
	}
	if (isNaN(sz)){
		sz = 1;
	}
	var d = (x/z);
	var out1 = (-d+Math.sqrt(Math.pow(d,2)-(4*2*(-1-d))))/4;
	var out2 = (-d-Math.sqrt(Math.pow(d,2)-(4*2*(-1-d))))/4;
	if (out1 >= 0){
		var z1 = out1;
	}else if(out2 >= 0){
		var z1 = out2;
	}else{
		console.log("Object tracking error");
		return(position);
	}
	var x1 = d*z1;
	x1 = sx*x1;
	z1 = sz*z1;
	x1 = x1/50;
	z1 = z1/50;
	postMessage([position['x']+x1,position['y'],position['z']+z1]);
}