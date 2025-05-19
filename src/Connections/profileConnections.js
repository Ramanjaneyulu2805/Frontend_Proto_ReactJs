import axios from 'axios'
const Connections=async ()=>{

    const fetch_connections= await axios.get('http://localhost:8888/request/connections',{withCredentials:true})

     
return (
    <div>
        Connections
    </div>
)
}
export default Connections;