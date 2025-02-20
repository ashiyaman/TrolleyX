import { ADD_TO_CART, REMOVE_FROM_CART, CALCULATE_TOTAL } from "./actions";

const initialState = {cartproducts: [], totalCost: 0}

const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_CART:
            const existingProduct = state.cartproducts.find(product => product.id === action.payload.id)
            return {
                ...state, 
                cartproducts: existingProduct 
                    ? state.cartproducts.map(product => 
                        product.id === action.payload.id ? {...product, quantity: product.quantity + 1} : product
                    )
                    : [...state.cartproducts, {...action.payload, quantity: 1}]
            }

        case REMOVE_FROM_CART:
            return {...state, cartproducts: state.cartproducts.filter(product => product.id != action.payload)}
        
        case CALCULATE_TOTAL:
            return {...state, totalCost: state.cartproducts.reduce((sum, curr) => sum + curr.price * curr.quantity, 0)}

        default:
            return state
    }
}

export default cartReducer 
