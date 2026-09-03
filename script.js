/* =========================================================
   CTRL + Z DIGITAL CEMETERY
   ========================================================= */

const sceneContainer = document.getElementById("scene");

/* ---------------------------------------------------------
   SCENE
--------------------------------------------------------- */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x020405);

scene.fog = new THREE.FogExp2(
    0x07110d,
    0.009
);


/* ---------------------------------------------------------
   CAMERA
--------------------------------------------------------- */

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


/* ---------------------------------------------------------
   RENDERER
--------------------------------------------------------- */

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


animate();if (typeof THREE === "undefined") {

    document.body.innerHTML = `
        <div style="
            color:white;
            padding:40px;
            font-family:Arial;
            background:#030407;
        ">
            Three.js failed to load.
        </div>
    `;

    throw new Error("Three.js not loaded");
}



const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0x020405);

scene.fog =
    new THREE.FogExp2(
        0x07110d,
        0.012
    );


/* =========================================================
   CAMERA
========================================================= */

const camera =
    new THREE.PerspectiveCamera(
        65,
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

renderer.shadowMap.enabled =
    true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

document
    .getElementById("scene")
    .appendChild(renderer.domElement);


/* =========================================================
   SPOOKY AMBIENT LIGHT
========================================================= */

/*
    Greenish purple lighting
    throughout the cemetery.
*/

const ambient =
    new THREE.AmbientLight(
        0x574c7d,
        0.65
    );

scene.add(ambient);


/* Purple light */

const purpleLight =
    new THREE.PointLight(
        0x783d9b,
        2.2,
        90
    );

purpleLight.position.set(
    -30,
    10,
    65
);

scene.add(purpleLight);


/* Green light */

const greenLight =
    new THREE.PointLight(
        0x356b54,
        2.4,
        100
    );

greenLight.position.set(
    30,
    7,
    75
);

scene.add(greenLight);


/* =========================================================
   MOON
========================================================= */

const moon =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            7,
            32,
            32
        ),
        new THREE.MeshBasicMaterial({
            color: 0xdad8e9
        })
    );

moon.position.set(
    -35,
    46,
    0
);

scene.add(moon);


const moonGlow =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            10,
            32,
            32
        ),
        new THREE.MeshBasicMaterial({
            color: 0x6d68a0,
            transparent: true,
            opacity: 0.09
        })
    );

moonGlow.position.copy(
    moon.position
);

scene.add(moonGlow);


/* =========================================================
   MOON LIGHT
========================================================= */

const moonLight =
    new THREE.DirectionalLight(
        0x9e9bff,
        1.1
    );

moonLight.position.set(
    -30,
    50,
    10
);

moonLight.castShadow =
    true;

moonLight.shadow.mapSize.width =
    2048;

moonLight.shadow.mapSize.height =
    2048;

scene.add(moonLight);


/* =========================================================
   STARS
========================================================= */

const starGeometry =
    new THREE.BufferGeometry();

const starPositions = [];

for (
    let i = 0;
    i < 1200;
    i++
) {

    starPositions.push(
        (Math.random() - 0.5) * 220,
        30 + Math.random() * 90,
        (Math.random() - 0.5) * 180
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
        color: 0xb8c2db,
        size: 0.22,
        transparent: true,
        opacity: 0.8
    });

const stars =
    new THREE.Points(
        starGeometry,
        starMaterial
    );

scene.add(stars);


/* =========================================================
   GROUND
========================================================= */

const ground =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            180,
            180
        ),
        new THREE.MeshStandardMaterial({
            color: 0x070d0a,
            roughness: 1
        })
    );

ground.rotation.x =
    -Math.PI / 2;

ground.receiveShadow =
    true;

scene.add(ground);


/* =========================================================
   PATH
========================================================= */

const path =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            9,
            130
        ),
        new THREE.MeshStandardMaterial({
            color: 0x241934,
            roughness: 0.95
        })
    );

path.rotation.x =
    -Math.PI / 2;

