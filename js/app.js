var canvas = document.getElementById("canvas");
var engine = new BABYLON.Engine(canvas, true);

function createScene()
{
    var scene = new BABYLON.Scene(engine);

    var universalCamera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 2, new BABYLON.Vector3(0, 0, 0), scene);
    universalCamera.speed = 0.1;
    universalCamera.fov = 1.2;
    universalCamera.minZ = 0.01;
    universalCamera.setTarget(BABYLON.Vector3.Zero());
    universalCamera.position = new BABYLON.Vector3(0, 0, 2);
    universalCamera.rotation = new BABYLON.Vector3(0, -3.15, 0);
    scene.activeCamera = universalCamera;
    scene.activeCamera.attachControl(canvas);
    universalCamera.setPosition(new BABYLON.Vector3(0, 1.2, 2.5));

    // Place hemispherical light (no shadows)
    var hemiLight = new BABYLON.HemisphericLight("hemiLight",
						 new BABYLON.Vector3(0, 1, 0),
						 scene);

    // Place point light (shadows)
    var light = new BABYLON.PointLight("pointlight",
				       new BABYLON.Vector3(-2.5, 4, 8),
				       scene);
    light.specular = new BABYLON.Color3(0, 1, 0);
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

    universalCamera.attachControl(canvas, true);

    // do something with the meshes and skeletons
    // particleSystems are always null for glTF assets

    return scene;
}

function buildRoom(width, height, depth, scene) {
    var widthDelta = width / 2;
    var heightDelta = height / 2;
    var depthDelta = depth / 2;

    // Place a floor
    var ground = new BABYLON.MeshBuilder.CreateGround("gd",
        {
            width: width,
            height: depth,
            subdivisions: 1
        },
        scene);
    ground.receiveShadows = true;

    // Place a back drop
    var backWall = BABYLON.MeshBuilder.CreatePlane("backwall", {
        width: width,
        height: height,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);
    backWall.setAbsolutePosition(new BABYLON.Vector3(0, heightDelta, -1 * depthDelta));
    backWall.receiveShadows = true;

    // Place the right wall
    var wall = BABYLON.MeshBuilder.CreatePlane("wall", {
        width: depth,
        height: height,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);
    wall.setAbsolutePosition(new BABYLON.Vector3(-1 * widthDelta, heightDelta, 0));
    wall.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
    wall.receiveShadows = true;

    // Place the left wall
    var wall2 = BABYLON.MeshBuilder.CreatePlane("wall2", {
        width: depth,
        height: height,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);
    wall2.setAbsolutePosition(new BABYLON.Vector3(widthDelta, heightDelta, 0));
    wall2.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
    wall2.receiveShadows = true;
}

var furnishings = []

function addFurnishing(model, location, scene)
{
    BABYLON.SceneLoader.ImportMesh(
	"", model,"",scene,
	function (meshes, particles, skeletons) {
	    var mesh = meshes[0];
	    mesh.setPositionWithLocalVector(location);
	    furnishings.push(mesh);
	});
    return furnishings[furnishings.length-1];
}

function removeFurnishing(mesh, scene) {
    // recursively delete specified furnishing
    if (mesh._children){
	mesh._children.forEach(function(child){
	    removeFurnishing(child);
	});
    }
    scene.removeMesh(mesh);
}


var scene = createScene();
// Build 5 / 2.5 / 5 room
var room = buildRoom(5, 2.5, 5, scene);
var chair = addFurnishing("http://img.wfrcdn.com/docresources/37311/108/1089869.glb",
			  new BABYLON.Vector3(0,0,0),
			  scene);


engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
