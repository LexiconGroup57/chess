
let startLine = false;
let continueLine = false;
let xOrigin = 0;
let yOrigin = 0;
let xCoordinate = 0;
let yCoordinate = 0;

let createSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
createSVG.setAttribute("width", window.innerWidth);
createSVG.setAttribute("height", window.innerHeight);
createSVG.setAttribute("id", "svg");
document.body.appendChild(createSVG);

const drawLine = () => {
    if (startLine && !continueLine){
        let createLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        createLine.setAttribute("x1", xOrigin);
        createLine.setAttribute("y1", yOrigin);
        createLine.setAttribute("x2", xCoordinate + 1);
        createLine.setAttribute("y2", yCoordinate + 1);
        createLine.setAttribute("class", "line");
        createLine.classList.add("color" + (Math.floor(Math.random() * 7) + 1));
        document.getElementById("svg").appendChild(createLine);
    } else if (continueLine) {
        let lineArray = document.getElementsByClassName("line");
        let createLine = lineArray[lineArray.length - 1];
        createLine.setAttribute("x2", xCoordinate);
        createLine.setAttribute("y2", yCoordinate);
    }
}

window.addEventListener("mousedown", (e) => {
    if(!startLine){
        startLine = true;
        xOrigin = e.pageX;
        yOrigin = e.pageY;
        xCoordinate = e.pageX + 1;
        yCoordinate = e.pageY + 1;
        drawLine();
    }

})

window.addEventListener("mousemove", (e) => {
    if(startLine){
        continueLine = true;
        xCoordinate = e.pageX;
        yCoordinate = e.pageY;
        drawLine();
    }

})

window.addEventListener("mouseup", (e) => {
    startLine = false;
    continueLine = false;
})