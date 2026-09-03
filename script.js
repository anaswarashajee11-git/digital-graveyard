

console.log("CTRL + Z CEMETERY STARTING...");




if (typeof THREE === "undefined") {

    document.body.innerHTML = `
        <div style="
            color:white;
            background:#050505;
            height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            font-family:Arial;
            text-align:center;
        ">
            <div>
                <h1>Three.js could not load</h1>
                <p>Please refresh the page.</p>
            </div>
        </div>
    `;

    throw new Error("THREE.js failed to load");
}



const sceneContainer =
    document.getElementById("scene");

const fileInput =
    document.getElementById("fileInput");

const graveCount =
    document.getElementById("graveCount");

const welcome =
    document.getElementById("welcome");

const memorialPanel =
    document.getElementById("memorialPanel");

const memorialContent =
    document.getElementById("memorialContent");

const visitorPanel =
    document.getElementById("visitorPanel");

const selectedTombName =
    document.getElementById("selectedTombName");

const roseCount =
    document.getElementById("roseCount");

const commentInput =
    document.getElementById("commentInput");

const comments =
    document.getElementById("comments");


/* =========================================================
   SCENE
========================================================= */

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0x020205);

scene.fog =
    new THREE.FogExp2(
        0x05050b,
        0.009
    );




const camera =
    new THREE.PerspectiveCamera(
        55,
        window.innerWidth /
        window.innerHeight,
        0.1,
        500
    );

camera.position.set(
    0,
    8,
    78
);



const renderer =
    new THREE.WebGLRenderer({
        antialias: true,
        alpha: false
    });

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.outputEncoding =
    THREE.sRGBEncoding;

sceneContainer.appendChild(
    renderer.domElement
);


const ambient =
    new THREE.AmbientLight(
        0x7b7890,
        0.7
    );

scene.add(ambient);


const moonLight =
    new THREE.DirectionalLight(
        0x8e8eb8,
        1.8
    );

moonLight.position.set(
    -30,
    45,
    -40
);

scene.add(moonLight);


const warmLight =
    new THREE.PointLight(
        0xd39a4b,
        1.5,
        35
    );

warmLight.position.set(
    0,
    6,
    27
);

scene.add(warmLight);


/* =========================================================
   MOON
========================================================= */

const moon =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            6,
            32,
            32
        ),
        new THREE.MeshBasicMaterial({
            color: 0xd9d9d0
        })
    );

moon.position.set(
    -30,
    35,
    -55
);

scene.add(moon);


/* MOON GLOW */

const moonGlow =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            8,
            32,
            32
        ),
        new THREE.MeshBasicMaterial({
            color: 0x8888a8,
            transparent: true,
            opacity: 0.08,
            depthWrite: false
        })
    );

moonGlow.position.copy(
    moon.position
);

scene.add(moonGlow);



const starGeometry =
    new THREE.BufferGeometry();

const starPositions = [];

for (
    let i = 0;
    i < 1000;
    i++
) {

    const x =
        (Math.random() - .5) * 250;

    const y =
        Math.random() * 100 + 15;

    const z =
        (Math.random() - .5) * 250;

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
        color: 0xd8d0bd,
        size: .35
    });

const stars =
    new THREE.Points(
        starGeometry,
        starMaterial
    );

scene.add(stars);




const ground =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            220,
            220
        ),
        new THREE.MeshStandardMaterial({
            color: 0x111217,
            roughness: 1
        })
    );

ground.rotation.x =
    -Math.PI / 2;

ground.position.y =
    -0.1;

scene.add(ground);




const path =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            10,
            100
        ),
        new THREE.MeshStandardMaterial({
            color: 0x25202f,
            roughness: 1
        })
    );

path.rotation.x =
    -Math.PI / 2;

path.position.set(
    0,
    0.01,
    28
);

scene.add(path);


/* =========================================================
   PATH STONES
========================================================= */

