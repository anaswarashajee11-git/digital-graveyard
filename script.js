// =====================================================
// CTRL + Z CEMETARY
// PREMIUM 3D DIGITAL GRAVEYARD
// =====================================================


// =====================================================
// CHECK THREE.JS
// =====================================================

if (typeof THREE === "undefined") {

    alert("Three.js failed to load.");

    throw new Error("Three.js not loaded.");

}


if (typeof THREE.OrbitControls === "undefined") {

    alert("OrbitControls failed to load.");

    throw new Error("OrbitControls not loaded.");

}


// =====================================================
// CONTAINER
// =====================================================

const container =
    document.getElementById("scene");


if (!container) {

    throw new Error(
        "Could not find #scene"
    );

}


// =====================================================
// SCENE
// =====================================================

const scene =
    new THREE.Scene();


scene.background =
    new THREE.Color(
        0x020204
    );


scene.fog =
    new THREE.FogExp2(
        0x05070a,
        0.018
    );


// =====================================================
// CAMERA
// =====================================================

const camera =
    new THREE.PerspectiveCamera(
        60,
        window.innerWidth /
        window.innerHeight,
        0.1,
        500
    );


camera.position.set(
    0,
    6,
    40
);


// =====================================================
// RENDERER
// =====================================================

const renderer =
    new THREE.WebGLRenderer({
        antialias: true
    });


renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);


renderer.shadowMap.enabled =
    true;


renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;


container.appendChild(
    renderer.domElement
);


// =====================================================
// CONTROLS
// =====================================================

const controls =
    new THREE.OrbitControls(
        camera,
        renderer.domElement
    );


controls.enableDamping =
    true;


controls.dampingFactor =
    0.06;


controls.minDistance =
    5;


controls.maxDistance =
    60;


controls.maxPolarAngle =
    Math.PI / 2.05;


controls.target.set(
    0,
    4,
    10
);


// =====================================================
// LIGHTING
// =====================================================

const ambient =
    new THREE.AmbientLight(
        0x777788,
        0.55
    );


scene.add(
    ambient
);


const moonLight =
    new THREE.DirectionalLight(
        0x8295c4,
        1.5
    );


moonLight.position.set(
    -20,
    30,
    10
);


moonLight.castShadow =
    true;


scene.add(
    moonLight
);


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
            color: 0xd9d9d9
        })

    );


moon.position.set(
    -20,
    25,
    -30
);


scene.add(
    moon
);


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


ground.receiveShadow =
    true;


scene.add(
    ground
);


// =====================================================
// PATH
// =====================================================

const path =
    new THREE.Mesh(

        new THREE.PlaneGeometry(
            9,
            100
        ),

        new THREE.MeshStandardMaterial({
            color: 0x29263c,
            roughness: 0.95
        })

    );


path.rotation.x =
    -Math.PI / 2;


path.position.set(
    0,
    0.03,
    -5
);


scene.add(
    path
);


// =====================================================
// MATERIALS
// =====================================================

const stoneMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x303038,
        roughness: 0.85
    });


const darkStoneMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x15161b,
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
        color: 0x9a6d35,
        metalness: 0.8,
        roughness: 0.25
    });


// =====================================================
// ENTRANCE
// =====================================================

const entrance =
    new THREE.Group();


entrance.position.z =
    20;


scene.add(
    entrance
);


// =====================================================
// TOWERS
// =====================================================

function createTower(x) {

    const tower =
        new THREE.Group();


    tower.position.x =
        x;


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


    body.position.y =
        5.5;


    body.castShadow =
        true;


    tower.add(
        body
    );


    // Base

    const base =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                6,
                1.5,
                6
            ),

            darkStoneMaterial

        );


    base.position.y =
        0.75;


    tower.add(
        base
    );


    // Upper platform

    const top =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                6,
                1,
                6
            ),

            stoneMaterial

        );


    top.position.y =
        11.2;


    tower.add(
        top
    );


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


    roof.position.y =
        14;


    roof.rotation.y =
        Math.PI / 4;


    roof.castShadow =
        true;


    tower.add(
        roof
    );


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
            i * 1.3,
            5,
            2.55
        );


        tower.add(
            column
        );

    }


    // Gothic spikes

    for (
        let i = -1;
        i <= 1;
        i++
    ) {

        const spike =
            new THREE.Mesh(

                new THREE.ConeGeometry(
                    0.3,
                    1.2,
                    4
                ),

                goldMaterial

            );


        spike.position.set(
            i * 1.3,
            12,
            0
        );


        tower.add(
            spike
        );

    }


    entrance.add(
        tower
    );

}


createTower(-9);

createTower(9);


// =====================================================
// TOP ARCH
// =====================================================

const arch =
    new THREE.Mesh(

        new THREE.BoxGeometry(
            18,
            2.5,
            3
        ),

        darkStoneMaterial

    );


arch.position.set(
    0,
    10.8,
    0
);


entrance.add(
    arch
);


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


    entrance.add(
        spike
    );

}


// =====================================================
// SIGN
// =====================================================

const canvas =
    document.createElement(
        "canvas"
    );


canvas.width =
    1200;


canvas.height =
    300;


const ctx =
    canvas.getContext(
        "2d"
    );


ctx.fillStyle =
    "#08090d";


ctx.fillRect(
    0,
    0,
    1200,
    300
);


ctx.strokeStyle =
    "#bd8c4a";


ctx.lineWidth =
    12;


ctx.strokeRect(
    10,
    10,
    1180,
    280
);


ctx.textAlign =
    "center";


ctx.textBaseline =
    "middle";


ctx.shadowColor =
    "#d39b4e";


ctx.shadowBlur =
    25;


