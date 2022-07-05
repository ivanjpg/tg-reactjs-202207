// Enviamos información a la consola del navegador
console.log('¡Hola, mundo!')

// El estándar moderno de Javascript no exige el uso obligatorio
// de ";" al terminar cada sentencia. Sin embargo, es recomenbdable
// su uso, dado que existe una característica llamada
// Automatic Semicolon Insertion (ASI), donde el motor de Javascript
// inserta los ";", donde asume que es necesario. Aunque en ciertos
// casos no tiene el comportamiento esperado.
console.log('¡Hola, mundo, con ;!');

// Usualmente se utiliza "var" para declarar variables en JS,
// pero es recomendable usar "let". Si bien funcionan de manera casi
// idéntica, sí existen diferencias y se recomienda migrar al uso
// de "let" para los nuevos sistemas.
let x = 3.2;
console.log('La variable x=' + x);

// También podemos conocer el tipo de dato asignado a la variable,
// dado que en JS no se especifica el tipo de datos. El intérprete
// lo asume a partir de la asignación.
console.log('El tipo de datos de "x" es: ' + typeof x);

// Tenemos en JS estructuras de control, como "if"
if(x < 5) {
  console.log('La variable x vale menos de 5');
}

// Contamos además con ciclos como "for".
// Una diferencia fundamental entre "var" y "let", es que la segunda
// sí tiene un significado en el alcance (scope) de bloque.
for(var i=0; i < 10; i++) {
  console.log('i=' + i);
}

// La siguiente instrucción sólo funciona en el caso en que dentro del
// "for", la "i" se declaró usando "var". Si por el contrario, se usó
// "let" para declararla, la variable sólo vive dentro del bloque.
console.log('Fuera del "for", i=' + i);

// Las funciones en JS suelen declararse utilizando la palabra
// reservada "function"
function suma(a, b) {
  return a + b;
}

// Usamos la función e imprimos el resultado.
// En JS también tenemos la "interpolación", a través de lo que
// formalmente se llama "string template".
// Esto es, sustituimos expresiones válidas de JS dentro de
// cadenas de texto. Esto se logra a través de las "backticks" ``
// que sustituyen a las comillas dobles ("") y a las comillas
// sencillas ('').
// Para lograr esta sustitución, se encierra la expresión de JS
// que deseamos, dentro de:   ${}
console.log(`La suma de 1+2=${suma(1,2)}`);

// Definamos entonces al factorial de un número "n" como:
// n! = n * (n-1)!, el cual leemos como:
// "n factorial es igual a n por (n-1) factorial"
// Se trata de una definición recursiva, por lo que necesitamos
// una claúsula de escape, que en este caso es: 0! = 1

// Ejemplo:
// 3! = 3*(3-1)! = 3*2! = 3*2*(2-1)! = 3*2*1! = 3*2*1*(1-1)!
//    = 3*2*1*0! = 3*2*1*1 = 6

// Una manera práctica (operacional) de hacerlo es multiplicando:
// 3! = 3*2 = 6
// 5! = 5*4*3*2 = 120

// Ejercicio 01:
//    Escribir una función que calcule el factorial de un número
//    "n", a través de la definición recursiva.

function fact(n) {
  if(n == 0) {
    return 1;
  }

  return n * fact(n-1);
}

// Probando el factorial
console.log(`3! = ${fact(3)}`);
console.log(`5! = ${fact(5)}`);

// Escribamos una función que calcule el factorial
// usando un ciclo, es decir, usando la definición
// "práctica" del factorial.
function fact2(n) {
  let f = 1;

  for(let i=2; i<=n; i++) {
    // f = f * i;
    f *= i;
  }

  return f;
}

// Probando el factorial2
console.log(`3! = ${fact2(3)}`);
console.log(`5! = ${fact2(5)}`);