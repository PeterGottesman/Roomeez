var canvas = document.getElementById("canvas");
var engine = new BABYLON.Engine(canvas, true);

var client = algoliasearch("D02UAI4X7Z", "0e65f8d6c291cf064313d4de6f5dd9eb");
var index = client.initIndex("models");

renderer = new BABYLON.Engine(canvas, true);

canvas.style.width = '100%';
canvas.style.height = '90%';

function createScene() {
    var scene = new BABYLON.Scene(engine);
    return scene;
}

function makeCamera(scene) {
    var universalCamera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 2, new BABYLON.Vector3(0, 0, 0), scene);
    universalCamera.speed = 0.1;
    universalCamera.fov = 1.0;
    universalCamera.minZ = 0.01;
    universalCamera.setTarget(BABYLON.Vector3.Zero());
    universalCamera.position = new BABYLON.Vector3(0, 0, 2);
    universalCamera.rotation = new BABYLON.Vector3(0, -3.15, 0);
    scene.activeCamera = universalCamera;
    scene.activeCamera.attachControl(canvas);
    universalCamera.setPosition(new BABYLON.Vector3(0, 1.2, 2.5));
    return universalCamera;
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
    /*
    var ceiling = new BABYLON.MeshBuilder.CreatePlane("cl",
        {
            width: width,
            height: depth,
            subdivisions: 10,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        }, scene);
    ceiling.setAbsolutePosition(new BABYLON.Vector3(0, height, 0));
    ceiling.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
    ceiling.receiveShadows = true;*/

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

    //Attach Texture to Ground
    var scale = 5.0;

    /*
    var lhCOLOR = "assets\\Light_Hardwood\\Wood_Floor_006_COLOR.jpg";
    var lhOCC = "assets\\Light_Hardwood\\Wood_Floor_006_OCC.jpg";
    var lhNORM = "assets\\Light_Hardwood\\Wood_Floor_006_NORM.jpg";
    var lhROUGH =   "assets\\Light_Hardwood\\Wood_Floor_006_ROUGH.jpg";
    var mat0 = new BABYLON.StandardMaterial(ground, scene);
    mat0.diffuseTexture = new BABYLON.Texture(lhCOLOR, scene);
    mat0.diffuseTexture.uScale = scale;
    mat0.diffuseTexture.vScale = scale;
    mat0.ambientTexture = new BABYLON.Texture(lhOCC, scene);
    mat0.ambientTexture.uScale = scale;
    mat0.ambientTexture.vScale = scale;
    mat0.bumpTexture = new BABYLON.Texture(lhNORM, scene);
    mat0.bumpTexture.uScale = scale;
    mat0.bumpTexture.vScale = scale;
    mat0.metallicRoughnessTexture = new BABYLON.Texture(lhROUGH, scene);
    mat0.metallicRoughnessTexture.uScale = scale;
    mat0.metallicRoughnessTexture.vScale = scale;
    mat0.specularPower = 400.0;
    ground.material = mat0;*/

