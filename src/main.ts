const canvas = document.querySelector('canvas')

if (canvas == null) throw new Error('Canvas not found')

canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight
const gravity = 0.5

const c = canvas.getContext('2d')
if (c == null) throw new Error('Canvas context not found')

class Player {
  constructor (
    public height = 30,
    public width = 30,
    public position = {
      x: 100,
      y: 100
    },
    public velocity = {
      x: 0,
      y: 1
    }
  ) {}

  draw () {
    if (c == null) throw new Error('Canvas context not found')
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update () {
    if (canvas == null) throw new Error('Canvas context not found')

    this.draw()
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity
    } else {
      this.velocity.y = 0
    }
  }

  jump () {
    this.velocity.y = -5
  }

  moveToLeft () {
    this.velocity.x = -5
  }

  moveToRight () {
    this.velocity.x = +5
  }
}

class Platform {
  constructor (
    public height = 20,
    public width = 200,
    public position = {
      x: 200,
      y: 100
    }
  ) {}

  draw () {
    if (c == null) throw new Error('Canvas context not found')
    c.fillStyle = 'blue'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

const player = new Player()
const platform = new Platform()
const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  },
  up: {
    pressed: false
  }
}

function animate () {
  if (canvas == null) throw new Error('Canvas context not found')
  requestAnimationFrame(animate)
  c?.clearRect(0, 0, canvas.width, canvas.height)
  player.update()
  platform.draw()

  if (keys.right.pressed) player.moveToRight()
  else if (keys.left.pressed) player.moveToLeft()
  else player.velocity.x = 0

  if (keys.up.pressed) player.jump()
}

animate()

addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'ArrowUp':{
      keys.up.pressed = true
      break
    }
    case 'ArrowLeft':{
      keys.left.pressed = true
      // player.velocity.x = -1
      break
    }
    case 'ArrowRight':{
      keys.right.pressed = true
      // player.velocity.x = +1
      break
    }
  }
})

addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'ArrowUp':{
      keys.up.pressed = false
      break
    }
    case 'ArrowLeft':{
      keys.left.pressed = false
      // player.velocity.x = 0
      break
    }
    case 'ArrowRight':{
      keys.right.pressed = false
      // player.velocity.x = 0
      break
    }
  }
})