path.position.set(
    0,
    0.02,
    45
);

scene.add(path);


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

scene.add(entrance);


/* =========================================================
   MATERIALS
========================================================= */

const stone =
    new THREE.MeshStandardMaterial({
        color: 0x181a1b,
        roughness: 0.88
    });

const darkStone =
    new THREE.MeshStandardMaterial({
        color: 0x0b0d0e,
        roughness: 0.95
    });

const gold =
    new THREE.MeshStandardMaterial({
        color: 0xb89646,
        metalness: 0.65,
        roughness: 0.35
    });

const roof =
    new THREE.MeshStandardMaterial({
        color: 0x070809,
        roughness: 1
    });


/* =========================================================
   TOWER
========================================================= */

function createTower(x) {

    const tower =
        new THREE.Group();

    tower.position.x =
        x;


    /* body */

    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                6,
                15,
                6
            ),
            stone
        );

    body.position.y =
        7.5;

    body.castShadow =
        true;

    body.receiveShadow =
        true;

    tower.add(body);


    /* roof */

    const roofMesh =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                4.5,
                5,
                4
            ),
            roof
        );

    roofMesh.position.y =
        17;

    roofMesh.rotation.y =
        Math.PI / 4;

    roofMesh.castShadow =
        true;

    tower.add(roofMesh);


    /* gold trim */

    const trim =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                6.3,
                0.25,
                6.3
            ),
            gold
        );

    trim.position.y =
        14.5;

    tower.add(trim);


    /* window */

    const windowMesh =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.3,
                2.7,
                0.12
            ),
            new THREE.MeshBasicMaterial({
                color: 0x806bc0
            })
        );

    windowMesh.position.set(
        0,
        9,
        3.05
    );

    tower.add(windowMesh);


    entrance.add(tower);
}

createTower(-9);
createTower(9);


/* =========================================================
   MAIN WALL
========================================================= */

const wall =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            18,
            7,
            2
        ),
        darkStone
    );

wall.position.set(
    0,
    3.5,
    0
);

wall.castShadow =
    true;

entrance.add(wall);


/* =========================================================
   TOP ARCH
========================================================= */

const arch =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            8,
            3,
            2.3
        ),
        stone
    );

arch.position.set(
    0,
    8.5,
    0
);

entrance.add(arch);


/* =========================================================
   GATE
========================================================= */

const leftGate =
    new THREE.Group();

const rightGate =
    new THREE.Group();


/*
    IMPORTANT:

    These are the hinge positions.

    LEFT:
    outer left edge

    RIGHT:
    outer right edge
*/

leftGate.position.set(
    -5.7,
    4.2,
    -1.3
);

rightGate.position.set(
    5.7,
    4.2,
    -1.3
);


/* =========================================================
   LEFT DOOR
========================================================= */

const leftDoor =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            5.7,
            5.8,
            0.35
        ),
        darkStone
    );

leftDoor.position.x =
    2.85;

leftDoor.castShadow =
    true;

leftGate.add(leftDoor);


/* =========================================================
   RIGHT DOOR
========================================================= */

const rightDoor =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            5.7,
            5.8,
            0.35
        ),
        darkStone
    );

rightDoor.position.x =
    -2.85;

rightDoor.castShadow =
    true;

rightGate.add(rightDoor);


/* =========================================================
   GATE GOLD BARS
========================================================= */

function gateBars(
    gate,
    direction
) {

    for (
        let i = 0;
        i < 5;
        i++
    ) {

        const bar =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.13,
                    5.1,
                    0.18
                ),
                gold
            );

        bar.position.x =
            direction *
            (
                0.7 +
                i * 1.05
            );

        gate.add(bar);
    }


    const horizontal =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                5.2,
                0.13,
                0.2
            ),
            gold
        );

    gate.add(horizontal);
}

gateBars(
    leftGate,
    1
);

gateBars(
    rightGate,
    -1
);


/* =========================================================
   CENTER LOCK
========================================================= */

