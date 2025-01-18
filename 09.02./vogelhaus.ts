namespace Aufgabe9 {
    const canvas = document.getElementById("winterScene") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    let backgroundImage: ImageData;
  
    class Vogel {
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
  
      update() {
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
  
    class Schneeflocke {
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
  
      update() {
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
  
    const voegel: Vogel[] = [];
    const schneeflocken: Schneeflocke[] = [];
  
    function init() {
      resizeCanvas();
  
      // Hintergrund zeichnen und speichern
      zeichneHintergrund();
      backgroundImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
      // Vögel erzeugen
      for (let i = 0; i < 10; i++) {
        const type = Math.random() > 0.5 ? "flying" : "pecking";
        voegel.push(new Vogel(Math.random() * canvas.width, canvas.height * 0.7, type));
      }
  
      // Schneeflocken erzeugen
      for (let i = 0; i < 100; i++) {
        schneeflocken.push(
          new Schneeflocke(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 3 + 2,
            Math.random() * 1 + 0.5
          )
        );
      }
  
      animate();
    }
  
    function resizeCanvas() {
      const scale = window.devicePixelRatio || 1;
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
      // (wie vorher)
    }
  
    function zeichneBaum() {
      // (wie vorher)
    }
  
    function zeichneVogelhaus() {
      // (wie vorher)
    }
  
    function zeichneSonne() {
      // (wie vorher)
    }
  
    function zeichneWolken() {
      // (wie vorher)
    }
  
    function animate() {
      ctx.putImageData(backgroundImage, 0, 0); // Hintergrund wiederherstellen
  
      // Schneeflocken zeichnen
      schneeflocken.forEach(flocke => {
        flocke.update();
        flocke.draw();
      });
  
      // Vögel zeichnen
      voegel.forEach(vogel => {
        vogel.update();
        vogel.draw();
      });
  
      requestAnimationFrame(animate);
    }
  
    window.addEventListener("resize", () => {
      resizeCanvas();
      zeichneHintergrund();
      backgroundImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    });
  
    init();
  }
  