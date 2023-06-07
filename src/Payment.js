import React, { useEffect, useState } from 'react'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import { Link,useNavigate } from 'react-router-dom'
import './Payment.css'
import { CardElement,useElements, useStripe } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from './reducer'
import axios from './axios' 
import { db } from './firebase'
import { collection,doc,setDoc } from 'firebase/firestore/lite'


const Payment = () => {
    const[{basket ,user},dispatch]=useStateValue()
    
    const history =useNavigate()
   const stripe =useStripe()
    const elements =useElements()

    const [ suceeded ,setSuceeded]=useState(false)
    const [processing ,setProcessing]=useState("")
    const[error, setError]=useState(null)
    const[disabled ,setDisabled]=useState(true)
    const[clientSecret ,setClientSecret]=useState(true)

    useEffect(()=>{
        //generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async ()=>{
           
            const response =await axios.post(`/payments/create?total=${getBasketTotal(basket)*100}`)//{
            
                //Stripe expects the total in currencies subunits
                //url:`/payments/create?total=${getBasketTotal(basket)*100}`
            //  })
             setClientSecret(response.data.clientSecret)
         
      
        }
    getClientSecret()
    },[basket])

    console.log('THE SECRET IS >>>',clientSecret)


    const handleSubmit= async(event)=>{
        //do all the fancy stripe stuff
        event.preventDefault()
        setProcessing(true)
       
        const payload =await stripe
           .confirmCardPayment(clientSecret,{
            payment_method:{
                card: elements.getElement(CardElement)
            }
        })
        .then(({paymentIntent})=>{
            //paymentIntent =payment confirmation

            //   db
            //   .collection('user')
            //   .doc(user?.uid)
            //   .collection('orders')
            //   .doc(paymentIntent.id)
            //   .set({
            //     basket: basket,
            //     amount: paymentIntent.amount,
            //     created: paymentIntent.created
            //   })
            collection(db,'user')
            doc(db,'user',user?.uid)
            collection(db,'orders')
            doc(db,'orders',paymentIntent.uid)
            setDoc({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created

            })
            setSuceeded(true)
            setError(null)
            setProcessing(false)

            dispatch({
                type:'EMPTY_BASKET'
            })

               history('/orders',{replace:true} )
        })

    }
    const handleChange= event=>{
        //listen for changes in the CardElements
       // and display any error as the customer types their card details     
       setDisabled(event.empty) 
      // setError(event.error? event.error.message:"")
    }

  return (
    <div className='bg-white'>
        <div className='payment__container'>
            <h1 className='text-center p-[10px] font-medium bg-[rgb(234,237,237)] border-b border-solid border-gray-300 '>
                Checkout(<Link to ="/checkout">{basket?.length} items</Link> )
            </h1>
            {/* payment section -delivery address*/}
            <div className='flex p-[20px] m-0 my-[20px] border-b border-solid border-gray-300'>
                <div className='flex-[0.2]'>
                    <h3>Delivery address</h3>
                </div>
                <div className='flex-[0.8]'>
                    <p >{user?.email}</p>
                    <p>123 react Lane</p>
                    <p>Los Angeles</p>
                </div>
            </div>
            {/*  payment section -checkout items */}
            <div className='flex p-[20px] m-0 my-[20px] border-b border-solid border-gray-300'>
                <div className='flex-[0.2]'>
                    <h3>Review Items and deliveru</h3>
                </div>
                <div className='flex-[0.8]'>
                  {basket && basket.map((item,i)=>(
                  
                    <CheckoutProduct
                       key={i}
                       id={item.id}
                       title={item.title}
                       image={item.image}
                       price={item.price}
                       rating={item.rating}
                       />
                       
                  ))}
                </div>
            </div>
            {/*  payment section -payment method */}
            <div className='flex p-[20px] m-0 my-[20px] border-b border-solid border-gray-300'>
                <div className='flex-[0.2]'>
                    <h3 className='pb-[20px]'>Payment Method</h3>
                </div>
                <div className='flex-[0.8]'>
                    {/* stripe magic  */}
                    <form className='max-w-[400px]'
                     onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        
                        <div className='payment__pricecontainer'>
                            <CurrencyFormat
                               renderText={(value)=>(
                                <h3>Order Total:{value}</h3>
                               )}
                               decimalScale={2}
                               value={getBasketTotal(basket)}
                               displayType={"text"}
                               thousandSeparator={true}
                               prefix={"$"}
                               />
                               <button className=' bg-[#f0c14b] rounded-[2px] w-full h-[30px] border border-solid font-bold mt-[10px] border-[#be8f18] text-[#111]'
                                  disabled={processing || disabled || suceeded}>
                                  <span>{processing ? <p> Processing</p>:
                                  "Buy Now"}</span>
                               </button>
                        </div>
                        {/* Error */}
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment