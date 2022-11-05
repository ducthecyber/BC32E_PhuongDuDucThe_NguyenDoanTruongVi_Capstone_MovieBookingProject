import { GET_USERLIST } from "../types/UserManagement/userType";
import { USER_SIGNIN} from "../types/UserManagement/userSignInType";
const stateDefault = {
    userList:[],
    userLogin:{}
}

export const userReducer = (state=stateDefault,{payload,type})=>{
    switch(type){
        case GET_USERLIST:{
            let data =[...state.userList]
            data = payload
            return {...state,userList:data}
        }
        case  USER_SIGNIN:{
            let data = {...state.userLogin}
            data = payload
            localStorage.setItem(USER_SIGNIN,JSON.stringify(data));
            return {...state,userLogin:data}
        }

        default: return state
    }
}