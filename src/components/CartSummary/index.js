import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import Payment from '../Payment'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const amount = cartList.map(each => {
        const total = each.price * each.quantity
        return total
      })
      const totalPrice = amount.reduce((a, c) => a + c)

      return (
        <div className="cart-summary">
          <h1 className="price">
            <span className="order-total-text">Order Total: Rs </span>
            {` ${totalPrice}/-`}
          </h1>
          <p className="cart-count">{`${cartList.length} items in cart`}</p>
          <Popup
            modal
            trigger={
              <button type="button" className="checkout-btn">
                Checkout
              </button>
            }
          >
            {close => <Payment close={close} />}
          </Popup>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
