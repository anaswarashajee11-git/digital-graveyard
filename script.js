
const sceneContainer = document.getElementById("scene");


const scene = new THREE.Scene();

scene.background = new THREE.Color(0x020405);

scene.fog = new THREE.FogExp2(
    0x07110d,
    0.009
);




const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    500
);

/*
    IMPORTANT:

    Gate is at Z = 28

    Camera starts outside at Z = 78

    So the player approaches:

    78
     ↓
    60
     ↓
    45
     ↓
    28  ← GATE
     ↓
    15
     ↓
    CEMETERY
*/

camera.position.set(
    0,
    5.5,
    78
);



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

sceneContainer.appendChild(
    renderer.domElement
);


/* ---------------------------------------------------------
   LIGHTING
--------------------------------------------------------- */

const ambientLight =
    new THREE.AmbientLight(
        0x514a6e,
        0.8
    );

scene.add(ambientLight);


/* PURPLE AMBIENT */

const purpleLight =
    new THREE.PointLight(
        0x713f96,
        2.8,
        120
    );

purpleLight.position.set(
    -35,
    14,
    55
);

scene.add(purpleLight);


/* GREEN AMBIENT */

const greenLight =
    new THREE.PointLight(
        0x315f4b,
        3,
        130
    );

greenLight.position.set(
    35,
    12,
    60
);

scene.add(greenLight);


/* ---------------------------------------------------------
   MOON
--------------------------------------------------------- */

const moonGeometry =
    new THREE.SphereGeometry(
        5.5,
        32,
        32
    );

const moonMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xb9c2b9
    });

const moon =
    new THREE.Mesh(
        moonGeometry,
        moonMaterial
    );

moon.position.set(
    38,
    42,
    -40
);

scene.add(moon);


/* MOON GLOW */

const moonGlow =
    new THREE.PointLight(
        0x8e94a8,
        1.8,
        180
    );

moonGlow.position.copy(
    moon.position
);

scene.add(moonGlow);


/* MOON LIGHT */

const moonDirectional =
    new THREE.DirectionalLight(
        0x999cff,
        0.55
    );

moonDirectional.position.set(
    30,
    50,
    -30
);

scene.add(moonDirectional);


/* ---------------------------------------------------------
   STARS
--------------------------------------------------------- */

const starGeometry =
    new THREE.BufferGeometry();

const starPositions = [];

for (let i = 0; i < 800; i++) {

    starPositions.push(
        (Math.random() - 0.5) * 300,
        20 + Math.random() * 100,
        (Math.random() - 0.5) * 300
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
        color: 0xcfd4cf,
        size: 0.45,
        transparent: true,
        opacity: 0.7
    });

const stars =
    new THREE.Points(
        starGeometry,
        starMaterial
    );

scene.add(stars);


/* ---------------------------------------------------------
   GROUND
--------------------------------------------------------- */

const groundGeometry =
    new THREE.PlaneGeometry(
        180,
        180
    );

const groundMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x07100d,
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

scene.add(ground);


/* ---------------------------------------------------------
   PURPLE PATH
--------------------------------------------------------- */

const pathGeometry =
    new THREE.PlaneGeometry(
        8,
        100
    );

const pathMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x2b1742,
        roughness: 0.95
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
    0.025,
    38
);

scene.add(path);


/* ---------------------------------------------------------
   ENTRANCE GROUP
--------------------------------------------------------- */

const entrance =
    new THREE.Group();

entrance.position.set(
    0,
    0,
    28
);

scene.add(entrance);


/* ---------------------------------------------------------
   MATERIALS
--------------------------------------------------------- */

const towerMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x11181a,
        roughness: 0.85,
        metalness: 0.15
    });

const stoneMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x171d1e,
        roughness: 0.9
    });

const gateMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x15191b,
        roughness: 0.65,
        metalness: 0.65
    });

const goldMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xb79545,
        roughness: 0.4,
        metalness: 0.75,
        emissive: 0x33220b,
        emissiveIntensity: 0.3
    });


