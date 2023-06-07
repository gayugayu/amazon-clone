import React from 'react'
//import './Login.css'
import { Link ,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { auth  } from "./firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'


const Login = () => {
    const history =useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const signIn = e => {
        e.preventDefault();
        signInWithEmailAndPassword(auth,email,password)
        .then(auth=>{
            history('/')
        })
        .catch(error=>alert(error.message))
    }   

    const register = e => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email ,password)
        .then((auth)=>{
            console.log(auth)
            if (auth){
                history('/')
            }
        })
        .catch(error=>alert(error.message))
    }
  return (
    <div className=' bg-white object-contain h-[100vh] flex flex-col items-center'>
    <Link to ='/'>
        <img
           className='mt-[20px] mb-[20px] w-[100px] mr-auto ml-auto object-contain'
           src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
           alt='logo'
           />
    </Link>
    <div className=' max-h-[1500px] grid md:grid-cols-1 w-[300px] object-contain flex flex-col border border-solid rounded-[5px] p-[20px] bg-gray-100'>
        <h1 className='font-medium mb-[20px]' >Sign-in</h1>
        <form>
           <h5 className='mb-[5px]'>E-mail</h5> 
           <input className='h-[30px] mb-[10px] bg-white w-full' type='text' value={email} onChange={e => setEmail(e.target.value)} />

           <h5 className='mb-[5px]'>Password</h5> 
           <input className='h-[30px] mb-[10px] bg-white w-full'
            type='password' value={password} onChange={e => setPassword(e.target.value)} />

           <button type='submit' onClick={signIn} 
           className='bg-[#f0c14b] rounded-sm w-full h-[30px] border border-solid mt-[10px] border-[#846a29] '>Sign In</button>          
           </form>
           <p className='mt-[15px] text-xs object-cover bg-slate-100 rounder-sm'>
                    By signing-in you agree to the AMAZON 
                    FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice 
                    and our Interest-Based Ads Notice.
           </p>
           <button className='bg-[#f0c14b] rounded-sm w-full h-[30px] border border-solid mt-[10px] border-[#846a29] '
             onClick={register} className='rounded-sm w-full h-[30px] border borderr-solid mt-[10px] border-[darkgray]'>Create your Amazon Account</button>


        
    </div>
 
 </div>
  )
}


export default Login