const centerPost =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            0.35,
            6.3,
            0.45
        ),
        gold
    );

centerPost.position.set(
    0,
    4.2,
    -1.3
);

entrance.add(centerPost);

entrance.add(leftGate);
entrance.add(rightGate);


/* =========================================================
   CANDLES / TORCHES OUTSIDE GATE
========================================================= */

const torchLights = [];


/*
    These are intentionally placed
    OUTSIDE the gate.
*/

function createTorch(
    x,
    z
) {

    /* wooden/metal stand */

    const stand =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.12,
                0.16,
                2,
                8
            ),
            darkStone
        );

    stand.position.set(
        x,
        1,
        z
    );

    entrance.add(stand);


    /* flame */

    const flame =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.28,
                12,
                12
            ),
            new THREE.MeshBasicMaterial({
                color: 0xffb43d
            })
        );

    flame.position.set(
        x,
        2.25,
        z
    );

    entrance.add(flame);


    /* yellow light */

    const light =
        new THREE.PointLight(
            0xffb43d,
            3,
            13
        );

    light.position.set(
        x,
        2.2,
        z
    );

    entrance.add(light);

    torchLights.push(light);
}


/*
    Clearly outside entrance
*/

createTorch(-12, 3);
createTorch(12, 3);

createTorch(-7, 3);
createTorch(7, 3);


/* =========================================================
   CEMETERY SIGN
========================================================= */

function createSign() {

    const canvas =
        document.createElement(
            "canvas"
        );

    canvas.width = 1000;
    canvas.height = 260;

    const ctx =
        canvas.getContext("2d");


    ctx.fillStyle =
        "#08090a";

    ctx.fillRect(
        0,
        0,
        1000,
        260
    );


    ctx.strokeStyle =
        "#b9954c";

    ctx.lineWidth =
        7;

    ctx.strokeRect(
        12,
        12,
        976,
        236
    );


    ctx.textAlign =
        "center";


    ctx.fillStyle =
        "#d7b96d";

    ctx.font =
        "bold 64px Georgia";

    ctx.fillText(
        "CTRL + Z",
        500,
        105
    );


    ctx.font =
        "bold 43px Georgia";

    ctx.fillText(
        "CEMETERY",
        500,
        170
    );


    ctx.font =
        "20px Georgia";

    ctx.fillStyle =
        "#817760";

    ctx.fillText(
        "WHERE FORGOTTEN FILES COME TO REST",
        500,
        215
    );


    return new THREE.CanvasTexture(
        canvas
    );
}


const sign =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            10,
            2.6
        ),
        new THREE.MeshBasicMaterial({
            map: createSign()
        })
    );

sign.position.set(
    0,
    10.8,
    -1.25
);

entrance.add(sign);


/* =========================================================
   TOMBS
========================================================= */

const tombs = [];

let selectedTomb = null;


/*
    GATE = Z 28

    TOMBS = Z 38 TO 93

    Therefore all tombs are
    INSIDE the cemetery.
*/

