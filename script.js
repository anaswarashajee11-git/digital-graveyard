if (typeof THREE === "undefined") {
    document.body.innerHTML = `
        <div style="
            color:white;
            padding:40px;
            font-family:Arial;
            background:#050509;
        ">
            Three.js could not load.
        </div>
    `;
    throw new Error("Three.js not loaded");
}



const scene = new THREE.Scene();

scene.background = new THREE.Color(0x020207);

scene.fog = new THREE.FogExp2(
    0x08060d,
    0.012
);


const camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    0.1,
    500
);

camera.position.set(
    0,
    7,
    72
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

document
    .getElementById("scene")
    .appendChild(renderer.domElement);


/* =========================================================
   LIGHTING
   ========================================================= */

const ambientLight =
    new THREE.AmbientLight(
        0x6d6488,
        0.45
    );

scene.add(ambientLight);


const moonLight =
    new THREE.DirectionalLight(
        0x9a8cff,
        1.15
    );

moonLight.position.set(
    -35,
    50,
    10
);

moonLight.castShadow = true;

moonLight.shadow.mapSize.width = 2048;
moonLight.shadow.mapSize.height = 2048;

scene.add(moonLight);


/* =========================================================
   MOON
   ========================================================= */

const moonGeometry =
    new THREE.SphereGeometry(
        7,
        32,
        32
    );

const moonMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xdcd8ff
    });

const moon =
    new THREE.Mesh(
        moonGeometry,
        moonMaterial
    );

moon.position.set(
    -34,
    45,
    0
);

scene.add(moon);


/* Moon glow */

const moonGlow =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            9,
            32,
            32
        ),
        new THREE.MeshBasicMaterial({
            color: 0x6d63a8,
            transparent: true,
            opacity: 0.09
        })
    );

moonGlow.position.copy(
    moon.position
);

scene.add(moonGlow);


/* =========================================================
   STARS
   ========================================================= */

const starGeometry =
    new THREE.BufferGeometry();

const starPositions = [];

for (let i = 0; i < 1200; i++) {

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
        color: 0xbcb6ff,
        size: 0.25,
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
            color: 0x08090c,
            roughness: 1
        })
    );

ground.rotation.x =
    -Math.PI / 2;

ground.receiveShadow = true;

scene.add(ground);


/* =========================================================
   CEMETERY PATH
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

path.position.z = 45;

path.position.y = 0.015;

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

const stoneMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x19171d,
        roughness: 0.85
    });

const darkStone =
    new THREE.MeshStandardMaterial({
        color: 0x0c0b0f,
        roughness: 0.9
    });

const goldMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xb18b3f,
        metalness: 0.7,
        roughness: 0.35
    });

const roofMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x08070b,
        roughness: 0.95
    });


/* =========================================================
   TOWERS
   ========================================================= */

function createTower(x) {

    const tower =
        new THREE.Group();

    tower.position.x = x;

    /* body */

    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                6,
                15,
                6
            ),
            stoneMaterial
        );

    body.position.y = 7.5;

    body.castShadow = true;
    body.receiveShadow = true;

    tower.add(body);


    /* roof */

    const roof =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                4.5,
                5,
                4
            ),
            roofMaterial
        );

    roof.position.y = 17;

    roof.rotation.y =
        Math.PI / 4;

    roof.castShadow = true;

    tower.add(roof);


    /* gold roof trim */

    const trim =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                6.4,
                0.25,
                6.4
            ),
            goldMaterial
        );

    trim.position.y = 14.5;

    tower.add(trim);


    /* window */

    const windowMesh =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.3,
                2.8,
                0.15
            ),
            new THREE.MeshBasicMaterial({
                color: 0x8f75d8
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

wall.castShadow = true;

entrance.add(wall);


/* =========================================================
   ARCH
   ========================================================= */

const archTop =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            8,
            3,
            2.3
        ),
        stoneMaterial
    );

archTop.position.set(
    0,
    8.5,
    0
);

entrance.add(archTop);


/* =========================================================
   DOUBLE GATE
   ========================================================= */

const leftGate =
    new THREE.Group();

const rightGate =
    new THREE.Group();


/*
    HINGES ARE ON THE OUTSIDE.

    Left hinge  = -5.7
    Right hinge = +5.7

    Doors open outward.
*/

leftGate.position.set(
    -5.7,
    4.2,
    -1.25
);

rightGate.position.set(
    5.7,
    4.2,
    -1.25
);


/* LEFT PANEL */

const leftPanel =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            5.7,
            5.8,
            0.35
        ),
        darkStone
    );

/*
    Important:
    panel is moved to the RIGHT from its hinge.
*/

