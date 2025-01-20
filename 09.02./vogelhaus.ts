namespace Aufgabe9 {
  const canvas = document.getElementById("winterScene") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  let backgroundImage: ImageData;

  interface Movable {
    move(): void;
    draw(): void;
  }

  class Vogel implements Movable {
    x: number;
    y: number;
    vx: number;
    vy: number;
    type: "flying" | "pecking";

    constructor(x: number, y: number, type: "flying" | "pecking") {
      this.x = x;
      this.y = y;
      this.type = type;
      this.vx = type === "flying" ? Math.random() * 2 + 1 : 0;
      this.vy = 0;
    }

    move() {
      if (this.type === "flying") {
        this.x += this.vx;
        if (this.x > canvas.width) this.x = -20; // Wiederholender Flug
      } else {
        // Pecking Bewegung (leichtes Hüpfen)
        this.vy = Math.sin(Date.now() / 500) * 0.5;
      }
    }

    draw() {
      // Körper
      ctx.fillStyle = "brown";
      ctx.beginPath();
      ctx.ellipse(this.x, this.y + this.vy, 20, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      // Kopf
      ctx.beginPath();
      ctx.arc(this.x + 15, this.y - 5 + this.vy, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      // Schnabel
      ctx.fillStyle = "orange";
      ctx.beginPath();
      ctx.moveTo(this.x + 20, this.y - 5 + this.vy);
      ctx.lineTo(this.x + 30, this.y);
      ctx.lineTo(this.x + 20, this.y + 5 + this.vy);
      ctx.closePath();
      ctx.fill();
    }
  }

  class Schneeflocke implements Movable {
    x: number;
    y: number;
    size: number;
    speed: number;

    constructor(x: number, y: number, size: number, speed: number) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.speed = speed;
    }

    move() {
      this.y += this.speed;
      if (this.y > canvas.height) this.y = -this.size; // Wiederholendes Rutschen nach oben
    }

    draw() {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
  }

  const movableObjects: Movable[] = [];

  function init() {
    resizeCanvas();

    // Hintergrund zeichnen und speichern
    zeichneHintergrund();
    backgroundImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Vögel erzeugen und in `movableObjects` hinzufügen
    for (let i = 0; i < 10; i++) {
      const type = Math.random() > 0.5 ? "flying" : "pecking";
      const vogel = new Vogel(Math.random() * canvas.width, canvas.height * 0.7, type);
      movableObjects.push(vogel);
    }

    // Schneeflocken erzeugen und in `movableObjects` hinzufügen
    for (let i = 0; i < 100; i++) {
      const flocke = new Schneeflocke(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 3 + 2,
        Math.random() * 1 + 0.5
      );
      movableObjects.push(flocke);
    }

    animate();
  }

  function resizeCanvas() {
    const scale = window.devicePixelRatio || 1;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    canvas.width = window.innerWidth * scale;
    canvas.height = window.innerHeight * scale;
    ctx.scale(scale, scale);
  }

  function zeichneHintergrund() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "skyblue");
    gradient.addColorStop(1, "white");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    zeichneBerge();
    zeichneBaum();
    zeichneVogelhaus();
    zeichneSonne();
    zeichneWolken();
  }

  function zeichneBerge() {
    // Berge zeichnen
  }

  function zeichneBaum() {
    // Baum zeichnen
  }

  function zeichneVogelhaus() {
    // Vogelhaus zeichnen
  }

  function zeichneSonne() {
    // Sonne zeichnen
  }

  function zeichneWolken() {
    // Wolken zeichnen
  }

  function animate() {
    ctx.putImageData(backgroundImage, 0, 0); // Hintergrund wiederherstellen

    // Alle beweglichen Objekte bewegen und zeichnen
    for (let obj of movableObjects) {
      obj.move();
      obj.draw();
    }

    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener("resize", () => {
    resizeCanvas();
    zeichneHintergrund();
    backgroundImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  });

  init();
}

  