for (
    let i = 0;
    i < 16;
    i++
) {

    const stone =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                7,
                .12,
                4
            ),
            new THREE.MeshStandardMaterial({
                color: 0x393342
            })
        );

    stone.position.set(
        (Math.random() - .5) * .7,
        .08,
        72 - i * 5
    );

    scene.add(stone);
}


/* =========================================================
   TREES
========================================================= */

function createTree(
    x,
    z,
    scale
) {

    const tree =
        new THREE.Group();


    const trunk =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                .35,
                .55,
                5,
                7
            ),
            new THREE.MeshStandardMaterial({
                color: 0x171217
            })
        );

    trunk.position.y =
        2.5;

    tree.add(trunk);


    for (
        let i = 0;
        i < 4;
        i++
    ) {

        const branch =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    .12,
                    .3,
                    3,
                    6
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x141014
                })
            );

        branch.position.set(
            (Math.random() - .5) * 2,
            4 + i * .5,
            (Math.random() - .5) * 2
        );

        branch.rotation.z =
            (Math.random() - .5) * 1.3;

        branch.rotation.x =
            (Math.random() - .5) * 1.3;

        tree.add(branch);
    }


    tree.position.set(
        x,
        0,
        z
    );

    tree.scale.setScalar(
        scale
    );

    scene.add(tree);
}


for (
    let i = 0;
    i < 40;
    i++
) {

    const x =
        (Math.random() - .5) * 150;

    const z =
        Math.random() * 120 - 25;

    if (
        Math.abs(x) < 12
    ) continue;

    createTree(
        x,
        z,
        .7 + Math.random() * .9
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

scene.add(entrance);


/* =========================================================
   TOWER FUNCTION
========================================================= */

function createTower(x) {

    const tower =
        new THREE.Group();


    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                7,
                19,
                7
            ),
            new THREE.MeshStandardMaterial({
                color: 0x1b1c24,
                roughness: .9
            })
        );

    body.position.y =
        9.5;

    tower.add(body);


    /* roof */

    const roof =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                5.8,
                8,
                6
            ),
            new THREE.MeshStandardMaterial({
                color: 0x111018,
                roughness: .7
            })
        );

    roof.position.y =
        23;

    roof.rotation.y =
        Math.PI / 6;

    tower.add(roof);


    /* roof gold trim */

    const trim =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                6,
                6,
                .25,
                6
            ),
            new THREE.MeshStandardMaterial({
                color: 0x9c7539,
                metalness: .8
            })
        );

    trim.position.y =
        19.1;

    tower.add(trim);


    /* spike */

    const spike =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                .45,
                3,
                5
            ),
            new THREE.MeshStandardMaterial({
                color: 0x08080d
            })
        );

    spike.position.y =
        28.3;

    tower.add(spike);


    /* windows */

    for (
        let i = -1;
        i <= 1;
        i++
    ) {

        const window =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    .8,
                    2.8,
                    .15
                ),
                new THREE.MeshBasicMaterial({
                    color: 0x8d6a38
                })
            );

        window.position.set(
            i * 1.8,
            12,
            -3.53
        );

        tower.add(window);
    }


    tower.position.x =
        x;

    entrance.add(tower);
}


/* towers */

createTower(-10);
createTower(10);


/* =========================================================
   CENTRAL ARCH
========================================================= */

const arch =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            13,
            19,
            4
        ),
        new THREE.MeshStandardMaterial({
            color: 0x181920
        })
    );

arch.position.set(
    0,
    9.5,
    0
);

entrance.add(arch);


/* TOP ARCH DECORATION */

const archTop =
    new THREE.Mesh(
        new THREE.CylinderGeometry(
            6.5,
            6.5,
            4,
            32,
            false,
            0,
            Math.PI
        ),
        new THREE.MeshStandardMaterial({
            color: 0x191a22
        })
    );

archTop.rotation.z =
    Math.PI / 2;

archTop.rotation.y =
    Math.PI / 2;

archTop.position.set(
    0,
    19,
    0
);

entrance.add(archTop);


/* =========================================================
   SIGN
========================================================= */

