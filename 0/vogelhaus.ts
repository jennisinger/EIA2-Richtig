
const canvas1 = document.getElementById("winterScene") as HTMLCanvasElement;
const ctx1 = canvas.getContext("2d");

// Funktion, um die Größe des Canvas dynamisch anzupassen
function resizeCanvas(): void {
    const scale = window.devicePixelRatio || 1; // Hohe Auflösung für Retina-Displays
    canvas.width = window.innerWidth * scale;
    canvas.height = window.innerHeight * scale;
    ctx?.scale(scale, scale); // Kontext skalieren für klare Darstellung
}

// Event-Listener für Größenänderung des Fensters
window.addEventListener("resize", () => {
    resizeCanvas();
    zeichneSzene1();
});

// Initiale Anpassung und Zeichnung
resizeCanvas();
zeichneSzene1();

function zeichneSzene1(): void {
    if (!ctx) return;
if (ctx) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    zeichneHintergrund(ctx);
    zeichneSonne(ctx);
    zeichneWolken(ctx);
    zeichneBerge(ctx);
    zeichneBaum(ctx);
    zeichneAlleVoegel(ctx);
    zeichneSchneeflocken(ctx);
    zeichneSchneemann(ctx);
    zeichneVogelhaus(ctx);
} else {
    console.error("CanvasRenderingContext2D konnte nicht initialisiert werden.");
}
}

// Funktion, um den Hintergrund zu zeichnen
function zeichneHintergrund(ctx: CanvasRenderingContext2D): void {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "skyblue");
    gradient.addColorStop(1, "white");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function zeichneVogelhaus(ctx: CanvasRenderingContext2D): void {
    // Vogelhaus (rechteckig)
    const hausBreite = 100;
    const hausHöhe = 150;
    const hausX = canvas.width / 2 - hausBreite / 2;
    const hausY = canvas.height - hausHöhe - 15; 

    // Hauskörper
    ctx.fillStyle = "brown";
    ctx.fillRect(hausX, hausY, hausBreite, hausHöhe);

    // Dach des Vogelhauses (Dreieck)
    ctx.fillStyle = "brown";
    ctx.beginPath();
    ctx.moveTo(hausX - 20, hausY); // linke untere Ecke
    ctx.lineTo(hausX + hausBreite + 20, hausY); // rechte untere Ecke
    ctx.lineTo(hausX + hausBreite / 2, hausY - 50); // Spitze des Daches
    ctx.closePath();
    ctx.fill();

    // Kreis als Eingang (in der Mitte des Hauses)
    ctx.fillStyle = "black"; 
    ctx.beginPath();
    ctx.arc(hausX + hausBreite / 2, hausY + hausHöhe / 2, 20, 0, Math.PI * 2); // Kreis in der Mitte des Hauses
    ctx.fill();
    ctx.closePath();

    // Standfuß des Vogelhauses (rechteckig)
    const standfußBreite = 20;
    const standfußHöhe = 100;
    const standfußX = canvas.width / 2 - standfußBreite / 2;
    const standfußY = hausY + hausHöhe;

    ctx.fillStyle = "brown";
    ctx.fillRect(standfußX, standfußY, standfußBreite, standfußHöhe); // Standfuß des Vogelhauses

    // Sockel des Standfußes (unterhalb des Vogelhauses)
    const sockelBreite = 60;
    const sockelHöhe = 10;
    const sockelX = canvas.width / 2 - sockelBreite / 2;
    const sockelY = standfußY + standfußHöhe;

    ctx.fillStyle = "brown";
    ctx.fillRect(sockelX, sockelY, sockelBreite, sockelHöhe); // Sockel
}


// Funktion, um Vögel zu zeichnen
function zeichneAlleVoegel(ctx: CanvasRenderingContext2D): void {
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.5 + canvas.height * 0.4; // Vögel im mittleren Bereich
        zeichneVoegel(ctx, x, y);
    }
}

// Einzelvogel zeichnen (Helferfunktion)
function zeichneVoegel(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    // Zufällige Farbe für den Körper
    const bodyandHeadColor = getRandomColor();
    // Zufällige Farbe für die Flügel
    const wingColor = getRandomColor();
    // Zufällige Farbe für die Beine
    const legColor = getRandomColor();

    // Körper (oval, waagerecht)
    ctx.beginPath();
    ctx.ellipse(x, y, 20, 10, 0, 0, Math.PI * 2); // radiusX=20, radiusY=10 (waagerecht)
    ctx.fillStyle = bodyandHeadColor;
    ctx.fill();
    ctx.closePath();

    // Kopf (Kreis)
    ctx.beginPath();
    ctx.arc(x + 15, y, 10, 0, Math.PI * 2); // Kopf leicht rechts des Körpers
    ctx.fillStyle = bodyandHeadColor;
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, y - 5); // Obere Ecke des Flügels in der Mitte des Ovals
    ctx.lineTo(x - 15, y); // Linke Ecke des Dreiecks
    ctx.lineTo(x, y + 5); // Rechte Ecke des Dreiecks
    ctx.fillStyle = wingColor;
    ctx.fill();
    ctx.closePath();

    // Beine (Striche, angepasst an den Körper)
    ctx.beginPath();
    ctx.moveTo(x, y + 10); // Linkes Bein
    ctx.lineTo(x - 5, y + 20);
    ctx.moveTo(x + 10, y + 10); // Rechtes Bein
    ctx.lineTo(x + 15, y + 20);
    ctx.strokeStyle = legColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

