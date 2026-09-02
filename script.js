import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { OrbitControls } from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js";


// ==========================================
// BASIC THREE.JS SETUP
// ==========================================

const sceneContainer = document.getElementById("scene");

const scene = new THREE.Scene();


// Fog
scene.fog = new THREE.FogExp2(
    0x050505,
    0.035
);


// Camera
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(
    0,
    8,
    18
);


// Renderer
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

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

sceneContainer.appendChild(
    renderer.domElement
);


// ==========================================
// CAMERA CONTROLS
// ==========================================

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;

controls.dampingFactor = 0.05;

controls.maxPolarAngle =
    Math.PI / 2.05;

controls.minDistance = 7;

controls.maxDistance = 35;

controls.target.set(
    0,
    2,
    0
);


// ==========================================
// LIGHTING
// ==========================================

// Moon light
const moonLight = new THREE.DirectionalLight(
    0xaaaaff,
    2
);

moonLight.position.set(
    -10,
    20,
    -10
);

moonLight.castShadow = true;

scene.add(moonLight);


// Ambient light
const ambientLight =
    new THREE.AmbientLight(
        0x444444,
        1.5
    );

scene.add(ambientLight);


// ==========================================
// MOON
// ==========================================

const moonGeometry =
    new THREE.SphereGeometry(
        2,
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
    -15,
    18,
    -25
);

scene.add(moon);


// ==========================================
// GROUND
// ==========================================

const groundGeometry =
    new THREE.PlaneGeometry(
        80,
        80
    );

const groundMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x101510,
        roughness: 1
    });

const ground =
    new THREE.Mesh(
        groundGeometry,
        groundMaterial
    );

ground.rotation.x =
    -Math.PI / 2;

ground.receiveShadow = true;

scene.add(ground);


// ==========================================
// GRASS / SMALL ROCKS
// ==========================================

for (let i = 0; i < 150; i++) {

    const geometry =
        new THREE.ConeGeometry(
            0.08,
            Math.random() * 0.5 + 0.2,
            5
        );

    const material =
        new THREE.MeshStandardMaterial({
            color: 0x182018
        });

    const grass =
        new THREE.Mesh(
            geometry,
            material
        );

    grass.position.set(
        (Math.random() - 0.5) * 50,
        0.15,
        (Math.random() - 0.5) * 50
    );

    grass.rotation.y =
        Math.random() * Math.PI;

    scene.add(grass);
}


// ==========================================
// GRAVEYARD
// ==========================================

const graves = [];


// Funny causes of death
const deathCauses = [

    "Never opened again.",

    "Deleted because storage was full.",

    "Replaced by final_final_REAL.zip.",

    "Victim of Ctrl + A → Delete.",

    "Forgotten for 847 days.",

    "Lost in the Downloads folder.",

    "Executed once. Never again.",

    "Replaced by a newer version.",

    "Accidentally deleted.",

    "Nobody remembered what this file did.",

    "Too old for modern software.",

    "Created for a project that never happened.",

    "Deleted five minutes after creation."

];


// ==========================================
// CREATE TOMBSTONE
// ==========================================

