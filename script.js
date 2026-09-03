/* =========================================================
   CTRL + Z DIGITAL CEMETERY
   CLEAN VERSION
========================================================= */


/* =========================================================
   BASIC SETUP
========================================================= */

const sceneContainer =
    document.getElementById("scene");


const scene =
    new THREE.Scene();


/*
   IMPORTANT:
   No black fog.

   The background is a dark
   green-purple night.
*/

scene.background =
    new THREE.Color(0x07100f);


/*
   Very light fog so objects
   remain visible.
*/

scene.fog =
    new THREE.Fog(
        0x07100f,
        100,
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
   Camera starts outside.

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


renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;


sceneContainer.appendChild(
    renderer.domElement
);


/* =========================================================
   LIGHTING
========================================================= */


/*
   Main ambient light.

   This prevents the scene
   from becoming completely black.
*/

const ambientLight =
    new THREE.AmbientLight(
        0x6f668d,
        1.35
    );

scene.add(
    ambientLight
);


/*
   Hemisphere light.

   Purple sky
   +
   green ground.
*/

const hemisphereLight =
    new THREE.HemisphereLight(
        0x554b78,
        0x1c392e,
        1.15
    );

scene.add(
    hemisphereLight
);


/*
   PURPLE ATMOSPHERE
*/

const purpleLight =
    new THREE.PointLight(
        0x743f9c,
        3.5,
        130
    );

purpleLight.position.set(
    -40,
    18,
    55
);

scene.add(
    purpleLight
);


/*
   GREEN ATMOSPHERE
*/

const greenLight =
    new THREE.PointLight(
        0x397257,
        3.5,
        140
    );

greenLight.position.set(
    40,
    15,
    60
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
        color: 0xc8d0ca
    });


const moon =
    new THREE.Mesh(
        moonGeometry,
        moonMaterial
    );


moon.position.set(
    35,
    43,
    -25
);


scene.add(
    moon
);


/*
   Moon glow
*/

const moonGlow =
    new THREE.PointLight(
        0xa4a9bd,
        2.2,
        170
    );


moonGlow.position.copy(
    moon.position
);


scene.add(
    moonGlow
);


/*
   Moon directional light
*/

const moonDirectional =
    new THREE.DirectionalLight(
        0xaaaaff,
        0.65
    );


moonDirectional.position.set(
    20,
    50,
    -20
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
    i < 1100;
    i++
) {

    const x =
        (Math.random() - 0.5) *
        300;

    const y =
        25 +
        Math.random() * 100;

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
        color: 0xd9ded9,
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
   GROUND
========================================================= */

const groundGeometry =
    new THREE.PlaneGeometry(
        180,
        180
    );


const groundMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x10201a,
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


ground.position.y = 0;


ground.receiveShadow = true;


scene.add(
    ground
);


/* =========================================================
   PURPLE PATH
========================================================= */

const pathGeometry =
    new THREE.PlaneGeometry(
        8,
        115
    );


const pathMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x32184b,
        roughness: 0.95,

        emissive: 0x160b25,

        emissiveIntensity: 0.35
    });


const path =
    new THREE.Mesh(
        pathGeometry,
        pathMaterial
    );


path.rotation.x =
    -Math.PI / 2;


path.position.set(
    0,
    0.03,
    38
);


scene.add(
    path
);


/* =========================================================
   ENTRANCE
========================================================= */

const entrance =
    new THREE.Group();


/*
   Gate is located here.
*/

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

        color: 0x18201f,

        roughness: 0.8,

        metalness: 0.15,

        emissive: 0x08100e,

        emissiveIntensity: 0.35
    });


const stoneMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x222b29,

        roughness: 0.9,

        metalness: 0.05
    });


const gateMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x1b211f,

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
       MAIN TOWER
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


    body.castShadow = true;


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

            color: 0x0b1211,

            roughness: 1,

            emissive: 0x050908,

            emissiveIntensity: 0.3
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


    /*
       GOLD ROOF EDGE
    */

    const edgeGeometry =
        new THREE.BoxGeometry(
            6.8,
            0.16,
            0.2
        );


    const edge =
        new THREE.Mesh(
            edgeGeometry,
            goldMaterial
        );


    edge.position.set(
        0,
        10.7,
        3.28
    );


    tower.add(
        edge
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

const gateHeight = 7.5;

const gateWidth = 5.7;


/*
   LEFT HINGE
*/

const leftGate =
    new THREE.Group();


leftGate.position.set(
    -5.8,
    1.8,
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
    1.8,
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

    /*
       SOLID PANEL
    */

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


    panel.castShadow = true;


    group.add(
        panel
    );


    /*
       HORIZONTAL GOLD BARS
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
       VERTICAL GOLD BARS
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
   GATE TOP
========================================================= */

const gateTopGeometry =
    new THREE.BoxGeometry(
        12.5,
        0.45,
        0.5
    );


const gateTop =
    new THREE.Mesh(
        gateTopGeometry,
        goldMaterial
    );


gateTop.position.set(
    0,
    9.8,
    -3.7
);


entrance.add(
    gateTop
);


/* =========================================================
   CEMETERY SIGN
========================================================= */

function createSignTexture() {

    const canvas =
        document.createElement(
            "canvas"
        );


    canvas.width = 1200;

    canvas.height = 350;


    const ctx =
        canvas.getContext(
            "2d"
        );


    /*
       SIGN BACKGROUND
    */

    ctx.fillStyle =
        "#101614";


    ctx.fillRect(
        0,
        0,
        1200,
        350
    );


    /*
       GOLD BORDER
    */

    ctx.strokeStyle =
        "#d2ae5d";


    ctx.lineWidth = 8;


    ctx.strokeRect(
        15,
        15,
        1170,
        320
    );


    /*
       CTRL + Z
    */

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


    /*
       CEMETERY
    */

    ctx.font =
        "bold 60px Georgia";


    ctx.fillText(
        "CEMETERY",
        600,
        185
    );


    /*
       DESCRIPTION
    */

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


/*
   SIGN IS ABOVE
   AND SLIGHTLY IN FRONT
   OF THE GATE.
*/

sign.position.set(
    0,
    13.4,
    -4.15
);


entrance.add(
    sign
);


/* =========================================================
   YELLOW OUTSIDE LIGHTS
========================================================= */

const entranceLights = [];


function createEntranceLight(
    x,
    z
) {

    /*
       Lamp
    */

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


    /*
       Warm light
    */

    const light =
        new THREE.PointLight(
            0xffb52f,
            3.5,
            24
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
   IMPORTANT:

   These are IN FRONT
   of the gate.

   Negative Z means
   toward the camera.
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
   TOMBS
========================================================= */

const tombs = [];


let graveCount = 28;


/*
   VERY IMPORTANT:

   Gate = Z 28

   Empty entrance = 28 → 58

   Tombs = 62 → 110

   Therefore tombs cannot
   appear in front of gate.
*/

function getInsidePosition() {

    let x;

    let z;


    do {

        x =
            (Math.random() - 0.5) *
            52;


        z =
            62 +
            Math.random() *
            45;


    } while (
        Math.abs(x) < 7 &&
        z < 78
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
       SIZE
    */

    const stoneWidth =
        2.1 +
        Math.random() * 0.8;


    const stoneHeight =
        2.7 +
        Math.random() * 1;


    const stoneDepth =
        0.7;


    /*
       BODY
    */

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
                    ? 0x252e32
                    : 0x20292b,

            roughness: 0.8,

            metalness: 0.08,

            emissive:
                isNew
                    ? 0x29143c
                    : 0x10151a,

            emissiveIntensity:
                isNew
                    ? 0.65
                    : 0.2
        });


    const stone =
        new THREE.Mesh(
            stoneGeometry,
            stoneMaterial
        );


    stone.position.y =
        stoneHeight / 2;


    stone.castShadow = true;


    tomb.add(
        stone
    );


    /*
       ROUNDED TOP
    */

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


    /*
       CROSS
    */

    const crossMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x748083,

            roughness: 0.65,

            emissive: 0x253035,

            emissiveIntensity: 0.45
        });


    const verticalGeometry =
        new THREE.BoxGeometry(
            0.28,
            1.4,
            0.24
        );


    const vertical =
        new THREE.Mesh(
            verticalGeometry,
            crossMaterial
        );


    vertical.position.set(
        0,
        stoneHeight + 0.9,
        -0.08
    );


    tomb.add(
        vertical
    );


    const horizontalGeometry =
        new THREE.BoxGeometry(
            0.95,
            0.28,
            0.24
        );


    const horizontal =
        new THREE.Mesh(
            horizontalGeometry,
            crossMaterial
        );


    horizontal.position.set(
        0,
        stoneHeight + 1.1,
        -0.08
    );


    tomb.add(
        horizontal
    );


    /*
       SUBTLE PURPLE LIGHT
    */

    const tombLight =
        new THREE.PointLight(
            0x9a58c5,

            isNew
                ? 1.5
                : 0.35,

            8
        );


    tombLight.position.set(
        0,
        stoneHeight * 0.7,
        0
    );


    tomb.add(
        tombLight
    );


    /*
       DATA
    */

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


    /*
       NEW TOMB
    */

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
   GATE OPENING
========================================================= */

let gateProgress = 0;


function updateGate() {

    /*
       Distance from entrance.
    */

    const distance =
        Math.abs(
            camera.position.z -
            28
        );


    let target = 0;


    /*
       CLOSED
    */

    if (
        distance > 38
    ) {

        target = 0;

    }


    /*
       START OPENING
    */

    else if (
        distance > 8
    ) {

        target =
            1 -
            (
                (distance - 8) /
                30
            );

    }


    /*
       FULLY OPEN
    */

    else {

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
       LEFT OPENS OUTWARD
    */

    leftGate.rotation.y =
        -eased *
        Math.PI *
        0.62;


    /*
       RIGHT OPENS OUTWARD
    */

    rightGate.rotation.y =
        eased *
        Math.PI *
        0.62;
}


/* =========================================================
   CAMERA LOOK
========================================================= */

let yaw = 0;

let pitch = -0.03;

let dragging = false;

let previousMouseX = 0;

let previousMouseY = 0;


renderer.domElement.addEventListener(
    "pointerdown",
    function(event) {

        dragging = true;

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

        dragging = false;

    }
);


/* =========================================================
   CAMERA MOVEMENT
========================================================= */

renderer.domElement.addEventListener(
    "wheel",
    function(event) {

        /*
           Scroll DOWN:
           move forward.

           Forward = negative Z.
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
           WORLD LIMITS
        */

        camera.position.x =
            Math.max(
                -65,
                Math.min(
                    65,
                    camera.position.x
                )
            );


        camera.position.z =
            Math.max(
                -10,
                Math.min(
                    82,
                    camera.position.z
                )
            );


        /*
           Hide welcome
           when approaching.
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

let selectedTomb = null;


function openMemorial(tomb) {

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
            now rests peacefully in the
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


function openVisitors(tomb) {

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
   CLOSE VISITOR PANEL
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


        input.value = "";


        renderComments(
            selectedTomb
        );


        saveTombData();

    }
);


/* =========================================================
   RENDER COMMENTS
========================================================= */

function renderComments(tomb) {

    const container =
        document.getElementById(
            "comments"
        );


    container.innerHTML = "";


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
   SAVE DATA
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
   BURY FILE
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


        fileInput.value = "";

    }
);


/* =========================================================
   BURY FILE FUNCTION
========================================================= */

function buryFile(file) {

    graveCount++;


    document.getElementById(
        "graveCount"
    ).textContent =
        graveCount;


    /*
       Create tomb
    */

    createTomb(
        file.name,
        true
    );


    /*
       Lightning
    */

    triggerLightning();


    /*
       Popup
    */

    showBurialPopup(
        file.name
    );


    saveTombData();
}


/* =========================================================
   LIGHTNING EFFECT
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

let popupTimer = null;


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
                    0.35;
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
        function(light, index) {

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

function escapeHTML(text) {

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


    /*
       Very subtle star movement
    */

    stars.rotation.y +=
        0.00008;


    renderer.render(
        scene,
        camera
    );
}


animate();
