const alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","U","V","W","X","Y","Z"];

//Recuperar los elementos del HTML
const inputOriginal = document.getElementById('input-original');//input
const cifrador = document.getElementById('cifrador');//form
const resultado = document.getElementById('resultado');//div
const rango = document.getElementById('rango');//input
const printChar= (currentLetterIndex, wordArray) => { //funcion recursiva
    if(wordArray.length === currentLetterIndex) return;//Evitar la recursion infinita cuando estemos en la ultima letra del array

    inputOriginal.value = inputOriginal.value.substring(1);//Quitarle la primer letra al input. Nos ayuda a la animacion cuando sacamos una letra del input y la ponemos abajo en el output
    const spanChar = document.createElement("span");//creamos una etiqueta span
    resultado.appendChild(spanChar);//Agregamos la etiqueta span al elemento con el id resultado (div)

    //Animar caracter
    animateChar(spanChar)
        .then(() => {//Cuando se cumple a promesa se ejecutara este bloque de codigo
            const charSinCodificar = wordArray[currentLetterIndex];
            //Agregar el contenido a la etiqueta span que creamos
            spanChar.innerHTML = alfabeto.includes(charSinCodificar) ? //Si nuestro array alfabeto tiene la letra que el usuario escribio
                /*
                Dentro del array alfabeto buscamos el caracter sin encriptar mediante la suma del indice del caracter sin encriptar y el valor del rango de encriptacion.
                El modulo nos sirve por si estamos al final del alfabeto dar la vuelta de nuevo es decir si estamos en la z (indice 25) y el rango es 10 la suma daria
                35 y nos arrojaria una excepcion dado que es mayor que la longitud del arreglo, esto se resuleve con el modulo dado que llegando
                al indice (26 + 10) % 26 = 36 % 26 = 10 y nos traeria la letra con el indice 10 es decir daria la vuelta al alfabeto

                 */
                alfabeto[(alfabeto.indexOf(charSinCodificar) + parseInt(rango.value)) % alfabeto.length] :
                charSinCodificar;//Si no esta es decir si es un numero o un signo lo regresamos tal cual es
            printChar(currentLetterIndex + 1,wordArray);//Llamada recursiva y aumentamos el index de la letra para que no sea un llamado infinito
        })
}
const shiftMessage = () => {
    //obtener input original y convertirlo a un array de solo mayusculas
    const wordArray = [...inputOriginal.value.toUpperCase()];//... nos ayuda a en lugar de que sea un String sea una lista de argumentos
    // alert(wordArray);//input: Hola -> output: H,O,L,A
    printChar(0,wordArray);//(indiceActual, arrayDePalabra)
}

/*JS de animaciones*/
const animateChar = spanChar => {
    let cambiosDeLetra = 0;
    //Uso de promesa para esperar a que se encripte el caracter para colocar la letra encriptada
    return new Promise(resolve => {
//Ejecutar este bloque de codigo varias veces, durante un tiempo determinado para lograr la animacion de las letras al aprecer en el output
        const intervalo = setInterval(() => {
            spanChar.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)];//Mostrar una leta aleatoria
            cambiosDeLetra++;
            if(cambiosDeLetra === 3){
                clearInterval(intervalo);//Terminamos el intervalo
                resolve();//Da como resuelta la promesa y pasamos al siguiente caracter
            }
        }, 50);
    });
}


const submit = e => {
    e.preventDefault();//Evitar el comportamiento base es decir evitar enviar el form
    resultado.innerHTML = '';//Borrar lo que haya en ese momento que el usuario da enter dado que es un resultado anterior
    shiftMessage();
}

cifrador.onsubmit = submit;//cunado el usuario de enter llamar a funcion submit