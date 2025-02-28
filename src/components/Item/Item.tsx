import cartImg from '../../../public/assets/images/icon-add-to-cart.svg'
import PropTypes from 'prop-types'
import decrement from '../../../public/assets/images/icon-decrement-quantity.svg'
import increment from '../../../public/assets/images/icon-increment-quantity.svg'
import { ProductOnCart } from '../../App'
import clsx from "clsx"

import './itemStyle.scss'


interface ItemProps extends ProductOnCart {
   addToCart: () => void
   cart: ProductOnCart[]
   setCart: React.Dispatch<React.SetStateAction<ProductOnCart[]>>
}


export const Item: React.FC<ItemProps> = (props) => {
   const itemInCart: ProductOnCart | undefined = props.cart.find(object => object.name === props.name)

   const classname = clsx({
      product__btn: !itemInCart,
      redBg: itemInCart
   })

   // Just for observation, in the decrementCount I didn't use () after setCart and map on the incrementCount I did.
   function decrementCount(itemInCart: ProductOnCart): void {
      props.setCart((prevState: ProductOnCart[]) =>
         prevState.map((object: ProductOnCart) =>
            object.name === itemInCart.name ?
               {
                  ...object,
                  quantity: object.quantity - 1
               } :
               object
         )
            .filter(object => object.quantity > 0)
      )
   }

   function incrementCount(itemInCart: ProductOnCart): void {
      props.setCart((prevState: ProductOnCart[]) => (
         prevState.map((object: ProductOnCart) => (
            object.name === itemInCart.name ?
               {
                  ...object,
                  quantity: object.quantity + 1
               } :
               object
         ))
      ))
   }


   return (
      <section className="product">
         <picture>
            <source media="(min-width: 1200px)" srcSet={props.image.desktop} />
            <source media="(min-width: 768px)" srcSet={props.image.tablet} />
            <img className={`product__img ${itemInCart ? 'imgRed' : ''}`}
               src={props.image.mobile}
               alt={`Image of ${props.name}`}
            />
         </picture>

         <span className="product__abreviation">{props.category}</span>

         <h2 className="product__name">{props.name}</h2>

         <p className="product__price">${props.price.toFixed(2)}</p>

         {itemInCart ?
            (
               <button className={classname}>
                  <div>
                     <img
                        className='product__count_img'
                        src={decrement}
                        alt="Icon of '-' representing decrement."
                        onClick={() => decrementCount(itemInCart)}
                     />
                     {itemInCart.quantity}
                     <img
                        className='product__count_img'
                        src={increment}
                        alt="Icon of '+' representing increment."
                        onClick={() => incrementCount(itemInCart)}
                     />
                  </div>
               </button>
            ) : (
               <button
                  className={classname}
                  onClick={props.addToCart}>
                  <img src={cartImg} alt="Image of a empty cart" />
                  Add to Cart
               </button>
            )}
      </section>
   )
}
