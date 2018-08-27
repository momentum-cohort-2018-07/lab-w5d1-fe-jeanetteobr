
// grabs canvas element from DOM
const canvas = getID('game')
// gets the drawing context
const screen = canvas.getContext('2d')
// notes the dimension of the game screen
const gameSize = {x: canvas.width, y: canvas.height}
// notes the colors for all elements in the game
const colors = {
  player: '#EAF2E3',
  obstacles: '#857E7B',
  screen: '#DB7F67',
  coin: '#D6BA73',
  wall: '#59344F'

}

// creates and instance of the game
class Game {
  constructor () {
    this.player = new Player()
    this.coin = new Coin()
    this.tick()
  }
  tick () {
    this.update()
    this.draw()
    window.requestAnimationFrame(() => this.tick())
  }
  // draws the game
  draw () {
    screen.clearRect(0, 0, gameSize.x, gameSize.y)
    this.Wall()
    this.player.draw()
    this.coin.draw()
  }
  // updates the game state
  update () {
    this.coin.update()
    this.player.update()
  }
  Wall () {
    screen.fillStyle = colors.screen
    screen.fillRect(0, 0, gameSize.x, gameSize.y)
    screen.strokeRect(150, 150, 200, 200)
  }
}

// creates the player sprite and dictates how it acts
class Player {
  constructor (game) {
    this.size = {
      x: 30,
      y: 30
    }
    this.center = {
      x: gameSize.x / 2 - 15,
      y: gameSize.y / 2 - 15
    }
    this.keyboarder = new Keyboarder()
    this.game = game
  }
  draw () {
    screen.fillStyle = colors.player
    screen.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)
  }
  update () {
    if (this.keyboarder.isDown(Keyboarder.KEYS.LEFT)) {
      this.center.x -= 2
      if (this.center.x <= 152) this.center.x = 152
    }
    if (this.keyboarder.isDown(Keyboarder.KEYS.RIGHT)) {
      this.center.x += 2
      if (this.center.x >= 318) this.center.x = 318
    }
    if (this.keyboarder.isDown(Keyboarder.KEYS.DOWN)) {
      this.center.y += 2
      if (this.center.y >= 318) this.center.y = 318
    }
    if (this.keyboarder.isDown(Keyboarder.KEYS.UP)) {
      this.center.y -= 2
      if (this.center.y <= 152) this.center.y = 152
    }
  }
}

class Coin {
  constructor (pos) {
    this.x = pos.x
    this.y = pos.y
    this.size = {
      x: 25,
      y: 25
    }
  }
  draw () {
    screen.fillStyle = colors.coin
    screen.fillRect(200, 200, this.size.x, this.size.y)
  }
  update () {
  }
}

// function to grab element from DOM
function getID (id) {
  return document.getElementById(id)
}

class Keyboarder {
  constructor () {
    this.keyState = {}

    window.addEventListener('keydown', function (e) {
      this.keyState[e.keyCode] = true
    }.bind(this))

    window.addEventListener('keyup', function (e) {
      this.keyState[e.keyCode] = false
    }.bind(this))
  }

  isDown (keyCode) {
    return this.keyState[keyCode] === true
  }

  on (keyCode, callback) {
    window.addEventListener('keydown', function (e) {
      if (e.keyCode === keyCode) {
        callback()
      }
    })
  }
}

Keyboarder.KEYS = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  S: 83
}

// instatiates the Game class
new Game()
