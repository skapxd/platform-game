export class Platform {
  image: HTMLImageElement
  width: number
  height: number
  position: {
    x: number
    y: number
  }

  constructor ({
    image = new Image(),
    position = {
      x: -100,
      y: -100
    }
  }
  ) {
    this.image = image
    this.width = /* image.width || */ 200
    this.height = /* image.height ||  */30
    this.position = position
  }

  drawImage (c: CanvasRenderingContext2D) {
    c.save() // Save the current state of the context
    // c.translate(this.position.x + this.width / 2, this.position.y + this.height / 2) // Move the origin to the center of the image
    c.rotate(Math.PI / 2) // Rotate the context by 90 degrees
    c.drawImage(this.image, this.position.x, this.position.y)
    // c.drawImage(this.image, -this.width / 2, -this.height / 2) // Draw the image with the new origin
    c.restore() // Restore the previous state of the context
  }

  drawBlock (c: CanvasRenderingContext2D) {
    c.save()
    c.fillStyle = 'green'
    c.fillRect(this.position.x, this.position.y, this.height, this.width)
    // c.fillRect(200, this.position.y, this.height, this.width)
    c.restore()
  }

  moveToLeft () {
    this.position.y -= 3
  }

  moveToRight () {
    this.position.y += 3
  }
}
