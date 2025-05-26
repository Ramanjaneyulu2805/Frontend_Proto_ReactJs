import { All_users, login_user, Messages } from "./const";

 const addUser=(data)=>{
    return {
        type:login_user,
        data

    }
}
export default addUser;

export  const allUsers=(data)=>{
    return {
        type:All_users,
        data
    }
}


export  const ChatMessages=(data)=>{
    return {
        type:Messages,
        data
    }
}




