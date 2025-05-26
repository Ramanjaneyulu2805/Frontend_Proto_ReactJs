import { useParams } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import styles from './Chat.css';
import { useState,useEffect} from "react";
import {CreateSocketConnection} from '../Socket/socketio.js';
import {ChatMessages} from '../redux/actions';
import axios from 'axios'
const Chat=()=>{
    const params=useParams();
    const {userid}=params;
    const dispatch=useDispatch();
    const user=JSON.parse(localStorage.getItem('user'))  
        const loggedinuser=user?._id
    const [newmessage,setnewmessage]=useState('');
    const [sentmessage,setsentmessage]=useState([]);
    const [receivedmessage,setreceivedmessage]=useState([]);

    const fetchChat=async ()=>{
      
      const chat=await  axios.post('http://localhost:8888/chat',{loggedinuser,userid},{withCredentials:true})
      console.log(chat.data.messages)  
      setsentmessage([...chat.data.messages])
    }

    useEffect(()=>{fetchChat()},[receivedmessage])

    useEffect(()=>{
        //as soon as te page loads createsocketconnection and emit join chat
         const socket=CreateSocketConnection();
         socket.emit('join-chat',{loggedinuser,userid})
        //clean up whne the page unloads leaved that connection is bad idea 
             socket.on('messagesReceived',({firstname,text})=>{
            console.log(firstname+" "+" sent "+text);
            setreceivedmessage(text)
         })
        return ()=>{
            console.log('disconnecting.........')
            socket.disconnect();
         }
        },[loggedinuser,userid])



  const sendMessage = () => {
    const socket = CreateSocketConnection();
    socket.emit('send-message', {
        firstname: user.firstname,
        loggedinuser,
        userid,
        text: newmessage
    });

    setnewmessage('')
        
};


    return (
        <div style={styles} className="chat-box">
            
            <div className="chat-window">
        
                <div className="messages-box">
                        <div className='receivedmessage'>

                          {sentmessage.map((item,index)=>{return (item.senderId===loggedinuser)? <div key={index} style={{display:"flex",justifyContent:"end"}}>

                            <div style={{backgroundColor:"grey",width:"fit-content",padding:'10px',borderRadius:"60px",borderTopLeftRadius:"2px",color:"black",fontWeight:"bold"}} >You: {item.text}</div>
                            
                            </div>:<div key={index} style={{display:"flex",justifyContent:"start"}}>
                          
                          <div style={{backgroundColor:"grey",width:"fit-content",padding:'10px',borderRadius:"60px",borderTopLeftRadius:"2px",color:"black",fontWeight:"bold"}}
                          >{item.text}</div></div>})}
                           </div>
                </div>
        
        <div className="input-button">
           <div className="chat-input"><input type="text" placeholder="Type a message..." value={newmessage} onChange={(e)=>setnewmessage(e.target.value)} /></div>
           <div className="send-button"><button type="button" onClick={()=>sendMessage()} >Send</button></div> 
        </div>


            </div>

        </div>
    )
}
export default Chat;



/*
Learnings from Chatpt:-
You're logging receivedmessage immediately after calling setreceivedmessage, but React does not immediately update the state. It schedules the state update, and the updated value is only available on the next render.



function Example({ userId }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect runs on mount or when userId changes");
  }, [userId]);

  console.log("Component rendered");

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}



Clicking the button → causes a re-render (due to setCount)

✅ console.log("Component rendered") runs again

❌ useEffect only runs if userId changes

Refreshing the browser → causes a remount:

✅ useState(0) reinitializes

✅ useEffect runs because it's now the initial mount



When you call setState, React schedules a re-render.

After the render, React compares the dependencies of your useEffect hook.

If dependencies changed, useEffect runs.

If dependencies did not change, useEffect does NOT run.

{receivedmessage.map((item,index)=>{return (item.name===user.firstname)?<div key={index} style={{display:"flex",justifyContent:"end"}}>  <div style={{backgroundColor:"grey",width:"fit-content",padding:'10px',borderRadius:"60px",borderTopLeftRadius:"2px"}} >You: {item.text}</div></div>:
                        <div key={index} style={{display:"flex",justifyContent:"start"}}>  <div 
                        style={{backgroundColor:"grey",width:"fit-content",padding:'10px',borderRadius:"60px",borderTopRightRadius:"1px"}} >{item.name}{item.text}</div></div>})}

*/