function getInsidePosition() {

    let x;
    let z;

    do {

        x =
            (Math.random() - 0.5) *
            56;

        z =
            39 +
            Math.random() * 52;

        /*
            Keep center path clear.
        */

    } while (
        Math.abs(x) < 6 &&
        z < 75
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
    name,
    size,
    type,
    isNew = false
) {

    const group =
        new THREE.Group();


    /* =====================================================
       TOMBSTONE SHAPE
    ===================================================== */

    const shape =
        new THREE.Shape();

    shape.moveTo(
        -2,
        0
    );

    shape.lineTo(
        2,
        0
    );

    shape.lineTo(
        2,
        3.4
    );

    shape.quadraticCurveTo(
        2,
        4.5,
        0,
        4.5
    );

    shape.quadraticCurveTo(
        -2,
        4.5,
        -2,
        3.4
    );

    shape.lineTo(
        -2,
        0
    );


    const geometry =
        new THREE.ExtrudeGeometry(
            shape,
            {
                depth: 0.7,

                bevelEnabled: true,

                bevelSegments: 3,

                bevelSize: 0.12,

                bevelThickness: 0.12
            }
        );


    /*
        Slight greenish-purple
        tomb material.
    */

    const material =
        new THREE.MeshStandardMaterial({

            color:
                isNew
                    ? 0x3d3150
                    : 0x20252a,

            roughness: 0.75,

            metalness: 0.05,

            emissive:
                isNew
                    ? 0x28143d
                    : 0x10151b,

            emissiveIntensity:
                isNew
                    ? 0.45
                    : 0.15
        });


    const tomb =
        new THREE.Mesh(
            geometry,
            material
        );

    tomb.rotation.y =
        Math.PI;

    tomb.castShadow =
        true;

    tomb.receiveShadow =
        true;

    group.add(tomb);


    /* =====================================================
       CROSS
    ===================================================== */

    const crossMaterial =
        new THREE.MeshStandardMaterial({

            color:
                isNew
                    ? 0x8f72b9
                    : 0x656c69,

            emissive:
                isNew
                    ? 0x3c2259
                    : 0x101313,

            emissiveIntensity:
                0.5
        });


    const crossVertical =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.35,
                1.8,
                0.2
            ),
            crossMaterial
        );

    crossVertical.position.set(
        0,
        4.9,
        0
    );

    group.add(
        crossVertical
    );


    const crossHorizontal =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.15,
                0.35,
                0.2
            ),
            crossMaterial
        );

    crossHorizontal.position.set(
        0,
        5.15,
        0
    );

    group.add(
        crossHorizontal
    );


    /* =====================================================
       LABEL
    ===================================================== */

    const canvas =
        document.createElement(
            "canvas"
        );

    canvas.width = 512;
    canvas.height = 160;

    const ctx =
        canvas.getContext(
            "2d"
        );


    ctx.fillStyle =
        "#111418";

    ctx.fillRect(
        0,
        0,
        512,
        160
    );


    ctx.textAlign =
        "center";


    ctx.fillStyle =
        isNew
            ? "#d6bf76"
            : "#999d96";

    ctx.font =
        "bold 27px Georgia";


    let shortName =
        name.length > 22
            ? name.substring(
                0,
                22
            ) + "..."
            : name;


    ctx.fillText(
        shortName,
        256,
        82
    );


    const texture =
        new THREE.CanvasTexture(
            canvas
        );


    const label =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                2.7,
                0.85
            ),
            new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true
            })
        );

    label.position.set(
        0,
        2.2,
        0.45
    );

    label.rotation.y =
        Math.PI;

    group.add(label);


    /* =====================================================
       POSITION INSIDE GATE
    ===================================================== */

    const position =
        getInsidePosition();


    group.position.set(
        position.x,
        0,
        position.z
    );


    /* =====================================================
       NEW TOMB GLOW
    ===================================================== */

    if (isNew) {

        group.scale.set(
            0.05,
            0.05,
            0.05
        );

        group.position.y =
            -1.2;

        group.userData.emerging =
            true;

        group.userData.startTime =
            performance.now();


        const glow =
            new THREE.PointLight(
                0x9b5bd6,
                3,
                9
            );

        glow.position.y =
            3;

        group.add(
            glow
        );

        group.userData.glow =
            glow;
    }


    group.userData.fileName =
        name;

    group.userData.fileSize =
        size;

    group.userData.fileType =
        type;

    group.userData.isTomb =
        true;


    scene.add(
        group
    );

    tombs.push(
        group
    );


    updateCounter();


    return group;
}


/* =========================================================
   OLD TOMBS
========================================================= */

for (
    let i = 0;
    i < 28;
    i++
) {

    createTomb(
        "Forgotten File " +
        (i + 1),

        Math.floor(
            Math.random() * 9000
        ) + " KB",

        "Digital memory",

        false
    );
}


/* =========================================================
   COUNTER
========================================================= */

