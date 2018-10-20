var canvas = document.getElementById("canvas");
var engine = new BABYLON.Engine(canvas, true);

function createScene()
{
    var scene = new BABYLON.Scene(engine);
    // ArcRotateCamera doc, you can use FreeCamera if you prefer:
    // http://doc.babylonjs.com/api/classes/babylon.arcrotatecamera#constructor
    var arcRotCam = new BABYLON.ArcRotateCamera(
	"arcRotateCamera", 1, 1, 4,
	new BABYLON.Vector3(0, 1, 0),
	scene
    );
    arcRotCam.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("Hemi",
					     new BABYLON.Vector3(0,1,0),
					     scene);

    // SceneLoader doc :
    // http://doc.babylonjs.com/api/classes/babylon.sceneloader#append
    BABYLON.SceneLoader.Append(
	"assets/",
	"chair.glb",
	scene
    );

    return scene;
}

var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
