var canvas = document.getElementById("canvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);

// ArcRotateCamera doc, you can use FreeCamera if you prefer:
// http://doc.babylonjs.com/api/classes/babylon.arcrotatecamera#constructor
var arcRotCam = new BABYLON.ArcRotateCamera(
    "arcRotateCamera", 1, 1, 4,
    new BABYLON.Vector3(0, 1, 0),
    scene
);
// Place hemispherical light (no shadows)
var hemiLight = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);

// Place point light (shadows)
// var pointLight = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 1, -1), scene);
var light = new BABYLON.PointLight("pointlight", new BABYLON.Vector3(-2500, 400, 800), scene);
//light.diffuse = new BABYLON.Color3(0, 1, 1);
light.specular = new BABYLON.Color3(0, 1, 0);
var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

// Place a floor
var ground = new BABYLON.MeshBuilder.CreateGround("gd", {width: 500, height: 500, subdivisions: 10}, scene);
ground.receiveShadows = true;

// Place a back drop
var backWall = BABYLON.MeshBuilder.CreatePlane("backwall", {
    width: 500,
    height: 500,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE
}, scene);
backWall.setAbsolutePosition(new BABYLON.Vector3(0, 0, -100));
backWall.receiveShadows = true;

// Place the right wall
var wall = BABYLON.MeshBuilder.CreatePlane("wall", {
    width: 500,
    height: 500,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE
}, scene);
wall.setAbsolutePosition(new BABYLON.Vector3(-200, 0, -100));
wall.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
wall.receiveShadows = true;

// Place the left wall
var wall2 = BABYLON.MeshBuilder.CreatePlane("wall2", {
    width: 500,
    height: 500,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE
}, scene);
wall2.setAbsolutePosition(new BABYLON.Vector3(200, 0, -100));
wall2.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
wall2.receiveShadows = true;

arcRotCam.attachControl(canvas, true);
// SceneLoader doc :
// http://doc.babylonjs.com/api/classes/babylon.sceneloader#append
/*
chair = BABYLON.SceneLoader.Append(
    "assets/chair/",
    "LOON3749_v6_LOD2.obj",
    scene
);*/

var chair = BABYLON.SceneLoader.ImportMesh(null, "assets/chair/", "LOON3749_v6_LOD2.obj", scene);
// do something with the meshes and skeletons
// particleSystems are always null for glTF assets

/*var cube = BABYLON.MeshBuilder.CreateBox('box', {size: 1});
cube.setAbsolutePosition(new BABYLON.Vector3(0, .5, 0));
shadowGenerator.addShadowCaster(cube);*/

engine.runRenderLoop(function () {
    scene.render();
});
window.addEventListener("resize", function () {
    engine.resize();
});
