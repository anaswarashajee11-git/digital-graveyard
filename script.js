// =====================================================
// CTRL + Z CEMETARY
// 3D DIGITAL GRAVEYARD
// =====================================================

// -----------------------------------------------------
// BASIC CHECKS
// -----------------------------------------------------

if (typeof THREE === "undefined") {
    alert("Three.js is not loading. Check index.html.");
    throw new Error("Three.js not found");
}

if (typeof THREE.OrbitControls === "undefined") {
    alert("OrbitControls is not loading. Check index.html.");
    throw new Error("OrbitControls not found");
}


// -----------------------------------------------------
// SCENE
// -----------------------------------------------------

const sceneContainer = document.getElementById("scene");

if (!sceneContainer) {
    alert("The #scene element is missing from index.html.");
    throw new Error("Scene container missing");
}


const scene = new THREE.Scene();

scene.background = new THREE.Color(0x020204);

scene.fog = new THREE.FogExp2(
    0x050609,
    0.015
);


// -----------------------------------------------------
// CAMERA
// -----------------------------------------------------

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    500
);

camera.position.set(
    0,
    6,
    40
);


// -----------------------------------------------------
// RENDERER
// -----------------------------------------------------

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


// -----------------------------------------------------
// CONTROLS
// -----------------------------------------------------

const controls = new THREE.OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;

controls.dampingFactor = 0.06;

controls.minDistance = 5;

controls.maxDistance = 70;

controls.maxPolarAngle =
    Math.PI / 2.05;

controls.target.set(
    0,
    4,
    15
);


// -----------------------------------------------------
// LIGHTS
// -----------------------------------------------------

const ambientLight =
    new THREE.AmbientLight(
        0x777788,
        0.6
    );

scene.add(ambientLight);


const moonLight =
    new THREE.DirectionalLight(
        0x8295c5,
        1.4
    );

moonLight.position.set(
    -20,
    30,
    -20
);

moonLight.castShadow = true;

scene.add(moonLight);


// -----------------------------------------------------
// MOON
// -----------------------------------------------------

const moon = new THREE.Mesh(

    new THREE.SphereGeometry(
        4,
        32,
        32
    ),

    new THREE.MeshBasicMaterial({
        color: 0xd8d8d8
    })

);

moon.position.set(
    -20,
    25,
    -30
);

scene.add(moon);


// -----------------------------------------------------
// GROUND
// -----------------------------------------------------

const groundMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x101719,
        roughness: 1
    });


const ground = new THREE.Mesh(

    new THREE.PlaneGeometry(
        120,
        120
    ),

    groundMaterial

);

ground.rotation.x =
    -Math.PI / 2;

ground.receiveShadow = true;

scene.add(ground);


// -----------------------------------------------------
// MAIN PATH
// -----------------------------------------------------

const pathMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x29263a,
        roughness: 1
    });


const path = new THREE.Mesh(

    new THREE.PlaneGeometry(
        9,
        100
    ),

    pathMaterial

);

path.rotation.x =
    -Math.PI / 2;

path.position.set(
    0,
    0.03,
    -5
);

scene.add(path);


// -----------------------------------------------------
// MATERIALS
// -----------------------------------------------------

const stoneMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x34343b,
        roughness: 0.9
    });


const darkStoneMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x14151a,
        roughness: 0.9
    });


const ironMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x08090d,
        metalness: 0.8,
        roughness: 0.3
    });


const goldMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x9c7138,
        metalness: 0.8,
        roughness: 0.25
    });


// =====================================================
// GOTHIC ENTRANCE
// =====================================================

const entrance =
    new THREE.Group();


// The entrance is in front of the cemetery.

entrance.position.z = 20;

scene.add(entrance);


// -----------------------------------------------------
// CREATE TOWER
// -----------------------------------------------------

