import * as fromTodo from './todo.actions';
import { Todo } from './model/todo.model';

const todo1 = new Todo('Vencer a Thanos');
const todo2 = new Todo('Salvar el mundo');
const todo3 = new Todo('Pedir traje Ironman');
todo1.completado = true;


const estadoInicial: Todo[] = [todo1, todo2, todo3];

export function todoReducer(state = estadoInicial, action: fromTodo.Acciones): Todo[] {

    switch (action.type) {

        case fromTodo.AGREGAR_TODO:
            const todo = new Todo(action.texto);
            // Clonamos el estado actual y añadimos el elemento, para no modificar el objeto original
            return [...state, todo];
        case fromTodo.TOGGLE_TODO:
            // Tenemos que usar operador map ya que crea un nuevo array. Cada return del operador map seran los elementos del nuevo array
            return state.map(todoEdit => {
                if (todoEdit.id === action.id) {
                    // no podemos cambiar directamente completado en todoEdit ya que sigue haciendo referencia al array original. En su lugar, crearemos un nuevo objeto
                    return {
                        // con ... clona todas las propieades. despues podemos modificar las que necesitemos
                        ...todoEdit,
                        completado: !todoEdit.completado
                    };
                } else {
                    return todoEdit;
                }
            });

        case fromTodo.EDITAR_TODO:
            return state.map(todoEdit => {
                if (todoEdit.id === action.id) {
                    return {
                        ...todoEdit,
                        texto: action.texto
                    };
                } else {
                    return todoEdit;
                }
        });

        case fromTodo.BORRAR_TODO:
            return state.filter(todoBorrar => todoBorrar.id !== action.id);

        case fromTodo.TOGGLE_ALL_TODO:
            return state.map(todoEdit => {
                return {
                    ...todoEdit,
                    completado: action.completado
                };
            });

        case fromTodo.LIMPIAR_COMPLETADOS_TODO:
            return state.filter(todoEdit => !todoEdit.completado);

        default:
            return state;
    }

}
