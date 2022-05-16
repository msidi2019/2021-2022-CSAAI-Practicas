console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const img = document.getElementById('imagen');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//-- Acceso al deslizador
const deslizadorR = document.getElementById('deslizadorr');
const deslizadorG = document.getElementById('deslizadorg');
const deslizadorB = document.getElementById('deslizadorb');
//-- Valor del deslizador
const range_value_red = document.getElementById('range_value_red');
const range_value_blue = document.getElementById('range_value_blue');
const range_value_green = document.getElementById('range_value_green');

const grises = document.getElementById('gris');
const colors = document.getElementById('color');
const binario = document.getElementById('binario');
const negativo = document.getElementById('negativo');
const tabla = document.getElementById('tabla');
//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

    //-- Se establece como tamaño del canvas el mismo
    //-- que el de la imagen original
    canvas.width = img.width;
    canvas.height = img.height;
  
    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);
  
    console.log("Imagen lista...");
  };

  function colores (data){
    umbralR = deslizadorR.value;
    umbralG = deslizadorG.value;
    umbralB = deslizadorB.value;
  
    //-- Filtrar la imagen según el nuevo umbral
    for (let i = 0; i < data.length; i+=4) {
      if (data[i] > umbralR){
        data[i] = umbralR;
      }
      if (data[i+1] > umbralG){
      data[i+1] = umbralG;
      }
      if (data[i+2] > umbralB){
      data[i+2] = umbralB;
      }
    }

}

//-- Funcion de retrollamada de los deslizadores
deslizadorR.oninput = () => {
    range_value_red.innerHTML = deslizadorR.value;
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data
    colores(data);
    ctx.putImageData(imgData, 0, 0);
}

deslizadorG.oninput = () => {
    range_value_green.innerHTML = deslizadorG.value;
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data
    colores(data);
    ctx.putImageData(imgData, 0, 0);
}
deslizadorB.oninput = () => {
    range_value_blue.innerHTML = deslizadorB.value;
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data
    colores(data);
    ctx.putImageData(imgData, 0, 0);
}

grises.onclick = () => {
    ctx.drawImage(img, 0,0);
    document.getElementById("tabla").style.display = 'none';
    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //-- Obtener el array con todos los píxeles
    let data = imgData.data
    //-- Filtrar la imagen según el nuevo umbral
    for (var i = 0; i < data.length; i+=4) {
        R = data[i];
        G = data[i+1];
        B = data[i+2];
        gris = (3 * R + 4 * G + B)/8;
        gris = data[i] = data[i+1] = data[i+2];
    }
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }

colors.onclick = () => {
    ctx.drawImage(img, 0,0);
    document.getElementById("tabla").style.display = 'inline-block';
    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //-- Obtener el array con todos los píxeles
    let data = imgData.data
    deslizadorR.value = 255;
    deslizadorG.value=255;
    deslizadorB.value= 255;
}

binario.onclick = () => {

    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    data = imgData.data;
    document.getElementById("tabla").style.display = 'none';
  
    var pixel = imgData.data;
    var bw = 240;
    var binarizacion = 0;

    for (let i = 0; i < data.length; i+=4) {
      pixel = data[i];
      if (pixel > bw) {
        binarizacion = 255;
      } else {
        binarizacion = 0;
      }
      data[i] = binarizacion;
      data[i+1] = binarizacion;
      data[i+2] = binarizacion;
    }
    ctx.putImageData(imgData, 0, 0);
}