const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('color');
const range = document.getElementById('range');
const fill = document.getElementById('fill');
const save = document.getElementById('save');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

const clear = document.getElementById('clear');

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = 'INITIAL_COLOR';
ctx.fillStyle = 'INITIAL_COLOR';
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting(event) {
  if (event.which != 1) {
    return false;
  } else painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function changeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function rangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function fillClick() {
  if (filling === true) {
    filling = false;
    fill.innerText = 'FILL';
  } else {
    filling = true;
    fill.innerText = 'PAINT';
  }
}

function canvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function canvasRightClick(event) {
  event.preventDefault();
}

function saveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = image;
  link.download = 'untitle';
  link.click();
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', canvasClick);
  canvas.addEventListener('contextmenu', canvasRightClick);
}

Array.from(colors).forEach((color) =>
  color.addEventListener('click', changeColor)
);

if (range) {
  range.addEventListener('input', rangeChange);
}

if (fill) {
  fill.addEventListener('click', fillClick);
}

if (save) {
  save.addEventListener('click', saveClick);
}

if (clear) {
  clear.addEventListener('click', () =>
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  );
}
