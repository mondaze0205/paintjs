const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
//context는 canvas 안에서 픽셀를 다루는 것
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

//pixel modifier에 사이즈 주기 
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle="white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; //두께 정하기 (선의너비)
// ctx.fillStyle = "green";
// ctx.fillRect(50,20,100,49);

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){ //마우스를 움직이는 내내 실행
    //console.log(event);
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){ // painting ===false / !painting은 !false(true) 
        ctx.beginPath(); //path는 선(경로를 만든다)
        ctx.moveTo(x,y); //선 시작 좌표
    }else{
        ctx.lineTo(x,y); //전 위치에서 지금 위치까지 선을 만듦 (그린다) 선 끝 좌표
        ctx.stroke(); //선 그리기 
    }
}

// function onMouseDown(event){
//     painting = true;
// }

// function onMouseUp(event){
//     stopPainting();
// }

//캔버스로 들어왔을때 시작점 위치 변경
function onMouseEnter(event){
    x = event.offsetX;
    y = event.offsetY;

    ctx.moveTo(x,y);
}

//컬러 지정하기 
function handleColorClick(event){
    //console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    //console.log(color)
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = (event.target.value);
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else {
        filling = true;
        mode.innerText = "Paint";
        // ctx.fillStyle = ctx.strokeStyle;
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨 ]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    //canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("mouseenter", onMouseEnter);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}


//console.log(Array.from(colors));
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}