/* =========================================================
   CTRL + Z CEMETERY
   3D DIGITAL GRAVEYARD
========================================================= */


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let scene;
let camera;
let renderer;
let controls;

let entrance;

let leftGate;
let rightGate;

let gateAmount = 0;

let tombs = [];

let selectedTomb = null;

let graveCount = 0;

let raycaster;
let mouse;


/* =========================================================
   START
========================================================= */

init();


/* =========================================================
   INITIALIZATION
========================================================= */

function init() {

    /* -----------------------------------------------------
       SCENE
    ----------------------------------------------------- */

    scene =
        new THREE.Scene();

    scene.background =
        new THREE.Color(
            0x020204
        );

    scene.fog =
        new THREE.FogExp2(
            0x020204,
            0.009
        );


    /* -----------------------------------------------------
       CAMERA
    ----------------------------------------------------- */

    camera =
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
        65
    );


    /* -----------------------------------------------------
       RENDERER
    ----------------------------------------------------- */

    renderer =
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

    renderer.outputEncoding =
        THREE.sRGBEncoding;


    document
        .getElementById("scene")
        .appendChild(
            renderer.domElement
        );


    /* -----------------------------------------------------
       CONTROLS
    ----------------------------------------------------- */

    controls =
        new THREE.OrbitControls(
            camera,
            renderer.domElement
        );

    controls.enableDamping =
        true;

    controls.dampingFactor =
        0.06;

    controls.enablePan =
        false;

    controls.minDistance =
        8;

    controls.maxDistance =
        100;

    controls.target.set(
        0,
        4,
        28
    );

    controls.update();


    /* -----------------------------------------------------
       LIGHTING
    ----------------------------------------------------- */

    const ambientLight =
        new THREE.AmbientLight(
            0x707887,
            0.35
        );

    scene.add(
        ambientLight
    );


    const moonLight =
        new THREE.DirectionalLight(
            0xb3bdd4,
            1.15
        );

    moonLight.position.set(
        -30,
        60,
        10
    );

    moonLight.castShadow =
        true;

    scene.add(
        moonLight
    );


    /* -----------------------------------------------------
       WORLD
    ----------------------------------------------------- */

    createMoon();

    createStars();

    createGround();

    createPath();

    createEntrance();

    createOldTombs();

    createGrass();

    createFireflies();


    /* -----------------------------------------------------
       CLICK DETECTION
    ----------------------------------------------------- */

    raycaster =
        new THREE.Raycaster();

    mouse =
        new THREE.Vector2();

    renderer.domElement.addEventListener(
        "click",
        onSceneClick
    );


    /* -----------------------------------------------------
       FILE INPUT
    ----------------------------------------------------- */

    document
        .getElementById(
            "fileInput"
        )
        .addEventListener(
            "change",
            handleFiles
        );


    /* -----------------------------------------------------
       UI
    ----------------------------------------------------- */

    setupUI();


    /* -----------------------------------------------------
       RESIZE
    ----------------------------------------------------- */

    window.addEventListener(
        "resize",
        onResize
    );


    /* -----------------------------------------------------
       START LOOP
    ----------------------------------------------------- */

    animate();
}


/* =========================================================
   MOON
========================================================= */

function createMoon() {

    const moonGeometry =
        new THREE.SphereGeometry(
            7,
            32,
            32
        );

    const moonMaterial =
        new THREE.MeshBasicMaterial({
            color: 0xe4e2d4
        });

    const moon =
        new THREE.Mesh(
            moonGeometry,
            moonMaterial
        );

    moon.position.set(
        -25,
        40,
        -30
    );

    scene.add(
        moon
    );


    /* Moon glow */

    const glow =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                10,
                32,
                32
            ),
            new THREE.MeshBasicMaterial({
                color: 0xaeb9d0,
                transparent: true,
                opacity: 0.07
            })
        );

    glow.position.copy(
        moon.position
    );

    scene.add(
        glow
    );
}


