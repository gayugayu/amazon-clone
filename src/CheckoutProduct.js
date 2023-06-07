import React from 'react'
//import "./CheckoutProduct.css"
import { useStateValue } from './StateProvider'


function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
    const [{ basket }, dispatch] = useStateValue()
   
    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id
        })
        console.log(id)

    }
   const forceUpdate=React.useCallback(()=>removeFromBasket({}),[])
    return (

        //  
          <div >
        {/* <div className=' flex mt-[20px] mb-[20px] '> */}
            {/* <img */}
            <img className='object-contain w-[180px] h-[180px]'
                src={image} alt="items in basket" />

            <div className='p-[20px]'>
                {/* <div> */}
                <p className='font-extrabold text-lg'>
                    {/* <p> */} {title}</p>
                <p>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                {/* <div> */}
                <div className='flex'>
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <div key={i}>
                                <p>🌟</p>
                            </div>
                        ))}
                </div>
                {!hideButton && (
                    <button
                        className='bg-[#f0c14b] border border-solid mt-[10px] border-[#a88734] text-[#111] '
                        onClick={forceUpdate}>Remove from Basket</button>
                )}
            </div>
            {/* </div> */}
        </div>
    )
}

export default CheckoutProduct