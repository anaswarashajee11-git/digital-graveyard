/* =========================================================
   CTRL + Z CEMETERY
   PREMIUM 3D VERSION
========================================================= */

let scene;
let camera;
let renderer;
let controls;

let entrance;

let leftGate;
let rightGate;

let gateProgress = 0;

let tombs = [];

let selectedTomb = null;

let graveCount = 0;

let raycaster;
let mouse;


/* =========================================================
   INITIALIZE
========================================================= */

init();


function init() {

    /* =====================================================
       SCENE
    ===================================================== */

    scene = new THREE.Scene();

    scene.background =
        new THREE.Color(0x020207);

    scene.fog =
        new THREE.FogExp2(
            0x05060b,
            0.0065
        );


    /* =====================================================
       CAMERA
    ===================================================== */

    camera =
        new THREE.PerspectiveCamera(
            55,
            window.innerWidth /
            window.innerHeight,
            0.1,
            500
        );


    camera.position.set(
        0,
        7,
        72
    );


    /* =====================================================
       RENDERER
    ===================================================== */

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


    /* =====================================================
       CONTROLS
    ===================================================== */

    controls =
        new THREE.OrbitControls(
            camera,
            renderer.domElement
        );


    controls.enableDamping =
        true;


    controls.dampingFactor =
        0.055;


    controls.enablePan =
        false;


    controls.minDistance =
        10;


    controls.maxDistance =
        110;


    controls.rotateSpeed =
        0.35;


    controls.zoomSpeed =
        0.7;


    controls.target.set(
        0,
        5,
        28
    );


    controls.update();


    /* =====================================================
       LIGHTS
    ===================================================== */

    const ambient =
        new THREE.AmbientLight(
            0x6c7185,
            0.35
        );


    scene.add(
        ambient
    );


    const moonLight =
        new THREE.DirectionalLight(
            0x9ba9d1,
            1.2
        );


    moonLight.position.set(
        -35,
        60,
        -20
    );


    moonLight.castShadow =
        true;


    moonLight.shadow.mapSize.width =
        2048;


    moonLight.shadow.mapSize.height =
        2048;


    scene.add(
        moonLight
    );


    /* =====================================================
       CREATE WORLD
    ===================================================== */

    createSky();

    createMoon();

    createStars();

    createGround();

    createPath();

    createTrees();

    createEntrance();

    createOldTombs();

    createFogParticles();

    createFireflies();


    /* =====================================================
       CLICK
    ===================================================== */

    raycaster =
        new THREE.Raycaster();


    mouse =
        new THREE.Vector2();


    renderer.domElement.addEventListener(
        "click",
        handleSceneClick
    );


    /* =====================================================
       FILE INPUT
    ===================================================== */

    document
        .getElementById("fileInput")
        .addEventListener(
            "change",
            buryFiles
        );


    /* =====================================================
       UI
    ===================================================== */

    setupUI();


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        resize
    );


    /* =====================================================
       LOOP
    ===================================================== */

    animate();
}


/* =========================================================
   SKY
========================================================= */

function createSky() {

    const sky =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                180,
                32,
                32
            ),

            new THREE.MeshBasicMaterial({

                color: 0x03040a,

                side:
                    THREE.BackSide

            })

        );


    scene.add(
        sky
    );
}


/* =========================================================
   MOON
========================================================= */