//Attach Texture to Walls

    /*var mat1 = new BABYLON.StandardMaterial(backWall, scene);
    mat1.diffuseTexture = new BABYLON.Texture("assets\\Wallpaper\\Wallpaper_001_COLOR.jpg", scene);
    mat1.diffuseTexture.uScale = scale;
    mat1.diffuseTexture.vScale = scale;
    mat1.bumpTexture = new BABYLON.Texture("assets\\Wallpaper\\Wallpaper_001_NRM.jpg", scene);
    mat1.bumpTexture.uScale = scale;
    mat1.bumpTexture.vScale = scale;
    mat1.ambientTexture = new BABYLON.Texture("assets\\Wallpaper\\Wallpaper_001_OCC.jpg", scene);
    mat1.ambientTexture.uScale = scale;
    mat1.ambientTexture.vScale = scale;
    mat1.specularTexture = new BABYLON.Texture("assets\\Wallpaper\\Wallpaper_001_SPEC.jpg", scene);
    mat1.specularTexture = scale;
    mat1.specularTexture = scale;*/

    /*var mat1 = new BABYLON.StandardMaterial(backWall, scene);
    mat1.diffuseTexture = new BABYLON.Texture("assets\\Graffiti_Wall\\Old_Graffiti_Wall_001_COLOR.jpg", scene);
    mat1.diffuseTexture.uScale = scale;
    mat1.diffuseTexture.vScale = scale;
    mat1.bumpTexture = new BABYLON.Texture("assets\\Graffiti_Wall\\Old_Graffiti_Wall_001_NORM.jpg", scene);
    mat1.bumpTexture.uScale = scale;
    mat1.bumpTexture.vScale = scale;
    mat1.ambientTexture = new BABYLON.Texture("assets\\Graffiti_Wall\\Old_Graffiti_Wall_001_OCC.jpg", scene);
    mat1.ambientTexture.uScale = scale;
    mat1.ambientTexture.vScale = scale;
    mat1.metallicRoughnessTexture = new BABYLON.Texture("assets\\Graffiti_Wall\\Old_Graffiti_Wall_001_ROUGH.jpg", scene);
    mat1.metallicRoughnessTexture = scale;
    mat1.metallicRoughnessTexture = scale;
    mat1.specularPower = 100000.0;*/

    var mat1 = new BABYLON.StandardMaterial(backWall, scene);
    mat1.diffuseTexture = new BABYLON.Texture("assets\\Plaster\\Plaster_002_COLOR.jpg", scene);
    mat1.diffuseTexture.uScale = scale;
    mat1.diffuseTexture.vScale = scale;
    mat1.bumpTexture = new BABYLON.Texture("assets\\Plaster\\Plaster_002_NORM.jpg", scene);
    mat1.bumpTexture.uScale = scale;
    mat1.bumpTexture.vScale = scale;
    mat1.ambientTexture = new BABYLON.Texture("assets\\Plaster\\Plaster_002_OCC.jpg", scene);
    mat1.ambientTexture.uScale = scale;
    mat1.ambientTexture.vScale = scale;
    mat1.metallicRoughnessTexture = new BABYLON.Texture("assets\\Plaster\\Plaster_002_ROUGH.jpg", scene);
    mat1.metallicRoughnessTexture = scale;
    mat1.metallicRoughnessTexture = scale;
    mat1.specularPower = 400.0;

    // ceiling.material = mat1;


    var dhCOLOR = "assets\\Dark_Hardwood\\Wood_Floor_007_COLOR.jpg";
    var dhNORM = "assets\\Dark_Hardwood\\Wood_Floor_007_OCC.jpg";
    var dhOCC = "assets\\Dark_Hardwood\\Wood_Floor_007_NORM.jpg";
    var dhROUGH = "assets\\Dark_Hardwood\\Wood_Floor_007_ROUGH.jpg";

    var mat0 = new BABYLON.StandardMaterial(ground, scene);
    mat0.diffuseTexture = new BABYLON.Texture(dhCOLOR, scene);
    mat0.diffuseTexture.uScale = scale;
    mat0.diffuseTexture.vScale = scale;
    mat0.ambientTexture = new BABYLON.Texture(dhNORM, scene);
    mat0.ambientTexture.uScale = scale;
    mat0.ambientTexture.vScale = scale;
    mat0.bumpTexture = new BABYLON.Texture(dhOCC, scene);
    mat0.bumpTexture.uScale = scale;
    mat0.bumpTexture.vScale = scale;
    mat0.metallicRoughnessTexture = new BABYLON.Texture(dhROUGH, scene);
    mat0.metallicRoughnessTexture.uScale = scale;
    mat0.metallicRoughnessTexture.vScale = scale;
    mat0.specularPower = 800.0;
    ground.material = mat0;

    var cCOLOR = "assets\\Concrete\\Concrete_011_COLOR.jpg";
    var cNORM = "assets\\Concrete\\Concrete_011_NORM.jpg";
    var cOCC = "assets\\Concrete\\Concrete_011_OCC.jpg";
    var cROUGH = "assets\\Concrete\\Concrete_011_ROUGH.jpg";

    var mat3 = new BABYLON.StandardMaterial(backWall, scene);
    mat3.diffuseTexture = new BABYLON.Texture(cCOLOR, scene);
    mat3.diffuseTexture.uScale = scale;
    mat3.diffuseTexture.vScale = scale;
    mat3.bumpTexture = new BABYLON.Texture(cNORM, scene);
    mat3.bumpTexture.uScale = scale;
    mat3.bumpTexture.vScale = scale;
    mat3.ambientTexture = new BABYLON.Texture(cOCC, scene);
    mat3.ambientTexture.uScale = scale;
    mat3.ambientTexture.vScale = scale;
    mat3.metallicRoughnessTexture = new BABYLON.Texture(cROUGH, scene);
    mat3.metallicRoughnessTexture = scale;
    mat3.metallicRoughnessTexture = scale;
    mat3.specularPower = 400.0;
    wall.material = mat3;
    wall2.material = mat3;

    var bwCOLOR = "assets\\Brick_Wall\\Brick_Wall_011_COLOR.jpg";
    var bwNORM = "assets\\Brick_Wall\\Brick_Wall_011_NORM.jpg";
    var bwOCC = "assets\\Brick_Wall\\Brick_Wall_011_OCC.jpg";
    var bwROUGH = "assets\\Brick_Wall\\Brick_Wall_011_ROUGH.jpg";

    var mat2 = new BABYLON.StandardMaterial(backWall, scene);
    mat2.diffuseTexture = new BABYLON.Texture(bwCOLOR, scene);
    mat2.diffuseTexture.uScale = 2;
    mat2.diffuseTexture.vScale = 2;
    mat2.bumpTexture = new BABYLON.Texture(bwNORM, scene);
    mat2.bumpTexture.uScale = 2;
    mat2.bumpTexture.vScale = 2;
    mat2.ambientTexture = new BABYLON.Texture(bwOCC, scene);
    mat2.ambientTexture.uScale = 2;
    mat2.ambientTexture.vScale = 2;
    mat2.metallicRoughnessTexture = new BABYLON.Texture(bwROUGH, scene);
    mat2.metallicRoughnessTexture.uScale = 2;
    mat2.metallicRoughnessTexture.vScale = 2;
    mat2.specularPower = 10000.0;

    backWall.material = mat2;
}

