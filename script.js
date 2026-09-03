const sceneContainer =
    document.getElementById("scene");


const scene =
    new THREE.Scene();


/*
   Dark green night sky
*/

scene.background =
    new THREE.Color(
        0x07100f
    );


/*
   Light atmospheric fog
*/

scene.fog =
    new THREE.Fog(
        0x07100f,
        95,
        190
    );


/* =========================================================
   CAMERA
========================================================= */

const camera =
    new THREE.PerspectiveCamera(
        60,
        window.innerWidth /
        window.innerHeight,
        0.1,
        500
    );


/*
   CAMERA IS OUTSIDE GATE

   Gate = Z 28
   Camera = Z 72
*/

camera.position.set(
    0,
    6,
    72
);


/* =========================================================
   RENDERER
========================================================= */

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


renderer.setClearColor(
    0x07100f,
    1
);


renderer.shadowMap.enabled =
    true;


renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;


sceneContainer.appendChild(
    renderer.domElement
);


/* =========================================================
   LIGHTING
========================================================= */

const ambientLight =
    new THREE.AmbientLight(
        0x74698d,
        1.35
    );


scene.add(
    ambientLight
);


const hemisphereLight =
    new THREE.HemisphereLight(
        0x594f7a,
        0x203c30,
        1.25
    );


scene.add(
    hemisphereLight
);


/*
   Purple atmosphere
*/

const purpleLight =
    new THREE.PointLight(
        0x75419a,
        3.5,
        140
    );


purpleLight.position.set(
    -45,
    20,
    40
);


scene.add(
    purpleLight
);


/*
   Green atmosphere
*/

const greenLight =
    new THREE.PointLight(
        0x3c7658,
        3.5,
        150
    );


greenLight.position.set(
    40,
    15,
    35
);


scene.add(
    greenLight
);


/* =========================================================
   MOON
========================================================= */

const moonGeometry =
    new THREE.SphereGeometry(
        5,
        32,
        32
    );


const moonMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xcbd2ce
    });


const moon =
    new THREE.Mesh(
        moonGeometry,
        moonMaterial
    );


moon.position.set(
    35,
    45,
    -35
);


scene.add(
    moon
);


const moonGlow =
    new THREE.PointLight(
        0xa7acbd,
        2.4,
        170
    );


moonGlow.position.copy(
    moon.position
);


scene.add(
    moonGlow
);


const moonDirectional =
    new THREE.DirectionalLight(
        0xa9a9dd,
        0.7
    );


moonDirectional.position.set(
    20,
    50,
    -30
);


scene.add(
    moonDirectional
);


/* =========================================================
   STARS
========================================================= */

const starGeometry =
    new THREE.BufferGeometry();


const starPositions = [];


for (
    let i = 0;
    i < 1300;
    i++
) {

    const x =
        (Math.random() - 0.5) *
        300;


    const y =
        25 +
        Math.random() *
        110;


    const z =
        (Math.random() - 0.5) *
        300;


    starPositions.push(
        x,
        y,
        z
    );
}


starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        starPositions,
        3
    )
);


const starMaterial =
    new THREE.PointsMaterial({

        color: 0xe1e5df,

        size: 0.5,

        transparent: true,

        opacity: 0.85
    });


const stars =
    new THREE.Points(
        starGeometry,
        starMaterial
    );


scene.add(
    stars
);


/* =========================================================
   CEMETERY GROUND
========================================================= */

const groundGeometry =
    new THREE.PlaneGeometry(
        180,
        180
    );


const groundMaterial =
    new THREE.MeshStandardMaterial({

        /*
           NORMAL CEMETERY GROUND
           NO PURPLE
        */

        color: 0x17221d,

        roughness: 1,

        metalness: 0
    });


const ground =
    new THREE.Mesh(
        groundGeometry,
        groundMaterial
    );


ground.rotation.x =
    -Math.PI / 2;


ground.position.y =
    0;


ground.receiveShadow =
    true;


scene.add(
    ground
);


/* =========================================================
   NORMAL CEMETERY PATH
========================================================= */

const pathGeometry =
    new THREE.PlaneGeometry(
        7,
        75
    );


const pathMaterial =
    new THREE.MeshStandardMaterial({

        /*
           NORMAL DIRT / STONE
           INSTEAD OF PURPLE
        */

        color: 0x343936,

        roughness: 1,

        metalness: 0
    });


