import axios from "axios"
import { GET_MOVIELIST } from '../types/movieType'
import { ADD_MOVIELIST } from "../types/movieAddType"

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
                url:(`https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh`,formData),
                method:'POST',
                headers:{
                    TokenCyberSoft:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY'
                },
            })
            dispatch({
                type:ADD_MOVIELIST,
                payload:result.data.content,
            })
            alert('Thêm Phim Thành Công')
        }
    }
}