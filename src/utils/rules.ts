export const drawDebugTools = (c: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  c.save()
  const rect = canvas.getBoundingClientRect()
  // X line
  // draw arrow line that start 0 and end at canvas width
  c.beginPath()
  c.strokeStyle = 'red'
  c.moveTo(0, 13)
  c.lineTo(rect.width - 20, 13)
  // draw a 'x' to end of line
  c.font = '20px Arial'
  c.fillStyle = 'black'
  c.fillText('X', rect.width - 20, 20)
  c.stroke()

  // Y line
  c.beginPath()
  c.strokeStyle = 'blue'
  c.moveTo(10, 0)
  c.lineTo(10, rect.height - 30)
  // draw a 'x' to end of line
  c.font = '20px Arial'
  c.fillStyle = 'black'
  c.fillText('Y', 4, rect.height - 10)
  c.stroke()

  c.restore()
}