const path =
    new THREE.Mesh(
        pathGeometry,
        pathMaterial
    );


path.rotation.x =
    -Math.PI / 2;


/*
   Gate is Z 28.

   Cemetery extends toward
   negative Z.

   Path goes from gate
   into cemetery.
*/

path.position.set(
    0,
    0.025,
    -8
);


scene.add(
    path
);


/* =========================================================
   SMALL PATH STONES
========================================================= */

function createPathStone(
    x,
    z
) {

    const geometry =
        new THREE.BoxGeometry(
            1.8,
            0.12,
            1
        );


    const material =
        new THREE.MeshStandardMaterial({

            color: 0x555a55,

            roughness: 1
        });


    const stone =
        new THREE.Mesh(
            geometry,
            material
        );


    stone.position.set(
        x,
        0.09,
        z
    );


    stone.rotation.y =
        (Math.random() - 0.5) *
        0.3;


    scene.add(
        stone
    );
}


for (
    let z = 22;
    z > -48;
    z -= 3
) {

    createPathStone(
        (Math.random() - 0.5) *
        1.4,

        z
    );
}


/* =========================================================
   ENTRANCE
========================================================= */

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


/* =========================================================
   MATERIALS
========================================================= */

const towerMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x1b2421,

        roughness: 0.85,

        metalness: 0.1,

        emissive: 0x09100d,

        emissiveIntensity: 0.35
    });


const stoneMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x303633,

        roughness: 0.95,

        metalness: 0.05
    });


const gateMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x202624,

        roughness: 0.55,

        metalness: 0.7
    });


const goldMaterial =
    new THREE.MeshStandardMaterial({

        color: 0xc09b4b,

        roughness: 0.35,

        metalness: 0.8,

        emissive: 0x4c3510,

        emissiveIntensity: 0.4
    });


/* =========================================================
   TOWERS
========================================================= */

function createTower(x) {

    const tower =
        new THREE.Group();


    tower.position.x =
        x;


    /*
       BODY
    */

    const bodyGeometry =
        new THREE.BoxGeometry(
            6.5,
            11,
            6.5
        );


    const body =
        new THREE.Mesh(
            bodyGeometry,
            towerMaterial
        );


    body.position.y =
        5.5;


    body.castShadow =
        true;


    tower.add(
        body
    );


    /*
       BASE
    */

    const baseGeometry =
        new THREE.BoxGeometry(
            7.2,
            1.8,
            7.2
        );


    const base =
        new THREE.Mesh(
            baseGeometry,
            stoneMaterial
        );


    base.position.y =
        0.9;


    tower.add(
        base
    );


    /*
       ROOF
    */

    const roofGeometry =
        new THREE.ConeGeometry(
            4.7,
            5,
            4
        );


    const roofMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x0c1311,

            roughness: 1
        });


    const roof =
        new THREE.Mesh(
            roofGeometry,
            roofMaterial
        );


    roof.rotation.y =
        Math.PI / 4;


    roof.position.y =
        13.5;


    tower.add(
        roof
    );


    entrance.add(
        tower
    );
}


createTower(-9);

createTower(9);


/* =========================================================
   GATE
========================================================= */

const gateHeight =
    7.5;


const gateWidth =
    5.7;


/*
   LEFT HINGE
*/

const leftGate =
    new THREE.Group();


leftGate.position.set(
    -5.8,
    5.5,
    -3.7
);


entrance.add(
    leftGate
);


/*
   RIGHT HINGE
*/

const rightGate =
    new THREE.Group();


rightGate.position.set(
    5.8,
    5.5,
    -3.7
);


entrance.add(
    rightGate
);


/* =========================================================
   GATE PANEL
========================================================= */

