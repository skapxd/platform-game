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
    this.width = image.width
    this.height = image.height
    this.position = position
  }

  draw (c: CanvasRenderingContext2D) {
    c.save() // Save the current state of the context
    // c.translate(this.position.x + this.width / 2, this.position.y + this.height / 2) // Move the origin to the center of the image
    c.rotate(Math.PI / 2) // Rotate the context by 90 degrees

    c.drawImage(this.image, this.position.x, this.position.y)
    // c.drawImage(this.image, -100, -100)
    // c.drawImage(this.image, -this.width / 2, -this.height / 2) // Draw the image with the new origin
    c.restore() // Restore the previous state of the context
  }

  moveToLeft () {
    this.position.x -= 5
  }

  moveToRight () {
    this.position.x += 5
  }
}
