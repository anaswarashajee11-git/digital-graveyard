// ==========================================
// CTRL + Z CEMETARY
// 3D DIGITAL GRAVEYARD
// ==========================================

if (typeof THREE === "undefined") {
    alert("Three.js failed to load!");
    throw new Error("Three.js not loaded");
}

const sceneContainer = document.getElementById("scene");

// ------------------------------------------
// SCENE
// ------------------------------------------

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x020205);

scene.fog = new THREE.FogExp2(
    0x05070a,
    0.025
);

// ------------------------------------------
// CAMERA
// ------------------------------------------

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 6, 24);

// ------------------------------------------
// RENDERER
// ------------------------------------------

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

sceneContainer.innerHTML = "";
sceneContainer.appendChild(renderer.domElement);

// ------------------------------------------
// CONTROLS
// ------------------------------------------

const controls = new THREE.OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

controls.maxPolarAngle = Math.PI / 2.05;

controls.target.set(0, 3, 0);

// ------------------------------------------
// LIGHTING
// ------------------------------------------

const ambientLight = new THREE.AmbientLight(
    0x777788,
    0.35
);

scene.add(ambientLight);


const moonLight = new THREE.DirectionalLight(
    0x8899ff,
    1.2
);

moonLight.position.set(
    -20,
    30,
    10
);

moonLight.castShadow = true;

scene.add(moonLight);

// ------------------------------------------
// MOON
// ------------------------------------------

const moonGeometry =
    new THREE.SphereGeometry(4, 32, 32);

const moonMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xdddddd
    });

const moon =
    new THREE.Mesh(
        moonGeometry,
        moonMaterial
    );

moon.position.set(
    -20,
    25,
    -40
);

scene.add(moon);

// ==========================================
// GROUND
// ==========================================

const groundGeometry =
    new THREE.PlaneGeometry(
        120,
        120
    );

const groundMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x11191b,
        roughness: 1
    });

const ground =
    new THREE.Mesh(
        groundGeometry,
        groundMaterial
    );

ground.rotation.x = -Math.PI / 2;

ground.receiveShadow = true;

scene.add(ground);

// ==========================================
// CEMETERY PATH
// ==========================================

const pathGeometry =
    new THREE.PlaneGeometry(
        9,
        80
    );

const pathMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x252238,
        roughness: 1
    });

const path =
    new THREE.Mesh(
        pathGeometry,
        pathMaterial
    );

path.rotation.x = -Math.PI / 2;

path.position.set(
    0,
    0.02,
    -10
);

scene.add(path);

// ==========================================
// ENTRANCE GATE
// ==========================================

function createEntranceGate() {

    const gate = new THREE.Group();

    // --------------------------------------
    // STONE MATERIAL
    // --------------------------------------

    const stoneMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x303038,
            roughness: 0.9
        });

    // --------------------------------------
    // LEFT PILLAR
    // --------------------------------------

    const pillarGeometry =
        new THREE.BoxGeometry(
            2.8,
            8,
            2.8
        );

    const leftPillar =
        new THREE.Mesh(
            pillarGeometry,
            stoneMaterial
        );

    leftPillar.position.set(
        -8,
        4,
        18
    );

    leftPillar.castShadow = true;

    gate.add(leftPillar);

    // --------------------------------------
    // RIGHT PILLAR
    // --------------------------------------

    const rightPillar =
        new THREE.Mesh(
            pillarGeometry,
            stoneMaterial
        );

    rightPillar.position.set(
        8,
        4,
        18
    );

    rightPillar.castShadow = true;

    gate.add(rightPillar);

    // --------------------------------------
    // PILLAR CAPS
    // --------------------------------------

    const capGeometry =
        new THREE.BoxGeometry(
            3.4,
            0.8,
            3.4
        );

    const leftCap =
        new THREE.Mesh(
            capGeometry,
            stoneMaterial
        );

    leftCap.position.set(
        -8,
        8.4,
        18
    );

    gate.add(leftCap);


    const rightCap =
        new THREE.Mesh(
            capGeometry,
            stoneMaterial
        );

    rightCap.position.set(
        8,
        8.4,
        18
    );

    gate.add(rightCap);

    // --------------------------------------
    // TOP ARCH
    // --------------------------------------

    const topGeometry =
        new THREE.BoxGeometry(
            19,
            2.2,
            2.5
        );

    const top =
        new THREE.Mesh(
            topGeometry,
            stoneMaterial
        );

    top.position.set(
        0,
        8,
        18
    );

    top.castShadow = true;

    gate.add(top);

    // --------------------------------------
    // METAL GATE
    // --------------------------------------

    const metalMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x08090c,
            metalness: 0.8,
            roughness: 0.3
        });

    // Vertical bars

    for (
        let x = -6;
        x <= 6;
        x += 1.5
    ) {

        const barGeometry =
            new THREE.BoxGeometry(
                0.25,
                6,
                0.25
            );

        const bar =
            new THREE.Mesh(
                barGeometry,
                metalMaterial
            );

        bar.position.set(
            x,
            3,
            18
        );

        bar.castShadow = true;

        gate.add(bar);
    }

    // Horizontal bars

    for (
        let y = 1;
        y <= 5;
        y += 2
    ) {

        const barGeometry =
            new THREE.BoxGeometry(
                14,
                0.25,
                0.25
            );

        const bar =
            new THREE.Mesh(
                barGeometry,
                metalMaterial
            );

        bar.position.set(
            0,
            y,
            18
        );

        gate.add(bar);
    }

    // --------------------------------------
    // SPIKES ON TOP
    // --------------------------------------

    for (
        let x = -6;
        x <= 6;
        x += 1.5
    ) {

        const spikeGeometry =
            new THREE.ConeGeometry(
                0.3,
                1.2,
                4
            );

        const spike =
            new THREE.Mesh(
                spikeGeometry,
                metalMaterial
            );

        spike.position.set(
            x,
            6.2,
            18
        );

        gate.add(spike);
    }

    // ======================================
    // SIGN BOARD
    // ======================================

    const signCanvas =
        document.createElement("canvas");

    signCanvas.width = 1024;
    signCanvas.height = 256;

    const ctx =
        signCanvas.getContext("2d");

    // background

    ctx.fillStyle = "#08090d";

    ctx.fillRect(
        0,
        0,
        1024,
        256
    );

    // border

    ctx.strokeStyle = "#777cff";

    ctx.lineWidth = 12;

    ctx.strokeRect(
        10,
        10,
        1004,
        236
    );

    // heading

    ctx.fillStyle = "#ffffff";

    ctx.font =
        "bold 78px Arial";

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";

    ctx.shadowColor =
        "#777cff";

    ctx.shadowBlur = 20;

    ctx.fillText(
        "CTRL + Z CEMETARY",
        512,
        128
    );

    const signTexture =
        new THREE.CanvasTexture(
            signCanvas
        );

    const signMaterial =
        new THREE.MeshBasicMaterial({
            map: signTexture,
            transparent: true
        });

    const signGeometry =
        new THREE.PlaneGeometry(
            12,
            3
        );

    const sign =
        new THREE.Mesh(
            signGeometry,
            signMaterial
        );

    sign.position.set(
        0,
        9.7,
        16.6
    );

    gate.add(sign);

    // --------------------------------------
    // TORCHES
    // --------------------------------------

    createTorch(
        gate,
        -6.2,
        5.8,
        16.5
    );

    createTorch(
        gate,
        6.2,
        5.8,
        16.5
    );

    scene.add(gate);
}


