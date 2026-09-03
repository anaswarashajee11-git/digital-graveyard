/* =====================================================
   CTRL + Z CEMETERY
   SCATTERED DIGITAL GRAVEYARD
   ===================================================== */


/* =====================================================
   CHECK THREE.JS
   ===================================================== */

if (typeof THREE === "undefined") {

    alert(
        "Three.js is not loading."
    );

    throw new Error(
        "Three.js missing"
    );

}


if (
    typeof THREE.OrbitControls ===
    "undefined"
) {

    alert(
        "OrbitControls is not loading."
    );

    throw new Error(
        "OrbitControls missing"
    );

}


/* =====================================================
   BASIC SETUP
   ===================================================== */

const sceneContainer =
    document.getElementById(
        "scene"
    );


const scene =
    new THREE.Scene();


scene.background =
    new THREE.Color(
        0x020204
    );


scene.fog =
    new THREE.FogExp2(
        0x071013,
        0.012
    );


/* =====================================================
   CAMERA
   ===================================================== */

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
    58
);


/* =====================================================
   RENDERER
   ===================================================== */

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


sceneContainer.appendChild(
    renderer.domElement
);


/* =====================================================
   CAMERA CONTROLS
   ===================================================== */

const controls =
    new THREE.OrbitControls(

        camera,

        renderer.domElement

    );


controls.enableDamping =
    true;


controls.dampingFactor =
    0.045;


controls.minDistance =
    5;


controls.maxDistance =
    80;


controls.maxPolarAngle =
    Math.PI / 2.05;


controls.target.set(
    0,
    5,
    25
);


/* =====================================================
   LIGHT
   ===================================================== */

const ambient =
    new THREE.AmbientLight(
        0x687080,
        0.8
    );


scene.add(
    ambient
);


const moonLight =
    new THREE.DirectionalLight(
        0x8194c0,
        1.7
    );


moonLight.position.set(
    -25,
    35,
    -30
);


moonLight.castShadow =
    true;


scene.add(
    moonLight
);


/* =====================================================
   MOON
   ===================================================== */

const moon =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            5,
            40,
            40
        ),

        new THREE.MeshBasicMaterial({

            color:
                0xd9d9d0

        })

    );


moon.position.set(
    -25,
    30,
    -15
);


scene.add(
    moon
);


/* Moon glow */

const moonGlow =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            7,
            32,
            32
        ),

        new THREE.MeshBasicMaterial({

            color:
                0x8797bd,

            transparent:
                true,

            opacity:
                0.08

        })

    );


moonGlow.position.copy(
    moon.position
);


scene.add(
    moonGlow
);


/* =====================================================
   STARS
   ===================================================== */

const starPositions = [];


for (
    let i = 0;
    i < 800;
    i++
) {

    starPositions.push(

        (
            Math.random() -
            0.5
        ) * 180,

        Math.random() *
        70 + 8,

        (
            Math.random() -
            0.5
        ) * 160

    );

}


const starGeometry =
    new THREE.BufferGeometry();


starGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(
        starPositions,
        3
    )

);


const starMaterial =
    new THREE.PointsMaterial({

        color:
            0xffffbd,

        size:
            0.17

    });


const stars =
    new THREE.Points(

        starGeometry,

        starMaterial

    );


scene.add(
    stars
);


/* =====================================================
   GROUND
   ===================================================== */

const ground =
    new THREE.Mesh(

        new THREE.PlaneGeometry(
            160,
            160
        ),

        new THREE.MeshStandardMaterial({

            color:
                0x11191b,

            roughness:
                1

        })

    );


ground.rotation.x =
    -Math.PI / 2;


ground.receiveShadow =
    true;


scene.add(
    ground
);


/* =====================================================
   PATH
   ===================================================== */

const path =
    new THREE.Mesh(

        new THREE.PlaneGeometry(
            9,
            140
        ),

        new THREE.MeshStandardMaterial({

            color:
                0x302c42,

            roughness:
                1

        })

    );


path.rotation.x =
    -Math.PI / 2;


path.position.set(
    0,
    0.03,
    -10
);


scene.add(
    path
);


