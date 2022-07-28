let fileInput = document.getElementById("file-input");
const img = new Image();

let brightness = document.getElementById("brightness");
let contrast = document.getElementById("contrast");
let transparent = document.getElementById("transparent");

let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


fileInput.onchange = function() {
    img.onload = loadImage;
    img.src = URL.createObjectURL(this.files[0]);
};

function loadImage() {
    let canvas = document.getElementById('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(this, 0,0);
}

function bct (brightness, contrast, transparent) {
    ctx.drawImage(img, 0, 0);
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {

        let factor = 259 * (255 + contrast) / (255 * (259 - contrast));

        pixels[i] = truncate((factor * (pixels[i] - 128) + 128) + brightness);
        pixels[i + 1] = truncate((factor * (pixels[i + 1] - 128) + 128) + brightness);
        pixels[i + 2] = truncate((factor * (pixels[i + 2] - 128) + 128) + brightness);
        pixels[i + 3] = truncate(pixels[i + 3] * transparent);

    }
    ctx.putImageData(imageData, 0, 0);
}

function truncate (value) {
    if (value < 0) {
        value = 0;
    } else if (value > 255) {
        value = 255;
    }
    return value;
}

brightness.addEventListener("change", function () {
    bct(parseInt(brightness.value), parseInt(contrast.value), parseFloat(transparent.value));
});
contrast.addEventListener("change", function () {
    bct(parseInt(brightness.value), parseInt(contrast.value), parseFloat(transparent.value));
});
transparent.addEventListener("change", function () {
    bct(parseInt(brightness.value), parseInt(contrast.value), parseFloat(transparent.value));
});


let saveButton = document.getElementById("save-button");
function downloadCanvas (){
    let downloadedFile = canvas.toDataURL();
    let tmpLink = document.createElement( 'a' );
    tmpLink.download = 'result.png';
    tmpLink.href = downloadedFile;
    document.body.appendChild( tmpLink );
    tmpLink.click();
    document.body.removeChild( tmpLink );
}
saveButton.addEventListener("click", downloadCanvas);