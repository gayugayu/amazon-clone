import React from 'react'
import CheckoutProduct from './CheckoutProduct'
//import './Order.css'
import moment from 'moment'
import CurrencyFormat from 'react-currency-format'


const Order = ({order}) => {
  return (
    <div className='p-[40px] m-[20px] border border-solid border-[light-gray] bg-white relative'>
        <h2>Order</h2>
        <p>{moment.unix(order.data.created).format('MMMM Do YYYY,h:mma ')}</p>
        <p className='absolute top-[40px] right-[20px]'>
            <small>{order.id}</small>
        </p>
         {order.data.basket?.map(item=>{
            return(
            <CheckoutProduct
                 id={item.id}
                 title={item.title}
                 image={item.image}
                 price={item.price}
                 rating={item.rating}
                 hideButton
                 /> )
         })}
         <CurrencyFormat
        renderText={(value)=>(
            <>
              <h3 className='font-medium text-right'>Order Total:{value}</h3>
            </>
        )}
        decimalScale={2}
        value={order.data.amount/100}
  
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        />
    </div>
  )
}

export default Order