leftPanel.position.x = 2.85;

leftPanel.castShadow = true;

leftGate.add(leftPanel);


/* RIGHT PANEL */

const rightPanel =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            5.7,
            5.8,
            0.35
        ),
        darkStone
    );

/*
    panel is moved LEFT from its hinge.
*/

rightPanel.position.x = -2.85;

rightPanel.castShadow = true;

rightGate.add(rightPanel);


/* =========================================================
   GOLD GATE BARS
   ========================================================= */

function addGateBars(
    gate,
    direction
) {

    for (let i = 0; i < 5; i++) {

        const bar =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.12,
                    5.2,
                    0.15
                ),
                goldMaterial
            );

        bar.position.x =
            direction *
            (0.6 + i * 1.05);

        bar.position.y = 0;

        gate.add(bar);
    }


    const horizontal =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                5.2,
                0.12,
                0.18
            ),
            goldMaterial
        );

    gate.add(horizontal);
}


addGateBars(
    leftGate,
    1
);

addGateBars(
    rightGate,
    -1
);


/* center decorative post */

const centerPost =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            0.35,
            6.3,
            0.45
        ),
        goldMaterial
    );

centerPost.position.set(
    0,
    4.2,
    -1.2
);

entrance.add(centerPost);


/* Add gates */

entrance.add(leftGate);
entrance.add(rightGate);


/* =========================================================
   TORCHES
   ========================================================= */

const torchPositions = [
    [-7, 6, 1],
    [7, 6, 1]
];

const torchLights = [];

torchPositions.forEach(pos => {

    const light =
        new THREE.PointLight(
            0xff9b4a,
            2.5,
            15
        );

    light.position.set(
        pos[0],
        pos[1],
        pos[2]
    );

    entrance.add(light);

    torchLights.push(light);


    const torch =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.25,
                12,
                12
            ),
            new THREE.MeshBasicMaterial({
                color: 0xff9c45
            })
        );

    torch.position.set(
        pos[0],
        pos[1],
        pos[2]
    );

    entrance.add(torch);
});


/* =========================================================
   SIGN
   ========================================================= */

function createSignTexture() {

    const canvas =
        document.createElement("canvas");

    canvas.width = 800;
    canvas.height = 200;

    const ctx =
        canvas.getContext("2d");

    ctx.fillStyle = "#0a090c";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.strokeStyle = "#b8944b";

    ctx.lineWidth = 6;

    ctx.strokeRect(
        10,
        10,
        780,
        180
    );

    ctx.textAlign = "center";

    ctx.fillStyle = "#d4b56b";

    ctx.font =
        "bold 55px Georgia";

    ctx.fillText(
        "CTRL + Z",
        400,
        85
    );

    ctx.font =
        "32px Georgia";

    ctx.fillText(
        "DIGITAL CEMETERY",
        400,
        135
    );

    return new THREE.CanvasTexture(canvas);
}

const sign =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            8,
            2
        ),
        new THREE.MeshBasicMaterial({
            map: createSignTexture()
        })
    );

sign.position.set(
    0,
    9.5,
    -1.2
);

entrance.add(sign);


/* =========================================================
   TOMBS
   ========================================================= */

const tombs = [];

let selectedTomb = null;


/*
    IMPORTANT:

    The gate is at Z = 28.

    Everything from Z = 37 onward
    is considered INSIDE the cemetery.

    Tombs will NEVER spawn before the gate.
*/

