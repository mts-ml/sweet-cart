import treeIcon from '../../../public/assets/images/icon-carbon-neutral.svg'
import x from '../../../public/assets/images/icon-remove-item.svg'
import emptyCartImg from '../../../public/assets/images/illustration-empty-cart.svg'
import check from '../../../public/assets/images/icon-order-confirmed.svg'
import { nanoid } from 'nanoid'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import './cartStyle.scss'

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired
}


export default function Cart(props) {
  const [showSection, setShowSection] = useState(false)

  const confirmOrderCart = props.cart.map(item => {
    const itemTotal = item.price * item.quantity
    return (
      <div key={nanoid()} className="container">
        <img src={item.image.thumbnail} alt="" />

        <div className="confirm_order__wrapper">
          <h4 className="confirm_order__name">{item.name}</h4>

          <div className='confirm_oder__div'>
            <span className="cart__quantity">{item.quantity}x</span>
            <span className="cart__price">@ ${item.price}</span>
          </div >

        </div>

        <span className="confirm_order__total_item">${itemTotal.toFixed(2)}</span>
      </div>
    )
  })

  const itemsInCart = props.cart.map(item => {
    const itemTotal = item.price * item.quantity
    return (
      <React.Fragment key={nanoid()}>
        <div className="cart__products">
          <div className="item">
            <h4 className="cart__product_name">{item.name}</h4>

            <div className="quantity">
              <span className="cart__quantity">{item.quantity}x</span>
              <span className="cart__price">@ ${item.price}</span>
              <span className="cart__total_item">${itemTotal.toFixed(2)}</span>
            </div>

          </div>

          <img
            onClick={() => removeItem(item.id)}
            className='cart__img'
            src={x}
            alt="Icon of a 'X' that represents remove."
          />
        </div >

        <hr />
      </React.Fragment>
    )
  })

  function removeItem(itemId) {
    props.setCart(previousState => previousState.filter(object => object.id !== itemId))
  }

  const totalBill = props.cart.reduce((acumulator, product) => (
    product.price * product.quantity + acumulator
  ), 0)


  //Found this function to after starting new order, roll up the page with a delay.
  function scrollToTop(duration = 1000) {
    const start = window.pageYOffset;
    const startTime = performance.now();

    function scrollStep(timestamp) {
      const currentTime = timestamp - startTime;
      const progress = Math.min(currentTime / duration, 1);

      window.scrollTo(0, start * (1 - progress));

      if (currentTime < duration) {
        requestAnimationFrame(scrollStep);
      }
    }
    // Inicia a animação
    requestAnimationFrame(scrollStep);
  }

  function startNewOrder() {
    props.setCart([])
    setShowSection(false)
    scrollToTop(1000)
  }


  return (
    <aside className="cart">
      <div className="cart__wrapper">

        <div className="cart__items">
          <h3 className="cart__title">Your Cart</h3>

          <span className="cart__items_number">({props.cart.length})</span>
        </div>

        {props.cart.length > 0 ? (
          <>
            <div className="cart__item_wrapper">
              {itemsInCart}
            </div>

            <div className="total">
              <p className="cart__total">Order Total</p>

              <p className="cart__total_price">${totalBill.toFixed(2)}</p>
            </div>

            <div className="msg">
              <img className='msg__img' src={treeIcon} alt="Icon of a tree" />

              <p className="msg__description">This is a <strong>carbon-neutral</strong> delivery</p>
            </div>

            <button onClick={() => setShowSection(!showSection)} className="cart__btn">Confirm Order</button>
          </>
        )
          :
          (
            <div className="empty_cart">
              <img className='empty_cart__img'
                src={emptyCartImg}
                alt="Image of a empty cart" />

              <p className="empty_cart__description">
                Your added items will appear here
              </p>
            </div>
          )}
      </div>

      {showSection && (
        <>
          {/* Creates an overlay layer with a glass effect (CSS). */}
          <div className={`confirm_order_overlay ${showSection ? 'active' : ''}`}></div>

          <section className={`confirm_order ${showSection ? 'active' : ''}`}>
            <img src={check} alt="A check icon, representing order confirmed" />

            <h2 className="confirm_order__title">Order Confirmed</h2>

            <span className="confirm_order__span">We hope you enjoy your food!</span>

            <div className="confirm_order__products">
              {confirmOrderCart}

              <div className="confirm_order__total">
                <p className="confirm_order__value">Order Total</p>

                <p className="confirm_order__price" aria-label='Total bill'>${totalBill.toFixed(2)}</p>
              </div>
            </div>

            <button onClick={startNewOrder} className='cart__btn'>Start New Order</button>
          </section>
        </>
      )}
    </aside>
  )
}
