// ============================================================
// CTRL + Z CEMETERY
// 3D SPOOKY CEMETERY
// GATE OPENS FROM THE CENTER WHEN YOU ZOOM CLOSE
// ============================================================


// ============================================================
// BASIC CHECK
// ============================================================

if (typeof THREE === "undefined") {

    alert("Three.js failed to load.");

    throw new Error("Three.js not loaded");
}


// ============================================================
// GLOBAL VARIABLES
// ============================================================

let scene;
let camera;
let renderer;
let controls;

let leftGate;
let rightGate;

let entrance;

let gateAmount = 0;

let raycaster;
let mouse;

let selectedTomb = null;

let tombs = [];

let graveCount = 0;


// ============================================================
// START
// ============================================================

init();


// ============================================================
// INITIALIZE SCENE
// ============================================================

function init() {

    // --------------------------------------------------------
    // SCENE
    // --------------------------------------------------------

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0x020204);

    scene.fog = new THREE.FogExp2(
        0x020204,
        0.008
    );


    // --------------------------------------------------------
    // CAMERA
    // --------------------------------------------------------

    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    // Start outside the cemetery

    camera.position.set(
        0,
        7,
        70
    );


    // --------------------------------------------------------
    // RENDERER
    // --------------------------------------------------------

    renderer = new THREE.WebGLRenderer({
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

    renderer.outputEncoding =
        THREE.sRGBEncoding;

    document
        .getElementById("scene")
        .appendChild(renderer.domElement);


    // --------------------------------------------------------
    // CONTROLS
    // --------------------------------------------------------

    controls = new THREE.OrbitControls(
        camera,
        renderer.domElement
    );

    controls.enableDamping = true;

    controls.dampingFactor = 0.06;

    controls.minDistance = 8;

    controls.maxDistance = 100;

    controls.target.set(
        0,
        4,
        28
    );


    // --------------------------------------------------------
    // LIGHTING
    // --------------------------------------------------------

    const ambientLight =
        new THREE.AmbientLight(
            0x596070,
            0.35
        );

    scene.add(ambientLight);


    const moonLight =
        new THREE.DirectionalLight(
            0x9da9c7,
            1.1
        );

    moonLight.position.set(
        -30,
        70,
        20
    );

    moonLight.castShadow = true;

    moonLight.shadow.mapSize.width = 2048;
    moonLight.shadow.mapSize.height = 2048;

    scene.add(moonLight);


    // ========================================================
    // MOON
    // ========================================================

    createMoon();


    // ========================================================
    // STARS
    // ========================================================

    createStars();


    // ========================================================
    // GROUND
    // ========================================================

    createGround();


    // ========================================================
    // PATH
    // ========================================================

    createPath();


    // ========================================================
    // ENTRANCE GATE
    // ========================================================

    createEntrance();


    // ========================================================
    // OLD TOMBS
    // ========================================================

    createOldTombs();


    // ========================================================
    // GRASS
    // ========================================================

    createGrass();


    // ========================================================
    // FIREFLIES
    // ========================================================

    createFireflies();


    // ========================================================
    // INTERACTION
    // ========================================================

    raycaster =
        new THREE.Raycaster();

    mouse =
        new THREE.Vector2();

    renderer.domElement.addEventListener(
        "click",
        onSceneClick
    );


    // ========================================================
    // FILE INPUT
    // ========================================================

    setupFileInput();


    // ========================================================
    // UI
    // ========================================================

    setupUI();


    // ========================================================
    // RESIZE
    // ========================================================

    window.addEventListener(
        "resize",
        onResize
    );


    // ========================================================
    // ANIMATION
    // ========================================================

    animate();
}


// ============================================================
// MOON
// ============================================================

function createMoon() {

    const moonGeometry =
        new THREE.SphereGeometry(
            7,
            32,
            32
        );

    const moonMaterial =
        new THREE.MeshBasicMaterial({
            color: 0xe9e8d5
        });

    const moon =
        new THREE.Mesh(
            moonGeometry,
            moonMaterial
        );

    moon.position.set(
        -45,
        50,
        -40
    );

    scene.add(moon);


    // Moon glow

    const glowGeometry =
        new THREE.SphereGeometry(
            10,
            32,
            32
        );

    const glowMaterial =
        new THREE.MeshBasicMaterial({
            color: 0xb9c5dc,
            transparent: true,
            opacity: 0.08
        });

    const glow =
        new THREE.Mesh(
            glowGeometry,
            glowMaterial
        );

    glow.position.copy(
        moon.position
    );

    scene.add(glow);
}


// ============================================================
// STARS
// ============================================================

function createStars() {

    const geometry =
        new THREE.BufferGeometry();

    const positions = [];

    for (let i = 0; i < 700; i++) {

        positions.push(
            (Math.random() - 0.5) * 500,
            Math.random() * 150 + 20,
            (Math.random() - 0.5) * 500
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
            color: 0xffffff,
            size: 0.7,
            transparent: true,
            opacity: 0.8
        });

    const stars =
        new THREE.Points(
            geometry,
            material
        );

    scene.add(stars);
}


// ============================================================
// GROUND
// ============================================================

function createGround() {

    const geometry =
        new THREE.PlaneGeometry(
            220,
            220
        );

    const material =
        new THREE.MeshStandardMaterial({
            color: 0x10100e,
            roughness: 1
        });

    const ground =
        new THREE.Mesh(
            geometry,
            material
        );

    ground.rotation.x =
        -Math.PI / 2;

    ground.receiveShadow = true;

    scene.add(ground);
}


// ============================================================
// PATH
// ============================================================

function createPath() {

    const geometry =
        new THREE.PlaneGeometry(
            8,
            100
        );

    const material =
        new THREE.MeshStandardMaterial({
            color: 0x181613,
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
        0.03,
        -15
    );

    path.receiveShadow = true;

    scene.add(path);
}


// ============================================================
// ENTRANCE
// ============================================================

function createEntrance() {

    entrance =
        new THREE.Group();

    entrance.position.set(
        0,
        0,
        28
    );

    scene.add(entrance);


    // --------------------------------------------------------
    // TOWERS
    // --------------------------------------------------------

    createGateTower(-11);

    createGateTower(11);


    // --------------------------------------------------------
    // ARCH
    // --------------------------------------------------------

    const archShape =
        new THREE.Shape();

    archShape.moveTo(-11, 0);

    archShape.lineTo(-11, 16);

    archShape.quadraticCurveTo(
        0,
        23,
        11,
        16
    );

    archShape.lineTo(11, 0);

    archShape.lineTo(-11, 0);


    const archGeometry =
        new THREE.ExtrudeGeometry(
            archShape,
            {
                depth: 1.5,
                bevelEnabled: true,
                bevelThickness: 0.3,
                bevelSize: 0.3,
                bevelSegments: 3
            }
        );

    const archMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x161513,
            roughness: 0.85,
            metalness: 0.3
        });

    const arch =
        new THREE.Mesh(
            archGeometry,
            archMaterial
        );

    arch.position.z = -1;

    arch.castShadow = true;

    arch.receiveShadow = true;

    entrance.add(arch);


    // --------------------------------------------------------
    // SIGN
    // --------------------------------------------------------

    createGateSign();


    // --------------------------------------------------------
    // GATES
    // --------------------------------------------------------

    createCenterOpeningGate();
}


