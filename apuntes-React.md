//Comando para empezar un proyecto de react
```npx create-react-app````



/* 
** Snippets : rafc - rafcp --> para crear un template de forma rápida
 */

 //React utiliza funciones o clases para crear los componentes
//FC: Functional Component
//Los componentes retornan HTML elements
//Utilizamos el Fragment para no tener que utilizar un div o ponemos  esto '<> </>' para evitar importaciones
//Props: Propiedades que se envian del padre al hijo
//Utilizamos PropTypes para validar los tipos de datos que se envian
//DefaultProps : Lo que se envia por defecto
<!-- useState = hook para crear estados
    ```const [ counter, setCounter ] = useState( value );``` -->

Pruebas unitarias y de integracion
Unitarias  : Estas enfocadas en pequeñas funcionalidades
Integracion : Enfocadas en cómo reaccionan varias piezas en conjunto
Caracteristicas de las pruebass : 
    1. Fáciles de escribir
    2. Fáciles de leer
    3. confiables
    4. Rápidas
    5. Principalmente unitarias


Arrange : Arreglar, --> Preparamos el estado inicial : 
    1. Inicializar el estado
    2. Inicializar el componente
    3. Inicializar el render
    4. Inicializar el DOM
    5. Inicializar el estado del componente
    6. Inicializar el estado del render
    7. Inicializar el estado del DOM
Act : Actuar, --> Ejecutamos las acciones que necesitamos : 
    1. Ejecutar las acciones
    2. Ejecutar las acciones del componente
    3. Ejecutar las acciones del render
    4. Ejecutar las acciones del DOM
Assert : Afirmar --> Verificamos que el resultado es el que esperamos : 
    1. Verificar el resultado
    2. Verificar el resultado del componente
    3. Verificar el resultado del render
    4. Verificar el resultado del DOM


Cuando mandamos tareas asincronas debemos mandar un callback "done" para que se ejecute cuando termine la tarea

¿Que es el useState?
No se pueden usar hooks de manera condicional
Cuando utilizamos el useState, React nos crea una variable que se llama state y la guarda en el estado del componente
Cambiamos el estado del componente y React se encarga de actualizar el DOM
const [ counter, setCounter ] = useState( "valor inicial del counter en este caso" );

¿Qué es el useEffect?
Cuando utilizamos el useEffect, React nos crea una función que se llama useEffect y la ejecuta cuando el componente se renderiza
useEffect({
    //Código que se ejecuta cuando el componente se renderiza
    //Se ejecuta una sola vez
    //Se ejecuta después de que el componente se renderiza
},["aqui va la dependencia a la que queremos que se ejecute el useEffect""]) 

¿Qué es useRef?
Cuando utilizamos el useRef, React nos crea una variable que se llama ref y la guarda en el estado del componente
Al usar useRef, hacemos referencia al elemento del DOM al que estamos apuntando
const ref = useRef("valor inicial del ref en este caso");

¿Qué es useLayoutEffect?
Es idéntica a useEffect pero se dispara de forma síncrona después de todas las mutacion del DOM
Se utiliza para saber las dimensiones de un elemento del DOM
-------------------Ejemplo------------------------
const [ width, setWidth ] = useState( 0 );
useLayoutEffect(() => {
    setWidth( ref.current.offsetWidth );
}, [ ref ]);

-->Función Memo de react ¿Qué es lo que hace?
Es una función que nos permite crear una función que se ejecuta sólo cuando nuestras props cambian, evita que se ejecute cada vez que renderizamos el componente
const MemoComponent = memo(Componente);
-->¿Qué es useMemo?
Sólo se ejecuta cuando algo cambia
const memoizedValue = useMemo(() => procesoPesado(counter) , [counter])
La dependencia es la que nos dice cuando tengo que volver a memorizar el valor

Utilizar sólo en casos estrictamente necesarios
----------Ventajas y desventajas entre ambos:------- (useMemo y React.memo)
----React.memo puede ser utilizado fuera de componentes de React. useMemo, al ser un hook, solo puede ser utilizado dentro de un componente funcional de React.
----React.memo permite comparar las props del renderizado anterior vs las props del nuevo renderizado y crear condicionales a nuestro criterio para decidir cuando actualizar el componente. useMemo solo se actualizará cuando alguna de sus dependencias haya cambiado.
----useMemo puede recibir funciones y memorizar el resultado de estas, React.memo solo memoriza componentes de React.


¿Qué es useCallbak?
Lo usamos cuando tenemos que mandar una funcion como props y para que no se vuelva a ejecutar, lo usamos en conjuncion con
React.memo ...

¿Qué es el useReducer?
Un reducer es una funcion comun y corriente
Debe de ser una funcion pura
Debe de retornar un nuevo estado **
Recibe dos argumentos
    1. El estado inicial
    2. Una funcion que se ejecuta cuando se llama al reducer
No hay que mutar el estado inicial
No debe de llamar localStorage o sessionStorage
Es similar al useState con la unica diferencia de que este hook se utiliza para realizar varias acciones 
El dispatch es una funcion que se le pasa la accion y ya sabe a que reducer mandarselo por el type=""
----------------------Ejemplo---------------------
const [ state, dispatch ] = useReducer( reducer, initialState );
const reducer = ( state, action ) => {
    switch ( action.type ) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
}
const action = { type: "INCREMENT", payload: 1 };
dispatch(action);


Configurar router de React
npm install react-router-dom
https://reactrouter.com/docs/en/v6/routers/native-router
Hay que crear un componente para configurar el router
Instalar  react-router-dom
Solo de debe definir una sola vez el router

Diferencia entre Link y NavLink
Link es un componente de React que nos permite hacer una redirección
NavLink es un componente de React que nos permite hacer una redirección y nos permite agregar una clase a nuestro link


¿Qué es el useContext?
Sirve como puente entre dos componentes diferentes para poder acceder a los datos
Es un contenedor de informacion que va a estar en un nivel superior que les va a permitir a los hijos de él acceder a los datos que contiene ese context
Se crea un archivo llamado context.js y se exporta el context
export const context = React.createContext();
Luego se incluye el context en el componente principal de la aplicacion
Para acceder al context, se importa el context en el componente que lo va a utilizar
Haciendo uso de useContext, podemos acceder al contexto desde cualquier componente
------Ejemplo-------------
<UserContext.Provider value={props}>
    <AppRouter />
</UserContext.Provider>

Las props se pasan por medio del context con la etiqueta value={props}
Para retornar más de un valor, se puede hacer de la siguiente manera
Retornando un objeto
value={{
    user,
    setUser
}}

***Paquete para trabajar con los querys del url
npm install query-string

¿Qué es el useLocation?
Es un hook que nos permite acceder al pathname de la url



----------------Redux--------------
https://redux.js.org/
https://react-redux.js.org/

1.Creamos el store (aqui van los reducerss)
2. Creamos el slice que tendra los reducers


