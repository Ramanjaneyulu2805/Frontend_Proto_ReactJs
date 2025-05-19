import { login_user,All_users } from "./const";

export const login_reducer=(data=[],action)=>{
    switch(action.type){
        case login_user:
            localStorage.setItem('user',JSON.stringify(action.data))
            return action.data

        default : return data
    }
}



 export const Feed_all_users=(data=[],action)=>{
    switch(action.type){
        case All_users:
            return action.data
        default: return data
    }
}