function addHemiLight(name, intensity, location, scene) {
    var hemiLight = new BABYLON.HemisphericLight(name,
        location,
        scene);
    hemiLight.intensity = intensity;
    hemiLight.specular = new BABYLON.Color3(1, 1, 0);
    hemiLight.specularPower = 2;
    hemiLight.diffuse = new BABYLON.Color3(1, 1, 1);
    hemiLight.groundColor = new BABYLON.Color3(0, 0, 0);
}

function addPointLight(name, intensity, location, scene) {
    // Place point light (shadows)
    let light = new BABYLON.PointLight(name, location, scene);
    light.intensity = intensity;
    light.specularColor = new BABYLON.Color3(1, 1, 0);
    light.diffuseColor = new BABYLON.Color3(1, 1, 0);
    return light;

}

function addDirectLight(name, intensity, angle, scene) {
    let light = new BABYLON.DirectionalLight(name, angle, scene);
    light.intensity = intensity;
    light.specularColor = new BABYLON.Color3(1, 1, 0);
    light.diffuseColor = new BABYLON.Color3(1, 1, 0);
    return light;
}

var furnishings = [];

function addFurnishing(furnishing, location, rotation, scene) {
    model = furnishing.glb_url;
    BABYLON.SceneLoader.ImportMesh(
        "", model, "", scene,
        function (meshes, particles, skeletons) {
            const mesh = meshes[0];
            mesh.setPositionWithLocalVector(location);
            mesh.rotation = rotation;
	    furnishing.mesh = mesh;
            furnishings.push(furnishing);
        });
}

function removeFurnishing(furnishing, scene) {
    var index = furnishings.indexOf(furnishing);
    if (index == -1) return;
    var mesh = furnishing.mesh;

    mesh.getChildMeshes().forEach(function (mesh) {
        scene.removeMesh(mesh);
    });
    furnishings.splice(index, 1);
}

function addShadows(light) {
    let shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator.useBlurExponentialShadowMap = true;
    for (let mesh in furnishings) {
        shadowGenerator.addShadowCaster(mesh);
        shadowGenerator.getShadowMap().renderList.push(mesh);
    }
    return shadowGenerator
}

