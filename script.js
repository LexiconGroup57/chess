
let pieces = [
    ['b1', 'b2', 'b3', 'b4', 'b5', 'b3', 'b2', 'b1'],
    ['b6', 'b6', 'b6', 'b6', 'b6', 'b6', 'b6', 'b6'],
    ['n0', 'n0', 'n0', 'n0', 'n0', 'n0', 'n0', 'n0'],
    ['n0', 'n0', 'n0', 'n0', 'n0', 'n0', 'n0', 'n0'],
    ['n0', 'n0', 'n0', 'n0', 'n0', 'n0', 'n0', 'n0'],
    ['n0', 'n0', 'n0', 'n0', 'n0', 'n0', 'n0', 'n0'],
    ['w6', 'w6', 'w6', 'w6', 'w6', 'w6', 'w6', 'w6'],
    ['w1', 'w2', 'w3', 'w4', 'w5', 'w3', 'w2', 'w1'],
]

let board = document.getElementById("board");
for (let k = 0; k < 8; k++){
    for (let m = 0; m < 8; m++){
        let newElement = document.createElement("div");

        k % 2 === m % 2 ? newElement.classList.add("white", pieces[k][m]) : newElement.classList.add("black", pieces[k][m]);
        board.appendChild(newElement);
    }

}