/* =========================================================
   STARS
========================================================= */

function createStars() {

    const geometry =
        new THREE.BufferGeometry();

    const positions = [];


    for (
        let i = 0;
        i < 800;
        i++
    ) {

        positions.push(

            (Math.random() - 0.5)
            * 300,

            20 +
            Math.random() * 120,

            (Math.random() - 0.5)
            * 300

        );

    }


    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
            positions,
            3
        )
    );


    const material =
        new THREE.PointsMaterial({
            color: 0xfff2a6,
            size: 0.6,
            transparent: true,
            opacity: 0.8
        });


    const stars =
        new THREE.Points(
            geometry,
            material
        );


    scene.add(
        stars
    );
}


/* =========================================================
   GROUND
========================================================= */

function createGround() {

    const geometry =
        new THREE.PlaneGeometry(
            220,
            220
        );


    const material =
        new THREE.MeshStandardMaterial({
            color: 0x101921,
            roughness: 1
        });


    const ground =
        new THREE.Mesh(
            geometry,
            material
        );


    ground.rotation.x =
        -Math.PI / 2;


    ground.receiveShadow =
        true;


    scene.add(
        ground
    );
}


/* =========================================================
   PATH
========================================================= */

function createPath() {

    const geometry =
        new THREE.PlaneGeometry(
            9,
            110
        );


    const material =
        new THREE.MeshStandardMaterial({
            color: 0x37345f,
            roughness: 1
        });


    const path =
        new THREE.Mesh(
            geometry,
            material
        );


    path.rotation.x =
        -Math.PI / 2;


    path.position.set(
        0,
        0.04,
        -17
    );


    scene.add(
        path
    );
}


/* =========================================================
   ENTRANCE
========================================================= */

function createEntrance() {

    entrance =
        new THREE.Group();


    entrance.position.set(
        0,
        0,
        28
    );


    scene.add(
        entrance
    );


    createTower(-11);

    createTower(11);

    createArch();

    createGateSign();

    createGate();
}


/* =========================================================
   TOWER
========================================================= */

function createTower(x) {

    const tower =
        new THREE.Group();


    tower.position.x =
        x;


    entrance.add(
        tower
    );


    /* Body */

    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                5,
                18,
                5
            ),
            new THREE.MeshStandardMaterial({
                color: 0x14161a,
                roughness: 0.8
            })
        );


    body.position.y =
        9;


    body.castShadow =
        true;


    tower.add(
        body
    );


    /* Base */

    const base =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                7,
                2,
                6
            ),
            new THREE.MeshStandardMaterial({
                color: 0x09090b
            })
        );


    base.position.y =
        1;


    base.castShadow =
        true;


    tower.add(
        base
    );


    /* Roof */

    const roof =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                4.5,
                7,
                4
            ),
            new THREE.MeshStandardMaterial({
                color: 0x090a0e,
                roughness: 0.7
            })
        );


    roof.position.y =
        21;


    roof.rotation.y =
        Math.PI / 4;


    roof.castShadow =
        true;


    tower.add(
        roof
    );


    /* Spire */

    const spire =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                0.55,
                4,
                8
            ),
            new THREE.MeshStandardMaterial({
                color: 0x060608
            })
        );


    spire.position.y =
        26;


    tower.add(
        spire
    );


    /* Torch */

    createTorch(
        tower,
        0,
        13,
        -2.7
    );
}


/* =========================================================
   ARCH
========================================================= */

