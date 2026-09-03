/* =====================================================
   CTRL + Z CEMETERY
   ACTUAL FILE BURIAL + SMOOTH GATE
   ===================================================== */

if (typeof THREE === "undefined") {
    alert("Three.js is not loading.");
    throw new Error("Three.js missing");
}

if (typeof THREE.OrbitControls === "undefined") {
    alert("OrbitControls is not loading.");
    throw new Error("OrbitControls missing");
}

const sceneContainer = document.getElementById("scene");

if (!sceneContainer) {
    throw new Error("Scene container missing");
}


/* =====================================================
   SCENE
   ===================================================== */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x020204);

scene.fog = new THREE.FogExp2(
    0x080b10,
    0.012
);


/* =====================================================
   CAMERA
   ===================================================== */

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
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

sceneContainer.appendChild(
    renderer.domElement
);


/* =====================================================
   CONTROLS
   ===================================================== */

const controls = new THREE.OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;

controls.dampingFactor = 0.05;

controls.minDistance = 4;

controls.maxDistance = 80;

controls.maxPolarAngle =
    Math.PI / 2.05;

/*
   Look toward the entrance.
*/
controls.target.set(
    0,
    5,
    28
);


/* =====================================================
   LIGHTING
   ===================================================== */

const ambientLight =
    new THREE.AmbientLight(
        0x73788a,
        0.8
    );

scene.add(
    ambientLight
);


const moonLight =
    new THREE.DirectionalLight(
        0x8494c1,
        1.8
    );

moonLight.position.set(
    -30,
    40,
    -20
);

moonLight.castShadow = true;

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
            color: 0xd8d8c9
        })

    );

moon.position.set(
    -24,
    30,
    -25
);

scene.add(
    moon
);


/* =====================================================
   MOON GLOW
   ===================================================== */

const moonGlow =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            7,
            32,
            32
        ),

        new THREE.MeshBasicMaterial({

            color: 0x7184ae,

            transparent: true,

            opacity: 0.09

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
    i < 700;
    i++
) {

    starPositions.push(

        (Math.random() - 0.5) * 180,

        Math.random() * 70 + 8,

        (Math.random() - 0.5) * 160

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

        color: 0xffffcc,

        size: 0.15

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

            color: 0x101718,

            roughness: 1

        })

    );

ground.rotation.x =
    -Math.PI / 2;

ground.receiveShadow = true;

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
            150
        ),

        new THREE.MeshStandardMaterial({

            color: 0x2b2939,

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


/* =====================================================
   MATERIALS
   ===================================================== */

const stoneMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x37373e,

        roughness: 0.9

    });


const darkStoneMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x111217,

        roughness: 0.95

    });


const ironMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x030405,

        metalness: 0.9,

        roughness: 0.25

    });


const goldMaterial =
    new THREE.MeshStandardMaterial({

        color: 0xa4773b,

        metalness: 0.8,

        roughness: 0.25

    });


/* =====================================================
   ENTRANCE
   ===================================================== */

const entrance =
    new THREE.Group();

entrance.position.set(
    0,
    0,
    28
);

scene.add(
    entrance
);


/* =====================================================
   GOTHIC TOWERS
   ===================================================== */

function createTower(x) {

    const tower =
        new THREE.Group();

    tower.position.x = x;


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

    base.position.y = 0.75;

    tower.add(
        base
    );


    /* Body */

    const body =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                5,
                11,
                5
            ),

            stoneMaterial

        );

    body.position.y = 6;

    body.castShadow = true;

    tower.add(
        body
    );


    /* Roof */

    const roof =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                3.7,
                6,
                4
            ),

            darkStoneMaterial

        );

    roof.position.y = 14.5;

    roof.rotation.y =
        Math.PI / 4;

    tower.add(
        roof
    );


    /* Spike */

    const topSpike =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                0.35,
                1.8,
                5
            ),

            goldMaterial

        );

    topSpike.position.y = 18;

    tower.add(
        topSpike
    );


    /* Windows */

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
                    0.1
                ),

                new THREE.MeshBasicMaterial({
                    color: 0x16182a
                })

            );

        windowMesh.position.set(
            0,
            y,
            2.55
        );

        tower.add(
            windowMesh
        );

    }


    entrance.add(
        tower
    );
}

