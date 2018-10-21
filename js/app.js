var canvas = document.getElementById("canvas");
var engine = new BABYLON.Engine(canvas, true);

function createScene()
{
    var scene = new BABYLON.Scene(engine);

    var universalCamera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 2, new BABYLON.Vector3(0, 0, 0), scene);
    universalCamera.speed = 0.1;
    universalCamera.fov = .9;
    universalCamera.minZ = 0.01;
    universalCamera.setTarget(BABYLON.Vector3.Zero());
    universalCamera.position = new BABYLON.Vector3(0, 0, 2);
    universalCamera.rotation = new BABYLON.Vector3(0, -3.15, 0);
    scene.activeCamera = universalCamera;
    scene.activeCamera.attachControl(canvas);
    universalCamera.setPosition(new BABYLON.Vector3(0, 1.2, 2.5));

    // Place hemispherical light (no shadows)
    var hemiLight = new BABYLON.HemisphericLight("hemiLight",
						 new BABYLON.Vector3(0, 2, 2),
						 scene);
    // hemiLight.specularColor = new BABYLON.Color3(1, 1, 0);
    hemiLight.intensity = .5;
    hemiLight.specular = new BABYLON.Color3(0, 0, 0);
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
            subdivisions: 10
        },
        scene);
    ground.receiveShadows = true;

    // Place a ceiling
    var ceiling = new BABYLON.MeshBuilder.CreatePlane("cl",
        {
            width: width,
            height: depth,
            subdivisions: 10,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        }, scene);
    ceiling.setAbsolutePosition(new BABYLON.Vector3(0, height, 0));
    ceiling.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
    ceiling.receiveShadows = true;

    // Place a back drop
    var backWall = BABYLON.MeshBuilder.CreatePlane("backwall", {
        width: width,
        height: height,
        subdivisions: 10,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);
    backWall.setAbsolutePosition(new BABYLON.Vector3(0, heightDelta, -1 * depthDelta));
    backWall.receiveShadows = true;

    // Place the right wall
    var wall = BABYLON.MeshBuilder.CreatePlane("wall", {
        width: depth,
        height: height,
        subdivisions: 10,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);
    wall.setAbsolutePosition(new BABYLON.Vector3(-1 * widthDelta, heightDelta, 0));
    wall.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
    wall.receiveShadows = true;

    // Place the left wall
    var wall2 = BABYLON.MeshBuilder.CreatePlane("wall2", {
        width: depth,
        height: height,
        subdivisions: 10,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);
    wall2.setAbsolutePosition(new BABYLON.Vector3(widthDelta, heightDelta, 0));
    wall2.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
    wall2.receiveShadows = true;
}

function addPointLight(name, intensity, location, scene) {
    // Place point light (shadows)
    let light =  new BABYLON.PointLight(name, location, scene);
    light.intensity = intensity;
    light.specularColor = new BABYLON.Color3(1,1,0);
    light.diffuseColor = new BABYLON.Color3(1, 1, 0);
    return light;

}
var furnishings = [];

function addFurnishing(model, location, scene)
{
    BABYLON.SceneLoader.ImportMesh(
        "", model,"",scene,
        function (meshes, particles, skeletons) {
            const mesh = meshes[0];
            mesh.setPositionWithLocalVector(location);
            furnishings.push(mesh);
        });
}

function removeFurnishing(mesh, scene) {
    var index = furnishings.indexOf(mesh);
    if (index == -1) return;

    mesh.getChildMeshes().forEach(function(mesh) {
        scene.removeMesh(mesh);
    });
    furnishings.splice(index, 1);
}

/*
function addShadows(light) {
    let shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator.useBlurExponentialShadowMap = true;
    for (let mesh in furnishings) {
        shadowGenerator.addShadowCaster(mesh);
        shadowGenerator.getShadowMap().renderList.push(mesh);
    }
    return shadowGenerator
}*/

/*
function addGlowingOrb(scene) {

    var sph = new BABYLON.MeshBuilder.CreateSphere("lamp", {}, scene)
    sph.setAbsolutePosition(0, 1, 2);
    gl.addIncludedOnlyMesh(sph)
    return sph;

    var sun = BABYLON.Mesh.CreateSphere('sun', .25, .25, scene);
    sun.position = new BABYLON.Vector3(0, 1, 1);

    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 1, 1), scene);
    light.range = 150;
    light.parent = sun;
    light.intensity = .5;
    sun.position = new BABYLON.Vector3(0, 2, 2);

    var hl = new BABYLON.HighlightLayer("hg", scene);
    hl.innerGlow = false;
    hl.addMesh(sun, new BABYLON.Color3(.9, .9, .9));
    return light;
}*/


var scene = createScene();
// var orb = addGlowingOrb(scene);

var light = addPointLight("pointLight", .2, new BABYLON.Vector3(0, 2, 2), scene);
// Build 5 / 2.5 / 5 room
var room = buildRoom(5, 2.5, 5, scene);
addFurnishing("http://img.wfrcdn.com/docresources/37311/108/1089869.glb",
			  new BABYLON.Vector3(0,0,-2),
			  scene);
// var shad = addShadows(light);
// var shad = new BABYLON.ShadowGenerator(1024, light);
// shad.useBlurExponentialShadowMap = true;
// shad.addShadowCaster(sq);
// shad.getShadowMap().renderList.push(sq);


engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