// ============================================================
// GATE TOWER
// ============================================================

function createGateTower(x) {

    const tower =
        new THREE.Group();

    tower.position.x = x;

    entrance.add(tower);


    // Main tower

    const bodyGeometry =
        new THREE.BoxGeometry(
            5,
            18,
            5
        );

    const bodyMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x11100f,
            roughness: 0.8
        });

    const body =
        new THREE.Mesh(
            bodyGeometry,
            bodyMaterial
        );

    body.position.y = 9;

    body.castShadow = true;

    body.receiveShadow = true;

    tower.add(body);


    // Roof

    const roofGeometry =
        new THREE.ConeGeometry(
            4.2,
            7,
            4
        );

    const roofMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x080808,
            roughness: 0.7
        });

    const roof =
        new THREE.Mesh(
            roofGeometry,
            roofMaterial
        );

    roof.position.y = 21;

    roof.rotation.y =
        Math.PI / 4;

    roof.castShadow = true;

    tower.add(roof);


    // Spire

    const spireGeometry =
        new THREE.ConeGeometry(
            0.6,
            4,
            8
        );

    const spire =
        new THREE.Mesh(
            spireGeometry,
            new THREE.MeshStandardMaterial({
                color: 0x070707
            })
        );

    spire.position.y = 26;

    tower.add(spire);


    // Torch

    createTorch(
        tower,
        0,
        13,
        -2.8
    );
}