function createTower(x) {

    const tower =
        new THREE.Group();

    tower.position.x = x;


    // Main tower

    const body =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                5,
                11,
                5
            ),

            stoneMaterial

        );

    body.position.y = 5.5;

    body.castShadow = true;

    tower.add(body);


    // Bottom base

    const base =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                6,
                1.5,
                6
            ),

            darkStoneMaterial

        );

    base.position.y = 0.75;

    tower.add(base);


    // Top platform

    const top =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                6,
                1,
                6
            ),

            stoneMaterial

        );

    top.position.y = 11;

    tower.add(top);


    // Gothic roof

    const roof =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                3.3,
                5,
                4
            ),

            darkStoneMaterial

        );

    roof.position.y = 14;

    roof.rotation.y =
        Math.PI / 4;

    roof.castShadow = true;

    tower.add(roof);


    // Decorative columns

    for (
        let i = -1;
        i <= 1;
        i++
    ) {

        const column =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.45,
                    8,
                    0.45
                ),

                darkStoneMaterial

            );

        column.position.set(
            i * 1.4,
            5,
            2.55
        );

        tower.add(column);
    }


    // Golden decorations

    for (
        let i = -1;
        i <= 1;
        i++
    ) {

        const decoration =
            new THREE.Mesh(

                new THREE.ConeGeometry(
                    0.3,
                    1.2,
                    4
                ),

                goldMaterial

            );

        decoration.position.set(
            i * 1.4,
            12,
            0
        );

        decoration.rotation.y =
            Math.PI / 4;

        tower.add(decoration);
    }


    entrance.add(tower);
}


createTower(-9);

createTower(9);


// =====================================================
// CENTER ARCH
// =====================================================

const centerArch =
    new THREE.Mesh(

        new THREE.BoxGeometry(
            18,
            2.5,
            3
        ),

        darkStoneMaterial

    );

centerArch.position.set(
    0,
    10.8,
    0
);

entrance.add(centerArch);


// =====================================================
// ARCH SPIKES
// =====================================================

for (
    let x = -7;
    x <= 7;
    x += 2
) {

    const spike =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                0.3,
                1.4,
                4
            ),

            ironMaterial

        );

    spike.position.set(
        x,
        12.7,
        0
    );

    spike.rotation.y =
        Math.PI / 4;

    entrance.add(spike);
}


// =====================================================
// CEMETARY SIGN
// =====================================================

const signCanvas =
    document.createElement("canvas");

signCanvas.width = 1200;

signCanvas.height = 300;


const ctx =
    signCanvas.getContext("2d");


// Background

ctx.fillStyle = "#08090d";

ctx.fillRect(
    0,
    0,
    1200,
    300
);


// Gold border

ctx.strokeStyle = "#c49a5a";

ctx.lineWidth = 12;

ctx.strokeRect(
    10,
    10,
    1180,
    280
);


// Text

ctx.textAlign = "center";

ctx.textBaseline = "middle";

ctx.shadowColor =
    "#d5a85e";

ctx.shadowBlur = 25;

ctx.fillStyle =
    "#dfb56f";


ctx.font =
    "bold 82px Georgia";

ctx.fillText(
    "CTRL + Z",
    600,
    100
);


ctx.font =
    "bold 68px Georgia";

ctx.fillText(
    "CEMETARY",
    600,
    200
);


const signTexture =
    new THREE.CanvasTexture(
        signCanvas
    );


const sign =
    new THREE.Mesh(

        new THREE.PlaneGeometry(
            12,
            3
        ),

        new THREE.MeshBasicMaterial({
            map: signTexture
        })

    );


sign.position.set(
    0,
    10.5,
    -1.7
);


entrance.add(sign);


// =====================================================
// GATE
// =====================================================

const leftGate =
    new THREE.Group();

const rightGate =
    new THREE.Group();


// These are the hinges.

leftGate.position.set(
    -0.5,
    0,
    0
);

rightGate.position.set(
    0.5,
    0,
    0
);


entrance.add(leftGate);

entrance.add(rightGate);


// -----------------------------------------------------
// CREATE GATE DOOR
// -----------------------------------------------------

function createGateDoor(
    parent,
    direction
) {

    // Vertical bars

    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const bar =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.25,
                    7,
                    0.25
                ),

                ironMaterial

            );


        bar.position.set(
            direction *
            (0.7 + i * 1.05),
            3.5,
            0
        );


        parent.add(bar);


        // Pointed top

        const spike =
            new THREE.Mesh(

                new THREE.ConeGeometry(
                    0.22,
                    1,
                    5
                ),

                goldMaterial

            );


        spike.position.set(
            direction *
            (0.7 + i * 1.05),
            7.5,
            0
        );


        parent.add(spike);
    }


    // Horizontal bars

    for (
        let y = 1.5;
        y <= 6;
        y += 2
    ) {

        const horizontal =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    7.5,
                    0.25,
                    0.25
                ),

                ironMaterial

            );


        horizontal.position.set(
            direction * 3.8,
            y,
            0
        );


        parent.add(horizontal);
    }


    // Gothic ring

    const ring =
        new THREE.Mesh(

            new THREE.TorusGeometry(
                1.45,
                0.15,
                10,
                32
            ),

            goldMaterial

        );


    ring.position.set(
        direction * 3.8,
        3.5,
        -0.25
    );


    parent.add(ring);
}


