const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

let image = null;

let uploadButton = document.getElementById("imageFileInput");
let downloadButton  = document.getElementById("download");

let blur = document.getElementById("blur");
let contrast = document.getElementById("contrast");
let hueRotate = document.getElementById("hue-rotate");
let sepia = document.getElementById("sepia");

let text = document.getElementById("myInput");

let cropButton = document.getElementById("cropBtn");
let selectButton = document.getElementById("selectBtn");
let deleteSelButton = document.getElementById("deleteSelArea");

//extragem din clasa "filter" toate elementele input cu tipul range
let sliders = document.querySelectorAll(".filter input[type='range']");

//functie resetare filtre
function resetFilters() {
    blur.value="0";
    contrast.value="100";
    hueRotate.value="0";
    sepia.value="0";
    
    addFilter();
}

//functie desenare canvas
function openImg(){
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.filter = addFilter();
    ctx.drawImage(image, 0, 0);
}

//upload imagine
uploadButton.onchange = () => {
    image = new Image();

    image.addEventListener("load", () => {
        resetFilters();
        openImg();
    });

    image.src = URL.createObjectURL(uploadButton.files[0]);
}

//download imagine prin convertirea canvasului la URL 
downloadButton.addEventListener("click", (e) => {
  let url = canvas.toDataURL();
  const element = document.createElement('a');
  element.href = url;
  element.download = "img_edited";
  element.click();
  element.remove();
});

//functie adaugare filtre
function addFilter(){
    canvas.style.filter =  `blur(${blur.value}px) contrast(${contrast.value}%) hue-rotate(${hueRotate.value}deg) sepia(${sepia.value}%)`;
}

sliders.forEach( slider => {
    slider.addEventListener("input", addFilter);
});

//functie zoom in
function zoomIn(){
  canvas.style.width = canvas.clientWidth + 10 + "px";
}

//functie zoom out
function zoomOut(){
  canvas.style.width = canvas.clientWidth - 10 + "px";
}



text.addEventListener("keyup", () => {
  function fctmousedown(eventarg){
    obj = canvas.getBoundingClientRect();
    initX = eventarg.clientX - obj.left;
    initY = eventarg.clientY - obj.top;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image,0,0);
    var txt =text.value;
    ctx.fillStyle = "#000000";
    ctx.font = "50px  Arial, Helvetica, sans-serif";
    ctx.fillText(txt, initX, initY);
  }

  canvas.addEventListener("mousedown", fctmousedown);
});



//crop canvas
cropButton.onclick = () => {
  var isDragging = false;
  var initX, initY, endX, endY;
  //functie mousedown care preia coordonatele mouse-ului
  function fctmousedown(eventarg){
    obj = canvas.getBoundingClientRect();
    isDragging = true;
    initX = eventarg.clientX - obj.left;
    initY = eventarg.clientY - obj.top;
  }

  //functie mousemove care traseaza un dreptunghi in functie de coordonatele mouse-ului
  function fctmousemove(eventarg){
    if(isDragging){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.drawImage(image, 0, 0);
      endX = eventarg.clientX - obj.left;
      endY = eventarg.clientY - obj.top; 
      ctx.strokeRect(initX, initY, endX - initX, endY - initY);
    }
  }

  //functie mouseup care redeseneaza imaginea cropata
  function fctmouseup(eventarg){
    isDragging = false;
    var x = Math.min(initX, endX);
    var y = Math.min(initY, endY);
    var width = Math.abs(initX - endX);
    var height = Math.abs(initY - endY);
    var imageData = ctx.getImageData(x, y, width, height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);
  }

  canvas.addEventListener("mousedown", fctmousedown);
  canvas.addEventListener("mousemove",fctmousemove);
  canvas.addEventListener("mouseup", fctmouseup);
}

//select
selectButton.onclick = () => {
  var isDragging = false;
  var initX, initY, endX, endY;
  function fctmousedown(eventarg){
    obj = canvas.getBoundingClientRect();
    isDragging = true;
    initX = eventarg.clientX - obj.left;
    initY = eventarg.clientY - obj.top;
  }


  function fctmousemove(eventarg){
    if(isDragging){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.drawImage(image, 0, 0);
      endX = eventarg.clientX - obj.left;
      endY = eventarg.clientY - obj.top; 
      ctx.strokeRect(initX, initY, endX - initX, endY - initY);

    }
  }

  function fctmouseup(){
    isDragging = false;
  }

  canvas.addEventListener("mousedown", fctmousedown);
  canvas.addEventListener("mousemove",fctmousemove);
  canvas.addEventListener("mouseup", fctmouseup);
}

//sterge selectie
deleteSelButton.onclick = () => {
  var isDragging = false;
  var initX, initY, endX, endY;
  function fctmousedown(eventarg){
    obj = canvas.getBoundingClientRect();
    isDragging = true;
    initX = eventarg.clientX - obj.left;
    initY = eventarg.clientY - obj.top;
  }


  function fctmousemove(eventarg){
    if(isDragging){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.drawImage(image, 0, 0);
      endX = eventarg.clientX - obj.left;
      endY = eventarg.clientY - obj.top; 
      ctx.strokeRect(initX, initY, endX - initX, endY - initY);
    }
  }

  function fctmouseup(){
    isDragging = false;
    ctx.clearRect(initX, initY, endX - initX, endY - initY); 
  }

  canvas.addEventListener("mousedown", fctmousedown);
  canvas.addEventListener("mousemove",fctmousemove);
  canvas.addEventListener("mouseup", fctmouseup);
}







