import Item from './components/Item/Item'
import Cart from './components/Cart/Cart'
import data from '../data.json'
import { useState } from 'react'
import { nanoid } from 'nanoid'

import './styles/globalStyle.scss'


function App() {
  const [cart, setCart] = useState([])

  // Added an id to every product and passed props using spread {...productWithId}
  const products = data.map(product => {
    const productWithId = {
      ...product,
      id: nanoid()
    }
    return (
      <Item
        key={productWithId.id}
        {...productWithId}
        addToCart={() => addToCart(productWithId)}
        cart={cart}
        setCart={setCart}
      />
    )
  })

  function addToCart(item) {
    // previousState - the entire array
    //  cartItem - every object inside the array
    setCart(previousState => {
      const itemInCart = previousState.find(object => object.name === item.name)

      if (itemInCart) {
        // If item already inside cart, increase quantity count by 1.
        return previousState.map(object => (
          object.name === item.name ?
          {
            ...object,
            quantity: object.quantity + 1
          } :
          object
        ))
      } else {
        // If item isn't inside cart, add the item with quantity: 1
        return [
          ...previousState, {
            ...item,
            quantity: 1
          }
        ]
      }
    })
  }


  return (
    <main>
      <h1 className="list__title">Desserts</h1>

      <div className="main__wrapper">
        <section className="list">
          {products}
        </section>

        <Cart
          cart={cart}
          setCart={setCart}
        />
      </div>
    </main>
  )
}

export default App