createTower(-10);

createTower(10);


/* =====================================================
   ARCH
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
   GATE SPIKES
   ===================================================== */

for (
    let x = -8;
    x <= 8;
    x += 2
) {

    const spike =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                0.3,
                1.5,
                4
            ),

            goldMaterial

        );

    spike.position.set(
        x,
        13.2,
        0
    );

    spike.rotation.y =
        Math.PI / 4;

    entrance.add(
        spike
    );
}


/* =====================================================
   GATE SIGN
   ===================================================== */

const signCanvas =
    document.createElement(
        "canvas"
    );

signCanvas.width = 1200;

signCanvas.height = 320;

const signCtx =
    signCanvas.getContext(
        "2d"
    );

signCtx.fillStyle =
    "#050509";

signCtx.fillRect(
    0,
    0,
    1200,
    320
);

signCtx.strokeStyle =
    "#c49a5a";

signCtx.lineWidth = 12;

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
    "#d8ad66";

signCtx.shadowBlur = 25;

signCtx.fillStyle =
    "#dfb46d";

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


/* =====================================================
   GATE DOORS
   ===================================================== */

const leftGate =
    new THREE.Group();

const rightGate =
    new THREE.Group();


/*
   IMPORTANT:
   Put each door's pivot at the
   correct hinge position.
*/

leftGate.position.x =
    -0.2;

rightGate.position.x =
    0.2;


entrance.add(
    leftGate
);

entrance.add(
    rightGate
);


function buildGate(
    parent,
    direction
) {

    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const bar =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.22,
                    7,
                    0.25
                ),

                ironMaterial

            );

        bar.position.set(

            direction *
            (0.3 + i * 1.05),

            3.5,

            0

        );

        parent.add(
            bar
        );


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
            (0.3 + i * 1.05),

            7.5,

            0

        );

        parent.add(
            spike
        );

    }


    for (
        let y = 1.5;
        y <= 6;
        y += 1.5
    ) {

        const horizontal =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    7,
                    0.2,
                    0.25
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

}

buildGate(
    leftGate,
    1
);

buildGate(
    rightGate,
    -1
);


/* =====================================================
   TORCHES
   ===================================================== */

const torchLights = [];


function createTorch(
    x
) {

    const flame =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.4,
                12,
                12
            ),

            new THREE.MeshBasicMaterial({

                color: 0xff6420

            })

        );

    flame.position.set(
        x,
        5,
        25
    );

    flame.scale.y = 1.5;

    scene.add(
        flame
    );


    const light =
        new THREE.PointLight(

            0xff7628,

            3,

            15

        );

    light.position.set(
        x,
        5,
        25
    );

    scene.add(
        light
    );

    torchLights.push(
        light
    );
}

createTorch(-6);

createTorch(6);


/* =====================================================
   TOMBS
   ===================================================== */

const graves = [];