/* ---------------------------------------------------------
   TOWERS
--------------------------------------------------------- */

function createTower(x) {

    const tower =
        new THREE.Group();

    tower.position.set(
        x,
        0,
        0
    );


    /* MAIN BODY */

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

    body.position.y = 5.5;

    body.castShadow = true;

    tower.add(body);


    /* LOWER STONE BASE */

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

    base.position.y = 0.9;

    base.castShadow = true;

    tower.add(base);


    /* ROOF */

    const roofGeometry =
        new THREE.ConeGeometry(
            4.7,
            5,
            4
        );

    const roofMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x09100f,
            roughness: 1
        });

    const roof =
        new THREE.Mesh(
            roofGeometry,
            roofMaterial
        );

    roof.rotation.y =
        Math.PI / 4;

    roof.position.y = 13.5;

    roof.castShadow = true;

    tower.add(roof);


    /* GOLD EDGE */

    const edgeGeometry =
        new THREE.BoxGeometry(
            6.8,
            0.16,
            0.18
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

    tower.add(edge);


    entrance.add(tower);
}

createTower(-9);
createTower(9);


/* ---------------------------------------------------------
   MAIN DOUBLE GATE
--------------------------------------------------------- */

const gateHeight = 7.5;
const gateWidth = 5.7;


/* LEFT GATE */

const leftGate =
    new THREE.Group();

leftGate.position.set(
    -5.8,
    1.8,
    -3.7
);

entrance.add(leftGate);


/* RIGHT GATE */

const rightGate =
    new THREE.Group();

rightGate.position.set(
    5.8,
    1.8,
    -3.7
);

entrance.add(rightGate);


/* ---------------------------------------------------------
   GATE PANEL
--------------------------------------------------------- */

function createGatePanel(
    group,
    direction
) {

    const panelGeometry =
        new THREE.BoxGeometry(
            gateWidth,
            gateHeight,
            0.35
        );

    const panel =
        new THREE.Mesh(
            panelGeometry,
            gateMaterial
        );

    /*
       Move panel so its outer edge
       stays at the hinge.
    */

    panel.position.x =
        direction * (gateWidth / 2);

    panel.castShadow = true;

    group.add(panel);


    /* HORIZONTAL BARS */

    for (
        let y = -2.8;
        y <= 2.8;
        y += 1.4
    ) {

        const barGeometry =
            new THREE.BoxGeometry(
                gateWidth,
                0.18,
                0.45
            );

        const bar =
            new THREE.Mesh(
                barGeometry,
                goldMaterial
            );

        bar.position.set(
            direction * (gateWidth / 2),
            y,
            -0.22
        );

        group.add(bar);
    }


    /* VERTICAL BARS */

    for (
        let x = -2.2;
        x <= 2.2;
        x += 1.1
    ) {

        const barGeometry =
            new THREE.BoxGeometry(
                0.18,
                gateHeight,
                0.45
            );

        const bar =
            new THREE.Mesh(
                barGeometry,
                goldMaterial
            );

        bar.position.set(
            direction * (gateWidth / 2) + x,
            0,
            -0.22
        );

        group.add(bar);
    }


    /* CENTER DECORATION */

    const circleGeometry =
        new THREE.TorusGeometry(
            0.65,
            0.12,
            12,
            24
        );

    const circle =
        new THREE.Mesh(
            circleGeometry,
            goldMaterial
        );

    circle.position.set(
        direction * (gateWidth / 2),
        0,
        -0.28
    );

    circle.rotation.x =
        Math.PI / 2;

    group.add(circle);
}

createGatePanel(
    leftGate,
    1
);

createGatePanel(
    rightGate,
    -1
);


/* ---------------------------------------------------------
   CENTER GATE POST
--------------------------------------------------------- */

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

entrance.add(centerPost);


/* ---------------------------------------------------------
   GATE TOP
--------------------------------------------------------- */

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

entrance.add(gateTop);


/* ---------------------------------------------------------
   SIGN
--------------------------------------------------------- */

