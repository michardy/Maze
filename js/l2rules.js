var flicker = [1, 0.9, 0.9, 0.8, 0.8, 0.7, 0.7, 0.6, 0.6, 0.5, 0.5, 0.4, 0.4, 0.3, 0.3, 0.2, 0.2, 0.1, 0.1, 0, 0, 0.1, 0.1, 0.2, 0.3, 0.3, 0.3, 0.4, 0.4, 0.5, 0.5, 0.6, 0.7, 0.7, 0.7, 0.8, 0.8, 0.9, 0.9, 1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0, 0.1, 0.2, 0.3, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 0];
var lightO = false;
var flickpos = 0;
var blue = 1;
var ballLight = scene.getLightByID("ballLight");
var sun = scene.getLightByID("Sun");
var sunUp = false;
var upness = 0;

function rules(){
	if (inArea(cam.position, [-31.37777, 8.49659, -24.91884], [1.066, 1.066, 1.066]) && !(lightO)){
		lightO = true;
	} else if (inArea(cam.position, [-42.41933, 8.64509, -25.08034], [2, 2, 2])){
		scene.gravity = new BABYLON.Vector3(0, 0.7, 0);
	} else if (inArea(cam.position, [-42.41933, 160, -25.08034], [10, 10, 10])){
		level++;
		window.location.href = "/level"+level.toString()+".html";
	}
	if (lightO == true){
		light.intensity = flicker[flickpos];
		if (flickpos < 60){
			flickpos++;
		} else {
			ballLight.intensity = blue/10;
			if (blue < 10){
				blue++;
			}
		}
	}
	if (sunUp){
		upness++;
		sun.intensity = upness/100;
	}
}