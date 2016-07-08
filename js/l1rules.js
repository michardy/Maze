function rules(){
	if (inArea(cam.position, [-0.47551,0,-13.67511], [3.5,2,3.5])&&nia){
		nia = false;
		if (curArea){
			curArea = 0;
		} else{
			curArea = 1;
		}
	}else if (inArea(cam.position, [11.7052, 0, 11.70054], [1.57, 2, 1.57])&&nia){
		nia = false;
		if (curArea){
			curArea = 0;
		} else{
			curArea = 1;
		}
	}else if (inArea(cam.position, [-10.94772, 0, 15.61968], [1.57, 2, 1.57])&&nia){
		nia = false;
		if (curArea){
			curArea = 0;
		} else{
			curArea = 2;
		}
	}else if (inArea(cam.position, [-0.09405, 0, 27.30731], [1.57, 2, 1.57])&&nia){
		nia = false;
		if (curArea){
			curArea = 0;
		} else{
			curArea = 2;
		}
	} else if (inArea(cam.position, [11.66021, -11.61588, 27.63989], [8, 2, 8])){
		level++;
		window.location.href = "/level"+level.toString()+".html";
	}else{
		nia = true;
	}
	if (curArea === 1){
		if (hWorkers){
			//console.log(repos);
			if (!repos){
				repos = enemy1.position;
			}
			//console.log("ask");
			trackingWorker.postMessage([enemy1.position, cam.position]);
		}
	}
	if (overlap(cam.position, enemy1.position, [1, 1, 1])||overlap(cam.position, enemy2.position, [1, 1, 1])){
		cam.position = new BABYLON.Vector3(0,3.811,0);
		cam.rotation = new BABYLON.Vector3(0.4615,-1.5708,0);
		enemy1.position = new BABYLON.Vector3(-7.2941,1,-13.8398);
		enemy2.position = new BABYLON.Vector3(-18.4464,1,15.517);
		curArea = 0;
	}
	if (curArea === 1){
		if (hWorkers){
			//console.log(repos);
			enemy1.position = repos;
			//console.log("use");
		} else {
			/*if (!nia){
				ot = new Date().getTime();
			}*/
			enemy1.position = gNextPoint(enemy1.position, cam.position);
		}
	}else if (curArea === 2){
		enemy2.position = gNextPoint(enemy2.position, cam.position);
	}
}