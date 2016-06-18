var engine;
var canvas;
var scene;
var meshesColliderList = [];

//document.getElementById("viewport").requestPointerLock();

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
		BABYLON.SceneLoader.Load("maps/", "l1map_nav.babylon", engine, function (loadedScene){
		//BABYLON.SceneLoader.Load("Espilit/", "Espilit.babylon", engine, function (loadedScene) {
			scene = loadedScene;
			scene.enablePhysics(new BABYLON.Vector3(0, -10, 0), new BABYLON.OimoJSPlugin());
			scene.activeCamera.onCollide = function (colmesh){
				//console.log(colmesh.name)
				if (colmesh.name === "Sphere"){
					activeCamera.position = new BABYLON.Vector3(0,3.811,0)
				}
			}
            scene.executeWhenReady(function () {
                scene.activeCamera.attachControl(canvas);
                engine.runRenderLoop(function () {
                    scene.render();
                });
            });
        }, function (progress) {
            // To do: give progress feedback to user
		});
	}
}
