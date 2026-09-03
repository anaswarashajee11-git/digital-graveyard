/* =====================================
   CTRL + Z CEMETERY
   Main JavaScript
===================================== */


/* -----------------------------
   FILE STORAGE
----------------------------- */

let buriedFiles = JSON.parse(
    localStorage.getItem("buriedFiles")
) || [
    "old_project.zip",
    "forgotten_notes.txt",
    "final_final.docx",
    "photo_backup.rar",
    "unused_code.js",
    "old_resume.pdf",
    "college_assignment.doc",
    "random_file.tmp",
    "old_website.html",
    "backup_old.zip",
    "mystery_file.dat"
];

const fileCount = document.getElementById("fileCount");

function updateFileCount() {

    fileCount.textContent = buriedFiles.length;

    localStorage.setItem(
        "buriedFiles",
        JSON.stringify(buriedFiles)
    );
}

updateFileCount();


/* =====================================
   BURY NEW FILE
===================================== */

const buryBtn = document.getElementById("buryBtn");

const fileModal = document.getElementById("fileModal");

const fileName = document.getElementById("fileName");

const confirmBury = document.getElementById("confirmBury");

const closeModal = document.getElementById("closeModal");


buryBtn.addEventListener("click", () => {

    fileModal.classList.add("active");

    fileName.focus();

});


closeModal.addEventListener("click", () => {

    fileModal.classList.remove("active");

});


confirmBury.addEventListener("click", buryFile);


fileName.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        buryFile();

    }

});


function buryFile() {

    const name = fileName.value.trim();

    if (name === "") {

        alert("Please enter a file name.");

        return;

    }

    buriedFiles.push(name);

    updateFileCount();

    fileName.value = "";

    fileModal.classList.remove("active");

    showMessage(
        `"${name}" has been buried forever...`
    );

}


/* =====================================
   DISPLAY BURIED FILES
===================================== */

const filesBtn = document.getElementById("filesBtn");

const filesModal = document.getElementById("filesModal");

const closeFilesModal =
    document.getElementById("closeFilesModal");

const fileList =
    document.getElementById("fileList");


filesBtn.addEventListener("click", () => {

    displayFiles();

    filesModal.classList.add("active");

});


closeFilesModal.addEventListener("click", () => {

    filesModal.classList.remove("active");

});


function displayFiles() {

    fileList.innerHTML = "";

    if (buriedFiles.length === 0) {

        fileList.innerHTML =
            "<p>No files have been buried yet.</p>";

        return;

    }


    buriedFiles.forEach((file, index) => {

        const item = document.createElement("div");

        item.className = "file-item";

        item.innerHTML = `
            <span>🪦 ${file}</span>
            <span>#${index + 1}</span>
        `;

        fileList.appendChild(item);

    });

}


/* =====================================
   VISITOR BUTTON
===================================== */

const visitorBtn =
    document.getElementById("visitorBtn");


visitorBtn.addEventListener("click", () => {

    const visitors =
        Math.floor(Math.random() * 20) + 1;

    showMessage(
        `${visitors} digital souls are wandering here tonight...`
    );

});


/* =====================================
   MESSAGE
===================================== */

function showMessage(message) {

    const notification =
        document.createElement("div");

    notification.textContent = message;

    notification.style.position = "fixed";
    notification.style.left = "50%";
    notification.style.top = "75%";
    notification.style.transform =
        "translate(-50%, -50%)";

    notification.style.padding = "14px 25px";

    notification.style.background =
        "rgba(5,5,8,0.95)";

    notification.style.border =
        "1px solid #806b43";

    notification.style.color =
        "#d1bb7b";

    notification.style.fontFamily =
        "Georgia, serif";

    notification.style.fontSize =
        "12px";

    notification.style.zIndex = "200";

    notification.style.borderRadius = "4px";

    document.body.appendChild(notification);


    setTimeout(() => {

        notification.style.opacity = "0";

        notification.style.transition =
            "opacity 0.5s";

        setTimeout(() => {

            notification.remove();

        }, 500);

    }, 2500);

}


/* =====================================
   DRAG TO LOOK
===================================== */

let isDragging = false;

let startX = 0;

let startY = 0;

let rotateX = 0;

let rotateY = 0;


document.addEventListener("mousedown", (event) => {

    isDragging = true;

    startX = event.clientX;

    startY = event.clientY;

});


document.addEventListener("mouseup", () => {

    isDragging = false;

});


document.addEventListener("mousemove", (event) => {

    if (!isDragging) return;

    const movementX =
        event.clientX - startX;

    const movementY =
        event.clientY - startY;


    rotateY += movementX * 0.03;

    rotateX -= movementY * 0.02;


    rotateX = Math.max(
        -8,
        Math.min(8, rotateX)
    );


    document.querySelector(".cemetery").style.transform =
        `perspective(1000px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)`;


    startX = event.clientX;

    startY = event.clientY;

});


/* =====================================
   SCROLL TO MOVE
===================================== */

let moveAmount = 0;


document.addEventListener("wheel", (event) => {

    moveAmount += event.deltaY * 0.05;

    moveAmount = Math.max(
        -30,
        Math.min(100, moveAmount)
    );


    const path =
        document.querySelector(".path");

    const building =
        document.querySelector(
            ".cemetery-building"
        );


    path.style.transform =
        `translateX(-50%)
         translateY(${moveAmount}px)`;


    building.style.transform =
        `translateX(-50%)
         translateY(${moveAmount * 0.15}px)`;

});


/* =====================================
   CLICK GATE
===================================== */

const gate =
    document.querySelector(".gate");


gate.addEventListener("click", () => {

    showMessage(
        "The gates remember every file you've forgotten..."
    );

});


/* =====================================
   ESCAPE KEY
===================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        fileModal.classList.remove("active");

        filesModal.classList.remove("active");

    }

});
