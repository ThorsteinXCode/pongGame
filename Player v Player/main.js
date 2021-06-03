const arena = document.querySelector('.arena')
const scoreDisplay = document.querySelector('#score')

const arenaWidth = 900
const arenaHeight = 600
const stick1Height = 85
const stick1Width = 12
const stick2Width = 12
const stick2Height = 85
const ballDiameter = 15
let score1=0
let score2=0
let xDirection = 2
let yDirection = 2

            
            


let ballTimerId
scoreDisplay.innerHTML = ('Player 1 ' + score1 + ' - ' + score2 + ' Player 2') 
const ballStart = [350,30]
let ballCurrentPosition = ballStart

const stick1StartPosition = [0,450] 
let currentStick1Position = stick1StartPosition

const stick2StartPosition = [890,300]
let currentStick2Position = stick2StartPosition

const stick1 = document.createElement('div')
stick1.classList.add('stick1')
drawStick1()
arena.appendChild(stick1)

function drawBall(){
    ball.style.left =ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

function drawStick1(){
     stick1.style.left = currentStick1Position[0] + 'px'
     stick1.style.bottom  = currentStick1Position[1] + 'px'
}
//stick1
function moveStick1(e) {
    switch (e.key) {
      case 'w':
          console.log('up')
          
        if (currentStick1Position[1] < 515 ) {
          currentStick1Position[1] += 10
          console.log(currentStick1Position[1] )
          console.log('up')
          drawStick1()   
        }
        break
      case 's':
        if (currentStick1Position[1] > 0 ) {
            currentStick1Position[1] -= 10
            console.log(currentStick1Position[1])
            drawStick1()   
      }
      break
      
    }
  }
  document.addEventListener('keydown', moveStick1)
  

const stick2 = document.createElement('div')
stick2.classList.add('stick2')
drawStick2()
arena.appendChild(stick2)

function drawStick2(){
    stick2.style.left  = currentStick2Position[0] + 'px'
    stick2.style.bottom = currentStick2Position[1] + 'px'

}
//stick2
function moveStick2(e) {
    switch (e.key) {
      case 'ArrowUp':
          
          
        if (currentStick2Position[1] < arenaHeight - stick2Height ) {
          currentStick2Position[1] += 20
          console.log(currentStick2Position[1] )
          console.log('up')
          drawStick2()   
        }
        break
      case 'ArrowDown':
        if (currentStick2Position[1] > 0 ) {
            currentStick2Position[1] -= 20
            console.log(currentStick2Position[1])
            drawStick2()   
      }
      break
      
    }
  }
  document.addEventListener('keydown', moveStick2)

const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
arena.appendChild(ball)
//move the ball 

function moveBall(){
        ballCurrentPosition[0] += xDirection
        ballCurrentPosition[1] += yDirection
        drawBall()
        checkForCollisions()

}

ballTimerId=setInterval(moveBall,20)


function redirectBall(){
          ballCurrentPosition[0] = 450
          ballCurrentPosition[1] = 300
          changeDirection()
}
//check for collisions 

function checkForCollisions () {
      //check for wall collisions 
      if ( 
          ballCurrentPosition[1] >= (arenaHeight - ballDiameter)||
          ballCurrentPosition[1] <= (0) 
          ){
              changeDirection()

        }
        //stick1
      if (
        (ballCurrentPosition[0] > currentStick1Position[0] && 
        ballCurrentPosition[0] < currentStick1Position[0] + stick1Width) && 
        (ballCurrentPosition[1] > currentStick1Position[1] && 
          ballCurrentPosition[1] < currentStick1Position[1] + stick1Height)
      ){
        console.log(currentStick1Position[0] + currentStick1Position[1])
        changeDirection()
      }
      //stick2
      if (
        (ballCurrentPosition[0] > currentStick2Position[0] && 
          ballCurrentPosition[0] < currentStick2Position[0] + stick2Width) && 
          (ballCurrentPosition[1] > currentStick2Position[1] && 
            ballCurrentPosition[1] < currentStick2Position[1] + stick2Height)
        
      ){
        console.log(currentStick2Position[0] + currentStick2Position[1])
        changeDirection()
      }
      

        //check for game over 
     if(ballCurrentPosition[0] < 0 ){
            
              score2++
              
              redirectBall()
              scoreDisplay.innerHTML = ('Player 1 ' + score1 + ' - ' + score2 + ' Player 2') 

        } 
      if(ballCurrentPosition[0] > 900 ){
          
          score1++
          redirectBall()
          scoreDisplay.innerHTML = ('Player 1 ' + score1 + ' - ' + score2 + ' Player 2') 

    } 
  endGame()    
      
  
}
function endGame(){
      if(score1 === 5 ){
        clearInterval(ballTimerId)
        scoreDisplay.innerHTML= ' Player 1 Wins'
      }else if (score2 === 5){
        scoreDisplay.innerHTML='Player 2 Wins'
      }

}
function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2
    return
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2
    return
  }
  if (xDirection === -2 && yDirection === -2) { 
    yDirection = 2
    return
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2
    return
  }
  
}