// ============================================================
// SIGN
// ============================================================

function createGateSign() {

    const canvas =
        document.createElement("canvas");

    canvas.width = 1024;
    canvas.height = 256;

    const ctx =
        canvas.getContext("2d");

    ctx.fillStyle = "#080808";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.strokeStyle = "#9b7935";

    ctx.lineWidth = 10;

    ctx.strokeRect(
        10,
        10,
        canvas.width - 20,
        canvas.height - 20
    );

    ctx.fillStyle = "#d9bc72";

    ctx.font =
        "bold 90px Georgia";

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";

    ctx.fillText(
        "CTRL + Z CEMETERY",
        canvas.width / 2,
        canvas.height / 2
    );

    const texture =
        new THREE.CanvasTexture(canvas);

    const geometry =
        new THREE.PlaneGeometry(
            15,
            3.7
        );

    const material =
        new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true
        });

    const sign =
        new THREE.Mesh(
            geometry,
            material
        );

    sign.position.set(
        0,
        17,
        -2
    );

    entrance.add(sign);
}


// ============================================================
// CENTER OPENING GATE
// ============================================================

function createCenterOpeningGate() {

    /*
        IMPORTANT:

        Each gate has its own PIVOT.

        Left gate pivot = center
        Right gate pivot = center

        Closed:

             LEFT | RIGHT
                   ↑
                 CENTER

        Open:

        LEFT            RIGHT
          \              /
           \            /

        This makes the gate open FROM THE MIDDLE.
    */


    // --------------------------------------------------------
    // LEFT GATE PIVOT
    // --------------------------------------------------------

    const leftPivot =
        new THREE.Group();

    leftPivot.position.set(
        -0.1,
        0,
        0
    );

    entrance.add(leftPivot);


    // --------------------------------------------------------
    // RIGHT GATE PIVOT
    // --------------------------------------------------------

    const rightPivot =
        new THREE.Group();

    rightPivot.position.set(
        0.1,
        0,
        0
    );

    entrance.add(rightPivot);


    // --------------------------------------------------------
    // LEFT DOOR
    // --------------------------------------------------------

    const leftDoor =
        createGateDoor(
            5.3
        );

    /*
        Move the actual door to the LEFT
        of its pivot.

        Therefore the pivot stays at the center.
    */

    leftDoor.position.x =
        -5.3 / 2;

    leftPivot.add(leftDoor);


    // --------------------------------------------------------
    // RIGHT DOOR
    // --------------------------------------------------------

    const rightDoor =
        createGateDoor(
            5.3
        );

    /*
        Move actual door to the RIGHT
        of its pivot.
    */

    rightDoor.position.x =
        5.3 / 2;

    rightPivot.add(rightDoor);


    // Save pivots globally

    leftGate = leftPivot;

    rightGate = rightPivot;
}


// ============================================================
// CREATE ONE GATE DOOR
// ============================================================

function createGateDoor(width) {

    const gate =
        new THREE.Group();


    // --------------------------------------------------------
    // MAIN IRON BARS
    // --------------------------------------------------------

    const barMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x151515,
            roughness: 0.45,
            metalness: 0.8
        });


    // Vertical bars

    const numberOfBars = 7;

    for (
        let i = 0;
        i < numberOfBars;
        i++
    ) {

        const x =
            -width / 2 +
            i *
            (width / (numberOfBars - 1));

        const barGeometry =
            new THREE.BoxGeometry(
                0.25,
                10,
                0.35
            );

        const bar =
            new THREE.Mesh(
                barGeometry,
                barMaterial
            );

        bar.position.set(
            x,
            5,
            0
        );

        bar.castShadow = true;

        gate.add(bar);


        // Spikes

        const spikeGeometry =
            new THREE.ConeGeometry(
                0.28,
                1.2,
                4
            );

        const spike =
            new THREE.Mesh(
                spikeGeometry,
                barMaterial
            );

        spike.position.set(
            x,
            10.6,
            0
        );

        spike.castShadow = true;

        gate.add(spike);
    }


    // --------------------------------------------------------
    // HORIZONTAL BARS
    // --------------------------------------------------------

    for (
        let y of [2.5, 5, 7.5]
    ) {

        const horizontalGeometry =
            new THREE.BoxGeometry(
                width,
                0.3,
                0.4
            );

        const horizontal =
            new THREE.Mesh(
                horizontalGeometry,
                barMaterial
            );

        horizontal.position.y = y;

        horizontal.castShadow = true;

        gate.add(horizontal);
    }


    // --------------------------------------------------------
    // GOTHIC CENTER DECORATION
    // --------------------------------------------------------

    const decorationGeometry =
        new THREE.TorusGeometry(
            1.2,
            0.15,
            8,
            32
        );

    const decoration =
        new THREE.Mesh(
            decorationGeometry,
            new THREE.MeshStandardMaterial({
                color: 0x80632d,
                metalness: 0.8,
                roughness: 0.3
            })
        );

    decoration.rotation.y =
        Math.PI / 2;

    decoration.position.y = 5;

    gate.add(decoration);


    return gate;
}