function createGatePanel(
    group,
    direction
) {

    const panelGeometry =
        new THREE.BoxGeometry(
            gateWidth,
            gateHeight,
            0.38
        );


    const panel =
        new THREE.Mesh(
            panelGeometry,
            gateMaterial
        );


    panel.position.x =
        direction *
        (gateWidth / 2);


    panel.castShadow =
        true;


    group.add(
        panel
    );


    /*
       GOLD HORIZONTAL BARS
    */

    for (
        let y = -2.8;
        y <= 2.8;
        y += 1.4
    ) {

        const barGeometry =
            new THREE.BoxGeometry(
                gateWidth,
                0.16,
                0.48
            );


        const bar =
            new THREE.Mesh(
                barGeometry,
                goldMaterial
            );


        bar.position.set(

            direction *
            (gateWidth / 2),

            y,

            -0.25
        );


        group.add(
            bar
        );
    }


    /*
       GOLD VERTICAL BARS
    */

    for (
        let x = -2.2;
        x <= 2.2;
        x += 1.1
    ) {

        const barGeometry =
            new THREE.BoxGeometry(
                0.16,
                gateHeight,
                0.48
            );


        const bar =
            new THREE.Mesh(
                barGeometry,
                goldMaterial
            );


        bar.position.set(

            direction *
            (gateWidth / 2)
            + x,

            0,

            -0.25
        );


        group.add(
            bar
        );
    }
}


createGatePanel(
    leftGate,
    1
);


createGatePanel(
    rightGate,
    -1
);


/* =========================================================
   CENTER POST
========================================================= */

const centerPostGeometry =
    new THREE.BoxGeometry(
        0.45,
        8.2,
        0.55
    );


const centerPost =
    new THREE.Mesh(
        centerPostGeometry,
        goldMaterial
    );


centerPost.position.set(
    0,
    5.8,
    -3.7
);


entrance.add(
    centerPost
);


/* =========================================================
   CEMETERY SIGN
========================================================= */

function createSignTexture() {

    const canvas =
        document.createElement(
            "canvas"
        );


    canvas.width =
        1200;


    canvas.height =
        350;


    const ctx =
        canvas.getContext(
            "2d"
        );


    ctx.fillStyle =
        "#101614";


    ctx.fillRect(
        0,
        0,
        1200,
        350
    );


    ctx.strokeStyle =
        "#d2ae5d";


    ctx.lineWidth =
        8;


    ctx.strokeRect(
        15,
        15,
        1170,
        320
    );


    ctx.textAlign =
        "center";


    ctx.fillStyle =
        "#e3c775";


    ctx.font =
        "bold 78px Georgia";


    ctx.fillText(
        "CTRL + Z",
        600,
        115
    );


    ctx.font =
        "bold 60px Georgia";


    ctx.fillText(
        "CEMETERY",
        600,
        185
    );


    ctx.fillStyle =
        "#aaa28e";


    ctx.font =
        "25px Georgia";


    ctx.fillText(
        "WHERE FORGOTTEN FILES COME TO REST",
        600,
        250
    );


    return canvas;
}


const signTexture =
    new THREE.CanvasTexture(
        createSignTexture()
    );


const signMaterial =
    new THREE.MeshStandardMaterial({

        map: signTexture,

        emissive: 0x57451b,

        emissiveIntensity: 0.5
    });


const signGeometry =
    new THREE.BoxGeometry(
        10.5,
        3,
        0.4
    );


const sign =
    new THREE.Mesh(
        signGeometry,
        signMaterial
    );


sign.position.set(
    0,
    13.4,
    -4.15
);


entrance.add(
    sign
);


/* =========================================================
   OUTSIDE YELLOW LIGHTS
========================================================= */

const entranceLights = [];


function createEntranceLight(
    x,
    z
) {

    const lampGeometry =
        new THREE.SphereGeometry(
            0.38,
            16,
            16
        );


    const lampMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xffc84d,

            emissive: 0xffa51e,

            emissiveIntensity: 2.5
        });


    const lamp =
        new THREE.Mesh(
            lampGeometry,
            lampMaterial
        );


    lamp.position.set(
        x,
        3.4,
        z
    );


    entrance.add(
        lamp
    );


    const light =
        new THREE.PointLight(
            0xffb52f,
            3.5,
            25
        );


    light.position.set(
        x,
        3.4,
        z
    );


    entrance.add(
        light
    );


    entranceLights.push(
        light
    );
}


/*
   THESE ARE OUTSIDE
   THE GATE
*/

createEntranceLight(
    -13,
    -7
);


createEntranceLight(
    13,
    -7
);


createEntranceLight(
    -7,
    -6
);


createEntranceLight(
    7,
    -6
);


/* =========================================================
   TORCHES
========================================================= */

