import React, { useState,useEffect } from 'react'
import { db } from './firebase'
//import './Orders.css'
import { useStateValue } from './StateProvider'
import {collection, doc} from "firebase/firestore/lite"
import Order from './Order'
const Orders = () => {
  const[{basket,user},dispatch]=useStateValue()
  const[orders,setOrders]=useState([])

  useEffect(()=>{
    if(user){
    // db
    // .collection('users')
    // .doc(user?.uid)
    // .collection('orders')
    // .orderBy('created','desc')
    // .onSnapshot(snapshot=>{
    //   setOrders(snapshot.doc.map(doc=>({
    //     id:doc.id,
    //     data:doc.data()
    //   })
    collection(db,"user")
    doc(db, "user" , user?.uid)

    //   ))
    // })
  }else{
    setOrders([])
  }
  },[user])
   return (
    <div className='p-[20px]'>
        <h1 className='m-[30px]'>orders</h1>

        <div className='orders__order'>
          {orders?.map(order=>(
            <order order={order}/>
          ))}
        </div>
    </div>
  )
}

export default Orders