function createGrave(
    fileName,
    fileSize,
    birthDate,
    cause,
    x,
    z
) {

    const graveGroup =
        new THREE.Group();


    // --------------------------------------
    // Tombstone
    // --------------------------------------

    const stoneShape =
        new THREE.Shape();

    stoneShape.moveTo(-0.9, 0);

    stoneShape.lineTo(-0.9, 2);

    stoneShape.quadraticCurveTo(
        -0.9,
        2.8,
        0,
        3
    );

    stoneShape.quadraticCurveTo(
        0.9,
        2.8,
        0.9,
        2
    );

    stoneShape.lineTo(0.9, 0);

    stoneShape.closePath();


    const extrudeSettings = {

        depth: 0.35,

        bevelEnabled: true,

        bevelSegments: 3,

        bevelSize: 0.08,

        bevelThickness: 0.08

    };


    const stoneGeometry =
        new THREE.ExtrudeGeometry(
            stoneShape,
            extrudeSettings
        );


    const stoneMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x444444,

            roughness: 0.9

        });


    const stone =
        new THREE.Mesh(
            stoneGeometry,
            stoneMaterial
        );


    stone.position.y = 0;

    stone.rotation.y =
        Math.random() * 0.15 - 0.075;

    stone.castShadow = true;

    stone.receiveShadow = true;


    graveGroup.add(stone);


    // --------------------------------------
    // Cross
    // --------------------------------------

    const crossMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x222222
        });


    const vertical =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.15,
                1.0,
                0.12
            ),
            crossMaterial
        );


    vertical.position.set(
        0,
        1.8,
        -0.2
    );


    const horizontal =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.6,
                0.15,
                0.12
            ),
            crossMaterial
        );


    horizontal.position.set(
        0,
        2.0,
        -0.2
    );


    graveGroup.add(vertical);

    graveGroup.add(horizontal);


    // --------------------------------------
    // Glowing candle
    // --------------------------------------

    const candleLight =
        new THREE.PointLight(
            0xff9933,
            1.5,
            5
        );

    candleLight.position.set(
        0,
        1.1,
        0.5
    );

    graveGroup.add(
        candleLight
    );


    // Candle
    const candle =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.07,
                0.07,
                0.35,
                12
            ),

            new THREE.MeshStandardMaterial({
                color: 0xffffcc
            })
        );

    candle.position.set(
        0,
        0.2,
        0.5
    );

    graveGroup.add(candle);


    // --------------------------------------
    // Store file information
    // --------------------------------------

    graveGroup.userData = {

        fileName: fileName,

        fileSize: fileSize,

        birthDate: birthDate,

        deathDate:
            new Date().toLocaleDateString(),

        cause: cause

    };


    // --------------------------------------
    // Position
    // --------------------------------------

    graveGroup.position.set(
        x,
        0,
        z
    );


    // Slight random rotation
    graveGroup.rotation.y =
        Math.random() * 0.3 - 0.15;


    scene.add(
        graveGroup
    );


    graves.push(
        graveGroup
    );


    return graveGroup;
}


// ==========================================
// INITIAL GRAVES
// ==========================================

const initialGraves = [

    {
        name: "final_project.pdf",
        size: "2.4 MB",
        cause: "Replaced by final_project_FINAL.pdf"
    },

    {
        name: "old_assignment.py",
        size: "14 KB",
        cause: "Executed once. Never again."
    },

    {
        name: "IMG_2039.jpg",
        size: "4.8 MB",
        cause: "One of 4,782 identical photos."
    },

    {
        name: "notes.txt",
        size: "8 KB",
        cause: "Forgotten for 847 days."
    },

    {
        name: "presentation.pptx",
        size: "12 MB",
        cause: "Presentation was never presented."
    },

    {
        name: "final_final.zip",
        size: "27 MB",
        cause: "Replaced by final_final_REAL.zip."
    }

];


initialGraves.forEach(
    (file, index) => {

        const angle =
            (index / initialGraves.length)
            * Math.PI * 2;

        const radius = 6;

        createGrave(

            file.name,

            file.size,

            "01/01/2026",

            file.cause,

            Math.cos(angle) * radius,

            Math.sin(angle) * radius

        );

    }
);


// ==========================================
// FILE UPLOAD
// ==========================================

const fileInput =
    document.getElementById(
        "fileInput"
    );

const fileCount =
    document.getElementById(
        "fileCount"
    );


// Start with initial graves
fileCount.textContent =
    graves.length;


fileInput.addEventListener(
    "change",
    function () {

        const file =
            fileInput.files[0];

        if (!file) return;


        const size =
            formatFileSize(
                file.size
            );


        const cause =
            deathCauses[
                Math.floor(
                    Math.random()
                    * deathCauses.length
                )
            ];


        // Random position
        const x =
            (Math.random() - 0.5)
            * 18;

        const z =
            (Math.random() - 0.5)
            * 18;


        createGrave(

            file.name,

            size,

            new Date().toLocaleDateString(),

            cause,

            x,

            z

        );


        fileCount.textContent =
            graves.length;


        // Reset input
        fileInput.value = "";

    }
);


