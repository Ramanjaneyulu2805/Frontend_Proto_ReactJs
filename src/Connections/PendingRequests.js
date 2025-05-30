import styles from './pending.css'
import axios from "axios"
import { useEffect,useState } from "react"
import { Base_url } from '../Baseurl';
import { Link } from "react-router-dom"
const Pending_Connections=()=>{
    const loggedin_user=JSON.parse(localStorage.getItem('user'))
    console.log(loggedin_user)

    const [user,setuser]=useState([]);
    const [connections,setconnections]=useState([])
const Retriving_Connections=async ()=>{
const Connecton_sent_from_other_user=await axios.get(Base_url+'request/pending',{withCredentials:true})
setuser(Connecton_sent_from_other_user.data.data)
}


const Connections=async ()=>{
        const Accepted_Connections=await axios.get(Base_url+'request/connections',{withCredentials:true})
        setconnections(Accepted_Connections.data)
        console.log('from accepted',Accepted_Connections.data)
    }


useEffect(()=>{
    Retriving_Connections();
    Connections();
},[]);




const statusAccepted=async (id)=>{
   const API_Accepted=await axios.post(Base_url+`request/review/accepted/${id}`,{},{withCredentials:true})
}




return (
    <div style={styles}>
        <div className='pendingbox'>
            <h3>PENDING REQUESTS</h3>
            <div className='main'>
            {user.map((item)=>{
               
               return <div key={item._id}>{item.fromuserID.firstname}  {item.fromuserID.lastname}
               
               
               <div className='buttons'>
                <button type='button' onClick={()=>statusAccepted(item._id)}>Accept</button>
                <button type='button'>Reject</button>
            </div>
               
               </div>
               
            })}

            
        </div>
        </div>


                <div className='pendingbox'> 
                <h3>ACCEPTED REQUESTS</h3>

                <div className='main'>
                {connections.map((item)=>{
               return <div key={item._id}>{(loggedin_user._id===item.fromuserID._id)?<div><p>{item.touserID.firstname}</p>
                <Link to={`/chat/${item.touserID._id}`}> <button>Chat</button></Link>
               </div>


               :<div><p>{item.fromuserID.firstname }</p>
                <Link to={`/chat/${item.fromuserID._id}`}> <button>Chat</button></Link>
                </div>}
              
               </div>
               
            })}

            
        </div>
            
        </div>
                    </div>








)
}
export default Pending_Connections;

//Actually when click on Accept button, your accept button with name should disappear for that
//the instructor AS wrote a reducer to store the connection and when click the reducer will be empty  