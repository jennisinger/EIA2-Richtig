namespace Aufgabe10{

        const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
        if (!canvas) {
            throw new Error("Canvas element not found!");
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Canvas rendering context not found!");
        }
    
        const logContainer = document.getElementById("logContainer") as HTMLDivElement | null;
        if (!logContainer) {
            throw new Error("Log container not found!");
        }
    
        // Food storage
        let foodStock: { [key: string]: number } = {
            grass: 100,
            grains: 80,
            meat: 50,
            junk: 40,
        };
    
        // Animal base class
        class Animal {
            name: string;
            type: string;
            food: string;
            foodAmount: number;
            sound: string;
            x: number;
            y: number;
    
            constructor(name: string, type: string, food: string, foodAmount: number, sound: string, x: number, y: number) {
                this.name = name;
                this.type = type;
                this.food = food;
                this.foodAmount = foodAmount;
                this.sound = sound;
                this.x = x;
                this.y = y;
            }
    
            draw(): void {
                // Default behavior; should be overridden in subclasses if needed
            }
    
            sing(): string {
                return `Old MacDonald has a ${this.type}, ${this.sound} ${this.sound}!`;
            }
    
            eat(): void {
                if (foodStock[this.food] >= this.foodAmount) {
                    foodStock[this.food] -= this.foodAmount;
                } else {
                    logContainer!.innerHTML += `<p>${this.name} couldn't eat enough ${this.food}!</p>`;
                }
            }
    
            doSpecialAction(): void {
                logContainer!.innerHTML += `<p>${this.name} did something special!</p>`;
            }
        }
    
        // Subclasses with specific actions and drawings
        class Cow extends Animal {
            constructor(name: string, x: number, y: number) {
                super(name, "Cow", "grass", 20, "Moo", x, y);
            }
    
            draw(): void {
                ctx!.fillStyle = "brown";
                ctx!.fillRect(this.x, this.y, 60, 40); // Body
                ctx!.fillStyle = "black";
                ctx!.fillRect(this.x + 10, this.y + 40, 10, 20); // Legs
                ctx!.fillRect(this.x + 40, this.y + 40, 10, 20);
                ctx!.fillStyle = "white";
                ctx!.beginPath();
                ctx!.arc(this.x + 30, this.y - 10, 15, 0, Math.PI * 2); // Head
                ctx!.fill();
            }
    
            doSpecialAction(): void {
                logContainer!.innerHTML += `<p>${this.name} gave fresh milk today!</p>`;
            }
        }
    
        class Chicken extends Animal {
            constructor(name: string, x: number, y: number) {
                super(name, "Chicken", "grains", 5, "Cluck", x, y);
            }
    
            draw(): void {
                ctx!.fillStyle = "yellow";
                ctx!.fillRect(this.x, this.y, 30, 20); // Body
                ctx!.fillStyle = "orange";
                ctx!.beginPath();
                ctx!.arc(this.x + 15, this.y - 10, 10, 0, Math.PI * 2); // Head
                ctx!.fill();
            }
    
            doSpecialAction(): void {
                logContainer!.innerHTML += `<p>${this.name} laid a golden egg!</p>`;
            }
        }
    
        class Dog extends Animal {
            constructor(name: string, x: number, y: number) {
                super(name, "Dog", "meat", 10, "Woof", x, y);
            }
    
            draw(): void {
                ctx!.fillStyle = "brown";
                ctx!.fillRect(this.x, this.y, 50, 30); // Body
                ctx!.fillStyle = "black";
                ctx!.fillRect(this.x + 10, this.y + 30, 10, 20); // Front leg
                ctx!.fillRect(this.x + 30, this.y + 30, 10, 20); // Back leg
                ctx!.fillStyle = "gray";
                ctx!.beginPath();
                ctx!.arc(this.x + 25, this.y - 10, 12, 0, Math.PI * 2); // Head
                ctx!.fill();
            }
    
            doSpecialAction(): void {
                logContainer!.innerHTML += `<p>${this.name} chased away a fox!</p>`;
            }
        }
    
        class Horse extends Animal {
            constructor(name: string, x: number, y: number) {
                super(name, "Horse", "grass", 30, "Neigh", x, y);
            }
    
            draw(): void {
                ctx!.fillStyle = "brown";
                ctx!.fillRect(this.x, this.y, 70, 40); // Body
                ctx!.fillStyle = "black";
                ctx!.fillRect(this.x + 10, this.y + 40, 10, 20); // Legs
                ctx!.fillRect(this.x + 50, this.y + 40, 10, 20);
                ctx!.fillStyle = "darkbrown";
                ctx!.beginPath();
                ctx!.arc(this.x + 35, this.y - 15, 20, 0, Math.PI * 2); // Head
                ctx!.fill();
            }
    
            doSpecialAction(): void {
                logContainer!.innerHTML += `<p>${this.name} plowed the field!</p>`;
            }
        }
    
        class Pig extends Animal {
            constructor(name: string, x: number, y: number) {
                super(name, "Pig", "junk", 15, "Oink", x, y);
            }
    
            draw(): void {
                ctx!.fillStyle = "pink";
                ctx!.fillRect(this.x, this.y, 50, 30); // Body
                ctx!.fillStyle = "purple";
                ctx!.fillRect(this.x + 10, this.y + 30, 10, 15); // Front leg
                ctx!.fillRect(this.x + 30, this.y + 30, 10, 15); // Back leg
                ctx!.beginPath();
                ctx!.arc(this.x + 25, this.y - 10, 15, 0, Math.PI * 2); // Head
                ctx!.fill();
            }
    
            doSpecialAction(): void {
                logContainer!.innerHTML += `<p>${this.name} rolled in the mud!</p>`;
            }
        }
    
        // Initialize animals
        const animals: Animal[] = [
            new Cow("Daisy", 100, 300),
            new Chicken("Clucky", 200, 400),
            new Dog("Rover", 300, 300),
            new Horse("Eddie", 400, 200),
            new Pig("Porky", 500, 350),
        ];
    
        // Simulation
        animals.forEach((animal) => {
            animal.draw();
            const song = animal.sing();
            logContainer!.innerHTML += `<h3>${animal.name}</h3><p>${song}</p>`;
            animal.eat();
            logContainer!.innerHTML += `<p>Remaining ${animal.food}: ${foodStock[animal.food]}</p>`;
            animal.doSpecialAction();
        });
    }
    