// ==========================================
// FILE SIZE
// ==========================================

function formatFileSize(bytes) {

    if (bytes < 1024) {

        return bytes + " B";

    }

    if (bytes < 1024 * 1024) {

        return (
            (bytes / 1024).toFixed(2)
            + " KB"
        );

    }

    return (

        (bytes / (1024 * 1024))
        .toFixed(2)
        + " MB"

    );

}


// ==========================================
// CLICK DETECTION
// ==========================================

const raycaster =
    new THREE.Raycaster();

const mouse =
    new THREE.Vector2();


renderer.domElement.addEventListener(
    "click",
    function (event) {

        mouse.x =
            (event.clientX /
                window.innerWidth)
            * 2 - 1;

        mouse.y =
            -(event.clientY /
                window.innerHeight)
            * 2 + 1;


        raycaster.setFromCamera(
            mouse,
            camera
        );


        const objects = [];


        graves.forEach(
            grave => {

                grave.traverse(
                    child => {

                        if (
                            child.isMesh
                        ) {

                            objects.push(
                                child
                            );

                        }

                    }
                );

            }
        );


        const intersections =
            raycaster.intersectObjects(
                objects
            );


        if (
            intersections.length === 0
        ) {

            return;

        }


        let selected =
            intersections[0].object;


        while (
            selected.parent &&
            !selected.userData.fileName
        ) {

            selected =
                selected.parent;

        }


        if (
            !selected.userData.fileName
        ) {

            return;

        }


        showFileInfo(
            selected.userData
        );

    }
);


// ==========================================
// SHOW FILE INFORMATION
// ==========================================

function showFileInfo(data) {

    document.getElementById(
        "infoName"
    ).textContent =
        data.fileName;


    document.getElementById(
        "infoSize"
    ).textContent =
        data.fileSize;


    document.getElementById(
        "infoBorn"
    ).textContent =
        data.birthDate;


    document.getElementById(
        "infoDied"
    ).textContent =
        data.deathDate;


    document.getElementById(
        "infoCause"
    ).textContent =
        `"${data.cause}"`;


    document.getElementById(
        "infoPanel"
    ).classList.add(
        "show"
    );

}


// ==========================================
// CLOSE INFO PANEL
// ==========================================

document.getElementById(
    "closePanel"
).addEventListener(
    "click",
    function () {

        document.getElementById(
            "infoPanel"
        ).classList.remove(
            "show"
        );

    }
);


// ==========================================
// FIREFLIES
// ==========================================

const fireflyGeometry =
    new THREE.BufferGeometry();

const fireflyPositions = [];

for (let i = 0; i < 120; i++) {

    fireflyPositions.push(

        (Math.random() - 0.5) * 50,

        Math.random() * 8 + 1,

        (Math.random() - 0.5) * 50

    );

}


fireflyGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(
        fireflyPositions,
        3
    )

);


const fireflyMaterial =
    new THREE.PointsMaterial({

        color: 0xffffaa,

        size: 0.08,

        transparent: true,

        opacity: 0.8

    });


const fireflies =
    new THREE.Points(
        fireflyGeometry,
        fireflyMaterial
    );


scene.add(
    fireflies
);


// ==========================================
// ANIMATION
// ==========================================

const clock =
    new THREE.Clock();


function animate() {

    requestAnimationFrame(
        animate
    );


    const time =
        clock.getElapsedTime();


    // Fireflies move slightly
    fireflies.rotation.y =
        time * 0.01;


    // Candle flickering
    graves.forEach(
        grave => {

            grave.children.forEach(
                child => {

                    if (
                        child.isPointLight
                    ) {

                        child.intensity =
                            1.2 +
                            Math.sin(
                                time * 8 +
                                grave.position.x
                            ) * 0.4;

                    }

                }
            );

        }
    );


    controls.update();


    renderer.render(
        scene,
        camera
    );

}


animate();


// ==========================================
// WINDOW RESIZE
// ==========================================

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
