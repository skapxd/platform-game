export const setHD = (canvas: HTMLCanvasElement) => {
  const c = canvas.getContext('2d')
  if (c == null) throw new Error('Canvas context not found')

  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * devicePixelRatio
  canvas.height = rect.height * devicePixelRatio
  c.scale(devicePixelRatio, devicePixelRatio)
  canvas.style.width = `${rect.width}px`
  canvas.style.height = `${rect.height}px`
}
