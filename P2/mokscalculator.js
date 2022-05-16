display = document.getElementById("display")
igual = document.getElementById("igual")
clear = document.getElementById("reset")
del = document.getElementById("delete")
answer = document.getElementById("answer")
let digitos = document.getElementsByClassName("valor");
let operacion = document.getElementsByClassName("operator")
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3,
  }

let estado = ESTADO.INIT
    
    function calculadora(digito)
{
    //-- Se ha recibido un dígito
    //-- Según en qué estado se encuentre la calculadora
    //-- se hará una cosa u otra

    //-- Si es el primer dígito, no lo añadimos,
    //-- sino que lo mostramos directamente en el display
    if (estado == ESTADO.INIT) {
      display.innerHTML = digito;
      estado = ESTADO.OP1;
    }else if (estado == ESTADO.OP1){
      display.innerHTML += digito;
    } else if (estado == ESTADO.OPERATION) {
      display.innerHTML += digito;
      estado = ESTADO.OP2;
    }else if (estado == ESTADO.OP2){
      display.innerHTML += digito;
    }
  }
for (i=0; i<digitos.length; i++){
  digitos[i].onclick = (ev) =>{
    calculadora(ev.target.value);
  } 
}

function operaciones(operador){
  if (estado != ESTADO.OPERATION) {
    display.innerHTML += operador;
    estado = ESTADO.OPERATION;
  }
}

for (i=0; i<operacion.length; i++){
  operacion[i].onclick = (ev)=>{
    if(estado == ESTADO.OP1){
           display.innerHTML += ev.target.value;
           estado = ESTADO.OPERATION;
         }
      }
}

//-- Evaluar la expresion
igual.onclick = () => {
     display.innerHTML = eval(display.innerHTML);
     answer.value = display.innerHTML;
     estado = ESTADO.OP1;
 }

//-- Poner a cero la expresion
//-- Y volver al estado inicial
clear.onclick = () => {
display.innerHTML = " ";
estado = ESTADO.INIT;
}

//-- Borrar operando
del.onclick = () => {
  if (display.innerHTML == " "){
    display.innerHTML = "";
  }else{
    display.innerHTML = display.innerHTML.slice(0,-1);
  }
}


 // Answer
 answer.onclick = () => {
    display.innerHTML = answer.value;
    estado = ESTADO.OP1;
 }