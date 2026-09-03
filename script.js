// =====================================================
// CTRL + Z CEMETERY
// 3D SPOOKY DIGITAL GRAVEYARD
// =====================================================


if (typeof THREE === "undefined") {

    alert("Three.js failed to load.");

    throw new Error(
        "Three.js not found"
    );

}


if (
    typeof THREE.OrbitControls ===
    "undefined"
) {

    alert(
        "OrbitControls failed to load."
    );

    throw new Error(
        "OrbitControls not found"
    );

}


const container =
    document.getElementById(
        "scene"
    );


if (!container) {

    throw new Error(
        "Scene container missing"
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
        0.010
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
    48
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
// CAMERA CONTROLS
// =====================================================

const controls =
    new THREE.OrbitControls(
        camera,
        renderer.domElement
    );


controls.enableDamping =
    true;


controls.dampingFactor =
    0.055;


controls.minDistance =
    4;


controls.maxDistance =
    80;


controls.maxPolarAngle =
    Math.PI / 2.08;


controls.target.set(
    0,
    5,
    17
);


// =====================================================
// LIGHTING
// =====================================================

const ambient =
    new THREE.AmbientLight(
        0x6f7485,
        0.8
    );

scene.add(
    ambient
);


const moonLight =
    new THREE.DirectionalLight(
        0x8799c7,
        1.7
    );


moonLight.position.set(
    -20,
    35,
    -30
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
            5,
            40,
            40
        ),

        new THREE.MeshBasicMaterial({
            color: 0xd8d8d0
        })

    );


moon.position.set(
    -22,
    28,
    -28
);


scene.add(
    moon
);


// Moon glow

const moonGlow =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            6,
            32,
            32
        ),

        new THREE.MeshBasicMaterial({
            color: 0x7888b0,
            transparent: true,
            opacity: 0.08
        })

    );


moonGlow.position.copy(
    moon.position
);


scene.add(
    moonGlow
);


// =====================================================
// GROUND
// =====================================================

const ground =
    new THREE.Mesh(

        new THREE.PlaneGeometry(
            150,
            150
        ),

        new THREE.MeshStandardMaterial({
            color: 0x111719,
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
            10,
            120
        ),

        new THREE.MeshStandardMaterial({
            color: 0x282637,
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

const stone =
    new THREE.MeshStandardMaterial({

        color: 0x3c3c44,

        roughness: 0.9

    });


const darkStone =
    new THREE.MeshStandardMaterial({

        color: 0x15161b,

        roughness: 0.9

    });


const iron =
    new THREE.MeshStandardMaterial({

        color: 0x08090c,

        metalness: 0.9,

        roughness: 0.25

    });


const gold =
    new THREE.MeshStandardMaterial({

        color: 0xa97a3c,

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


    tower.position.x =
        x;


    // Base

    const base =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                6,
                1.5,
                6
            ),

            darkStone

        );


    base.position.y =
        0.75;


    tower.add(
        base
    );


    // Main tower

    const body =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                5,
                11,
                5
            ),

            stone

        );


    body.position.y =
        6;


    body.castShadow =
        true;


    tower.add(
        body
    );


    // Top

    const top =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                6,
                1,
                6
            ),

            stone

        );


    top.position.y =
        11.5;


    tower.add(
        top
    );


    // Roof

    const roof =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                3.5,
                5,
                4
            ),

            darkStone

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


    // Decorative pillars

    for (
        let i = -1;
        i <= 1;
        i++
    ) {

        const pillar =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.4,
                    8,
                    0.4
                ),

                darkStone

            );


        pillar.position.set(
            i * 1.4,
            5,
            2.55
        );


        tower.add(
            pillar
        );

    }


    // Gold roof tips

    const tip =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                0.4,
                1.3,
                4
            ),

            gold

        );


    tip.position.y =
        16.7;


    tower.add(
        tip
    );


    entrance.add(
        tower
    );

}


createTower(-9);

createTower(9);


// =====================================================
// CENTER ARCH
// =====================================================

const arch =
    new THREE.Mesh(

        new THREE.BoxGeometry(
            18,
            2.7,
            3
        ),

        darkStone

    );