function createTextTexture(
    text,
    size,
    color
) {

    const canvas =
        document.createElement("canvas");

    canvas.width = 1024;
    canvas.height = 256;

    const ctx =
        canvas.getContext("2d");

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.font =
        `bold ${size}px Georgia`;

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    ctx.fillStyle =
        color;

    ctx.shadowColor =
        "#000";

    ctx.shadowBlur =
        15;

    ctx.fillText(
        text,
        canvas.width / 2,
        canvas.height / 2
    );

    return new THREE.CanvasTexture(
        canvas
    );
}


const sign =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            11,
            2.5
        ),
        new THREE.MeshBasicMaterial({
            map:
                createTextTexture(
                    "CTRL + Z CEMETERY",
                    85,
                    "#d1ad65"
                ),
            transparent: true
        })
    );

sign.position.set(
    0,
    16,
    -2.1
);

entrance.add(sign);


/* =========================================================
   GATE
========================================================= */

const leftGate =
    new THREE.Group();

const rightGate =
    new THREE.Group();


leftGate.position.set(
    -.15,
    0,
    -2.3
);

rightGate.position.set(
    .15,
    0,
    -2.3
);


/* gate bars */

function createGateDoor(
    group,
    side
) {

    const width = 5.6;

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const x =
            side < 0
                ? -i * .65 - .3
                : i * .65 + .3;

        const bar =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    .16,
                    10,
                    .18
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x18151d,
                    metalness: .9,
                    roughness: .35
                })
            );

        bar.position.set(
            x,
            5,
            0
        );

        group.add(bar);


        const spike =
            new THREE.Mesh(
                new THREE.ConeGeometry(
                    .24,
                    1.3,
                    5
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x9c783f,
                    metalness: .8
                })
            );

        spike.position.set(
            x,
            10.5,
            0
        );

        group.add(spike);
    }


    /* horizontal bars */

    for (
        let y of [2.5, 5, 7.5]
    ) {

        const horizontal =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    width,
                    .18,
                    .25
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x25212a,
                    metalness: .8
                })
            );

        horizontal.position.set(
            side < 0
                ? -2.5
                : 2.5,
            y,
            0
        );

        group.add(horizontal);
    }
}


createGateDoor(
    leftGate,
    -1
);

createGateDoor(
    rightGate,
    1
);


/* IMPORTANT:
   Doors are positioned away from their pivot.
   They rotate OUTWARD from the CENTER.
*/

leftGate.position.x =
    -.15;

rightGate.position.x =
    .15;

entrance.add(leftGate);
entrance.add(rightGate);


/* =========================================================
   GOLD CENTER HANDLES
========================================================= */

function createHandle(
    x
) {

    const handle =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                .55,
                .12,
                12,
                24
            ),
            new THREE.MeshStandardMaterial({
                color: 0xc89c52,
                metalness: .9,
                roughness: .25
            })
        );

    handle.rotation.y =
        Math.PI / 2;

    handle.position.set(
        x,
        5.5,
        -2.5
    );

    entrance.add(handle);
}

createHandle(-.7);
createHandle(.7);


/* =========================================================
   TORCHES
========================================================= */

const torches = [];

function createTorch(x) {

    const holder =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                .18,
                .25,
                2.3,
                8
            ),
            new THREE.MeshStandardMaterial({
                color: 0x171318
            })
        );

    holder.position.set(
        x,
        7,
        -3
    );

    entrance.add(holder);


    const flame =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                .45,
                1.3,
                8
            ),
            new THREE.MeshBasicMaterial({
                color: 0xff9a32
            })
        );

    flame.position.set(
        x,
        8.8,
        -3
    );

    entrance.add(flame);


    const light =
        new THREE.PointLight(
            0xff8b32,
            2,
            18
        );

    light.position.set(
        x,
        8.5,
        -3
    );

    entrance.add(light);

    torches.push({
        flame,
        light
    });
}

createTorch(-7);
createTorch(7);


/* =========================================================
   TOMBSTONES
========================================================= */

const tombs = [];


const oldFileNames = [

    "final_FINAL_v7.pdf",
    "assignment_old.docx",
    "broken_code.py",
    "presentation_final.pptx",
    "project_backup.zip",
    "report_last.docx",
    "old_resume.pdf",
    "website_old.html",
    "database_backup.sql",
    "notes_final.txt",
    "image_old.png",
    "final_project_REAL.pdf",
    "forgotten_script.js",
    "prototype_v1.zip",
    "unused_design.fig",
    "README_old.md",
    "test_file.py",
    "old_database.db",
    "presentation_backup.pptx",
    "final_final_really_final.docx"
];


const causes = [

    "Never opened again.",
    "Replaced by a newer version.",
    "Lost in the Downloads folder.",
    "Victim of Ctrl + Z.",
    "Deleted after saying 'I'll need this later.'",
    "Forgotten during the final submission.",
    "Killed by a newer FINAL_FINAL file.",
    "Abandoned after one successful compile.",
    "Buried beneath years of backups.",
    "No longer compatible with reality."
];


function createTomb(
    data,
    x,
    z,
    rotation
) {

    const group =
        new THREE.Group();


    /* stone */

    const stone =
        new THREE.Mesh(
            new THREE.ExtrudeGeometry(
                createTombShape(),
                {
                    depth: 1.2,
                    bevelEnabled: true,
                    bevelSegments: 2,
                    bevelSize: .15,
                    bevelThickness: .12
                }
            ),
            new THREE.MeshStandardMaterial({
                color:
                    data.isNew
                        ? 0x71687a
                        : 0x4a4a52,
                roughness: .9
            })
        );

    stone.rotation.y =
        Math.PI;

    stone.position.z =
        -.6;

    stone.position.y =
        .1;

    group.add(stone);


    /* cross */

    const crossMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x25242b
        });


    const vertical =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                .22,
                2.2,
                .18
            ),
            crossMaterial
        );

    vertical.position.set(
        0,
        2.3,
        -.65
    );

    group.add(vertical);


    const horizontal =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.1,
                .22,
                .18
            ),
            crossMaterial
        );

    horizontal.position.set(
        0,
        2.55,
        -.65
    );

    group.add(horizontal);


    /* label */

    const label =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                2.8,
                .65
            ),
            new THREE.MeshBasicMaterial({
                map:
                    createTextTexture(
                        shorten(
                            data.name,
                            20
                        ),
                        50,
                        "#d0c3a3"
                    ),
                transparent: true
            })
        );

    label.position.set(
        0,
        1.05,
        -.68
    );

    label.rotation.y =
        Math.PI;

    group.add(label);


    /* data */

    group.userData =
        data;

    group.userData.isTomb =
        true;


    group.position.set(
        x,
        0,
        z
    );

    group.rotation.y =
        rotation;


    scene.add(group);

    tombs.push(group);

    return group;
}


/* tomb shape */

function createTombShape() {

    const shape =
        new THREE.Shape();

    shape.moveTo(
        -1.5,
        0
    );

    shape.lineTo(
        -1.5,
        2
    );

    shape.absarc(
        0,
        2,
        1.5,
        Math.PI,
        0,
        false
    );

    shape.lineTo(
        1.5,
        0
    );

    shape.lineTo(
        -1.5,
        0
    );

    return shape;
}


/* =========================================================
   OLD RANDOM TOMBS
========================================================= */

for (
    let i = 0;
    i < oldFileNames.length;
    i++
) {

    let x;
    let z;

    do {

        x =
            (Math.random() - .5) * 100;

        z =
            Math.random() * 100 - 15;

    } while (
        Math.abs(x) < 10 &&
        z > 15
    );


    createTomb(
        {
            name:
                oldFileNames[i],

            size:
                Math.floor(
                    Math.random() * 9000
                ) + 300,

            type:
                "Old file",

            date:
                randomDate(),

            cause:
                causes[
                    Math.floor(
                        Math.random() *
                        causes.length
                    )
                ],

            isNew: false
        },

        x,
        z,

        Math.random() *
        Math.PI *
        2
    );
}


/* =========================================================
   GRAVE COUNT
========================================================= */

