const canvas = document.getElementById('jsCanvas')
// canvas는 context를 가짐-> context: canvas 요소 안에서 픽셀에 접근할 수 있는 방법
const ctx = canvas.getContext('2d')
const colors = document.getElementsByClassName('jsColor')
const range = document.getElementById('jsRange') // brush size 버튼
const mode = document.getElementById('jsMode') // fill 버튼
const saveBtn = document.getElementById('jsSave') // save 버튼
const img = document.getElementById('paintImage') // 그림판 이미지 객체

const INITIAL_COLOR = '#2c2c2c'

// 캔버스는 두 개의 사이즈가 지정되어야 함-> css 사이즈, element 사이즈
// 캔버스를 픽셀을 다룰 수 있는 element로서 만드는거니까 element에 width와 height를 지정해줘야함
// 픽셀을 다루는 윈도우가 얼마나 큰지 canvas에게 알려줌
canvas.width = 500
canvas.height = 580

ctx.drawImage(img, 10, 15, 500, 550)
ctx.fillStyle = 'white' // 이미지 저장할 때 default로 흰색 지정안해주면 배경 투명색으로 저장됨
// 사다리꼴모양 그림판 만들기
ctx.beginPath()
ctx.moveTo(142, 63) // 시작점
ctx.lineTo(395, 85)
ctx.lineTo(375, 375)
ctx.lineTo(120, 355)
ctx.lineTo(142, 63)
// ctx.stroke()
ctx.clip()

ctx.strokeStyle = INITIAL_COLOR // default 검정
ctx.fillStyle = INITIAL_COLOR
ctx.lineWidth = 2.5 // default 선 굵기

let painting = false
let filling = false

function stopPainting(event) {
  painting = false
}

function startPainting(event) {
  painting = true
}

// offsetX, offsetY: canvas 내에서 마우스 좌표
// beginPath: context는 path(기본적인 선)를 가짐 -> 클릭할 때 path를 만듬(선의 시작점을 만듬)
// 다시 클릭하면 시작점부터 클릭한 곳까지 선을 만듬
function onMouseMove(event) {
  const x = event.offsetX
  const y = event.offsetY
  if (!painting) {
    ctx.beginPath()
    ctx.moveTo(x, y)
  } else {
    ctx.lineTo(x, y) // path의 이전 위치에서 현재 위치까지 선을 그음(x,y 지점까지 선을 이어줌)
    ctx.stroke() //눈에 보이게 선을 그음
  }
}

//Change Color
function handleColorClick(event) {
  // console.log(event.target.style)
  const color = event.target.style.backgroundColor
  ctx.strokeStyle = color
  ctx.fillStyle = color
}

//Brush Size
function handleRangeChange(event) {
  // console.log(event.target.value)
  const size = event.target.value
  ctx.lineWidth = size
}

function handleModeClick() {
  if (filling === true) {
    filling = false
    mode.innerText = 'Fill'
  } else {
    filling = true
    mode.innerText = 'Paint'
    ctx.fillStyle = ctx.strokeStyle
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, 500, 550) // x, y, w, h
  }
}

function handleCM(event) {
  event.preventDefault() // 우클릭 방지
}

function handelSaveClick() {
  const image = canvas.toDataURL() //default가 png
  const link = document.createElement('a') // <a></a>
  // href는 image(URL) 이 되어야하고 download는 image 이름이 되어야함
  link.href = image // 링크를 저장 -> <a href="data:image/jpeg;base64,/9j/4A..."></a>
  link.download = 'PaintJS[EXPORT]'
  // console.log(link)
  link.click()
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove)
  // 캔버스에서 클릭하는 순간을 인지
  canvas.addEventListener('mousedown', startPainting)
  // 캔버스에서 클릭을 푸는 순간을 인지
  canvas.addEventListener('mouseup', stopPainting)
  // 캔버스에서 벗어나는 순간을 인지
  canvas.addEventListener('mouseleave', stopPainting)
  // 캔버스를 클릭하는 순간을 인지
  canvas.addEventListener('click', handleCanvasClick)
  // 이미지 저장
  canvas.addEventListener('contextmenu', handleCM)
}

Array.from(colors).forEach((color) =>
  color.addEventListener('click', handleColorClick),
)

if (range) {
  range.addEventListener('input', handleRangeChange)
}

if (mode) {
  mode.addEventListener('click', handleModeClick)
}

if (saveBtn) {
  saveBtn.addEventListener('click', handelSaveClick)
}
