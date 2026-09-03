// =====================================================
// CTRL + Z CEMETARY
// Premium Gothic 3D Digital Graveyard
// =====================================================

if (typeof THREE === "undefined") {
    alert("Three.js failed to load!");
    throw new Error("Three.js not loaded");
}

const container = document.getElementById("scene");


// =====================================================
// SCENE
// =====================================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x020306);

scene.fog = new THREE.FogExp2(
    0x05070b,
    0.018
);


// =====================================================
// CAMERA
// =====================================================

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Start outside the gate
camera.position.set(
    0,
    5,
    38
);


// =====================================================
// RENDERER
// =====================================================

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

container.innerHTML = "";
container.appendChild(renderer.domElement);


// =====================================================
// CONTROLS
// =====================================================

const controls =
    new THREE.OrbitControls(
        camera,
        renderer.domElement
    );

controls.enableDamping = true;
controls.dampingFactor = 0.06;

controls.minDistance = 5;
controls.maxDistance = 55;

controls.maxPolarAngle =
    Math.PI / 2.05;

controls.target.set(
    0,
    4,
    0
);


// =====================================================
// LIGHTING
// =====================================================

const ambientLight =
    new THREE.AmbientLight(
        0x777788,
        0.35
    );

scene.add(ambientLight);


const moonLight =
    new THREE.DirectionalLight(
        0x8095c9,
        1.5
    );

moonLight.position.set(
    -20,
    35,
    15
);

moonLight.castShadow = true;

scene.add(moonLight);


// =====================================================
// MOON
// =====================================================

const moon =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            4,
            32,
            32
        ),
        new THREE.MeshBasicMaterial({
            color: 0xdcdcdc
        })
    );

moon.position.set(
    -20,
    25,
    -35
);

scene.add(moon);


// =====================================================
// GROUND
// =====================================================

const ground =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            120,
            120
        ),
        new THREE.MeshStandardMaterial({
            color: 0x11191b,
            roughness: 1
        })
    );

ground.rotation.x =
    -Math.PI / 2;

ground.receiveShadow = true;

scene.add(ground);


// =====================================================
// PATH
// =====================================================

const path =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            9,
            90
        ),
        new THREE.MeshStandardMaterial({
            color: 0x28253b,
            roughness: 0.95
        })
    );

path.rotation.x =
    -Math.PI / 2;

path.position.set(
    0,
    0.03,
    -8
);

scene.add(path);


// =====================================================
// MATERIALS
// =====================================================

const stoneMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x292a31,
        roughness: 0.85,
        metalness: 0.05
    });


const darkStoneMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x17181d,
        roughness: 0.9
    });


const ironMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x08090d,
        metalness: 0.85,
        roughness: 0.25
    });


const goldMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x8b6232,
        metalness: 0.8,
        roughness: 0.25
    });


// =====================================================
// PREMIUM ENTRANCE
// =====================================================

const entrance =
    new THREE.Group();

entrance.position.z = 20;

scene.add(entrance);


// =====================================================
// STONE TOWERS
// =====================================================

function createTower(x) {

    const tower =
        new THREE.Group();

    tower.position.x = x;

    // Main tower
    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                4.5,
                10,
                4.5
            ),
            stoneMaterial
        );

    body.position.y = 5;

    body.castShadow = true;

    tower.add(body);


    // Lower decorative block
    const base =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                5.5,
                1.5,
                5.5
            ),
            darkStoneMaterial
        );

    base.position.y = 0.75;

    tower.add(base);


    // Upper platform
    const platform =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                5.3,
                1,
                5.3
            ),
            stoneMaterial
        );

    platform.position.y = 10.2;

    tower.add(platform);


    // Spire
    const roof =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                3.1,
                5,
                4
            ),
            darkStoneMaterial
        );

    roof.position.y = 13;

    roof.rotation.y =
        Math.PI / 4;

    roof.castShadow = true;

    tower.add(roof);


    // Decorative vertical strips
    for (
        let i = -1;
        i <= 1;
        i++
    ) {

        const strip =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.35,
                    8,
                    0.4
                ),
                darkStoneMaterial
            );

        strip.position.set(
            i * 1.2,
            5,
            2.3
        );

        tower.add(strip);
    }


    // Gargoyle
    createGargoyle(
        tower,
        0,
        11.2,
        0
    );


    // Lantern
    createLantern(
        tower,
        0,
        5.5,
        2.5
    );


    entrance.add(tower);
}