function updateCount() {

    graveCount.textContent =
        tombs.length;
}

updateCount();


/* =========================================================
   FILE BURIAL
========================================================= */

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


function buryFile(file) {

    const data = {

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
            causes[
                Math.floor(
                    Math.random() *
                    causes.length
                )
            ],

        isNew: true
    };


    /* random scattered position */

    let x;
    let z;

    do {

        x =
            (Math.random() - .5) * 90;

        z =
            Math.random() * 90 - 5;

    } while (
        Math.abs(x) < 9 &&
        z > 15
    );


    const tomb =
        createTomb(
            data,
            x,
            z,
            Math.random() *
            Math.PI *
            2
        );


    updateCount();


    /* small visual effect */

    tomb.scale.set(
        .1,
        .1,
        .1
    );


    tomb.userData.birth =
        performance.now();


    alert(
        "⚰ FILE BURIED\n\n" +
        file.name +
        "\n\n" +
        "A new tomb has appeared in the cemetery."
    );
}


/* =========================================================
   TOMB ANIMATION
========================================================= */

function animateNewTombs() {

    const now =
        performance.now();

    tombs.forEach(
        tomb => {

            if (
                tomb.userData.birth
            ) {

                const elapsed =
                    now -
                    tomb.userData.birth;

                const duration =
                    900;

                const p =
                    Math.min(
                        elapsed /
                        duration,
                        1
                    );

                const eased =
                    1 -
                    Math.pow(
                        1 - p,
                        3
                    );

                tomb.scale.set(
                    eased,
                    eased,
                    eased
                );

                if (
                    p >= 1
                ) {

                    delete tomb.userData.birth;

                }
            }

        }
    );
}


/* =========================================================
   CAMERA CONTROL
========================================================= */

let target =
    new THREE.Vector3(
        0,
        5,
        28
    );


let yaw = 0;
let pitch = -0.06;

let distance = 50;

let dragging = false;

let lastMouseX = 0;
let lastMouseY = 0;


/* mouse down */

renderer.domElement.addEventListener(
    "pointerdown",
    function (event) {

        dragging = true;

        lastMouseX =
            event.clientX;

        lastMouseY =
            event.clientY;

        renderer.domElement.setPointerCapture(
            event.pointerId
        );
    }
);


/* mouse move */

renderer.domElement.addEventListener(
    "pointermove",
    function (event) {

        if (!dragging)
            return;

        const dx =
            event.clientX -
            lastMouseX;

        const dy =
            event.clientY -
            lastMouseY;

        lastMouseX =
            event.clientX;

        lastMouseY =
            event.clientY;


        yaw -=
            dx * 0.004;

        pitch -=
            dy * 0.003;


        pitch =
            Math.max(
                -0.8,
                Math.min(
                    0.7,
                    pitch
                )
            );

    }
);


/* mouse up */

renderer.domElement.addEventListener(
    "pointerup",
    function () {

        dragging = false;

    }
);


/* =========================================================
   ZOOM
========================================================= */

renderer.domElement.addEventListener(
    "wheel",
    function (event) {

        event.preventDefault();

        distance +=
            event.deltaY * 0.035;

        distance =
            Math.max(
                5,
                Math.min(
                    110,
                    distance
                )
            );

    },
    {
        passive: false
    }
);


/* =========================================================
   CAMERA UPDATE
========================================================= */

function updateCamera() {

    const horizontal =
        Math.cos(pitch) *
        distance;

    const x =
        target.x +
        Math.sin(yaw) *
        horizontal;

    const y =
        target.y +
        Math.sin(pitch) *
        distance;

    const z =
        target.z +
        Math.cos(yaw) *
        horizontal;


    camera.position.x =
        x;

    camera.position.y =
        y;

    camera.position.z =
        z;


    camera.lookAt(
        target
    );
}


/* =========================================================
   GATE ANIMATION
========================================================= */

let gateProgress = 0;