function getInsideCemeteryPosition() {

    let x;
    let z;

    do {

        x =
            (Math.random() - 0.5) *
            58;

        z =
            38 +
            Math.random() * 55;

    } while (
        Math.abs(x) < 7 &&
        z < 72
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


    /* tomb body */

    const shape =
        new THREE.Shape();

    shape.moveTo(-2, 0);

    shape.lineTo(2, 0);

    shape.lineTo(2, 3.4);

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

    shape.lineTo(-2, 0);


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


    const material =
        new THREE.MeshStandardMaterial({
            color: isNew
                ? 0x292238
                : 0x17161a,

            roughness: 0.85,

            metalness: 0.05
        });


    const tomb =
        new THREE.Mesh(
            geometry,
            material
        );

    tomb.rotation.y =
        Math.PI;

    tomb.castShadow = true;

    tomb.receiveShadow = true;

    group.add(tomb);


    /* stone cross */

    const crossMaterial =
        new THREE.MeshStandardMaterial({
            color: isNew
                ? 0xb89b5a
                : 0x57505b
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

    group.add(crossVertical);


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

    group.add(crossHorizontal);


    /* tomb label */

    const canvas =
        document.createElement("canvas");

    canvas.width = 512;
    canvas.height = 160;

    const ctx =
        canvas.getContext("2d");

    ctx.fillStyle = "#15131a";

    ctx.fillRect(
        0,
        0,
        512,
        160
    );

    ctx.fillStyle =
        isNew
            ? "#d9bd6e"
            : "#8e887b";

    ctx.font =
        "bold 28px Georgia";

    ctx.textAlign = "center";

    let displayName =
        name.length > 22
            ? name.substring(0, 22) + "..."
            : name;

    ctx.fillText(
        displayName,
        256,
        80
    );

    const texture =
        new THREE.CanvasTexture(canvas);

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
       POSITION

       ALWAYS INSIDE THE GATE
       ===================================================== */

    const pos =
        getInsideCemeteryPosition();

    group.position.set(
        pos.x,
        0,
        pos.z
    );


    /* =====================================================
       NEW TOMB EFFECT
       ===================================================== */

    if (isNew) {

        group.scale.set(
            0.05,
            0.05,
            0.05
        );

        group.position.y = -1.5;

        group.userData.emerging = true;

        group.userData.emergeStart =
            performance.now();

        /* glow */

        const glow =
            new THREE.PointLight(
                0x9c72ff,
                3,
                10
            );

        glow.position.y = 3;

        group.add(glow);

        group.userData.glow = glow;
    }


    group.userData.fileName =
        name;

    group.userData.fileSize =
        size;

    group.userData.fileType =
        type;

    group.userData.isTomb =
        true;


    scene.add(group);

    tombs.push(group);

    updateCounter();

    return group;
}


/* =========================================================
   OLD TOMBS
   ========================================================= */

for (let i = 0; i < 28; i++) {

    createTomb(
        "Forgotten File " + (i + 1),
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
            (file, index) => {

                setTimeout(
                    () => {

                        buryFile(file);

                    },
                    index * 600
                );

            }
        );


        fileInput.value = "";
    }
);


/* =========================================================
   BURY FILE
   ========================================================= */

function buryFile(file) {

    /*
        Create tomb.
    */

    const tomb =
        createTomb(
            file.name,
            formatSize(file.size),
            file.type || "Unknown file",
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


    /*
        Hide welcome text after burial.
    */

    document
        .getElementById("welcome")
        .style.opacity = "0";


    /*
        Slight camera movement toward cemetery.
    */

    camera.position.z =
        Math.min(
            camera.position.z,
            68
        );
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


    /*
        Force browser to restart animation.
    */

    void flash.offsetWidth;


    flash.classList.add(
        "flash"
    );


    /*
        Increase moon brightness
        briefly.
    */

    const oldIntensity =
        moonLight.intensity;

    moonLight.intensity =
        3.5;


    setTimeout(
        () => {

            moonLight.intensity =
                oldIntensity;

        },
        120
    );


    setTimeout(
        () => {

            moonLight.intensity =
                2.2;

        },
        190
    );


    setTimeout(
        () => {

            moonLight.intensity =
                oldIntensity;

        },
        300
    );
}


/* =========================================================
   POPUP
   ========================================================= */

function showBurialPopup(
    fileName
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
        fileName;


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
            3200
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

    const i =
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
                    i
                )
            ).toFixed(2)
        ) +
        " " +
        units[i]
    );
}


/* =========================================================
   CAMERA CONTROLS
   ========================================================= */

let yaw = 0;

let pitch = -0.05;

let isDragging = false;

let previousMouseX = 0;
let previousMouseY = 0;


/* Mouse */

renderer.domElement.addEventListener(
    "pointerdown",
    function(e) {

        isDragging = true;

        previousMouseX =
            e.clientX;

        previousMouseY =
            e.clientY;

        renderer.domElement.setPointerCapture(
            e.pointerId
        );
    }
);


renderer.domElement.addEventListener(
    "pointerup",
    function(e) {

        isDragging = false;

        renderer.domElement.releasePointerCapture(
            e.pointerId
        );
    }
);


renderer.domElement.addEventListener(
    "pointermove",
    function(e) {

        if (!isDragging) {
            return;
        }


        const dx =
            e.clientX -
            previousMouseX;

        const dy =
            e.clientY -
            previousMouseY;


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


        previousMouseX =
            e.clientX;

        previousMouseY =
            e.clientY;
    }
);


/* =========================================================
   SCROLL MOVEMENT
   ========================================================= */