function createTomb(
    data
) {

    const grave =
        new THREE.Group();


    /* Tombstone */

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
        4,
        0,
        4
    );

    shape.quadraticCurveTo(
        1.25,
        4,
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
            stoneMaterial
        );


    tombstone.castShadow =
        true;


    grave.add(
        tombstone
    );


    /* =================================================
       CROSS
       ================================================= */

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

            darkStoneMaterial

        );

    crossHorizontal.position.set(
        0,
        3.25,
        -0.35
    );

    grave.add(
        crossHorizontal
    );


    /* =================================================
       FILE NAME
       ================================================= */

    const canvas =
        document.createElement(
            "canvas"
        );

    canvas.width = 600;

    canvas.height = 150;

    const ctx =
        canvas.getContext(
            "2d"
        );

    ctx.fillStyle =
        "#17171b";

    ctx.fillRect(
        0,
        0,
        600,
        150
    );

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    ctx.fillStyle =
        "#d4ad69";

    ctx.font =
        "bold 26px Arial";


    let name =
        data.name;


    if (
        name.length > 23
    ) {

        name =
            name.substring(
                0,
                20
            ) +
            "...";

    }


    ctx.fillText(
        name,
        300,
        75
    );


    const texture =
        new THREE.CanvasTexture(
            canvas
        );


    const label =
        new THREE.Mesh(

            new THREE.PlaneGeometry(
                2.35,
                0.6
            ),

            new THREE.MeshBasicMaterial({

                map: texture,

                transparent: true

            })

        );


    label.position.set(
        0,
        1.7,
        -0.4
    );


    grave.add(
        label
    );


    /* Candle */

    const candle =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.12,
                0.14,
                0.7,
                12
            ),

            new THREE.MeshStandardMaterial({
                color: 0xffffdd
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


    /* Store data */

    grave.userData =
        data;


    grave.position.set(
        data.x,
        0,
        data.z
    );


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
        id: "old1",
        name: "final_FINAL_v7.py",
        size: "24 KB",
        type: "Python",
        date: "12 March 2023",
        cause: "Replaced by final_FINAL_v8.py.",
        x: -12,
        z: 12
    },

    {
        id: "old2",
        name: "assignment_old.pdf",
        size: "2.4 MB",
        type: "PDF",
        date: "28 April 2023",
        cause: "The deadline passed into darkness.",
        x: 8,
        z: 8
    },

    {
        id: "old3",
        name: "website_old.zip",
        size: "18 MB",
        type: "ZIP",
        date: "19 June 2023",
        cause: "A newer website replaced it.",
        x: -7,
        z: 0
    },

    {
        id: "old4",
        name: "presentation_FINAL.pptx",
        size: "8 MB",
        type: "PowerPoint",
        date: "4 August 2023",
        cause: "Too many slides.",
        x: 10,
        z: -5
    },

    {
        id: "old5",
        name: "forgotten_notes.txt",
        size: "7 KB",
        type: "Text",
        date: "17 September 2023",
        cause: "Forgotten in Downloads.",
        x: -14,
        z: -9
    },

    {
        id: "old6",
        name: "unused_code.js",
        size: "32 KB",
        type: "JavaScript",
        date: "2 November 2023",
        cause: "Never called again.",
        x: 5,
        z: -15
    },

    {
        id: "old7",
        name: "backup_2023.zip",
        size: "42 MB",
        type: "Archive",
        date: "31 January 2024",
        cause: "A newer backup took its place.",
        x: -9,
        z: -22
    }

];


oldTombs.forEach(
    createTomb
);


/* =====================================================
   ACTUAL FILE BURIAL
   ===================================================== */

const fileInput =
    document.getElementById(
        "fileInput"
    );


const graveCount =
    document.getElementById(
        "graveCount"
    );


/*
   Check whether the browser
   supports actual file deletion.
*/

const canDeleteFiles =
    "showOpenFilePicker"
    in window;


/* =====================================================
   FILE TYPE
   ===================================================== */

function getFileType(
    file
) {

    if (
        file.type
    ) {

        return file.type;

    }


    const parts =
        file.name.split(".");


    if (
        parts.length > 1
    ) {

        return (
            parts[
                parts.length - 1
            ].toUpperCase()
        );

    }


    return "Unknown";

}


/* =====================================================
   CAUSE OF DEATH
   ===================================================== */

function getCause(
    file
) {

    const causes = [

        "Replaced by a newer version.",

        "Never opened again.",

        "Forgotten in Downloads.",

        "Overwritten by its successor.",

        "Abandoned during development.",

        "Killed by Ctrl + Z.",

        "The deadline claimed another victim.",

        "Too many FINAL versions.",

        "Declared unnecessary.",

        "Lost somewhere between FINAL and FINAL_FINAL."

    ];


    return causes[
        file.name.length %
        causes.length
    ];

}