function createArch() {

    const shape =
        new THREE.Shape();


    shape.moveTo(
        -11,
        0
    );


    shape.lineTo(
        -11,
        16
    );


    shape.quadraticCurveTo(
        0,
        23,
        11,
        16
    );


    shape.lineTo(
        11,
        0
    );


    shape.closePath();


    const geometry =
        new THREE.ExtrudeGeometry(
            shape,
            {
                depth: 1.5,

                bevelEnabled: true,

                bevelThickness: 0.25,

                bevelSize: 0.25,

                bevelSegments: 3
            }
        );


    const material =
        new THREE.MeshStandardMaterial({
            color: 0x101114,

            roughness: 0.85,

            metalness: 0.3
        });


    const arch =
        new THREE.Mesh(
            geometry,
            material
        );


    arch.position.z =
        -1;


    arch.castShadow =
        true;


    entrance.add(
        arch
    );
}


/* =========================================================
   GATE SIGN
========================================================= */

function createGateSign() {

    const canvas =
        document.createElement(
            "canvas"
        );


    canvas.width =
        1000;

    canvas.height =
        220;


    const ctx =
        canvas.getContext(
            "2d"
        );


    ctx.fillStyle =
        "#070708";


    ctx.fillRect(
        0,
        0,
        1000,
        220
    );


    ctx.strokeStyle =
        "#9b7735";


    ctx.lineWidth =
        8;


    ctx.strokeRect(
        8,
        8,
        984,
        204
    );


    ctx.fillStyle =
        "#d5b86b";


    ctx.font =
        "bold 65px Georgia";


    ctx.textAlign =
        "center";


    ctx.textBaseline =
        "middle";


    ctx.fillText(
        "CTRL + Z CEMETERY",
        500,
        110
    );


    const texture =
        new THREE.CanvasTexture(
            canvas
        );


    const sign =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                14,
                3.1
            ),
            new THREE.MeshBasicMaterial({
                map: texture
            })
        );


    sign.position.set(
        0,
        17,
        -2
    );


    entrance.add(
        sign
    );
}


/* =========================================================
   GATE
   OPENS FROM THE CENTER
========================================================= */

function createGate() {

    /*
       THE IMPORTANT PART:

       LEFT PIVOT:
             |
             |------ LEFT DOOR

       RIGHT PIVOT:
             |
             RIGHT DOOR ------|

       When the gate opens:

             \          /
              \        /
               \      /

       Both doors move AWAY from
       the middle.
    */


    /* LEFT CENTER PIVOT */

    const leftPivot =
        new THREE.Group();


    leftPivot.position.set(
        -0.12,
        0,
        0
    );


    entrance.add(
        leftPivot
    );


    /* RIGHT CENTER PIVOT */

    const rightPivot =
        new THREE.Group();


    rightPivot.position.set(
        0.12,
        0,
        0
    );


    entrance.add(
        rightPivot
    );


    /* LEFT DOOR */

    const leftDoor =
        createGateDoor(
            5.5
        );


    leftDoor.position.x =
        -2.75;


    leftPivot.add(
        leftDoor
    );


    /* RIGHT DOOR */

    const rightDoor =
        createGateDoor(
            5.5
        );


    rightDoor.position.x =
        2.75;


    rightPivot.add(
        rightDoor
    );


    leftGate =
        leftPivot;


    rightGate =
        rightPivot;
}


/* =========================================================
   GATE DOOR
========================================================= */

