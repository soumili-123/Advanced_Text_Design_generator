window.onload = function () {
    const canvas = document.getElementById("designCanvas");
    const ctx = canvas.getContext("2d");

    function generateDesign() {
        const mainColor = document.getElementById("color1").value;
        const accentColor = document.getElementById("color2").value;
        const text = document.getElementById("designText").value;
        const font = document.getElementById("fontStyle").value;
        const textSize = document.getElementById("textSize").value;
        const pattern = document.getElementById("pattern").value;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background gradient
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, mainColor);
        gradient.addColorStop(1, accentColor);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // ---------- PATTERNS ----------
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.strokeStyle = "rgba(255,255,255,0.4)";

        if (pattern === "circles") {
            for (let i = 0; i < 8; i++) {
                ctx.beginPath();
                ctx.arc(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height,
                    20 + Math.random() * 20,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            }
        }

        if (pattern === "stripes") {
            for (let x = 0; x < canvas.width; x += 40) {
                ctx.fillRect(x, 0, 20, canvas.height);
            }
        }

        if (pattern === "grid") {
            for (let x = 0; x < canvas.width; x += 40) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += 40) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
        }

        // ---------- TEXT ----------
        ctx.fillStyle = "white";
        ctx.font = `bold ${textSize}px ${font}`;
        ctx.fillText(text, 40, canvas.height / 2);
    }

    // Generate button
    document.getElementById("generateBtn").onclick = generateDesign;

    // Random generator
    document.getElementById("randomBtn").onclick = function () {
        document.getElementById("color1").value = "#" + Math.floor(Math.random()*16777215).toString(16);
        document.getElementById("color2").value = "#" + Math.floor(Math.random()*16777215).toString(16);

        const patterns = ["none", "circles", "stripes", "grid"];
        document.getElementById("pattern").value = patterns[Math.floor(Math.random() * patterns.length)];

        const fonts = ["Arial", "Verdana", "Georgia", "Courier New", "Cursive"];
        document.getElementById("fontStyle").value = fonts[Math.floor(Math.random() * fonts.length)];

        generateDesign();
    };

    // Download button
    document.getElementById("downloadBtn").onclick = function () {
        const link = document.createElement('a');
        link.download = "my_design.png";
        link.href = canvas.toDataURL();
        link.click();
    };

    generateDesign();
};