function updateGate() {

    const gatePosition =
        entrance.position;


    const dx =
        camera.position.x -
        gatePosition.x;

    const dz =
        camera.position.z -
        gatePosition.z;


    const gateDistance =
        Math.sqrt(
            dx * dx +
            dz * dz
        );


    /*
       FAR AWAY = CLOSED

       APPROACH = OPENS

       VERY CLOSE = FULLY OPEN
    */

    let desired = 0;


    if (
        gateDistance < 42
    ) {

        desired =
            1 -
            Math.max(
                0,
                gateDistance - 10
            ) / 32;

    }


    desired =
        Math.max(
            0,
            Math.min(
                1,
                desired
            )
        );


    gateProgress +=
        (
            desired -
            gateProgress
        ) * .035;


    /* smoothstep */

    const smooth =
        gateProgress *
        gateProgress *
        (
            3 -
            2 *
            gateProgress
        );


    /*
       OPEN FROM CENTER

       LEFT goes LEFT

       RIGHT goes RIGHT
    */

    leftGate.rotation.y =
        -smooth *
        Math.PI *
        .78;

    rightGate.rotation.y =
        smooth *
        Math.PI *
        .78;


    /* hide welcome when close */

    if (
        gateDistance < 35
    ) {

        welcome.classList.add(
            "hidden"
        );

    } else {

        welcome.classList.remove(
            "hidden"
        );

    }
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
    function (event) {

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


        const hits =
            raycaster.intersectObjects(
                tombs,
                true
            );


        if (
            hits.length === 0
        ) return;


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
            !object
        ) return;


        openMemorial(
            object
        );
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


    const data =
        tomb.userData;


    memorialContent.innerHTML = `

        <div class="memorial-heading">
            DIGITAL MEMORIAL
        </div>

        <div class="memorial-name">
            ${safe(data.name)}
        </div>

        <div class="memorial-row">
            <strong>DATE OF DEATH</strong>
            ${safe(data.date)}
        </div>

        <div class="memorial-row">
            <strong>FILE SIZE</strong>
            ${formatSize(data.size)}
        </div>

        <div class="memorial-row">
            <strong>FILE TYPE</strong>
            ${safe(data.type)}
        </div>

        <div class="memorial-row">
            <strong>CAUSE OF DEATH</strong>

            <div class="cause">
                "${safe(data.cause)}"
            </div>

        </div>

    `;


    memorialPanel.classList.add(
        "open"
    );
}


/* close */

document
    .getElementById(
        "closeMemorial"
    )
    .addEventListener(
        "click",
        function () {

            memorialPanel.classList.remove(
                "open"
            );

        }
    );


/* =========================================================
   VISITOR PANEL
========================================================= */

document
    .getElementById(
        "openVisitorPanel"
    )
    .addEventListener(
        "click",
        function () {

            if (
                !selectedTomb
            ) return;

            memorialPanel.classList.remove(
                "open"
            );

            openVisitor(
                selectedTomb
            );

        }
    );


document
    .getElementById(
        "visitorButton"
    )
    .addEventListener(
        "click",
        function () {

            if (
                selectedTomb
            ) {

                openVisitor(
                    selectedTomb
                );

            } else {

                alert(
                    "Click a tomb first."
                );

            }

        }
    );


document
    .getElementById(
        "closeVisitorPanel"
    )
    .addEventListener(
        "click",
        function () {

            visitorPanel.classList.remove(
                "open"
            );

        }
    );


function openVisitor(
    tomb
) {

    selectedTomb =
        tomb;


    selectedTombName.textContent =
        tomb.userData.name;


    updateVisitorData();


    visitorPanel.classList.add(
        "open"
    );
}


/* =========================================================
   ROSES
========================================================= */

document
    .getElementById(
        "roseButton"
    )
    .addEventListener(
        "click",
        function () {

            if (
                !selectedTomb
            ) return;


            const key =
                getTombKey(
                    selectedTomb
                );


            const data =
                getVisitorData(
                    key
                );


            data.roses++;

            saveVisitorData(
                key,
                data
            );

            updateVisitorData();

        }
    );


/* =========================================================
   COMMENTS
========================================================= */

