const canvas = document.getElementById('jsCanvas')
// canvas는 context를 가짐-> context: canvas 요소 안에서 픽셀에 접근할 수 있는 방법
const ctx = canvas.getContext('2d')

// 캔버스는 두 개의 사이즈가 지정되어야 함-> css 사이즈, element 사이즈
// 캔버스를 픽셀을 다룰 수 있는 element로서 만드는거니까 element에 width와 height를 지정해줘야함
canvas.width = 700
canvas.height = 700

ctx.strokeStyle = '#2c2c2c' //default 검정
ctx.lineWidth = 2.5 //default 선 굵기

let painting = false

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
    ctx.lineTo(x, y) // (x,y 지점까지 선을 이어줌)
    ctx.stroke() //눈에 보이게 선을 그음
  }
}

function onMouseDown(event) {
  painting = true
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove)
  // 캔버스에서 클릭하는 순간을 인지
  canvas.addEventListener('mousedown', startPainting)
  // 캔버스에서 클릭을 푸는 순간을 인지
  canvas.addEventListener('mouseup', stopPainting)
  // 캔버스에서 벗어나는 순간을 인지
  canvas.addEventListener('mouseleave', stopPainting)
}