/* =====================================================
   MATERIALS
   ===================================================== */

const stoneMaterial =
    new THREE.MeshStandardMaterial({

        color:
            0x36363d,

        roughness:
            0.9

    });


const darkStoneMaterial =
    new THREE.MeshStandardMaterial({

        color:
            0x121318,

        roughness:
            0.95

    });


const ironMaterial =
    new THREE.MeshStandardMaterial({

        color:
            0x050608,

        metalness:
            0.9,

        roughness:
            0.25

    });


const goldMaterial =
    new THREE.MeshStandardMaterial({

        color:
            0x9c7339,

        metalness:
            0.8,

        roughness:
            0.25

    });


/* =====================================================
   SPOOKY ENTRANCE
   ===================================================== */

const entrance =
    new THREE.Group();


entrance.position.z =
    28;


scene.add(
    entrance
);


/* =====================================================
   GOTHIC TOWERS
   ===================================================== */

function createTower(
    x
) {

    const tower =
        new THREE.Group();


    tower.position.x =
        x;


    /* Base */

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


    /* Tower body */

    const body =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                4.8,
                11,
                4.8
            ),

            stoneMaterial

        );


    body.position.y =
        6;


    body.castShadow =
        true;


    tower.add(
        body
    );


    /* Roof */

    const roof =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                3.6,
                6,
                4
            ),

            darkStoneMaterial

        );


    roof.position.y =
        14.5;


    roof.rotation.y =
        Math.PI / 4;


    roof.castShadow =
        true;


    tower.add(
        roof
    );


    /* Roof spike */

    const spike =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                0.35,
                1.6,
                5
            ),

            goldMaterial

        );


    spike.position.y =
        18;


    tower.add(
        spike
    );


    /* Gothic windows */

    const windowMaterial =
        new THREE.MeshBasicMaterial({

            color:
                0x15182b

        });


    for (
        let y = 4;
        y <= 8;
        y += 2
    ) {

        const windowMesh =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.7,
                    1.3,
                    0.08
                ),

                windowMaterial

            );


        windowMesh.position.set(
            0,
            y,
            2.45
        );


        tower.add(
            windowMesh
        );

    }


    /* Side columns */

    for (
        let i = -1;
        i <= 1;
        i++
    ) {

        const column =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.4,
                    9,
                    0.4
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


    entrance.add(
        tower
    );

}


createTower(
    -10
);


createTower(
    10
);


/* =====================================================
   GOTHIC ARCH
   ===================================================== */

const arch =
    new THREE.Mesh(

        new THREE.BoxGeometry(
            20,
            3,
            3
        ),

        darkStoneMaterial

    );


arch.position.set(
    0,
    11,
    0
);


entrance.add(
    arch
);


/* =====================================================
   ARCH SPIKES
   ===================================================== */

for (
    let x = -8;
    x <= 8;
    x += 2
) {

    const spike =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                0.28,
                1.5,
                4
            ),

            goldMaterial

        );


    spike.position.set(
        x,
        13.3,
        0
    );


    spike.rotation.y =
        Math.PI / 4;


    entrance.add(
        spike
    );

}


/* =====================================================
   SIGN
   ===================================================== */

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
    "#07070a";


signCtx.fillRect(
    0,
    0,
    1200,
    320
);


signCtx.strokeStyle =
    "#bd9253";


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
    "#d2a45f";


signCtx.shadowBlur =
    25;


signCtx.fillStyle =
    "#dcb16b";


signCtx.font =
    "bold 88px Georgia";


signCtx.fillText(
    "CTRL + Z",
    600,
    105
);


signCtx.font =
    "bold 58px Georgia";


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
            13,
            3.5
        ),

        new THREE.MeshBasicMaterial({

            map:
                signTexture

        })

    );


sign.position.set(
    0,
    10.4,
    -1.7
);


entrance.add(
    sign
);


/* =====================================================
   GATES
   ===================================================== */

const leftGate =
    new THREE.Group();


const rightGate =
    new THREE.Group();


leftGate.position.x =
    -0.15;


