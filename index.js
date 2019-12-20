const canvas = document.querySelector('canvas#etch-a-sketch')
const shake = document.querySelector('button.shake')
const speed = document.querySelector('#speed')
const stroke = document.querySelector('#stroke')
const ctx = canvas.getContext('2d')

const { width, height } = canvas
let x = Math.floor(Math.random() * width)
let y = Math.floor(Math.random() * height)
let moveSpeed = 20
ctx.lineJoin = 'round'
ctx.lineCap = 'round'
ctx.lineWidth = 10
ctx.beginPath()
ctx.moveTo(x, y)
ctx.lineTo(x, y)
ctx.stroke()

function handleShake() {
  canvas.classList.add('shaking')
  ctx.clearRect(0, 0, width, height)
  canvas.addEventListener(
    'animationend',
    () => {
      canvas.classList.remove('shaking')
    },
    { once: true }
  )
}

function draw(key) {
  ctx.beginPath()
  ctx.moveTo(x, y)
  console.log(moveSpeed)
  switch (key) {
    case 'ArrowUp':
      y -= moveSpeed
      break
    case 'ArrowDown':
      y += moveSpeed
      break
    case 'ArrowRight':
      x += moveSpeed
      break
    case 'ArrowLeft':
      x -= moveSpeed
      break
    default:
      break
  }
  ctx.lineTo(x, y)
  ctx.stroke()
}

function handleKeyDown(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault()
    draw(e.key)
  }
}

function handleStrokeChange(e) {
  ctx.lineWidth = e.currentTarget.value
}

function handleSpeedChange(e) {
  moveSpeed = parseInt(e.currentTarget.value)
}

stroke.addEventListener('keyup', handleStrokeChange)
speed.addEventListener('keyup', handleSpeedChange)
window.addEventListener('keydown', handleKeyDown)
shake.addEventListener('click', handleShake)
