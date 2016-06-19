var engine;
var canvas;
var scene;

canvas = document.getElementById("viewport");
canvas.requestPointerLock = canvas.requestPointerLock ||
                            canvas.mozRequestPointerLock;

document.addEventListener("DOMContentLoaded", startGame, false);
document.getElementById("viewport").addEventListener("click", function() {
  canvas.requestPointerLock();
}, false);

function startGame(){
	if(BABYLON.Engine.isSupported()){
		canvas = document.getElementById("viewport");
		console.log(canvas);
		engine = new BABYLON.Engine(canvas, true);
		engine.isPointerLock = true;
		BABYLON.SceneLoader.Load("maps/", "l1map.babylon", engine, function (loadedScene){
			scene = loadedScene;
			scene.enablePhysics(new BABYLON.Vector3(0, -10, 0), new BABYLON.OimoJSPlugin());
			cam = scene.getCameraByID("Camera");
			light = scene.getLightByID("FlashLight");
			plane = scene.getMeshByID("Plane");
			pbox = scene.getMeshByID("pbox");
			//var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
			//shadowGenerator.getShadowMap().renderList.push(plane);
			light.parent = cam;
			pbox.parent = cam;
			scene.setActiveCameraByID("Camera");
			console.log(scene.activeCamera.name);
			pbox.onCollide = function (colmesh){
				if (colmesh.name === "Enemy"){
					activeCamera.position = new BABYLON.Vector3(0,3.811,0)
				}
			}
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
