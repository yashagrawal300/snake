let lastTime=0;
const SPEED=5;
const gameBoard=document.getElementById("game-board");
const body=[
  {x:11,y:11}
];
let dxn = {x: 0 , y: 0};
let food={x:10,y:4};
const EXP_RATE=1;
let gameLose=false;
const b=document.getElementById("sc");


window.addEventListener('keydown',e=> {
  switch(e.key){
    case 'ArrowUp':
    if(dxn.y==1) break;
      dxn={x:0,y:-1};
      break;
    case 'ArrowLeft':
    if(dxn.x==1) break;
      dxn={x:-1,y:0};
      break;
    case 'ArrowDown':
    if(dxn.y==-1) break;
      dxn={x:0,y:1};
      break;
    case 'ArrowRight':
    if(dxn.x==-1) break;
      dxn={x:1,y:0};
      break;
  }
});
let score=0;

function main(currentTime) {
  if(gameLose){
    if(confirm(`Game Lose Score:${score}`)){
      window.location = '/';
      location.reload;
    }
    return;
  }
  window.requestAnimationFrame(main);

  const timeHeld=(currentTime-lastTime)/1000;
  if(timeHeld<1/SPEED){
    return;
  }
  lastTime=currentTime;
  update();
  draw(gameBoard);
}

window.requestAnimationFrame(main);


function update() {
  updateSnake();
  updateFood();
}
function draw(gameBoard){
  gameBoard.innerHTML="";
  drawSnake(gameBoard);
  drawFood(gameBoard);
  showScore(b);
}

function drawSnake(gameBoard) {
  body.forEach(segment=>{
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart=segment.y;
    snakeElement.style.gridColumnStart=segment.x;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  });
}

function updateSnake(){
  for(let i=body.length-2;i>=0;i--){
    body[i+1]={...body[i]};
  }
  body[0].x+=dxn.x;
  body[0].y+=dxn.y;
  checkDeath();
}

function drawFood(gameBoard){
  const foodBody = document.createElement('div');
  foodBody.style.gridRowStart = food.y;
  foodBody.style.gridColumnStart = food.x;
  foodBody.classList.add('food');
  gameBoard.appendChild(foodBody);
}


function updateFood(){
  if(food.x==body[0].x && food.y==body[0].y){
    expandSnake(EXP_RATE);
    score+=1;
    food=getNewPosition();
  }
}
function expandSnake(rate){
  for(let i=0;i<rate;i++){
    body.push({...body[length-1]});
  }
}


function getNewPosition(){
  let newPos;
  while(newPos==null || onSnake(newPos)){
    newPos= randomGridPosition();
  }
  return newPos;
}

function randomGridPosition(){
  return {
    x:Math.floor(Math.random()*21)+1,
    y:Math.floor(Math.random()*21)+1
  }
}
function onSnake(pos){
  body.forEach((segment) => {
    if(pos.x==segment.x && pos.y==segment.y){
      return true;
    }
  });
  return false;

}


function checkDeath() {
  if(body[0].x==0 || body[0].x==22){
    gameLose=true;
  }
  if(body[0].y==0 || body[0].y==22){
    gameLose=true;
  }
  for(let i=1;i<body.length;i++){
    if(body[0].x==body[i].x && body[0].y==body[i].y){
      gameLose=true;
      break;
    }
  }
}

function showScore(b){
  b.innerHTML="";
  const snake = document.createElement('H1');
  snake.innerText="SNAKE";
  b.appendChild(snake);
  const s=document.createElement('H3');
  s.innerText=`SCORE   :   ${score}`;
  b.appendChild(s);
}
