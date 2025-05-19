import { configureStore } from "@reduxjs/toolkit";
import {login_reducer} from '../redux/reducer'
import { Feed_all_users } from "../redux/reducer";

const store =configureStore({
reducer:{
    user:login_reducer,
   feed: Feed_all_users
}

})
export default store;