function createTorch(
    x,
    z
) {

    const postGeometry =
        new THREE.CylinderGeometry(
            0.13,
            0.18,
            2.5,
            8
        );


    const postMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x151817,

            roughness: 0.85
        });


    const post =
        new THREE.Mesh(
            postGeometry,
            postMaterial
        );


    post.position.set(
        x,
        1.25,
        z
    );


    entrance.add(
        post
    );


    const flameGeometry =
        new THREE.SphereGeometry(
            0.28,
            12,
            12
        );


    const flameMaterial =
        new THREE.MeshBasicMaterial({
            color: 0xffb52e
        });


    const flame =
        new THREE.Mesh(
            flameGeometry,
            flameMaterial
        );


    flame.position.set(
        x,
        2.65,
        z
    );


    entrance.add(
        flame
    );
}


createTorch(
    -13,
    -7
);


createTorch(
    13,
    -7
);


/* =========================================================
   CEMETERY FENCE
========================================================= */

function createFenceLine(
    side
) {

    for (
        let z = 24;
        z > -48;
        z -= 5
    ) {

        const postGeometry =
            new THREE.BoxGeometry(
                0.25,
                2.5,
                0.25
            );


        const postMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x252b29,

                roughness: 0.9
            });


        const post =
            new THREE.Mesh(
                postGeometry,
                postMaterial
            );


        post.position.set(
            side * 27,
            1.25,
            z
        );


        scene.add(
            post
        );


        /*
           fence horizontal bar
        */

        if (z > -45) {

            const railGeometry =
                new THREE.BoxGeometry(
                    0.18,
                    0.18,
                    5
                );


            const rail =
                new THREE.Mesh(
                    railGeometry,
                    postMaterial
                );


            rail.position.set(
                side * 27,
                1.5,
                z - 2.5
            );


            scene.add(
                rail
            );
        }
    }
}


createFenceLine(-1);

createFenceLine(1);


/* =========================================================
   CEMETERY TREES
========================================================= */

function createTree(
    x,
    z,
    scale
) {

    const tree =
        new THREE.Group();


    /*
       trunk
    */

    const trunkGeometry =
        new THREE.CylinderGeometry(
            0.35 * scale,
            0.55 * scale,
            5 * scale,
            8
        );


    const trunkMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x20221e,

            roughness: 1
        });


    const trunk =
        new THREE.Mesh(
            trunkGeometry,
            trunkMaterial
        );


    trunk.position.y =
        2.5 * scale;


    tree.add(
        trunk
    );


    /*
       branches
    */

    const branchMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x101713,

            roughness: 1
        });


    for (
        let i = 0;
        i < 4;
        i++
    ) {

        const branchGeometry =
            new THREE.CylinderGeometry(
                0.12 * scale,
                0.25 * scale,
                3 * scale,
                7
            );


        const branch =
            new THREE.Mesh(
                branchGeometry,
                branchMaterial
            );


        branch.position.y =
            4 * scale;


        branch.rotation.z =
            (
                Math.random() -
                0.5
            ) * 1.3;


        branch.rotation.x =
            (
                Math.random() -
                0.5
            ) * 0.8;


        tree.add(
            branch
        );
    }


    tree.position.set(
        x,
        0,
        z
    );


    scene.add(
        tree
    );
}


/*
   Trees only inside cemetery
*/

createTree(
    -23,
    10,
    1.4
);


createTree(
    22,
    3,
    1.7
);


createTree(
    -24,
    -22,
    1.6
);


createTree(
    24,
    -28,
    1.5
);


createTree(
    -18,
    -42,
    1.2
);


createTree(
    19,
    -45,
    1.3
);


/* =========================================================
   TOMBS
========================================================= */

const tombs = [];


let graveCount = 28;


/*
   IMPORTANT:

   CAMERA:
   +72

   GATE:
   +28

   CEMETERY:
   +20 to -50

   Tombs are therefore
   BEHIND the gate.
*/

function getInsidePosition() {

    let x;

    let z;


    do {

        x =
            (Math.random() - 0.5) *
            42;


        z =
            -48 +
            Math.random() *
            68;


    } while (

        /*
           Keep central entrance
           path clear
        */

        Math.abs(x) < 6 &&
        z > -25

    );


    return {
        x,
        z
    };
}


/* =========================================================
   CREATE TOMB
========================================================= */