createTower(-9);
createTower(9);


// =====================================================
// GARGOYLE
// =====================================================

function createGargoyle(
    parent,
    x,
    y,
    z
) {

    const gargoyle =
        new THREE.Group();

    gargoyle.position.set(
        x,
        y,
        z
    );


    // Body
    const body =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.9,
                12,
                12
            ),
            darkStoneMaterial
        );

    body.scale.set(
        1,
        1.3,
        0.8
    );

    gargoyle.add(body);


    // Head
    const head =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.55,
                12,
                12
            ),
            darkStoneMaterial
        );

    head.position.y =
        1.05;

    gargoyle.add(head);


    // Horns
    for (
        let side = -1;
        side <= 1;
        side += 2
    ) {

        const horn =
            new THREE.Mesh(
                new THREE.ConeGeometry(
                    0.18,
                    0.8,
                    6
                ),
                darkStoneMaterial
            );

        horn.position.set(
            side * 0.3,
            1.55,
            0
        );

        horn.rotation.z =
            side * -0.4;

        gargoyle.add(horn);
    }


    // Wings
    for (
        let side = -1;
        side <= 1;
        side += 2
    ) {

        const wing =
            new THREE.Mesh(
                new THREE.ConeGeometry(
                    0.9,
                    1.8,
                    4
                ),
                darkStoneMaterial
            );

        wing.position.set(
            side * 0.9,
            1,
            0
        );

        wing.rotation.z =
            side * -0.8;

        gargoyle.add(wing);
    }


    parent.add(gargoyle);
}


// =====================================================
// LANTERN
// =====================================================

const torchLights = [];

function createLantern(
    parent,
    x,
    y,
    z
) {

    const lantern =
        new THREE.Group();

    lantern.position.set(
        x,
        y,
        z
    );


    // Frame
    const frameMaterial =
        ironMaterial;


    const top =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                0.7,
                0.7,
                6
            ),
            frameMaterial
        );

    top.position.y =
        1.5;

    lantern.add(top);


    // Glow
    const glow =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.3,
                12,
                12
            ),
            new THREE.MeshBasicMaterial({
                color: 0xffb84d
            })
        );

    glow.position.y =
        0.7;

    lantern.add(glow);


    const light =
        new THREE.PointLight(
            0xffa43a,
            2.5,
            9
        );

    light.position.y =
        0.7;

    lantern.add(light);

    torchLights.push(light);

    parent.add(lantern);
}


// =====================================================
// GATE SYSTEM
// =====================================================

const leftGate =
    new THREE.Group();

const rightGate =
    new THREE.Group();


// Hinges

leftGate.position.set(
    -7,
    0,
    19.7
);

rightGate.position.set(
    7,
    0,
    19.7
);

entrance.add(leftGate);
entrance.add(rightGate);


// =====================================================
// CREATE GATE DOOR
// =====================================================

function createGateDoor(
    parent,
    side
) {

    const door =
        new THREE.Group();


    // Main frame
    const frame =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                6.8,
                7,
                0.3
            ),
            ironMaterial
        );

    frame.position.x =
        side * 3.4;

    frame.position.y =
        3.5;

    parent.add(frame);


    // Vertical bars
    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const x =
            side *
            (0.8 + i * 1.05);

        const bar =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.18,
                    6.3,
                    0.18
                ),
                ironMaterial
            );

        bar.position.set(
            x,
            3.3,
            0
        );

        parent.add(bar);


        // Spike
        const spike =
            new THREE.Mesh(
                new THREE.ConeGeometry(
                    0.22,
                    0.9,
                    5
                ),
                ironMaterial
            );

        spike.position.set(
            x,
            6.8,
            0
        );

        parent.add(spike);
    }


    // Horizontal decorative bars
    for (
        let y = 1.5;
        y <= 5.5;
        y += 2
    ) {

        const horizontal =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    6.5,
                    0.2,
                    0.2
                ),
                ironMaterial
            );

        horizontal.position.set(
            side * 3.4,
            y,
            0
        );

        parent.add(horizontal);
    }


    // Decorative circle
    const ring =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                1.5,
                0.12,
                8,
                32
            ),
            goldMaterial
        );

    ring.position.set(
        side * 3.4,
        3.6,
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
// TOP ORNAMENT
// =====================================================

const arch =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            19,
            2,
            2.2
        ),
        darkStoneMaterial
    );

