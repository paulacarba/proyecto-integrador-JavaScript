const prompt = require("prompt-sync")({ sigint: true });

//Array para almacenar todas las tareas.
let tareas = []; //Las tiene que proporcionar el usuario.
//La variable es una matriz: porque los Strings estan compuestos por caracteres que equivalen a columnas de las filas.
let categoriasNombres = [
    "Trabajo",
    "Personal"
    //Agregar mas categorias.
];

//Función que muestra todas las categorias
function mostrarTodasLasCategorias(){
    console.log("Categorías existentes: ");
    categoriasNombres.forEach(function(categoria, indice){ //Ingresa a los elementos pero nomodifica el forEach()
        console.log(indice + ": " +categoria);
    });
}
//mostrarTodasLasCategorias(); Llamamos la function

//para agregar categorias
function agregarNuevaCategoriaPorElUsuario(nombreCategoria) {
    categoriasNombres.push(nombreCategoria);
    console.log("Categoría " + nombreCategoria + " agregada correctamente!");
}

//Función para agregar una nueva tarea al array.
//completada es false, poque se supone que no fue completada; fechaLimiteRecibida va ser null si no se pone.
function agregarTarea(nombreRecibido, fechaLimiteRecibida = null) {
    //Llamo la funcion para que vea las opciones disponibles
    mostrarTodasLasCategorias(); 
    let numeroCategoria = parseInt(prompt("Ingrese el número de la categoría para la nueva tarea: "));
    //Compruebo el que el número corresponda a una opcion válida.
    if(numeroCategoria >= 0 && numeroCategoria < categoriasNombres.length){
        tareas.push({ nombre: nombreRecibido, completada: false, fechaLimite: fechaLimiteRecibida, categoria: numeroCategoria});
        console.log("Tarea agregada con éxito!");
    }else{
        console.log("Número de categoría incorrecto!");
    }
    
}

//Eliminar una tarea, formato de funcion para no repetir código.
function eliminarTarea(indice) {
    //Indice es positivo y menor del tamaño del array.
    if (indice >= 0 && indice < tareas.length) {
        tareas.splice(indice, 1); //Elimina un objeto único
        console.log("Tarea eliminada correctamente.")
    }else{
        console.log("Índice inexistente.")
    }
}

//Marcar una tarea completada.
function completarTarea(indice){
    if (indice >= 0 && indice < tareas.length) {
        tareas[indice].completada = true;
        console.log("Tarea marcada correctamente!")
    }else{
        console.log("Índice de tarea invalido.")
    }
}

// Función para modificar una tarea específica.
function modificarTarea(indice, nuevoNombre, nuevaFechaLimite = null, nuevoNumeroDeCategoria) {
    //Hago un if ternario para no escribir tanto código.
    if(indice >= 0 && indice < tareas.length){
        //Si modifica el nombre se carga en nuevo nombre, si undefined se queda con el nombre que tenia.
        tareas[indice].nombre = nuevoNombre !== undefined ? nuevoNombre : tareas[indice].nombre;
        tareas[indice].fechaLimite = nuevaFechaLimite !== undefined ? nuevaFechaLimite : tareas[indice].fechaLimite;
        tareas[indice].categoria = nuevoNumeroDeCategoria !== undefined ? nuevoNumeroDeCategoria : tareas[indice].categoria;
        console.log("Modificación correcta!")
    }else{
        console.log("Índice de tarea invalido.")
    }    
}

//Funcion que filtra tareas por categorias
function filtrarTareasPorCategorias(numeroCategoria) { //Número porque uso la posicion no es String
    let tareasFiltradas = tareas.filter(function(tarea){
        return tarea.categoria === numeroCategoria; 
    }); // Aca se guarda el array filtrado -> tareasFiltradas
    return tareasFiltradas;
}

