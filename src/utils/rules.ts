export const drawDebugTools = (c: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  c.save()

  // X line
  // draw arrow line that start 0 and end at canvas width
  c.beginPath()
  c.strokeStyle = 'red'
  c.moveTo(0, 13)
  c.lineTo(canvas.width - 20, 13)
  // draw a 'x' to end of line
  c.font = '20px Arial'
  c.fillStyle = 'black'
  c.fillText('X', canvas.width - 20, 20)
  c.stroke()

  // Y line
  c.beginPath()
  c.strokeStyle = 'blue'
  c.moveTo(10, 0)
  c.lineTo(10, canvas.height - 30)
  // draw a 'x' to end of line
  c.font = '20px Arial'
  c.fillStyle = 'black'
  c.fillText('Y', 4, canvas.height - 10)
  c.stroke()

  c.restore()
}
const canvas = document.querySelector('canvas')
if (canvas == null) throw new Error('Canvas not found')
const c = canvas.getContext('2d')
if (c == null) throw new Error('Canvas context not found')
