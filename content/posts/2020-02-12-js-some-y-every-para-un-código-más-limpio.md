---
template: post
title: 'JS: Some y Every para un código más limpio'
slug: some-y-every-para-un-codigo-mas-limpio
draft: false
date: 2020-02-12T18:37:08.456Z
description: >-
  Los métodos 'some' y 'every' en Javascript no son tan conocidos como map,
  filter y reduce pero son tan útiles como estos últimos.
category: Javascript
tags:
  - cleancode
  - functional
  - point-free
---
En este artículo quiero compartir dos métodos de _arrays_ que van a ayudarte a tener un código más ordenado y predecible.

Me refiero a los métodos: `some` y `every`. Estos métodos fueron introducidos en `ES5` junto con los más populares `map`, `filter` y `reduce`.

## Some

¿Cuántas veces has visto o hecho algo así?

```js
const apiResponses = [
  {
    data: {
      name: 'foo'
    }
  },
  {
    data: {
      error: {
        message: 'ups'
      }
    },
    statusCode: 500
  },
  {
    data: {
      name: 'foo'
    }
  }
];

let error = false;
for (let i; i <= apiResponses.length; i++) {
  if (response.statusCode === 500) {
    error = true;
  }
}

console.log(error); // true
```

Lo cierto es que esto es un problema, por que no nos interesa para nada qué es `i`. Además, estamos usando un enfoque imperativo, en vez de uno declarativo. Si quieres saber más de esto te dejo un artículo: [Imperativo vs declarativo](https://dzone.com/articles/imperative-vs-declarative-javascript)

### Some al rescate

Ahora veamos el otro enfoque:

```js
const error = apiResponses.some(response => response.statusCode === 500);
console.log(error); // true
```

Muchos más corto, y con menor probabilidad a errores de humano!

Esto se puede mejorar aún más pasando el _callback_ a la función some como una referencia a otro función:

```js
const hasServerError = response => response.statusCode === 500;
const error = apiResponses.some(hasServerError);
console.log(error); // true
```

Esto es mucho más legible aún, porque se lee como inglés común y corriente: 'error será true si alguna (some) apiResponse tiene server error'. Bueno, en inglés suena mejor.

> Dato freak: este estilo de pasar los _callbacks_ sin explicitar los argumentos se conoce como [point-free style](https://medium.com/dailyjs/functional-js-7-point-free-style-b21a1416ac6a)

## Every

Pasemos a ver la contraparte de `some`: `every`

```js
const hasGoodStatus = response => response.statusCode === 200;
const areAllResponsesGood = apiResponses.every(hasGoodStatus);
console.log(areAllResponsesGood); // false
```

Podemos ver que `every` retorna `true` solo si todos los elementos del `array` retornan `true` al ser llamados con el _callback_, que en este caso es `hasGoodStatus`

## Action Points

Para poner en práctica lo aprendido te sugiero:

- Intentar usar uno de estos métodos en tu día a día, quizás refactorizando un código antiguo o al crear uno nuevo.
- Intentar aplicar el estilo _point-free_ para abstraer aún más las implementaciones que reciban las funciones `every` y `some`.