rightGate.position.x =
    0.15;


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

    /* Vertical bars */

    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const x =
            direction *
            (
                0.3 +
                i * 1.05
            );


        const bar =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.22,
                    7,
                    0.22
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


        /* Spikes */

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


    /* Horizontal bars */

    for (
        let y = 1.5;
        y <= 6;
        y += 1.5
    ) {

        const horizontal =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    7.2,
                    0.2,
                    0.22
                ),

                ironMaterial

            );


        horizontal.position.set(
            direction * 3.5,
            y,
            0
        );


        parent.add(
            horizontal
        );

    }


    /* Decorative ring */

    const ring =
        new THREE.Mesh(

            new THREE.TorusGeometry(
                0.65,
                0.12,
                12,
                32
            ),

            goldMaterial

        );


    ring.position.set(
        direction * 3.5,
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


/* =====================================================
   TORCHES
   ===================================================== */

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

                color:
                    0xff6920

            })

        );


    flame.position.set(
        x,
        5,
        z
    );


    flame.scale.y =
        1.6;


    scene.add(
        flame
    );


    const light =
        new THREE.PointLight(

            0xff7930,

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


createTorch(
    -6,
    25
);


createTorch(
    6,
    25
);


/* =====================================================
   LOCAL STORAGE
   ===================================================== */

const STORAGE_KEY =
    "ctrlz_cemetery_data";


let cemeteryData =
    JSON.parse(

        localStorage.getItem(
            STORAGE_KEY
        ) || "{}"

    );


if (
    !cemeteryData.tombs
) {

    cemeteryData.tombs = [];

}


if (
    !cemeteryData.comments
) {

    cemeteryData.comments = {};

}


if (
    !cemeteryData.roses
) {

    cemeteryData.roses = {};

}


/* =====================================================
   SAVE DATA
   ===================================================== */

function saveData() {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(
            cemeteryData
        )

    );

}


/* =====================================================
   GRAVES
   ===================================================== */

const graves = [];


function createTomb(
    data
) {

    const grave =
        new THREE.Group();


    /* Tomb shape */

    const shape =
        new THREE.Shape();


    shape.moveTo(
        -1.25,
        0
    );


    shape.lineTo(
        -1.25,
        2.5
    );


    shape.quadraticCurveTo(
        -1.25,
        3.9,
        0,
        4
    );


    shape.quadraticCurveTo(
        1.25,
        3.9,
        1.25,
        2.5
    );


    shape.lineTo(
        1.25,
        0
    );


    shape.lineTo(
        -1.25,
        0
    );


    const geometry =
        new THREE.ExtrudeGeometry(

            shape,

            {

                depth:
                    0.55,

                bevelEnabled:
                    true,

                bevelThickness:
                    0.12,

                bevelSize:
                    0.1,

                bevelSegments:
                    3

            }

        );


    const tombstone =
        new THREE.Mesh(

            geometry,

            stoneMaterial

        );


    tombstone.castShadow =
        true;


    tombstone.receiveShadow =
        true;


    grave.add(
        tombstone
    );


    /* =================================================
       CROSS
       ================================================= */

    const vertical =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.18,
                1.5,
                0.18
            ),

            darkStoneMaterial

        );


    vertical.position.set(
        0,
        3,
        -0.35
    );


    grave.add(
        vertical
    );


    const horizontal =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.9,
                0.18,
                0.18
            ),

            darkStoneMaterial

        );


    horizontal.position.set(
        0,
        3.25,
        -0.35
    );


    grave.add(
        horizontal
    );


    /* =================================================
       FILE NAME
       ================================================= */

    const labelCanvas =
        document.createElement(
            "canvas"
        );


    labelCanvas.width =
        600;


    labelCanvas.height =
        150;


    const labelCtx =
        labelCanvas.getContext(
            "2d"
        );


    labelCtx.fillStyle =
        "#18181d";


    labelCtx.fillRect(
        0,
        0,
        600,
        150
    );


    labelCtx.textAlign =
        "center";


    labelCtx.textBaseline =
        "middle";


    labelCtx.fillStyle =
        "#d6b16e";


    labelCtx.font =
        "bold 27px Arial";


    let displayName =
        data.name;


    if (
        displayName.length > 22
    ) {

        displayName =
            displayName.substring(
                0,
                19
            ) +
            "...";

    }


    labelCtx.fillText(
        displayName,
        300,
        75
    );


    const labelTexture =
        new THREE.CanvasTexture(
            labelCanvas
        );


    const label =
        new THREE.Mesh(

            new THREE.PlaneGeometry(
                2.4,
                0.6
            ),

            new THREE.MeshBasicMaterial({

                map:
                    labelTexture,

                transparent:
                    true

            })

        );


    label.position.set(
        0,
        1.75,
        -0.4
    );


    grave.add(
        label
    );


    /* =================================================
       CANDLE
       ================================================= */

    const candle =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.11,
                0.13,
                0.7,
                12
            ),

            new THREE.MeshStandardMaterial({

                color:
                    0xffffdf

            })

        );


    candle.position.set(
        1.55,
        0.35,
        -0.2
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
        1.55,
        1,
        -0.2
    );


    grave.add(
        candleLight
    );


    /* =================================================
       DATA
       ================================================= */

    grave.userData =
        data;


    /* =================================================
       RANDOM ROTATION
       ================================================= */

    grave.rotation.y =
        data.rotation ||
        (
            Math.random() *
            Math.PI *
            2
        );


    grave.rotation.z =
        (
            Math.random() -
            0.5
        ) * 0.08;


    /* =================================================
       POSITION
       ================================================= */

    grave.position.set(
        data.x,
        0,
        data.z
    );


    scene.add(
        grave
    );


    graves.push(
        grave
    );


    return grave;

}


