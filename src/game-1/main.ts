import { Platform } from './platform'
import { Player } from './player'
import { keys } from './keys'
import { controls } from '../utils/controls'
import { drawDebugTools } from '../utils/rules'
import { GenericObject } from './generic-objects'
import { left, right } from '../utils/arrow'

export const main = () => {
  const canvas = document.querySelector('canvas')
  if (canvas == null) throw new Error('Canvas not found')

  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight

  const c = canvas.getContext('2d')
  if (c == null) throw new Error('Canvas context not found')

  let platforms: Platform[]
  let genericObjects: GenericObject[]
  const player = new Player()
  let scrollOffset: number

  const init = () => {
    player.init()
    scrollOffset = 0
    keys.left.pressed = false
    keys.right.pressed = false
    platforms = [
      new Platform({ /* image: platformImg, */ position: { x: 0, y: 50 } }),
      new Platform({ /* image: platformImg, */ position: { x: 50, y: 300 } }),
      new Platform({ /* image: platformImg, */ position: { x: 80, y: 600 } }),
      new Platform({ /* image: platformImg, */ position: { x: 20, y: 900 } }),
      new Platform({ /* image: platformImg, */ position: { x: 0, y: 1200 } }),
      new Platform({ /* image: platformImg, */ position: { x: 50, y: 1400 } })
    ]
    genericObjects = [
      new GenericObject({ color: 'rgba(255,0,0,0.5)', position: { x: 0, y: 0 }, width: canvas.height / 2, height: canvas.width / 2 }),
      new GenericObject({ color: 'rgba(0,255,0,0.5)', position: { x: 0, y: canvas.width + 50 }, width: canvas.height / 2, height: canvas.width / 2 })
    ]
  }

  function animate () {
    if (canvas == null) throw new Error('Canvas context not found')
    if (c == null) throw new Error('Canvas context not found')

    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    genericObjects.forEach((genericObject) => { genericObject.drawBlock(c) })

    left.draw(c)
    right.draw(c)

    drawDebugTools(c, canvas)

    player.update(c)

    platforms.forEach((platform) => { platform.drawBlock(c) })
    platforms.forEach(platform => {
      // Verificar que el jugador este por encima de la plataforma
      const condition1 = player.position.x >= platform.position.x + platform.height
      // Permitir saltar cuando se esta por encima de la plataforma
      const condition2 = player.position.x + player.velocity.x <= platform.position.x + platform.height
      // Permitir caer al jugador a la izquierda de la plataforma
      const condition3 = player.position.y + player.width >= platform.position.y
      // Permitir caer al jugador a la derecha de la plataforma
      const condition4 = player.position.y <= platform.position.y + platform.width
      // Sistema de colisiones para plataformas
      if (condition1 && condition2 && condition3 && condition4) {
        player.velocity.x = 0
        keys.up.jump = 0
      }
    })

    player.velocity.x = 0
    if (keys.up.pressed && keys.up.jump < 1) player.jump()
    else if (keys.right.pressed && player.position.y <= canvas.height / 2) player.moveRight()
    else if (keys.left.pressed && player.position.y >= canvas.height / 3) player.moveLeft()
    else {
      player.stop()
      if (keys.right.pressed) {
        scrollOffset += 5
        platforms.forEach(platform => { platform.moveToLeft() })
        genericObjects.forEach(genericObject => { genericObject.moveToLeft() })
      } else if (keys.left.pressed && scrollOffset > 0) {
        scrollOffset -= 5
        platforms.forEach(platform => { platform.moveToRight() })
        genericObjects.forEach(genericObject => { genericObject.moveToRight() })
      } else if (keys.left.pressed && scrollOffset === 0 && player.position.y > 0) {
        player.moveLeft()
      }
    }

    // win condition
    if (scrollOffset > 2_000) {
      init()
      confirm('Ganaste')
      init()
    }

    // lose condition
    if (player.position.x + player.height < 0) {
      init()
      confirm('Perdiste')
      init()
    }
  }

  init()
  animate()
  controls({ c, canvas, keys, player })
}
