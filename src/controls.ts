import TouchSweep from 'touchsweep'
import { type keys } from './keys'
import { type Player } from './player'
import { left, right } from './tutorial/controls'

interface Controls {
  canvas: HTMLCanvasElement
  keys: typeof keys
  c: CanvasRenderingContext2D
  player: Player
}

export const controls = ({ canvas, keys, c, player }: Controls) => {
  canvas.addEventListener('touchmove', (event) => {
    const rect = canvas.getBoundingClientRect()

    const x = event.changedTouches[0].clientX - rect.left
    const y = event.changedTouches[0].clientY - rect.top

    // right
    if (c.isPointInPath(right.area, x, y)) {
      keys.right.pressed = true
      keys.left.pressed = false
    }

    // left
    if (c.isPointInPath(left.area, x, y)) {
      keys.left.pressed = true
      keys.right.pressed = false
    }
  })

  canvas.addEventListener('touchend', (event) => {
    keys.right.pressed = false
    keys.left.pressed = false
  })

  addEventListener('keydown', ({ key }) => {
    if (key === 'ArrowRight') keys.right.pressed = true
    else if (key === 'ArrowLeft') keys.left.pressed = true
    else if (key === 'ArrowUp') keys.up.pressed = true
  })

  addEventListener('keyup', ({ key }) => {
    if (key === 'ArrowRight') keys.right.pressed = false
    else if (key === 'ArrowLeft') keys.left.pressed = false
    else if (key === 'ArrowUp') keys.up.pressed = false
  })

  const up = document.querySelector('.up') as HTMLElement
  new TouchSweep(up, { value: 1 }, 20)

  up?.addEventListener('swiperight', (e) => {
    player.jump()
  })

  up?.addEventListener('tap', (e) => {
    player.jump()
  })
}
