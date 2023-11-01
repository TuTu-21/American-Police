

document.addEventListener('DOMContentLoaded', function() {
  const startButton = document.getElementById('start-button');
  const optionsButton = document.getElementById('options-button');
  const exitButton = document.getElementById('exit-button');
  const menu = document.getElementById('menu');
  const collision = document.getElementById('collision');
  const ctxCol = collision.getContext('2d');
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');


  // Add event listeners
  startButton.addEventListener('click', startGame);
  optionsButton.addEventListener('click', openOptions);
  exitButton.addEventListener('click', exitGame);


  function openOptions() {
    // TODO: Implement options menu logic
    console.log('Options menu opened!');
  }

  function exitGame() {
    // TODO: Implement exit game logic
    console.log('Game exited!');
  }
});




function startGame() {
  const collision = document.getElementById('collision');
  const ctxCol = collision.getContext('2d');
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  menu.style.display = 'none';
  canvas.style.display = 'block';
  canvas.style.position = 'absolute';

  // if (canvas.requestFullscreen) {
  //   canvas.requestFullscreen();
  // } else if (canvas.mozRequestFullScreen) {
  //   canvas.mozRequestFullScreen();
  // } else if (canvas.webkitRequestFullscreen) {
  //   canvas.webkitRequestFullscreen();
  // } else if (canvas.msRequestFullscreen) {
  //   canvas.msRequestFullscreen();
  // }


  
  
  let timetoNextNigg = 0;
  let niggInterval = 2000;
  let lastTime = 0;
  let score = 0;
  let life = 5;



  //                                     GUN    AND  Fire control  
  
  class Gun {
    constructor() {
      this.width = 178;
      this.height = 119;
      this.image = new Image();
      this.image.src = 'gun.png';

      this.x = 0;
      this.y = canvas.width / 2;
      this.directionY = 0;
      this.speedY = 5;
    }
  
    draw() {
      ctx.drawImage(this.image, this.x, this.y);
    }
  }
  
  const gun = new Gun();
 
  
  window.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
      gun.directionY = -1;
    } else if (event.key === "ArrowDown") {
      gun.directionY = 1;
    } else if (event.key === "f") {
      bullet = new Bullet(gun.y+20);
      bullet.shot.play();
      bullets.push(bullet);

    
    }
  });
  
  window.addEventListener("keyup", function (event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      gun.directionY = 0;
    }
  });






//                                                  Bullets


  let bullets = [];
  
  class Bullet {
    constructor(y) {
      this.y = y;
      this.x = 167;
      this.vx = 10;
      this.width = 10;
      this.height = 5;
      this.delete = false;
      this.shot = new Audio();
      this.shot.src = 'tir.mp3';

    }
  
    update(deltaTime) {
    
      this.x += this.vx;
    }
  
    draw() {
      ctx.fillStyle = "black";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      
    }
  }

 
  
  

  let niggas = [];


//                                                          NIggas the fuckers


  class Nigga {
    constructor() {
      this.size = Math.random() / 7 + 0.07;
      this.width = 530 * this.size;
      this.height = 564 * this.size;
      this.x = canvas.width;
      this.y = Math.random() * (canvas.height - this.height);
      this.directionX = Math.random() * 5 + 3;
      this.directionY = Math.random() * 5 - 2.5;
      this.markedForDeletion = false;
      this.image = new Image();
      this.image.src = 'nigga.png';
      this.randomColor = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
      this.color = 'rgb(' + this.randomColor[0] + ',' + this.randomColor[1] + ',' + this.randomColor[2] + ')';
    }
  
    checkCollision(bullets) {
      for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];
        if (
          bullet.x < this.x + this.width &&
          bullet.x + bullet.width > this.x &&
          bullet.y < this.y + this.height &&
          bullet.y + bullet.height > this.y
        ) {
          bullet.delete = true;
          return true;
        }
      }
      return false;
    }
  
    update(deltaTime) {
      if (this.y < 0 || this.y > canvas.height - this.height) {
        this.directionY = -this.directionY;
      }
      this.x -= this.directionX;
      this.y += this.directionY;
      if (this.x < 0 - this.width) this.markedForDeletion = true;
    }
  
    draw(y) {
      ctxCol.fillStyle = this.color;
      ctxCol.fillRect(this.x, this.y, this.width, this.height);
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }



//                                                              trump

let trumps = [];

class trump {
  constructor() {
    this.size = Math.random() / 7 + 0.07;
    this.width = 280 * this.size;
    this.height = 390 * this.size;
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);
    this.directionX = Math.random() * 5 + 3;
    this.directionY = Math.random() * 5 - 2.5;
    this.markedForDeletion = false;
    this.image = new Image();
    this.image.src = 'trump.png';
    this.randomColor = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
    this.color = 'rgb(' + this.randomColor[0] + ',' + this.randomColor[1] + ',' + this.randomColor[2] + ')';
  }

  checkCollision(bullets) {
    for (let i = 0; i < bullets.length; i++) {
      const bullet = bullets[i];
      if (
        bullet.x < this.x + this.width &&
        bullet.x + bullet.width > this.x &&
        bullet.y < this.y + this.height &&
        bullet.y + bullet.height > this.y
      ) {
        bullet.delete = true;
        return true;
      }
    }
    return false;
  }

  update(deltaTime) {
    if (this.y < 0 || this.y > canvas.height - this.height) {
      this.directionY = -this.directionY;
    }
    this.x -= this.directionX;
    this.y += this.directionY;
    if (this.x < 0 - this.width) this.markedForDeletion = true;
  }

  draw(y) {
    ctxCol.fillStyle = this.color;
    ctxCol.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}






