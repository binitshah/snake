var canvas = document.getElementById('drawing');
var ctx = canvas.getContext('2d');
var raf;
var mode = "welcome";
var foodx = canvas.width/2 - canvas.width*(1/40)*(0*1.2);
var foody = canvas.height*0.3 - canvas.height*(1/40)*(-16*1.2);
var score = 0;
var highscore = 0;

var snake = {
  boxwidthsize: canvas.width*(1/40),
  boxheightsize: canvas.height*(1/40),
  x: [canvas.width/2 - canvas.width*(1/40)*(0*1.2),
      canvas.width/2 - canvas.width*(1/40)*(0*1.2),
      canvas.width/2 - canvas.width*(1/40)*(0*1.2),
      canvas.width/2 - canvas.width*(1/40)*(0*1.2)],
  y: [canvas.height*0.3 - canvas.height*(1/40)*(0*1.2),
      canvas.height*0.3 - canvas.height*(1/40)*(1*1.2),
      canvas.height*0.3 - canvas.height*(1/40)*(2*1.2),
      canvas.height*0.3 - canvas.height*(1/40)*(3*1.2)],
  chainmembers: 3,
  movingdirection: 1,
  moveleft: function(){
    for(var i = this.x.length; i >= 1; i--){
      if(i != 1){
        this.x[i-1] = this.x[i-2];
        this.y[i-1] = this.y[i-2];
      }
      else{
        this.x[0] -= canvas.width*(1/40)*(1*1.2);
      }
    }
  },
  moveright: function(){
    for(var i = this.x.length; i >= 1; i--){
      if(i != 1){
        this.x[i-1] = this.x[i-2];
        this.y[i-1] = this.y[i-2];
      }
      else{
        this.x[0] += canvas.width*(1/40)*(1*1.2);
      }
    }
  },
  moveup: function(){
    for(var i = this.x.length; i >= 1; i--){
      if(i != 1){
        this.x[i-1] = this.x[i-2];
        this.y[i-1] = this.y[i-2];
      }
      else{
        this.y[0] -= canvas.height*(1/40)*(1*1.2);
      }
    }
  },
  movedown: function(){
    for(var i = this.x.length; i >= 1; i--){
      if(i != 1){
        this.x[i-1] = this.x[i-2];
        this.y[i-1] = this.y[i-2];
      }
      else{
        this.y[0] += canvas.height*(1/40)*(1*1.2);
      }
    }
  },
  move: function(){
    switch(this.movingdirection){
      case 1:
        //down
        this.movedown();
        break;
      case 2:
        //up
        this.moveup();
        break;
      case 3:
        //left
        this.moveleft();
        break;
      case 4:
        //right
        this.moveright();
        break;
    }
  },
  draw: function(){
    ctx.fillStyle = "#000000";
    for(var i = 0; i < this.chainmembers; i++){
      ctx.fillRect(this.x[i] - this.boxwidthsize*0.5,
                   this.y[i] - this.boxheightsize*0.5,
                   this.boxwidthsize,
                   this.boxheightsize);
    }
  },
  addsegment: function(){
    this.chainmembers++;
    this.x.push(0);
    this.y.push(0);
  },
  gameover: function(){
    for(var i = this.x.length; i > 1; i--){
      if(this.x[0] == this.x[i-1] && this.y[0] == this.y[i-1]){
         return true;
      }
    }
  },
  outofboundsgameover: function(){
    if(this.x[0] > canvas.width || this.x[0] < 0 || this.y[0] > canvas.height || this.y[0] < 0){
      return true;
    }
  }
};

