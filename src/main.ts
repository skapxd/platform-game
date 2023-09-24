import '#/normalize.css'
import { left, right } from './tutorial/controls'
import platformPath from '#/src/img/platform.png'
import platformSmallTallPath from '#/src/img/platformSmallTall.png'
import hillsPath from '#/src/img/hills.png'
import backgroundPath from '#/src/img/background.png'
import { loadImage } from './utils/load-image'
import { Platform } from './platform'
import { Player } from './player'
import { keys } from './keys'
import { controls } from './controls'

async function main () {
  const canvas = document.querySelector('canvas')
  if (canvas == null) throw new Error('Canvas not found')

  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight

  const c = canvas.getContext('2d')
  if (c == null) throw new Error('Canvas context not found')

  const [platformImg, hillsImg, backgroundImg, platformSmallTallImg] = await Promise.all([
    loadImage(platformPath),
    loadImage(hillsPath),
    loadImage(backgroundPath),
    loadImage(platformSmallTallPath)
  ])

  let platforms: Platform[] = []
  let player: Player
  let scrollOffset = 0

  const init = () => {
    player = new Player({ x: 0, y: 0 })
    scrollOffset = 0
    platforms = [
      // new Platform({ image: platformSmallTallImg, position: { x: platformSmallTallImg.width * 1.5, y: canvas.height - platformSmallTallImg.height - 10 } })
      new Platform({ image: platformImg, position: { x: -100, y: -100 } })
      // new Platform({ image: platformImg, position: { x: platformImg.width - 3, y: canvas.height - platformImg.height + 20 } }),
      // new Platform({ image: platformImg, position: { x: platformImg.width * 2.5, y: canvas.height - platformImg.height + 20 } })
    ]
    // genericObjects = [
    //   new GenericObject({ image: backgroundImg, position: { x: 0, y: 0 } }),
    //   new GenericObject({ image: hillsImg, position: { x: -1, y: canvas.height - hillsImg.height + 10 } })
    // ]
  }

  function animate () {
    if (canvas == null) throw new Error('Canvas context not found')
    if (c == null) throw new Error('Canvas context not found')

    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    platforms.forEach((platform) => { platform.draw(c) })
    left.draw(c)
    right.draw(c)
    player.update(c)

    // platforms.forEach(platform => {
    // // Verificar que el jugador este por encima de la plataforma
    //   const condition1 = player.position.y + player.height <= platform.position.y
    //   // Permitir saltar cuando se esta por encima de la plataforma
    //   const condition2 = player.position.y + player.height + player.velocity.y >= platform.position.y
    //   // Permitir caer al jugador a la izquierda de la plataforma
    //   const condition3 = player.position.x + player.width >= platform.position.x
    //   // Permitir caer al jugador a la derecha de la plataforma
    //   const condition4 = player.position.x <= platform.position.x + platform.width
    //   // Sistema de colisiones para plataformas
    //   if (condition1 && condition2 && condition3 && condition4) {
    //     player.velocity.y = 0
    //     keys.up.jump = 0
    //   }
    // })

    if (keys.right.pressed && player.position.y <= canvas.height / 2) player.moveRight()
    else if (keys.left.pressed && player.position.y >= canvas.height / 8) player.moveLeft()
    else {
      player.stop()
      if (keys.right.pressed) {
        scrollOffset += 5
        platforms.forEach(platform => { platform.moveToLeft() })
        // genericObjects.forEach(genericObject => { genericObject.moveToLeft() })
      } else if (keys.left.pressed && scrollOffset > 0) {
        scrollOffset -= 5
        platforms.forEach(platform => { platform.moveToRight() })
        // genericObjects.forEach(genericObject => { genericObject.moveToRight() })
      } else if (keys.left.pressed && scrollOffset === 0 && player.position.y > 0) {
        player.moveLeft()
      }
    }

    // win condition
    if (scrollOffset > 2_000) {
      alert('Ganaste')
      init()
    }
    // lose condition
    if (player.position.x < 0) init()
  }

  init()
  animate()
  controls({ c, canvas, keys, player })
}

main()
  .then(() => { console.log('Done') })
  .catch((err) => { console.error(err) })
