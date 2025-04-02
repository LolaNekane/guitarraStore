import { useState, useEffect } from "react"
import { db } from "../data/db";
import { useMemo } from "react"


export const useCart = () => {

    const initalCart = () => {
        const localStorageCart = localStorage.getItem('carrito')
        return localStorageCart ? JSON.parse(localStorageCart) : []
      }
    
      const [data] = useState(db)
      const [carrito, setCarrito] = useState(initalCart)
    
      const MAX_ITEM = 10
    
    
      useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito))
      }, [carrito])
    
    
      function addToCart(item) {
        const itemExists = carrito.findIndex(guitar => guitar.id === item.id)
        if(itemExists >= 0) {  // existe en el carrito
          if(carrito[itemExists].cantidad >= MAX_ITEM) return
            const actulizadoCarrito = [...carrito]
            actulizadoCarrito[itemExists].cantidad+++
            setCarrito(actulizadoCarrito)
        } else {
          item.cantidad = 1
          setCarrito([...carrito, item])
        }
      }
     
      function removeFromCart(id) {
        setCarrito(prevCart => prevCart.filter(guitar => guitar.id !== id))
      }
    
      function increaseQuantity(id) {
        const updateCarrito = carrito.map(item => {
          if(item.id === id && item.cantidad < MAX_ITEM) {
            return{
              ...item,
              cantidad: item.cantidad + 1
            }
          }
          return item
        })
        setCarrito(updateCarrito)
      }
    
      function decrementQuantity(id) {
        const updateCarrito = carrito.map(item => {
          if(item.id === id && item.cantidad > 1) {
            return{
              ...item,
              cantidad: item.cantidad - 1
            }
            
          }
          return item
        })
        setCarrito(updateCarrito)
      }
    
      function clearCart(e) {
        setCarrito([])
      }

    // State derivado
    const isEmpty = useMemo(() => carrito.length === 0, [carrito])
    const carritoTotal = useMemo(() => carrito.reduce((total, item) => total +(item.cantidad * item.price),0), [carrito] )

      return {
        data,
        carrito,
        addToCart,
        removeFromCart,
        decrementQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        carritoTotal
      }
}

