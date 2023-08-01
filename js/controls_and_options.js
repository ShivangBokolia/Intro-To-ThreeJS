import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'dat.gui';

var scene, camera, renderer, axesHelper, controls;
var cube_geometry, cube_material, cube;

var stats, gui;
var settings = {
    speed_x : 0,
    speed_y : 0,
    speed_z : 0
}

var temp_stopper = false;

// Stop the loop by pressing the Esc key.
document.onkeydown = function(key) {
    key = key || window.event;
    if (key.keyCode == 27) {
        temp_stopper = true;
    }
};

// Creating the scene:
const init = () => {
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    controls = new OrbitControls( camera, renderer.domElement );

    camera.position.z = 5;
    controls.update();
    

    axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
}

const create_box = () => {
    cube_geometry = new THREE.BoxGeometry(1, 1, 1);
    cube_material = new THREE.MeshBasicMaterial( {color: 0xff00ff, wireframe: true} );
    cube = new THREE.Mesh(cube_geometry, cube_material);
    scene.add(cube);
}

const create_gui = () => {
    stats = new Stats();
    document.body.appendChild(stats.dom);

    gui = new GUI();
    gui.add(settings, 'speed_x', 0, 0.1,0.01).listen()
    gui.add(settings, 'speed_y', 0, 0.1,0.01).listen()
    gui.add(settings, 'speed_z', 0, 0.1,0.01).listen()
    // cube_folder = gui.addFolder('Cube');

    // cube_folder.add(cube.rotation, 'x', 0, Math.PI);
    // cube_folder.open();
}

const controls_and_options = () => {
    init();
    create_box();
    create_gui();

    function animate() {
        // Stop the Loop:
        if (temp_stopper) { return; }

        requestAnimationFrame( animate );

        // cube.rotation.x += 0.01;
        cube.rotation.x += settings.speed_x;
        cube.rotation.y += settings.speed_y;
        cube.rotation.z += settings.speed_z;

        controls.update();
        stats.update();
    
        renderer.render( scene, camera );
    }

    animate();
}

export {controls_and_options};