/* =====================================================
   BURY FILE
   ===================================================== */

async function buryFile(
    file,
    handle
) {

    const confirmed =
        confirm(

            "⚰ BURY THIS FILE?\n\n" +

            file.name +

            "\n\n" +

            "The file will be permanently deleted " +
            "from its current location and a tomb " +
            "will be created in CTRL + Z Cemetery."

        );


    if (
        !confirmed
    ) {

        return;

    }


    /* =================================================
       ACTUAL DELETE
       ================================================= */

    if (
        handle
    ) {

        try {

            await handle.remove();


        } catch (error) {

            alert(

                "The file could not be deleted.\n\n" +

                "You may need to grant permission " +
                "or close the file first."

            );

            console.error(
                error
            );

            return;

        }

    }


    /* =================================================
       RANDOM SCATTER POSITION
       ================================================= */

    const angle =
        Math.random() *
        Math.PI *
        2;


    const radius =
        7 +
        Math.random() *
        25;


    const x =
        Math.cos(angle) *
        radius;


    const z =
        -4 -
        Math.sin(angle) *
        radius;


    const tombData = {

        id:
            "buried_" +
            Date.now() +
            "_" +
            Math.random()
                .toString(36)
                .substring(2, 7),

        name:
            file.name,

        size:
            formatSize(
                file.size
            ),

        type:
            getFileType(
                file
            ),

        date:
            new Date()
                .toLocaleString(),

        cause:
            getCause(
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


    createTomb(
        tombData
    );


    /*
       Show burial message.
    */

    alert(

        "☠ FILE BURIED\n\n" +

        file.name +

        "\n\n" +

        "The file has been deleted.\n" +

        "Its memory will remain here."

    );


    updateCount();

}


/* =====================================================
   FILE PICKER
   ===================================================== */

/*
   Instead of the normal file input,
   use the File System Access API when
   available.

   This gives the site permission to
   delete the selected file.
*/

if (
    fileInput
) {

    fileInput.addEventListener(

        "click",

        function (event) {

            if (
                !canDeleteFiles
            ) {

                return;

            }


            /*
               Prevent normal file input.
            */

            event.preventDefault();


            chooseRealFile();

        }

    );

}


/* =====================================================
   CHOOSE REAL FILE
   ===================================================== */

async function chooseRealFile() {

    try {

        const handles =
            await window.showOpenFilePicker({

                multiple: true

            });


        for (
            const handle of handles
        ) {

            const file =
                await handle.getFile();


            await buryFile(
                file,
                handle
            );

        }


    } catch (error) {

        /*
           User cancelled.
        */

        if (
            error.name !==
            "AbortError"
        ) {

            console.error(
                error
            );

            alert(
                "Unable to select the file."
            );

        }

    }

}


/* =====================================================
   FALLBACK FOR FIREFOX
   ===================================================== */

if (
    fileInput &&
    !canDeleteFiles
) {

    fileInput.addEventListener(

        "change",

        async function () {

            const files =
                Array.from(
                    fileInput.files
                );


            if (
                files.length === 0
            ) {

                return;

            }


            alert(

                "⚠ DEMO MODE\n\n" +

                "Your browser does not allow " +
                "websites to delete the original file.\n\n" +

                "The tomb will still be created, " +
                "but the original file will NOT be deleted.\n\n" +

                "For actual deletion, open this " +
                "website in Chrome or Edge."

            );


            for (
                const file of files
            ) {

                await buryFile(
                    file,
                    null
                );

            }


            fileInput.value =
                "";

        }

    );

}


/* =====================================================
   FILE SIZE
   ===================================================== */

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


/* =====================================================
   COUNT
   ===================================================== */

function updateCount() {

    const count =
        graves.length;


    if (
        graveCount
    ) {

        graveCount.textContent =
            "🪦 Buried files: " +
            count;

    }

}


updateCount();


/* =====================================================
   GATE OPENING
   ===================================================== */

let gateAmount =
    0;


/*
   We measure distance from the
   CAMERA to the gate directly.

   Gate is at Z = 28.
*/

function updateGate() {

    const gateX =
        entrance.position.x;


    const gateZ =
        entrance.position.z;


    const dx =
        camera.position.x -
        gateX;


    const dz =
        camera.position.z -
        gateZ;


    const distance =
        Math.sqrt(
            dx * dx +
            dz * dz
        );


    /*
       Closed when > 35
       Starts opening at 35
       Fully open around 10
    */

    let target = 0;


    if (
        distance < 35
    ) {

        target = 1;

    }


    /*
       Very smooth movement.
    */

    const speed =
        0.025;


    gateAmount +=
        (
            target -
            gateAmount
        ) *
        speed;


    /*
       Extra easing.
    */

    const eased =
        gateAmount *
        gateAmount *
        (
            3 -
            2 * gateAmount
        );


    /*
       Left door
    */

    leftGate.rotation.y =
        -eased *
        Math.PI *
        0.75;


    /*
       Right door
    */

    rightGate.rotation.y =
        eased *
        Math.PI *
        0.75;

}


/* =====================================================
   TOMBSTONE CLICK
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

        if (
            event.target.closest(
                ".upload-area"
            ) ||
            event.target.closest(
                ".memorial-panel"
            ) ||
            event.target.closest(
                ".visitor-panel"
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


        const meshes = [];


        graves.forEach(
            function (grave) {

                grave.traverse(
                    function (object) {

                        if (
                            object.isMesh
                        ) {

                            meshes.push(
                                object
                            );

                        }

                    }
                );

            }
        );


        const hits =
            raycaster.intersectObjects(
                meshes
            );


        if (
            hits.length === 0
        ) {

            return;

        }


        let object =
            hits[0].object;


        while (
            object &&
            object !== scene
        ) {

            if (
                object.userData &&
                object.userData.name
            ) {

                selectedTomb =
                    object.userData;

                showMemorial(
                    selectedTomb
                );

                updateVisitorPanel();

                return;

            }

            object =
                object.parent;

        }

    }
);


/* =====================================================
   MEMORIAL
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


    if (
        !panel ||
        !content
    ) {

        return;

    }


    content.innerHTML = `

        <div class="file-title">

            ⚰ ${escapeHTML(data.name)}

        </div>

        <div class="file-detail">

            <span>STATUS</span>

            <span>🪦 BURIED</span>

        </div>

        <div class="file-detail">

            <span>SIZE</span>

            <span>
                ${escapeHTML(data.size)}
            </span>

        </div>

        <div class="file-detail">

            <span>TYPE</span>

            <span>
                ${escapeHTML(data.type)}
            </span>

        </div>

        <div class="file-detail">

            <span>DATE OF DEATH</span>

            <span>
                ${escapeHTML(data.date)}
            </span>

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

const closeMemorial =
    document.getElementById(
        "closeMemorial"
    );


if (
    closeMemorial
) {

    closeMemorial.onclick =
        function () {

            document.getElementById(
                "memorialPanel"
            ).style.display =
                "none";

        };

}


/* =====================================================
   VISITOR PANEL
   ===================================================== */

let visitorData = {

    roses: {},

    comments: {}

};


try {

    const saved =
        localStorage.getItem(
            "ctrlz_visitors"
        );


    if (
        saved
    ) {

        visitorData =
            JSON.parse(
                saved
            );

    }

} catch (
    error
) {

    console.log(
        "No saved visitor data."
    );

}


function saveVisitors() {

    localStorage.setItem(

        "ctrlz_visitors",

        JSON.stringify(
            visitorData
        )

    );

}


/* =====================================================
   VISITOR PANEL
   ===================================================== */

const visitorPanel =
    document.getElementById(
        "visitorPanel"
    );


const openVisitor =
    document.getElementById(
        "openVisitorPanel"
    );


const closeVisitor =
    document.getElementById(
        "closeVisitorPanel"
    );


if (
    openVisitor
) {

    openVisitor.onclick =
        function () {

            visitorPanel.classList.toggle(
                "show"
            );

            updateVisitorPanel();

        };

}


if (
    closeVisitor
) {

    closeVisitor.onclick =
        function () {

            visitorPanel.classList.remove(
                "show"
            );

        };

}


/* =====================================================
   VISITOR DATA
   ===================================================== */

function updateVisitorPanel() {

    const name =
        document.getElementById(
            "selectedTombName"
        );


    const roseCount =
        document.getElementById(
            "roseCount"
        );


    if (
        !selectedTomb
    ) {

        name.textContent =
            "Select a tomb first.";

        roseCount.textContent =
            "0 roses";

        return;

    }


    name.textContent =
        "🪦 " +
        selectedTomb.name;


    const roses =
        visitorData.roses[
            selectedTomb.id
        ] || 0;


    roseCount.textContent =
        roses +
        (
            roses === 1
                ? " rose"
                : " roses"
        );


    displayComments();

}


/* =====================================================
   ROSE
   ===================================================== */

const roseButton =
    document.getElementById(
        "roseButton"
    );


if (
    roseButton
) {

    roseButton.onclick =
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
                !visitorData.roses[
                    selectedTomb.id
                ]
            ) {

                visitorData.roses[
                    selectedTomb.id
                ] = 0;

            }


            visitorData.roses[
                selectedTomb.id
            ]++;


            saveVisitors();


            updateVisitorPanel();

        };

}


