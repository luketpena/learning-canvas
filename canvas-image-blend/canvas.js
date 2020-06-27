let canvas;
let c;


function init() {
    console.log('Canvas start!');
    
    canvas = document.querySelector('canvas');
    c = canvas.getContext('2d');

    canvas.width = window.innerWidth-32;
    canvas.height = window.innerHeight-32;

    let image = document.getElementById('mario');


    //const newData = setToBlack(image.data);

    c.drawImage(image,0,0,image.width,image.height);

    c.fillStyle = '#0ff';
    c.globalCompositeOperation = "hue";
    c.fillRect(0,0,canvas.width,canvas.height)

    c.globalCompositeOperation = "destination-in";
    c.drawImage(image,0,0,image.width,image.height);

    image.hidden = true;
}

function setToBlack(data) {
    let newData = [...data];
    const n = data.length/4;

    for (var i=0; i<n; i++) {
        const pixel = i*4;
        for (var j=0; j<3; j++) {
            newData[i+j] = 0;
        }
    }

    return newData;
}




window.addEventListener('load',init);