// ============================================================
// TORCH
// ============================================================

function createTorch(
    parent,
    x,
    y,
    z
) {

    const holderGeometry =
        new THREE.CylinderGeometry(
            0.15,
            0.15,
            2,
            8
        );

    const holder =
        new THREE.Mesh(
            holderGeometry,
            new THREE.MeshStandardMaterial({
                color: 0x161616,
                metalness: 0.8
            })
        );

    holder.position.set(
        x,
        y,
        z
    );

    parent.add(holder);


    // Flame

    const flameGeometry =
        new THREE.SphereGeometry(
            0.5,
            12,
            12
        );

    const flameMaterial =
        new THREE.MeshBasicMaterial({
            color: 0xff8c28
        });

    const flame =
        new THREE.Mesh(
            flameGeometry,
            flameMaterial
        );

    flame.scale.set(
        0.6,
        1.3,
        0.6
    );

    flame.position.set(
        x,
        y + 1.1,
        z
    );

    parent.add(flame);


    // Light

    const light =
        new THREE.PointLight(
            0xff7b25,
            2,
            12
        );

    light.position.copy(
        flame.position
    );

    parent.add(light);


    flame.userData.flameLight =
        light;

    flame.userData.baseScale =
        flame.scale.clone();
}


// ============================================================
// OLD TOMBS
// ============================================================

function createOldTombs() {

    const oldNames = [
        "final_project_v1.zip",
        "assignment_old.pdf",
        "homework_FINAL.docx",
        "broken_code.py",
        "website_backup.zip",
        "presentation_old.pptx",
        "ideas.txt",
        "project_old.rar",
        "final_FINAL_v7.pdf",
        "untitled_document.docx",
        "old_portfolio.zip",
        "debug_version.js",
        "forgotten_notes.txt",
        "college_project_old.zip"
    ];


    oldNames.forEach(
        (name, index) => {

            const angle =
                Math.random() *
                Math.PI *
                2;

            const radius =
                14 +
                Math.random() * 32;

            const x =
                Math.cos(angle) * radius;

            const z =
                Math.sin(angle) * radius;

            // Keep path area clearer

            if (
                Math.abs(x) < 6 &&
                z > -40 &&
                z < 30
            ) {
                return;
            }

            createTomb(
                x,
                z,
                {
                    name: name,
                    size:
                        Math.floor(
                            Math.random() * 9000000
                        ),
                    type: "old file",
                    date:
                        "Before the cemetery opened",
                    cause:
                        getRandomCause()
                }
            );
        }
    );
}


// ============================================================
// CREATE TOMB
// ============================================================

