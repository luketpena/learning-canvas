let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth-32;
canvas.height = window.innerHeight-32;

let c = canvas.getContext('2d');

let gravity = 1;
let friction = .95;

function randomRange(start,end) {
    return start+((end-start)*Math.random());
}

function Ball(x,y,dx,dy,radius,color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.scale = 1;
    

    this.draw = function() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius*this.scale,0,Math.PI*2,true);
        c.fillStyle = color;
        c.fill();
    }

    this.update = function() {
        if (this.y + this.radius >= canvas.height) {
            this.dy = -this.dy * friction;
            console.log('BOUNCE:', this.dy);
            
        } else {
            this.dy += gravity;
        }
        if (this.x-this.radius <= 0 || this.x+this.radius >= canvas.width) {
            this.dx = -this.dx;
        }
        this.y = Math.min(this.y+this.dy,canvas.height-this.radius);
        this.x = Math.max(Math.min(this.x+this.dx,canvas.width-this.radius),this.radius);
        this.draw();
    }
}

let ballList = [];
function init() {
    for (var i=0; i<50; i++) {
        let color = `rgba(${randomRange(100,255)},${randomRange(100,255)},${randomRange(100,255)},1)`
        let ball = new Ball(Math.random()*canvas.width,Math.random()*canvas.height/2,randomRange(-4,4),randomRange(-32,-3),randomRange(16,48),color);
        ballList.push(ball);
    }
    
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    for (let ball of ballList) {
        ball.update();
    }
    
}

init();
animate();