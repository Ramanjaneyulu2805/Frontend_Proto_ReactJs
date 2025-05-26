import axios from 'axios'
import { Base_url } from '../Baseurl';
const Connections=async ()=>{

    const fetch_connections= await axios.get(Base_url+'request/connections',{withCredentials:true})

     
return (
    <div>
        Connections  
    </div>
)
}
export default Connections;