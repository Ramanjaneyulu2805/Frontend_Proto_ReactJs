import styles from './Feedcss.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { allUsers } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Base_url } from '../Baseurl';
const Feed_users= ()=>{
    const [count,setcount]=useState(0);
        const dispatch=useDispatch();
        const feed=useSelector((store)=>store.feed);
        console.log('store data',feed)
        async function fetchData(){
        const All_users= await  axios.get(Base_url+'request/feed',{withCredentials:true})
        dispatch(allUsers(All_users.data))
        //updatefeeddata([...feed])
        }
       useEffect(()=>{fetchData()
       },[count])
       
       const interested=async ()=>{
        console.log('in interested')
            const interested_API=await axios.post(Base_url+`request/send/interested/${feed[0]._id}`,null,{withCredentials:true})
            setcount(count+1)
        }
        const ignored=()=>{
        }
return (
    <div>
        <div style={styles} className="card">
        
        <div className="photo">

     <p>{feed[0]?.firstname} {feed[0]?.lastname}</p>

        </div>

        <div className="contents">
        <div className="btn-1"><button onClick={()=>{interested()}}>Interested</button></div>
        <div className="btn-2"><button onClick={()=>{ignored()}}>Ignored</button></div>
        </div>


        </div>

    </div>
)
}

export default Feed_users;
