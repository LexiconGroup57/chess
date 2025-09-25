let newJSON = {
    "name": "John is \"funny\"",
    "age": 30.67,
    "cities": ["\\nFlen", null],
    "address": null,
    "isAlive": true,
    "principle": {
        "name": "John",
        "age": 30.67,
        "cities": ["Flen", null],
    }
}

// map
// spread
// destructuring

let testArray = ["Dog", "Cat", "Bird", "Caterpillar"];

let target = document.getElementById("board");
testArray.map(item => {
    let newElement = document.createElement("p");
    target.appendChild(newElement);
    newElement.textContent = item;
});

const keepPets = (pet1, pet2, pet3, pet4) => {
    console.log(pet1 + " " + pet2);
}

let copyArray = [...testArray];
copyArray[0] = "Dragon";

keepPets(...testArray);

let leftSide = "RightSide";
let [pet1, pet2, pet3, pet4] = testArray;

const returnTwo = () => {
    return ["Bob", () => { console.log("Bob")}];
}

let [first, second] = returnTwo();

export { keepPets, returnTwo}