renderer.domElement.addEventListener(
    "wheel",
    function(e) {

        e.preventDefault();

        const speed =
            e.deltaY > 0
                ? 1.8
                : -1.8;


        const forwardX =
            Math.sin(yaw);

        const forwardZ =
            Math.cos(yaw);


        camera.position.x +=
            forwardX * speed;

        camera.position.z +=
            forwardZ * speed;


        /*
            Keep player inside cemetery area
            after entering.
        */

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
                105
            );
    },
    {
        passive: false
    }
);


/* =========================================================
   LOOK DIRECTION
   ========================================================= */

function updateCamera() {

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
        camera.position.z +
        Math.cos(yaw) *
        20;


    camera.lookAt(target);
}


/* =========================================================
   GATE OPENING
   ========================================================= */

let gateProgress = 0;


function updateGate() {

    /*
        Entrance is at Z = 28.

        When camera is far:
        gate closed.

        When camera reaches
        approximately 55:
        gate begins opening.

        At approximately 40:
        fully open.
    */

    const distance =
        Math.abs(
            camera.position.z -
            28
        );


    let target = 0;


    if (distance > 28) {

        target = 0;

    } else if (distance > 10) {

        target =
            1 -
            (
                (distance - 10) /
                18
            );

    } else {

        target = 1;
    }


    /*
        Smooth movement.
    */

    gateProgress +=
        (
            target -
            gateProgress
        ) * 0.08;


    /*
        Smoothstep.
    */

    const eased =
        gateProgress *
        gateProgress *
        (
            3 -
            2 * gateProgress
        );


    /*
        LEFT GATE

        Hinged on LEFT side.

        Opens outward to LEFT.
    */

    leftGate.rotation.y =
        -eased *
        Math.PI *
        0.72;


    /*
        RIGHT GATE

        Hinged on RIGHT side.

        Opens outward to RIGHT.
    */

    rightGate.rotation.y =
        eased *
        Math.PI *
        0.72;
}


/* =========================================================
   TOMBS RISE
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
                tomb.userData.emergeStart;


            const duration =
                1800;


            let progress =
                Math.min(
                    elapsed /
                    duration,
                    1
                );


            /*
                Ease out.
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
                -1.5 +
                1.5 * ease;


            /*
                Glow slowly fades.
            */

            if (
                tomb.userData.glow
            ) {

                tomb.userData.glow.intensity =
                    3 *
                    (1 - progress);
            }


            if (progress >= 1) {

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
   RAYCASTER
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
        <h2>🪦 ${escapeHTML(
            tomb.userData.fileName
        )}</h2>

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
            inside the CTRL + Z Digital Cemetery.
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
   VISITOR PANEL
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

            document
                .getElementById(
                    "selectedTombName"
                )
                .textContent =
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


/* =========================================================
   VISITOR BUTTON
   ========================================================= */

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

            document
                .getElementById(
                    "selectedTombName"
                )
                .textContent =
                selectedTomb.userData.fileName;

            loadVisitors();

            visitorPanel.classList.add(
                "show"
            );
        }
    );


/* =========================================================
   LOCAL STORAGE VISITORS
   ========================================================= */

function visitorKey() {

    if (!selectedTomb) {
        return null;
    }

    return (
        "cemetery_" +
        selectedTomb.userData.fileName
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


    const comments =
        document.getElementById(
            "comments"
        );


    comments.innerHTML =
        data.comments
            .map(
                comment => `
                    <div class="comment">
                        ${escapeHTML(comment)}
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
                    localStorage.getItem(key) ||
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
                    localStorage.getItem(key) ||
                    '{"roses":0,"comments":[]}'
                );


            data.comments.push(
                text
            );


            localStorage.setItem(
                key,
                JSON.stringify(data)
            );


            input.value = "";

            loadVisitors();
        }
    );


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
   FIREflies
   ========================================================= */

const fireflyGeometry =
    new THREE.BufferGeometry();

const fireflyPositions = [];

for (let i = 0; i < 120; i++) {

    fireflyPositions.push(
        (Math.random() - 0.5) * 90,
        1 + Math.random() * 8,
        35 + Math.random() * 60
    );
}

fireflyGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        fireflyPositions,
        3
    )
);


const fireflyMaterial =
    new THREE.PointsMaterial({
        color: 0xb79cff,
        size: 0.16,
        transparent: true,
        opacity: 0.8
    });


const fireflies =
    new THREE.Points(
        fireflyGeometry,
        fireflyMaterial
    );

scene.add(fireflies);


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


    /*
        Stars slowly rotate.
    */

    stars.rotation.y +=
        0.00008;


    /*
        Fireflies movement.
    */

    fireflies.rotation.y +=
        0.0003;


    /*
        Torch flicker.
    */

    torchLights.forEach(
        light => {

            light.intensity =
                2.2 +
                Math.random() * 0.7;

        }
    );


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
