import styles from './signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
const Signup=()=>{
    const navigate=useNavigate();
const [firstname,setFirstname]=useState('')
const [lastname,setLastname]=useState('')
const [email,setemail]=useState('')
const [password,setpassword]=useState('')
const [count,setcount]=useState('')
const [status,setstatus]=useState('')
 useEffect(()=>{
console.log('re-render')
 },[count])

    const Sign_Up_API=async ()=>{
            const signup=await axios.post('/api/signup',{firstname,lastname,email,password},{withCredentials:true})
            console.log(signup.data)
            setstatus(signup.data)
            setcount(count+1)
        } 
        
        const navigateLogin=()=>{
            navigate('/login')
        }

    return ( 
        <div style={styles} className='signup-box'>

            {(status!='user saved successfully')? <div>
 
            <h3>SIGN-UP</h3>
            <div className='signup-contents'>
            <label>Firstname</label>
            <input type='text' value={firstname} onChange={(e)=>setFirstname(e.target.value)} placeholder='Enter Firstname' />
           <label>Lastname</label>
            <input type='text' value={lastname}  onChange={(e)=>setLastname(e.target.value)} placeholder='Enter Lastname'/>
           <label>Email-Id</label>
            <input type='email' value={email} onChange={(e)=>setemail(e.target.value)} placeholder='Enter Email'/>
            <label>password</label>

            <input type='password' value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='password'/>
            <br/>

                {status.email!=null && <p>**{status.email}</p>}
                {status.password!=null && <p>**{status.password}</p>}

            <button type='button' onClick={()=>Sign_Up_API()}>Sign-up</button>           
            </div>
            </div>:


            <div className='after-signup'>
                <p>Thanks for signing-UP go to login-page</p>
                <button type='button' onClick={()=>navigateLogin()}>login</button>
                
                
                </div>}
            
        </div>
    )
}
export default Signup;