function createTomb(
    x,
    z,
    data
) {

    const tomb =
        new THREE.Group();


    // --------------------------------------------------------
    // RANDOM ROTATION
    // --------------------------------------------------------

    tomb.rotation.y =
        Math.random() *
        Math.PI *
        2;


    // --------------------------------------------------------
    // RANDOM SCALE
    // --------------------------------------------------------

    const scale =
        0.8 +
        Math.random() * 0.35;

    tomb.scale.set(
        scale,
        scale,
        scale
    );


    // --------------------------------------------------------
    // TOMBSTONE
    // --------------------------------------------------------

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
                    ? 0x4a4946
                    : 0x343432,

            roughness: 0.95
        });


    const stone =
        new THREE.Mesh(
            geometry,
            material
        );


    stone.position.y = 0;

    stone.position.z = -0.25;

    stone.castShadow = true;

    stone.receiveShadow = true;


    tomb.add(stone);


    // --------------------------------------------------------
    // CROSS
    // --------------------------------------------------------

    const crossMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x252525,
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
        3.8,
        -0.35
    );

    tomb.add(vertical);


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
        4.2,
        -0.35
    );

    tomb.add(horizontal);


    // --------------------------------------------------------
    // FILE NAME
    // --------------------------------------------------------

    const textSprite =
        createTextSprite(
            data.name
        );

    textSprite.position.set(
        0,
        2.1,
        -0.55
    );

    textSprite.scale.set(
        3.1,
        0.7,
        1
    );

    tomb.add(textSprite);


    // --------------------------------------------------------
    // DATA
    // --------------------------------------------------------

    tomb.userData =
        data;

    tomb.userData.isTomb =
        true;


    // --------------------------------------------------------
    // POSITION
    // --------------------------------------------------------

    tomb.position.set(
        x,
        0,
        z
    );


    scene.add(tomb);

    tombs.push(tomb);

    graveCount++;

    updateGraveCounter();
}


// ============================================================
// TEXT SPRITE
// ============================================================

function createTextSprite(text) {

    const canvas =
        document.createElement("canvas");

    canvas.width = 512;

    canvas.height = 128;

    const ctx =
        canvas.getContext("2d");

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle =
        "rgba(0,0,0,0.65)";

    ctx.fillRect(
        5,
        5,
        502,
        118
    );

    ctx.fillStyle =
        "#ddd";

    ctx.font =
        "bold 28px Arial";

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    let displayText = text;

    if (displayText.length > 25) {
        displayText =
            displayText.substring(
                0,
                22
            ) + "...";
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

    const material =
        new THREE.SpriteMaterial({
            map: texture,
            transparent: true
        });

    return new THREE.Sprite(
        material
    );
}


// ============================================================
// GRASS
// ============================================================

function createGrass() {

    const grassMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x20251b,
            roughness: 1
        });


    for (
        let i = 0;
        i < 300;
        i++
    ) {

        const geometry =
            new THREE.ConeGeometry(
                0.08 +
                Math.random() * 0.08,
                0.4 +
                Math.random() * 0.5,
                4
            );

        const grass =
            new THREE.Mesh(
                geometry,
                grassMaterial
            );

        grass.position.set(
            (Math.random() - 0.5) * 100,
            0.2,
            (Math.random() - 0.5) * 100
        );

        grass.rotation.y =
            Math.random() *
            Math.PI;

        scene.add(grass);
    }
}


// ============================================================
// FIREFLIES
// ============================================================

function createFireflies() {

    const geometry =
        new THREE.BufferGeometry();

    const positions = [];

    for (
        let i = 0;
        i < 120;
        i++
    ) {

        positions.push(
            (Math.random() - 0.5) * 90,
            1 +
            Math.random() * 12,
            (Math.random() - 0.5) * 90
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
            color: 0xb8d77a,
            size: 0.3,
            transparent: true,
            opacity: 0.8
        });

    const fireflies =
        new THREE.Points(
            geometry,
            material
        );

    scene.add(fireflies);

    fireflies.userData.isFireflies =
        true;
}


// ============================================================
// FILE INPUT
// ============================================================

function setupFileInput() {

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

            files.forEach(
                file => {

                    buryFile(file);

                }
            );

            fileInput.value = "";

        }
    );
}


// ============================================================
// BURY FILE
// ============================================================

function buryFile(file) {

    /*
        Browser demo:
        The file itself is NOT permanently deleted.

        We create a tomb representing the file.
    */


    const data = {

        name: file.name,

        size: file.size,

        type:
            file.type ||
            "Unknown file type",

        date:
            new Date().toLocaleString(),

        cause:
            getRandomCause()

    };


    // --------------------------------------------------------
    // RANDOM SCATTERED POSITION
    // --------------------------------------------------------

    let x;
    let z;

    do {

        x =
            (Math.random() - 0.5) * 80;

        z =
            (Math.random() - 0.5) * 80;

    } while (

        Math.abs(x) < 7 &&
        z > -45 &&
        z < 35

    );


    createTomb(
        x,
        z,
        data
    );
}