function createSignTexture() {

    const canvas =
        document.createElement("canvas");

    canvas.width = 1000;
    canvas.height = 300;

    const ctx =
        canvas.getContext("2d");


    /* BACKGROUND */

    ctx.fillStyle =
        "#111513";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /* BORDER */

    ctx.strokeStyle =
        "#c9a85a";

    ctx.lineWidth = 8;

    ctx.strokeRect(
        15,
        15,
        canvas.width - 30,
        canvas.height - 30
    );


    /* TITLE */

    ctx.textAlign = "center";

    ctx.fillStyle =
        "#e2c878";

    ctx.font =
        "bold 75px Georgia";

    ctx.fillText(
        "CTRL + Z",
        500,
        105
    );


    /* SECOND LINE */

    ctx.font =
        "bold 58px Georgia";

    ctx.fillText(
        "CEMETERY",
        500,
        175
    );


    /* SMALL LINE */

    ctx.fillStyle =
        "#9e9681";

    ctx.font =
        "24px Georgia";

    ctx.fillText(
        "WHERE FORGOTTEN FILES COME TO REST",
        500,
        235
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
        emissive: 0x6d5420,
        emissiveIntensity: 0.35
    });


const signGeometry =
    new THREE.BoxGeometry(
        10,
        3,
        0.35
    );


const sign =
    new THREE.Mesh(
        signGeometry,
        signMaterial
    );


/*
   IMPORTANT:
   Sign is directly ABOVE the gate
   and slightly toward the camera.
*/

sign.position.set(
    0,
    13.2,
    -4.0
);

entrance.add(sign);


/* ---------------------------------------------------------
   ENTRANCE YELLOW LIGHTS
--------------------------------------------------------- */

function createEntranceLight(
    x,
    z
) {

    /* Lamp body */

    const lampGeometry =
        new THREE.SphereGeometry(
            0.38,
            16,
            16
        );

    const lampMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xffc24b,
            emissive: 0xff9f18,
            emissiveIntensity: 2
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

    entrance.add(lamp);


    /* Light */

    const light =
        new THREE.PointLight(
            0xffb52f,
            3.2,
            20
        );

    light.position.set(
        x,
        3.4,
        z
    );

    entrance.add(light);

    return light;
}


/*
   These are deliberately OUTSIDE
   and in front of the gate.
*/

const entranceLights = [

    createEntranceLight(
        -13,
        -7
    ),

    createEntranceLight(
        13,
        -7
    ),

    createEntranceLight(
        -7,
        -6
    ),

    createEntranceLight(
        7,
        -6
    )

];


/* ---------------------------------------------------------
   SMALL TORCH POSTS
--------------------------------------------------------- */

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
            color: 0x171514,
            roughness: 0.8
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

    entrance.add(post);


    const flameGeometry =
        new THREE.SphereGeometry(
            0.25,
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
        2.6,
        z
    );

    entrance.add(flame);
}


/*
   Outside the gate
*/

createTorch(-13, -7);
createTorch(13, -7);


/* ---------------------------------------------------------
   TOMBSTONES
--------------------------------------------------------- */

const tombs = [];

let graveCount = 28;


/*
   IMPORTANT FIX:

   Tombs now start at Z = 60.

   Gate = Z 28

   So there is a large empty
   entrance zone between gate
   and tombs.
*/

function getInsidePosition() {

    let x;
    let z;

    do {

        x =
            (Math.random() - 0.5) * 52;

        z =
            60 +
            Math.random() * 45;

    } while (
        Math.abs(x) < 7 &&
        z < 76
    );

    return {
        x,
        z
    };
}


