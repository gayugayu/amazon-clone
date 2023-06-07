
import React from "react";
//import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, image, price, rating }) {
    const [{basket},dispatch]=useStateValue()

    const addToBasket=()=>{
       //dispatch the items into the data layer
       dispatch({
          type:'ADD_TO_BASKET',
          item:{
            id:id,
            title:title,
            image:image,
            price:price,
            rating:rating,
          },
       })
       console.log(id)
    }
  
 
  return (
    
     <div  className="flex justify-end flex-col items-center m-[10px] p-[20px] w-[100%] max-h-[400px] min-w-[100px] bg-[#f9F6ee]">
     
     <div className="h-[100px] mb-[15px]">
        <p>{title}</p>
        <p className="mt-[5px]">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <div key={i}>
              <p>🌟</p>
              </div>
            ))}
        </div>
      </div>
      

      <img className='max-h-[200px] w-[100%] object-contain mb-[15px] ' src={image} alt="" />

      <button
             onClick={addToBasket}
             className="bg-[#f0c14b]  border border-solid mt-[10px] border-yellow-600 text-[#111]" >
             Add to Basket
     
       </button>
      
    </div>
    
  );
}

export default Product;