document
    .getElementById(
        "commentButton"
    )
    .addEventListener(
        "click",
        function () {

            if (
                !selectedTomb
            ) return;


            const text =
                commentInput.value.trim();


            if (
                !text
            ) return;


            const key =
                getTombKey(
                    selectedTomb
                );


            const data =
                getVisitorData(
                    key
                );


            data.comments.push(
                text
            );


            saveVisitorData(
                key,
                data
            );


            commentInput.value =
                "";


            updateVisitorData();

        }
    );


/* =========================================================
   LOCAL VISITOR DATA
========================================================= */

function getTombKey(
    tomb
) {

    return (
        "tomb_" +
        encodeURIComponent(
            tomb.userData.name
        )
    );
}


function getVisitorData(
    key
) {

    try {

        const saved =
            localStorage.getItem(
                key
            );


        if (
            saved
        ) {

            return JSON.parse(
                saved
            );

        }

    } catch (error) {

        console.log(
            "Storage error",
            error
        );

    }


    return {
        roses: 0,
        comments: []
    };
}


function saveVisitorData(
    key,
    data
) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(data)
        );

    } catch (error) {

        console.log(
            "Could not save",
            error
        );
    }
}


function updateVisitorData() {

    if (
        !selectedTomb
    ) return;


    const key =
        getTombKey(
            selectedTomb
        );


    const data =
        getVisitorData(
            key
        );


    roseCount.textContent =
        "🌹 " +
        data.roses;


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

            div.textContent =
                "“" +
                comment +
                "”";

            comments.appendChild(
                div
            );

        }
    );
}


/* =========================================================
   FIREFLIES
========================================================= */

const fireflies = [];


for (
    let i = 0;
    i < 120;
    i++
) {

    const firefly =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                .07,
                8,
                8
            ),
            new THREE.MeshBasicMaterial({
                color: 0xd8b36a
            })
        );


    firefly.position.set(
        (Math.random() - .5) * 130,
        1 + Math.random() * 12,
        Math.random() * 100 - 20
    );


    firefly.userData.offset =
        Math.random() *
        Math.PI *
        2;


    fireflies.push(
        firefly
    );

    scene.add(
        firefly
    );
}


/* =========================================================
   ANIMATION
========================================================= */

const clock =
    new THREE.Clock();


function animate() {

    requestAnimationFrame(
        animate
    );


    const time =
        clock.getElapsedTime();


    /* camera */

    updateCamera();


    /* gate */

    updateGate();


    /* new tomb animation */

    animateNewTombs();


    /* fireflies */

    fireflies.forEach(
        (firefly, index) => {

            firefly.position.y +=
                Math.sin(
                    time * 1.2 +
                    firefly.userData.offset
                ) * .002;

            firefly.position.x +=
                Math.sin(
                    time +
                    index
                ) * .001;

        }
    );


    /* torch flicker */

    torches.forEach(
        (torch, index) => {

            const flicker =
                Math.sin(
                    time * 12 +
                    index
                ) * .2;

            torch.light.intensity =
                1.7 +
                flicker;

            torch.flame.scale.y =
                1 +
                flicker * .25;

        }
    );


    /* stars slow movement */

    stars.rotation.y =
        time * .001;


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


/* =========================================================
   HELPERS
========================================================= */

function shorten(
    text,
    max
) {

    if (
        text.length <= max
    ) {

        return text;

    }

    return (
        text.substring(
            0,
            max - 3
        ) +
        "..."
    );
}


function formatSize(
    bytes
) {

    if (
        bytes < 1024
    ) {

        return bytes +
            " B";

    }


    if (
        bytes < 1024 * 1024
    ) {

        return (
            bytes /
            1024
        ).toFixed(1) +
        " KB";

    }


    return (
        bytes /
        (1024 * 1024)
    ).toFixed(1) +
    " MB";
}


function randomDate() {

    const date =
        new Date();

    date.setDate(
        date.getDate() -
        Math.floor(
            Math.random() *
            1000
        )
    );

    return date.toLocaleDateString();
}


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


console.log(
    "CTRL + Z CEMETERY READY"
);