arch.position.set(
    0,
    11,
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
                1.5,
                4
            ),

            gold

        );


    spike.position.set(
        x,
        13,
        0
    );


    spike.rotation.y =
        Math.PI / 4;


    entrance.add(
        spike
    );

}


// =====================================================
// ENTRANCE SIGN
// =====================================================

const signCanvas =
    document.createElement(
        "canvas"
    );


signCanvas.width =
    1200;


signCanvas.height =
    320;


const signCtx =
    signCanvas.getContext(
        "2d"
    );


signCtx.fillStyle =
    "#06070a";


signCtx.fillRect(
    0,
    0,
    1200,
    320
);


signCtx.strokeStyle =
    "#bd914e";


signCtx.lineWidth =
    12;


signCtx.strokeRect(
    10,
    10,
    1180,
    300
);


signCtx.textAlign =
    "center";


signCtx.textBaseline =
    "middle";


signCtx.shadowColor =
    "#d4a95e";


signCtx.shadowBlur =
    25;


signCtx.fillStyle =
    "#dfb66e";


signCtx.font =
    "bold 88px Georgia";


signCtx.fillText(
    "CTRL + Z",
    600,
    110
);


signCtx.font =
    "bold 62px Georgia";


signCtx.fillText(
    "CEMETERY",
    600,
    210
);


const signTexture =
    new THREE.CanvasTexture(
        signCanvas
    );


const sign =
    new THREE.Mesh(

        new THREE.PlaneGeometry(
            12,
            3.2
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
// GATE DOORS
// =====================================================

const leftGate =
    new THREE.Group();


const rightGate =
    new THREE.Group();


leftGate.position.set(
    -0.25,
    0,
    0
);


rightGate.position.set(
    0.25,
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
            (0.25 + i * 1);


        const bar =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.22,
                    7,
                    0.22
                ),

                iron

            );


        bar.position.set(
            x,
            3.5,
            0
        );


        parent.add(
            bar
        );


        // spikes

        const spike =
            new THREE.Mesh(

                new THREE.ConeGeometry(
                    0.22,
                    1,
                    5
                ),

                gold

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
        y += 1.8
    ) {

        const horizontal =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    7,
                    0.2,
                    0.2
                ),

                iron

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


    // Decorative ring

    const ring =
        new THREE.Mesh(

            new THREE.TorusGeometry(
                0.55,
                0.12,
                12,
                32
            ),

            gold

        );


    ring.position.set(
        direction * 3.3,
        3.4,
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
                color: 0xff6d20
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
            0xff8730,
            3,
            16
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
// GRAVES
// =====================================================

const graves = [];


let buriedFiles = 0;


// =====================================================
// FILE ICON
// =====================================================

function getFileIcon(
    name
) {

    const extension =
        name
            .split(".")
            .pop()
            .toLowerCase();


    const icons = {

        pdf: "📜",

        js: "⚡",

        html: "🌐",

        css: "🎨",

        py: "🐍",

        docx: "📄",

        doc: "📄",

        txt: "📝",

        zip: "📦",

        rar: "📦",

        jpg: "🖼",

        jpeg: "🖼",

        png: "🖼",

        mp3: "🎵",

        mp4: "🎬"

    };


    return (
        icons[extension] ||
        "📁"
    );

}


// =====================================================
// FILE SIZE
// =====================================================

function formatSize(
    bytes
) {

    if (
        bytes === 0
    ) {

        return "0 B";

    }


    if (
        bytes < 1024
    ) {

        return (
            bytes +
            " B"
        );

    }


    if (
        bytes < 1024 * 1024
    ) {

        return (
            bytes /
            1024
        ).toFixed(2) +
        " KB";

    }


    if (
        bytes <
        1024 * 1024 * 1024
    ) {

        return (
            bytes /
            (1024 * 1024)
        ).toFixed(2) +
        " MB";

    }


    return (
        bytes /
        (1024 * 1024 * 1024)
    ).toFixed(2) +
    " GB";

}


// =====================================================
// CAUSE OF DEATH
// =====================================================

function getCause(
    name
) {

    const causes = [

        "Replaced by a newer version.",

        "Never opened again.",

        "Lost in the final_final_FINAL_v2 update.",

        "Deleted after the deadline.",

        "Abandoned during development.",

        "Overwritten by its successor.",

        "Forgotten in the depths of Downloads.",

        "Killed by Ctrl + Z.",

        "Too many versions. One had to go.",

        "Declared unnecessary by its creator."

    ];


    const index =
        name.length %
        causes.length;


    return causes[index];

}


// =====================================================
// CREATE GRAVE LABEL
// =====================================================

function createLabel(
    fileName
) {

    const canvas =
        document.createElement(
            "canvas"
        );


    canvas.width =
        700;


    canvas.height =
        200;


    const ctx =
        canvas.getContext(
            "2d"
        );


    ctx.fillStyle =
        "rgba(5,5,7,.94)";


    ctx.fillRect(
        0,
        0,
        700,
        200
    );


    ctx.strokeStyle =
        "#a77b3e";


    ctx.lineWidth =
        5;


    ctx.strokeRect(
        5,
        5,
        690,
        190
    );


    ctx.textAlign =
        "center";


    ctx.textBaseline =
        "middle";


    ctx.fillStyle =
        "#dcb978";


    ctx.font =
        "bold 34px Arial";


    let text =
        fileName;


    if (
        text.length > 25
    ) {

        text =
            text.substring(
                0,
                22
            ) +
            "...";

    }


    ctx.fillText(
        text,
        350,
        100
    );


    const texture =
        new THREE.CanvasTexture(
            canvas
        );


    const label =
        new THREE.Mesh(

            new THREE.PlaneGeometry(
                2.8,
                0.8
            ),

            new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true
            })

        );


    label.position.set(
        0,
        4.65,
        -0.35
    );


    return label;

}


