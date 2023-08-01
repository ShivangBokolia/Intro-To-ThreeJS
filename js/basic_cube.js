import * as THREE from 'three';

var scene, camera, renderer, axesHelper;
var cube_geometry, cube_material, cube;

var temp_stopper = false;

// Stop the loop by pressing the Esc key.
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 90) {
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
    camera.position.z = 5;

    axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
}

const create_box = () => {
    cube_geometry = new THREE.BoxGeometry(1, 1, 1);
    cube_material = new THREE.MeshBasicMaterial( {color: 0xff00ff} );
    cube = new THREE.Mesh(cube_geometry, cube_material);
    scene.add(cube);
}

const basic_cube = () => {
    init();
    create_box();

    function animate_cube() {
        // Stop the Loop:
        if (temp_stopper) { return; }

        requestAnimationFrame( animate_cube );

        cube.rotation.x += 0.01;
    
        renderer.render( scene, camera );
    }

    animate_cube();
}

export {basic_cube};