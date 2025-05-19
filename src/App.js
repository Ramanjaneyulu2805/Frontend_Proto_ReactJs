import Navbar from "./Navbars/NavHeader";
import Login from "./Userentries/login";
import LoggedUser from "./Navbars/LoginUser";
import Editprofile from "./Userentries/editprofile";
import Profile from "./Userentries/Profile";
import Pending_Connections from "./Connections/PendingRequests";
import Connections from "./Connections/profileConnections";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Signup from "./Userentries/signup";
function App() {
  return (
    <div className="App">
   <BrowserRouter>
    <Routes>

    <Route path="/" element={<Navbar/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path="/loggedUser" element={<LoggedUser/>}/>
    <Route path="/editprofile" element={<Profile/>}/>
    <Route path="/connections" element={<Connections/>}/>
   <Route path="/pendingConnections" element={<Pending_Connections/>}/>
   <Route path="/signup" element={<Signup/>}/>
    </Routes>
   </BrowserRouter>

    </div>
  );
}

export default App;