// ==========================================
// TORCH
// ==========================================

function createTorch(
    parent,
    x,
    y,
    z
) {

    const torch =
        new THREE.Group();

    const stickGeometry =
        new THREE.CylinderGeometry(
            0.12,
            0.12,
            2,
            8
        );

    const stickMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x171717
        });

    const stick =
        new THREE.Mesh(
            stickGeometry,
            stickMaterial
        );

    stick.position.y = 0;

    torch.add(stick);

    // flame

    const flameGeometry =
        new THREE.SphereGeometry(
            0.35,
            12,
            12
        );

    const flameMaterial =
        new THREE.MeshBasicMaterial({
            color: 0xffaa33
        });

    const flame =
        new THREE.Mesh(
            flameGeometry,
            flameMaterial
        );

    flame.position.y = 1.15;

    flame.scale.y = 1.5;

    torch.add(flame);

    // light

    const fireLight =
        new THREE.PointLight(
            0xffaa44,
            2,
            8
        );

    fireLight.position.y = 1.2;

    torch.add(fireLight);

    torch.position.set(
        x,
        y,
        z
    );

    parent.add(torch);
}


// Create entrance

createEntranceGate();

// ==========================================
// GRAVES
// ==========================================

function createGrave(
    x,
    z,
    name = "Forgotten File"
) {

    const group =
        new THREE.Group();

    // Tombstone shape

    const shape =
        new THREE.Shape();

    shape.moveTo(-1.3, 0);

    shape.lineTo(-1.3, 2.5);

    shape.quadraticCurveTo(
        -1.3,
        4,
        0,
        4
    );

    shape.quadraticCurveTo(
        1.3,
        4,
        1.3,
        2.5
    );

    shape.lineTo(
        1.3,
        0
    );

    shape.lineTo(
        -1.3,
        0
    );

    const geometry =
        new THREE.ExtrudeGeometry(
            shape,
            {
                depth: 0.5,
                bevelEnabled: true,
                bevelThickness: 0.1,
                bevelSize: 0.1,
                bevelSegments: 3
            }
        );

    const material =
        new THREE.MeshStandardMaterial({
            color: 0x29282b,
            roughness: 0.8
        });

    const grave =
        new THREE.Mesh(
            geometry,
            material
        );

    grave.position.set(
        x,
        0,
        z
    );

    grave.castShadow = true;

    group.add(grave);

    // --------------------------------------
    // CROSS
    // --------------------------------------

    const crossMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x555555
        });

    const vertical =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.18,
                1.5,
                0.18
            ),
            crossMaterial
        );

    vertical.position.set(
        0,
        3,
        -0.3
    );

    group.add(vertical);

    const horizontal =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.9,
                0.18,
                0.18
            ),
            crossMaterial
        );

    horizontal.position.set(
        0,
        3.2,
        -0.3
    );

    group.add(horizontal);

    // --------------------------------------
    // CANDLE
    // --------------------------------------

    const candle =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.12,
                0.12,
                0.7,
                12
            ),
            new THREE.MeshStandardMaterial({
                color: 0xffffdd
            })
        );

    candle.position.set(
        1.6,
        0.35,
        0
    );

    group.add(candle);

    const candleLight =
        new THREE.PointLight(
            0xffaa44,
            1.5,
            6
        );

    candleLight.position.set(
        1.6,
        1,
        0
    );

    group.add(candleLight);

    group.position.set(
        x,
        0,
        z
    );

    group.userData = {
        fileName: name
    };

    scene.add(group);

    return group;
}

