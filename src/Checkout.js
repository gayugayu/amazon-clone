import React from 'react'
//import "./Checkout.css"
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import Subtotal from './Subtotal'

const Checkout = () => {
   const[{basket,user},dispatch]=useStateValue()
  return (
    <div className='flex p-[20px] bg-white max-h-full '>
        <div className='ml-3 mr-3'>
          <img className='w-full mb-[10px] h-[18vh]' 
            src='https://influencermarketinghub.com/wp-content/uploads/2021/11/Amazon-Display-Ad-Amazon-1024x140.jpg'
            alt='ads'
            />
            <div>
              <h3>Hello , {user?.email}</h3>
              <h2 className='mr-[10px] p-[10px] border-b border-solid border-gray-300'>Your Shopping cart</h2>
                  {basket.map((item,i)=>(
                    <div key={i}>
                    <CheckoutProduct
                       id={item.id}
                       title={item.title}
                       image={item.image}
                       price={item.price}
                       rating={item.rating}
                       />
                       </div>
                  ))}
             </div>
        </div>
         <div className='mt-4 ml-3 '>
            <Subtotal/>
         </div>
    </div>
  )
}

export default Checkout