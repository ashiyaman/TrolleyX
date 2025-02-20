import { createStore } from "redux"
import { addToCart, removeFromCart, calculateTotal } from "./actions"
import cartReducer from "./cartReducer"

const store = createStore(cartReducer)

store.subscribe(() => {
    updateCart()
})

const productsListHTML = document.querySelector("#productsList")
const cartListHTML = document.querySelector("#cartList")
const totalCostHTML = document.querySelector("#totalCost")

const products = [ 
    { id: 1, name: "Product A", price: 10 },      
    { id: 2, name: "Product B", price: 20 },      
    { id: 3, name: "Product C", price: 15 }     
]

window.addToCartHandler = async (productId) => {
    await store.dispatch(addToCart(products.find(product => product.id === productId)))
    await store.dispatch(calculateTotal())    
}

window.removeFromCartHandler = async (productId) => {
    await store.dispatch(removeFromCart(productId))
    await store.dispatch(calculateTotal())
}

const renderProducts = (productsList) => {
    productsListHTML.innerHTML = productsList.map((product) => 
        `<li>
            ${product.name} - Rs.${product.price} 
            <button onClick="addToCartHandler(${product.id})">Add To Cart</button>
        </li>`
        ).join("")
}

const updateCart = () => {
    const state = store.getState()
    cartListHTML.innerHTML = state.cartproducts.map(cartItem => 
        `<li>
            ${cartItem.name} - Rs.${cartItem.price} - Quantity: ${cartItem.quantity}
            <button onClick="removeFromCartHandler(${cartItem.id})">Remove</button></li>`
    )

    totalCostHTML.textContent = state.totalCost
}

renderProducts(products)