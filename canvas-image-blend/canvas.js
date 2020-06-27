let canvas;
let c;


function init() {
    console.log('Canvas start!');
    
    canvas = document.querySelector('canvas');
    c = canvas.getContext('2d');

    canvas.width = window.innerWidth-32;
    canvas.height = window.innerHeight-32;

    let image = document.getElementById('mario');
    c.drawImage(image,0,0,image.width,image.height);


}





window.addEventListener('load',init);