import React from "react";
import SearchIcon from '@mui/icons-material/Search';
//import "./Heading.css";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { signOut } from "firebase/auth";
import {auth} from "./firebase";

const Heading = () => {
    const[{basket ,user},dispatch]=useStateValue()
    const handleAuthetication=()=>{
        if(user){
            signOut(auth)
        }
    }
  return (
    <div className='h-[60px] flex bg-[#131921] sticky top-0 z-[100]'>
       <Link to ="/"> 
        <img className='w-[100px] object-contain mx-0 my-[20px] mt-[18px]'
         src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
         alt="icon"
        />
      
        </Link>
        <div className='flex flex-1 items-center rounded-[24px]'>
            <input className='h-[12px] p-[12px] border-0 w-full' type="text"/>
            <SearchIcon 
            className="p-[5px] h-[22px]  bg-[#cd9042]"/>
        </div>
 
        <div className="flex justify-self space-evenly">
        <Link to ={!user && '/login'}>
            <div onClick={handleAuthetication}
                className="flex flex-col mx-[10px] my-[10] text-white">
                <span className="text-sm font-extrabold">
                   Hello  { !user ? ' Guest': user.email}
                </span>
                <span className="text-sm">
                    {user ? "Sign out":"Sign In"} 
                </span>
            </div>
            </Link>
            <Link to ='/orders'>
                 <div className="flex flex-col mx-[10px] my-[10] text-white">
                      <span className="text-sm font-extrabold">
                         Returns
                       </span>
                     <span className="text-sm">
                        & orders
                    </span>
                 </div>
            </Link>
            
            <div className="flex flex-col mx-[10px] my-[10] text-white">
                <span className="text-sm font-extrabold">
                    Your
                </span>
                <span className="text-sm">
                 Prime
                </span>
            </div>
            <Link to="/checkout">
            <div className="text-[beige] flex items-center">
                <ShoppingBasketIcon/>
                <span className="text-sm mx-[10px] my-[10]">{basket?.length}</span>
            </div>
            </Link>
        </div>

    </div>
  )
}
export default Heading