function updateCounter() {

    document.getElementById(
        "graveCount"
    ).textContent =
        tombs.length;
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
    function(event) {

        const files =
            Array.from(
                event.target.files
            );


        if (!files.length) {
            return;
        }


        files.forEach(
            (
                file,
                index
            ) => {

                setTimeout(
                    () => {

                        buryFile(
                            file
                        );

                    },
                    index * 650
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

function buryFile(file) {

    createTomb(
        file.name,
        formatSize(
            file.size
        ),
        file.type ||
            "Unknown file",
        true
    );


    /*
        Lightning in the sky.
    */

    triggerLightning();


    /*
        Popup.
    */

    showBurialPopup(
        file.name
    );


    /*
        Hide welcome text.
    */

    document.getElementById(
        "welcome"
    ).style.opacity =
        "0";
}


/* =========================================================
   LIGHTNING
========================================================= */

function triggerLightning() {

    const flash =
        document.getElementById(
            "lightningFlash"
        );


    /*
        Restart animation.
    */

    flash.classList.remove(
        "flash"
    );

    void flash.offsetWidth;

    flash.classList.add(
        "flash"
    );


    /*
        Whole cemetery briefly
        becomes brighter.
    */

    const oldAmbient =
        ambient.intensity;

    const oldMoon =
        moonLight.intensity;

    ambient.intensity =
        1.7;

    moonLight.intensity =
        3.5;


    /*
        First flash.
    */

    setTimeout(
        () => {

            ambient.intensity =
                oldAmbient;

            moonLight.intensity =
                oldMoon;

        },
        150
    );


    /*
        Second weaker flash.
    */

    setTimeout(
        () => {

            ambient.intensity =
                1.3;

            moonLight.intensity =
                2.4;

        },
        260
    );


    setTimeout(
        () => {

            ambient.intensity =
                oldAmbient;

            moonLight.intensity =
                oldMoon;

        },
        430
    );
}


/* =========================================================
   POPUP
========================================================= */

function showBurialPopup(
    filename
) {

    const popup =
        document.getElementById(
            "burialPopup"
        );

    const name =
        document.getElementById(
            "popupFileName"
        );


    name.textContent =
        filename;


    popup.classList.add(
        "show"
    );


    clearTimeout(
        window.popupTimer
    );


    window.popupTimer =
        setTimeout(
            () => {

                popup.classList.remove(
                    "show"
                );

            },
            3300
        );
}


/* =========================================================
   FORMAT SIZE
========================================================= */

function formatSize(bytes) {

    if (bytes === 0) {
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
            Math.log(bytes) /
            Math.log(1024)
        );


    return (
        parseFloat(
            (
                bytes /
                Math.pow(
                    1024,
                    index
                )
            ).toFixed(2)
        ) +
        " " +
        units[index]
    );
}


/* =========================================================
   CAMERA
========================================================= */

let yaw = 0;

let pitch = -0.05;

let dragging = false;

let previousX = 0;
let previousY = 0;


/* =========================================================
   DRAG
========================================================= */

renderer.domElement.addEventListener(
    "pointerdown",
    function(event) {

        dragging =
            true;

        previousX =
            event.clientX;

        previousY =
            event.clientY;

        renderer.domElement.setPointerCapture(
            event.pointerId
        );
    }
);


renderer.domElement.addEventListener(
    "pointerup",
    function(event) {

        dragging =
            false;

        renderer.domElement.releasePointerCapture(
            event.pointerId
        );
    }
);


renderer.domElement.addEventListener(
    "pointermove",
    function(event) {

        if (!dragging) {
            return;
        }


        const dx =
            event.clientX -
            previousX;

        const dy =
            event.clientY -
            previousY;


        yaw -=
            dx * 0.003;


        pitch -=
            dy * 0.002;


        pitch =
            Math.max(
                -0.65,
                Math.min(
                    0.5,
                    pitch
                )
            );


        previousX =
            event.clientX;

        previousY =
            event.clientY;
    }
);


/* =========================================================
   SCROLL
========================================================= */

renderer.domElement.addEventListener(
    "wheel",
    function(event) {

        event.preventDefault();


        const speed =
            event.deltaY > 0
                ? 1.8
                : -1.8;


        const x =
            Math.sin(yaw);

        const z =
            Math.cos(yaw);


        camera.position.x +=
            x * speed;

        camera.position.z +=
            z * speed;


        camera.position.x =
            THREE.MathUtils.clamp(
                camera.position.x,
                -70,
                70
            );


        camera.position.z =
            THREE.MathUtils.clamp(
                camera.position.z,
                -10,
                110
            );
    },
    {
        passive: false
    }
);


/* =========================================================
   CAMERA LOOK
========================================================= */

function updateCamera() {

    const target =
        new THREE.Vector3();


    target.x =
        camera.position.x +
        Math.sin(yaw) * 20;


    target.y =
        camera.position.y +
        Math.sin(pitch) * 20;


    target.z =
        camera.position.z +
        Math.cos(yaw) * 20;


    camera.lookAt(
        target
    );
}


/* =========================================================
   GATE OPENING
========================================================= */

let gateProgress = 0;


function updateGate() {

    /*
        Gate location = 28

        Far away:
        CLOSED

        Approaching:
        OPENING

        Near gate:
        FULLY OPEN
    */

    const distance =
        Math.abs(
            camera.position.z -
            28
        );


    let target =
        0;


    if (distance > 34) {

        target = 0;

    } else if (distance > 9) {

        target =
            1 -
            (
                (distance - 9) /
                25
            );

    } else {

        target = 1;
    }


    /*
        Smooth gate motion.
    */

    gateProgress +=
        (
            target -
            gateProgress
        ) * 0.075;


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
        LEFT:
        swings outward LEFT
    */

    leftGate.rotation.y =
        -eased *
        Math.PI *
        0.72;


    /*
        RIGHT:
        swings outward RIGHT
    */

    rightGate.rotation.y =
        eased *
        Math.PI *
        0.72;
}


/* =========================================================
   NEW TOMB EMERGING
========================================================= */

function updateEmergingTombs() {

    const now =
        performance.now();


    tombs.forEach(
        tomb => {

            if (
                !tomb.userData.emerging
            ) {
                return;
            }


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


            /*
                Smooth rise.
            */

            const ease =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            tomb.scale.set(
                ease,
                ease,
                ease
            );


            tomb.position.y =
                -1.2 +
                1.2 * ease;


            if (
                tomb.userData.glow
            ) {

                tomb.userData.glow.intensity =
                    3 *
                    (
                        1 -
                        progress
                    );
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


                if (
                    tomb.userData.glow
                ) {

                    tomb.remove(
                        tomb.userData.glow
                    );
                }
            }
        }
    );
}


/* =========================================================
   TOMB CLICK
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


        tombs.forEach(
            tomb => {

                tomb.traverse(
                    child => {

                        if (
                            child.isMesh
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
                false
            );


        if (!hits.length) {
            return;
        }


        let object =
            hits[0].object;


        while (
            object.parent &&
            !object.userData.isTomb
        ) {

            object =
                object.parent;
        }


        if (
            object.userData.isTomb
        ) {

            openMemorial(
                object
            );
        }
    }
);


/* =========================================================
   MEMORIAL
========================================================= */

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
            🪦
            ${escapeHTML(
                tomb.userData.fileName
            )}
        </h2>

        <p>
            <strong>Size:</strong>
            ${escapeHTML(
                tomb.userData.fileSize
            )}
        </p>

        <p>
            <strong>Type:</strong>
            ${escapeHTML(
                tomb.userData.fileType
            )}
        </p>

        <p>
            This file now rests peacefully
            inside the CTRL + Z Cemetery.
        </p>
    `;


    panel.classList.add(
        "show"
    );
}


/* =========================================================
   CLOSE MEMORIAL
========================================================= */

document
    .getElementById(
        "closeMemorial"
    )
    .addEventListener(
        "click",
        function() {

            document
                .getElementById(
                    "memorialPanel"
                )
                .classList.remove(
                    "show"
                );
        }
    );


/* =========================================================
   VISITORS
========================================================= */

const visitorPanel =
    document.getElementById(
        "visitorPanel"
    );


document
    .getElementById(
        "openVisitorPanel"
    )
    .addEventListener(
        "click",
        function() {

            if (!selectedTomb) {
                return;
            }


            document.getElementById(
                "selectedTombName"
            ).textContent =
                selectedTomb.userData.fileName;


            loadVisitors();


            visitorPanel.classList.add(
                "show"
            );
        }
    );


document
    .getElementById(
        "closeVisitorPanel"
    )
    .addEventListener(
        "click",
        function() {

            visitorPanel.classList.remove(
                "show"
            );
        }
    );


document
    .getElementById(
        "visitorButton"
    )
    .addEventListener(
        "click",
        function() {

            if (!selectedTomb) {
                return;
            }


            document.getElementById(
                "selectedTombName"
            ).textContent =
                selectedTomb.userData.fileName;


            loadVisitors();


            visitorPanel.classList.add(
                "show"
            );
        }
    );


/* =========================================================
   LOCAL STORAGE
========================================================= */

function visitorKey() {

    return (
        "cemetery_" +
        selectedTomb
            .userData
            .fileName
    );
}


function loadVisitors() {

    if (!selectedTomb) {
        return;
    }


    const data =
        JSON.parse(
            localStorage.getItem(
                visitorKey()
            ) ||
            '{"roses":0,"comments":[]}'
        );


    document.getElementById(
        "roseCount"
    ).textContent =
        data.roses;


    document.getElementById(
        "comments"
    ).innerHTML =
        data.comments
            .map(
                comment => `
                    <div class="comment">
                        ${escapeHTML(
                            comment
                        )}
                    </div>
                `
            )
            .join("");
}


/* =========================================================
   ROSE
========================================================= */

document
    .getElementById(
        "roseButton"
    )
    .addEventListener(
        "click",
        function() {

            if (!selectedTomb) {
                return;
            }


            const key =
                visitorKey();


            const data =
                JSON.parse(
                    localStorage.getItem(
                        key
                    ) ||
                    '{"roses":0,"comments":[]}'
                );


            data.roses++;


            localStorage.setItem(
                key,
                JSON.stringify(data)
            );


            loadVisitors();
        }
    );


/* =========================================================
   COMMENT
========================================================= */

document
    .getElementById(
        "commentButton"
    )
    .addEventListener(
        "click",
        function() {

            if (!selectedTomb) {
                return;
            }


            const input =
                document.getElementById(
                    "commentInput"
                );


            const text =
                input.value.trim();


            if (!text) {
                return;
            }


            const key =
                visitorKey();


            const data =
                JSON.parse(
                    localStorage.getItem(
                        key
                    ) ||
                    '{"roses":0,"comments":[]}'
                );


            data.comments.push(
                text
            );


            localStorage.setItem(
                key,
                JSON.stringify(data)
            );


            input.value =
                "";


            loadVisitors();
        }
    );


/* =========================================================
   FIRELIGHT ANIMATION
========================================================= */

function animateTorches() {

    torchLights.forEach(
        light => {

            light.intensity =
                2.4 +
                Math.random() * 1.1;
        }
    );
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

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
   ANIMATION
========================================================= */

function animate() {

    requestAnimationFrame(
        animate
    );


    updateCamera();

    updateGate();

    updateEmergingTombs();

    animateTorches();


    /*
        Slowly moving stars.
    */

    stars.rotation.y +=
        0.00008;


    /*
        Subtle spooky light movement.
    */

    purpleLight.intensity =
        2.0 +
        Math.sin(
            performance.now() *
            0.001
        ) * 0.25;


    greenLight.intensity =
        2.2 +
        Math.cos(
            performance.now() *
            0.0008
        ) * 0.2;


    renderer.render(
        scene,
        camera
    );
}


animate();


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