function createMoon() {

    const moon =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                7,
                32,
                32
            ),

            new THREE.MeshBasicMaterial({
                color: 0xe6e2ce
            })

        );


    moon.position.set(
        -27,
        39,
        -30
    );


    scene.add(
        moon
    );


    const glow =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                10,
                32,
                32
            ),

            new THREE.MeshBasicMaterial({

                color: 0xaaaac2,

                transparent: true,

                opacity: 0.08

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
        i < 1200;
        i++
    ) {

        positions.push(

            (
                Math.random() - 0.5
            ) * 250,

            25 +
            Math.random() * 120,

            (
                Math.random() - 0.5
            ) * 220

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

            color: 0xf2e9bc,

            size: 0.45,

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
            180,
            180
        );


    const material =
        new THREE.MeshStandardMaterial({

            color: 0x0d1519,

            roughness: 1,

            metalness: 0

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

    const path =
        new THREE.Mesh(

            new THREE.PlaneGeometry(
                9,
                115
            ),

            new THREE.MeshStandardMaterial({

                color: 0x34305a,

                roughness: 1

            })

        );


    path.rotation.x =
        -Math.PI / 2;


    path.position.set(
        0,
        0.03,
        -20
    );


    scene.add(
        path
    );


    /* Small stone slabs */

    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const stone =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    7.5,
                    0.08,
                    2
                ),

                new THREE.MeshStandardMaterial({
                    color: 0x29264b
                })

            );


        stone.position.set(

            (
                Math.random() - 0.5
            ) * 0.5,

            0.08,

            34 -
            i * 3.1

        );


        stone.rotation.y =
            (
                Math.random() - 0.5
            ) * 0.04;


        scene.add(
            stone
        );
    }
}


/* =========================================================
   TREES
========================================================= */

function createTrees() {

    for (
        let i = 0;
        i < 45;
        i++
    ) {

        let x;
        let z;


        do {

            x =
                (
                    Math.random() - 0.5
                ) * 125;


            z =
                (
                    Math.random() - 0.5
                ) * 110;


        } while (

            Math.abs(x) < 12 ||
            (
                Math.abs(x) < 7 &&
                z > -45 &&
                z < 35
            )

        );


        createTree(
            x,
            z
        );
    }
}


/* =========================================================
   TREE
========================================================= */

function createTree(
    x,
    z
) {

    const tree =
        new THREE.Group();


    tree.position.set(
        x,
        0,
        z
    );


    const height =
        5 +
        Math.random() * 5;


    const trunk =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.35,
                0.65,
                height,
                7
            ),

            new THREE.MeshStandardMaterial({

                color: 0x171512,

                roughness: 1

            })

        );


    trunk.position.y =
        height / 2;


    trunk.castShadow =
        true;


    tree.add(
        trunk
    );


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        const branch =
            new THREE.Mesh(

                new THREE.ConeGeometry(
                    2.5 -
                    i * 0.35,

                    3.5,

                    7
                ),

                new THREE.MeshStandardMaterial({

                    color:
                        0x101a15,

                    roughness: 1

                })

            );


        branch.position.y =
            height -
            i * 1.6;


        branch.castShadow =
            true;


        tree.add(
            branch
        );
    }


    scene.add(
        tree
    );
}


/* =========================================================
   GOTHIC ENTRANCE
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


    createTower(
        -12
    );


    createTower(
        12
    );


    createMainArch();

    createGateSign();

    createGate();

    createEntranceLights();
}


/* =========================================================
   TOWER
========================================================= */

function createTower(
    x
) {

    const tower =
        new THREE.Group();


    tower.position.x =
        x;


    entrance.add(
        tower
    );


    /* Main tower */

    const body =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                5.5,
                19,
                6
            ),

            new THREE.MeshStandardMaterial({

                color: 0x181a20,

                roughness: 0.9,

                metalness: 0.2

            })

        );


    body.position.y =
        9.5;


    body.castShadow =
        true;


    tower.add(
        body
    );


    /* Decorative ledges */

    for (
        let i = 0;
        i < 4;
        i++
    ) {

        const ledge =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    6.5,
                    0.35,
                    6.7
                ),

                new THREE.MeshStandardMaterial({
                    color: 0x0d0e12
                })

            );


        ledge.position.y =
            3 +
            i * 4.2;


        tower.add(
            ledge
        );
    }


    /* Roof */

    const roof =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                5,
                8,
                4
            ),

            new THREE.MeshStandardMaterial({

                color: 0x08090d,

                roughness: 0.75,

                metalness: 0.3

            })

        );


    roof.position.y =
        23;


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
                4.5,
                8
            ),

            new THREE.MeshStandardMaterial({
                color: 0x07070a
            })

        );


    spire.position.y =
        29;


    tower.add(
        spire
    );
}