function createTomb(
    fileName,
    isNew = false
) {

    const tomb =
        new THREE.Group();


    const position =
        getInsidePosition();


    tomb.position.set(

        position.x,

        isNew
            ? -1.5
            : 0,

        position.z
    );


    /*
       RANDOM SIZE
    */

    const stoneWidth =
        2.0 +
        Math.random() *
        0.8;


    const stoneHeight =
        2.6 +
        Math.random() *
        1;


    const stoneDepth =
        0.65;


    /* =================================================
       TOMBSTONE
    ================================================= */

    const stoneGeometry =
        new THREE.BoxGeometry(
            stoneWidth,
            stoneHeight,
            stoneDepth
        );


    const stoneMaterial =
        new THREE.MeshStandardMaterial({

            color:
                isNew
                    ? 0x313b3b
                    : 0x2a3332,

            roughness: 0.82,

            metalness: 0.08,

            emissive:
                isNew
                    ? 0x301844
                    : 0x111917,

            emissiveIntensity:
                isNew
                    ? 0.65
                    : 0.22
        });


    const stone =
        new THREE.Mesh(
            stoneGeometry,
            stoneMaterial
        );


    stone.position.y =
        stoneHeight / 2;


    stone.castShadow =
        true;


    stone.receiveShadow =
        true;


    tomb.add(
        stone
    );


    /* =================================================
       TOMBSTONE TOP
    ================================================= */

    const topGeometry =
        new THREE.SphereGeometry(
            stoneWidth / 2,
            20,
            10,
            0,
            Math.PI * 2,
            0,
            Math.PI / 2
        );


    const top =
        new THREE.Mesh(
            topGeometry,
            stoneMaterial
        );


    top.scale.z =
        stoneDepth /
        stoneWidth;


    top.position.set(
        0,
        stoneHeight,
        0
    );


    tomb.add(
        top
    );


    /* =================================================
       CROSS
    ================================================= */

    const crossMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x7a8583,

            roughness: 0.65,

            emissive: 0x253532,

            emissiveIntensity: 0.45
        });


    const verticalGeometry =
        new THREE.BoxGeometry(
            0.25,
            1.4,
            0.22
        );


    const vertical =
        new THREE.Mesh(
            verticalGeometry,
            crossMaterial
        );


    vertical.position.set(
        0,
        stoneHeight + 0.8,
        -0.08
    );


    tomb.add(
        vertical
    );


    const horizontalGeometry =
        new THREE.BoxGeometry(
            0.9,
            0.25,
            0.22
        );


    const horizontal =
        new THREE.Mesh(
            horizontalGeometry,
            crossMaterial
        );


    horizontal.position.set(
        0,
        stoneHeight + 1.05,
        -0.08
    );


    tomb.add(
        horizontal
    );


    /* =================================================
       SMALL GRAVE BASE
    ================================================= */

    const baseGeometry =
        new THREE.BoxGeometry(
            stoneWidth + 0.5,
            0.18,
            1.1
        );


    const baseMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x353c39,

            roughness: 1
        });


    const base =
        new THREE.Mesh(
            baseGeometry,
            baseMaterial
        );


    base.position.y =
        0.09;


    base.position.z =
        0.08;


    tomb.add(
        base
    );


    /* =================================================
       SUBTLE TOMB LIGHT
    ================================================= */

    const tombLight =
        new THREE.PointLight(
            0x9a58c5,

            isNew
                ? 1.5
                : 0.3,

            7
        );


    tombLight.position.set(
        0,
        stoneHeight * 0.7,
        0
    );


    tomb.add(
        tombLight
    );


    /* =================================================
       DATA
    ================================================= */

    tomb.userData.isTomb =
        true;


    tomb.userData.fileName =
        fileName;


    tomb.userData.roses =
        0;


    tomb.userData.comments =
        [];


    tomb.userData.emerging =
        isNew;


    tombs.push(
        tomb
    );


    scene.add(
        tomb
    );


    /* =================================================
       NEW TOMB ANIMATION
    ================================================= */

    if (isNew) {

        tomb.scale.set(
            0.05,
            0.05,
            0.05
        );


        tomb.userData.startTime =
            performance.now();


        tomb.userData.light =
            tombLight;
    }


    return tomb;
}


/* =========================================================
   INITIAL TOMBS
========================================================= */

for (
    let i = 0;
    i < graveCount;
    i++
) {

    createTomb(
        "forgotten_file_" +
        String(i + 1)
            .padStart(2, "0") +
        ".dat"
    );
}


