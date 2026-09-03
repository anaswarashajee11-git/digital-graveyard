// =====================================================
// CTRL + Z CEMETARY
// 3D DIGITAL GRAVEYARD
// =====================================================

if (typeof THREE === "undefined") {
    alert("Three.js is not loading.");
    throw new Error("Three.js not found");
}

if (typeof THREE.OrbitControls === "undefined") {
    alert("OrbitControls is not loading.");
    throw new Error("OrbitControls not found");
}

const container = document.getElementById("scene");

if (!container) {
    alert("Scene container is missing.");
    throw new Error("Missing #scene");
}


// =====================================================
// SCENE
// =====================================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x030305);

scene.fog = new THREE.FogExp2(
    0x050609,
    0.012
);


// =====================================================
// CAMERA
// =====================================================

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    500
);

camera.position.set(
    0,
    6,
    45
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

controls.enableDamping = true;

controls.dampingFactor = 0.06;

controls.minDistance = 4;

controls.maxDistance = 75;

controls.maxPolarAngle =
    Math.PI / 2.05;

controls.target.set(
    0,
    5,
    18
);


// =====================================================
// LIGHTING
// =====================================================

const ambientLight =
    new THREE.AmbientLight(
        0x777788,
        0.8
    );

scene.add(
    ambientLight
);


const moonLight =
    new THREE.DirectionalLight(
        0x8899cc,
        1.8
    );

moonLight.position.set(
    -20,
    35,
    -25
);

moonLight.castShadow = true;

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
            140,
            140
        ),
        new THREE.MeshStandardMaterial({
            color: 0x111719,
            roughness: 1
        })
    );

ground.rotation.x =
    -Math.PI / 2;

ground.receiveShadow = true;

scene.add(
    ground
);


// =====================================================
// PATH
// =====================================================

const path =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            10,
            110
        ),
        new THREE.MeshStandardMaterial({
            color: 0x292735,
            roughness: 1
        })
    );

path.rotation.x =
    -Math.PI / 2;

path.position.set(
    0,
    0.03,
    -15
);

scene.add(
    path
);


// =====================================================
// MATERIALS
// =====================================================

const stoneMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x45454d,
        roughness: 0.9
    });

const darkStoneMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x17181d,
        roughness: 0.9
    });

const ironMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x090a0e,
        metalness: 0.85,
        roughness: 0.25
    });

const goldMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xb88945,
        metalness: 0.85,
        roughness: 0.2
    });


// =====================================================
// ENTRANCE
// =====================================================

const entrance =
    new THREE.Group();

entrance.position.set(
    0,
    0,
    20
);

scene.add(
    entrance
);


// =====================================================
// TOWERS
// =====================================================

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

    base.position.y = 0.75;

    tower.add(base);


    // Top

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


    // Roof

    const roof =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                3.5,
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


    // Vertical decorations

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


    // Gold decorations

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


    entrance.add(
        tower
    );
}

createTower(-9);
createTower(9);


// =====================================================
// ARCH
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

const signCanvas =
    document.createElement(
        "canvas"
    );

signCanvas.width = 1200;

signCanvas.height = 300;

const ctx =
    signCanvas.getContext("2d");

ctx.fillStyle =
    "#08090d";

ctx.fillRect(
    0,
    0,
    1200,
    300
);

ctx.strokeStyle =
    "#c49a5a";

ctx.lineWidth = 12;

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
    "#d5a85e";

ctx.shadowBlur = 20;

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

entrance.add(
    sign
);


// =====================================================
// GATE
// =====================================================

const leftGate =
    new THREE.Group();

const rightGate =
    new THREE.Group();


// IMPORTANT:
// Position each door around its hinge.

leftGate.position.set(
    -0.3,
    0,
    0
);

rightGate.position.set(
    0.3,
    0,
    0
);

entrance.add(
    leftGate
);

entrance.add(
    rightGate
);


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

        const x =
            direction *
            (0.3 + i * 1.0);

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
            x,
            3.5,
            0
        );

        parent.add(
            bar
        );


        // Gold spikes

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
                    7,
                    0.22,
                    0.22
                ),
                ironMaterial
            );

        horizontal.position.set(
            direction * 3.3,
            y,
            0
        );

        parent.add(
            horizontal
        );
    }


    // Door handle

    const ring =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                0.55,
                0.12,
                10,
                32
            ),
            goldMaterial
        );

    ring.position.set(
        direction * 3.3,
        3.5,
        -0.3
    );

    parent.add(
        ring
    );
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
                0.45,
                12,
                12
            ),
            new THREE.MeshBasicMaterial({
                color: 0xff7020
            })
        );

    flame.position.set(
        x,
        5,
        z
    );

    flame.scale.y = 1.5;

    scene.add(
        flame
    );


    const light =
        new THREE.PointLight(
            0xff8b32,
            3,
            15
        );

    light.position.set(
        x,
        5,
        z
    );

    scene.add(
        light
    );

    torchLights.push(
        light
    );
}

