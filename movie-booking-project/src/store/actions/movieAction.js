import axios from "axios"
import { GET_MOVIELIST } from '../types/movieType'
import { ADD_MOVIELIST } from "../types/movieAddType"
import {EDIT_MOVIEINFO} from '../types/movieEditType'

export const movieActions ={
    getMovieList: ()=>{
        return async (dispatch)=>{
            const result = await axios({
                url:'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP10',
                method:'GET',
                headers:{
                    TokenCyberSoft:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY'
                }
            })
            dispatch({
                type:GET_MOVIELIST,
                payload:result.data.content,
            })
        }
    },
    addMovieList: (formData)=>{
        return async (dispatch)=>{
            const result = await axios({
                url:(`https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh`),
                method:'POST',
                headers:{
                    "TokenCyberSoft":'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY',
                    "Content-Type":"multipart/form-data"
                    
                },
                data:formData,
            })
            alert('Thêm phim thành công')
            console.log('newmovie',result.data.content)
            dispatch({
                type:ADD_MOVIELIST,
                payload:result.data.content,
            })
        }
    },
    editMovieInfo: (maPhim)=>{
        return async (dispatch)=>{
            const result = await axios({
                url:`https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`,
                method:'GET',
                headers:{
                    TokenCyberSoft:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY'
                },
            })
            dispatch({
                type:EDIT_MOVIEINFO,
                payload:result.data.content,
            })
        }
    }
}