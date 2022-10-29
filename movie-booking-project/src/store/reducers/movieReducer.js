import { ADD_MOVIELIST } from "../types/movieAddType";
import { EDIT_MOVIEINFO } from "../types/movieEditType";
import { GET_MOVIELIST} from "../types/movieType";

const stateDefault = {
    movieList:[],
    movieInfo:{},
}

export const movieReducer = (state=stateDefault,{payload,type})=>{
    switch (type){
        case GET_MOVIELIST:{
            let data = [...state.movieList]
            data = payload
            return {...state,movieList:data}
        }
        case ADD_MOVIELIST:{
            let data = [...state.movieList]
            let film = payload
            data.push(film)
            return {...state,movieList:data}
        }
        case EDIT_MOVIEINFO:{
            let data = {...state.movieInfo}
            data = payload
            return {...state,movieInfo:data}
        }

        default: return state
    }
}