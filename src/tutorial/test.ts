import '#/normalize.css'
import platformPath from '#/src/img/platform.png'
import platformSmallTallPath from '#/src/img/platformSmallTall.png'
import hillsPath from '#/src/img/hills.png'
import backgroundPath from '#/src/img/background.png'
import { loadImage } from './utils/load-image'

async function main () {
  const canvas = document.querySelector('canvas')
  if (canvas == null) throw new Error('Canvas not found')

  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight

  const gravity = 0.5

  const c = canvas.getContext('2d')
  if (c == null) throw new Error('Canvas context not found')

  class Player {
    constructor (
      public position = { x: 0, y: 0 },
      public height = 30,
      public width = 30,
      public velocity = { x: 0, y: 0 }
    ) {}

    draw () {
      if (c == null) throw new Error('Canvas context not found')
      c.fillStyle = 'black'
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update () {
      if (canvas == null) throw new Error('Canvas context not found')

      this.draw()
      this.position.x += this.velocity.x

      // // actualizar la posicion en el eje x
      if (this.position.x - this.width + this.velocity.x + 0.5 > 0) {
        this.velocity.x -= gravity
      } else this.position.x = +0.5

      this.position.x -= gravity
    }

    jump () {
      this.velocity.y = -15
      keys.up.jump++
    }

    moveToLeft () {
      this.velocity.x = -5
    }

    moveToRight () {
      this.velocity.x = +5
    }
  }

  class Platform {
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
        x: 150,
        y: 600
      }
    }
    ) {
      this.image = image
      this.width = image.width
      this.height = image.height
      this.position = position
    }

    draw () {
      if (c == null) throw new Error('Canvas context not found')
      c.drawImage(this.image, this.position.x, this.position.y)
    }

    moveToLeft () {
      this.position.x -= 5
    }

    moveToRight () {
      this.position.x += 5
    }
  }

  class GenericObject {
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
        x: 150,
        y: 600
      }
    }
    ) {
      this.image = image
      this.width = image.width
      this.height = image.height
      this.position = position
    }

    draw () {
      if (c == null) throw new Error('Canvas context not found')
      c.drawImage(this.image, this.position.x, this.position.y)
    }

    moveToLeft () {
      this.position.x -= 1
    }

    moveToRight () {
      this.position.x += 1
    }
  }

  const [platformImg, hillsImg, backgroundImg, platformSmallTallImg] = await Promise.all([
    loadImage(platformPath),
    loadImage(hillsPath),
    loadImage(backgroundPath),
    loadImage(platformSmallTallPath)
  ])

  let player: Player
  const platforms: Platform[] = []
  const genericObjects: GenericObject[] = []

  const keys = {
    right: {
      pressed: false
    },
    left: {
      pressed: false
    },
    up: {
      pressed: false,
      jump: 0
    }
  }
  let scrollOffset = 0

  const init = () => {
    player = new Player({ x: 100, y: 100 })
    // platforms = [
    //   new Platform({ image: platformSmallTallImg, position: { x: platformSmallTallImg.width * 1.5, y: canvas.height - platformSmallTallImg.height - 10 } }),
    //   new Platform({ image: platformImg, position: { x: 0, y: canvas.height - platformImg.height + 20 } }),
    //   new Platform({ image: platformImg, position: { x: platformImg.width - 3, y: canvas.height - platformImg.height + 20 } }),
    //   new Platform({ image: platformImg, position: { x: platformImg.width * 2.5, y: canvas.height - platformImg.height + 20 } })
    // ]
    // genericObjects = [
    //   new GenericObject({ image: backgroundImg, position: { x: 0, y: 0 } }),
    //   new GenericObject({ image: hillsImg, position: { x: -1, y: canvas.height - hillsImg.height + 10 } })
    // ]

    scrollOffset = 0
  }

  function animate () {
    if (canvas == null) throw new Error('Canvas context not found')
    if (c == null) throw new Error('Canvas context not found')

    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    genericObjects.forEach((genericObject) => { genericObject.draw() })
    platforms.forEach((platform) => { platform.draw() })
    player.update()

    // if (keys.right.pressed && player.position.x < 200) player.moveToRight()
    // else if (keys.left.pressed && player.position.x > 100) player.moveToLeft()
    // else {
    //   player.velocity.x = 0
    //   if (keys.right.pressed) {
    //     scrollOffset += 5
    //     platforms.forEach(platform => { platform.moveToLeft() })
    //     genericObjects.forEach(genericObject => { genericObject.moveToLeft() })
    //   } else if (keys.left.pressed && scrollOffset > 0) {
    //     scrollOffset -= 5
    //     platforms.forEach(platform => { platform.moveToRight() })
    //     genericObjects.forEach(genericObject => { genericObject.moveToRight() })
    //   } else if (keys.left.pressed && scrollOffset === 0 && player.position.x > 0) {
    //     player.moveToLeft()
    //   }
    // }

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

    // if (keys.up.pressed && keys.up.jump === 0 && player.velocity.y === 0) player.jump()

    // // win condition
    // if (scrollOffset > 2_000) alert('Ganaste')
    // lose condition
    // if (player.position.x < 0) init()
  }

  canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    if (c.isPointInPath(x, y)) {
      console.log('Clicked inside the fill')
    }
  })

  init()
  animate()
}

main()
  .then(() => { console.log('Done') })
  .catch((err) => { console.error(err) })