// ============================================================
// RANDOM CAUSE OF DEATH
// ============================================================

function getRandomCause() {

    const causes = [

        "Never opened again.",

        "Replaced by a newer version.",

        "Lost somewhere in Downloads.",

        "Final_Final_FINAL was created.",

        "Victim of Ctrl + Z.",

        "Abandoned during development.",

        "Forgotten after submission.",

        "Deleted after saying 'I'll need this later'.",

        "Killed by a deadline.",

        "Outdated beyond resurrection.",

        "Buried after too many bugs.",

        "Lost during a cleanup.",

        "The developer moved on.",

        "No longer compatible with reality.",

        "It was supposed to be temporary."

    ];

    return causes[
        Math.floor(
            Math.random() *
            causes.length
        )
    ];
}


// ============================================================
// UPDATE GRAVE COUNT
// ============================================================

function updateGraveCounter() {

    document.getElementById(
        "graveCount"
    ).textContent =
        graveCount;
}


// ============================================================
// SCENE CLICK
// ============================================================

function onSceneClick(event) {

    const rect =
        renderer.domElement.getBoundingClientRect();


    mouse.x =
        ((event.clientX - rect.left) /
            rect.width) *
        2 -
        1;

    mouse.y =
        -((event.clientY - rect.top) /
            rect.height) *
        2 +
        1;


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
                        objects.push(child);
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


// ============================================================
// SHOW MEMORIAL
// ============================================================

function showMemorial(tomb) {

    const data =
        tomb.userData;


    const panel =
        document.getElementById(
            "memorialPanel"
        );

    const content =
        document.getElementById(
            "memorialContent"
        );


    content.innerHTML = `

        <h2>⚰ RIP</h2>

        <div class="memorialLine">
            <strong>File:</strong><br>
            ${escapeHTML(data.name)}
        </div>

        <div class="memorialLine">
            <strong>Size:</strong>
            ${formatFileSize(data.size)}
        </div>

        <div class="memorialLine">
            <strong>Type:</strong>
            ${escapeHTML(data.type)}
        </div>

        <div class="memorialLine">
            <strong>Date of Death:</strong><br>
            ${escapeHTML(data.date)}
        </div>

        <div class="cause">

            ☠ Cause of Death

            <br><br>

            "${escapeHTML(data.cause)}"

        </div>

    `;


    panel.classList.add(
        "show"
    );
}


// ============================================================
// CLOSE MEMORIAL
// ============================================================

document.getElementById(
    "closeMemorial"
).addEventListener(
    "click",
    function () {

        document
            .getElementById(
                "memorialPanel"
            )
            .classList.remove(
                "show"
            );

    }
);


// ============================================================
// FORMAT FILE SIZE
// ============================================================

function formatFileSize(bytes) {

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
        (bytes /
            Math.pow(1024, i)
        ).toFixed(2)
        + " "
        + units[i]
    );
}


// ============================================================
// ESCAPE HTML
// ============================================================

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


// ============================================================
// VISITOR PANEL
// ============================================================

function setupUI() {

    const openButton =
        document.getElementById(
            "openVisitorPanel"
        );

    const visitorPanel =
        document.getElementById(
            "visitorPanel"
        );

    const closeButton =
        document.getElementById(
            "closeVisitorPanel"
        );


    openButton.addEventListener(
        "click",
        function () {

            if (!selectedTomb) {
                return;
            }

            openVisitorPanel(
                selectedTomb
            );

        }
    );


    closeButton.addEventListener(
        "click",
        function () {

            visitorPanel.classList.remove(
                "show"
            );

        }
    );


    document.getElementById(
        "roseButton"
    ).addEventListener(
        "click",
        leaveRose
    );


    document.getElementById(
        "commentButton"
    ).addEventListener(
        "click",
        leaveComment
    );
}


// ============================================================
// OPEN VISITOR PANEL
// ============================================================

function openVisitorPanel(tomb) {

    const panel =
        document.getElementById(
            "visitorPanel"
        );


    document.getElementById(
        "selectedTombName"
    ).textContent =
        tomb.userData.name;


    updateVisitorData();


    panel.classList.add(
        "show"
    );
}