// Funktion, um eine zufällige Farbe zu generieren
function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Funktion, um Schneeflocken zu zeichnen
function zeichneSchneeflocken(ctx: CanvasRenderingContext2D): void {
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 5 + 5; // Zufällige Größe zwischen 5 und 10
        const rotation = Math.random() * Math.PI; // Zufällige Rotation

        zeichneSchneekristall(ctx, x, y, size, rotation);
    }
}

// Funktion, um einen einzelnen Schneekristall zu zeichnen
function zeichneSchneekristall(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number): void {
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
function zeichneBerge(ctx: CanvasRenderingContext2D): void {
    const bergFarben = ["#4B5320", "#6B8E23", "#8B4513"]; // Verschiedene Farbtöne für die Berge

    let startX = -200; // Startposition für den ersten Berg

    // Wir erstellen 5 Berge nebeneinander
    for (let i = 0; i < 5; i++) {
        ctx.fillStyle = bergFarben[i % bergFarben.length]; // Farbwechsel für verschiedene Berge

        ctx.beginPath();
        // Zufällige Gipfelhöhe und Positionen für jeden Berg
        const randomHeight = Math.random() * 100 + 100; // Gipfelhöhe zufällig
        const randomOffset = Math.random() * 50 - 25; // Kleine zufällige Verschiebung für die Gipfel
        const peakX = startX + 200 + randomOffset; // X-Position des Gipfels
        const peakY = canvas.height - randomHeight; // Y-Position des Gipfels

        ctx.moveTo(startX, canvas.height); // Startpunkt auf der unteren Linie

        // Erstelle den linken Gipfel
        ctx.lineTo(peakX, peakY);
        
        // Erstelle den rechten Gipfel
        ctx.lineTo(startX + 400 + randomOffset, canvas.height); 

        ctx.closePath();
        ctx.fill();
        

        // Verschiebe die Startposition für den nächsten Berg (Überlappung)
        startX += 400 + randomOffset;
    }
}

function zeichneSchneemann(ctx: CanvasRenderingContext2D): void {
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
    ctx.fillRect(x - 25, y - 110, 50, 5);  // Hutkrempe

    // Knöpfe (schwarze Kreise auf dem Mittelteil)
    for (let i = -40; i <= -20; i += 10) {
        ctx.beginPath();
        ctx.arc(x, y + i, 3, 0, Math.PI * 2); // Knopf
        ctx.fill();
    }
}

function zeichneWolken(ctx: CanvasRenderingContext2D): void {
    // Wolkenpositionen
    const wolkenPositionen = [
        { x: 200, y: 150 },
        { x: 400, y: 100 },
        { x: 600, y: 180 }
    ];

    ctx.fillStyle = "white";
    wolkenPositionen.forEach(pos => {
        ctx.beginPath(); // Starte einen neuen Pfad für die gesamte Wolke
        ctx.ellipse(pos.x, pos.y, 50, 30, 0, 0, Math.PI * 2); // Hauptwolke
        ctx.ellipse(pos.x - 30, pos.y + 10, 40, 25, 0, 0, Math.PI * 2); // Linke Wolke
        ctx.ellipse(pos.x + 30, pos.y + 10, 40, 25, 0, 0, Math.PI * 2); // Rechte Wolke
        ctx.fill(); // Fülle die gesamte Wolke
        ctx.closePath(); // Schließe den Pfad
    });
}
function zeichneBaum(ctx: CanvasRenderingContext2D): void {
    // Baumpositionen entlang der x-Achse
    const baumPositionen = [
        { x: 100 },
        { x: 300 },
        { x: 500 },
        { x: 700 }
    ];

    baumPositionen.forEach(pos => {
        const boden = canvas.height; // Unterkante des Canvas als Referenz

        // Stamm
        ctx.fillStyle = "brown";
        ctx.fillRect(pos.x - 10, boden - 40, 20, 40); // Positionierung am Boden

        // Baumkronen (Dreiecke)
        ctx.fillStyle = "green";

        // Unterstes Dreieck
        ctx.beginPath();
        ctx.moveTo(pos.x - 30, boden - 40); // Linke untere Ecke
        ctx.lineTo(pos.x + 30, boden - 40); // Rechte untere Ecke
        ctx.lineTo(pos.x, boden - 100); // Spitze
        ctx.closePath();
        ctx.fill();

        // Mittleres Dreieck
        ctx.beginPath();
        ctx.moveTo(pos.x - 25, boden - 70); // Linke untere Ecke
        ctx.lineTo(pos.x + 25, boden - 70); // Rechte untere Ecke
        ctx.lineTo(pos.x, boden - 120); // Spitze
        ctx.closePath();
        ctx.fill();

        // Oberstes Dreieck
        ctx.beginPath();
        ctx.moveTo(pos.x - 20, boden - 100); // Linke untere Ecke
        ctx.lineTo(pos.x + 20, boden - 100); // Rechte untere Ecke
        ctx.lineTo(pos.x, boden - 140); // Spitze
        ctx.closePath();
        ctx.fill();
    });
}
function zeichneSonne(ctx: CanvasRenderingContext2D): void {
    // Sonne (Kreis oben rechts)
    const sonnenRadius = 50;
    const sonnenX = canvas.width - 100;
    const sonnenY = 100;

    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(sonnenX, sonnenY, sonnenRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}
