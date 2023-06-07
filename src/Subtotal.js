import React from 'react'
//import "./Subtotal.css"
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from './StateProvider'
import { getBasketTotal } from './reducer'
import { useNavigate } from 'react-router-dom'
const Subtotal = () => {
  const history=useNavigate()
  const[{basket},dispatch]=useStateValue()

  return (
    <div className='flex justify-between flex-col w-[300px] h-[100px] p-[20px] bg-[#f3f3f3] border border-solid border-[#dddddd] rounded-[3px]'>
      <CurrencyFormat
        renderText={(value)=>(
            <>
                <p>
                     Subtotal({basket.length} items): 
                     <strong>{value}</strong> 
                  
                </p>
                <small className='flex items-center'>
                    <input className='mr-[5px]' 
                      type="checkbox"/>This order contains a gift
                </small>
            </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
  
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        />
        <button className='bg-[#f0c14b] rounded-[2px] w-full h-[30px] border border-solid mt-[10px] border-[#9c7e31] text-[#111]'
          onClick={e =>history('/payment')} >Proceed to checkout</button>
    </div>
  )
}

export default Subtotal