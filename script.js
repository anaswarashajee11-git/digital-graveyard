// ==========================================
// DIGITAL GRAVEYARD - 3D VERSION
// ==========================================

// Check that Three.js loaded
if (typeof THREE === "undefined") {
    alert("Three.js did not load. Check your internet connection.");
    throw new Error("Three.js not loaded");
}


// ==========================================
// SCENE
// ==========================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x050505);

scene.fog = new THREE.Fog(
    0x050505,
    15,
    45
);


// ==========================================
// CAMERA
// ==========================================

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 7, 18);


// ==========================================
// RENDERER
// ==========================================

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

document
    .getElementById("scene")
    .appendChild(renderer.domElement);


// ==========================================
// CAMERA CONTROLS
// ==========================================

const controls = new THREE.OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;

controls.dampingFactor = 0.05;

controls.minDistance = 6;

controls.maxDistance = 35;

controls.maxPolarAngle =
    Math.PI / 2.05;

controls.target.set(
    0,
    2,
    0
);


// ==========================================
// LIGHTING
// ==========================================

// Moon light

const moonLight =
    new THREE.DirectionalLight(
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
        0x555555,
        1.5
    );

scene.add(ambientLight);


// ==========================================
// MOON
// ==========================================

const moon = new THREE.Mesh(

    new THREE.SphereGeometry(
        2,
        32,
        32
    ),

    new THREE.MeshBasicMaterial({
        color: 0xffffff
    })

);

moon.position.set(
    -14,
    16,
    -20
);

scene.add(moon);


// ==========================================
// GROUND
// ==========================================

const ground = new THREE.Mesh(

    new THREE.PlaneGeometry(
        80,
        80
    ),

    new THREE.MeshStandardMaterial({
        color: 0x101510,
        roughness: 1
    })

);

ground.rotation.x =
    -Math.PI / 2;

ground.receiveShadow = true;

scene.add(ground);


// ==========================================
// PATH
// ==========================================

const path = new THREE.Mesh(

    new THREE.PlaneGeometry(
        5,
        80
    ),

    new THREE.MeshStandardMaterial({
        color: 0x181818
    })

);

path.rotation.x =
    -Math.PI / 2;

path.position.y = 0.01;

scene.add(path);


// ==========================================
// GRASS
// ==========================================

for (let i = 0; i < 200; i++) {

    const grass = new THREE.Mesh(

        new THREE.ConeGeometry(
            0.08,
            Math.random() * 0.4 + 0.2,
            5
        ),

        new THREE.MeshStandardMaterial({
            color: 0x172017
        })

    );

    grass.position.set(

        (Math.random() - 0.5) * 45,

        0.2,

        (Math.random() - 0.5) * 45

    );

    scene.add(grass);
}


// ==========================================
// GRAVES
// ==========================================

const graves = [];


// ==========================================
// CAUSES OF DEATH
// ==========================================

const causes = [

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
// CREATE GRAVE
// ==========================================

function createGrave(
    name,
    size,
    born,
    cause,
    x,
    z
) {

    const group =
        new THREE.Group();


    // ======================================
    // TOMBSTONE
    // ======================================

    const shape =
        new THREE.Shape();


    shape.moveTo(-1, 0);

    shape.lineTo(-1, 2);

    shape.quadraticCurveTo(
        -1,
        3,
        0,
        3
    );

    shape.quadraticCurveTo(
        1,
        3,
        1,
        2
    );

    shape.lineTo(1, 0);

    shape.closePath();


    const geometry =
        new THREE.ExtrudeGeometry(
            shape,
            {
                depth: 0.4,

                bevelEnabled: true,

                bevelSegments: 3,

                bevelSize: 0.08,

                bevelThickness: 0.08
            }
        );


    const material =
        new THREE.MeshStandardMaterial({
            color: 0x555555,

            roughness: 0.9
        });


    const stone =
        new THREE.Mesh(
            geometry,
            material
        );


    stone.castShadow = true;

    stone.receiveShadow = true;

    group.add(stone);


    // ======================================
    // CROSS
    // ======================================

    const crossMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x222222
        });


    const vertical =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.18,
                1,
                0.15
            ),

            crossMaterial

        );


    vertical.position.set(
        0,
        1.8,
        -0.25
    );


    const horizontal =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.65,
                0.18,
                0.15
            ),

            crossMaterial

        );


    horizontal.position.set(
        0,
        2,
        -0.25
    );


    group.add(vertical);

    group.add(horizontal);


    // ======================================
    // CANDLE
    // ======================================

    const candle =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.08,
                0.08,
                0.35,
                12
            ),

            new THREE.MeshStandardMaterial({
                color: 0xffffcc
            })

        );


    candle.position.set(
        0,
        0.18,
        0.55
    );


    group.add(candle);


    // ======================================
    // CANDLE LIGHT
    // ======================================

    const candleLight =
        new THREE.PointLight(
            0xffaa33,
            2,
            5
        );


    candleLight.position.set(
        0,
        0.7,
        0.5
    );


    group.add(candleLight);


    // ======================================
    // FILE INFORMATION
    // ======================================

    group.userData = {

        name: name,

        size: size,

        born: born,

        died:
            new Date()
            .toLocaleDateString(),

        cause: cause

    };


    // ======================================
    // POSITION
    // ======================================

    group.position.set(
        x,
        0,
        z
    );


    group.rotation.y =
        (Math.random() - 0.5) * 0.2;


    scene.add(group);

    graves.push(group);

}


