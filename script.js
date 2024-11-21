// *** Global Variables ***
const gameBoxNode = document.querySelector("#game-box");

const ballNode = document.createElement("div"); // se crea la pelotita
ballNode.id = "ball"; // se asigna un id a la pelotita (para CSS)
gameBoxNode.append(ballNode); // se añade la pelotita a la caja de juego

const paddleNode = document.createElement("div"); // se crea la paleta
paddleNode.id = "paddle"; // se asigna un id a la paleta (para CSS)
gameBoxNode.append(paddleNode); // se añade la pelotita a la caja de juego

const ball = {
  x: 30, // posición eje X
  y: 30, // posición eje Y
  w: 20, // ancho
  h: 20,  // alto
  isMovingRight: true,
  isMovingDown: true,
  speed: 2.5
}

const paddle = {
  x: 200,
  y: 550,
  w: 100,
  h: 20,
  speed: 12,
}

// *** Game Functions ***
function gameLoop() {
  // console.log("juego andando")

  ballMovement()
  checkCollisionBallWall()
  checkCollisionBallPaddle()

}

function ballMovement() {
  
  if (ball.isMovingRight) {
    ball.x += ball.speed
    ballNode.style.left = `${ball.x}px`
  } else {
    ball.x -= ball.speed
    ballNode.style.left = `${ball.x}px`
  }
  
  if (ball.isMovingDown) {
    ball.y += ball.speed
    ballNode.style.top = `${ball.y}px`
  } else {
    ball.y -= ball.speed
    ballNode.style.top = `${ball.y}px`
  }

  // ! SIEMPRE QUE MODIFICAMOS CUALQUIER POSICION, DIMENSION, ESTILOS. TENEMOS QUE ACCEDER AL NODO Y MANIPULAR SI STYLE.
}

function checkCollisionBallWall() {

  // colision pared derecha
  if (ball.x + ball.w >= gameBoxNode.offsetWidth) {
    // offsetWidth es el valor numero de el width
    ball.isMovingRight = false
  }

  // colision pared abajo
  if (ball.y + ball.h >= gameBoxNode.offsetHeight) {
    // offsetHeight es el valor numero de el height
    // ball.isMovingDown = false
    gameOver()
  }

  // colision pared izquierda
  if (ball.x <= 0) {
    ball.isMovingRight = true
  }

  // colision pared arriba
  if (ball.y <= 0) {
    ball.isMovingDown = true
  }

}

function checkCollisionBallPaddle() {

  if (
    ball.x < paddle.x + paddle.w &&
    ball.x + ball.w > paddle.x &&
    ball.y < paddle.y + paddle.h &&
    ball.y + ball.h > paddle.y
  ) {
    // Collision detected!
    ball.isMovingDown = false
    // ball.speed++
  } 

}

function gameOver() {

  // detener el loop del juego
  clearInterval(gameIntervalId)

  // podemos hacer cualquier cosa para indicar al usuario que perdio
  gameBoxNode.style.backgroundColor = "darkred"

  alert("has perdido!")

}


// *** Game Loop Interval ***
let gameIntervalId = setInterval(() => {
  gameLoop()
}, 1000/60) // 60fps




// *** Event Listeners ***
window.addEventListener("keydown", (event) => {
  // console.log(event)
  if (event.code === "ArrowRight") {
    //console.log("moviendo la paleta a la derecha")
    paddle.x += paddle.speed
    paddleNode.style.left = `${paddle.x}px`
  }
  if (event.code === "ArrowLeft") {
    // console.log("moviendo la paleta a la izquierda")
    paddle.x -= paddle.speed
    paddleNode.style.left = `${paddle.x}px`
  }
})