// =====================================================
// CREATE GRAVE
// =====================================================

function createGrave(
    x,
    z,
    data
) {

    const grave =
        new THREE.Group();


    // Tombstone

    const shape =
        new THREE.Shape();


    shape.moveTo(
        -1.35,
        0
    );


    shape.lineTo(
        -1.35,
        2.6
    );


    shape.quadraticCurveTo(
        -1.35,
        4,
        0,
        4
    );


    shape.quadraticCurveTo(
        1.35,
        4,
        1.35,
        2.6
    );


    shape.lineTo(
        1.35,
        0
    );


    shape.lineTo(
        -1.35,
        0
    );


    const geometry =
        new THREE.ExtrudeGeometry(
            shape,
            {

                depth: 0.55,

                bevelEnabled: true,

                bevelThickness: 0.12,

                bevelSize: 0.1,

                bevelSegments: 3

            }
        );


    const tombstone =
        new THREE.Mesh(
            geometry,
            stone
        );


    tombstone.castShadow =
        true;


    tombstone.receiveShadow =
        true;


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

            darkStone

        );


    crossVertical.position.set(
        0,
        3,
        -0.35
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

            darkStone

        );


    crossHorizontal.position.set(
        0,
        3.25,
        -0.35
    );


    grave.add(
        crossHorizontal
    );


    // Label

    const label =
        createLabel(
            data.name
        );


    grave.add(
        label
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
        -0.1
    );


    grave.add(
        candle
    );


    // Candle light

    const candleLight =
        new THREE.PointLight(
            0xffa844,
            1.5,
            7
        );


    candleLight.position.set(
        1.6,
        1,
        -0.1
    );


    grave.add(
        candleLight
    );


    // Save information

    grave.userData = {

        fileName:
            data.name,

        size:
            data.size,

        type:
            data.type,

        buriedAt:
            data.buriedAt,

        cause:
            data.cause

    };


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
// SAMPLE GRAVES
// =====================================================

function sample(
    name,
    size,
    type,
    cause
) {

    return {

        name: name,

        size: size,

        type: type,

        buriedAt:
            new Date(),

        cause: cause

    };

}


createGrave(
    -5,
    7,
    sample(
        "final_project_v1.py",
        "24 KB",
        "Python File",
        "Replaced by final_project_v2.py."
    )
);


createGrave(
    5,
    7,
    sample(
        "assignment_FINAL.pdf",
        "1.2 MB",
        "PDF Document",
        "Deadline passed. Never opened again."
    )
);


