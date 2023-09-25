import { keys } from './keys'

const gravity = 0.5

export class Player {
  constructor (
    public position = { x: 0, y: 0 },
    public height = 30,
    public width = 30,
    public velocity = { x: 0, y: 0 }
  ) {}

  draw (c: CanvasRenderingContext2D) {
    c.save()
    c.fillStyle = 'black'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
    c.restore()
  }

  update (c: CanvasRenderingContext2D) {
    this.draw(c)
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.x + this.velocity.x >= 0) {
      this.velocity.x -= gravity
    }
  }

  moveLeft () {
    this.velocity.y = -3
  }

  moveRight () {
    this.velocity.y = +3
  }

  stop () {
    this.velocity.y = 0
  }

  jump () {
    if (keys.up.jump === 1) return
    this.velocity.x = 8
    keys.up.jump++
  }

  init () {
    this.position = {
      x: 100,
      y: 100
    }
  }
}