/* ---------------------------------------------------------
   TOMBSTONE CREATION
--------------------------------------------------------- */

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
        isNew ? -1.5 : 0,
        position.z
    );


    /* --------------------------------------------------
       STONE
    -------------------------------------------------- */

    const stoneWidth =
        2.2 +
        Math.random() * 0.8;

    const stoneHeight =
        2.7 +
        Math.random() * 1.1;

    const stoneDepth =
        0.65;


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
                    ? 0x202631
                    : 0x171e21,

            roughness: 0.82,

            metalness: 0.08,

            emissive:
                isNew
                    ? 0x251535
                    : 0x090c0d,

            emissiveIntensity:
                isNew
                    ? 0.5
                    : 0.12
        });


    const stone =
        new THREE.Mesh(
            stoneGeometry,
            stoneMaterial
        );


    stone.position.y =
        stoneHeight / 2;

    stone.castShadow = true;

    tomb.add(stone);


    /* --------------------------------------------------
       ROUNDED TOP
    -------------------------------------------------- */

    const topGeometry =
        new THREE.CylinderGeometry(
            stoneWidth / 2,
            stoneWidth / 2,
            stoneDepth,
            24,
            1,
            false,
            0,
            Math.PI
        );


    const top =
        new THREE.Mesh(
            topGeometry,
            stoneMaterial
        );


    top.rotation.z =
        Math.PI / 2;

    top.rotation.y =
        Math.PI / 2;

    top.position.set(
        0,
        stoneHeight,
        0
    );

    tomb.add(top);


    /* --------------------------------------------------
       CROSS
    -------------------------------------------------- */

    const crossMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x69747a,

            roughness: 0.65,

            emissive: 0x1c2730,

            emissiveIntensity: 0.3
        });


    const verticalGeometry =
        new THREE.BoxGeometry(
            0.28,
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
        stoneHeight + 1.0,
        -0.05
    );

    tomb.add(vertical);


    const horizontalGeometry =
        new THREE.BoxGeometry(
            0.95,
            0.28,
            0.22
        );

    const horizontal =
        new THREE.Mesh(
            horizontalGeometry,
            crossMaterial
        );

    horizontal.position.set(
        0,
        stoneHeight + 1.2,
        -0.05
    );

    tomb.add(horizontal);


    /* --------------------------------------------------
       SUBTLE PURPLE GLOW
    -------------------------------------------------- */

    const tombLight =
        new THREE.PointLight(
            0x7c45a2,
            isNew ? 1.5 : 0.45,
            7
        );

    tombLight.position.set(
        0,
        stoneHeight * 0.7,
        0
    );

    tomb.add(tombLight);


    /* --------------------------------------------------
       USER DATA
    -------------------------------------------------- */

    tomb.userData.isTomb =
        true;

    tomb.userData.fileName =
        fileName;

    tomb.userData.roses = 0;

    tomb.userData.comments = [];

    tomb.userData.emerging =
        isNew;


    tombs.push(tomb);

    scene.add(tomb);


    /* --------------------------------------------------
       NEW TOMB EMERGENCE
    -------------------------------------------------- */

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


/* ---------------------------------------------------------
   INITIAL TOMBS
--------------------------------------------------------- */

for (
    let i = 0;
    i < graveCount;
    i++
) {

    createTomb(
        "forgotten_file_" +
        String(i + 1).padStart(2, "0") +
        ".dat"
    );
}


/* ---------------------------------------------------------
   GATE ANIMATION
--------------------------------------------------------- */

let gateProgress = 0;


/*
   Gate starts CLOSED.

   As camera approaches:

       OUTSIDE
          ↓
       gate closes
          ↓
       approach
          ↓
       gate opens outward
*/