createGateDoor(
    leftGate,
    1
);

createGateDoor(
    rightGate,
    -1
);


// =====================================================
// TORCHES
// =====================================================

const torchLights = [];


function createTorch(
    x,
    z
) {

    const flame =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.4,
                12,
                12
            ),

            new THREE.MeshBasicMaterial({
                color: 0xff7925
            })

        );


    flame.position.set(
        x,
        5,
        z
    );


    flame.scale.y = 1.5;


    scene.add(flame);


    const light =
        new THREE.PointLight(
            0xff8b32,
            3,
            12
        );


    light.position.set(
        x,
        5,
        z
    );


    scene.add(light);


    torchLights.push(light);
}


createTorch(
    -6,
    18
);

createTorch(
    6,
    18
);


// =====================================================
// GRAVES
// =====================================================

function createGrave(
    x,
    z,
    fileName
) {

    const grave =
        new THREE.Group();


    // Tombstone shape

    const shape =
        new THREE.Shape();


    shape.moveTo(
        -1.3,
        0
    );

    shape.lineTo(
        -1.3,
        2.5
    );

    shape.quadraticCurveTo(
        -1.3,
        4,
        0,
        4
    );

    shape.quadraticCurveTo(
        1.3,
        4,
        1.3,
        2.5
    );

    shape.lineTo(
        1.3,
        0
    );

    shape.lineTo(
        -1.3,
        0
    );


    const geometry =
        new THREE.ExtrudeGeometry(
            shape,
            {
                depth: 0.5,

                bevelEnabled: true,

                bevelThickness: 0.1,

                bevelSize: 0.1,

                bevelSegments: 3
            }
        );


    const tombstone =
        new THREE.Mesh(
            geometry,
            stoneMaterial
        );


    tombstone.castShadow = true;


    grave.add(
        tombstone
    );


    // -------------------------------------------------
    // CROSS
    // -------------------------------------------------

    const crossVertical =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.18,
                1.5,
                0.18
            ),

            darkStoneMaterial

        );


    crossVertical.position.set(
        0,
        3,
        -0.3
    );


    grave.add(
        crossVertical
    );


    const crossHorizontal =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.9,
                0.18,
                0.18
            ),

            darkStoneMaterial

        );


    crossHorizontal.position.set(
        0,
        3.2,
        -0.3
    );


    grave.add(
        crossHorizontal
    );


    // -------------------------------------------------
    // CANDLE
    // -------------------------------------------------

    const candle =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.12,
                0.12,
                0.7,
                12
            ),

            new THREE.MeshStandardMaterial({
                color: 0xffffdd
            })

        );


    candle.position.set(
        1.6,
        0.35,
        0
    );


    grave.add(
        candle
    );


    const candleLight =
        new THREE.PointLight(
            0xffa844,
            1.5,
            6
        );


    candleLight.position.set(
        1.6,
        1,
        0
    );


    grave.add(
        candleLight
    );


    // File information

    grave.userData.fileName =
        fileName;


    grave.position.set(
        x,
        0,
        z
    );


    scene.add(
        grave
    );
}


// =====================================================
// STARTER GRAVES
// =====================================================

createGrave(
    -5,
    7,
    "old_project_FINAL.py"
);

createGrave(
    5,
    7,
    "assignment_FINAL.pdf"
);

createGrave(
    -4,
    0,
    "website_old.zip"
);

createGrave(
    4,
    0,
    "final_final_v2.docx"
);

createGrave(
    -5,
    -8,
    "unused_code.js"
);

createGrave(
    5,
    -8,
    "forgotten_notes.txt"
);

createGrave(
    -4,
    -16,
    "project_old.zip"
);

createGrave(
    4,
    -16,
    "backup_2023.pdf"
);


// =====================================================
// GRASS
// =====================================================

const grassMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x11191a
    });


for (
    let i = 0;
    i < 220;
    i++
) {

    const grass =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                0.08,
                Math.random() * 0.6 + 0.3,
                4
            ),

            grassMaterial

        );


    grass.position.set(

        (Math.random() - 0.5) * 90,

        0.2,

        (Math.random() - 0.5) * 80

    );


    scene.add(grass);
}


// =====================================================
// FIREFLIES
// =====================================================

const fireflies = [];


const fireflyMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xffff99
    });


for (
    let i = 0;
    i < 120;
    i++
) {

    const firefly =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.08,
                0.08,
                0.08
            ),

            fireflyMaterial

        );


    firefly.position.set(

        (Math.random() - 0.5) * 80,

        Math.random() * 14 + 2,

        (Math.random() - 0.5) * 70

    );


    scene.add(
        firefly
    );


    fireflies.push(
        firefly
    );
}