ctx.fillStyle =
    "#ddb06c";


ctx.font =
    "bold 85px Georgia";


ctx.fillText(
    "CTRL + Z",
    600,
    105
);


ctx.font =
    "bold 70px Georgia";


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
    10.6,
    -1.6
);


entrance.add(
    sign
);


// =====================================================
// GATE DOORS
// =====================================================

const leftGate =
    new THREE.Group();


const rightGate =
    new THREE.Group();


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


entrance.add(
    leftGate
);


entrance.add(
    rightGate
);


// =====================================================
// GATE CREATION
// =====================================================

function createGate(
    parent,
    side
) {

    // Vertical bars

    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const x =
            side *
            (0.7 + i * 1.05);


        const bar =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.24,
                    7,
                    0.24
                ),

                ironMaterial

            );


        bar.position.set(
            x,
            3.5,
            0
        );


        parent.add(
            bar
        );


        // Spikes

        const spike =
            new THREE.Mesh(

                new THREE.ConeGeometry(
                    0.22,
                    1,
                    5
                ),

                ironMaterial

            );


        spike.position.set(
            x,
            7.5,
            0
        );


        parent.add(
            spike
        );

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
            side * 3.8,
            y,
            0
        );


        parent.add(
            horizontal
        );

    }


    // Golden circular decoration

    const ring =
        new THREE.Mesh(

            new THREE.TorusGeometry(
                1.5,
                0.14,
                10,
                32
            ),

            goldMaterial

        );


    ring.position.set(
        side * 3.8,
        3.5,
        -0.2
    );


    parent.add(
        ring
    );

}


createGate(
    leftGate,
    1
);


createGate(
    rightGate,
    -1
);


// =====================================================
// TORCHES
// =====================================================

const fireLights = [];


function createTorch(
    x,
    z
) {

    const flame =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.45,
                12,
                12
            ),

            new THREE.MeshBasicMaterial({
                color: 0xff7b20
            })

        );


    flame.position.set(
        x,
        5,
        z
    );


    flame.scale.y =
        1.5;


    scene.add(
        flame
    );


    const light =
        new THREE.PointLight(
            0xff8a30,
            3,
            12
        );


    light.position.set(
        x,
        5,
        z
    );


    scene.add(
        light
    );


    fireLights.push(
        light
    );

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


    const tomb =
        new THREE.Mesh(
            geometry,
            stoneMaterial
        );


    tomb.castShadow =
        true;


    group.add(
        tomb
    );


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


    group.add(
        vertical
    );


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


    group.add(
        horizontal
    );


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


    group.add(
        candle
    );


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


    group.add(
        candleLight
    );


    group.position.set(
        x,
        0,
        z
    );


    group.userData.fileName =
        name;


    scene.add(
        group
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
    i < 250;
    i++
) {

    const grass =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                0.08,
                Math.random() *
                0.7 + 0.3,
                4
            ),

            grassMaterial

        );


    grass.position.set(

        (Math.random() - 0.5)
        * 90,

        0.2,

        (Math.random() - 0.5)
        * 80

    );


    scene.add(
        grass
    );

}


// =====================================================
// FIREFLIES
// =====================================================

const fireflies = [];


const flyMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xffff99
    });


for (
    let i = 0;
    i < 150;
    i++
) {

    const fly =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.08,
                0.08,
                0.08
            ),

            flyMaterial

        );


    fly.position.set(

        (Math.random() - 0.5)
        * 90,

        Math.random() * 15 + 2,

        (Math.random() - 0.5)
        * 80

    );


    scene.add(
        fly
    );


    fireflies.push(
        fly
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


            if (!file) return;


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
// GATE OPENING
// =====================================================

let gateAmount = 0;


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


    /*
        Gate opens when camera
        comes within 16 units.
    */

    let target = 0;


    if (distance < 16) {

        target = 1;

    }


    // Smooth animation

    gateAmount +=
        (
            target -
            gateAmount
        ) * 0.05;


    // Left door opens left

    leftGate.rotation.y =
        THREE.MathUtils.lerp(
            0,
            -Math.PI * 0.65,
            gateAmount
        );


    // Right door opens right

    rightGate.rotation.y =
        THREE.MathUtils.lerp(
            0,
            Math.PI * 0.65,
            gateAmount
        );

}


// =====================================================
// CLICK GRAVE
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


            const panel =
                document.getElementById(
                    "infoPanel"
                );


            if (!panel) return;


            panel.style.display =
                "block";


            panel.innerHTML = `

                <h2>
                    ⚰️ ${grave.userData.fileName}
                </h2>

                <p>
                    ☠️ Status:
                    Buried
                </p>

                <p>
                    💀 Cause of death:
                    Never opened again.
                </p>

                <p>
                    🪦 Welcome to
                    CTRL + Z CEMETARY.
                </p>

                <button
                    id="closeInfo"
                    style="
                        position:absolute;
                        right:12px;
                        top:8px;
                        background:none;
                        border:none;
                        color:#aaa;
                        font-size:25px;
                        cursor:pointer;
                    "
                >
                    ×
                </button>

            `;


            document
                .getElementById(
                    "closeInfo"
                )
                .onclick =
                function () {

                    panel.style.display =
                        "none";

                };

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


    // Gate

    updateGate();


    // Fireflies

    fireflies.forEach(
        function (fly, i) {

            fly.position.y +=
                Math.sin(
                    time * 2 + i
                ) * 0.002;


            fly.position.x +=
                Math.sin(
                    time + i
                ) * 0.001;

        }
    );


    // Torch flickering

    fireLights.forEach(
        function (light, i) {

            light.intensity =
                2.5 +
                Math.sin(
                    time * 8 + i
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