/* =====================================================
   COMMENT
   ===================================================== */

const commentButton =
    document.getElementById(
        "commentButton"
    );


if (
    commentButton
) {

    commentButton.onclick =
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
                !visitorData.comments[
                    selectedTomb.id
                ]
            ) {

                visitorData.comments[
                    selectedTomb.id
                ] = [];

            }


            visitorData.comments[
                selectedTomb.id
            ].push({

                text:
                    text,

                time:
                    new Date()
                        .toLocaleString()

            });


            saveVisitors();


            input.value =
                "";


            displayComments();

        };

}


/* =====================================================
   COMMENTS
   ===================================================== */

function displayComments() {

    const box =
        document.getElementById(
            "comments"
        );


    if (
        !box
    ) {

        return;

    }


    box.innerHTML =
        "";


    if (
        !selectedTomb
    ) {

        box.innerHTML = `

            <div class="comment">

                🕯 Select a tomb first.

            </div>

        `;

        return;

    }


    const comments =
        visitorData.comments[
            selectedTomb.id
        ] || [];


    if (
        comments.length === 0
    ) {

        box.innerHTML = `

            <div class="comment">

                No messages yet.

                <br><br>

                Be the first visitor
                to leave a message.

            </div>

        `;

        return;

    }


    comments
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

                    🕯 ${escapeHTML(
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
   GRASS
   ===================================================== */

const grassMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x0d1515

    });


for (
    let i = 0;
    i < 450;
    i++
) {

    const grass =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                0.07,
                Math.random() * 0.7 + 0.2,
                4
            ),

            grassMaterial

        );


    grass.position.set(

        (Math.random() - 0.5) * 110,

        0.2,

        (Math.random() - 0.5) * 100

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
                0.07,
                0.07,
                0.07
            ),

            fireflyMaterial

        );


    fly.position.set(

        (Math.random() - 0.5) * 100,

        Math.random() * 15 + 2,

        (Math.random() - 0.5) * 90

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


    /*
       GATE
    */

    updateGate();


    /*
       Fireflies
    */

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

        }

    );


    /*
       Torches
    */

    torchLights.forEach(

        function (
            light,
            index
        ) {

            light.intensity =

                2.6 +

                Math.sin(
                    time * 8 +
                    index
                ) * 0.6;

        }

    );


    /*
       Moon breathing
    */

    moonGlow.scale.setScalar(

        1 +

        Math.sin(
            time * 0.5
        ) * 0.025

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
    "☠ CTRL + Z CEMETERY READY"
);