function updateGate() {

    const distance =
        Math.abs(
            camera.position.z - 28
        );


    let target = 0;


    /*
       More gradual opening.
    */

    if (distance > 38) {

        target = 0;

    } else if (distance > 10) {

        target =
            1 -
            (
                (distance - 10) /
                28
            );

    } else {

        target = 1;
    }


    gateProgress +=
        (
            target -
            gateProgress
        ) * 0.08;


    const eased =
        gateProgress *
        gateProgress *
        (3 - 2 * gateProgress);


    /*
       OUTWARD OPENING

       Left → outward left
       Right → outward right
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


/* ---------------------------------------------------------
   CAMERA LOOK
--------------------------------------------------------- */

let yaw = 0;

let pitch = -0.03;

let dragging = false;

let previousMouseX = 0;

let previousMouseY = 0;


renderer.domElement.addEventListener(
    "pointerdown",
    function (event) {

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
    function (event) {

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
    function () {

        dragging = false;

    }
);


/* ---------------------------------------------------------
   CAMERA MOVEMENT
--------------------------------------------------------- */

renderer.domElement.addEventListener(
    "wheel",
    function (event) {

        /*
           Scroll DOWN = move forward.

           Forward direction is
           toward negative Z.
        */

        const forwardX =
            Math.sin(yaw);

        const forwardZ =
            -Math.cos(yaw);


        const speed =
            event.deltaY > 0
                ? 2.0
                : -2.0;


        camera.position.x +=
            forwardX * speed;


        camera.position.z +=
            forwardZ * speed;


        /*
           Keep camera inside world.
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
                -20,
                Math.min(
                    85,
                    camera.position.z
                )
            );


        /*
           Welcome text fades
           as player approaches.
        */

        if (
            camera.position.z < 65
        ) {

            document.getElementById(
                "welcome"
            ).style.opacity = "0";

        } else {

            document.getElementById(
                "welcome"
            ).style.opacity = "1";
        }

    },
    {
        passive: true
    }
);


/* ---------------------------------------------------------
   LOOK DIRECTION
--------------------------------------------------------- */

function updateCameraLook() {

    const target =
        new THREE.Vector3();

    target.x =
        camera.position.x +
        Math.sin(yaw) * 20;

    target.y =
        camera.position.y +
        Math.sin(pitch) * 20;

    target.z =
        camera.position.z -
        Math.cos(yaw) * 20;


    camera.lookAt(target);
}


/* ---------------------------------------------------------
   TOMBSTONE CLICK
--------------------------------------------------------- */

const raycaster =
    new THREE.Raycaster();

const mouse =
    new THREE.Vector2();


renderer.domElement.addEventListener(
    "click",
    function (event) {

        mouse.x =
            (event.clientX /
                window.innerWidth) *
                2 -
            1;

        mouse.y =
            -(event.clientY /
                window.innerHeight) *
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


/* ---------------------------------------------------------
   MEMORIAL
--------------------------------------------------------- */

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


/* ---------------------------------------------------------
   CLOSE MEMORIAL
--------------------------------------------------------- */

document.getElementById(
    "closeMemorial"
).addEventListener(
    "click",
    function () {

        document.getElementById(
            "memorialPanel"
        ).classList.remove(
            "show"
        );

    }
);


/* ---------------------------------------------------------
   VISITOR PANEL
--------------------------------------------------------- */

const visitorPanel =
    document.getElementById(
        "visitorPanel"
    );


document.getElementById(
    "openVisitorPanel"
).addEventListener(
    "click",
    function () {

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


    visitorPanel.classList.add(
        "show"
    );
}


/* ---------------------------------------------------------
   CLOSE VISITOR PANEL
--------------------------------------------------------- */

document.getElementById(
    "closeVisitorPanel"
).addEventListener(
    "click",
    function () {

        visitorPanel.classList.remove(
            "show"
        );

    }
);


/* ---------------------------------------------------------
   VISITOR BUTTON
--------------------------------------------------------- */

document.getElementById(
    "visitorButton"
).addEventListener(
    "click",
    function () {

        if (!selectedTomb) {

            if (tombs.length > 0) {

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


/* ---------------------------------------------------------
   ROSES
--------------------------------------------------------- */

document.getElementById(
    "roseButton"
).addEventListener(
    "click",
    function () {

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


/* ---------------------------------------------------------
   COMMENTS
--------------------------------------------------------- */

document.getElementById(
    "commentButton"
).addEventListener(
    "click",
    function () {

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


/* ---------------------------------------------------------
   RENDER COMMENTS
--------------------------------------------------------- */

function renderComments(tomb) {

    const container =
        document.getElementById(
            "comments"
        );


    container.innerHTML = "";


    tomb.userData.comments.forEach(
        function (comment) {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "comment";


            div.textContent =
                "🌹 " + comment;


            container.appendChild(
                div
            );

        }
    );
}


/* ---------------------------------------------------------
   LOCAL STORAGE
--------------------------------------------------------- */

function saveTombData() {

    const data =
        tombs.map(
            function (tomb) {

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


/* ---------------------------------------------------------
   FILE BURIAL
--------------------------------------------------------- */

const fileInput =
    document.getElementById(
        "fileInput"
    );


fileInput.addEventListener(
    "change",
    function () {

        const files =
            Array.from(
                fileInput.files
            );


        if (
            files.length === 0
        )
            return;


        files.forEach(
            function (file, index) {

                setTimeout(
                    function () {

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


/* ---------------------------------------------------------
   BURY FILE
--------------------------------------------------------- */

function buryFile(file) {

    graveCount++;


    document.getElementById(
        "graveCount"
    ).textContent =
        graveCount;


    /* CREATE NEW TOMB */

    createTomb(
        file.name,
        true
    );


    /* LIGHTNING */

    triggerLightning();


    /* POPUP */

    showBurialPopup(
        file.name
    );


    saveTombData();
}


/* ---------------------------------------------------------
   LIGHTNING
--------------------------------------------------------- */

function triggerLightning() {

    const flash =
        document.getElementById(
            "lightningFlash"
        );


    flash.classList.remove(
        "flash"
    );


    /*
       Force browser to restart
       the animation.
    */

    void flash.offsetWidth;


    flash.classList.add(
        "flash"
    );


    const originalAmbient =
        ambientLight.intensity;


    const originalMoon =
        moonDirectional.intensity;


    ambientLight.intensity =
        2.8;


    moonDirectional.intensity =
        1.5;


    setTimeout(
        function () {

            ambientLight.intensity =
                originalAmbient;

            moonDirectional.intensity =
                originalMoon;

        },
        500
    );
}


/* ---------------------------------------------------------
   BURIAL POPUP
--------------------------------------------------------- */

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
            function () {

                popup.classList.remove(
                    "show"
                );

            },
            3300
        );
}


/* ---------------------------------------------------------
   NEW TOMB ANIMATION
--------------------------------------------------------- */

function updateEmergingTombs() {

    const now =
        performance.now();


    tombs.forEach(
        function (tomb) {

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
                    elapsed / duration,
                    1
                );


            /*
               Smooth cubic easing
            */

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


            /*
               Rise from ground
            */

            tomb.position.y =
                -1.5 +
                eased * 1.5;


            if (
                tomb.userData.light
            ) {

                tomb.userData.light.intensity =
                    1.5 *
                    (1 - progress) +
                    0.45;
            }


            if (
                progress >= 1
            ) {

                tomb.userData.emerging =
                    false;

                tomb.position.y = 0;

                tomb.scale.set(
                    1,
                    1,
                    1
                );

            }

        }
    );
}


/* ---------------------------------------------------------
   FIRELIGHT FLICKER
--------------------------------------------------------- */

function animateLights() {

    const time =
        performance.now() *
        0.006;


    entranceLights.forEach(
        function (light, index) {

            light.intensity =
                2.7 +
                Math.sin(
                    time +
                    index * 2
                ) *
                0.45 +
                Math.random() *
                0.15;

        }
    );
}


/* ---------------------------------------------------------
   ESCAPE HTML
--------------------------------------------------------- */

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


/* ---------------------------------------------------------
   RESIZE
--------------------------------------------------------- */

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


/* ---------------------------------------------------------
   ANIMATION LOOP
--------------------------------------------------------- */

function animate() {

    requestAnimationFrame(
        animate
    );


    updateGate();

    updateCameraLook();

    updateEmergingTombs();

    animateLights();


    renderer.render(
        scene,
        camera
    );
}


animate();