//Función que muestra cantidad de tareas completadas
function contarTareasCompletadasPorCategoria(numeroCategoria) {
    //Creo una variable para guardar lo filtrado por la funcion.
    let tareasCategoria = filtrarTareasPorCategorias(numeroCategoria);
    let tareasCompletadas = tareasCategoria.reduce(function(contador, tarea){
        return tarea.completada ? contador + 1 : contador;
    },0);
    let tareasEnTotal = tareasCategoria.length;
    console.log("Tareas completadas de la categorá: " + numeroCategoria + ": " + tareasCompletadas + " de " + tareasEnTotal + " tareas!");
}

//Mostrar todas las tareas no completadas.
function mostrarTareasNoCompletadas() {
    console.log("Tareas no cpmpletadaas: ");
    tareas.forEach(function(tarea){
        if(!tarea.completada){
            console.log("- Nombre: " + tarea.nombre + ", Categoría: " + categoriasNombres[tarea.categoria]);
        }
    });
}
//Funcion ordena tareas por prop nombre con bubbleSort
function ordenarTareesPorNombre() {
    let total = tareas.length;

    for (let j = 0; j < total; j++) {
        //repetir tantas veces como elementos tenga el array
        for (let i = 0; i < total - 1; i++) { //le agrego el -1 al for para que no me de nulo

            if (tareas[i].nombre > tareas[i + 1].nombre) { //le paso la posicion del valor por el que quiero ordenar
            let temp = tareas[i]; //guardar la totalidad del objeto y mover las posiciones.
            tareas[i] = tareas[i + 1];
            tareas[i +1] = temp;
            } 
        }
    }
}

//Funcion ordena tareas por prop fechaLimite con bubbleSort
function ordenarTareesPorFechaLimite() {
    let total = tareas.length;

    for (let j = 0; j < total; j++) {
        
        for (let i = 0; i < total - 1; i++) { 

            if (tareas[i].fechaLimite > tareas[i + 1].fechaLimite) { 
            let temp = tareas[i]; 
            tareas[i] = tareas[i + 1];
            tareas[i +1] = temp;
            } 
        }
    }
}

//Funcion que busca una tarea por su nombre y retorna su posición
function buscarTareaPorNombre(nombreTarea) {

    //Donde comiemza y finaliza la búsqueda.
    let inicio = 0;
    let fin = tareas.length - 1;
    //Se repite mientras no haya mas elementos a considerar para la búsqueda
    while (inicio <= fin) {
        
        let posElementoMedio = Math.round((inicio + fin) / 2); //Encontrar la posición del medio
        if (tareas[posElementoMedio].nombre === nombreTarea) {
            return posElementoMedio;
        } else if(tareas[posElementoMedio].nombre < nombreTarea){
            inicio = posElementoMedio + 1;
        }else{
            fin = posElementoMedio - 1;
        }
    }
    return -1; //indica que lo solicitado no se encuentra en el array.
}

//Función para mostrar el menú de opciones.
function mostrarMenu() {
    console.log("---Menú---");
    console.log("1. Agregar tarea.");
    console.log("2. Eliminar tarea.");
    console.log("3. Marcar tarea como completada.");
    console.log("4. Modificar una tarea.");
    console.log("5. Mostrar todas las tareas.");
    console.log("6. Ver todas las categorías.");
    console.log("7. Agregar una nueva categoría.");
    console.log("8. Filtrar tareas por categorías.");
    console.log("9. Visualizar cantidad de tareas completadas por categoría.");
    console.log("10. Visualizar las tareas no completadas.");
    console.log("11. Ordenar las tareas alfabeticamente.");
    console.log("12. Odenar tareas por fecha límite.");
    console.log("13. Buscar una tarea por nombre y obtener posición.");
    console.log("0. Salir.");
}