/* =====================================================
   OLD TOMBS
   ===================================================== */

const oldTombs = [

    {
        id:
            "old_01",

        name:
            "final_FINAL_v7.py",

        size:
            "24 KB",

        type:
            "Python",

        date:
            "12 March 2023",

        cause:
            "Replaced by final_FINAL_v8.py.",

        x:
            -12,

        z:
            10

    },

    {
        id:
            "old_02",

        name:
            "assignment_old.pdf",

        size:
            "2.4 MB",

        type:
            "PDF",

        date:
            "28 April 2023",

        cause:
            "The deadline passed into darkness.",

        x:
            8,

        z:
            7

    },

    {
        id:
            "old_03",

        name:
            "website_old.zip",

        size:
            "18 MB",

        type:
            "ZIP",

        date:
            "19 June 2023",

        cause:
            "A complete redesign replaced it.",

        x:
            -7,

        z:
            0

    },

    {
        id:
            "old_04",

        name:
            "presentation_FINAL.pptx",

        size:
            "8 MB",

        type:
            "PowerPoint",

        date:
            "4 August 2023",

        cause:
            "Too many slides. It never survived the review.",

        x:
            10,

        z:
            -3

    },

    {
        id:
            "old_05",

        name:
            "forgotten_notes.txt",

        size:
            "7 KB",

        type:
            "Text",

        date:
            "17 September 2023",

        cause:
            "Forgotten inside the Downloads folder.",

        x:
            -13,

        z:
            -8

    },

    {
        id:
            "old_06",

        name:
            "unused_code.js",

        size:
            "32 KB",

        type:
            "JavaScript",

        date:
            "2 November 2023",

        cause:
            "Never called again.",

        x:
            5,

        z:
            -13

    },

    {
        id:
            "old_07",

        name:
            "backup_old.zip",

        size:
            "42 MB",

        type:
            "Archive",

        date:
            "31 January 2024",

        cause:
            "A newer backup took its place.",

        x:
            -8,

        z:
            -18

    },

    {
        id:
            "old_08",

        name:
            "random_project.docx",

        size:
            "540 KB",

        type:
            "Document",

        date:
            "14 February 2024",

        cause:
            "Abandoned halfway through.",

        x:
            12,

        z:
            -22

    },

    {
        id:
            "old_09",

        name:
            "test123.html",

        size:
            "12 KB",

        type:
            "HTML",

        date:
            "9 May 2024",

        cause:
            "Created for testing. Never needed again.",

        x:
            -14,

        z:
            -28

    },

    {
        id:
            "old_10",

        name:
            "draft_final.docx",

        size:
            "1.1 MB",

        type:
            "Document",

        date:
            "23 July 2024",

        cause:
            "The actual final version arrived.",

        x:
            7,

        z:
            -32

    }

];


