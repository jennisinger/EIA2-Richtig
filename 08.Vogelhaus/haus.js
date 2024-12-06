"use strict";
// Canvas setup
const canvas = document.getElementById("winterScene");
const ctx = canvas.getContext("2d");
if (ctx) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    zeichneHintergrund(ctx);
    zeichneBerge(ctx);
    zeichneAlleVoegel(ctx);
    zeichneSchneeflocken(ctx);
    zeichneSchneemann(ctx);
    zeichneVogelhaus(ctx);
}
else {
    console.error("CanvasRenderingContext2D konnte nicht initialisiert werden.");
}
// Funktion, um den Hintergrund zu zeichnen
function zeichneHintergrund(ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "skyblue");
    gradient.addColorStop(1, "white");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
// Funktion, um ein Vogelhaus zu zeichnen
function zeichneVogelhaus(ctx) {
    ctx.fillStyle = "brown";
    ctx.fillRect(canvas.width / 2 - 50, canvas.height - 200, 100, 150);
    ctx.fillStyle = "brown";
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 70, canvas.height - 200);
    ctx.lineTo(canvas.width / 2 + 70, canvas.height - 200);
    ctx.lineTo(canvas.width / 2, canvas.height - 300);
    ctx.closePath();
    ctx.fill();
}
// Funktion, um Vögel zu zeichnen
function zeichneAlleVoegel(ctx) {
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.5 + canvas.height * 0.4; // Vögel im mittleren Bereich
        zeichneVoegel(ctx, x, y);
    }
}
// Einzelvogel zeichnen (Helferfunktion)
function zeichneVoegel(ctx, x, y) {
    // Körper (oval, waagerecht)
    ctx.beginPath();
    ctx.ellipse(x, y, 20, 10, 0, 0, Math.PI * 2); // radiusX=20, radiusY=10 (waagerecht)
    ctx.fillStyle = "brown";
    ctx.fill();
    ctx.closePath();
    // Kopf (Kreis)
    ctx.beginPath();
    ctx.arc(x + 15, y, 10, 0, Math.PI * 2); // Kopf leicht rechts des Körpers
    ctx.fillStyle = "brown";
    ctx.fill();
    ctx.closePath();
    // Flügel (Dreieck, angepasst an den Körper)
    ctx.beginPath();
    ctx.moveTo(x - 10, y - 5); // Obere Ecke des Dreiecks
    ctx.lineTo(x - 25, y); // Linke Ecke des Dreiecks
    ctx.lineTo(x - 10, y + 5); // Rechte Ecke des Dreiecks
    ctx.fillStyle = "darkbrown";
    ctx.fill();
    ctx.closePath();
    // Beine (Striche, angepasst an den Körper)
    ctx.beginPath();
    ctx.moveTo(x, y + 10); // Linkes Bein
    ctx.lineTo(x - 5, y + 20);
    ctx.moveTo(x + 10, y + 10); // Rechtes Bein
    ctx.lineTo(x + 15, y + 20);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}
// Funktion, um Schneeflocken zu zeichnen
function zeichneSchneeflocken(ctx) {
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 5 + 5; // Zufällige Größe zwischen 5 und 10
        const rotation = Math.random() * Math.PI; // Zufällige Rotation
        zeichneSchneekristall(ctx, x, y, size, rotation);
    }
}
// Funktion, um einen einzelnen Schneekristall zu zeichnen
function zeichneSchneekristall(ctx, x, y, size, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    // Kristallarme
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -size);
        ctx.stroke();
        // Verzweigungen an den Armen
        for (let j = 1; j <= 2; j++) {
            const branchSize = size / 3;
            const branchOffset = -size * (j / 3);
            ctx.beginPath();
            ctx.moveTo(0, branchOffset);
            ctx.lineTo(-branchSize, branchOffset - branchSize);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, branchOffset);
            ctx.lineTo(branchSize, branchOffset - branchSize);
            ctx.stroke();
        }
        ctx.rotate((Math.PI * 2) / 6); // Drehung für die nächsten Arm
    }
    ctx.restore();
}
// Funktion, um die Berge zu zeichnen
function zeichneBerge(ctx) {
    const bergFarben = ["#4B5320", "#6B8E23", "#8B4513"]; // verschiedene Farbtöne für die Berge
    // Berge im Hintergrund zeichnen
    for (let i = 0; i < 3; i++) {
        ctx.fillStyle = bergFarben[i % bergFarben.length]; // Farbwechsel für verschiedene Berge
        ctx.beginPath();
        // Wir zeichnen Berge mit spitzen Gipfeln
        ctx.moveTo(-100, canvas.height - (i * 100)); // Startpunkt der Linie
        ctx.lineTo(canvas.width * 0.4 + Math.random() * 200, canvas.height - (i * 100) - 150 + Math.random() * 50); // Linker Gipfel
        ctx.lineTo(canvas.width * 0.7 + Math.random() * 200, canvas.height - (i * 100) - 200 + Math.random() * 100); // Rechter Gipfel (spitz)
        ctx.lineTo(canvas.width + 100, canvas.height - (i * 100)); // Endpunkt der Linie
        ctx.closePath();
        ctx.fill();
    }
}
function zeichneSchneemann(ctx) {
    // Position des Schneemanns so setzen, dass er am unteren Rand erscheint
    const x = canvas.width * 0.2; // X-Position bleibt gleich
    const y = canvas.height - 40; // Y-Position so setzen, dass der Schneemann am unteren Rand erscheint
    // Körper
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2); // Unterkörper
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y - 60, 30, 0, Math.PI * 2); // Mittelteil
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y - 100, 20, 0, Math.PI * 2); // Kopf
    ctx.fill();
    // Augen (schwarze Kreise)
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x - 6, y - 105, 3, 0, Math.PI * 2); // Linkes Auge
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 6, y - 105, 3, 0, Math.PI * 2); // Rechtes Auge
    ctx.fill();
    // Nase (oranges Dreieck)
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(x, y - 100); // Spitze der Nase
    ctx.lineTo(x + 10, y - 95); // Rechte Kante
    ctx.lineTo(x, y - 90); // Untere Kante
    ctx.closePath();
    ctx.fill();
    // Mund (kleine schwarze Punkte)
    ctx.fillStyle = "black";
    for (let i = -10; i <= 10; i += 5) {
        ctx.beginPath();
        ctx.arc(x + i, y - 92, 2, 0, Math.PI * 2); // Punkte für den Mund
        ctx.fill();
    }
    // Hut (schwarzer Zylinder)
    ctx.fillStyle = "black";
    ctx.fillRect(x - 15, y - 130, 30, 20); // Zylinder
    ctx.fillRect(x - 25, y - 110, 50, 5); // Hutkrempe
    // Knöpfe (schwarze Kreise auf dem Mittelteil)
    for (let i = -40; i <= -20; i += 10) {
        ctx.beginPath();
        ctx.arc(x, y + i, 3, 0, Math.PI * 2); // Knopf
        ctx.fill();
    }
}
//# sourceMappingURL=haus.js.map