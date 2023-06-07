import React, { useEffect } from 'react'
import Heading from './Heading'
import Home from './Home'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Checkout from './Checkout'
import Login from './Login'
import {auth} from "./firebase"
import { onAuthStateChanged } from 'firebase/auth'
import { useStateValue } from './StateProvider'
import Payment from "./Payment"
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './Orders'

 
const promise =loadStripe('pk_test_51MpBMQSD5vO3r0DjjUdl7yJORUDtVXeZnzGOA6y5W7cyzUp2tp4AIe2JMbchWRjEPQ5rpyrtBAYfq7i9DlV2ZsH900Zy7WAk2S')

const App = () => {
  const[{},dispatch]=useStateValue()

   useEffect(()=>{
  
    //will only run once when the app loads..
    onAuthStateChanged(auth,(authUser)=>{
      console.log("the user is>>>",authUser)
      if(authUser){
        //the user just logged in 
        dispatch({
          type:'SET_USER',
          user:authUser
        })
      }
      else{
      
        //the user logged out
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })
   },[])
  //BEM convension
  return (
    <Router>
    <div className='app'>
      
        <Routes>
        <Route path="/orders" element={
            <>
              <Heading/>
              <Orders/>
            </>
            }>
        </Route> 
        <Route path="/login" element={
            <>
              <Login/>
            </>
            }>
        </Route>    
        <Route path="/checkout" element={
            <>
                 <Heading/>
              <Checkout/>
         
            </>
            }>
        </Route>
        <Route path="/payment" element={
            <>
                 <Heading/>
                <Elements stripe={promise} >
                  <Payment/>
                </Elements>
         
            </>
            }>
              
            </Route>
          <Route path='/' element={
            <>
              <Heading/>
               <Home/>
             
            </>
           } >
         </Route>  
      </Routes>

    </div>
  </Router>
    
  )
}

export default App