function createGateDoor(
    width
) {

    const group =
        new THREE.Group();


    const material =
        new THREE.MeshStandardMaterial({

            color: 0x111214,

            metalness: 0.85,

            roughness: 0.32

        });


    /* -----------------------------------------------------
       VERTICAL BARS
    ----------------------------------------------------- */

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const x =
            -width / 2 +
            i *
            (
                width / 7
            );


        const bar =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.25,
                    10,
                    0.35
                ),

                material

            );


        bar.position.set(
            x,
            5,
            0
        );


        bar.castShadow =
            true;


        group.add(
            bar
        );


        /* Spike */

        const spike =
            new THREE.Mesh(

                new THREE.ConeGeometry(
                    0.3,
                    1.2,
                    4
                ),

                material

            );


        spike.position.set(
            x,
            10.6,
            0
        );


        group.add(
            spike
        );

    }


    /* -----------------------------------------------------
       HORIZONTAL BARS
    ----------------------------------------------------- */

    [
        2.5,
        5,
        7.5
    ].forEach(
        y => {

            const horizontal =
                new THREE.Mesh(

                    new THREE.BoxGeometry(
                        width,
                        0.3,
                        0.4
                    ),

                    material

                );


            horizontal.position.y =
                y;


            group.add(
                horizontal
            );

        }
    );


    /* -----------------------------------------------------
       GOLD HANDLE
    ----------------------------------------------------- */

    const goldMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x9c7833,

            metalness: 0.9,

            roughness: 0.25

        });


    const ring =
        new THREE.Mesh(

            new THREE.TorusGeometry(
                1.0,
                0.13,
                8,
                32
            ),

            goldMaterial

        );


    ring.rotation.y =
        Math.PI / 2;


    ring.position.y =
        5;


    group.add(
        ring
    );


    return group;
}


/* =========================================================
   TORCH
========================================================= */

function createTorch(
    parent,
    x,
    y,
    z
) {

    const holder =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.15,
                0.15,
                2,
                8
            ),

            new THREE.MeshStandardMaterial({

                color: 0x151515,

                metalness: 0.8

            })

        );


    holder.position.set(
        x,
        y,
        z
    );


    parent.add(
        holder
    );


    const flame =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.5,
                12,
                12
            ),

            new THREE.MeshBasicMaterial({
                color: 0xff7626
            })

        );


    flame.scale.set(
        0.55,
        1.35,
        0.55
    );


    flame.position.set(
        x,
        y + 1.1,
        z
    );


    parent.add(
        flame
    );


    const light =
        new THREE.PointLight(
            0xff7024,
            2,
            15
        );


    light.position.copy(
        flame.position
    );


    parent.add(
        light
    );


    flame.userData.light =
        light;
}


/* =========================================================
   OLD TOMBS
========================================================= */

function createOldTombs() {

    const oldFiles = [

        "final_project_v1.zip",

        "assignment_old.pdf",

        "homework_FINAL.docx",

        "broken_code.py",

        "website_backup.zip",

        "presentation_old.pptx",

        "ideas.txt",

        "project_old.rar",

        "final_FINAL_v7.pdf",

        "untitled.docx",

        "portfolio_old.zip",

        "debug.js",

        "forgotten_notes.txt",

        "college_project.zip",

        "old_resume.pdf",

        "unused_code.js",

        "backup_old.zip",

        "test_project.py",

        "draft.pptx",

        "old_website.html"

    ];


    oldFiles.forEach(
        fileName => {

            let x;
            let z;


            do {

                x =
                    (
                        Math.random()
                        - 0.5
                    ) * 90;


                z =
                    (
                        Math.random()
                        - 0.5
                    ) * 90;


            } while (

                Math.abs(x) < 7 &&
                z > -42 &&
                z < 35

            );


            createTomb(
                x,
                z,
                {

                    name:
                        fileName,

                    size:
                        Math.floor(
                            Math.random()
                            * 9000000
                        ),

                    type:
                        "Forgotten file",

                    date:
                        "Long ago",

                    cause:
                        getRandomCause()

                }
            );

        }
    );
}


/* =========================================================
   CREATE TOMB
========================================================= */