/* =========================================================
   EXTRA GRAVE DECORATIONS
========================================================= */

function createSmallGraveStone(
    x,
    z
) {

    const geometry =
        new THREE.BoxGeometry(
            0.8,
            0.6,
            0.5
        );


    const material =
        new THREE.MeshStandardMaterial({

            color: 0x424845,

            roughness: 1
        });


    const stone =
        new THREE.Mesh(
            geometry,
            material
        );


    stone.position.set(
        x,
        0.3,
        z
    );


    stone.rotation.y =
        Math.random();


    scene.add(
        stone
    );
}


for (
    let i = 0;
    i < 30;
    i++
) {

    const x =
        (Math.random() - 0.5) *
        50;


    const z =
        -45 +
        Math.random() *
        65;


    /*
       Don't put them
       on central path.
    */

    if (
        Math.abs(x) > 5
    ) {

        createSmallGraveStone(
            x,
            z
        );
    }
}


/* =========================================================
   GATE OPENING
========================================================= */

let gateProgress =
    0;


function updateGate() {

    const distance =
        Math.abs(
            camera.position.z -
            28
        );


    let target =
        0;


    if (
        distance > 38
    ) {

        target = 0;

    } else if (
        distance > 8
    ) {

        target =
            1 -
            (
                (distance - 8) /
                30
            );

    } else {

        target = 1;

    }


    gateProgress +=
        (
            target -
            gateProgress
        ) *
        0.08;


    const eased =
        gateProgress *
        gateProgress *
        (3 - 2 * gateProgress);


    /*
       OUTWARD
    */

    leftGate.rotation.y =
        -eased *
        Math.PI *
        0.62;


    rightGate.rotation.y =
        eased *
        Math.PI *
        0.62;
}


/* =========================================================
   CAMERA LOOK
========================================================= */

let yaw =
    0;


let pitch =
    -0.03;


let dragging =
    false;


let previousMouseX =
    0;


let previousMouseY =
    0;


renderer.domElement.addEventListener(
    "pointerdown",
    function(event) {

        dragging =
            true;


        previousMouseX =
            event.clientX;


        previousMouseY =
            event.clientY;


        renderer.domElement.setPointerCapture(
            event.pointerId
        );
    }
);


renderer.domElement.addEventListener(
    "pointermove",
    function(event) {

        if (!dragging)
            return;


        const dx =
            event.clientX -
            previousMouseX;


        const dy =
            event.clientY -
            previousMouseY;


        previousMouseX =
            event.clientX;


        previousMouseY =
            event.clientY;


        yaw -=
            dx * 0.003;


        pitch -=
            dy * 0.002;


        pitch =
            Math.max(
                -0.7,
                Math.min(
                    0.5,
                    pitch
                )
            );
    }
);


renderer.domElement.addEventListener(
    "pointerup",
    function() {

        dragging =
            false;

    }
);


/* =========================================================
   MOVEMENT
========================================================= */

renderer.domElement.addEventListener(
    "wheel",
    function(event) {

        /*
           Scroll down = forward

           Forward is -Z
        */

        const forwardX =
            Math.sin(yaw);


        const forwardZ =
            -Math.cos(yaw);


        const speed =
            event.deltaY > 0
                ? 1.8
                : -1.8;


        camera.position.x +=
            forwardX *
            speed;


        camera.position.z +=
            forwardZ *
            speed;


        /*
           LIMIT CAMERA
        */

        camera.position.x =
            Math.max(
                -60,
                Math.min(
                    60,
                    camera.position.x
                )
            );


        camera.position.z =
            Math.max(
                -58,
                Math.min(
                    82,
                    camera.position.z
                )
            );


        /*
           Hide title
        */

        document.getElementById(
            "welcome"
        ).style.opacity =
            camera.position.z < 65
                ? "0"
                : "1";

    },
    {
        passive: true
    }
);


/* =========================================================
   CAMERA LOOK
========================================================= */

function updateCameraLook() {

    const target =
        new THREE.Vector3();


    target.x =
        camera.position.x +
        Math.sin(yaw) *
        20;


    target.y =
        camera.position.y +
        Math.sin(pitch) *
        20;


    target.z =
        camera.position.z -
        Math.cos(yaw) *
        20;


    camera.lookAt(
        target
    );
}


/* =========================================================
   TOMBSTONE CLICK
========================================================= */