// ============================================================
// LOCAL STORAGE KEY
// ============================================================

function getStorageKey() {

    if (!selectedTomb) {
        return null;
    }

    return (
        "cemetery_" +
        selectedTomb.userData.name
    );
}


// ============================================================
// GET VISITOR DATA
// ============================================================

function getVisitorData() {

    const key =
        getStorageKey();

    if (!key) {

        return {
            roses: 0,
            comments: []
        };

    }


    const stored =
        localStorage.getItem(
            key
        );


    if (!stored) {

        return {
            roses: 0,
            comments: []
        };

    }


    try {

        return JSON.parse(
            stored
        );

    } catch {

        return {
            roses: 0,
            comments: []
        };

    }
}


// ============================================================
// SAVE VISITOR DATA
// ============================================================

function saveVisitorData(data) {

    const key =
        getStorageKey();

    if (!key) {
        return;
    }

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );
}


// ============================================================
// UPDATE VISITOR DATA
// ============================================================

function updateVisitorData() {

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


    comments.innerHTML = "";


    data.comments.forEach(
        comment => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "comment";


            div.innerHTML = `

                ${escapeHTML(
                    comment.text
                )}

                <small>
                    ${escapeHTML(
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


// ============================================================
// LEAVE ROSE
// ============================================================

function leaveRose() {

    if (!selectedTomb) {
        return;
    }


    const data =
        getVisitorData();


    data.roses++;


    saveVisitorData(
        data
    );


    updateVisitorData();
}


// ============================================================
// LEAVE COMMENT
// ============================================================

function leaveComment() {

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


    input.value = "";


    updateVisitorData();
}


// ============================================================
// GATE ANIMATION
// ============================================================

function updateGate() {

    if (
        !leftGate ||
        !rightGate
    ) {
        return;
    }


    /*
        Calculate camera distance
        from the CENTER of the gate.
    */

    const gateWorldPosition =
        new THREE.Vector3();


    entrance.getWorldPosition(
        gateWorldPosition
    );


    const dx =
        camera.position.x -
        gateWorldPosition.x;


    const dz =
        camera.position.z -
        gateWorldPosition.z;


    const distance =
        Math.sqrt(
            dx * dx +
            dz * dz
        );


    /*
        CLOSE:
        distance > 42

        OPEN:
        distance < 30

        Between 30 and 42:
        smooth transition.
    */

    let target = 0;


    if (
        distance <= 30
    ) {

        target = 1;

    } else if (
        distance >= 42
    ) {

        target = 0;

    } else {

        target =
            1 -
            (
                (distance - 30) /
                12
            );

    }


    /*
        SMOOTH MOVEMENT
    */

    gateAmount +=
        (
            target -
            gateAmount
        ) * 0.035;


    /*
        SMOOTHSTEP
    */

    const eased =
        gateAmount *
        gateAmount *
        (
            3 -
            2 * gateAmount
        );


    /*
        LEFT DOOR:

        Rotates LEFT
        from center.
    */

    leftGate.rotation.y =
        -eased *
        Math.PI *
        0.85;


    /*
        RIGHT DOOR:

        Rotates RIGHT
        from center.
    */

    rightGate.rotation.y =
        eased *
        Math.PI *
        0.85;
}


// ============================================================
// ANIMATION
// ============================================================

function animate() {

    requestAnimationFrame(
        animate
    );


    // Gate

    updateGate();


    // Controls

    controls.update();


    // Animate fireflies

    scene.traverse(
        object => {

            if (
                object.userData &&
                object.userData.isFireflies
            ) {

                object.rotation.y +=
                    0.0005;

            }


            if (
                object.userData &&
                object.userData.flameLight
            ) {

                const light =
                    object.userData.flameLight;


                light.intensity =
                    1.5 +
                    Math.random() * 0.8;


                const base =
                    object.userData.baseScale;


                object.scale.set(
                    base.x +
                    Math.random() * 0.08,

                    base.y +
                    Math.random() * 0.12,

                    base.z +
                    Math.random() * 0.08
                );

            }

        }
    );


    renderer.render(
        scene,
        camera
    );
}


// ============================================================
// RESIZE
// ============================================================

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
