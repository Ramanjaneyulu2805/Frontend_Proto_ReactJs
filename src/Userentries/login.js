import styles from './login.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import addUser from '../redux/actions';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Login=()=>{
const [email,setemail]=useState('');
const [password,setpassword]=useState('');
const [emailerror,setemailerror]=useState('');
const dispatch=useDispatch();
const navigate=useNavigate();

//making an network call using async and use fetch or axios
const HandleLogin=async()=>{

    try{
   const status= await axios.post('http://localhost:8888/login',{email,password},{withCredentials:true})//Send cookies/auth headers to the backend
   //This tells the browser: "Include credentials (cookies, HTTP auth) in this request.",
        if(status.data=='Entered EmailID is not registered'){
            setemailerror(status.data)
            return null;
        }
    dispatch(addUser(status.data))
    navigate('/loggedUser')
}
catch(error){
    console.log('error',error.message)
}
}
return(
    <div style={styles}>

        <div className='contents-box'>

        <div className='login-heading'>Login Page</div><br/>
        <div className='contents_login'>
        <div className='email'>
            <label>Email {email}</label><br/>
            <input type='text' name='email' value={email} placeholder='example@gmail.com' onChange={(e)=>setemail(e.target.value)}/>
            {emailerror && <p className='errors'>{emailerror}</p>}
        </div>


        <div className='password'>
        <label>Password {password}</label><br/>
            <input type='text' name='password' value={password} placeholder='Cap@123232' onChange={(e)=>setpassword(e.target.value)}/>
        </div>

        <div className='login-button'>
        <button type='button' onClick={()=>HandleLogin()} >Login</button>
        <button type='button'><Link to={'/signup'}>New-User: Sign-up</Link></button>
        </div>
        </div>
        </div>
    </div>
)
}
export default Login;