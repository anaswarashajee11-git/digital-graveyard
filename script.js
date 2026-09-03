console.log("SCRIPT STARTED");

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x050509);

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 5, 20);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

document.getElementById("scene").appendChild(
    renderer.domElement
);


// LIGHT
const light = new THREE.DirectionalLight(
    0xffffff,
    2
);

light.position.set(
    5,
    10,
    10
);

scene.add(light);


const ambient = new THREE.AmbientLight(
    0xffffff,
    0.5
);

scene.add(ambient);


// GROUND
const groundGeometry =
    new THREE.PlaneGeometry(100, 100);

const groundMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x202025
    });

const ground =
    new THREE.Mesh(
        groundGeometry,
        groundMaterial
    );

ground.rotation.x = -Math.PI / 2;

scene.add(ground);


// TEST TOMB
const tombGeometry =
    new THREE.BoxGeometry(
        3,
        4,
        1
    );

const tombMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x555555
    });

const tomb =
    new THREE.Mesh(
        tombGeometry,
        tombMaterial
    );

tomb.position.y = 2;

scene.add(tomb);


// MOON
const moonGeometry =
    new THREE.SphereGeometry(
        3,
        32,
        32
    );

const moonMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xffffff
    });

const moon =
    new THREE.Mesh(
        moonGeometry,
        moonMaterial
    );

moon.position.set(
    -12,
    12,
    -20
);

scene.add(moon);


// ANIMATION
function animate() {

    requestAnimationFrame(animate);

    tomb.rotation.y += 0.003;

    renderer.render(
        scene,
        camera
    );
}

animate();


// RESIZE
window.addEventListener(
    "resize",
    function () {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);