// ==========================================
// STARTER GRAVES
// ==========================================

createGrave(-5, 8, "old_project_FINAL.py");
createGrave(5, 8, "assignment_FINAL.pdf");

createGrave(-4, 0, "website_old.zip");
createGrave(4, 0, "final_final_v2.docx");

createGrave(-5, -8, "unused_code.js");
createGrave(5, -8, "forgotten_notes.txt");

createGrave(-3, -16, "project_old.zip");
createGrave(3, -16, "backup_2023.pdf");

// ==========================================
// GRASS
// ==========================================

const grassMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x101718
    });

for (
    let i = 0;
    i < 250;
    i++
) {

    const grassGeometry =
        new THREE.ConeGeometry(
            0.08,
            Math.random() * 0.8 + 0.3,
            4
        );

    const grass =
        new THREE.Mesh(
            grassGeometry,
            grassMaterial
        );

    grass.position.set(
        (Math.random() - 0.5) * 90,
        0.2,
        (Math.random() - 0.5) * 80
    );

    scene.add(grass);
}

// ==========================================
// FIREFLIES
// ==========================================

const fireflyGeometry =
    new THREE.BoxGeometry(
        0.08,
        0.08,
        0.08
    );

const fireflyMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xffff99
    });

const fireflies = [];

for (
    let i = 0;
    i < 150;
    i++
) {

    const firefly =
        new THREE.Mesh(
            fireflyGeometry,
            fireflyMaterial
        );

    firefly.position.set(
        (Math.random() - 0.5) * 90,
        Math.random() * 15 + 2,
        (Math.random() - 0.5) * 80
    );

    scene.add(firefly);

    fireflies.push(firefly);
}

// ==========================================
// FILE UPLOAD
// ==========================================

const fileInput =
    document.getElementById(
        "fileInput"
    );

const graveCount =
    document.getElementById(
        "graveCount"
    );

let uploadedGraves = 0;

if (fileInput) {

    fileInput.addEventListener(
        "change",
        function () {

            const file =
                fileInput.files[0];

            if (!file) return;

            const x =
                (Math.random() - 0.5) * 12;

            const z =
                -20 -
                Math.random() * 30;

            createGrave(
                x,
                z,
                file.name
            );

            uploadedGraves++;

            if (graveCount) {
                graveCount.textContent =
                    "Files buried: " +
                    uploadedGraves;
            }

            fileInput.value = "";
        }
    );
}

// ==========================================
// MOUSE CLICK
// ==========================================

const raycaster =
    new THREE.Raycaster();

const mouse =
    new THREE.Vector2();

window.addEventListener(
    "click",
    function (event) {

        mouse.x =
            (event.clientX /
                window.innerWidth) *
                2 - 1;

        mouse.y =
            -(event.clientY /
                window.innerHeight) *
                2 + 1;

        raycaster.setFromCamera(
            mouse,
            camera
        );

        const objects =
            [];

        scene.traverse(
            function (object) {

                if (
                    object.isMesh &&
                    object.parent &&
                    object.parent.userData &&
                    object.parent.userData.fileName
                ) {
                    objects.push(object);
                }
            }
        );

        const hits =
            raycaster.intersectObjects(
                objects
            );

        if (
            hits.length > 0
        ) {

            const grave =
                hits[0].object.parent;

            const infoPanel =
                document.getElementById(
                    "infoPanel"
                );

            if (infoPanel) {

                infoPanel.style.display =
                    "block";

                infoPanel.innerHTML = `
                    <button id="closeInfo">×</button>

                    <h2>⚰️ ${grave.userData.fileName}</h2>

                    <p>☠️ Status: Buried</p>

                    <p>
                        Cause of death:
                        Never opened again.
                    </p>
                `;

                document
                    .getElementById(
                        "closeInfo"
                    )
                    .onclick =
                    function () {

                        infoPanel.style.display =
                            "none";
                    };
            }
        }
    }
);

// ==========================================
// RESIZE
// ==========================================

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

// ==========================================
// ANIMATION
// ==========================================

const clock =
    new THREE.Clock();

function animate() {

    requestAnimationFrame(
        animate
    );

    const time =
        clock.getElapsedTime();

    // Fireflies movement

    fireflies.forEach(
        (fly, index) => {

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

    controls.update();

    renderer.render(
        scene,
        camera
    );
}

animate();
