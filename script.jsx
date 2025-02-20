const productsListHTML = document.querySelector("#productsList")
const cartListHTML = document.querySelector("#cartList")
const totalCostHTML = document.querySelector("#totalCost")

const products = [ 
    { id: 1, name: "Product A", price: 10 },      
    { id: 2, name: "Product B", price: 20 },      
    { id: 3, name: "Product C", price: 15 }     
]

window.addToCartHandler = (product) => {
    console.log(product)
}

const renderProducts = (productsList) => {
    productsListHTML.innerHTML = productsList.map((product) => 
        {
            return `<li>${product.name} - Rs.${product.price} <button onClick="addToCartHandler(${product.id})">Add To Cart</button></li>`
        })
}

renderProducts(products)