arch.position.set(
    0,
    10.5,
    20
);

entrance.add(arch);


// =====================================================
// ORNAMENTAL GOLD CENTER
// =====================================================

const ornament =
    new THREE.Mesh(
        new THREE.TorusKnotGeometry(
            1.4,
            0.18,
            64,
            8,
            2,
            3
        ),
        goldMaterial
    );

ornament.position.set(
    0,
    11.8,
    18.8
);

ornament.scale.set(
    1.2,
    0.8,
    0.4
);

entrance.add(ornament);


// =====================================================
// SIGN
// =====================================================

const canvas =
    document.createElement("canvas");

canvas.width = 1200;
canvas.height = 300;

const ctx =
    canvas.getContext("2d");


// Background
ctx.fillStyle =
    "#08090d";

ctx.fillRect(
    0,
    0,
    1200,
    300
);


// Border
ctx.strokeStyle =
    "#a77738";

ctx.lineWidth = 12;

ctx.strokeRect(
    12,
    12,
    1176,
    276
);


// Glow
ctx.shadowColor =
    "#d39a45";

ctx.shadowBlur = 25;


// Main text
ctx.fillStyle =
    "#d6a45c";

ctx.font =
    "bold 92px Georgia";

ctx.textAlign =
    "center";

ctx.textBaseline =
    "middle";

ctx.fillText(
    "CTRL + Z",
    600,
    105
);


ctx.font =
    "bold 72px Georgia";

ctx.fillText(
    "CEMETARY",
    600,
    205
);


const signTexture =
    new THREE.CanvasTexture(
        canvas
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
    18.75
);

entrance.add(sign);


// =====================================================
// FIRE BRAZIERS
// =====================================================

function createFire(
    x,
    z
) {

    const fire =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.45,
                12,
                12
            ),
            new THREE.MeshBasicMaterial({
                color: 0xff7a20
            })
        );

    fire.position.set(
        x,
        1.2,
        z
    );

    fire.scale.y = 1.5;

    scene.add(fire);


    const light =
        new THREE.PointLight(
            0xff8a32,
            3,
            10
        );

    light.position.set(
        x,
        1.5,
        z
    );

    scene.add(light);

    torchLights.push(light);
}


createFire(-12, 20);
createFire(12, 20);


// =====================================================
// GRAVES
// =====================================================

function createGrave(
    x,
    z,
    name
) {

    const group =
        new THREE.Group();


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


    const grave =
        new THREE.Mesh(
            geometry,
            stoneMaterial
        );

    grave.castShadow = true;

    group.add(grave);


    // Cross
    const crossMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x555555
        });


    const vertical =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.18,
                1.5,
                0.18
            ),
            crossMaterial
        );

    vertical.position.set(
        0,
        3,
        -0.3
    );

    group.add(vertical);


    const horizontal =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.9,
                0.18,
                0.18
            ),
            crossMaterial
        );

    horizontal.position.set(
        0,
        3.2,
        -0.3
    );

    group.add(horizontal);


    // Candle
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

    group.add(candle);


    const candleLight =
        new THREE.PointLight(
            0xffaa44,
            1.5,
            6
        );

    candleLight.position.set(
        1.6,
        1,
        0
    );

    group.add(candleLight);


    group.position.set(
        x,
        0,
        z
    );


    group.userData = {
        fileName: name
    };


    scene.add(group);

    return group;
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
    -3,
    -16,
    "project_old.zip"
);

createGrave(
    3,
    -16,
    "backup_2023.pdf"
);


// =====================================================
// GRASS
// =====================================================

const grassMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x101718
    });


for (
    let i = 0;
    i < 300;
    i++
) {

    const grass =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                0.08,
                Math.random() * 0.8 + 0.3,
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

const flyGeometry =
    new THREE.BoxGeometry(
        0.08,
        0.08,
        0.08
    );

const flyMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xffff99
    });