var food = {
  draw: function(){
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    var radarc = canvas.width*(1/75);
    ctx.arc(foodx,foody,radarc,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
  },
  iseating: function(){
    if(snake.x[0] == foodx && snake.y[0] == foody){
      return true;
    }
    else{
      return false;
    }
  },
  newrandomloc: function(){
    var randx = (Math.floor((Math.random() * 32) + 1)) - 16;
    var randy = (Math.floor((Math.random() * 31) + 1)) - 22;
    var newxloc = canvas.width/2 - canvas.width*(1/40)*(randx*1.2);
    var newyloc = canvas.height*0.3 - canvas.height*(1/40)*(randy*1.2);

    if(newxloc > 0 && newxloc < canvas.width){
      foodx = newxloc;
    }
    if(newyloc > 0 && newyloc < canvas.height){
      foody = newyloc;
    }
  }
};

function draw(){
  ctx.fillStyle="rgba(255,255,255,1)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  if(mode === "play"){
    ctx.textAlign = "center";
    ctx.font = "13px arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Score: " + score,canvas.width*0.10,canvas.height*0.05);

    snake.draw();
    food.draw();

    if(snake.gameover() === true || snake.outofboundsgameover() === true){
      mode = "welcome";
      if(score > highscore){
        highscore = score;
      }
      score = 0;
      snake.x = [canvas.width/2 - canvas.width*(1/40)*(0*1.2),
                 canvas.width/2 - canvas.width*(1/40)*(0*1.2),
                 canvas.width/2 - canvas.width*(1/40)*(0*1.2),
                 canvas.width/2 - canvas.width*(1/40)*(0*1.2)];
      snake.y = [canvas.height*0.3 - canvas.height*(1/40)*(0*1.2),
                 canvas.height*0.3 - canvas.height*(1/40)*(1*1.2),
                 canvas.height*0.3 - canvas.height*(1/40)*(2*1.2),
                 canvas.height*0.3 - canvas.height*(1/40)*(3*1.2)];
      snake.chainmembers = 3;
      snake.movingdirection = 1;
      foodx = canvas.width/2 - canvas.width*(1/40)*(0*1.2);
      foody = canvas.height*0.3 - canvas.height*(1/40)*(-16*1.2);
    }

    if(food.iseating()){
      //eating
      snake.addsegment();
      food.newrandomloc();
      score++;
      if(score == 1){
        clearInterval(intervalID);
        intervalID = intervalID = setInterval(function(){snake.move();}, 700);
      }
      if(score == 2){
        clearInterval(intervalID);
        intervalID = intervalID = setInterval(function(){snake.move();}, 600);
      }
      if(score == 3){
        clearInterval(intervalID);
        intervalID = intervalID = setInterval(function(){snake.move();}, 500);
      }
      if(score == 4){
        clearInterval(intervalID);
        intervalID = intervalID = setInterval(function(){snake.move();}, 400);
      }
      if(score == 5){
        clearInterval(intervalID);
        intervalID = intervalID = setInterval(function(){snake.move();}, 300);
      }
      if(score == 6){
        clearInterval(intervalID);
        intervalID = intervalID = setInterval(function(){snake.move();}, 200);
      }
      if(score == 7){
        clearInterval(intervalID);
        intervalID = intervalID = setInterval(function(){snake.move();}, 100);
      }
      if(score == 8){
        clearInterval(intervalID);
        intervalID = intervalID = setInterval(function(){snake.move();}, 50);
      }
    }

  }
  else if(mode === "welcome"){
    ctx.textAlign = "center";
    ctx.font = "13px arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("HighScore: " + highscore,canvas.width*0.12,canvas.height*0.05);

    ctx.textAlign = "center";
    ctx.font = "13px arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Use the four arrow keys to play. Press any key to start.",canvas.width/2,canvas.height*0.75);
    ctx.font = "50px Arial";
    ctx.fillText("Snake",canvas.width/2,canvas.height*0.65);

    ctx.fillRect((canvas.width/2) - snake.boxwidthsize*0.5,
                 (canvas.height*0.3 - snake.boxheightsize*(0*1.2)) - snake.boxheightsize*0.5,
                 snake.boxwidthsize,
                 snake.boxheightsize);

    ctx.fillRect((canvas.width/2) - snake.boxwidthsize*0.5,
                 (canvas.height*0.3 - snake.boxheightsize*(1*1.2) ) - snake.boxheightsize*0.5,
                 snake.boxwidthsize,
                 snake.boxheightsize);

    ctx.fillRect((canvas.width/2) - snake.boxwidthsize*0.5,
                 (canvas.height*0.3  - snake.boxheightsize*(2*1.2) ) - snake.boxheightsize*0.5,
                 snake.boxwidthsize,
                 snake.boxheightsize);
  }

  raf = window.requestAnimationFrame(draw);
}

window.addEventListener('keydown', function(event) {
  if(mode == "play"){
      switch (event.keyCode) {
        case 37: // Left
          snake.moveleft();
          snake.movingdirection = 3;
          break;

        case 38: // Up
          snake.movingdirection = 2;
          snake.moveup();
          break;

        case 39: // Right
          snake.movingdirection = 4;
          snake.moveright();
          break;

        case 40: // Down
          snake.movingdirection = 1;
          snake.movedown();
          break;
      }
  }
  else if(mode == "welcome"){
    mode = "play";
  }
}, false);

var intervalID = setInterval(function(){
  snake.move();
}, 1000);

raf = window.requestAnimationFrame(draw);
