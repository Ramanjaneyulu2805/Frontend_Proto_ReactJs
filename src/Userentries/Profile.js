import Editprofile from "./editprofile";
const Profile=()=>{
   const user=JSON.parse(localStorage.getItem('user'));
    return ( 
    <div>
        <Editprofile  user={user} />
    </div>
)
}
export default Profile;