/* =========================================================
   MAIN ARCH
========================================================= */

function createMainArch() {

    const material =
        new THREE.MeshStandardMaterial({

            color: 0x13151a,

            roughness: 0.85,

            metalness: 0.25

        });


    /* Left arch pillar */

    const left =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                4,
                16,
                3
            ),

            material

        );


    left.position.set(
        -7,
        8,
        0
    );


    entrance.add(
        left
    );


    /* Right arch pillar */

    const right =
        left.clone();


    right.position.x =
        7;


    entrance.add(
        right
    );


    /* Top arch */

    const arch =
        new THREE.Mesh(

            new THREE.TorusGeometry(
                7,
                1.8,
                10,
                40,
                Math.PI
            ),

            material

        );


    arch.rotation.z =
        Math.PI;


    arch.position.set(
        0,
        16,
        0
    );


    entrance.add(
        arch
    );


    /* Gold trim */

    const gold =
        new THREE.MeshStandardMaterial({

            color: 0x9e7730,

            metalness: 0.85,

            roughness: 0.3

        });


    const trim =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                14,
                0.18,
                0.25
            ),

            gold

        );


    trim.position.set(
        0,
        16,
        -1.6
    );


    entrance.add(
        trim
    );
}


/* =========================================================
   SIGN
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
        "#050506";


    ctx.fillRect(
        0,
        0,
        1000,
        220
    );


    ctx.strokeStyle =
        "#9e7838";


    ctx.lineWidth =
        8;


    ctx.strokeRect(
        8,
        8,
        984,
        204
    );


    ctx.fillStyle =
        "#d7b969";


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
                13,
                2.85
            ),

            new THREE.MeshBasicMaterial({
                map: texture
            })

        );


    sign.position.set(
        0,
        18.2,
        -2
    );


    entrance.add(
        sign
    );
}


/* =========================================================
   GATE
========================================================= */

function createGate() {

    leftGate =
        new THREE.Group();


    rightGate =
        new THREE.Group();


    /*
       IMPORTANT:

       These pivots are placed at the CENTER.

       Left door extends LEFT.
       Right door extends RIGHT.

       Therefore the gate opens
       FROM THE MIDDLE.
    */


    leftGate.position.x =
        -0.12;


    rightGate.position.x =
        0.12;


    entrance.add(
        leftGate
    );


    entrance.add(
        rightGate
    );


    const leftDoor =
        makeGateDoor(
            5.9
        );


    leftDoor.position.x =
        -2.95;


    leftGate.add(
        leftDoor
    );


    const rightDoor =
        makeGateDoor(
            5.9
        );


    rightDoor.position.x =
        2.95;


    rightGate.add(
        rightDoor
    );
}


/* =========================================================
   GATE DOOR
========================================================= */

