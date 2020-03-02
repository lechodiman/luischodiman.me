---
template: post
title: 'Vue: Watchers v/s Computed Properties'
slug: vue-watchers-vs-computed-properties
draft: false
date: 2020-02-14T14:02:25.322Z
description: >
  ¿Qué son watchers y computed properties en Vue? Acá daré una introducción a
  ambos, así como también ciertos tips para saber cuándo usar cada uno.
category: Vue
tags:
  - refactoring
  - vue
  - computed
  - watchers
socialImage: './images/banner.jpg'
socialImageCredit: 'Foto por [Ocean Ng](https://unsplash.com/photos/L0xOtAnv94Y)'
---

**Vue** es el framework de _javascript_ con la curva de aprendizaje más plana
de los tres grandes (Vue, React, Angular), pero eso no significa que no
existan cosas que aprender (y aprender a usar bien).

Una de las cosas que encontré más novedosas al aprender **Vue** y usarlo en
producción fueron los **watchers** y **computed properties**.

## Watchers

Esencialmente, las **watched properties** o **watcher** son funciones que nos
ayudan a generar cambios (o _side effects_) dentro de un componente en
**Vue**. Lamentablemente, hay veces que se usan innecesariamente cuando una
_computed property_ bastaba.

Por ejemplo, si tenemos una lista de _to dos_ y queremos obtener solo
aquellos que están completados podríamos **ingenuamente** hacer algo así:

```js
const vm = new Vue({
  data() {
    return {
      todos: [
        {
          name: 'escribir este blog',
          completed: false
        },
        {
          name: 'deploy de la primera version de mi blog',
          completed: true
        }
      ],
      completedTodos: []
    },
  },
  watch: {
    // highlight-start
    todos: function(val) {
      const isCompleted = todo => todo.completed
      this.completedTodos = this.todos.filter(isCompleted)
    }
    // highlight-end
  }
})
```

Pero, si bien esto funciona, hay varios problemas con este caso de uso.

- Estamos haciendo un _side effect_, que básicamente son cambios en el estado
  producto de ejecutar una función, en este caso sería el **watch**. Esto no es
  algo malo en sí mismo pero si se puede evitar, hay que hacerlo (hint: en este
  caso sí se puede evitar)
- Esta es una reacción _imperativa_ ante cambios en
  el valor de la variable `todos`, lo cual se puede cambiar por un enfoque
  _declarativo_

Okay, basta de suspenso, entonces ¿cómo se puede refactorizar este código
para arreglar los problemas mencionados? y ¿cuál sería un buen caso de uso
para un _watcher_?

## Refactorizando con computed properties

Las **computed properties** son funciones que "por debajo" de Vue asignan
propiedades a la instancia de Vue (con _getters_ y _setters_ de Javascript).

Esto permite que podamos definir propiedades que dependan de otras y que
siempre estén actualizadas de una forma _declarativa_.

Además tienen las ventajas de ser _cacheadas_ internamente por Vue. Así, solo
cambian cuando las variables de las que dependen cambian.

> Dato freak: en lenguajes como Python, puedes declarar `properties` con
> decoradores y se logra el mismo efecto que acá: propiedades que dependen de
> otras y se mantienen siempre actualizadas.

Vamos al ejemplo:

```js
const vm = new Vue({
  data() {
    return {
      todos: [
        {
          name: 'escribir este blog',
          completed: false
        },
        {
          name: 'deploy de la primera version de mi blog',
          completed: true
        }
      ],
      // Ahora ya no tenemos la variable completedTodos en el data
    },
  },
  computed: {
    completedTodos() { // Ahora se define declarativamente acá
      const isCompleted = todo => todo.completed
      return this.todos.filter(isCompleted)
    }
  }
})
```

¿Qué cambió con esto?

- Ahora la función no cambia manualmente el valor de alguna variable del _state_
  del componente, sino que retorna un valor dependiendo de la variable `todos`.
- Ahora la propiedad `completedTodos` es declarativa, es decir, especifica qué
  se está consiguiendo, en vez de cómo se está consiguiendo.

> Tip: Siempre que te enfrentes ante un problema donde una propiedad depende de
> otra, prioriza _computed properties_ por sobre _watchers_. Así el código queda
> más declarativo y le darás menos dolores de cabeza a cualquier otro
> desarrollador que mire tu código.

Perfecto, un problema solucionado, pero entonces, ¿en qué momentos debería usar
_watchers_?

## Casos de uso para watchers

- Operaciones asíncronas: una de las limitancias de las _computed properties_ es
  que deben ser síncronas para que siempre se mantengan actualizadas si sus
  dependencias cambian. En estos casos, es mejor usar un _watcher_
- Variables que dependen de combinaciones entre el valor **antiguo** y el
  **nuevo** de otra variable.
- Cambios que dependan de cambios en la ruta. Por ejemplo, si tenemos un
  componente montado, pero queremos ejecutar métodos (o cambios) cuando la ruta
  cambia.

Veamos un ejemplo: supongamos que tenemos un formulario de tres pasos, donde
controlamos el componente a mostrar dependiendo del paso (`activeStep`) en el
que estamos. Además, queremos saber si el usuario volvió hacia atrás en el
formulario, porque queremos que cuando esto pase, entonces que al apretar
'siguiente' no vaya al siguiente paso sino que directamente a la pantalla final.

```js
const vm = new Vue({
  data() {
    return {
      activeStep: 0

      // variable para saber si el usuario
      // fue 'hacia atrás en el formulario'
      activeStepWentBackwards: false
    };
  },
  watch: {
    activeStep: function(newValue, prevValue) {
      if (newValue < prevValue) {
        this.activeStepWentBackwards = true;
      }
    }
  }
});
```

Con esto, necesariamente necesitábamos tener acceso tanto al valor nuevo de la
variable `activeStep` como al valor antiguo. Así, si el valor nuevo es menor que
el antiguo, asignamos el valor de la variable `activeStepWentBackwards` como
`true`.

## Action Points

- Si te encuentras con la necesidad de usar propiedades que dependan de otras en tu día a día con Vue: usa computed properties.
- Si has usado _watchers_ innecesariamente en casos que una _computed property_ bastaba, intenta refactorizar tu código para ver si queda más ordenado.