function createTomb(
    x,
    z,
    data
) {

    const tomb =
        new THREE.Group();


    /* Random rotation */

    tomb.rotation.y =
        Math.random()
        *
        Math.PI
        *
        2;


    /* Slightly different sizes */

    const scale =
        0.8 +
        Math.random()
        *
        0.35;


    tomb.scale.set(
        scale,
        scale,
        scale
    );


    /* -----------------------------------------------------
       TOMBSTONE SHAPE
    ----------------------------------------------------- */

    const shape =
        new THREE.Shape();


    shape.moveTo(
        -1.5,
        0
    );


    shape.lineTo(
        -1.5,
        3
    );


    shape.quadraticCurveTo(
        -1.5,
        4.8,
        0,
        5
    );


    shape.quadraticCurveTo(
        1.5,
        4.8,
        1.5,
        3
    );


    shape.lineTo(
        1.5,
        0
    );


    shape.closePath();


    const geometry =
        new THREE.ExtrudeGeometry(

            shape,

            {

                depth: 0.5,

                bevelEnabled: true,

                bevelThickness: 0.15,

                bevelSize: 0.12,

                bevelSegments: 3

            }

        );


    const material =
        new THREE.MeshStandardMaterial({

            color:
                Math.random() > 0.5
                    ? 0x4b4a48
                    : 0x383735,

            roughness: 0.95

        });


    const stone =
        new THREE.Mesh(
            geometry,
            material
        );


    stone.position.z =
        -0.25;


    stone.castShadow =
        true;


    stone.receiveShadow =
        true;


    tomb.add(
        stone
    );


    /* -----------------------------------------------------
       CROSS
    ----------------------------------------------------- */

    const crossMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x202020,

            roughness: 0.9

        });


    const vertical =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.35,
                2.2,
                0.35
            ),

            crossMaterial

        );


    vertical.position.set(
        0,
        3.7,
        -0.35
    );


    tomb.add(
        vertical
    );


    const horizontal =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                1.2,
                0.35,
                0.35
            ),

            crossMaterial

        );


    horizontal.position.set(
        0,
        4.15,
        -0.35
    );


    tomb.add(
        horizontal
    );


    /* -----------------------------------------------------
       FILE NAME
    ----------------------------------------------------- */

    const text =
        createText(
            data.name
        );


    text.position.set(
        0,
        2.05,
        -0.55
    );


    text.scale.set(
        3.1,
        0.7,
        1
    );


    tomb.add(
        text
    );


    /* -----------------------------------------------------
       DATA
    ----------------------------------------------------- */

    tomb.userData =
        data;


    tomb.userData.isTomb =
        true;


    tomb.position.set(
        x,
        0,
        z
    );


    scene.add(
        tomb
    );


    tombs.push(
        tomb
    );


    graveCount++;


    document.getElementById(
        "graveCount"
    ).textContent =
        graveCount;
}


/* =========================================================
   TEXTURE TEXT
========================================================= */

function createText(
    text
) {

    const canvas =
        document.createElement(
            "canvas"
        );


    canvas.width =
        512;

    canvas.height =
        128;


    const ctx =
        canvas.getContext(
            "2d"
        );


    ctx.fillStyle =
        "rgba(0,0,0,0.65)";


    ctx.fillRect(
        0,
        0,
        512,
        128
    );


    ctx.fillStyle =
        "#d8d2c4";


    ctx.font =
        "bold 25px Arial";


    ctx.textAlign =
        "center";


    ctx.textBaseline =
        "middle";


    let displayText =
        text;


    if (
        displayText.length > 25
    ) {

        displayText =
            displayText.substring(
                0,
                22
            )
            +
            "...";

    }


    ctx.fillText(
        displayText,
        256,
        64
    );


    const texture =
        new THREE.CanvasTexture(
            canvas
        );


    return new THREE.Sprite(

        new THREE.SpriteMaterial({

            map: texture,

            transparent: true

        })

    );
}


/* =========================================================
   GRASS
========================================================= */

function createGrass() {

    const material =
        new THREE.MeshStandardMaterial({

            color: 0x20291f,

            roughness: 1

        });


    for (
        let i = 0;
        i < 350;
        i++
    ) {

        const grass =
            new THREE.Mesh(

                new THREE.ConeGeometry(
                    0.07 +
                    Math.random()
                    * 0.08,

                    0.3 +
                    Math.random()
                    * 0.5,

                    4
                ),

                material

            );


        grass.position.set(

            (
                Math.random()
                - 0.5
            ) * 100,

            0.2,

            (
                Math.random()
                - 0.5
            ) * 100

        );


        scene.add(
            grass
        );

    }
}


