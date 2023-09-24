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

    if (this.position.x - this.width + this.velocity.x >= 0) {
      this.velocity.x -= gravity
    } else this.position.x = 0
  }

  moveLeft () {
    this.velocity.y = -5
  }

  moveRight () {
    this.velocity.y = +5
  }

  stop () {
    this.velocity.y = 0
  }

  jump () {
    this.velocity.x = 15
  }

  init () {
    this.position = {
      x: 100,
      y: 100
    }
  }
}