function makeGateDoor(
    width
) {

    const group =
        new THREE.Group();


    const metal =
        new THREE.MeshStandardMaterial({

            color: 0x15161a,

            metalness: 0.85,

            roughness: 0.3

        });


    /* Vertical bars */

    for (
        let i = 0;
        i < 9;
        i++
    ) {

        const x =
            -width / 2 +
            i *
            (
                width / 8
            );


        const bar =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.24,
                    11,
                    0.32
                ),

                metal

            );


        bar.position.set(
            x,
            5.5,
            0
        );


        group.add(
            bar
        );


        /* Spikes */

        const spike =
            new THREE.Mesh(

                new THREE.ConeGeometry(
                    0.28,
                    1.2,
                    4
                ),

                metal

            );


        spike.position.set(
            x,
            11.6,
            0
        );


        group.add(
            spike
        );
    }


    /* Horizontal bars */

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
                        0.38
                    ),

                    metal

                );


            horizontal.position.y =
                y;


            group.add(
                horizontal
            );

        }
    );


    /* Gold center handle */

    const gold =
        new THREE.MeshStandardMaterial({

            color: 0xb08a3f,

            metalness: 0.9,

            roughness: 0.25

        });


    const ring =
        new THREE.Mesh(

            new THREE.TorusGeometry(
                0.75,
                0.12,
                8,
                32
            ),

            gold

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
   ENTRANCE TORCHES
========================================================= */

function createEntranceLights() {

    [
        -8,
        8
    ].forEach(
        x => {

            const flame =
                new THREE.Mesh(

                    new THREE.SphereGeometry(
                        0.5,
                        12,
                        12
                    ),

                    new THREE.MeshBasicMaterial({
                        color: 0xff6b22
                    })

                );


            flame.scale.set(
                0.65,
                1.4,
                0.65
            );


            flame.position.set(
                x,
                9,
                -2
            );


            entrance.add(
                flame
            );


            const light =
                new THREE.PointLight(
                    0xff6b27,
                    2.5,
                    16
                );


            light.position.copy(
                flame.position
            );


            entrance.add(
                light
            );


            flame.userData.torchLight =
                light;
        }
    );
}


/* =========================================================
   OLD TOMBS
========================================================= */

function createOldTombs() {

    const names = [

        "final_FINAL_v7.pdf",

        "assignment_old.docx",

        "broken_code.py",

        "website_backup.zip",

        "presentation_old.pptx",

        "ideas.txt",

        "project_old.rar",

        "untitled.docx",

        "old_resume.pdf",

        "debug.js",

        "unused_code.js",

        "draft.pptx",

        "college_project.zip",

        "backup_old.zip",

        "test_project.py",

        "old_website.html",

        "homework_final.pdf",

        "forgotten_notes.txt",

        "prototype.zip",

        "old_design.fig",

        "final2_REAL.pdf",

        "temporary.js",

        "old_portfolio.zip",

        "failed_project.py",

        "random_file.txt"

    ];


    names.forEach(
        name => {

            let x;
            let z;


            do {

                x =
                    (
                        Math.random() -
                        0.5
                    ) * 100;


                z =
                    (
                        Math.random() -
                        0.5
                    ) * 95;


            } while (

                Math.abs(x) < 8 &&
                z > -48 &&
                z < 34

            );


            createTomb(
                x,
                z,
                {

                    name: name,

                    size:
                        Math.floor(
                            50000 +
                            Math.random()
                            * 9000000
                        ),

                    type:
                        "Forgotten file",

                    date:
                        "Long ago",

                    cause:
                        randomCause()

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
        (
            Math.random()
            - 0.5
        )
        *
        0.6;


    /* Random scale */

    const scale =
        0.8 +
        Math.random()
        * 0.35;


    tomb.scale.set(
        scale,
        scale,
        scale
    );


    /* =====================================================
       STONE
    ===================================================== */

    const shape =
        new THREE.Shape();


    shape.moveTo(
        -1.5,
        0
    );


    shape.lineTo(
        -1.5,
        3.2
    );


    shape.quadraticCurveTo(
        -1.5,
        5,
        0,
        5.3
    );


    shape.quadraticCurveTo(
        1.5,
        5,
        1.5,
        3.2
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

                depth: 0.55,

                bevelEnabled: true,

                bevelThickness: 0.16,

                bevelSize: 0.12,

                bevelSegments: 3

            }

        );


    const material =
        new THREE.MeshStandardMaterial({

            color:
                0x424247,

            roughness:
                0.95

        });


    const stone =
        new THREE.Mesh(
            geometry,
            material
        );


    stone.position.z =
        -0.27;


    stone.castShadow =
        true;


    stone.receiveShadow =
        true;


    tomb.add(
        stone
    );


    /* =====================================================
       CROSS
    ===================================================== */

    const crossMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x222328,

            roughness: 0.9

        });


    const vertical =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.32,
                2,
                0.32
            ),

            crossMaterial

        );


    vertical.position.set(
        0,
        3.75,
        -0.6
    );


    tomb.add(
        vertical
    );


    const horizontal =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                1.15,
                0.32,
                0.32
            ),

            crossMaterial

        );


    horizontal.position.set(
        0,
        4.15,
        -0.6
    );


    tomb.add(
        horizontal
    );


    /* =====================================================
       FILE NAME
    ===================================================== */

    const label =
        makeLabel(
            data.name
        );


    label.position.set(
        0,
        1.8,
        -0.65
    );


    label.scale.set(
        3,
        0.7,
        1
    );


    tomb.add(
        label
    );


    /* =====================================================
       USER DATA
    ===================================================== */

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
   LABEL
