import { useReducer } from 'react';
import { CarritoContext } from './CarritoContext';

const initialState = [];

const comprasReducer = (state = initialState, action = {}) => {  // <- DEFINICIÓN ANTES DE USO
    switch (action.type) {
        case '[CARRITO] Agregar Cantidad Compra':
            return [...state, action.payload];
        case '[CARRITO] Aumentar Cantidad Compra':
            return state.map(item=> {
                const cant = item.cantidad + 1
               if (item.id === action.payload) return {...item, cantidad: cant}
               return item
            });
        case '[CARRITO] Disminuir Cantidad Compra':
            return state.map(item=> {
                const cant = item.cantidad - 1
               if (item.id === action.payload && item.cantidad > 1) return {...item, cantidad: cant} 
               return item
            });
        case '[CARRITO] Eliminar Compra':
            return state.filter(compra => compra.id !== action.payload);
        default:
            return state;
    }
};

export const CarritoProvider = ({ children }) => {
    const [listaCompras, dispatch] = useReducer(comprasReducer, initialState);  // <- USO DESPUÉS DE DEFINICIÓN

    const agregarCompra = (compra) => {
        compra.cantidad = 1
        const action = {
            type: '[CARRITO] Agregar Cantidad Compra',
            payload: compra
        };
        dispatch(action);
    };

    const aumentarCantidad = (id) => {
        const action = {
            type: '[CARRITO] Aumentar Cantidad Compra',
            payload: id
        };
        dispatch(action);
    };

    const disminuirCantidad = (id) => {
        const action = {
            type: '[CARRITO] Disminuir Cantidad Compra',
            payload: id
        };
        dispatch(action);
    };

    const eliminarCompra = (id) => {
        const action = {
            type: '[CARRITO] Eliminar Compra',
            payload: id
        };
        dispatch(action);
    };

    return (
        <CarritoContext.Provider value={{ listaCompras, agregarCompra, disminuirCantidad, eliminarCompra, aumentarCantidad }}>
            {children}
        </CarritoContext.Provider>
    );
};

