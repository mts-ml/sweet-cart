import Item from './components/Item/Item'
import Cart from './components/Cart/Cart'
import data from '../data.json'
import { useState } from 'react'
import { nanoid } from 'nanoid'

import './styles/globalStyle.scss'


interface Image {
  thumbnail: string
  mobile: string
  tablet: string
  desktop: string
}

interface Product {
  image: Image
  name: string
  category: string
  price: number
}

interface ProductOnCart extends Product {
  id: string
  quantity: number
}


function App() {
  const dataApi: Product[] = data

  const [cart, setCart] = useState<ProductOnCart[]>([])

  // Added an id to every product and passed props using spread {...productWithId}
  const products = dataApi.map( (product: Product): JSX.Element => {
    const productWithId: ProductOnCart = {
      ...product,
      id: nanoid(),
      quantity: 1,
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

  function addToCart(item: ProductOnCart): void {
    // previousState - the entire array
    //  cartItem - every object inside the array
    setCart( (previousState: ProductOnCart[]) => {
      const itemInCart: ProductOnCart | undefined = previousState.find( (object: ProductOnCart) => object.name === item.name)

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
