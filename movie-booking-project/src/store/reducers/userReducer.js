import { GET_USERLIST } from "../types/userType";

const stateDefault = {
    userList:[]
}

export const userReducer = (state=stateDefault,{payload,type})=>{
    switch(type){
        case GET_USERLIST:{
            let data =[...state.userList]
            data = payload
            return {...state,userList:data}
        }
        default: return state
    }
}