//Función para interactuar con el usuario
function interactuarUsuario() {
    let opcion = -1;
    
    while(opcion != 0){
        mostrarMenu();
        opcion = parseInt(prompt("Ingrese la opción seleccionada: "));

        switch (opcion) {
            case 1:
                let nombreTareaNueva = prompt("Ingrese el nombre de la tarea a cargar: ");
                let fechaLimiteNueva = prompt("ingrese la fecha límite para la tarea: ");
                agregarTarea(nombreTareaNueva, fechaLimiteNueva); 
                break;
            case 2:
                let indiceAEliminar = parseInt(prompt("Ingrese el índice de la tarea a eliminar: "));
                eliminarTarea(indiceAEliminar);
                break;
            case 3:
                let indiceACompletar = parseInt(prompt("Ingrese el ídice de la tarea a completar: "));
                completarTarea(indiceACompletar);
                break;
            case 4:
                let indice = parseInt(prompt("Ingrese el índice de la tarea a modificar: "));
                if (indice >= 0 && indice < tareas.length) {
                    let opcion = parseInt(prompt(console.log("¿Qué propiedad desea modificar? 1.Nombre, 2.Fecha límite, 3.Número de categoría. ")));
                    switch (opcion) {
                        case 1:
                            let nuevoNombre = prompt("Ingrese el nuevo nombre de la tarea: ");
                            modificarTarea(indice, nuevoNombre);
                            break;
                        case 2:
                            let nuevaFechaLimite = prompt("Ingrese la nueva fecha límite para su tarea. ");
                            //Al poner undefined se modifica solo la fecha, se pone asi porque necesito si o si respetar el orden de los parametros de la función.
                            modificarTarea(indice, undefined, nuevaFechaLimite);
                            break;
                        case 3:
                            let nuevoNumeroDeCategoria = parent(prompt("Ingrese nuevo número de categoría. "));
                            if(nuevoNumeroDeCategoria >=0 && nuevoNumeroDeCategoria < categoriasNombres.length){
                                modificarTarea(indice, undefined, undefined, nuevoNumeroDeCategoria);
                            }else{
                                console.log("La categoría ingresada no es válida.");
                            }
                            break;    
                        default:
                            console.log("La opción ingresada no es válida.");
                            break;
                    }
                }else{
                    console.log("Índice de tarea incorrecto!");
                }
                
                break;
            case 5:
                console.log("----- LISTA DE TAREAS -----")      
                console.log(tareas);
                break;
            case 6:
                mostrarTodasLasCategorias();
                break;
            case 7:
                let nuevaCategoria = prompt("Ingrese el nombre de la nueva categoría a agregar: ");
                agregarNuevaCategoriaPorElUsuario(nuevaCategoria);
                break;
            case 8: //Listado de tareas segun un filtro.
                mostrarTodasLasCategorias();
                let nroCategoria = parseInt(prompt("Ingrese el número de la categoría a filtrar. "));
                let tareasCategoria = filtrarTareasPorCategorias(nroCategoria);
                console.log("Tareas de la categoría solicitad: ");
                console.log(tareasCategoria);
                break;
            case 9:
                mostrarTodasLasCategorias();
                let nroCateg = parseInt(prompt("Ingrese el número de la categoría a visualizar: "));
                contarTareasCompletadasPorCategoria(nroCateg);
                break;        
            case 10:
                mostrarTareasNoCompletadas();
                break;
            case 11:
                ordenarTareesPorNombre();
                console.log("Tareas ordenadas por nombre: ");
                console.log(tareas);
                break;
            case 12:
                ordenarTareesPorFechaLimite();
                console.log("Tareas ordenadas por fecha: ");
                console.log(tareas);
                break;
            case 13:
                ordenarTareesPorNombre();//llamo la función para poder hacer la busqueda binaria odenando el array
                let nombreABuscar = prompt("Ingrese el nombre de la tarea a buscar: ");
                let indiceTarea = buscarTareaPorNombre(nombreABuscar);
                if (indiceTarea !== -1) {
                    console.log("Tarea encontrada en el índice: " + indiceTarea);
                }else{
                    console.log("Tarea no encontrada.");
                }
                break;
            default:
                console.log("Opción invalida.")
                break;
        }
    }
}
interactuarUsuario();
