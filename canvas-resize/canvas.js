let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');


c.fillStyle = '#00aaff88';
//c.fillRect(100,100,256,256);

/*--------< LINE DRAWING >--------*/

c.beginPath();

c.moveTo(50,500);
c.lineTo(300,50);
c.lineTo(400,300);

c.strokeStyle = "red";

//c.stroke();

/*--------< circles >--------*/

let mouse = {
    x: undefined,
    y: undefined,
}

window.addEventListener('mousemove',(event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
});

function Circle(x,y,dx,dy,radius,color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.scale = .1;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius*this.scale,0,Math.PI*2,true);
        c.fillStyle = color;

        c.fill();
    }

    this.update = function() {
        //Flip velocity
        if (this.x+this.radius>innerWidth  || this.x-this.radius<0) this.dx = -this.dx;
        if (this.y+this.radius>innerHeight || this.y-this.radius<0) this.dy = -this.dy;
        //Animate movement
        this.x += this.dx;
        this.y += this.dy;  

        if (Math.abs(mouse.x-this.x)<this.radius && Math.abs(mouse.y-this.y)<this.radius) {
           if (this.scale<1) this.scale += (1-this.scale)*.05;
        } else {
           if (this.scale>.1) this.scale *= .95;
        }
    }


}

let circleList = [];
for (let i=0; i<1000; i++) {
    let radius = 15+(45*Math.random());
    let x = randomRange(radius,window.innerWidth-radius);
    let y = randomRange(radius,window.innerHeight-radius);
    let dx = randomRange(-2,2);
    let dy = randomRange(-2,2);
    
    let color = `rgba(${randomRange(100,255)},${randomRange(100,255)},${randomRange(100,255)},1)`

    let circle = new Circle(x,y,dx,dy,radius,color);
    circleList.push(circle);
}


function randomRange(start,end) {
    return start+((end-start)*Math.random());
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    for (let circle of circleList) {
        circle.update();
        circle.draw();
    }
}

animate();

// let x = window.innerWidth*Math.random();
// let y = window.innerHeight*Math.random();
// let color = "red";
// let dx = randomRange(-5,5);
// let dy = randomRange(-5,5);
// let radius = 30;

// function animate() {
//     requestAnimationFrame(animate);
//     c.clearRect(0,0,innerWidth,innerHeight);
//     // for (let i=0; i<200; i++) {

//     //     let x = Math.random()*window.innerWidth;
//     //     let y = Math.random()*window.innerHeight
//     //     let radius = 15+(45*Math.random());
//     //     let color = `rgba(${randomRange(100,255)},${randomRange(100,255)},${randomRange(100,255)},1)`
//     //     generateCircle(x,y,radius,color)
//     // }

//     c.beginPath();
//     c.arc(x,y,radius,0,Math.PI*2,true);
//     c.strokeStyle = color;
//     c.stroke();
    
//     if (x+radius>innerWidth || x-radius<0) {
//         dx = -dx;
//     }

//     if (y+radius>innerHeight || y-radius<0) {
//         dy = -dy;
//     }

//     x += dx;
//     y += dy;
    
// }

// animate();