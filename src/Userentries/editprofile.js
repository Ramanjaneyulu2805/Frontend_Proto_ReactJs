import styles from './edit.css'
import {useState} from 'react'; 
import axios from 'axios';  
import {Base_url} from '../Baseurl';
import addUser from '../redux/actions';
import { useDispatch } from 'react-redux';
const Editprofile=({user})=>{
    const dispatch=useDispatch();
    const [firstname,setfirstname]=useState(user.firstname);
    const [lastname,setlastname]=useState(user.lastname);       
    const [email,setemail]=useState(user.email);
    const [password,setpassword]=useState(user.password);

const Editchanges=async()=>{
    console.log(firstname)
    const Edit_Api=await axios.patch(Base_url+'profile/edit',{firstname:firstname},{withCredentials:true})  
    console.log('Edit_Api',Edit_Api.data)
    const getprofile=await axios.get(Base_url+'getprofile',{withCredentials:true})
    dispatch(addUser(getprofile.data)) 
    if(Edit_Api.data==='Profile updated successfully'){
        alert('Profile updated successfully')
    }
    else{
        alert('Error in updating profile')
    }
}

 console.log('in edit profile',user)
    return (
        <div style={styles} className='outerbox'>

            <div>

          <div className='userchanged'>
            <div className='editprofile'>Edit Profile</div>

                <div className='firstname'>
                <label>Firstname</label><br/>
                <input type='text' name='firstname' placeholder={user.firstname}  onChange={(e)=>setfirstname(e.target.value)} />
                </div>

            <div className='Firstname'>
             <label>Lastname</label><br/>
                <input type='text' name='lastname' placeholder={user.lastname}  onChange={(e)=>setlastname(e.target.value)} />
            </div>
           <div className='button'> <button type='button' onClick={()=>{Editchanges()}}>Save Changes</button>
           </div> 
           
           </div>



                <div className='user'>
                <div className='firstname'>
                <p>Firstname</p>
                <p>{firstname}</p>
                </div>

                 <div className='firstname'>
                <p>lastname</p>
                <p>{lastname}</p>
                </div>

                 <div className='email'>
                <p>Email</p>
                <p>{email}</p>
                </div>

                </div>
            </div>
     

        </div>
    )
}
export default Editprofile




/*

React uses client-side routing, meaning:

URLs like /editprofile, /dashboard, etc. are handled by the React app in the browser, not by the server.

But when you manually enter the URL in the browser, the browser asks the NGINX server, “Hey, give me /editprofile.”

NGINX tries to find a real file or folder called /editprofile in /var/www/html, doesn't find it, and returns 404 Not Found.*/