const raycaster =
    new THREE.Raycaster();


const mouse =
    new THREE.Vector2();


renderer.domElement.addEventListener(
    "click",
    function(event) {

        mouse.x =
            (
                event.clientX /
                window.innerWidth
            ) *
            2 -
            1;


        mouse.y =
            -(
                event.clientY /
                window.innerHeight
            ) *
            2 +
            1;


        raycaster.setFromCamera(
            mouse,
            camera
        );


        const objects =
            raycaster.intersectObjects(
                tombs,
                true
            );


        if (
            objects.length === 0
        )
            return;


        let selected =
            objects[0].object;


        while (
            selected &&
            !selected.userData.isTomb
        ) {

            selected =
                selected.parent;
        }


        if (
            selected &&
            selected.userData.isTomb
        ) {

            openMemorial(
                selected
            );
        }
    }
);


/* =========================================================
   MEMORIAL
========================================================= */

let selectedTomb =
    null;


function openMemorial(
    tomb
) {

    selectedTomb =
        tomb;


    const panel =
        document.getElementById(
            "memorialPanel"
        );


    const content =
        document.getElementById(
            "memorialContent"
        );


    content.innerHTML = `

        <h2>
            🪦 Digital Memorial
        </h2>

        <p>
            <strong>File:</strong>
            ${escapeHTML(
                tomb.userData.fileName
            )}
        </p>

        <p>
            This forgotten digital artifact
            now rests peacefully inside
            CTRL + Z Cemetery.
        </p>

        <p>
            🌹 Roses:
            ${tomb.userData.roses}
        </p>

    `;


    panel.classList.add(
        "show"
    );
}


/* =========================================================
   CLOSE MEMORIAL
========================================================= */

document.getElementById(
    "closeMemorial"
).addEventListener(
    "click",
    function() {

        document.getElementById(
            "memorialPanel"
        ).classList.remove(
            "show"
        );

    }
);


/* =========================================================
   VISITOR PANEL
========================================================= */

document.getElementById(
    "openVisitorPanel"
).addEventListener(
    "click",
    function() {

        if (!selectedTomb)
            return;


        openVisitors(
            selectedTomb
        );
    }
);


function openVisitors(
    tomb
) {

    selectedTomb =
        tomb;


    document.getElementById(
        "selectedTombName"
    ).textContent =
        tomb.userData.fileName;


    document.getElementById(
        "roseCount"
    ).textContent =
        tomb.userData.roses;


    renderComments(
        tomb
    );


    document.getElementById(
        "visitorPanel"
    ).classList.add(
        "show"
    );
}


/* =========================================================
   CLOSE VISITOR
========================================================= */

document.getElementById(
    "closeVisitorPanel"
).addEventListener(
    "click",
    function() {

        document.getElementById(
            "visitorPanel"
        ).classList.remove(
            "show"
        );

    }
);


/* =========================================================
   VISITOR BUTTON
========================================================= */

document.getElementById(
    "visitorButton"
).addEventListener(
    "click",
    function() {

        if (!selectedTomb) {

            if (
                tombs.length > 0
            ) {

                openVisitors(
                    tombs[0]
                );
            }

        } else {

            openVisitors(
                selectedTomb
            );
        }

    }
);


/* =========================================================
   ROSE
========================================================= */

document.getElementById(
    "roseButton"
).addEventListener(
    "click",
    function() {

        if (!selectedTomb)
            return;


        selectedTomb.userData.roses++;


        document.getElementById(
            "roseCount"
        ).textContent =
            selectedTomb.userData.roses;


        saveTombData();

    }
);


/* =========================================================
   COMMENTS
========================================================= */

document.getElementById(
    "commentButton"
).addEventListener(
    "click",
    function() {

        if (!selectedTomb)
            return;


        const input =
            document.getElementById(
                "commentInput"
            );


        const text =
            input.value.trim();


        if (!text)
            return;


        selectedTomb.userData.comments.push(
            text
        );


        input.value =
            "";


        renderComments(
            selectedTomb
        );


        saveTombData();

    }
);


/* =========================================================
   RENDER COMMENTS
========================================================= */

function renderComments(
    tomb
) {

    const container =
        document.getElementById(
            "comments"
        );


    container.innerHTML =
        "";


    tomb.userData.comments.forEach(
        function(comment) {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "comment";


            div.textContent =
                "🌹 " +
                comment;


            container.appendChild(
                div
            );
        }
    );
}