/* =========================================================
   FIREFLIES
========================================================= */

function createFireflies() {

    const geometry =
        new THREE.BufferGeometry();


    const positions = [];


    for (
        let i = 0;
        i < 150;
        i++
    ) {

        positions.push(

            (
                Math.random()
                - 0.5
            ) * 100,

            2 +
            Math.random() * 15,

            (
                Math.random()
                - 0.5
            ) * 100

        );

    }


    geometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(
            positions,
            3
        )

    );


    const material =
        new THREE.PointsMaterial({

            color: 0xd8d27c,

            size: 0.25,

            transparent: true,

            opacity: 0.75

        });


    const fireflies =
        new THREE.Points(
            geometry,
            material
        );


    scene.add(
        fireflies
    );
}


/* =========================================================
   FILE INPUT
========================================================= */

function handleFiles(event) {

    const files =
        Array.from(
            event.target.files
        );


    files.forEach(
        file => {

            let x;
            let z;


            do {

                x =
                    (
                        Math.random()
                        - 0.5
                    ) * 80;


                z =
                    (
                        Math.random()
                        - 0.5
                    ) * 80;


            } while (

                Math.abs(x) < 7 &&
                z > -40 &&
                z < 35

            );


            createTomb(
                x,
                z,
                {

                    name:
                        file.name,

                    size:
                        file.size,

                    type:
                        file.type ||
                        "Unknown file",

                    date:
                        new Date()
                        .toLocaleString(),

                    cause:
                        getRandomCause()

                }
            );

        }
    );


    event.target.value =
        "";
}


/* =========================================================
   CAUSES OF DEATH
========================================================= */

function getRandomCause() {

    const causes = [

        "Never opened again.",

        "Replaced by a newer version.",

        "Lost in the Downloads folder.",

        "Killed by Ctrl + Z.",

        "Abandoned after the deadline.",

        "Victim of a system cleanup.",

        "Forgotten by its creator.",

        "Final_Final_FINAL was created.",

        "Deleted after saying 'I'll need this later'.",

        "Buried under too many bugs.",

        "No longer compatible with reality.",

        "The developer moved on.",

        "It was supposed to be temporary.",

        "Lost during a backup.",

        "Its time had come."

    ];


    return causes[
        Math.floor(
            Math.random()
            *
            causes.length
        )
    ];
}


/* =========================================================
   CLICK TOMBSTONE
========================================================= */