createTorch(-6, 18);

createTorch(6, 18);


// =====================================================
// GRAVEYARD
// =====================================================

const graves = [];

let buriedFiles = 0;


// =====================================================
// CREATE TEXT LABEL
// =====================================================

function createGraveLabel(
    text
) {

    const canvas =
        document.createElement(
            "canvas"
        );

    canvas.width = 600;

    canvas.height = 160;

    const context =
        canvas.getContext("2d");

    context.fillStyle =
        "rgba(10,10,12,0.9)";

    context.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    context.strokeStyle =
        "#b88945";

    context.lineWidth = 6;

    context.strokeRect(
        5,
        5,
        590,
        150
    );

    context.fillStyle =
        "#e2c58c";

    context.font =
        "bold 34px Arial";

    context.textAlign =
        "center";

    context.textBaseline =
        "middle";

    let displayText =
        text;

    if (displayText.length > 24) {
        displayText =
            displayText.substring(
                0,
                21
            ) + "...";
    }

    context.fillText(
        displayText,
        300,
        80
    );

    const texture =
        new THREE.CanvasTexture(
            canvas
        );

    const label =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                2.7,
                0.72
            ),
            new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true
            })
        );

    label.position.set(
        0,
        4.6,
        0
    );

    return label;
}


// =====================================================
// CREATE GRAVE
// =====================================================

function createGrave(
    x,
    z,
    file
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


    // Cross

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

    grave.add(
        candle
    );


    // Candle light

    const candleLight =
        new THREE.PointLight(
            0xffa844,
            1.7,
            7
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

    const fileName =
        file ? file.name : "Forgotten File";

    grave.userData = {

        fileName: fileName,

        fileSize:
            file
                ? formatFileSize(file.size)
                : "Unknown",

        lastModified:
            file
                ? new Date(
                    file.lastModified
                ).toLocaleString()
                : "Unknown",

        type:
            file
                ? (
                    file.type ||
                    "Unknown file type"
                )
                : "Unknown",

        status: "Buried",

        cause:
            "Never opened again."
    };


    // Add readable file label

    const label =
        createGraveLabel(
            fileName
        );

    grave.add(
        label
    );


    grave.position.set(
        x,
        0,
        z
    );


    scene.add(
        grave
    );

    graves.push(
        grave
    );
}


// =====================================================
// FILE SIZE
// =====================================================

function formatFileSize(
    bytes
) {

    if (bytes < 1024) {
        return bytes + " B";
    }

    if (bytes < 1024 * 1024) {
        return (
            bytes / 1024
        ).toFixed(2) + " KB";
    }

    if (
        bytes <
        1024 * 1024 * 1024
    ) {

        return (
            bytes /
            (1024 * 1024)
        ).toFixed(2) + " MB";
    }

    return (
        bytes /
        (1024 * 1024 * 1024)
    ).toFixed(2) + " GB";
}


// =====================================================
// STARTER GRAVES
// =====================================================

createGrave(
    -5,
    7,
    {
        name: "old_project_FINAL.py",
        size: 24576,
        type: "Python File",
        lastModified: Date.now()
    }
);

createGrave(
    5,
    7,
    {
        name: "assignment_FINAL.pdf",
        size: 1048576,
        type: "PDF Document",
        lastModified: Date.now()
    }
);

createGrave(
    -4,
    0,
    {
        name: "website_old.zip",
        size: 5242880,
        type: "ZIP Archive",
        lastModified: Date.now()
    }
);

createGrave(
    4,
    0,
    {
        name: "final_final_v2.docx",
        size: 204800,
        type: "Word Document",
        lastModified: Date.now()
    }
);

createGrave(
    -5,
    -8,
    {
        name: "unused_code.js",
        size: 15360,
        type: "JavaScript File",
        lastModified: Date.now()
    }
);

createGrave(
    5,
    -8,
    {
        name: "forgotten_notes.txt",
        size: 4096,
        type: "Text File",
        lastModified: Date.now()
    }
);


// =====================================================
// GRASS
// =====================================================

const grassMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x18201f
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
                Math.random() * 0.7 + 0.3,
                4
            ),
            grassMaterial
        );

    grass.position.set(
        (
            Math.random() - 0.5
        ) * 100,

        0.2,

        (
            Math.random() - 0.5
        ) * 90
    );

    scene.add(
        grass
    );
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
    i < 140;
    i++
) {

    const fly =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.08,
                0.08,
                0.08
            ),
            fireflyMaterial
        );

    fly.position.set(
        (
            Math.random() - 0.5
        ) * 90,

        Math.random() * 15 + 2,

        (
            Math.random() - 0.5
        ) * 80
    );

    scene.add(
        fly
    );

    fireflies.push(
        fly
    );
}