//                                                          Explosion  


  
  let explosions = [];
  
  class Explosion {
    constructor(x, y, size) {
      this.spriteWidth = 200;
      this.spriteHeight = 179;
      this.width = this.spriteWidth * 0.7;
      this.height = this.spriteHeight * 0.7;
      this.x = x;
      this.y = y;
      this.size = size;
      this.image = new Image();
      this.image.src = 'boom.png';
    
      this.frame = 0;
      this.interval = 120;
      this.timeSinceLastFrame = 0;
      this.markedForDeletion = false;
    }
  
    update(deltaTime) {
      if (this.frame === 0) this.sound.play();
      this.timeSinceLastFrame += deltaTime;
      if (this.timeSinceLastFrame > this.interval) {
        this.frame++;
        this.timeSinceLastFrame = 0;
        if (this.frame > 5) this.markedForDeletion = true;
      }
    }
  
    draw(y) {
      ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.size, this.size);
    }
  }


  //                                                       Score
  
  function drawScore() {
    ctx.font = '60px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.fillText('Score: ' + score, 30, 50);
  }
  
                              


//                                                        Life Bar

function drawLifeBar(life) {
  const heartWidth = 48; // Width of each heart
  const heartHeight = 48; // Height of each heart
  const heartSpacing = 10; // Spacing between hearts

  const maxLife = 5; // Maximum life value

  // Loop through each heart
  for (let i = 0; i < maxLife; i++) {
    const heartX = i * (heartWidth + heartSpacing); // X-coordinate of the heart

    // Draw a full or empty heart based on the life value
    if (i < life) {
      // Draw a full heart
      const heartImg = new Image();
      heartImg.src = 'heart.png';
      ctx.drawImage(heartImg, heartX+30,75,heartWidth,heartHeight); 
    } else {
      // Draw an empty heart
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(heartX+30, 75, heartWidth, heartHeight);
    }
  }
}





//                                                       Resize windows
  
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    collision.width = window.innerWidth;
    collision.height = window.innerHeight;
    gun.y = canvas.height / 2;
  }
  
  
  // Add event listener for window resize
  window.addEventListener("resize", resizeCanvas);
  
  // Resize canvas initially
  resizeCanvas();
  
  
  





  //                                      Animations 
  
  function animate(timestamp) {
    ctxCol.clearRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    gun.draw();
    gun.y += gun.speedY * gun.directionY;
  
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    timetoNextNigg += deltaTime;
    if (timetoNextNigg > niggInterval) {
      timetoNextNigg = 0;
      niggas.push(new Nigga());
      niggas.sort(function (a, b) {
        return a - b;
      });

      trumps.push(new trump());
      trumps.sort(function (a, b) {
        return a - b;
      });

    }
    if (timetoNextNigg > niggInterval) {
     
    }

   
  

  
//                                                      collision check 

    for (let i = 0; i < niggas.length; i++) {
      const nigga = niggas[i];
      if (nigga.checkCollision(bullets)) {
        nigga.markedForDeletion = true;
        score++;
        let explode = new Explosion(nigga.x, nigga.y, nigga.width);
        explode.sound = new Audio();
        explode.sound.src = 'Rnigga.mp3';
        explosions.push(explode);
      }
    }



    for (let i = 0; i < trumps.length; i++) {
      const trump = trumps[i];
      if (trump.checkCollision(bullets)) {
        trump.markedForDeletion = true;
        life--;
        let explode = new Explosion(trump.x, trump.y, trump.width);
        explode.sound = new Audio();
        explode.sound.src = 'stupid.mp3';
        explosions.push(explode);
      }
    }

    if (life == 0){
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set the background color to white
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    
      // Set the text properties
      ctx.font = '70px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
    
      // Display the "Game Over" message
      ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
      ctx.fillText('Niqqa kill count:' + score, (canvas.width / 2)+60, canvas.height / 2+60);
    }
  
    drawScore();
    drawLifeBar(life);

    [...trumps,...niggas, ...explosions, ...bullets].forEach(object => object.update(deltaTime));
    [...trumps,...niggas, ...explosions, ...bullets].forEach(object => object.draw());
    niggas = niggas.filter(object => !object.markedForDeletion);
    trumps = trumps.filter(object => !object.markedForDeletion);
    explosions = explosions.filter(object => !object.markedForDeletion);
    bullets =bullets.filter(object => !object.delete);
    requestAnimationFrame(animate);
  }
  
  animate(0);
  


}
























//                                        Collision Check with color

// window.addEventListener('click', function (e) {
//   const detectPixelColor = ctxCol.getImageData(e.offsetX, e.offsetY, 1, 1);
//   const pc = detectPixelColor.data;
//   niggas.forEach(object => {
//     if (
//       object.randomColor[0] === pc[0] &&
//       object.randomColor[1] === pc[1] &&
//       object.randomColor[2] === pc[2]
//     ) {
//       object.markedForDeletion = true;
//       score++;
//       explosions.push(new Explosion(object.x, object.y, object.width));
//     }
//   });
// });