function onSceneClick(event) {

    const rect =
        renderer.domElement
        .getBoundingClientRect();


    mouse.x =
        (
            (
                event.clientX
                -
                rect.left
            )
            /
            rect.width
        )
        * 2
        - 1;


    mouse.y =
        -(
            (
                event.clientY
                -
                rect.top
            )
            /
            rect.height
        )
        * 2
        + 1;


    raycaster.setFromCamera(
        mouse,
        camera
    );


    const objects = [];


    tombs.forEach(
        tomb => {

            tomb.traverse(
                child => {

                    if (
                        child.isMesh ||
                        child.isSprite
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
            objects,
            true
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
        !object.userData.isTomb
    ) {

        object =
            object.parent;

    }


    if (
        object &&
        object.userData.isTomb
    ) {

        selectedTomb =
            object;

        showMemorial(
            object
        );

    }
}


/* =========================================================
   MEMORIAL PANEL
========================================================= */

function showMemorial(
    tomb
) {

    const data =
        tomb.userData;


    document.getElementById(
        "memorialContent"
    ).innerHTML = `

        <h2>
            ⚰ REST IN PEACE
        </h2>

        <div class="memorial-line">

            <strong>
                FILE
            </strong>

            <br>

            ${safe(data.name)}

        </div>


        <div class="memorial-line">

            <strong>
                SIZE
            </strong>

            <br>

            ${formatSize(data.size)}

        </div>


        <div class="memorial-line">

            <strong>
                TYPE
            </strong>

            <br>

            ${safe(data.type)}

        </div>


        <div class="memorial-line">

            <strong>
                DATE OF DEATH
            </strong>

            <br>

            ${safe(data.date)}

        </div>


        <div class="cause">

            ☠ CAUSE OF DEATH

            <br>
            <br>

            "${safe(data.cause)}"

        </div>

    `;


    document
        .getElementById(
            "memorialPanel"
        )
        .classList.add(
            "show"
        );
}


/* =========================================================
   SAFE TEXT
========================================================= */

function safe(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}


/* =========================================================
   FILE SIZE
========================================================= */

function formatSize(
    bytes
) {

    if (
        !bytes
    ) {

        return "0 Bytes";

    }


    const units = [

        "Bytes",

        "KB",

        "MB",

        "GB"

    ];


    const index =
        Math.floor(

            Math.log(bytes)
            /
            Math.log(1024)

        );


    return (

        (
            bytes /
            Math.pow(
                1024,
                index
            )
        ).toFixed(2)

        +

        " "

        +

        units[index]

    );
}


/* =========================================================
   UI
========================================================= */

function setupUI() {

    /* -----------------------------------------------------
       CLOSE MEMORIAL
    ----------------------------------------------------- */

    document.getElementById(
        "closeMemorial"
    ).onclick =
        function () {

            document
                .getElementById(
                    "memorialPanel"
                )
                .classList.remove(
                    "show"
                );

        };


    /* -----------------------------------------------------
       OPEN VISITOR PANEL
    ----------------------------------------------------- */

    document.getElementById(
        "openVisitorPanel"
    ).onclick =
        function () {

            if (
                !selectedTomb
            ) {

                return;

            }


            document.getElementById(
                "selectedTombName"
            ).textContent =
                selectedTomb
                    .userData
                    .name;


            updateVisitorPanel();


            document
                .getElementById(
                    "visitorPanel"
                )
                .classList.add(
                    "show"
                );

        };


    /* -----------------------------------------------------
       CLOSE VISITOR PANEL
    ----------------------------------------------------- */

    document.getElementById(
        "closeVisitorPanel"
    ).onclick =
        function () {

            document
                .getElementById(
                    "visitorPanel"
                )
                .classList.remove(
                    "show"
                );

        };


    /* -----------------------------------------------------
       ROSE
    ----------------------------------------------------- */

    document.getElementById(
        "roseButton"
    ).onclick =
        leaveRose;


    /* -----------------------------------------------------
       COMMENT
    ----------------------------------------------------- */

    document.getElementById(
        "commentButton"
    ).onclick =
        leaveComment;


    /* -----------------------------------------------------
       VISITORS BUTTON
    ----------------------------------------------------- */

    document.getElementById(
        "visitorCountButton"
    ).onclick =
        function () {

            alert(
                "Welcome to CTRL + Z Cemetery.\n\n" +
                "Walk through the gates, explore the forgotten files, " +
                "and visit their final resting places."
            );

        };
}


/* =========================================================
   VISITOR STORAGE
========================================================= */

function storageKey() {

    if (
        !selectedTomb
    ) {

        return null;

    }


    return (

        "ctrlz_tomb_"
        +
        selectedTomb
            .userData
            .name

    );
}


function getVisitorData() {

    const key =
        storageKey();


    if (
        !key
    ) {

        return {

            roses: 0,

            comments: []

        };

    }


    const stored =
        localStorage.getItem(
            key
        );


    if (
        !stored
    ) {

        return {

            roses: 0,

            comments: []

        };

    }


    try {

        return JSON.parse(
            stored
        );

    }

    catch {

        return {

            roses: 0,

            comments: []

        };

    }
}


function saveVisitorData(
    data
) {

    const key =
        storageKey();


    if (
        !key
    ) {

        return;

    }


    localStorage.setItem(
        key,
        JSON.stringify(
            data
        )
    );
}


/* =========================================================
   UPDATE VISITOR PANEL
========================================================= */

function updateVisitorPanel() {

    const data =
        getVisitorData();


    document.getElementById(
        "roseCount"
    ).textContent =
        data.roses;


    const comments =
        document.getElementById(
            "comments"
        );


    comments.innerHTML =
        "";


    data.comments.forEach(
        comment => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "comment";


            div.innerHTML = `

                ${safe(
                    comment.text
                )}

                <small>

                    ${safe(
                        comment.date
                    )}

                </small>

            `;


            comments.appendChild(
                div
            );

        }
    );
}


/* =========================================================
   LEAVE ROSE
========================================================= */

function leaveRose() {

    if (
        !selectedTomb
    ) {

        return;

    }


    const data =
        getVisitorData();


    data.roses++;


    saveVisitorData(
        data
    );


    updateVisitorPanel();
}


/* =========================================================
   LEAVE COMMENT
========================================================= */

function leaveComment() {

    if (
        !selectedTomb
    ) {

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

        alert(
            "Write a message first."
        );

        return;

    }


    const data =
        getVisitorData();


    data.comments.push({

        text: text,

        date:
            new Date()
            .toLocaleString()

    });


    saveVisitorData(
        data
    );


    input.value =
        "";


    updateVisitorPanel();
}


/* =========================================================
   ⭐ GATE OPENING
========================================================= */

function updateGate() {

    if (
        !leftGate ||
        !rightGate
    ) {

        return;

    }


    /*
       Get gate's world position.
    */

    const gatePosition =
        new THREE.Vector3();


    entrance.getWorldPosition(
        gatePosition
    );


    /*
       Calculate distance between
       camera and entrance.
    */

    const dx =
        camera.position.x
        -
        gatePosition.x;


    const dz =
        camera.position.z
        -
        gatePosition.z;


    const distance =
        Math.sqrt(
            dx * dx +
            dz * dz
        );


    /*
       ------------------------------------

       42+ units
       GATE CLOSED

       30 units
       GATE FULLY OPEN

       30-42
       GATE SMOOTHLY ANIMATES

       ------------------------------------
    */


    let target =
        0;


    if (
        distance <= 30
    ) {

        target =
            1;

    }

    else if (
        distance >= 42
    ) {

        target =
            0;

    }

    else {

        target =
            1 -
            (
                (
                    distance -
                    30
                )
                /
                12
            );

    }


    /*
       Smooth animation.
    */

    gateAmount +=
        (
            target -
            gateAmount
        )
        *
        0.035;


    /*
       Smoothstep easing.
    */

    const eased =
        gateAmount *
        gateAmount *
        (
            3 -
            2 *
            gateAmount
        );


    /*
       ------------------------------------
       LEFT DOOR

       Rotates toward LEFT
       from the CENTER.
       ------------------------------------
    */

    leftGate.rotation.y =
        -eased
        *
        Math.PI
        *
        0.85;


    /*
       ------------------------------------
       RIGHT DOOR

       Rotates toward RIGHT
       from the CENTER.
       ------------------------------------
    */

    rightGate.rotation.y =
        eased
        *
        Math.PI
        *
        0.85;
}


/* =========================================================
   ANIMATION
========================================================= */

function animate() {

    requestAnimationFrame(
        animate
    );


    /* Gate */

    updateGate();


    /* Camera */

    controls.update();


    /* Torch flicker */

    scene.traverse(
        object => {

            if (
                object.userData &&
                object.userData.light
            ) {

                object.userData.light.intensity =

                    1.5 +

                    Math.random()
                    *
                    0.8;

            }

        }
    );


    /* Render */

    renderer.render(
        scene,
        camera
    );
}


/* =========================================================
   RESIZE
========================================================= */

function onResize() {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
}
