"use strict";
// Define the Animal class
class Animal {
    name;
    type;
    sound;
    foodType;
    foodAmount;
    constructor(name, type, sound, foodType, foodAmount) {
        this.name = name;
        this.type = type;
        this.sound = sound;
        this.foodType = foodType;
        this.foodAmount = foodAmount;
    }
    sing() {
        return `${this.name} the ${this.type} sings: "Old MacDonald had a farm, E-I-E-I-O, and on that farm, he had a ${this.type}, E-I-E-I-O, with a ${this.sound} ${this.sound} here, and a ${this.sound} ${this.sound} there!"`;
    }
    eat(foodStock) {
        if (foodStock[this.foodType] >= this.foodAmount) {
            foodStock[this.foodType] -= this.foodAmount;
            return `${this.name} ate ${this.foodAmount} units of ${this.foodType}. Remaining ${this.foodType}: ${foodStock[this.foodType]}`;
        }
        else {
            return `Not enough ${this.foodType} for ${this.name}. ${this.foodType} left: ${foodStock[this.foodType]}`;
        }
    }
}
// Define food stock
let foodStock = {
    Grass: 100,
    Grains: 80,
    Meat: 50,
    Junk: 30
};
// Create animals
let animals = [
    new Animal("Daisy", "Cow", "Moo", "Grass", 10),
    new Animal("Rover", "Dog", "Woof", "Meat", 5),
    new Animal("Eddie", "Donkey", "Hee-Haw", "Grass", 8),
    new Animal("Clucky", "Chicken", "Cluck", "Grains", 3),
    new Animal("Piggy", "Pig", "Oink", "Junk", 7)
];
// Simulate one day on the farm
function simulateDay() {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "<h1>Farm Simulation</h1>";
    animals.forEach(animal => {
        let song = animal.sing();
        let eating = animal.eat(foodStock);
        outputDiv.innerHTML += `
            <h2>${animal.name} the ${animal.type}</h2>
            <p>${song}</p>
            <p>${eating}</p>
        `;
    });
    // Check for food restocking
    for (let food in foodStock) {
        if (foodStock[food] <= 10) {
            outputDiv.innerHTML += `<p>Warning: ${food} is running low. Please restock soon!</p>`;
        }
    }
}
// HTML setup
document.body.innerHTML = `
    <div>
        <button id="start-simulation">Start Simulation</button>
        <div id="output"></div>
    </div>
`;
// Add event listener to start the simulation
document.getElementById("start-simulation").addEventListener("click", simulateDay);
//# sourceMappingURL=farm.js.map