function buildLivingRoom(style) {

    var scene = createScene();
    var uniCam = makeCamera(scene);
    uniCam.attachControl(canvas, true);
    // var orb = addGlowingOrb(scene);

    //var light = addPointLight("pointLight", .2, new BABYLON.Vector3(0, 2, 2), scene);
    var light0 = addPointLight("point0", .2, new BABYLON.Vector3(2, 2, 2), scene);
    var light1 = addPointLight("point1", .2, new BABYLON.Vector3(-2, 2, 2), scene);
    var hemiLight = addHemiLight('hemi0', 1.1, new BABYLON.Vector3(0, 2, 2), scene);
    // Build 5 / 2.5 / 5 room
    var room = buildRoom(4, 2, 3.5, scene);

    for (var i = 0; i < livingroom.length; i++)
    {
	var class_name = livingroom[i].class_name;
	var loc = livingroom[i].loc;
	var rot = livingroom[i].rot;
	findAndAdd(class_name, loc, rot);
    }

    var vls = new BABYLON.VolumetricLightScatteringPostProcess('vls', {postProcessRatio: 1.0, passRatio: 0.5},
        uniCam, hemiLight, 75, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);
    var mesh = vls.mesh;
    vls.useCustomMeshPosition = true;
    return scene;
}

function vector(x, y, z) {
    return new BABYLON.Vector3(x, y, z);
}

var livingroom = [
    {
        "class_name": "Coffee & Cocktail Tables",
        "loc": vector(0, 0, 0),
        "rot": vector(0, 0, 0)
    },
    {
        "class_name": "Area Rugs",
        "loc": vector(0, 0, 0),
        "rot": vector(0, Math.PI / 2, 0)
    },
    {
        "class_name": "Sofas",
        "loc": vector(1.45, 0, 0),
        "rot": vector(0, Math.PI / 2, 0)
    },
    {
        "class_name": "Sofas",
        "loc": vector(-1.45, 0, 0),
        "rot": vector(0, Math.PI / -2, 0)
    },
    {
        "class_name": "Floor Lamps",
        "loc": vector(-1.4, 0, -1.45),
        "rot": vector(0, Math.PI / 2, 0)
    },
    {
        "class_name": "TV Stands & Entertainment Centers",
        "loc": vector(-1.4, 0, 1.45),
        "rot": vector(0, Math.PI / 2, 0)
    },
    // {
    //     "class_name": "Accent Pillows",
    //     "loc": vector(-1.25, .5, -.55),
    //     "rot": vector(Math.PI / 3, Math.PI / 3.5, 0)
    // },
    {
        "class_name": "Wall Art",
        "loc": vector(0, .8, -1.75),
        "rot": vector(0, 0, 0)
    },
    {
        "class_name": "End Tables",
        "loc": vector(-1.4, 0, 1.45),
        "rot": vector(0, Math.PI / 2, 0)
    },
];

var diningroom = [
    {
        "class_name": "Dining Tables",
        "loc": vector(0, 0, 0),
        "rot": vector(0, Math.PI / 2, 0)
    },
    {
        "class_name": "Area Rugs",
        "loc": vector(0, 0, 0),
        "rot": vector(0, 0, 0)
    },
    {
        "class_name": "Table Cloth",
        "loc": vector(0, 0, 0),
        "rot": vector(0, 0, 0)
    },
    {
        "class_name": "Candle Holders",
        "loc": vector(0, 0, 0),
        "rot": vector(0, 0, 0)
    },

];

var scene = buildLivingRoom("Modern", scene);
//var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});


function findFurniture(search, facet_filters)
{
    const query = {
	"query": search,
	"facets": [
	    "class_names",
	    "primary_style"
	],
	"facetFilters": facet_filters
    };
    return index.search(query).then(function(result){
	return result;
    });
}

function findAndAdd(class_name, loc, rot)
{
    return findFurniture("",
			 "class_name:"+class_name).then(
	function(result) {
	    idx = Math.floor(Math.random() * 19);
	    hit = result.hits[idx];
	    addFurnishing(hit,
			  loc,
			  rot,
			  scene);
	    return hit;
	});
}

function replaceFurniture(furniture)
{
    findAndAdd(furniture._highlightResult.class_name.value).then(
	function(result) {
	    result.setAbsolutePosition(furniture.getAbsolutePosition());
	});
}

function regen()
{
    var yourSelect = document.getElementById( "style" );
    scene = buildLivingRoom(yourSelect.options[ yourSelect.selectedIndex ].value)
}