========================================================= */

function makeLabel(
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
        "rgba(5,5,5,0.75)";


    ctx.fillRect(
        0,
        0,
        512,
        128
    );


    ctx.fillStyle =
        "#ddd7c9";


    ctx.font =
        "bold 24px Arial";


    ctx.textAlign =
        "center";


    ctx.textBaseline =
        "middle";


    let name =
        text;


    if (
        name.length > 25
    ) {

        name =
            name.substring(
                0,
                22
            )
            +
            "...";

    }


    ctx.fillText(
        name,
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
   FOG PARTICLES
========================================================= */

function createFogParticles() {

    const geometry =
        new THREE.BufferGeometry();


    const positions = [];


    for (
        let i = 0;
        i < 250;
        i++
    ) {

        positions.push(

            (
                Math.random() -
                0.5
            ) * 120,

            Math.random() * 10,

            (
                Math.random() -
                0.5
            ) * 110

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

            color: 0x7e8592,

            size: 0.6,

            transparent: true,

            opacity: 0.08

        });


    const fog =
        new THREE.Points(
            geometry,
            material
        );


    scene.add(
        fog
    );
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
        i < 170;
        i++
    ) {

        positions.push(

            (
                Math.random() -
                0.5
            ) * 110,

            1 +
            Math.random() * 14,

            (
                Math.random() -
                0.5
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

            color: 0xd5c66c,

            size: 0.25,

            transparent: true,

            opacity: 0.7

        });


    scene.add(

        new THREE.Points(
            geometry,
            material
        )

    );
}


/* =========================================================
   RANDOM CAUSE
========================================================= */

function randomCause() {

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

        "It was only supposed to be temporary.",

        "The developer moved on.",

        "Lost somewhere between backup folders.",

        "No longer compatible with reality."

    ];


    return causes[
        Math.floor(
            Math.random()
            * causes.length
        )
    ];
}


/* =========================================================
   FILE BURYING
========================================================= */

function buryFiles(
    event
) {

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
                    ) * 90;


                z =
                    (
                        Math.random()
                        - 0.5
                    ) * 90;


            } while (

                Math.abs(x) < 8 &&
                z > -45 &&
                z < 34

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
                        randomCause()

                }
            );

        }
    );


    event.target.value =
        "";
}


/* =========================================================
   CLICK TOMBS
========================================================= */

