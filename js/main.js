var engine;
var canvas;
var scene;
var curArea;

canvas = document.getElementById("viewport");
canvas.requestPointerLock = canvas.requestPointerLock ||
                            canvas.mozRequestPointerLock;

document.addEventListener("DOMContentLoaded", startGame, false);
document.getElementById("viewport").addEventListener("click", function() {
  canvas.requestPointerLock();
}, false);

function inArea(pos, target, range){
	return(((((target[0]-range[0]) < pos['x']) && (pos['x'] < (target[0]+range[0])))||(((target[0]-range[0]) > pos['x'])&&(pos['x'] > (target[0]+range[0])))) && ((((target[1]-range[1]) < pos['y']) && (pos['y'] < (target[1]+range[1])))||(((target[1]-range[1]) > pos['y'])&&(pos['y'] > (target[1]+range[1])))) && ((((target[2]-range[2]) < pos['z']) && (pos['z'] < (target[2]+range[2])))||(((target[2]-range[2]) > pos['z'])&&(pos['z'] > (target[2]+range[2])))));
}

function overlap(pos, target, range){
	return(((((target['x']-range[0]) < pos['x']) && (pos['x'] < (target['x']+range[0])))||(((target['x']-range[0]) > pos['x'])&&(pos['x'] > (target['x']+range[0])))) && ((((target['y']-range[1]) < pos['y']) && (pos['y'] < (target['y']+range[1])))||(((target['y']-range[1]) > pos['y'])&&(pos['y'] > (target['y']+range[1])))) && ((((target['z']-range[2]) < pos['z']) && (pos['z'] < (target['z']+range[2])))||(((target['z']-range[2]) > pos['z'])&&(pos['z'] > (target['z']+range[2])))));
}

function gNextPoint(position, target){
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
	return(new BABYLON.Vector3(position['x']+x1,position['y'],position['z']+z1));
}

function startGame(){
	if(BABYLON.Engine.isSupported()){
		canvas = document.getElementById("viewport");
		console.log(canvas);
		engine = new BABYLON.Engine(canvas, true);
		engine.isPointerLock = true;
		window.addEventListener("resize", function () {
            engine.resize();
        });
		BABYLON.SceneLoader.Load("maps/", "l1map.babylon", engine, function (loadedScene){
			scene = loadedScene;
			scene.enablePhysics(new BABYLON.Vector3(0, -10, 0), new BABYLON.OimoJSPlugin());
			cam = scene.getCameraByID("Camera");
			light = scene.getLightByID("FlashLight");
			plane = scene.getMeshByID("Plane");
			pbox = scene.getMeshByID("pbox");
			enemy1 = scene.getMeshByID("Enemy");
			enemy2 = scene.getMeshByID("Enemy.001");
			//var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
			//shadowGenerator.getShadowMap().renderList.push(plane);
			light.parent = cam;
			pbox.parent = cam;
			scene.setActiveCameraByID("Camera");
			console.log(scene.activeCamera.name);
			scene.registerBeforeRender(function(){
				if (overlap(cam.position, enemy1.position, [1, 1, 1])||overlap(cam.position, enemy2.position, [1, 1, 1])){
					cam.position = new BABYLON.Vector3(0,3.811,0);
					enemy1.position = new BABYLON.Vector3(-7.2941,1,-13.8398);
					enemy2.position = new BABYLON.Vector3(-18.4464,1,15.517);
					curArea = 0;
				}
				if (inArea(cam.position, [-0.47551,0,-13.67511], [3.5,2,3.5])){
					if (curArea){
						curArea = 0;
					} else{
						curArea = 1;
					}
				}else if (inArea(cam.position, [11.7052, 0, 11.70054], [1.57, 2, 1.57])){
					if (curArea){
						curArea = 0;
					} else{
						curArea = 1;
					}
				}else if (inArea(cam.position, [-10.94772, 0, 15.61968], [1.57, 2, 1.57])){
					if (curArea){
						curArea = 0;
					} else{
						curArea = 2;
					}
				}else if (inArea(cam.position, [-0.09405, 0, 27.30731], [1.57, 2, 1.57])){
					if (curArea){
						curArea = 0;
					} else{
						curArea = 2;
					}
				}
				if (curArea === 1){
					enemy1.position = gNextPoint(enemy1.position, cam.position);
				}else if (curArea === 2){
					enemy2.position = gNextPoint(enemy2.position, cam.position);
				}
				
			});
            scene.executeWhenReady(function () {
                scene.activeCamera.attachControl(canvas);
				alert("Click on the game to enable pointer lock and hide your cursor.  ");
                engine.runRenderLoop(function () {
                    scene.render();
                });
            });
        }, function (progress) {
		});
	}
}