/* =========================================================
   SAVE
========================================================= */

function saveTombData() {

    const data =
        tombs.map(
            function(tomb) {

                return {

                    fileName:
                        tomb.userData.fileName,

                    roses:
                        tomb.userData.roses,

                    comments:
                        tomb.userData.comments
                };
            }
        );


    localStorage.setItem(
        "ctrlZ_tombs",
        JSON.stringify(data)
    );
}


/* =========================================================
   FILE INPUT
========================================================= */

const fileInput =
    document.getElementById(
        "fileInput"
    );


fileInput.addEventListener(
    "change",
    function() {

        const files =
            Array.from(
                fileInput.files
            );


        if (
            files.length === 0
        )
            return;


        files.forEach(
            function(file, index) {

                setTimeout(
                    function() {

                        buryFile(
                            file
                        );

                    },
                    index * 700
                );

            }
        );


        fileInput.value =
            "";

    }
);


/* =========================================================
   BURY FILE
========================================================= */

function buryFile(
    file
) {

    graveCount++;


    document.getElementById(
        "graveCount"
    ).textContent =
        graveCount;


    /*
       New tomb appears
       BEHIND THE GATE
    */

    createTomb(
        file.name,
        true
    );


    triggerLightning();


    showBurialPopup(
        file.name
    );


    saveTombData();
}


/* =========================================================
   LIGHTNING
========================================================= */

function triggerLightning() {

    const flash =
        document.getElementById(
            "lightningFlash"
        );


    flash.classList.remove(
        "flash"
    );


    void flash.offsetWidth;


    flash.classList.add(
        "flash"
    );


    const oldAmbient =
        ambientLight.intensity;


    const oldMoon =
        moonDirectional.intensity;


    ambientLight.intensity =
        3.2;


    moonDirectional.intensity =
        1.6;


    setTimeout(
        function() {

            ambientLight.intensity =
                oldAmbient;


            moonDirectional.intensity =
                oldMoon;

        },
        500
    );
}


/* =========================================================
   BURIAL POPUP
========================================================= */

let popupTimer =
    null;


function showBurialPopup(
    fileName
) {

    const popup =
        document.getElementById(
            "burialPopup"
        );


    document.getElementById(
        "popupFileName"
    ).textContent =
        fileName;


    popup.classList.add(
        "show"
    );


    clearTimeout(
        popupTimer
    );


    popupTimer =
        setTimeout(
            function() {

                popup.classList.remove(
                    "show"
                );

            },
            3300
        );
}


/* =========================================================
   NEW TOMB RISING
========================================================= */

function updateEmergingTombs() {

    const now =
        performance.now();


    tombs.forEach(
        function(tomb) {

            if (
                !tomb.userData.emerging
            )
                return;


            const elapsed =
                now -
                tomb.userData.startTime;


            const duration =
                1700;


            let progress =
                Math.min(
                    elapsed /
                    duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            tomb.scale.set(
                eased,
                eased,
                eased
            );


            tomb.position.y =
                -1.5 +
                eased * 1.5;


            if (
                tomb.userData.light
            ) {

                tomb.userData.light.intensity =
                    1.5 *
                    (1 - progress) +
                    0.3;
            }


            if (
                progress >= 1
            ) {

                tomb.userData.emerging =
                    false;


                tomb.position.y =
                    0;


                tomb.scale.set(
                    1,
                    1,
                    1
                );
            }

        }
    );
}


/* =========================================================
   LIGHT FLICKER
========================================================= */

function animateLights() {

    const time =
        performance.now() *
        0.006;


    entranceLights.forEach(
        function(
            light,
            index
        ) {

            light.intensity =
                3.1 +
                Math.sin(
                    time +
                    index * 2
                ) *
                0.45 +
                Math.random() *
                0.12;

        }
    );
}


/* =========================================================
   ESCAPE HTML
========================================================= */

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


/* =========================================================
   RESIZE
========================================================= */

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


/* =========================================================
   ANIMATION
========================================================= */

function animate() {

    requestAnimationFrame(
        animate
    );


    updateGate();

    updateCameraLook();

    updateEmergingTombs();

    animateLights();


    stars.rotation.y +=
        0.00008;


    renderer.render(
        scene,
        camera
    );
}


animate();
