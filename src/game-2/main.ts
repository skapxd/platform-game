import { keys } from './keys'
import { Player } from './player'

export const main = () => {
  const canvas = document.querySelector('canvas')
  if (canvas == null) throw new Error('Canvas not found')
  canvas.width = (window.innerWidth)
  canvas.height = (window.innerHeight)

  // Scale the canvas down using CSS to match the original size

  const c = canvas.getContext('2d')
  if (c == null) throw new Error('Canvas context not found')

  const player = new Player({ position: { x: (0), y: (0) } })
  const player2 = new Player({ position: { x: (200), y: (0) } })

  function animate () {
    if (canvas == null || c == null) throw new Error('Canvas context not found')
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update(c, canvas)
    player2.update(c, canvas)

    // player.velocity.x = 0
    // if (keys.right.pressed) player.velocity.x = 5
    // else if (keys.left.pressed) player.velocity.x = -5
  }

  animate()

  addEventListener('keydown', ({ key }) => {
    // right
    if (key === 'd') player.velocity.x = 5
    // left
    if (key === 'a') player.velocity.x = -5
    // up
    if (key === 'w') player.velocity.y = -15
  })
}
