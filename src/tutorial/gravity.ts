import '#/normalize.css'

async function main () {
  const canvas = document.querySelector('canvas')
  if (canvas == null) throw new Error('Canvas not found')

  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight
  const c = canvas.getContext('2d')
  if (c == null) throw new Error('Canvas context not found')

  class CustomObject {
    constructor (
      public x = 0,
      public y = 0,
      public radius = 0,
      public color = '#000',
      public dx = 1,
      public dy = 1
    ) {}

    update () {
      // horizontal
      if (this.x - this.radius < 0) {
        this.dx = -this.dx
      } else {
        this.dx += 0.5
      }
      this.x -= this.dx
      this.draw()
    }

    draw () {
      if (c == null) throw new Error('Canvas context not found')
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      c.fillStyle = this.color
      c.fill()
      c.closePath()
    }
  }

  let ball: CustomObject
  const init = () => {
    ball = new CustomObject(canvas.width / 2, canvas.height / 2, 30, 'red')
  }
  function animate () {
    if (canvas == null) throw new Error('Canvas context not found')
    c?.clearRect(0, 0, canvas.width, canvas.height)
    ball.update()
    requestAnimationFrame(animate)
  }

  init()
  animate()
}

main()
  .then(() => { console.log('Done') })
  .catch((err) => { console.error(err) })
