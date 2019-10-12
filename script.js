const canvas = document.querySelector("canvas")
const dimensions = {
  width: canvas.width = window.innerWidth,
  height: canvas.height = window.innerHeight
}

let ctx = canvas.getContext('2d')

let dino = new Dinosaur(100, 350, 0)
let cacti = [new Cactus(340), new Cactus(640), new Cactus(940)]
let dead = false

let dino_image = new Image()
dino_image.src = "Images/dinosaur.png"
let cactus_image = new Image()
cactus_image.src = "Images/cactus.png"
document.addEventListener('keydown', e => {
  if (e.keyCode == 32) {
    dino.y = 300
    let change = setTimeout(() => {
      dino.y = 350
    }, 500)
  }
})

const moving = setInterval(() => {
    ctx.drawImage(dino_image, dino.x, dino.y);
    for (let cactus of cacti) {
      cactus.x -= 5
    }

    dino.distance += 1

    cacti.push(new Cactus(cacti[cacti.length-1].x + Math.round(Math.random() * 300) + 300))
    ctx.fillStyle = "lightgrey"
    ctx.fillRect(0, 0, dimensions.width, dimensions.height)
    ctx.drawImage(dino_image, dino.x, dino.y);

    ctx.strokeStyle = "black"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, 450)
    ctx.lineTo(1440, 450)
    ctx.stroke()

    if (dino.x == 1200) {
      dino.x = 0
    }

    for (let cactus of cacti) {
        ctx.drawImage(cactus_image, cactus.x, 100)
    }

    for (let cactus of cacti) {
      if (dino.x == cactus.x+100 && dino.y == 350) {
        clearInterval(moving)
        dead = true
        alert(`YOU DIED! Your distance was ${dino.distance}`)
      }
    }

}, 15)
