noise.seed(Math.random());


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var controls = new THREE.OrbitControls( camera, renderer.domElement );

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


camera.position.z = 5;

var render = function () {
	requestAnimationFrame( render );
	renderer.render(scene, camera);
};

var createCurve = function(zvalue){
	var geometry1 = new THREE.Geometry();
	var points = [];

	var initX = 0;
	for (var i = 0; i < 500; i++) {
		var noisePerlin = noise.perlin2(i/50 , Math.random()/10 );
		//var noisePerlin = Math.random();
		points.push(new THREE.Vector3( initX, noisePerlin,0 ));

		initX+=0.015;
	}
	var colors = [], colors2 = [], colors3 = [];
	for ( i = 0; i < points.length; i ++ ) {
		geometry1.vertices.push( points[ i ] );

		colors[ i ] = new THREE.Color( 0x00ffff );

	}

	geometry1.colors = colors;
	var material2 = new THREE.LineBasicMaterial( { color: 0x00ffff, opacity: 1, linewidth: 3, vertexColors: THREE.VertexColors } );
	var line = new THREE.Line( geometry1,  material2 );
	line.scale.x = line.scale.y = line.scale.z =  1;
	line.position.x = -4;
	line.position.y = 0;
	line.position.z = zvalue;
	scene.add( line );

}

var iniZ = 0
for (var u = 0; u < 100; u++) {
	createCurve(iniZ);
	iniZ+=0.05;
}

render();