createGrave(
    -4,
    0,
    sample(
        "website_old.zip",
        "5.4 MB",
        "ZIP Archive",
        "Overwritten by a newer design."
    )
);


createGrave(
    4,
    0,
    sample(
        "final_final_v2.docx",
        "340 KB",
        "Word Document",
        "Lost during the final edit."
    )
);


createGrave(
    -5,
    -8,
    sample(
        "unused_code.js",
        "18 KB",
        "JavaScript File",
        "Never called by anyone."
    )
);


createGrave(
    5,
    -8,
    sample(
        "forgotten_notes.txt",
        "4 KB",
        "Text File",
        "Forgotten in the Downloads folder."
    )
);


createGrave(
    -4,
    -16,
    sample(
        "old_backup.zip",
        "14 MB",
        "ZIP Archive",
        "A newer backup took its place."
    )
);


createGrave(
    4,
    -16,
    sample(
        "presentation_old.pptx",
        "8 MB",
        "PowerPoint",
        "The presentation was redesigned."
    )
);


// =====================================================
// GRASS
// =====================================================

const grassMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x151d1c
    });


for (
    let i = 0;
    i < 350;
    i++
) {

    const grass =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                0.07,
                Math.random() *
                0.7 +
                0.3,
                4
            ),

            grassMaterial

        );


    grass.position.set(

        (
            Math.random() -
            0.5
        ) * 100,

        0.2,

        (
            Math.random() -
            0.5
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
        color: 0xffffa0
    });


for (
    let i = 0;
    i < 160;
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
            Math.random() -
            0.5
        ) * 90,

        Math.random() *
        15 + 2,

        (
            Math.random() -
            0.5
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
// FILE SELECT
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


            files.forEach(
                function (file) {

                    const data = {

                        name:
                            file.name,

                        size:
                            formatSize(
                                file.size
                            ),

                        type:
                            file.type ||
                            "Unknown File Type",

                        buriedAt:
                            new Date(),

                        cause:
                            getCause(
                                file.name
                            )

                    };


                    const x =
                        (
                            Math.random() -
                            0.5
                        ) * 14;


                    const z =
                        -20 -
                        Math.random() *
                        35;


                    createGrave(
                        x,
                        z,
                        data
                    );


                    buriedFiles++;

                }
            );


            if (graveCount) {

                graveCount.textContent =
                    "🪦 Files buried: " +
                    buriedFiles;

            }


            fileInput.value = "";

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


    // Start opening before reaching gate

    if (
        distance < 27
    ) {

        target = 1;

    }


    // Smooth interpolation

    gateProgress +=
        (
            target -
            gateProgress
        ) * 0.025;


    // Ease in/out

    const eased =
        gateProgress *
        gateProgress *
        (
            3 -
            2 *
            gateProgress
        );


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


    // Hide welcome message

    const welcome =
        document.getElementById(
            "welcome"
        );


    if (
        welcome &&
        distance < 25
    ) {

        welcome.classList.add(
            "hidden"
        );

    }

}


// =====================================================
// CLICK / TAP TOMBSTONES
// =====================================================

const raycaster =
    new THREE.Raycaster();


const mouse =
    new THREE.Vector2();


