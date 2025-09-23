
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

const regenerateBoard = () => {
    let board = document.getElementById("board");
    board.innerHTML = '';
    for (let k = 0; k < 8; k++){
        for (let m = 0; m < 8; m++){
            let newElement = document.createElement("div");

            k % 2 === m % 2 ? newElement.classList.add("white", pieces[k][m]) : newElement.classList.add("black", pieces[k][m]);
            board.appendChild(newElement);
        }
    }
}

const movePlayer = (positions) => {
    console.log(positions);
    pieces[positions.newRow][positions.newColumn] = pieces[positions.oldRow][positions.oldColumn];
    pieces[positions.oldRow][positions.oldColumn] = 'n0';
}

document.getElementById("start").addEventListener('click', (e) => {
    regenerateBoard();
})

document.getElementById("move").addEventListener('submit', (e) => {
    e.preventDefault();
    let user =document.getElementById("positions").value;
    let positions = { 'oldRow': Number(user[0]), 'oldColumn': Number(user[1]), 'newRow': Number(user[2]), 'newColumn': Number(user[3]) };
    movePlayer(positions);
    regenerateBoard();
})