/* =====================================================
   CREATE OLD TOMBS
   ===================================================== */

oldTombs.forEach(
    function (tomb) {

        cemeteryData.tombs.push(
            tomb
        );

        createTomb(
            tomb
        );

    }
);


/* =====================================================
   LOAD SAVED NEW TOMBS
   ===================================================== */

const storedTombs =
    cemeteryData.tombs.filter(

        function (tomb) {

            return !oldTombs.some(

                function (old) {

                    return old.id === tomb.id;

                }

            );

        }

    );


storedTombs.forEach(
    function (tomb) {

        createTomb(
            tomb
        );

    }
);


/* =====================================================
   FILE UPLOAD
   ===================================================== */

const fileInput =
    document.getElementById(
        "fileInput"
    );


const graveCount =
    document.getElementById(
        "graveCount"
    );


function formatSize(
    bytes
) {

    if (
        bytes < 1024
    ) {

        return bytes + " B";

    }


    if (
        bytes < 1024 * 1024
    ) {

        return (
            bytes / 1024
        ).toFixed(2) +
        " KB";

    }


    if (
        bytes < 1024 * 1024 * 1024
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


function chooseCause(
    file
) {

    const causes = [

        "Replaced by a newer version.",

        "Never opened again.",

        "Forgotten in the Downloads folder.",

        "Overwritten by its successor.",

        "Abandoned during development.",

        "Killed by Ctrl + Z.",

        "The deadline claimed another victim.",

        "Too many versions. One had to go.",

        "Declared unnecessary by its creator.",

        "Lost somewhere between FINAL and FINAL_FINAL."

    ];


    return causes[
        file.name.length %
        causes.length
    ];

}


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

                    /*
                       Scatter new tombs
                       around the cemetery.
                    */

                    const angle =
                        Math.random() *
                        Math.PI *
                        2;


                    const radius =
                        8 +
                        Math.random() *
                        25;


                    const x =
                        Math.cos(angle) *
                        radius;


                    const z =
                        -5 -
                        Math.sin(angle) *
                        radius;


                    const tomb = {

                        id:
                            "file_" +
                            Date.now() +
                            "_" +
                            Math.random()
                                .toString(36)
                                .substring(2, 8),

                        name:
                            file.name,

                        size:
                            formatSize(
                                file.size
                            ),

                        type:
                            file.type ||
                            "Unknown",

                        date:
                            new Date()
                                .toLocaleString(),

                        cause:
                            chooseCause(
                                file
                            ),

                        x:
                            x,

                        z:
                            z,

                        rotation:
                            Math.random() *
                            Math.PI *
                            2

                    };


                    cemeteryData.tombs.push(
                        tomb
                    );


                    createTomb(
                        tomb
                    );

                }

            );


            saveData();


            updateCount();


            fileInput.value =
                "";

        }

    );

}


/* =====================================================
   COUNT
   ===================================================== */

function updateCount() {

    const total =
        cemeteryData.tombs.length;


    graveCount.textContent =
        "🪦 Buried files: " +
        total;

}


updateCount();


/* =====================================================
   TOMBSTONE SELECTION
   ===================================================== */

const raycaster =
    new THREE.Raycaster();


const mouse =
    new THREE.Vector2();


let selectedTomb =
    null;


