import {useContext, useState} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const paymentOptions = [
  {
    id: 'CARD',
    displayText: 'Card',
    isDisabled: true,
  },
  {
    id: 'NET BANKING',
    displayText: 'Net Banking',
    isDisabled: true,
  },
  {
    id: 'UPI',
    displayText: 'UPI',
    isDisabled: true,
  },
  {
    id: 'WALLET',
    displayText: 'Wallet',
    isDisabled: true,
  },
  {
    id: 'COD',
    displayText: 'Cash on Delivery',
    isDisabled: false,
  },
]

const Payment = () => {
  const {cartList} = useContext(CartContext)
  const [paymentMethod, setPayementMethod] = useState('')
  const [isOrderPlaced, setOrderPlaced] = useState(false)

  const updatePaymentMethod = event => {
    const {id} = event.target
    setPayementMethod(id)
  }
  const onPlaceOrder = () => {
    setOrderPlaced(true)
  }

  const getTotalPrice = () => {
    const amount = cartList.map(each => {
      const total = each.price * each.quantity
      return total
    })
    const totalPrice = amount.reduce((a, c) => a + c)
    return totalPrice
  }

  const renderPaymentMethod = () => (
    <ul className="payment-method-list">
      {paymentOptions.map(eachItem => (
        <li className="payment-method-item" key={eachItem.id}>
          <input
            className="payment-input"
            id={eachItem.id}
            name="payment"
            disabled={eachItem.isDisabled}
            type="radio"
            onChange={updatePaymentMethod}
          />
          <label className="payment-label" htmlFor={eachItem.id}>
            {eachItem.displayText}
          </label>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="payment-container">
      {isOrderPlaced ? (
        <p className="order-placed-msg">
          Your order has been placed successfully
        </p>
      ) : (
        <>
          <h1 className="payment-heading">Payment Details</h1>
          <p className="payment-method">Payment Method</p>
          {renderPaymentMethod()}
          <div className="order-details">
            <p className="order-heading">Order Details</p>
            <p className="quantity">Quantity : {cartList.length}</p>
            <p className="total-price">Total Price: Rs {getTotalPrice()}/- </p>
          </div>
          <button
            type="button"
            disabled={paymentMethod === ''}
            onClick={onPlaceOrder}
            className="confirm-btn"
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  )
}

export default Payment