// ==========================================
// STARTER GRAVES
// ==========================================

const starterFiles = [

    [
        "final_project.pdf",
        "2.4 MB",
        "Replaced by final_project_FINAL.pdf"
    ],

    [
        "old_assignment.py",
        "14 KB",
        "Executed once. Never again."
    ],

    [
        "IMG_2039.jpg",
        "4.8 MB",
        "One of 4,782 identical photos."
    ],

    [
        "notes.txt",
        "8 KB",
        "Forgotten for 847 days."
    ],

    [
        "presentation.pptx",
        "12 MB",
        "Presentation was never presented."
    ],

    [
        "final_final.zip",
        "27 MB",
        "Replaced by final_final_REAL.zip"
    ]

];


starterFiles.forEach(
    function(file, index) {

        const angle =
            (index /
                starterFiles.length) *
            Math.PI * 2;

        const radius = 6;

        createGrave(

            file[0],

            file[1],

            "01/01/2026",

            file[2],

            Math.cos(angle) * radius,

            Math.sin(angle) * radius

        );

    }
);


// ==========================================
// COUNTER
// ==========================================

const counter =
    document.getElementById(
        "fileCount"
    );

counter.textContent =
    graves.length;


// ==========================================
// FILE UPLOAD
// ==========================================

document
    .getElementById("fileInput")
    .addEventListener(
        "change",
        function() {

            const file =
                this.files[0];

            if (!file) {
                return;
            }


            const size =
                getFileSize(
                    file.size
                );


            const cause =
                causes[
                    Math.floor(
                        Math.random() *
                        causes.length
                    )
                ];


            const x =
                (Math.random() - 0.5)
                * 18;


            const z =
                (Math.random() - 0.5)
                * 18;


            createGrave(

                file.name,

                size,

                new Date()
                    .toLocaleDateString(),

                cause,

                x,

                z

            );


            counter.textContent =
                graves.length;


            this.value = "";

        }
    );


// ==========================================
// FILE SIZE
// ==========================================

function getFileSize(bytes) {

    if (bytes < 1024) {

        return bytes + " B";

    }


    if (bytes < 1024 * 1024) {

        return (
            (bytes / 1024)
                .toFixed(2)
            + " KB"
        );

    }


    return (

        (bytes /
            (1024 * 1024))
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
    function(event) {

        mouse.x =
            (event.clientX /
                window.innerWidth) *
            2 - 1;


        mouse.y =
            -(event.clientY /
                window.innerHeight) *
            2 + 1;


        raycaster.setFromCamera(
            mouse,
            camera
        );


        const objects = [];


        graves.forEach(
            function(grave) {

                grave.traverse(
                    function(child) {

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


        const hits =
            raycaster.intersectObjects(
                objects
            );


        if (hits.length === 0) {
            return;
        }


        let selected =
            hits[0].object;


        while (
            selected &&
            !selected.userData.name
        ) {

            selected =
                selected.parent;

        }


        if (
            !selected ||
            !selected.userData.name
        ) {

            return;

        }


        showInfo(
            selected.userData
        );

    }
);


// ==========================================
// SHOW FILE INFO
// ==========================================

function showInfo(data) {

    document.getElementById(
        "fileName"
    ).textContent =
        data.name;


    document.getElementById(
        "fileSize"
    ).textContent =
        data.size;


    document.getElementById(
        "fileBorn"
    ).textContent =
        data.born;


    document.getElementById(
        "fileDied"
    ).textContent =
        data.died;


    document.getElementById(
        "fileCause"
    ).textContent =
        '"' +
        data.cause +
        '"';


    document
        .getElementById("infoPanel")
        .classList.add("show");

}


// ==========================================
// CLOSE INFORMATION
// ==========================================

document
    .getElementById("closeButton")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("infoPanel")
                .classList.remove(
                    "show"
                );

        }
    );


// ==========================================
// FIREFLIES
// ==========================================

const fireflyGeometry =
    new THREE.BufferGeometry();


const positions = [];


for (let i = 0; i < 150; i++) {

    positions.push(

        (Math.random() - 0.5) * 45,

        Math.random() * 8 + 1,

        (Math.random() - 0.5) * 45

    );

}


fireflyGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(
        positions,
        3
    )

);


const fireflyMaterial =
    new THREE.PointsMaterial({

        color: 0xffffaa,

        size: 0.12,

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


    // Fireflies

    fireflies.rotation.y =
        time * 0.01;


    // Candle flickering

    graves.forEach(
        function(grave) {

            grave.children.forEach(
                function(child) {

                    if (
                        child.isPointLight
                    ) {

                        child.intensity =

                            1.5 +

                            Math.sin(
                                time * 8 +
                                grave.position.x
                            ) * 0.5;

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
    function() {

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