window.addEventListener(

    "click",

    function (event) {

        /*
           Ignore clicks on UI.
        */

        if (
            event.target.closest(
                ".memorial-panel"
            ) ||
            event.target.closest(
                ".visitor-panel"
            ) ||
            event.target.closest(
                ".upload-area"
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


        const clickable =
            [];


        graves.forEach(

            function (grave) {

                grave.traverse(

                    function (object) {

                        if (
                            object.isMesh
                        ) {

                            clickable.push(
                                object
                            );

                        }

                    }

                );

            }

        );


        const hits =
            raycaster.intersectObjects(
                clickable
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
                grave.userData.name
            ) {

                break;

            }


            grave =
                grave.parent;

        }


        if (
            !grave ||
            !grave.userData.name
        ) {

            return;

        }


        selectedTomb =
            grave.userData;


        showMemorial(
            selectedTomb
        );


        updateVisitorPanel();

    }

);


/* =====================================================
   SHOW MEMORIAL
   ===================================================== */

function showMemorial(
    data
) {

    const panel =
        document.getElementById(
            "memorialPanel"
        );


    const content =
        document.getElementById(
            "memorialContent"
        );


    content.innerHTML = `

        <div class="file-title">
            ⚰ ${escapeHTML(data.name)}
        </div>

        <div class="file-detail">
            <span>STATUS</span>
            <span>🪦 BURIED</span>
        </div>

        <div class="file-detail">
            <span>FILE SIZE</span>
            <span>${escapeHTML(data.size)}</span>
        </div>

        <div class="file-detail">
            <span>FILE TYPE</span>
            <span>${escapeHTML(data.type)}</span>
        </div>

        <div class="file-detail">
            <span>DATE OF DEATH</span>
            <span>${escapeHTML(data.date)}</span>
        </div>

        <div class="death-section">

            ☠ CAUSE OF DEATH

            <strong>
                ${escapeHTML(data.cause)}
            </strong>

        </div>

    `;


    panel.style.display =
        "block";

}


/* =====================================================
   CLOSE MEMORIAL
   ===================================================== */

document.getElementById(
    "closeMemorial"
).onclick =
    function () {

        document.getElementById(
            "memorialPanel"
        ).style.display =
            "none";

    };


/* =====================================================
   VISITOR PANEL
   ===================================================== */

const visitorPanel =
    document.getElementById(
        "visitorPanel"
    );


document.getElementById(
    "openVisitorPanel"
).onclick =
    function () {

        visitorPanel.classList.toggle(
            "show"
        );

        updateVisitorPanel();

    };


document.getElementById(
    "closeVisitorPanel"
).onclick =
    function () {

        visitorPanel.classList.remove(
            "show"
        );

    };


/* =====================================================
   UPDATE VISITOR PANEL
   ===================================================== */

function updateVisitorPanel() {

    const name =
        document.getElementById(
            "selectedTombName"
        );


    if (
        !selectedTomb
    ) {

        name.textContent =
            "Select a tomb first.";

        document.getElementById(
            "roseCount"
        ).textContent =
            "0 roses";

        displayComments();

        return;

    }


    name.textContent =
        "🪦 " +
        selectedTomb.name;


    const roses =
        cemeteryData.roses[
            selectedTomb.id
        ] || 0;


    document.getElementById(
        "roseCount"
    ).textContent =
        roses +
        (
            roses === 1
                ? " rose"
                : " roses"
        );


    displayComments();

}


/* =====================================================
   ROSES
   ===================================================== */

document.getElementById(
    "roseButton"
).onclick =
    function () {

        if (
            !selectedTomb
        ) {

            alert(
                "Select a tomb first."
            );

            return;

        }


        if (
            !cemeteryData.roses[
                selectedTomb.id
            ]
        ) {

            cemeteryData.roses[
                selectedTomb.id
            ] = 0;

        }


        cemeteryData.roses[
            selectedTomb.id
        ]++;


        saveData();


        updateVisitorPanel();

    };


/* =====================================================
   COMMENTS
   ===================================================== */

document.getElementById(
    "commentButton"
).onclick =
    function () {

        if (
            !selectedTomb
        ) {

            alert(
                "Select a tomb first."
            );

            return;

        }


        const input =
            document.getElementById(
                "commentInput"
            );


        const text =
            input.value.trim();


        if (
            !text
        ) {

            return;

        }


        if (
            !cemeteryData.comments[
                selectedTomb.id
            ]
        ) {

            cemeteryData.comments[
                selectedTomb.id
            ] = [];

        }


        cemeteryData.comments[
            selectedTomb.id
        ].push({

            text:
                text,

            time:
                new Date()
                    .toLocaleString()

        });


        saveData();


        input.value =
            "";


        displayComments();

    };


/* =====================================================
   DISPLAY COMMENTS
   ===================================================== */

function displayComments() {

    const box =
        document.getElementById(
            "comments"
        );


    box.innerHTML =
        "";


    if (
        !selectedTomb
    ) {

        box.innerHTML = `

            <div class="comment">

                🕯 Select a tomb to view
                its memorial messages.

            </div>

        `;

        return;

    }


    const list =
        cemeteryData.comments[
            selectedTomb.id
        ] || [];


    if (
        list.length === 0
    ) {

        box.innerHTML = `

            <div class="comment">

                No messages yet.

                Be the first visitor
                to leave one.

            </div>

        `;

        return;

    }


    list
        .slice()
        .reverse()
        .forEach(

            function (item) {

                const div =
                    document.createElement(
                        "div"
                    );


                div.className =
                    "comment";


                div.innerHTML = `

                    🕯
                    ${escapeHTML(
                        item.text
                    )}

                    <div class="comment-time">

                        ${escapeHTML(
                            item.time
                        )}

                    </div>

                `;


                box.appendChild(
                    div
                );

            }

        );

}


/* =====================================================
   ESCAPE HTML
   ===================================================== */

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


/* =====================================================
   SMOOTH GATE
   ===================================================== */

let gateProgress =
    0;


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


    let target =
        0;


    /*
       Start opening earlier
       so it feels cinematic.
    */

    if (
        distance < 30
    ) {

        target =
            1;

    }


    /*
       Very smooth interpolation.
    */

    gateProgress +=
        (
            target -
            gateProgress
        ) * 0.035;


    /*
       Extra smoothstep easing.
    */

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

            -Math.PI * 0.8,

            eased

        );


    rightGate.rotation.y =
        THREE.MathUtils.lerp(

            0,

            Math.PI * 0.8,

            eased

        );


    /* Hide introduction */

    const intro =
        document.getElementById(
            "intro"
        );


    if (
        distance < 28
    ) {

        intro.classList.add(
            "hidden"
        );

    }
    else {

        intro.classList.remove(
            "hidden"
        );

    }

}


