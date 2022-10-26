import { GET_MOVIELIST} from "../types/movieType";

const stateDefault = {
    movieList:[]
}

export const movieReducer = (state=stateDefault,{payload,type})=>{
    switch (type){
        case GET_MOVIELIST:{
            let data = [...state.movieList]
            data = payload
            return {...state,movieList:data}
        }
        default: return state
    }
}