for (
    let i = 0;
    i < 180;
    i++
) {

    const fly =
        new THREE.Mesh(
            flyGeometry,
            flyMaterial
        );


    fly.position.set(
        (Math.random() - 0.5) * 90,
        Math.random() * 15 + 2,
        (Math.random() - 0.5) * 80
    );


    scene.add(fly);

    fireflies.push(fly);
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

            if (!file) return;


            const x =
                (Math.random() - 0.5) * 12;


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


            fileInput.value = "";
        }
    );
}


// =====================================================
// GATE OPENING SYSTEM
// =====================================================

// Closed position
let gateOpened = false;

let gateOpeningProgress = 0;


// How close user must zoom
const GATE_OPEN_DISTANCE = 17;


// Original rotations
const LEFT_CLOSED = 0;
const RIGHT_CLOSED = 0;


// Open outward
const LEFT_OPEN =
    -Math.PI * 0.62;

const RIGHT_OPEN =
    Math.PI * 0.62;


// =====================================================
// CHECK CAMERA DISTANCE
// =====================================================

function updateGate() {

    // Gate center is approximately z = 20
    const gateZ =
        entrance.position.z;


    const dx =
        camera.position.x;

    const dz =
        camera.position.z -
        gateZ;


    const distance =
        Math.sqrt(
            dx * dx +
            dz * dz
        );


    // User zooms toward gate
    if (
        distance <
        GATE_OPEN_DISTANCE
    ) {

        gateOpened = true;

    } else {

        gateOpened = false;
    }


    // Smooth animation
    const target =
        gateOpened ? 1 : 0;


    gateOpeningProgress +=
        (
            target -
            gateOpeningProgress
        ) * 0.045;


    leftGate.rotation.y =
        THREE.MathUtils.lerp(
            LEFT_CLOSED,
            LEFT_OPEN,
            gateOpeningProgress
        );


    rightGate.rotation.y =
        THREE.MathUtils.lerp(
            RIGHT_CLOSED,
            RIGHT_OPEN,
            gateOpeningProgress
        );
}


// =====================================================
// CLICK GRAVES
// =====================================================

const raycaster =
    new THREE.Raycaster();

const mouse =
    new THREE.Vector2();


window.addEventListener(
    "click",
    function (event) {

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


        scene.traverse(
            function (object) {

                if (
                    object.isMesh &&
                    object.parent &&
                    object.parent.userData &&
                    object.parent.userData.fileName
                ) {

                    objects.push(
                        object
                    );
                }
            }
        );


        const hits =
            raycaster.intersectObjects(
                objects
            );


        if (
            hits.length > 0
        ) {

            const grave =
                hits[0]
                    .object
                    .parent;


            const infoPanel =
                document.getElementById(
                    "infoPanel"
                );


            if (infoPanel) {

                infoPanel.style.display =
                    "block";


                infoPanel.innerHTML = `

                    <button
                        id="closeInfo"
                        style="
                            position:absolute;
                            right:10px;
                            top:5px;
                            background:none;
                            border:none;
                            color:white;
                            font-size:24px;
                            cursor:pointer;
                        "
                    >
                        ×
                    </button>

                    <h2>
                        ⚰️ ${grave.userData.fileName}
                    </h2>

                    <p>
                        ☠️ Status: Buried
                    </p>

                    <p>
                        Cause of death:
                        Never opened again.
                    </p>
                `;


                document
                    .getElementById(
                        "closeInfo"
                    )
                    .onclick =
                    function () {

                        infoPanel.style.display =
                            "none";
                    };
            }
        }
    }
);


// =====================================================
// RESIZE
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
// ANIMATION
// =====================================================

const clock =
    new THREE.Clock();


function animate() {

    requestAnimationFrame(
        animate
    );


    const time =
        clock.getElapsedTime();


    // Gate animation
    updateGate();


    // Fireflies
    fireflies.forEach(
        (fly, index) => {

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


    // Flickering torches
    torchLights.forEach(
        (light, index) => {

            light.intensity =
                2 +
                Math.sin(
                    time * 7 +
                    index
                ) * 0.4;
        }
    );


    controls.update();


    renderer.render(
        scene,
        camera
    );
}


animate();