// =====================================================
// FILE SELECTION
// =====================================================

const fileInput =
    document.getElementById(
        "fileInput"
    );

const graveCount =
    document.getElementById(
        "graveCount"
    );


if (fileInput) {

    fileInput.addEventListener(
        "change",
        function () {

            const files =
                Array.from(
                    fileInput.files
                );

            if (
                files.length === 0
            ) {
                return;
            }


            files.forEach(
                function (file) {

                    const x =
                        (
                            Math.random() - 0.5
                        ) * 14;

                    const z =
                        -15 -
                        Math.random() * 35;


                    createGrave(
                        x,
                        z,
                        file
                    );

                    buriedFiles++;
                }
            );


            if (graveCount) {

                graveCount.textContent =
                    "Files buried: " +
                    buriedFiles;
            }


            // Reset input

            fileInput.value = "";
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


    let target = 0;


    // Start opening earlier

    if (distance < 24) {
        target = 1;
    }


    // VERY SMOOTH movement

    gateAmount +=
        (
            target -
            gateAmount
        ) * 0.035;


    // Extra easing

    const eased =
        gateAmount *
        gateAmount *
        (
            3 -
            2 * gateAmount
        );


    // Open doors

    leftGate.rotation.y =
        THREE.MathUtils.lerp(
            0,
            -Math.PI * 0.75,
            eased
        );

    rightGate.rotation.y =
        THREE.MathUtils.lerp(
            0,
            Math.PI * 0.75,
            eased
        );
}


// =====================================================
// INFO PANEL
// =====================================================

const raycaster =
    new THREE.Raycaster();

const mouse =
    new THREE.Vector2();


window.addEventListener(
    "click",
    function (event) {

        // Ignore clicks on UI

        if (
            event.target.closest(
                "button"
            ) ||
            event.target.closest(
                "label"
            ) ||
            event.target.closest(
                "input"
            )
        ) {
            return;
        }


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


        graves.forEach(
            function (grave) {

                grave.traverse(
                    function (object) {

                        if (
                            object.isMesh
                        ) {

                            objects.push(
                                object
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


        if (
            hits.length === 0
        ) {
            return;
        }


        let selectedGrave =
            null;

        let current =
            hits[0].object;


        while (
            current &&
            current !== scene
        ) {

            if (
                current.userData &&
                current.userData.fileName
            ) {

                selectedGrave =
                    current;

                break;
            }

            current =
                current.parent;
        }


        if (
            !selectedGrave
        ) {
            return;
        }


        const data =
            selectedGrave.userData;


        const panel =
            document.getElementById(
                "infoPanel"
            );


        if (!panel) {
            return;
        }


        panel.innerHTML = `

            <button
                id="closeInfo"
                class="close-info"
            >
                ×
            </button>

            <div class="panel-title">
                ⚰ FILE RECORD
            </div>

            <div class="file-name">
                ${data.fileName}
            </div>

            <div class="detail-row">
                <span>STATUS</span>
                <strong>${data.status}</strong>
            </div>

            <div class="detail-row">
                <span>SIZE</span>
                <strong>${data.fileSize}</strong>
            </div>

            <div class="detail-row">
                <span>TYPE</span>
                <strong>${data.type}</strong>
            </div>

            <div class="detail-row">
                <span>LAST MODIFIED</span>
                <strong>${data.lastModified}</strong>
            </div>

            <div class="cause">
                ☠ CAUSE OF DEATH
                <br>
                <b>${data.cause}</b>
            </div>

            <div class="cemetery-name">
                CTRL + Z CEMETARY
            </div>
        `;


        panel.style.display =
            "block";


        const close =
            document.getElementById(
                "closeInfo"
            );


        if (close) {

            close.onclick =
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
        function (
            fly,
            index
        ) {

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


    // Torch flickering

    torchLights.forEach(
        function (
            light,
            index
        ) {

            light.intensity =
                2.8 +
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


animate();

console.log(
    "CTRL + Z CEMETARY loaded."
);
