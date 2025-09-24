
let turn = 'w';

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

const checkPossibleMove = (move) => {
    if( move.oldRow === move.newRow && move.oldColumn === move.newColumn) return false;
    if (pieces[move.oldRow][move.oldColumn][0] !== turn) return false;

    let black = pieces[move.oldRow][move.oldColumn][0] === 'b';
    let white = pieces[move.oldRow][move.oldColumn][0] === 'w';
    let rowOne = move.oldRow === 1;
    let rowSix = move.oldRow === 6;
    let rowPlusTwo = move.newRow === 3;
    let rowMinusTwo = move.newRow === 4;
    let sameColumn = move.oldColumn === move.newColumn;
    let emptyTarget = pieces[move.newRow][move.newColumn] === 'n0';

    const determineClearLine = () => {
        return true;
    }
    switch(pieces[move.oldRow][move.oldColumn][1]){
        case '1':       // Rook
            return true;
        case '2':       // Knight
            return true;
        case '3':       // Bishop
            return true;
        case '4':       // Queen
            return true;
        case '5':       // King
            return true;
        case '6':       // Pawn
            if(((black && rowOne && rowPlusTwo) || (white && rowSix && rowMinusTwo)) && sameColumn && emptyTarget && determineClearLine()) return true;
            return false;
        default:
            return false;
    }
}

const movePlayer = (move) => {
    pieces[move.newRow][move.newColumn] = pieces[move.oldRow][move.oldColumn];
    pieces[move.oldRow][move.oldColumn] = 'n0';
}

document.getElementById("start").addEventListener('click', (e) => {
    regenerateBoard();
})

document.getElementById("move").addEventListener('submit', (e) => {
    e.preventDefault();
    let user =document.getElementById("positions").value;
    let positions = { 'oldRow': Number(user[0]), 'oldColumn': Number(user[1]), 'newRow': Number(user[2]), 'newColumn': Number(user[3]) };
    if (checkPossibleMove(positions)) {
        movePlayer(positions);
        regenerateBoard();
        turn = turn === 'w' ? 'b' : 'w';
    }

})
