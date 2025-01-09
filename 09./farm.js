"use strict";
// Canvas setup
var Aufgabe91;
(function (Aufgabe91) {
    const canvas = document.getElementById("canvas");
    if (!canvas) {
        throw new Error("Canvas element not found!");
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("Canvas rendering context not found!");
    }
    const logContainer = document.getElementById("logContainer");
    if (!logContainer) {
        throw new Error("Log container not found!");
    }
    // Food storage
    let foodStock = {
        grass: 100,
        grains: 80,
        meat: 50,
        junk: 40,
    };
    // Animal class
    class Animal {
        name;
        type;
        food;
        foodAmount;
        sound;
        x;
        y;
        constructor(name, type, food, foodAmount, sound, x, y) {
            this.name = name;
            this.type = type;
            this.food = food;
            this.foodAmount = foodAmount;
            this.sound = sound;
            this.x = x;
            this.y = y;
        }
        draw() {
            if (!ctx)
                return; // Safety check in case ctx is null
            switch (this.type) {
                case "Cow":
                    this.drawCow();
                    break;
                case "Chicken":
                    this.drawChicken();
                    break;
                case "Dog":
                    this.drawDog();
                    break;
                case "Horse":
                    this.drawHorse();
                    break;
                case "Pig":
                    this.drawPig();
                    break;
            }
        }
        sing() {
            return `Old MacDonald has a ${this.type}, ${this.sound} ${this.sound}!`;
        }
        eat() {
            if (foodStock[this.food] >= this.foodAmount) {
                foodStock[this.food] -= this.foodAmount;
            }
            else {
                logContainer.innerHTML += `<p>${this.name} couldn't eat enough ${this.food}!</p>`;
            }
        }
        drawCow() {
            ctx.fillStyle = "brown";
            ctx.fillRect(this.x, this.y, 60, 40); // Body
            ctx.fillStyle = "black";
            ctx.fillRect(this.x + 10, this.y + 40, 10, 20); // Legs
            ctx.fillRect(this.x + 40, this.y + 40, 10, 20);
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(this.x + 30, this.y - 10, 15, 0, Math.PI * 2); // Head
            ctx.fill();
        }
        drawChicken() {
            ctx.fillStyle = "yellow";
            ctx.fillRect(this.x, this.y, 30, 20); // Body
            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.arc(this.x + 15, this.y - 10, 10, 0, Math.PI * 2); // Head
            ctx.fill();
        }
        drawDog() {
            ctx.fillStyle = "brown";
            ctx.fillRect(this.x, this.y, 50, 30); // Body
            ctx.fillStyle = "black";
            ctx.fillRect(this.x + 10, this.y + 30, 10, 20); // Front leg
            ctx.fillRect(this.x + 30, this.y + 30, 10, 20); // Back leg
            ctx.fillStyle = "gray";
            ctx.beginPath();
            ctx.arc(this.x + 25, this.y - 10, 12, 0, Math.PI * 2); // Head
            ctx.fill();
        }
        drawHorse() {
            ctx.fillStyle = "brown";
            ctx.fillRect(this.x, this.y, 70, 40); // Body
            ctx.fillStyle = "black";
            ctx.fillRect(this.x + 10, this.y + 40, 10, 20); // Legs
            ctx.fillRect(this.x + 50, this.y + 40, 10, 20);
            ctx.fillStyle = "darkbrown";
            ctx.beginPath();
            ctx.arc(this.x + 35, this.y - 15, 20, 0, Math.PI * 2); // Head
            ctx.fill();
        }
        drawPig() {
            ctx.fillStyle = "pink";
            ctx.fillRect(this.x, this.y, 50, 30); // Body
            ctx.fillStyle = "purple";
            ctx.fillRect(this.x + 10, this.y + 30, 10, 15); // Front leg
            ctx.fillRect(this.x + 30, this.y + 30, 10, 15); // Back leg
            ctx.beginPath();
            ctx.arc(this.x + 25, this.y - 10, 15, 0, Math.PI * 2); // Head
            ctx.fill();
        }
    }
    // Initialize animals
    const animals = [
        new Animal("Daisy", "Cow", "grass", 20, "Moo", 100, 300),
        new Animal("Clucky", "Chicken", "grains", 5, "Cluck", 200, 400),
        new Animal("Rover", "Dog", "meat", 10, "Woof", 300, 300),
        new Animal("Eddie", "Horse", "grass", 30, "Neigh", 400, 200),
        new Animal("Porky", "Pig", "junk", 15, "Oink", 500, 350),
    ];
    // Simulation
    animals.forEach((animal) => {
        animal.draw();
        const song = animal.sing();
        logContainer.innerHTML += `<h3>${animal.name}</h3><p>${song}</p>`;
        animal.eat();
        logContainer.innerHTML += `<p>Remaining ${animal.food}: ${foodStock[animal.food]}</p>`;
    });
})(Aufgabe91 || (Aufgabe91 = {}));
//# sourceMappingURL=farm.js.map