/* =====================================================
   GRASS
   ===================================================== */

const grassMaterial =
    new THREE.MeshStandardMaterial({

        color:
            0x0d1515

    });


for (
    let i = 0;
    i < 550;
    i++
) {

    const grass =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                0.07,
                Math.random() *
                0.7 +
                0.2,

                4
            ),

            grassMaterial

        );


    grass.position.set(

        (
            Math.random() -
            0.5
        ) * 110,

        0.2,

        (
            Math.random() -
            0.5
        ) * 100

    );


    scene.add(
        grass
    );

}


/* =====================================================
   FIREFLIES
   ===================================================== */

const fireflies = [];


const fireflyMaterial =
    new THREE.MeshBasicMaterial({

        color:
            0xffff9c

    });


for (
    let i = 0;
    i < 180;
    i++
) {

    const fly =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.07,
                0.07,
                0.07
            ),

            fireflyMaterial

        );


    fly.position.set(

        (
            Math.random() -
            0.5
        ) * 100,

        Math.random() *
        15 + 2,

        (
            Math.random() -
            0.5
        ) * 90

    );


    scene.add(
        fly
    );


    fireflies.push(
        fly
    );

}


/* =====================================================
   ANIMATION
   ===================================================== */

const clock =
    new THREE.Clock();


function animate() {

    requestAnimationFrame(
        animate
    );


    const time =
        clock.getElapsedTime();


    /* Gate */

    updateGate();


    /* Fireflies */

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


    /* Torch flicker */

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
                ) * 0.6;

        }

    );


    /* Slight moon glow */

    moonGlow.scale.setScalar(

        1 +

        Math.sin(
            time * 0.5
        ) * 0.02

    );


    controls.update();


    renderer.render(
        scene,
        camera
    );

}


animate();


/* =====================================================
   RESIZE
   ===================================================== */

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


console.log(
    "☠ CTRL + Z CEMETERY loaded."
);
