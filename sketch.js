let grid =[];
let step;
let rows = 50;
let cols = 50;
let btn;
let rowno;
function setup(){
  createCanvas(800, 800);
  background(51);
  rowno = document.getElementById("mysize");
  rowno.placeholder = rows;
  step = floor(width / rows);
  grid = createGrid(rows, cols, step);
  btn = document.getElementById("clearGrid");
  btn.onclick = function(){
    let rownovalue = parseInt(rowno.value);
    if(rownovalue){
      rows = cols = rownovalue;
    } else {
      rows = cols = 50;
    }
    step = floor(width / rows);
    grid = createGrid(rows, cols, step);
  }
}

function draw(){
  for(let g of grid){
       g.show();
  }
}

function createGrid(rows, cols ,step){
  let grid = [];
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
      grid.push(new Cell(j * step, i * step, step));
    }
  }

  grid[(cols - 1) * rows].filled = true;
  grid[(cols - 1) * rows + 1].filled = true;
  grid[(cols - 2) * rows].filled = true;

  return grid;
}


function mousePressed(){
  let col = floor(mouseX / step);
  let row = floor(mouseY /step);
  let index = row * rows + col;
  if(grid[index].filled){
    // upper cell index
    let indexUp = (row - 1) * rows + col;
    let indexNext = row * rows + col + 1;
    if(!grid[indexUp].filled && !grid[indexNext].filled){
      grid[index].togglefillCell();
      grid[indexUp].togglefillCell();
      grid[indexNext].togglefillCell();
    }
  }
}

function Cell(x, y, side){
  this.x = x;
  this.y = y;
  this.side = side
  this.filled = false;
  this.show = function(){
    rectMode(CORNER); // Default rectMode is CORNER
    let filling = this.filled ? 255 : 51;
    fill(filling);
    stroke(255);
    strokeWeight(2);
    rect(this.x, this.y, side, side);
  }

  this.togglefillCell = function(){
    this.filled = this.filled ? false : true;
  }
}
