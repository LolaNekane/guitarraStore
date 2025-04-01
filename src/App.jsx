import { useState, useEffect } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db";

function App() {

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

  return (
    <>
    <Header
      carrito={carrito}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decrementQuantity={decrementQuantity}
      clearCart={clearCart}
    />
    
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCarrito={setCarrito}
              addToCart={addToCart}
            />
            ) )}
          
        </div>
            
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
