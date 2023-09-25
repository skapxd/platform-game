import { dpx } from '../utils/dpx'

const gravity = (0.5)
export class Player {
  public position = { x: (0), y: (0) }
  public velocity = { x: (0), y: (0) }
  public width = (100)
  public height = (100)

  constructor ({
    position = { x: (0), y: (0) },
    velocity = { x: (0), y: (1) },
    height = (100),
    width = (100)
  }) {
    this.position = position
    this.velocity = velocity
    this.height = height
    this.width = width
  }

  draw (c: CanvasRenderingContext2D) {
    c.save()
    c.fillStyle = 'rgba(255,255,255,0.7)'
    c.fillRect((this.position.x), (this.position.y), (this.width), (this.height))
    c.restore()
  }

  update (c: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.draw(c)
    this.position.y += (this.velocity.y)
    this.position.x += (this.velocity.x)
    if ((this.position.y) + (this.height) + (this.velocity.y) <= (canvas.height)) this.velocity.y += gravity
    else this.velocity.y = 0
  }
}