// =====================================================
// FILE UPLOAD
// =====================================================

const fileInput =
    document.getElementById(
        "fileInput"
    );


const graveCount =
    document.getElementById(
        "graveCount"
    );


let buriedFiles = 0;


if (fileInput) {

    fileInput.addEventListener(
        "change",
        function () {

            const file =
                fileInput.files[0];


            if (!file) {
                return;
            }


            const x =
                (Math.random() - 0.5)
                * 12;


            const z =
                -20 -
                Math.random() * 30;


            createGrave(
                x,
                z,
                file.name
            );


            buriedFiles++;


            if (graveCount) {

                graveCount.textContent =
                    "Files buried: " +
                    buriedFiles;

            }


            fileInput.value =
                "";

        }
    );
}


// =====================================================
// GATE ANIMATION
// =====================================================

let gateProgress = 0;


function updateGate() {

    const dx =
        camera.position.x;


    const dz =
        camera.position.z -
        entrance.position.z;


    const distance =
        Math.sqrt(
            dx * dx +
            dz * dz
        );


    let target = 0;


    // Open gate when close

    if (distance < 17) {

        target = 1;

    }


    // Smooth animation

    gateProgress +=
        (
            target -
            gateProgress
        ) * 0.045;


    // Left door

    leftGate.rotation.y =
        THREE.MathUtils.lerp(
            0,
            -Math.PI * 0.65,
            gateProgress
        );


    // Right door

    rightGate.rotation.y =
        THREE.MathUtils.lerp(
            0,
            Math.PI * 0.65,
            gateProgress
        );
}


// =====================================================
// CLICK ON GRAVES
// =====================================================

const raycaster =
    new THREE.Raycaster();


const mouse =
    new THREE.Vector2();


window.addEventListener(
    "click",
    function (event) {

        mouse.x =
            (
                event.clientX /
                window.innerWidth
            ) * 2 - 1;


        mouse.y =
            -(
                event.clientY /
                window.innerHeight
            ) * 2 + 1;


        raycaster.setFromCamera(
            mouse,
            camera
        );


        const clickableObjects = [];


        scene.traverse(
            function (object) {

                if (
                    object.isMesh &&
                    object.parent &&
                    object.parent.userData &&
                    object.parent.userData.fileName
                ) {

                    clickableObjects.push(
                        object
                    );

                }

            }
        );


        const hits =
            raycaster.intersectObjects(
                clickableObjects
            );


        if (
            hits.length === 0
        ) {

            return;

        }


        const grave =
            hits[0]
                .object
                .parent;


        const panel =
            document.getElementById(
                "infoPanel"
            );


        if (!panel) {
            return;
        }


        panel.style.display =
            "block";


        panel.innerHTML = `

            <button
                id="closeInfo"
                style="
                    position:absolute;
                    top:8px;
                    right:12px;
                    background:none;
                    border:none;
                    color:#aaa;
                    font-size:25px;
                    cursor:pointer;
                "
            >
                ×
            </button>

            <h2>
                ⚰ ${grave.userData.fileName}
            </h2>

            <p>
                ☠ Status: Buried
            </p>

            <p>
                💀 Cause of death:
                Never opened again.
            </p>

            <p>
                🪦 CTRL + Z CEMETARY
            </p>

        `;


        const closeButton =
            document.getElementById(
                "closeInfo"
            );


        if (closeButton) {

            closeButton.onclick =
                function () {

                    panel.style.display =
                        "none";

                };

        }

    }
);


// =====================================================
// WINDOW RESIZE
// =====================================================

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


// =====================================================
// ANIMATION LOOP
// =====================================================

const clock =
    new THREE.Clock();


function animate() {

    requestAnimationFrame(
        animate
    );


    const time =
        clock.getElapsedTime();


    // Gate

    updateGate();


    // Fireflies

    fireflies.forEach(
        function (fly, index) {

            fly.position.y +=
                Math.sin(
                    time * 2 +
                    index
                ) * 0.002;


            fly.position.x +=
                Math.sin(
                    time +
                    index
                ) * 0.001;

        }
    );


    // Torch flicker

    torchLights.forEach(
        function (light, index) {

            light.intensity =
                2.5 +
                Math.sin(
                    time * 8 +
                    index
                ) * 0.5;

        }
    );


    controls.update();


    renderer.render(
        scene,
        camera
    );

}


// =====================================================
// START
// =====================================================

animate();

console.log(
    "CTRL + Z CEMETARY loaded successfully."
);
