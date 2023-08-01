import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


var scene, camera, renderer, axesHelper;
var cube_geometry, cube_material, cube;
var cube_geometry_2, cube_material_2, cube_2;

var camera_controls;

var temp_stopper = false;

// Stop the loop by pressing the Esc key.
// document.onkeydown = function(evt) {
//     evt = evt || window.event;
//     if (evt.keyCode == 90) {
//         temp_stopper = true;
//     }
// };

// Creating the scene:
const init = () => {
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth-100, window.innerHeight-100);
    document.body.appendChild( renderer.domElement );
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera_controls = new OrbitControls(camera, renderer.domElement);

    camera.position.z = 5;
    camera_controls.update();

    axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
}

const create_box = () => {
    cube_geometry = new THREE.BoxGeometry(1, 1, 1);
    cube_material = new THREE.MeshBasicMaterial( {color: 0xff00ff, wireframe: true} );
    cube = new THREE.Mesh(cube_geometry, cube_material);
    scene.add(cube);

    cube_geometry_2 = new THREE.BoxGeometry(1, 1, 1);
    cube_material_2 = new THREE.MeshBasicMaterial( {color: 0xff6699} );
    cube_2 = new THREE.Mesh(cube_geometry_2, cube_material_2);
    scene.add(cube_2);
    cube_2.position.x = 5;
}

document.onkeydown = (key_pressed) => {
    switch (key_pressed.code) {
        case "Escape":
            temp_stopper = true;
            break;
        case "ArrowLeft":
            cube.position.x -= 0.1;
            break;
        case "ArrowRight":
            cube.position.x += 0.1;
            break;
        case "ArrowDown":
            cube.position.z += 0.1;
            break;
        case "ArrowUp":
            cube.position.z -= 0.1;
            break;
    }
}

const movement = () => {
    init();
    create_box();

    function move_cube() {
        // Stop the Loop:
        if (temp_stopper) { return; }

        requestAnimationFrame( move_cube );

        camera_controls.update();

        renderer.render( scene, camera );
    }

    move_cube();
}

export {movement};