function handleSceneClick(
    event
) {

    const rect =
        renderer.domElement
        .getBoundingClientRect();


    mouse.x =
        (
            (
                event.clientX -
                rect.left
            )
            /
            rect.width
        )
        * 2 - 1;


    mouse.y =
        -(
            (
                event.clientY -
                rect.top
            )
            /
            rect.height
        )
        * 2 + 1;


    raycaster.setFromCamera(
        mouse,
        camera
    );


    const objects = [];


    tombs.forEach(
        tomb => {

            tomb.traverse(
                object => {

                    if (
                        object.isMesh ||
                        object.isSprite
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
   MEMORIAL
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
            <strong>FILE</strong><br>
            ${safe(data.name)}
        </div>

        <div class="memorial-line">
            <strong>SIZE</strong><br>
            ${formatSize(data.size)}
        </div>

        <div class="memorial-line">
            <strong>TYPE</strong><br>
            ${safe(data.type)}
        </div>

        <div class="memorial-line">
            <strong>DATE OF DEATH</strong><br>
            ${safe(data.date)}
        </div>

        <div class="cause">
            ☠ CAUSE OF DEATH
            <br><br>
            "${safe(data.cause)}"
        </div>

    `;


    document.getElementById(
        "infoPanel"
    ).classList.add(
        "show"
    );
}


/* =========================================================
   UI
========================================================= */

function setupUI() {

    document.getElementById(
        "closeMemorial"
    ).onclick =
        function () {

            document
                .getElementById(
                    "infoPanel"
                )
                .classList.remove(
                    "show"
                );

        };


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


            updateVisitors();


            document.getElementById(
                "visitorPanel"
            ).classList.add(
                "show"
            );

        };


    document.getElementById(
        "closeVisitorPanel"
    ).onclick =
        function () {

            document.getElementById(
                "visitorPanel"
            ).classList.remove(
                "show"
            );

        };


    document.getElementById(
        "roseButton"
    ).onclick =
        leaveRose;


    document.getElementById(
        "commentButton"
    ).onclick =
        leaveComment;


    document.getElementById(
        "visitorButton"
    ).onclick =
        function () {

            alert(
                "Welcome to CTRL + Z Cemetery.\n\n" +
                "Explore the forgotten files and visit their final resting places."
            );

        };
}


/* =========================================================
   VISITOR STORAGE
========================================================= */

function visitorKey() {

    if (
        !selectedTomb
    ) {

        return null;

    }


    return (
        "ctrlz_" +
        selectedTomb.userData.name
    );
}


function getVisitorData() {

    const key =
        visitorKey();


    if (
        !key
    ) {

        return {
            roses: 0,
            comments: []
        };

    }


    const saved =
        localStorage.getItem(
            key
        );


    if (
        !saved
    ) {

        return {
            roses: 0,
            comments: []
        };

    }


    try {

        return JSON.parse(
            saved
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
        visitorKey();


    if (
        key
    ) {

        localStorage.setItem(
            key,
            JSON.stringify(data)
        );

    }
}


/* =========================================================
   UPDATE VISITORS
========================================================= */

function updateVisitors() {

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

                ${safe(comment.text)}

                <small>
                    ${safe(comment.date)}
                </small>

            `;


            comments.appendChild(
                div
            );

        }
    );
}


/* =========================================================
   ROSE
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


    updateVisitors();
}


/* =========================================================
   COMMENT
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


    updateVisitors();
}


/* =========================================================
   GATE ANIMATION
========================================================= */

function updateGate() {

    if (
        !leftGate ||
        !rightGate
    ) {

        return;

    }


    /*
       Distance from camera
       to entrance.
    */

    const distance =
        camera.position.distanceTo(
            entrance.position
        );


    /*
       CLOSED:
       > 45

       START:
       < 45

       FULLY OPEN:
       < 24
    */

    let target = 0;


    if (
        distance < 24
    ) {

        target = 1;

    }

    else if (
        distance < 45
    ) {

        target =
            1 -
            (
                (distance - 24)
                /
                21
            );

    }


    /*
       Smooth movement.
    */

    gateProgress +=
        (
            target -
            gateProgress
        )
        * 0.035;


    /*
       Smoothstep.
    */

    const eased =
        gateProgress *
        gateProgress *
        (
            3 -
            2 *
            gateProgress
        );


    /*
       OPEN FROM CENTER
    */

    leftGate.rotation.y =
        -eased *
        Math.PI *
        0.82;


    rightGate.rotation.y =
        eased *
        Math.PI *
        0.82;
}


/* =========================================================
   ANIMATION
========================================================= */

function animate() {

    requestAnimationFrame(
        animate
    );


    controls.update();


    updateGate();


    /* Torch flicker */

    scene.traverse(
        object => {

            if (
                object.userData &&
                object.userData.torchLight
            ) {

                object.userData
                    .torchLight
                    .intensity =

                    2.0 +
                    Math.random() * 0.9;

            }

        }
    );


    renderer.render(
        scene,
        camera
    );
}


/* =========================================================
   FORMAT SIZE
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
   SECURITY
========================================================= */

function safe(
    value
) {

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
   RESIZE
========================================================= */

function resize() {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
}
