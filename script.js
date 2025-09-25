
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
    let rowPlusTwo = move.newRow === move.oldRow + 2;
    let rowPlusOne = move.newRow === move.oldRow + 1;
    let rowMinusTwo = move.newRow === move.oldRow - 2;
    let rowMinusOne = move.newRow === move.oldRow - 1;
    let sameColumn = move.oldColumn === move.newColumn;
    let emptyTarget = pieces[move.newRow][move.newColumn] === 'n0';
    let whiteTarget = pieces[move.newRow][move.newColumn][0] === 'w';
    let blackTarget = pieces[move.newRow][move.newColumn][0] === 'b';
    let nextColumn = move.newColumn === move.oldColumn + 1 || move.newColumn === move.oldColumn - 1;
    let nextRow = rowPlusOne || rowMinusOne;
    let perpendicular = move.newRow === move.oldRow || move.newColumn === move.oldColumn;
    let match = (black && (emptyTarget || whiteTarget)) || (white && (emptyTarget || blackTarget));
    let diagonal = Math.abs(move.newRow - move.oldRow) === Math.abs(move.newColumn - move.oldColumn);
    let sameRow = move.oldRow === move.newRow;
    let neighbour = (sameColumn && (rowMinusOne || rowPlusOne || sameRow)) || (nextColumn && (rowMinusOne || rowPlusOne || sameRow));
    let nextSecondColumn = move.newColumn === move.oldColumn + 2 || move.newColumn === move.oldColumn - 2;
    let knightMove = (nextColumn && (rowMinusTwo || rowPlusTwo)) || (nextRow && nextSecondColumn);

    const determineClearLine = () => {
        if(!(perpendicular || diagonal )) return false;
        let steps = Math.abs(move.newRow - move.oldRow);
        let rowMultiplier = move.newRow === move.oldRow ? 0 : move.newRow > move.oldRow ? 1 : -1;
        let columnMultiplier = move.newColumn === move.oldColumn ? 0 : move.newColumn > move.oldColumn ? 1 : -1;
        for(let i = 1; i < steps; i++){
            if(pieces[move.oldRow + i * rowMultiplier][move.oldColumn + i * columnMultiplier] !== 'n0') return false;
        }
        return true;
    }
    switch(pieces[move.oldRow][move.oldColumn][1]){
        case '1':       // Rook
            return (match && perpendicular && determineClearLine());
        case '2':       // Knight
            return (match && knightMove);
        case '3':       // Bishop
            return (match && diagonal && determineClearLine());
        case '4':       // Queen
            return (match && (diagonal || perpendicular) && determineClearLine());
        case '5':       // King
            return (match && neighbour);
        case '6':       // Pawn
            if(((black && rowOne && rowPlusTwo) || (white && rowSix && rowMinusTwo)) && sameColumn && emptyTarget && determineClearLine()) return true;
            if(((black && rowPlusOne) || (white && rowMinusOne)) && sameColumn && emptyTarget) return true;
            return (((black && rowPlusOne && whiteTarget) || (white && rowMinusOne && blackTarget)) && nextColumn);
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
