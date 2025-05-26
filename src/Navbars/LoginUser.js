import { useEffect, useState } from 'react';
import styles from './loginnav.css';
import addUser from '../redux/actions';
import Feed_users from './Feed';
import { useDispatch, useSelector } from 'react-redux';import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Editprofile from '../Userentries/editprofile';
import { Base_url } from '../Baseurl';
const LoggedUser= ()=>{
    const navigate=useNavigate();
    const storedata=useSelector((store)=>store.user);
    const dispatch=useDispatch();
    useEffect(()=>{ 
        const getprofile=async ()=>{
        try{
        const profile_details=await axios.get(Base_url+'getprofile',{withCredentials:true})
        dispatch(addUser(profile_details.data))
    }
    catch(error){
        console.log("error",error)
        navigate('/login')
    }
}
getprofile();
},[])
   const logout=async ()=>{
           const status= await axios.post(Base_url+'logout',null,{withCredentials:true})
            console.log('logged out successfully',status)
            dispatch(addUser({}))
            navigate('/login')
      
        }
        //This version sends the object { withCredentials: true }
        //  as the body, not as the config. So Axios thinks you're trying to send that as JSON data.(post 1.param->url, second body to send, third config)


    return (
        <div style={styles}>
            
        <div className='contents-bar'>

        <div className='leftside'>
             <div className='logo'>logo</div>
             <div className='logoname'>logoname</div>

        </div>

        <div className='rightside'>
             <div className='welcome'>Welcome, {storedata.firstname} </div>
             <div className='userdropdown'>
                <img src={storedata.photoURL} alt={storedata.firstname}/>
                <div className='dropdown-contents'>
                    
                      <li><Link>Profile</Link> </li> 
                      <li>  <Link>About</Link> </li> 
                      <li> <Link onClick={()=>logout()}>Logout</Link></li> 
                      <li>  <Link to={'/editprofile'}>Editprofile</Link> </li> 

                      <li><Link to={'/pendingConnections'} >Pending-Connections</Link></li>

                    
                </div>

             </div>
        </div>
            </div>
            <div><Feed_users/></div>                 
              </div>
    )    }
    export default LoggedUser;

    /*
     Without API (getprofile) — What Happens?
Initially, when you log in or load the app, the Redux store gets set with your user info (like firstname, lastname, etc).

This is stored only in memory — not in localStorage, cookies, or anywhere persistent.

When you refresh the page:

The entire JavaScript state is reset.

Redux store is cleared.

So storedata.firstname and others become undefined or empty — because Redux has no memory of previous state.*/ 