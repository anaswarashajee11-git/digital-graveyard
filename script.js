const fileInput = document.getElementById("fileInput");
const graveyard = document.getElementById("graveyard");

fileInput.addEventListener("change", function () {

    const file = fileInput.files[0];

    if (!file) {
        return;
    }

    const grave = document.createElement("div");

    grave.className = "grave";

    const fileName = file.name;
    const fileSize = (file.size / 1024).toFixed(2);

    grave.innerHTML = `
        <div class="rip">RIP</div>

        <div style="font-size:50px;">
            ⚰️
        </div>

        <h2>${fileName}</h2>

        <p>Size: ${fileSize} KB</p>

        <p>
            Born: ${new Date().toLocaleDateString()}
        </p>

        <p>
            Died: ${new Date().toLocaleDateString()}
        </p>

        <p>
            ☠️ Cause of death:
        </p>

        <p>
            "Never opened again."
        </p>
    `;

    graveyard.appendChild(grave);

    fileInput.value = "";
});