window.addEventListener(
    "click",
    function (event) {

        // Ignore UI

        if (
            event.target.closest(
                ".info-panel"
            ) ||
            event.target.closest(
                ".visitor-panel"
            ) ||
            event.target.closest(
                ".file-controls"
            ) ||
            event.target.closest(
                ".visitor-button"
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


        let grave =
            hits[0].object;


        while (
            grave &&
            grave !== scene
        ) {

            if (
                grave.userData &&
                grave.userData.fileName
            ) {

                break;

            }


            grave =
                grave.parent;

        }


        if (
            !grave ||
            !grave.userData.fileName
        ) {

            return;

        }


        showFileDetails(
            grave.userData
        );

    }
);


// =====================================================
// SHOW FILE DETAILS
// =====================================================

function showFileDetails(
    data
) {

    const panel =
        document.getElementById(
            "infoPanel"
        );


    const details =
        document.getElementById(
            "fileDetails"
        );


    if (
        !panel ||
        !details
    ) {

        return;

    }


    const icon =
        getFileIcon(
            data.fileName
        );


    const buriedDate =
        new Date(
            data.buriedAt
        ).toLocaleString();


    details.innerHTML = `

        <div class="file-name">

            ${icon}
            ${escapeHTML(
                data.fileName
            )}

        </div>


        <div class="detail">

            <label>STATUS</label>

            <strong>
                🪦 BURIED
            </strong>

        </div>


        <div class="detail">

            <label>FILE SIZE</label>

            <strong>
                ${escapeHTML(
                    data.size
                )}
            </strong>

        </div>


        <div class="detail">

            <label>FILE TYPE</label>

            <strong>
                ${escapeHTML(
                    data.type
                )}
            </strong>

        </div>


        <div class="detail">

            <label>DATE OF DEATH</label>

            <strong>
                ${buriedDate}
            </strong>

        </div>


        <div class="death-message">

            ☠ CAUSE OF DEATH

            <b>
                ${escapeHTML(
                    data.cause
                )}
            </b>

        </div>

    `;


    panel.style.display =
        "block";

}


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHTML(
    text
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


// =====================================================
// CLOSE INFO PANEL
// =====================================================

const closeInfo =
    document.getElementById(
        "closeInfo"
    );


if (closeInfo) {

    closeInfo.onclick =
        function () {

            document.getElementById(
                "infoPanel"
            ).style.display =
                "none";

        };

}


// =====================================================
// VISITOR MEMORIAL
// =====================================================

const visitorPanel =
    document.getElementById(
        "visitorPanel"
    );


const visitorButton =
    document.getElementById(
        "visitorButton"
    );


const toggleVisitors =
    document.getElementById(
        "toggleVisitors"
    );


visitorButton.onclick =
    function () {

        visitorPanel.classList.toggle(
            "hidden"
        );

    };


toggleVisitors.onclick =
    function () {

        visitorPanel.classList.add(
            "hidden"
        );

    };


// =====================================================
// ROSES
// =====================================================

const roseButton =
    document.getElementById(
        "roseButton"
    );


const roseCount =
    document.getElementById(
        "roseCount"
    );


let roses =
    parseInt(
        localStorage.getItem(
            "ctrlz_roses"
        ) || "0"
    );


function updateRoseCount() {

    roseCount.textContent =
        roses +
        (
            roses === 1
                ? " rose"
                : " roses"
        );

}


updateRoseCount();


roseButton.onclick =
    function () {

        roses++;


        localStorage.setItem(
            "ctrlz_roses",
            roses
        );


        updateRoseCount();


        roseButton.textContent =
            "🌹 Rose left";


        setTimeout(
            function () {

                roseButton.textContent =
                    "🌹 Leave a Rose";

            },
            1200
        );

    };


// =====================================================
// COMMENTS
// =====================================================

const commentInput =
    document.getElementById(
        "commentInput"
    );


const commentButton =
    document.getElementById(
        "commentButton"
    );


const commentsContainer =
    document.getElementById(
        "comments"
    );


let comments =
    JSON.parse(
        localStorage.getItem(
            "ctrlz_comments"
        ) || "[]"
    );


function displayComments() {

    commentsContainer.innerHTML =
        "";


    comments
        .slice()
        .reverse()
        .forEach(
            function (comment) {

                const element =
                    document.createElement(
                        "div"
                    );


                element.className =
                    "comment";


                element.innerHTML = `

                    <div>
                        💀
                        ${escapeHTML(
                            comment.text
                        )}
                    </div>

                    <div class="comment-time">
                        ${escapeHTML(
                            comment.time
                        )}
                    </div>

                `;


                commentsContainer.appendChild(
                    element
                );

            }
        );

}


displayComments();


commentButton.onclick =
    function () {

        const text =
            commentInput.value.trim();


        if (!text) {

            return;

        }


        comments.push({

            text: text,

            time:
                new Date()
                    .toLocaleString()

        });


        localStorage.setItem(
            "ctrlz_comments",
            JSON.stringify(
                comments
            )
        );


        commentInput.value =
            "";


        displayComments();

    };


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


    // Torch flicker

    torchLights.forEach(
        function (
            light,
            index
        ) {

            light.intensity =

                2.7 +

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
    "⚰ CTRL + Z CEMETERY loaded."
);
